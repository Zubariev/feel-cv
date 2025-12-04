-- 20240101000003_ai_analysis_core.sql
-- Core tables for AI analysis, scores, capital evaluation, semantic metrics
-- ==========================================================================

-- ============================================
-- AI analysis session
-- ============================================
CREATE TABLE public.ai_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    document_id UUID NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    finished_at TIMESTAMP WITH TIME ZONE,
    model_used TEXT DEFAULT 'gemini-3-preview',
    version TEXT DEFAULT '1.0',
    overall_score FLOAT,

    CONSTRAINT fk_ai_analysis_document FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE,
    CONSTRAINT fk_ai_analysis_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX idx_ai_analysis_document ON public.ai_analysis(document_id);
CREATE INDEX idx_ai_analysis_user ON public.ai_analysis(user_id);

-- ============================================
-- Individual Scoring Metrics
-- ============================================
CREATE TABLE public.ai_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL,
    category TEXT NOT NULL,  -- ATS, Market Signaling, Layout, Typography etc.
    score FLOAT,
    details JSONB,

    CONSTRAINT fk_scores_analysis FOREIGN KEY (analysis_id) REFERENCES public.ai_analysis(id) ON DELETE CASCADE
);

CREATE INDEX idx_scores_analysis ON public.ai_scores(analysis_id);

-- ============================================
-- Bourdieu Forms of Capital
-- ============================================
CREATE TABLE public.ai_capital_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL,
    capital_type TEXT NOT NULL,  -- material, cultural, social, symbolic, technological
    evidence JSONB NOT NULL,

    CONSTRAINT fk_capital_analysis FOREIGN KEY (analysis_id) REFERENCES public.ai_analysis(id) ON DELETE CASCADE
);

CREATE INDEX idx_capital_analysis ON public.ai_capital_analysis(analysis_id);

-- ============================================
-- Recommendations (Strengths, Areas to Improve)
-- ============================================
CREATE TABLE public.ai_recommendations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL,
    category TEXT NOT NULL,    -- "strength", "improvement"
    text TEXT NOT NULL,

    CONSTRAINT fk_recommendations_analysis FOREIGN KEY (analysis_id) REFERENCES public.ai_analysis(id) ON DELETE CASCADE
);

CREATE INDEX idx_recommendations_analysis ON public.ai_recommendations(analysis_id);

-- ============================================
-- Semantic Metrics (skill distribution, density)
-- ============================================
CREATE TABLE public.ai_semantic_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL,
    metric_name TEXT NOT NULL,
    metric_value JSONB NOT NULL,

    CONSTRAINT fk_semantic_metrics FOREIGN KEY (analysis_id) REFERENCES public.ai_analysis(id) ON DELETE CASCADE
);

CREATE INDEX idx_semantic_metrics_analysis ON public.ai_semantic_metrics(analysis_id);
