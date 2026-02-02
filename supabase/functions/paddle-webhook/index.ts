/**
 * Paddle Webhook Handler
 *
 * This Edge Function handles payment webhooks from Paddle.
 * It processes successful payments and creates/updates:
 * - Subscriptions for recurring payments
 * - One-time purchases for single scans
 *
 * Webhook URL: https://<project>.supabase.co/functions/v1/paddle-webhook
 *
 * Required environment variables:
 * - PADDLE_WEBHOOK_SECRET: Your Paddle webhook secret for signature verification
 * - SUPABASE_URL: Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Service role key for database operations
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, paddle-signature',
};

// Paddle event types we care about
const PADDLE_EVENTS = {
  TRANSACTION_COMPLETED: 'transaction.completed',
  SUBSCRIPTION_CREATED: 'subscription.created',
  SUBSCRIPTION_UPDATED: 'subscription.updated',
  SUBSCRIPTION_CANCELED: 'subscription.canceled',
  SUBSCRIPTION_PAUSED: 'subscription.paused',
  SUBSCRIPTION_RESUMED: 'subscription.resumed',
} as const;

interface PaddleWebhookEvent {
  event_id: string;
  event_type: string;
  occurred_at: string;
  notification_id: string;
  data: PaddleTransactionData | PaddleSubscriptionData;
}

interface PaddleTransactionData {
  id: string;
  status: string;
  customer_id: string;
  currency_code: string;
  billing_period?: {
    starts_at: string;
    ends_at: string;
  };
  details: {
    totals: {
      total: string;
      subtotal: string;
    };
  };
  items: Array<{
    price: {
      id: string;
      product_id: string;
    };
    quantity: number;
  }>;
  custom_data?: {
    user_id?: string;
    plan_code?: string;
  };
  checkout?: {
    url: string;
  };
}

interface PaddleSubscriptionData {
  id: string;
  status: string;
  customer_id: string;
  currency_code: string;
  billing_cycle: {
    interval: string;
    frequency: number;
  };
  current_billing_period: {
    starts_at: string;
    ends_at: string;
  };
  items: Array<{
    price: {
      id: string;
      product_id: string;
    };
    quantity: number;
  }>;
  custom_data?: {
    user_id?: string;
    plan_code?: string;
  };
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get the raw body for signature verification
    const rawBody = await req.text();
    const signature = req.headers.get('paddle-signature');

    // Verify webhook signature
    const isValid = await verifyPaddleSignature(rawBody, signature);
    if (!isValid) {
      console.error('Invalid Paddle webhook signature');
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse the webhook payload
    const event: PaddleWebhookEvent = JSON.parse(rawBody);

    console.log('Received Paddle webhook:', {
      event_id: event.event_id,
      event_type: event.event_type,
      notification_id: event.notification_id,
    });

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check idempotency - have we processed this event?
    const { data: existingEvent } = await supabase
      .from('payment_events')
      .select('id')
      .eq('provider_order_id', event.event_id)
      .single();

    if (existingEvent) {
      console.log('Event already processed:', event.event_id);
      return new Response(JSON.stringify({ status: 'already_processed' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Process based on event type
    let result;
    switch (event.event_type) {
      case PADDLE_EVENTS.TRANSACTION_COMPLETED:
        result = await handleTransactionCompleted(supabase, event);
        break;

      case PADDLE_EVENTS.SUBSCRIPTION_CREATED:
      case PADDLE_EVENTS.SUBSCRIPTION_UPDATED:
        result = await handleSubscriptionUpdate(supabase, event);
        break;

      case PADDLE_EVENTS.SUBSCRIPTION_CANCELED:
      case PADDLE_EVENTS.SUBSCRIPTION_PAUSED:
        result = await handleSubscriptionCanceled(supabase, event);
        break;

      case PADDLE_EVENTS.SUBSCRIPTION_RESUMED:
        result = await handleSubscriptionResumed(supabase, event);
        break;

      default:
        console.log('Unhandled event type:', event.event_type);
        result = { status: 'ignored', event_type: event.event_type };
    }

    // Record the event
    await recordPaymentEvent(supabase, event, 'success');

    return new Response(JSON.stringify({ status: 'success', ...result }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Paddle webhook error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

/**
 * Verify Paddle webhook signature
 * See: https://developer.paddle.com/webhooks/signature-verification
 */
