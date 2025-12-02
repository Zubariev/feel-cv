-- 20240101000005_rls_policies.sql
-- RLS Policies for all user-owned tables
-- ======================================

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_text_extracted ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_detected_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_capital_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_semantic_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_images ENABLE ROW LEVEL SECURITY;

-- Generic owner-check policy
CREATE POLICY "User can access own rows" ON public.documents
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "User can access own rows" ON public.document_text_extracted
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "User can access own rows" ON public.document_sections
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "User can access own rows" ON public.document_embeddings
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "User can access own rows" ON public.document_detected_skills
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "User can access own rows" ON public.ai_analysis
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY "User can access own rows" ON public.ai_scores
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.ai_analysis a WHERE a.id = analysis_id AND a.user_id = auth.uid()
    ));

CREATE POLICY "User can access own rows" ON public.ai_capital_analysis
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.ai_analysis a WHERE a.id = analysis_id AND a.user_id = auth.uid()
    ));

CREATE POLICY "User can access own rows" ON public.ai_recommendations
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.ai_analysis a WHERE a.id = analysis_id AND a.user_id = auth.uid()
    ));

CREATE POLICY "User can access own rows" ON public.ai_semantic_metrics
    FOR ALL USING (EXISTS (
        SELECT 1 FROM public.ai_analysis a WHERE a.id = analysis_id AND a.user_id = auth.uid()
    ));

CREATE POLICY "User can access own rows" ON public.generated_images
    FOR ALL USING (user_id = auth.uid());
