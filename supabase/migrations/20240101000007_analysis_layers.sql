-- 20240101000007_analysis_layers.sql
-- Tables for storing generated analysis image layers and caching
-- ==============================================================

-- ============================================
-- Table: document_layers (cached image renders)
-- ============================================
-- Stores different visual layers generated during analysis:
-- - raw: Original PDF page converted to image
-- - heatmap: Saliency heatmap overlay
-- - skills: Skills bounding box overlay
-- - heatmap_skills: Combined heatmap + skills overlay

CREATE TABLE public.document_layers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    analysis_id UUID NOT NULL,
    document_id UUID NOT NULL,
    user_id UUID NOT NULL,

    -- Layer type: 'raw', 'heatmap', 'skills', 'heatmap_skills'
    layer_type TEXT NOT NULL CHECK (layer_type IN ('raw', 'heatmap', 'skills', 'heatmap_skills')),

    -- Storage location
    storage_bucket TEXT NOT NULL DEFAULT 'generated_layers_raw',
    storage_path TEXT NOT NULL,

    -- Image metadata
    width INTEGER,
    height INTEGER,
    file_size BIGINT,
    mime_type TEXT DEFAULT 'image/png',

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Foreign keys
    CONSTRAINT fk_layers_analysis FOREIGN KEY (analysis_id) REFERENCES public.ai_analysis(id) ON DELETE CASCADE,
    CONSTRAINT fk_layers_document FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE,
    CONSTRAINT fk_layers_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,

    -- Ensure unique layer type per analysis
    CONSTRAINT unique_layer_per_analysis UNIQUE (analysis_id, layer_type)
);

CREATE INDEX idx_layers_analysis_id ON public.document_layers(analysis_id);
CREATE INDEX idx_layers_document_id ON public.document_layers(document_id);
CREATE INDEX idx_layers_user_id ON public.document_layers(user_id);
CREATE INDEX idx_layers_type ON public.document_layers(layer_type);

-- ============================================
-- Table: document_fingerprints (for duplicate detection)
-- ============================================
-- Stores file hashes for quick duplicate detection

CREATE TABLE public.document_fingerprints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL,
    user_id UUID NOT NULL,

    -- File fingerprint (SHA-256 hash of file content)
    file_hash TEXT NOT NULL,

    -- Optional: perceptual hash for image similarity (future use)
    perceptual_hash TEXT,

    -- File metadata used for quick matching
    file_size BIGINT NOT NULL,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Foreign keys
    CONSTRAINT fk_fingerprint_document FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE,
    CONSTRAINT fk_fingerprint_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Index for fast hash lookups (per user for privacy)
CREATE INDEX idx_fingerprints_user_hash ON public.document_fingerprints(user_id, file_hash);
CREATE INDEX idx_fingerprints_document ON public.document_fingerprints(document_id);

-- ============================================
-- RLS Policies for document_layers
-- ============================================

ALTER TABLE public.document_layers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own layers"
    ON public.document_layers FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own layers"
    ON public.document_layers FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own layers"
    ON public.document_layers FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================
-- RLS Policies for document_fingerprints
-- ============================================

ALTER TABLE public.document_fingerprints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own fingerprints"
    ON public.document_fingerprints FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own fingerprints"
    ON public.document_fingerprints FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own fingerprints"
    ON public.document_fingerprints FOR DELETE
    USING (auth.uid() = user_id);
