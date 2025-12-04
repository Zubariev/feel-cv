-- 20240101000004_visual_layer.sql
-- Tables for AI-generated images (saliency, layout, overlays)
-- ============================================================

CREATE TABLE public.generated_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL,
    user_id UUID NOT NULL,
    document_id UUID NOT NULL,

    image_type TEXT NOT NULL,  -- saliency, whitespace, hierarchy, typography, fixation, etc.
    storage_bucket TEXT NOT NULL DEFAULT 'generated_layers_raw',
    storage_path TEXT NOT NULL,
    width INT,
    height INT,
    checksum TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT fk_generated_images_analysis FOREIGN KEY (analysis_id) REFERENCES public.ai_analysis(id) ON DELETE CASCADE,
    CONSTRAINT fk_generated_images_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
    CONSTRAINT fk_generated_images_document FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE
);

CREATE INDEX idx_generated_images_analysis ON public.generated_images(analysis_id);
CREATE INDEX idx_generated_images_type ON public.generated_images(image_type);
CREATE INDEX idx_generated_images_document ON public.generated_images(document_id);
