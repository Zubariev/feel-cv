# Database Architecture: CV Intelligence Engine

This document outlines the PostgreSQL database schema and Supabase Storage structure for the CV Intelligence Engine.

## 1. Core Structure
The database is organized into four logical layers:

1.  **Ingestion Layer**: Handles raw file uploads and ownership.
2.  **Extraction Layer**: Stores raw OCR text, parsed sections, and vector embeddings.
3.  **Intelligence Layer**: Stores AI analysis runs, scoring, Bourdieu capital metrics, and detected entities.
4.  **Visual Layer**: Stores references to generated saliency maps and visual diagnostic data.

## 2. Table Relationships (Schema)

### Users (auth.users)
|
+-- **documents** (1:N)
    |
    +-- **document_content** (1:1) -> *OCR Text*
    +-- **document_embeddings** (1:N) -> *Vector Search*
    +-- **analysis_runs** (1:N) -> *Allows re-analysis*
        |
        +-- **ai_scores** (1:1) -> *Quant Metrics*
        +-- **ai_capital_analysis** (1:1) -> *Bourdieu Metrics*
        +-- **ai_recommendations** (1:1) -> *Text Summaries*
        +-- **ai_detected_entities** (1:N) -> *Skills/BBoxes*
        +-- **ai_visual_metrics** (1:1) -> *Layout Scores*
        +-- **generated_images** (1:N) -> *Saliency Map Links*

## 3. Storage Buckets

| Bucket Name | Purpose | Privacy | Path Structure |
| :--- | :--- | :--- | :--- |
| `user_uploads_raw` | Original PDFs and Images | Private | `{user_id}/{uuid}.pdf` |
| `generated_layers_raw` | High-res AI Heatmaps | Private | `{user_id}/{analysis_id}/saliency.png` |
| `generated_layers_preview` | UI-optimized Previews | Private | `{user_id}/{analysis_id}/preview.jpg` |

## 4. Key Technologies
*   **Vector Embeddings**: `pgvector` with HNSW indexing (768 dimensions for Gemini).
*   **RLS**: Enabled on all tables to ensure strict data isolation.
*   **JSONB**: Used for flexible schema data like `skill_highlights` (bounding boxes) and `evidence` lists.
