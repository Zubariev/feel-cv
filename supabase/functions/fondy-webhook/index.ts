/**
 * Fondy Webhook Handler
 *
 * This Edge Function handles payment webhooks from Fondy.
 * It processes successful payments and creates/updates:
 * - Subscriptions for recurring payments
 * - One-time purchases for single scans
 *
 * Webhook URL: https://<project>.supabase.co/functions/v1/fondy-webhook
 *
 * IMPORTANT: Only webhooks are authoritative for payment status.
 * Never trust redirect success pages.
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHash } from 'https://deno.land/std@0.177.0/crypto/mod.ts';

// CORS headers for preflight
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Fondy payment statuses
const FONDY_STATUS = {
  SUCCESS: 'success',
  APPROVED: 'approved',
  DECLINED: 'declined',
  EXPIRED: 'expired',
  REVERSED: 'reversed',
} as const;

interface FondyWebhookPayload {
  order_id: string;
  order_status: string;
  order_time: string;
  amount: number;
  currency: string;
  actual_amount?: number;
  actual_currency?: string;
  payment_id?: string;
  sender_email?: string;
  signature: string;
  merchant_id: string;
  response_status: string;
  response_description?: string;
  // Custom fields passed in order creation
  merchant_data?: string; // JSON string with { user_id, plan_code, product_type }
}

interface MerchantData {
  user_id: string;
  plan_code?: string;
  product_type: 'subscription' | 'one_time';
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse the webhook payload
    const contentType = req.headers.get('content-type') || '';
    let payload: FondyWebhookPayload;

    if (contentType.includes('application/json')) {
      payload = await req.json();
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await req.formData();
      payload = Object.fromEntries(formData.entries()) as unknown as FondyWebhookPayload;
    } else {
      throw new Error('Unsupported content type');
    }

    console.log('Received Fondy webhook:', {
      order_id: payload.order_id,
      order_status: payload.order_status,
      amount: payload.amount,
    });

    // Verify signature
    const isValidSignature = await verifyFondySignature(payload);
    if (!isValidSignature) {
      console.error('Invalid Fondy signature');
      return new Response(JSON.stringify({ error: 'Invalid signature' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check if payment was successful
    const isSuccess = payload.order_status === FONDY_STATUS.SUCCESS ||
                      payload.order_status === FONDY_STATUS.APPROVED;

    if (!isSuccess) {
      console.log('Payment not successful:', payload.order_status);

      // Still record the event for tracking
      await recordPaymentEvent(payload, 'failed');

      return new Response(JSON.stringify({ status: 'noted', payment_status: payload.order_status }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse merchant data to get user_id and plan info
    let merchantData: MerchantData;
    try {
      merchantData = JSON.parse(payload.merchant_data || '{}');
    } catch {
      console.error('Failed to parse merchant_data');
      return new Response(JSON.stringify({ error: 'Invalid merchant_data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!merchantData.user_id) {
      console.error('Missing user_id in merchant_data');
      return new Response(JSON.stringify({ error: 'Missing user_id' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Create Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if this order was already processed (idempotency)
    const { data: existingEvent } = await supabase
      .from('payment_events')
      .select('id')
      .eq('provider_order_id', payload.order_id)
      .eq('status', 'success')
      .single();

    if (existingEvent) {
      console.log('Order already processed:', payload.order_id);
      return new Response(JSON.stringify({ status: 'already_processed' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate plan_code for subscriptions
    if (merchantData.product_type === 'subscription' && !merchantData.plan_code) {
      console.error('Missing plan_code for subscription purchase');
      return new Response(JSON.stringify({ error: 'Missing plan_code for subscription' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Process based on product type
    let result;
    if (merchantData.product_type === 'subscription') {
      result = await processSubscription(supabase, payload, merchantData);
    } else {
      result = await processOneTimePurchase(supabase, payload, merchantData);
    }

    // Record successful payment event
    await recordPaymentEvent(payload, 'success', merchantData);

    console.log('Payment processed successfully:', result);

    return new Response(JSON.stringify({ status: 'success', ...result }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Webhook error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

/**
 * Verify Fondy webhook signature
 */
async function verifyFondySignature(payload: FondyWebhookPayload): Promise<boolean> {
  const merchantSecret = Deno.env.get('FONDY_MERCHANT_SECRET');

  if (!merchantSecret) {
    console.error('CRITICAL: FONDY_MERCHANT_SECRET not configured - rejecting webhook');
    throw new Error('Webhook signature verification failed: merchant secret not configured');
  }

  // Build signature string from all fields except 'signature' and empty values
  const signatureFields: string[] = [];

  for (const [key, value] of Object.entries(payload)) {
    if (key !== 'signature' && value !== '' && value !== undefined && value !== null) {
      signatureFields.push(`${value}`);
    }
  }

  // Sort alphabetically
  signatureFields.sort();

  // Add merchant secret at the beginning
  signatureFields.unshift(merchantSecret);

  // Join with '|' and hash with SHA1
  const signatureString = signatureFields.join('|');
  const encoder = new TextEncoder();
  const data = encoder.encode(signatureString);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const calculatedSignature = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return calculatedSignature === payload.signature;
}

/**
 * Process subscription payment
 */
async function processSubscription(
  supabase: ReturnType<typeof createClient>,
  payload: FondyWebhookPayload,
  merchantData: MerchantData
) {
  const { data, error } = await supabase.rpc('create_or_renew_subscription', {
    p_user_id: merchantData.user_id,
    p_plan_code: merchantData.plan_code,
    p_provider: 'fondy',
    p_provider_subscription_id: payload.payment_id || payload.order_id,
    p_provider_customer_id: payload.sender_email || null,
  });

  if (error) {
    console.error('Failed to create subscription:', error);
    throw error;
  }

  return { type: 'subscription', ...data };
}

/**
 * Process one-time purchase
 */
async function processOneTimePurchase(
  supabase: ReturnType<typeof createClient>,
  payload: FondyWebhookPayload,
  merchantData: MerchantData
) {
  const amount = (payload.actual_amount || payload.amount) / 100; // Fondy sends amount in cents

  const { data, error } = await supabase.rpc('record_one_time_purchase', {
    p_user_id: merchantData.user_id,
    p_payment_reference: payload.order_id,
    p_amount: amount,
    p_analyses_granted: 1,
  });

  if (error) {
    console.error('Failed to record purchase:', error);
    throw error;
  }

  return { type: 'one_time', ...data };
}

/**
 * Record payment event for audit log
 */
async function recordPaymentEvent(
  payload: FondyWebhookPayload,
  status: 'success' | 'failed',
  merchantData?: MerchantData
) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  await supabase.from('payment_events').insert({
    user_id: merchantData?.user_id || null,
    event_type: merchantData?.product_type === 'subscription'
      ? 'subscription_payment'
      : 'one_time_purchase',
    payment_provider: 'fondy',
    provider_order_id: payload.order_id,
    provider_payment_id: payload.payment_id,
    amount: (payload.actual_amount || payload.amount) / 100,
    currency: payload.actual_currency || payload.currency,
    status,
    metadata: {
      order_status: payload.order_status,
      merchant_data: merchantData,
      response_description: payload.response_description,
    },
  });
}
