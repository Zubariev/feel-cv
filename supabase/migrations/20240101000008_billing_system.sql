-- ============================================================================
-- CVSense Billing System
-- Implements the SaaS billing model: Plans, Subscriptions, Purchases, Usage
-- ============================================================================

-- 1. Plans Table (static, rarely changes)
-- Defines what products exist and their limits
-- ============================================================================
CREATE TABLE IF NOT EXISTS plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price_eur DECIMAL(10, 2) NOT NULL,
  analyses_per_month INTEGER, -- NULL means unlimited
  comparisons_per_month INTEGER, -- NULL means unlimited
  is_unlimited_comparisons BOOLEAN DEFAULT FALSE,
  is_subscription BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for quick plan lookups
CREATE INDEX IF NOT EXISTS idx_plans_code ON plans(plan_code);

-- Insert default plans based on PricingSection.tsx
INSERT INTO plans (plan_code, name, description, price_eur, analyses_per_month, comparisons_per_month, is_unlimited_comparisons, is_subscription, display_order)
VALUES
  ('one-time', 'Single Scan', 'Try once. Full power. No commitment.', 3.99, 1, 0, FALSE, FALSE, 0),
  ('explorer', 'Explorer', 'For job seekers', 9.00, 5, 1, FALSE, TRUE, 1),
  ('career-builder', 'Career Builder', 'For serious job hunters', 19.00, 10, 5, FALSE, TRUE, 2),
  ('career-accelerator', 'Career Accelerator', 'For power users', 29.00, 30, NULL, TRUE, TRUE, 3)
ON CONFLICT (plan_code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price_eur = EXCLUDED.price_eur,
  analyses_per_month = EXCLUDED.analyses_per_month,
  comparisons_per_month = EXCLUDED.comparisons_per_month,
  is_unlimited_comparisons = EXCLUDED.is_unlimited_comparisons,
  is_subscription = EXCLUDED.is_subscription,
  display_order = EXCLUDED.display_order,
  updated_at = NOW();

-- 2. Subscriptions Table
-- Tracks active subscriptions for each user
-- Each user can have 0 or 1 active subscription
-- ============================================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_code TEXT NOT NULL REFERENCES plans(plan_code),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'expired', 'past_due', 'pending')),
  current_period_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMPTZ,
  payment_provider TEXT DEFAULT 'fondy',
  provider_subscription_id TEXT,
  provider_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure only one active subscription per user
  CONSTRAINT unique_active_subscription UNIQUE (user_id)
    DEFERRABLE INITIALLY DEFERRED
);

-- Indexes for subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_period_end ON subscriptions(current_period_end);

-- 3. One-Time Purchases Table
-- Tracks single purchases (€3.99 scans)
-- ============================================================================
CREATE TABLE IF NOT EXISTS one_time_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_code TEXT NOT NULL DEFAULT 'cv_single_analysis',
  analyses_granted INTEGER NOT NULL DEFAULT 1,
  analyses_used INTEGER NOT NULL DEFAULT 0,
  is_fully_used BOOLEAN GENERATED ALWAYS AS (analyses_used >= analyses_granted) STORED,
  payment_provider TEXT DEFAULT 'fondy',
  payment_reference TEXT,
  payment_amount DECIMAL(10, 2),
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  first_used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for one-time purchases
CREATE INDEX IF NOT EXISTS idx_one_time_purchases_user_id ON one_time_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_one_time_purchases_is_used ON one_time_purchases(is_fully_used);

-- 4. Usage Counters Table
-- Tracks monthly usage for subscribed users
-- Resets at the start of each billing period
-- ============================================================================
CREATE TABLE IF NOT EXISTS usage_counters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  period_start TIMESTAMPTZ NOT NULL,
  period_end TIMESTAMPTZ NOT NULL,
  analyses_used INTEGER NOT NULL DEFAULT 0,
  comparisons_used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- One usage counter per period per user
  CONSTRAINT unique_user_period UNIQUE (user_id, period_start)
);

