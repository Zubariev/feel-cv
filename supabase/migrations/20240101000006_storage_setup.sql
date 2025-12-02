-- 20240101000006_storage_setup.sql
-- Supabase bucket configuration
-- ==============================

INSERT INTO storage.buckets (id, name, public)
VALUES 
    ('user_uploads_raw', 'user_uploads_raw', FALSE),
    ('generated_layers_raw', 'generated_layers_raw', FALSE),
    ('generated_layers_preview', 'generated_layers_preview', FALSE)
ON CONFLICT DO NOTHING;

-- Storage policies (Supabase edge auth)
CREATE POLICY "Users can upload own files" 
    ON storage.objects FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can read own files" 
    ON storage.objects FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Users can delete own files" 
    ON storage.objects FOR DELETE
    USING (auth.role() = 'authenticated');
