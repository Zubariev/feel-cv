/**
 * Process Webhook Retries Edge Function
 *
 * This function processes failed webhooks from the retry queue.
 * It should be called periodically (e.g., every minute via external cron).
 *
 * URL: https://<project>.supabase.co/functions/v1/process-webhook-retries
 *
 * Features:
 * - Exponential backoff (1, 2, 4, 8, 16 minutes)
 * - Maximum 5 retry attempts
 * - Idempotent processing
 * - Automatic cleanup of old entries
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RetryQueueItem {
  id: string;
  webhook_type: string;
  payload: Record<string, unknown>;
  attempt_count: number;
  max_attempts: number;
  order_id: string | null;
  user_id: string | null;
}

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
  merchant_data?: string;
}

interface MerchantData {
  user_id: string;
  plan_code?: string;
  product_type: 'subscription' | 'one_time';
}

const FONDY_STATUS = {
  SUCCESS: 'success',
  APPROVED: 'approved',
} as const;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Verify this is an authorized call (optional: add API key check)
    const authHeader = req.headers.get('authorization');
    const expectedKey = Deno.env.get('WEBHOOK_RETRY_SECRET');

    // If a secret is configured, verify it
    if (expectedKey && authHeader !== `Bearer ${expectedKey}`) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get pending retries (limit to 10 per run to avoid timeouts)
    const { data: pendingRetries, error: fetchError } = await supabase
      .rpc('get_pending_webhook_retries', { p_limit: 10 });

    if (fetchError) {
      console.error('Failed to fetch pending retries:', fetchError);
      throw fetchError;
    }

    if (!pendingRetries || pendingRetries.length === 0) {
      return new Response(JSON.stringify({
        status: 'ok',
        message: 'No pending retries',
        processed: 0
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Processing ${pendingRetries.length} webhook retries`);

    const results = {
      processed: 0,
      succeeded: 0,
      failed: 0,
      details: [] as { id: string; status: string; error?: string }[],
    };

    for (const item of pendingRetries as RetryQueueItem[]) {
      try {
        console.log(`Processing retry ${item.id}, attempt ${item.attempt_count + 1}/${item.max_attempts}`);

        if (item.webhook_type === 'fondy') {
          await processFondyWebhook(supabase, item);
        } else {
          throw new Error(`Unknown webhook type: ${item.webhook_type}`);
        }

        // Mark as completed
        await supabase.rpc('complete_webhook_retry', { p_queue_id: item.id });
        results.succeeded++;
        results.details.push({ id: item.id, status: 'succeeded' });

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Retry ${item.id} failed:`, errorMessage);

        // Mark as failed (will schedule next retry or mark as permanently failed)
        await supabase.rpc('fail_webhook_retry', {
          p_queue_id: item.id,
          p_error: errorMessage
        });

        results.failed++;
        results.details.push({ id: item.id, status: 'failed', error: errorMessage });
      }

      results.processed++;
    }

    // Periodically cleanup old entries (every ~100 runs)
    if (Math.random() < 0.01) {
      const { data: deleted } = await supabase.rpc('cleanup_webhook_retry_queue', { p_days_old: 30 });
      console.log(`Cleaned up ${deleted} old retry entries`);
    }

    return new Response(JSON.stringify({
      status: 'ok',
      ...results
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Retry processor error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

/**
 * Process a Fondy webhook from the retry queue
 */
async function processFondyWebhook(
  supabase: ReturnType<typeof createClient>,
  item: RetryQueueItem
) {
  const payload = item.payload as unknown as FondyWebhookPayload;

  // Verify required fields
  if (!payload.order_id || !payload.merchant_data) {
    throw new Error('Invalid webhook payload: missing required fields');
  }

  // Check if payment was successful
  const isSuccess = payload.order_status === FONDY_STATUS.SUCCESS ||
                    payload.order_status === FONDY_STATUS.APPROVED;

  if (!isSuccess) {
    // Not a successful payment - just mark as processed
    console.log(`Order ${payload.order_id} not successful: ${payload.order_status}`);
    return;
  }

  // Parse merchant data
  let merchantData: MerchantData;
  try {
    merchantData = JSON.parse(payload.merchant_data);
  } catch {
    throw new Error('Failed to parse merchant_data');
  }

  if (!merchantData.user_id) {
    throw new Error('Missing user_id in merchant_data');
  }

  // Check idempotency - was this already processed?
  const { data: existingEvent } = await supabase
    .from('payment_events')
    .select('id')
    .eq('provider_order_id', payload.order_id)
    .eq('status', 'success')
    .single();

  if (existingEvent) {
    console.log(`Order ${payload.order_id} already processed`);
    return;
  }

  // Process based on product type
  if (merchantData.product_type === 'subscription') {
    if (!merchantData.plan_code) {
      throw new Error('Missing plan_code for subscription');
    }

    await supabase.rpc('create_or_renew_subscription', {
      p_user_id: merchantData.user_id,
      p_plan_code: merchantData.plan_code,
      p_provider: 'fondy',
      p_provider_subscription_id: payload.payment_id || payload.order_id,
      p_provider_customer_id: payload.sender_email || null,
    });

  } else {
    const amount = (payload.actual_amount || payload.amount) / 100;

    await supabase.rpc('record_one_time_purchase', {
      p_user_id: merchantData.user_id,
      p_payment_reference: payload.order_id,
      p_amount: amount,
      p_analyses_granted: 1,
    });
  }

  // Record successful payment event
  await supabase.from('payment_events').insert({
    user_id: merchantData.user_id,
    event_type: merchantData.product_type === 'subscription'
      ? 'subscription_payment'
      : 'one_time_purchase',
    payment_provider: 'fondy',
    provider_order_id: payload.order_id,
    provider_payment_id: payload.payment_id,
    amount: (payload.actual_amount || payload.amount) / 100,
    currency: payload.actual_currency || payload.currency,
    status: 'success',
    metadata: {
      order_status: payload.order_status,
      merchant_data: merchantData,
      retry_processed: true,
      retry_queue_id: item.id,
    },
  });

  console.log(`Successfully processed order ${payload.order_id} from retry queue`);
}
