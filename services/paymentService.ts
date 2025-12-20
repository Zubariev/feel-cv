/**
 * Payment Service
 *
 * Handles payment initiation with Fondy.
 * Creates payment orders and redirects users to Fondy checkout.
 *
 * Flow:
 * 1. User clicks "Subscribe" or "Buy"
 * 2. Frontend calls paymentService.createPayment()
 * 3. Backend creates Fondy order with metadata
 * 4. User is redirected to Fondy checkout
 * 5. After payment, Fondy sends webhook to our backend
 * 6. Webhook creates/updates subscription in Supabase
 * 7. User returns to app with updated entitlements
 */

import type { PlanCode } from '../types';

// Plan prices in cents (Fondy requires cents)
const PLAN_PRICES: Record<NonNullable<PlanCode>, number> = {
  'one-time': 399,         // €3.99
  'explorer': 900,         // €9.00
  'career-builder': 1900,  // €19.00
  'career-accelerator': 2900, // €29.00
};

const PLAN_NAMES: Record<NonNullable<PlanCode>, string> = {
  'one-time': 'CVSense Single Scan',
  'explorer': 'CVSense Explorer (Monthly)',
  'career-builder': 'CVSense Career Builder (Monthly)',
  'career-accelerator': 'CVSense Career Accelerator (Monthly)',
};

interface CreatePaymentParams {
  userId: string;
  userEmail: string;
  planCode: NonNullable<PlanCode>;
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

export const paymentService = {
  /**
   * Create a Fondy payment order and get the checkout URL.
   *
   * @param params - Payment parameters including user info and plan
   * @returns Checkout URL to redirect user to
   */
  async createPayment({
    userId,
    userEmail,
    planCode,
  }: CreatePaymentParams): Promise<{ checkoutUrl: string; orderId: string }> {
    const merchantId = import.meta.env.VITE_FONDY_MERCHANT_ID;

    if (!merchantId) {
      throw new Error('Fondy merchant ID not configured');
    }

    const amount = PLAN_PRICES[planCode];
    const productName = PLAN_NAMES[planCode];
    const isSubscription = planCode !== 'one-time';

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${userId.slice(0, 8)}`;

    // Merchant data to pass through webhook
    const merchantData = JSON.stringify({
      user_id: userId,
      plan_code: planCode,
      product_type: isSubscription ? 'subscription' : 'one_time',
    });

    // Build Fondy order request
    const orderData = {
      order_id: orderId,
      merchant_id: parseInt(merchantId, 10),
      order_desc: productName,
      amount,
      currency: 'EUR',
      sender_email: userEmail,
      merchant_data: merchantData,
      response_url: `${window.location.origin}/payment/success`,
      server_callback_url: `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fondy-webhook`,
      lang: 'en',
      lifetime: 900, // 15 minutes
      // For subscriptions, set up recurring
      ...(isSubscription && {
        recurring_data: {
          start_time: new Date().toISOString(),
          amount,
          every: 1,
          period: 'month',
        },
      }),
    };

    // Create signature (in production, this should be done server-side)
    // For now, we'll use a server endpoint or Edge Function
    const response = await this.callFondyApi(orderData);

    if (response.response.response_status !== 'success' || !response.response.checkout_url) {
      throw new Error(response.response.error_message || 'Failed to create payment');
    }

    return {
      checkoutUrl: response.response.checkout_url,
      orderId,
    };
  },

  /**
   * Call Fondy API to create an order.
   * In production, this should go through a backend endpoint for signature security.
   */
  async callFondyApi(orderData: Record<string, unknown>): Promise<FondyOrderResponse> {
    // For development/demo, use Fondy's test endpoint
    // In production, this should be a Supabase Edge Function that signs the request
    const fondyApiUrl = 'https://pay.fondy.eu/api/checkout/url/';

    // NOTE: In production, never expose merchant secret to frontend!
    // This should be done via a Supabase Edge Function
    const response = await fetch(fondyApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        request: orderData,
      }),
    });

    if (!response.ok) {
      throw new Error(`Fondy API error: ${response.status}`);
    }

    return response.json();
  },

  /**
   * Get the price for a plan.
   */
  getPlanPrice(planCode: NonNullable<PlanCode>): { amount: number; formatted: string } {
    const cents = PLAN_PRICES[planCode];
    const euros = cents / 100;

    return {
      amount: euros,
      formatted: `€${euros.toFixed(2)}`,
    };
  },

  /**
   * Check if a plan is a subscription.
   */
  isSubscription(planCode: PlanCode): boolean {
    return planCode !== 'one-time' && planCode !== null;
  },

  /**
   * Handle return from Fondy payment page.
   * The actual entitlement is created by the webhook, but we can show
   * a pending state and refresh entitlements.
   */
  async handlePaymentReturn(orderId: string): Promise<{ status: 'pending' | 'success' | 'failed' }> {
    // The webhook should have already processed by now
    // We just need to refresh entitlements
    // Return 'pending' to trigger a refresh
    return { status: 'pending' };
  },

  /**
   * Open Fondy checkout in a new window or redirect.
   */
  redirectToCheckout(checkoutUrl: string): void {
    // Option 1: Full page redirect
    window.location.href = checkoutUrl;

    // Option 2: Open in new window (uncomment if preferred)
    // window.open(checkoutUrl, '_blank', 'width=500,height=700');
  },
};

export default paymentService;
