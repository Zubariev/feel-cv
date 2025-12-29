-- 20240101000010_webhook_retry_queue.sql
-- Webhook retry queue for failed payment webhooks
-- ================================================

-- ============================================
-- Table: webhook_retry_queue
-- ============================================
-- Stores failed webhook payloads for retry with exponential backoff

CREATE TABLE public.webhook_retry_queue (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Webhook details
    webhook_type TEXT NOT NULL DEFAULT 'fondy',
    payload JSONB NOT NULL,

    -- Retry tracking
    attempt_count INTEGER NOT NULL DEFAULT 0,
    max_attempts INTEGER NOT NULL DEFAULT 5,
    next_retry_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_error TEXT,

    -- Status
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,

    -- Metadata
    order_id TEXT,
    user_id UUID
);

-- Indexes for efficient queries
CREATE INDEX idx_webhook_retry_status ON public.webhook_retry_queue(status);
CREATE INDEX idx_webhook_retry_next ON public.webhook_retry_queue(next_retry_at) WHERE status = 'pending';
CREATE INDEX idx_webhook_retry_order ON public.webhook_retry_queue(order_id);

-- ============================================
-- Function: Calculate next retry time with exponential backoff
-- ============================================
-- Backoff: 1min, 2min, 4min, 8min, 16min (max)

CREATE OR REPLACE FUNCTION calculate_next_retry(attempt INTEGER)
RETURNS TIMESTAMP WITH TIME ZONE AS $$
BEGIN
    -- Exponential backoff: 2^attempt minutes, capped at 16 minutes
    RETURN NOW() + (LEAST(POWER(2, attempt), 16) * INTERVAL '1 minute');
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Function: Queue a failed webhook for retry
-- ============================================

CREATE OR REPLACE FUNCTION queue_webhook_retry(
    p_webhook_type TEXT,
    p_payload JSONB,
    p_error TEXT,
    p_order_id TEXT DEFAULT NULL,
    p_user_id UUID DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    v_queue_id UUID;
BEGIN
    INSERT INTO public.webhook_retry_queue (
        webhook_type,
        payload,
        attempt_count,
        next_retry_at,
        last_error,
        order_id,
        user_id
    ) VALUES (
        p_webhook_type,
        p_payload,
        1,  -- First failure counts as attempt 1
        calculate_next_retry(1),
        p_error,
        p_order_id,
        p_user_id
    )
    RETURNING id INTO v_queue_id;

    RETURN v_queue_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Function: Get pending webhooks for retry
-- ============================================

CREATE OR REPLACE FUNCTION get_pending_webhook_retries(p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
    id UUID,
    webhook_type TEXT,
    payload JSONB,
    attempt_count INTEGER,
    max_attempts INTEGER,
    order_id TEXT,
    user_id UUID
) AS $$
BEGIN
    RETURN QUERY
    UPDATE public.webhook_retry_queue q
    SET
        status = 'processing',
        updated_at = NOW()
    WHERE q.id IN (
        SELECT sq.id
        FROM public.webhook_retry_queue sq
        WHERE sq.status = 'pending'
          AND sq.next_retry_at <= NOW()
          AND sq.attempt_count < sq.max_attempts
        ORDER BY sq.next_retry_at
        LIMIT p_limit
        FOR UPDATE SKIP LOCKED
    )
    RETURNING
        q.id,
        q.webhook_type,
        q.payload,
        q.attempt_count,
        q.max_attempts,
        q.order_id,
        q.user_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Function: Mark webhook retry as completed
-- ============================================

CREATE OR REPLACE FUNCTION complete_webhook_retry(p_queue_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.webhook_retry_queue
    SET
        status = 'completed',
        completed_at = NOW(),
        updated_at = NOW()
    WHERE id = p_queue_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Function: Mark webhook retry as failed (schedule next retry)
-- ============================================

CREATE OR REPLACE FUNCTION fail_webhook_retry(p_queue_id UUID, p_error TEXT)
RETURNS VOID AS $$
DECLARE
    v_attempt_count INTEGER;
    v_max_attempts INTEGER;
BEGIN
    SELECT attempt_count, max_attempts
    INTO v_attempt_count, v_max_attempts
    FROM public.webhook_retry_queue
    WHERE id = p_queue_id;

    IF v_attempt_count >= v_max_attempts THEN
        -- Max retries exceeded - mark as permanently failed
        UPDATE public.webhook_retry_queue
        SET
            status = 'failed',
            last_error = p_error,
            updated_at = NOW()
        WHERE id = p_queue_id;
    ELSE
        -- Schedule next retry with exponential backoff
        UPDATE public.webhook_retry_queue
        SET
            status = 'pending',
            attempt_count = attempt_count + 1,
            next_retry_at = calculate_next_retry(v_attempt_count + 1),
            last_error = p_error,
            updated_at = NOW()
        WHERE id = p_queue_id;
    END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- Cleanup old completed/failed entries (run periodically)
-- ============================================

CREATE OR REPLACE FUNCTION cleanup_webhook_retry_queue(p_days_old INTEGER DEFAULT 30)
RETURNS INTEGER AS $$
DECLARE
    v_deleted INTEGER;
BEGIN
    DELETE FROM public.webhook_retry_queue
    WHERE (status = 'completed' OR status = 'failed')
      AND updated_at < NOW() - (p_days_old * INTERVAL '1 day');

    GET DIAGNOSTICS v_deleted = ROW_COUNT;
    RETURN v_deleted;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- RLS Policies (admin only - Edge Functions use service role)
-- ============================================

ALTER TABLE public.webhook_retry_queue ENABLE ROW LEVEL SECURITY;

-- No user-facing policies - this table is only accessed by Edge Functions with service role
