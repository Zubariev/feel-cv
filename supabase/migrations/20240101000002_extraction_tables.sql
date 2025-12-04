-- 20240101000002_extraction_tables.sql
-- Tables for extracted text, structure, skills, embeddings
-- ==========================================================

CREATE EXTENSION IF NOT EXISTS "pgvector";

-- ============================================
-- Extracted plain text per document
-- ============================================
CREATE TABLE public.document_text_extracted (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL,
    user_id UUID NOT NULL,
    full_text TEXT,
    ocr_confidence FLOAT,
    extracted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT fk_text_document FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE,
    CONSTRAINT fk_text_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX idx_text_document_id ON public.document_text_extracted(document_id);

-- ============================================
-- Extracted structured sections (JSON)
-- ============================================
CREATE TABLE public.document_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL,
    user_id UUID NOT NULL,
    section_type TEXT NOT NULL,  -- experience, education, skills, etc.
    content JSONB NOT NULL,
    extracted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT fk_sections_document FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE,
    CONSTRAINT fk_sections_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX idx_sections_document_id ON public.document_sections(document_id);
CREATE INDEX idx_sections_type ON public.document_sections(section_type);

-- ============================================
-- Semantic embeddings for sections or documents
-- ============================================
CREATE TABLE public.document_embeddings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL,
    user_id UUID NOT NULL,
    embedding VECTOR(1536), -- adjust dimension to your model
    embedding_type TEXT NOT NULL, -- "document", "section", etc.
    reference_id UUID,            -- section or text id
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT fk_embeddings_document FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE,
    CONSTRAINT fk_embeddings_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX idx_embeddings_document ON public.document_embeddings(document_id);
CREATE INDEX idx_embeddings_type ON public.document_embeddings(embedding_type);
CREATE INDEX idx_embeddings_vector ON public.document_embeddings USING ivfflat (embedding vector_l2_ops);

-- ============================================
-- Detected skills from the document
-- ============================================
CREATE TABLE public.document_detected_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id UUID NOT NULL,
    user_id UUID NOT NULL,
    skill_name TEXT NOT NULL,
    confidence FLOAT,
    extracted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT fk_skills_document FOREIGN KEY (document_id) REFERENCES public.documents(id) ON DELETE CASCADE,
    CONSTRAINT fk_skills_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

CREATE INDEX idx_skills_document ON public.document_detected_skills(document_id);
CREATE INDEX idx_skills_name ON public.document_detected_skills(skill_name);
