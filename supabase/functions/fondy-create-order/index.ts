/**
 * Fondy Create Order Edge Function
 *
 * This Edge Function securely creates Fondy payment orders.
 * The merchant secret is stored in Supabase secrets (never exposed to frontend).
 *
 * Flow:
 * 1. Frontend sends planCode, userId, userEmail
 * 2. Edge Function validates user authentication
 * 3. Edge Function fetches plan price from database
 * 4. Edge Function signs the request with FONDY_MERCHANT_SECRET
 * 5. Edge Function creates order with Fondy API
 * 6. Checkout URL is returned to frontend
 *
 * Security:
 * - Merchant secret never exposed to frontend
 * - Prices fetched from database (single source of truth)
 * - User must be authenticated
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreateOrderRequest {
  planCode: string;
  userEmail: string;
}

interface PlanRecord {
  plan_code: string;
  name: string;
  price_eur: number;
  is_subscription: boolean;
}

interface FondyOrderResponse {
  response: {
    checkout_url?: string;
    payment_id?: string;
    order_id?: string;
    response_status: 'success' | 'failure';
    response_description?: string;
    error_code?: number;
    error_message?: string;
  };
}

/**
 * Generate Fondy signature for a request.
 * Fondy uses SHA1 hash of sorted parameters joined with '|'
 */
async function generateFondySignature(
  params: Record<string, unknown>,
  merchantSecret: string
): Promise<string> {
  // Collect all non-empty values
  const values: string[] = [];

  for (const [key, value] of Object.entries(params)) {
    if (value !== '' && value !== undefined && value !== null && key !== 'signature') {
      values.push(String(value));
    }
  }

  // Sort alphabetically
  values.sort();

  // Prepend merchant secret
  values.unshift(merchantSecret);

  // Join with '|' and hash with SHA1
  const signatureString = values.join('|');
  const encoder = new TextEncoder();
  const data = encoder.encode(signatureString);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
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

    // Get authorization header
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify user is authenticated
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { authorization: authHeader } },
    });

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse request body
    const { planCode, userEmail }: CreateOrderRequest = await req.json();

    if (!planCode || !userEmail) {
      return new Response(JSON.stringify({ error: 'Missing planCode or userEmail' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get merchant credentials from secrets
    const merchantId = Deno.env.get('FONDY_MERCHANT_ID');
    const merchantSecret = Deno.env.get('FONDY_MERCHANT_SECRET');

    if (!merchantId || !merchantSecret) {
      console.error('Fondy credentials not configured');
      return new Response(JSON.stringify({ error: 'Payment service not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Fetch plan from database (service role for bypassing RLS)
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { data: plan, error: planError } = await supabaseAdmin
      .from('plans')
      .select('plan_code, name, price_eur, is_subscription')
      .eq('plan_code', planCode)
      .eq('is_active', true)
      .single();

    if (planError || !plan) {
      return new Response(JSON.stringify({ error: 'Invalid plan' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const planData = plan as PlanRecord;

    // Calculate amount in cents (Fondy requires cents)
    const amountInCents = Math.round(planData.price_eur * 100);

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${user.id.slice(0, 8)}`;

    // Merchant data to pass through webhook
    const merchantData = JSON.stringify({
      user_id: user.id,
      plan_code: planCode,
      product_type: planData.is_subscription ? 'subscription' : 'one_time',
    });

    // Get the origin for callback URLs
    const origin = req.headers.get('origin') || 'https://cvsense.com';

    // Build order parameters
    const orderParams: Record<string, unknown> = {
      order_id: orderId,
      merchant_id: parseInt(merchantId, 10),
      order_desc: planData.name,
      amount: amountInCents,
      currency: 'EUR',
      sender_email: userEmail,
      merchant_data: merchantData,
      response_url: `${origin}/payment/success`,
      server_callback_url: `${supabaseUrl}/functions/v1/fondy-webhook`,
      lang: 'en',
      lifetime: 900, // 15 minutes
    };

    // Add recurring data for subscriptions
    if (planData.is_subscription) {
      orderParams.recurring_data = {
        start_time: new Date().toISOString(),
        amount: amountInCents,
        every: 1,
        period: 'month',
      };
    }

    // Generate signature
    const signature = await generateFondySignature(orderParams, merchantSecret);
    orderParams.signature = signature;

    // Call Fondy API
    const fondyResponse = await fetch('https://pay.fondy.eu/api/checkout/url/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request: orderParams,
      }),
    });

    if (!fondyResponse.ok) {
      console.error('Fondy API HTTP error:', fondyResponse.status);
      return new Response(JSON.stringify({ error: 'Payment service error' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const fondyData: FondyOrderResponse = await fondyResponse.json();

    if (fondyData.response.response_status !== 'success' || !fondyData.response.checkout_url) {
      console.error('Fondy API error:', fondyData.response.error_message);
      return new Response(JSON.stringify({
        error: fondyData.response.error_message || 'Failed to create payment order'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      checkoutUrl: fondyData.response.checkout_url,
      orderId,
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Create order error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