-- Indexes for usage counters
CREATE INDEX IF NOT EXISTS idx_usage_counters_user_id ON usage_counters(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_counters_period ON usage_counters(period_start, period_end);

-- 5. Payment Events Table (Audit Log)
-- Records all payment events for debugging and compliance
-- ============================================================================
CREATE TABLE IF NOT EXISTS payment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL, -- 'subscription_created', 'subscription_renewed', 'purchase_completed', 'payment_failed', etc.
  payment_provider TEXT DEFAULT 'fondy',
  provider_order_id TEXT,
  provider_payment_id TEXT,
  amount DECIMAL(10, 2),
  currency TEXT DEFAULT 'EUR',
  status TEXT NOT NULL, -- 'success', 'failed', 'pending'
  metadata JSONB,
  processed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for payment events
CREATE INDEX IF NOT EXISTS idx_payment_events_user_id ON payment_events(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_events_order_id ON payment_events(provider_order_id);
CREATE INDEX IF NOT EXISTS idx_payment_events_type ON payment_events(event_type);

-- ============================================================================
-- RLS Policies for Billing Tables
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE one_time_purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_events ENABLE ROW LEVEL SECURITY;

-- Plans: Everyone can read (public pricing info)
CREATE POLICY "Plans are viewable by everyone"
  ON plans FOR SELECT
  USING (is_active = TRUE);

-- Subscriptions: Users can only see their own
CREATE POLICY "Users can view their own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Subscriptions: Only service role can insert/update (via webhook)
CREATE POLICY "Service role can manage subscriptions"
  ON subscriptions FOR ALL
  USING (auth.role() = 'service_role');

-- One-time purchases: Users can view their own
CREATE POLICY "Users can view their own purchases"
  ON one_time_purchases FOR SELECT
  USING (auth.uid() = user_id);

-- One-time purchases: Only service role can insert/update
CREATE POLICY "Service role can manage purchases"
  ON one_time_purchases FOR ALL
  USING (auth.role() = 'service_role');

-- Usage counters: Users can view their own
CREATE POLICY "Users can view their own usage"
  ON usage_counters FOR SELECT
  USING (auth.uid() = user_id);

-- Usage counters: Service role can manage
CREATE POLICY "Service role can manage usage"
  ON usage_counters FOR ALL
  USING (auth.role() = 'service_role');

-- Payment events: Users can view their own (for receipts)
CREATE POLICY "Users can view their own payment events"
  ON payment_events FOR SELECT
  USING (auth.uid() = user_id);

-- Payment events: Only service role can insert
CREATE POLICY "Service role can insert payment events"
  ON payment_events FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

-- ============================================================================
-- Helper Functions
-- ============================================================================

-- Function to get current entitlements for a user
CREATE OR REPLACE FUNCTION get_user_entitlements(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_subscription RECORD;
  v_plan RECORD;
  v_usage RECORD;
  v_one_time_available INTEGER;
  v_now TIMESTAMPTZ := NOW();
  v_result JSONB;
BEGIN
  -- Get active subscription
  SELECT s.*, p.*
  INTO v_subscription
  FROM subscriptions s
  JOIN plans p ON s.plan_code = p.plan_code
  WHERE s.user_id = p_user_id
    AND s.status = 'active'
    AND s.current_period_end > v_now
  LIMIT 1;

  -- Get or create usage counter for current period
  IF v_subscription IS NOT NULL THEN
    SELECT * INTO v_usage
    FROM usage_counters
    WHERE user_id = p_user_id
      AND period_start = v_subscription.current_period_start;

    -- Create usage counter if it doesn't exist
    IF v_usage IS NULL THEN
      INSERT INTO usage_counters (user_id, period_start, period_end, analyses_used, comparisons_used)
      VALUES (p_user_id, v_subscription.current_period_start, v_subscription.current_period_end, 0, 0)
      RETURNING * INTO v_usage;
    END IF;
  END IF;

  -- Count available one-time analyses
  SELECT COALESCE(SUM(analyses_granted - analyses_used), 0)::INTEGER
  INTO v_one_time_available
  FROM one_time_purchases
  WHERE user_id = p_user_id
    AND is_fully_used = FALSE;

  -- Build result
  IF v_subscription IS NOT NULL THEN
    v_result := jsonb_build_object(
      'has_subscription', TRUE,
      'plan', jsonb_build_object(
        'code', v_subscription.plan_code,
        'name', v_subscription.name,
        'is_subscription', TRUE
      ),
      'limits', jsonb_build_object(
        'analyses_per_month', v_subscription.analyses_per_month,
        'comparisons_per_month', v_subscription.comparisons_per_month,
        'unlimited_comparisons', v_subscription.is_unlimited_comparisons
      ),
      'usage', jsonb_build_object(
        'analyses_used', COALESCE(v_usage.analyses_used, 0),
        'comparisons_used', COALESCE(v_usage.comparisons_used, 0)
      ),
      'remaining', jsonb_build_object(
        'analyses', CASE
          WHEN v_subscription.analyses_per_month IS NULL THEN NULL
          ELSE GREATEST(0, v_subscription.analyses_per_month - COALESCE(v_usage.analyses_used, 0))
        END,
        'comparisons', CASE
          WHEN v_subscription.is_unlimited_comparisons THEN NULL
          WHEN v_subscription.comparisons_per_month IS NULL THEN NULL
          ELSE GREATEST(0, v_subscription.comparisons_per_month - COALESCE(v_usage.comparisons_used, 0))
        END
      ),
      'one_time', jsonb_build_object(
        'available_scans', v_one_time_available
      ),
      'can', jsonb_build_object(
        'analyze_cv', (
          v_subscription.analyses_per_month IS NULL OR
          COALESCE(v_usage.analyses_used, 0) < v_subscription.analyses_per_month OR
          v_one_time_available > 0
        ),
        'compare_cvs', (
          v_subscription.is_unlimited_comparisons OR
          v_subscription.comparisons_per_month IS NULL OR
          COALESCE(v_usage.comparisons_used, 0) < v_subscription.comparisons_per_month
        )
      ),
      'subscription', jsonb_build_object(
        'status', v_subscription.status,
        'current_period_end', v_subscription.current_period_end,
        'cancel_at_period_end', v_subscription.cancel_at_period_end
      )
    );
  ELSE
    -- No active subscription
    v_result := jsonb_build_object(
      'has_subscription', FALSE,
      'plan', jsonb_build_object(
        'code', NULL,
        'name', NULL,
        'is_subscription', FALSE
      ),
      'limits', jsonb_build_object(
        'analyses_per_month', NULL,
        'comparisons_per_month', NULL,
        'unlimited_comparisons', FALSE
      ),
      'usage', jsonb_build_object(
        'analyses_used', 0,
        'comparisons_used', 0
      ),
      'remaining', jsonb_build_object(
        'analyses', v_one_time_available,
        'comparisons', 0
      ),
      'one_time', jsonb_build_object(
        'available_scans', v_one_time_available
      ),
      'can', jsonb_build_object(
        'analyze_cv', v_one_time_available > 0,
        'compare_cvs', FALSE
      ),
      'subscription', NULL
    );
  END IF;

  RETURN v_result;
END;
$$;

-- Function to increment analysis usage
CREATE OR REPLACE FUNCTION increment_analysis_usage(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_subscription RECORD;
  v_usage RECORD;
  v_one_time RECORD;
  v_now TIMESTAMPTZ := NOW();
BEGIN
  -- First, try to use subscription quota
  SELECT s.*
  INTO v_subscription
  FROM subscriptions s
  WHERE s.user_id = p_user_id
    AND s.status = 'active'
    AND s.current_period_end > v_now;

  IF v_subscription IS NOT NULL THEN
    -- Update usage counter
    INSERT INTO usage_counters (user_id, period_start, period_end, analyses_used, comparisons_used)
    VALUES (p_user_id, v_subscription.current_period_start, v_subscription.current_period_end, 1, 0)
    ON CONFLICT (user_id, period_start)
    DO UPDATE SET
      analyses_used = usage_counters.analyses_used + 1,
      updated_at = NOW()
    RETURNING * INTO v_usage;

    RETURN jsonb_build_object(
      'success', TRUE,
      'source', 'subscription',
      'analyses_used', v_usage.analyses_used
    );
  END IF;

  -- Try to use one-time purchase
  SELECT * INTO v_one_time
  FROM one_time_purchases
  WHERE user_id = p_user_id
    AND is_fully_used = FALSE
  ORDER BY purchased_at ASC
  LIMIT 1
  FOR UPDATE;

  IF v_one_time IS NOT NULL THEN
    UPDATE one_time_purchases
    SET
      analyses_used = analyses_used + 1,
      first_used_at = COALESCE(first_used_at, v_now)
    WHERE id = v_one_time.id;

    RETURN jsonb_build_object(
      'success', TRUE,
      'source', 'one_time',
      'purchase_id', v_one_time.id
    );
  END IF;

  -- No available quota
  RETURN jsonb_build_object(
    'success', FALSE,
    'error', 'no_quota',
    'message', 'No analysis quota available'
  );
END;
$$;

-- Function to increment comparison usage
CREATE OR REPLACE FUNCTION increment_comparison_usage(p_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_subscription RECORD;
  v_plan RECORD;
  v_usage RECORD;
  v_now TIMESTAMPTZ := NOW();
BEGIN
  -- Get active subscription with plan details
  SELECT s.*, p.comparisons_per_month, p.is_unlimited_comparisons
  INTO v_subscription
  FROM subscriptions s
  JOIN plans p ON s.plan_code = p.plan_code
  WHERE s.user_id = p_user_id
    AND s.status = 'active'
    AND s.current_period_end > v_now;

  IF v_subscription IS NULL THEN
    RETURN jsonb_build_object(
      'success', FALSE,
      'error', 'no_subscription',
      'message', 'Active subscription required for comparisons'
    );
  END IF;

  -- Check if unlimited
  IF v_subscription.is_unlimited_comparisons THEN
    -- Just increment, no limit check
    INSERT INTO usage_counters (user_id, period_start, period_end, analyses_used, comparisons_used)
    VALUES (p_user_id, v_subscription.current_period_start, v_subscription.current_period_end, 0, 1)
    ON CONFLICT (user_id, period_start)
    DO UPDATE SET
      comparisons_used = usage_counters.comparisons_used + 1,
      updated_at = NOW()
    RETURNING * INTO v_usage;

    RETURN jsonb_build_object(
      'success', TRUE,
      'source', 'subscription',
      'unlimited', TRUE,
      'comparisons_used', v_usage.comparisons_used
    );
  END IF;

  -- Check quota
  SELECT * INTO v_usage
  FROM usage_counters
  WHERE user_id = p_user_id
    AND period_start = v_subscription.current_period_start;

  IF v_usage IS NOT NULL AND v_usage.comparisons_used >= v_subscription.comparisons_per_month THEN
    RETURN jsonb_build_object(
      'success', FALSE,
      'error', 'quota_exceeded',
      'message', 'Monthly comparison limit reached',
      'limit', v_subscription.comparisons_per_month,
      'used', v_usage.comparisons_used
    );
  END IF;

  -- Increment usage
  INSERT INTO usage_counters (user_id, period_start, period_end, analyses_used, comparisons_used)
  VALUES (p_user_id, v_subscription.current_period_start, v_subscription.current_period_end, 0, 1)
  ON CONFLICT (user_id, period_start)
  DO UPDATE SET
    comparisons_used = usage_counters.comparisons_used + 1,
    updated_at = NOW()
  RETURNING * INTO v_usage;

  RETURN jsonb_build_object(
    'success', TRUE,
    'source', 'subscription',
    'comparisons_used', v_usage.comparisons_used,
    'limit', v_subscription.comparisons_per_month
  );
END;
$$;

-- Function to create or renew subscription (called by webhook)
CREATE OR REPLACE FUNCTION create_or_renew_subscription(
  p_user_id UUID,
  p_plan_code TEXT,
  p_provider TEXT DEFAULT 'fondy',
  p_provider_subscription_id TEXT DEFAULT NULL,
  p_provider_customer_id TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_plan RECORD;
  v_subscription RECORD;
  v_now TIMESTAMPTZ := NOW();
  v_period_end TIMESTAMPTZ;
BEGIN
  -- Get plan details
  SELECT * INTO v_plan FROM plans WHERE plan_code = p_plan_code AND is_active = TRUE;

  IF v_plan IS NULL THEN
    RETURN jsonb_build_object('success', FALSE, 'error', 'invalid_plan');
  END IF;

  -- Calculate period end (1 month from now)
  v_period_end := v_now + INTERVAL '1 month';

  -- Upsert subscription
  INSERT INTO subscriptions (
    user_id, plan_code, status,
    current_period_start, current_period_end,
    payment_provider, provider_subscription_id, provider_customer_id
  )
  VALUES (
    p_user_id, p_plan_code, 'active',
    v_now, v_period_end,
    p_provider, p_provider_subscription_id, p_provider_customer_id
  )
  ON CONFLICT (user_id)
  DO UPDATE SET
    plan_code = EXCLUDED.plan_code,
    status = 'active',
    current_period_start = v_now,
    current_period_end = v_period_end,
    cancel_at_period_end = FALSE,
    canceled_at = NULL,
    payment_provider = EXCLUDED.payment_provider,
    provider_subscription_id = EXCLUDED.provider_subscription_id,
    provider_customer_id = EXCLUDED.provider_customer_id,
    updated_at = NOW()
  RETURNING * INTO v_subscription;

  -- Create fresh usage counter for new period
  INSERT INTO usage_counters (user_id, period_start, period_end, analyses_used, comparisons_used)
  VALUES (p_user_id, v_now, v_period_end, 0, 0)
  ON CONFLICT (user_id, period_start)
  DO UPDATE SET
    period_end = v_period_end,
    analyses_used = 0,
    comparisons_used = 0,
    updated_at = NOW();

  RETURN jsonb_build_object(
    'success', TRUE,
    'subscription_id', v_subscription.id,
    'plan_code', p_plan_code,
    'period_end', v_period_end
  );
END;
$$;

-- Function to record one-time purchase (called by webhook)
CREATE OR REPLACE FUNCTION record_one_time_purchase(
  p_user_id UUID,
  p_payment_reference TEXT,
  p_amount DECIMAL DEFAULT 3.99,
  p_analyses_granted INTEGER DEFAULT 1
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_purchase RECORD;
BEGIN
  INSERT INTO one_time_purchases (
    user_id, product_code, analyses_granted,
    payment_reference, payment_amount
  )
  VALUES (
    p_user_id, 'cv_single_analysis', p_analyses_granted,
    p_payment_reference, p_amount
  )
  RETURNING * INTO v_purchase;

  RETURN jsonb_build_object(
    'success', TRUE,
    'purchase_id', v_purchase.id,
    'analyses_granted', p_analyses_granted
  );
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION get_user_entitlements(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_analysis_usage(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_comparison_usage(UUID) TO authenticated;
-- These should only be called by service role (webhook)
GRANT EXECUTE ON FUNCTION create_or_renew_subscription(UUID, TEXT, TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION record_one_time_purchase(UUID, TEXT, DECIMAL, INTEGER) TO service_role;
