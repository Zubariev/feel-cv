/**
 * Payment Service
 *
 * Handles payment initiation through Paddle.
 * Paddle.js handles the checkout overlay - no iframe needed.
 *
 * Flow:
 * 1. User clicks "Subscribe" or "Buy"
 * 2. Frontend calls paymentService.openCheckout()
 * 3. Paddle overlay opens with payment form
 * 4. After payment, Paddle sends webhook to our backend
 * 5. Webhook creates/updates subscription in Supabase
 * 6. User sees success message with updated entitlements
 */

import type { PlanCode } from '../types';
import { paddleService } from './paddleService';

interface OpenCheckoutParams {
  userId: string;
  userEmail: string;
  planCode: NonNullable<PlanCode>;
  onSuccess?: () => void;
  onClose?: () => void;
}

export const paymentService = {
  /**
   * Open Paddle checkout overlay
   */
  async openCheckout({
    userId,
    userEmail,
    planCode,
    onSuccess,
    onClose,
  }: OpenCheckoutParams): Promise<void> {
    if (!userId) {
      throw new Error('You must be logged in to make a payment');
    }

    if (!planCode) {
      throw new Error('No plan selected');
    }

    console.log('[PaymentService] Opening Paddle checkout:', {
      planCode,
      userEmail,
    });

    await paddleService.openCheckout({
      planCode,
      userEmail,
      userId,
      onSuccess,
      onClose,
    });
  },

  /**
   * Check if a plan is a subscription.
   */
  isSubscription(planCode: PlanCode): boolean {
    return planCode !== 'one-time' && planCode !== null;
  },

  /**
   * Get plan display info
   */
  getPlanDisplayInfo(planCode: PlanCode): { name: string; amount: string } {
    switch (planCode) {
      case 'one-time':
        return { name: 'Single CV Analysis', amount: '€3.99' };
      case 'explorer':
        return { name: 'Explorer Plan', amount: '€9/month' };
      case 'career-builder':
        return { name: 'Career Builder Plan', amount: '€19/month' };
      case 'career-accelerator':
        return { name: 'Career Accelerator Plan', amount: '€29/month' };
      default:
        return { name: 'CVIVID Plan', amount: '' };
    }
  },

  /**
   * Initialize Paddle SDK (call on app load)
   */
  async initialize(): Promise<void> {
    await paddleService.initialize();
  },
};

export default paymentService;