async function verifyPaddleSignature(
  rawBody: string,
  signature: string | null
): Promise<boolean> {
  const webhookSecret = Deno.env.get('PADDLE_WEBHOOK_SECRET');

  if (!webhookSecret) {
    console.error('PADDLE_WEBHOOK_SECRET not configured');
    return false;
  }

  if (!signature) {
    console.error('No signature provided');
    return false;
  }

  try {
    // Parse the signature header
    // Format: ts=timestamp;h1=hash
    const parts = signature.split(';');
    const tsMatch = parts.find(p => p.startsWith('ts='));
    const h1Match = parts.find(p => p.startsWith('h1='));

    if (!tsMatch || !h1Match) {
      console.error('Invalid signature format');
      return false;
    }

    const timestamp = tsMatch.substring(3);
    const providedHash = h1Match.substring(3);

    // Build the signed payload
    const signedPayload = `${timestamp}:${rawBody}`;

    // Create HMAC SHA256 hash
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(webhookSecret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(signedPayload)
    );

    const calculatedHash = Array.from(new Uint8Array(signatureBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

    return calculatedHash === providedHash;
  } catch (err) {
    console.error('Signature verification error:', err);
    return false;
  }
}

/**
 * Handle transaction.completed event
 * This is for one-time purchases
 */
async function handleTransactionCompleted(
  supabase: ReturnType<typeof createClient>,
  event: PaddleWebhookEvent
) {
  const data = event.data as PaddleTransactionData;
  const customData = data.custom_data;

  if (!customData?.user_id) {
    console.error('No user_id in custom_data');
    throw new Error('Missing user_id in transaction custom_data');
  }

  // Check if this is a subscription transaction or one-time
  if (data.billing_period) {
    // This is a subscription payment - handled by subscription events
    console.log('Transaction is part of subscription, skipping');
    return { type: 'subscription_transaction', skipped: true };
  }

  // One-time purchase
  const amount = parseFloat(data.details.totals.total) / 100;

  const { data: result, error } = await supabase.rpc('record_one_time_purchase', {
    p_user_id: customData.user_id,
    p_payment_reference: data.id,
    p_amount: amount,
    p_analyses_granted: 1,
  });

  if (error) {
    console.error('Failed to record purchase:', error);
    throw error;
  }

  return { type: 'one_time', ...result };
}

/**
 * Handle subscription.created and subscription.updated events
 */
async function handleSubscriptionUpdate(
  supabase: ReturnType<typeof createClient>,
  event: PaddleWebhookEvent
) {
  const data = event.data as PaddleSubscriptionData;
  const customData = data.custom_data;

  if (!customData?.user_id || !customData?.plan_code) {
    console.error('Missing user_id or plan_code in custom_data');
    throw new Error('Missing required custom_data fields');
  }

  const { data: result, error } = await supabase.rpc('create_or_renew_subscription', {
    p_user_id: customData.user_id,
    p_plan_code: customData.plan_code,
    p_provider: 'paddle',
    p_provider_subscription_id: data.id,
    p_provider_customer_id: data.customer_id,
  });

  if (error) {
    console.error('Failed to create/update subscription:', error);
    throw error;
  }

  return { type: 'subscription', action: event.event_type, ...result };
}

/**
 * Handle subscription.canceled and subscription.paused events
 */
async function handleSubscriptionCanceled(
  supabase: ReturnType<typeof createClient>,
  event: PaddleWebhookEvent
) {
  const data = event.data as PaddleSubscriptionData;

  // Update subscription status in database
  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: event.event_type === PADDLE_EVENTS.SUBSCRIPTION_CANCELED ? 'canceled' : 'paused',
      updated_at: new Date().toISOString(),
    })
    .eq('provider_subscription_id', data.id)
    .eq('payment_provider', 'paddle');

  if (error) {
    console.error('Failed to update subscription status:', error);
    throw error;
  }

  return { type: 'subscription', action: event.event_type };
}

/**
 * Handle subscription.resumed event
 */
async function handleSubscriptionResumed(
  supabase: ReturnType<typeof createClient>,
  event: PaddleWebhookEvent
) {
  const data = event.data as PaddleSubscriptionData;

  const { error } = await supabase
    .from('subscriptions')
    .update({
      status: 'active',
      updated_at: new Date().toISOString(),
    })
    .eq('provider_subscription_id', data.id)
    .eq('payment_provider', 'paddle');

  if (error) {
    console.error('Failed to resume subscription:', error);
    throw error;
  }

  return { type: 'subscription', action: 'resumed' };
}

/**
 * Record payment event for audit
 */
async function recordPaymentEvent(
  supabase: ReturnType<typeof createClient>,
  event: PaddleWebhookEvent,
  status: 'success' | 'failed'
) {
  const data = event.data as PaddleTransactionData | PaddleSubscriptionData;
  const customData = data.custom_data;

  await supabase.from('payment_events').insert({
    user_id: customData?.user_id || null,
    event_type: event.event_type,
    payment_provider: 'paddle',
    provider_order_id: event.event_id,
    provider_payment_id: data.id,
    amount: 'details' in data ? parseFloat(data.details.totals.total) / 100 : null,
    currency: data.currency_code,
    status,
    metadata: {
      notification_id: event.notification_id,
      event_type: event.event_type,
      custom_data: customData,
    },
  });
}
