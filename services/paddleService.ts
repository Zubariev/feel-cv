/**
 * Paddle Payment Service
 *
 * Client-side Paddle.js integration for payments.
 * Uses Paddle's overlay checkout for a seamless payment experience.
 */

import type { PlanCode } from '../types';

// Paddle client-side token (safe to expose)
const PADDLE_CLIENT_TOKEN = 'live_7d88acca11163c7618ee8d2ec49';
const PADDLE_ENVIRONMENT: 'sandbox' | 'production' = 'production';

// Paddle price IDs from Paddle dashboard
const PADDLE_PRICE_IDS: Record<NonNullable<PlanCode>, string> = {
  'one-time': 'pri_01kgf853tgmfvd51r1ff12kj22',
  'explorer': 'pri_01kgf89n2wwwn5knkzstdcn18w',
  'career-builder': 'pri_01kgf8deyqecyspagq3z98bhn4',
  'career-accelerator': 'pri_01kgf8hn81yfarave18mmpnay3',
};

// Type declarations for Paddle.js v2
declare global {
  interface Window {
    Paddle?: {
      Initialize: (options: PaddleInitOptions) => void;
      Checkout: {
        open: (options: PaddleCheckoutOptions) => void;
      };
      Environment: {
        set: (env: 'sandbox' | 'production') => void;
      };
    };
  }
}

interface PaddleInitOptions {
  token: string;
  environment?: 'sandbox' | 'production';
  checkout?: {
    settings?: {
      displayMode?: 'overlay' | 'inline';
      theme?: 'light' | 'dark';
      locale?: string;
    };
  };
  eventCallback?: (event: PaddleEvent) => void;
}

interface PaddleEvent {
  name: string;
  data?: any;
}

interface PaddleCheckoutOptions {
  items: Array<{
    priceId: string;
    quantity: number;
  }>;
  customer?: {
    email?: string;
  };
  customData?: Record<string, string>;
  settings?: {
    displayMode?: 'overlay' | 'inline';
    theme?: 'light' | 'dark';
    locale?: string;
    successUrl?: string;
    allowLogout?: boolean;
  };
}

interface PaddleServiceState {
  initialized: boolean;
  initializing: boolean;
  currentCallbacks: {
    onSuccess?: () => void;
    onClose?: () => void;
  };
}

const state: PaddleServiceState = {
  initialized: false,
  initializing: false,
  currentCallbacks: {},
};

// Handle Paddle events
function handlePaddleEvent(event: PaddleEvent) {
  console.log('[PaddleService] Event:', event.name, event.data);

  switch (event.name) {
    case 'checkout.completed':
      console.log('[PaddleService] Checkout completed');
      if (state.currentCallbacks.onSuccess) {
        state.currentCallbacks.onSuccess();
      }
      state.currentCallbacks = {};
      break;

    case 'checkout.closed':
      console.log('[PaddleService] Checkout closed');
      if (state.currentCallbacks.onClose) {
        state.currentCallbacks.onClose();
      }
      state.currentCallbacks = {};
      break;

    case 'checkout.error':
      console.error('[PaddleService] Checkout error:', event.data);
      if (state.currentCallbacks.onClose) {
        state.currentCallbacks.onClose();
      }
      state.currentCallbacks = {};
      break;
  }
}

export const paddleService = {
  /**
   * Initialize Paddle.js SDK
   * Must be called before opening checkout
   */
  async initialize(): Promise<void> {
    if (state.initialized) {
      return;
    }

    if (state.initializing) {
      // Wait for existing initialization
      return new Promise((resolve) => {
        const check = setInterval(() => {
          if (state.initialized) {
            clearInterval(check);
            resolve();
          }
        }, 100);
      });
    }

    state.initializing = true;

    // Wait for Paddle.js to load
    if (!window.Paddle) {
      await new Promise<void>((resolve, reject) => {
        const maxWait = 10000;
        const startTime = Date.now();
        const check = setInterval(() => {
          if (window.Paddle) {
            clearInterval(check);
            resolve();
          } else if (Date.now() - startTime > maxWait) {
            clearInterval(check);
            reject(new Error('Paddle.js failed to load'));
          }
        }, 100);
      });
    }

    // Initialize Paddle with event callback
    window.Paddle!.Initialize({
      token: PADDLE_CLIENT_TOKEN,
      environment: PADDLE_ENVIRONMENT,
      eventCallback: handlePaddleEvent,
    });

    state.initialized = true;
    state.initializing = false;
    console.log('[PaddleService] Initialized successfully');
  },

  /**
   * Open Paddle checkout overlay
   */
  async openCheckout({
    planCode,
    userEmail,
    userId,
    onSuccess,
    onClose,
  }: {
    planCode: NonNullable<PlanCode>;
    userEmail: string;
    userId: string;
    onSuccess?: () => void;
    onClose?: () => void;
  }): Promise<void> {
    await this.initialize();

    const priceId = PADDLE_PRICE_IDS[planCode];
    if (!priceId) {
      throw new Error(`No Paddle price ID configured for plan: ${planCode}`);
    }

    // Store callbacks for event handler
    state.currentCallbacks = { onSuccess, onClose };

    console.log('[PaddleService] Opening checkout for:', { planCode, priceId, userEmail });

    window.Paddle!.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customer: {
        email: userEmail,
      },
      customData: {
        user_id: userId,
        plan_code: planCode,
      },
      settings: {
        displayMode: 'overlay',
        theme: 'light',
        successUrl: `${window.location.origin}/payment/success`,
        allowLogout: false,
      },
    });
  },

  /**
   * Get the Paddle price ID for a plan
   */
  getPriceId(planCode: NonNullable<PlanCode>): string | null {
    return PADDLE_PRICE_IDS[planCode] || null;
  },

  /**
   * Check if Paddle is configured for a specific plan
   */
  isPlanConfigured(planCode: NonNullable<PlanCode>): boolean {
    return !!PADDLE_PRICE_IDS[planCode];
  },

  /**
   * Check if any Paddle plans are configured
   */
  isConfigured(): boolean {
    return Object.values(PADDLE_PRICE_IDS).some((id) => !!id);
  },
};

export default paddleService;
