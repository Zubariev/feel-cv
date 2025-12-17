/**
 * Image Cache Service
 * Handles caching of analysis image layers and duplicate detection
 */

import { supabase } from './supabaseClient';

export type LayerType = 'raw' | 'heatmap' | 'skills' | 'heatmap_skills';

export interface DocumentLayer {
  id: string;
  analysis_id: string;
  document_id: string;
  user_id: string;
  layer_type: LayerType;
  storage_bucket: string;
  storage_path: string;
  width: number | null;
  height: number | null;
  file_size: number | null;
  mime_type: string;
  created_at: string;
}

export interface CachedAnalysis {
  analysisId: string;
  documentId: string;
  layers: DocumentLayer[];
}

/**
 * Computes SHA-256 hash of file content for duplicate detection
 */
export async function computeFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Computes hash from base64 image data
 */
export async function computeBase64Hash(base64Data: string): Promise<string> {
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export const imageCacheService = {
  /**
   * Check if a document with the same hash already exists for this user
   * Returns the existing analysis ID if found
   */
  async findExistingAnalysis(
    userId: string,
    fileHash: string
  ): Promise<CachedAnalysis | null> {
    const { data: fingerprint, error } = await supabase
      .from('document_fingerprints')
      .select(`
        document_id,
        documents:document_id (
          id,
          ai_analysis (
            id
          )
        )
      `)
      .eq('user_id', userId)
      .eq('file_hash', fileHash)
      .single();

    if (error || !fingerprint) {
      return null;
    }

    const doc = fingerprint.documents as any;
    if (!doc?.ai_analysis?.[0]?.id) {
      return null;
    }

    const analysisId = doc.ai_analysis[0].id;

    // Fetch all layers for this analysis
    const { data: layers } = await supabase
      .from('document_layers')
      .select('*')
      .eq('analysis_id', analysisId);

    return {
      analysisId,
      documentId: fingerprint.document_id,
      layers: (layers as DocumentLayer[]) || []
    };
  },

  /**
   * Save document fingerprint for future duplicate detection
   */
  async saveFingerprint(
    userId: string,
    documentId: string,
    fileHash: string,
    fileSize: number
  ): Promise<void> {
    const { error } = await supabase
      .from('document_fingerprints')
      .insert({
        user_id: userId,
        document_id: documentId,
        file_hash: fileHash,
        file_size: fileSize
      });

    if (error) {
      console.error('Failed to save fingerprint:', error);
      throw error;
    }
  },

  /**
   * Upload an image layer to storage
   */
  async uploadLayer(
    userId: string,
    analysisId: string,
    documentId: string,
    layerType: LayerType,
    imageDataUrl: string,
    width: number,
    height: number
  ): Promise<DocumentLayer | null> {
    try {
      // Convert data URL to blob
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();

      // Generate storage path
      const timestamp = Date.now();
      const storagePath = `${userId}/${analysisId}/${layerType}_${timestamp}.png`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('generated_layers_raw')
        .upload(storagePath, blob, {
          contentType: 'image/png',
          upsert: true
        });

      if (uploadError) {
        console.error('Failed to upload layer:', uploadError);
        return null;
      }

      // Save layer record
      const { data: layer, error: insertError } = await supabase
        .from('document_layers')
        .insert({
          analysis_id: analysisId,
          document_id: documentId,
          user_id: userId,
          layer_type: layerType,
          storage_bucket: 'generated_layers_raw',
          storage_path: storagePath,
          width,
          height,
          file_size: blob.size,
          mime_type: 'image/png'
        })
        .select()
        .single();

      if (insertError) {
        console.error('Failed to save layer record:', insertError);
        return null;
      }

      return layer as DocumentLayer;
    } catch (err) {
      console.error('Error uploading layer:', err);
      return null;
    }
  },

  /**
   * Get all layers for an analysis
   */
  async getLayers(analysisId: string): Promise<DocumentLayer[]> {
    const { data, error } = await supabase
      .from('document_layers')
      .select('*')
      .eq('analysis_id', analysisId);

    if (error) {
      console.error('Failed to fetch layers:', error);
      return [];
    }

    return (data as DocumentLayer[]) || [];
  },

  /**
   * Get signed URL for a layer image
   */
  async getLayerUrl(layer: DocumentLayer): Promise<string | null> {
    const { data, error } = await supabase.storage
      .from(layer.storage_bucket)
      .createSignedUrl(layer.storage_path, 3600); // 1 hour

    if (error) {
      console.error('Failed to get layer URL:', error);
      return null;
    }

    return data.signedUrl;
  },

  /**
   * Delete all layers for an analysis
   */
  async deleteLayers(analysisId: string, userId: string): Promise<void> {
    // Get layers to delete from storage
    const { data: layers } = await supabase
      .from('document_layers')
      .select('storage_path, storage_bucket')
      .eq('analysis_id', analysisId)
      .eq('user_id', userId);

    if (layers && layers.length > 0) {
      // Delete from storage
      const paths = layers.map(l => l.storage_path);
      await supabase.storage
        .from('generated_layers_raw')
        .remove(paths);
    }

    // Delete records (will cascade from analysis deletion)
    await supabase
      .from('document_layers')
      .delete()
      .eq('analysis_id', analysisId)
      .eq('user_id', userId);
  }
};
