/**
 * Payment Service
 *
 * Handles payment initiation through the secure Edge Function.
 * All payment signing is done server-side - merchant secrets are never exposed to frontend.
 *
 * Flow:
 * 1. User clicks "Subscribe" or "Buy"
 * 2. Frontend calls paymentService.createPayment()
 * 3. Edge Function fetches price from DB and signs request
 * 4. User is redirected to Fondy checkout
 * 5. After payment, Fondy sends webhook to our backend
 * 6. Webhook creates/updates subscription in Supabase
 * 7. User returns to app with updated entitlements
 */

import type { PlanCode } from '../types';
import { supabase } from './supabaseClient';

// Access Vite env safely
const rawEnv = (typeof import.meta !== 'undefined'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ? ((import.meta as any).env as Record<string, string | boolean | undefined>)
  : undefined) || {};

const supabaseUrl = rawEnv.VITE_SUPABASE_URL as string | undefined;

interface CreatePaymentParams {
  userId: string;
  userEmail: string;
  planCode: NonNullable<PlanCode>;
}

interface CreateOrderResponse {
  checkoutUrl: string;
  orderId: string;
}

export const paymentService = {
  /**
   * Create a Fondy payment order through the secure Edge Function.
   *
   * @param params - Payment parameters including user info and plan
   * @returns Checkout URL to redirect user to
   */
  async createPayment({
    userId,
    userEmail,
    planCode,
  }: CreatePaymentParams): Promise<{ checkoutUrl: string; orderId: string }> {
    // Get current session for authorization
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      throw new Error('You must be logged in to make a payment');
    }

    if (!supabaseUrl) {
      throw new Error('Supabase URL not configured');
    }

    const response = await fetch(
      `${supabaseUrl}/functions/v1/fondy-create-order`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          planCode,
          userEmail,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Failed to create payment');
    }

    const data: CreateOrderResponse = await response.json();

    return {
      checkoutUrl: data.checkoutUrl,
      orderId: data.orderId,
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
    // Full page redirect
    window.location.href = checkoutUrl;
  },
};

export default paymentService;
