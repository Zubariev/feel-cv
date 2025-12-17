import { AnalysisResult } from '../types';
import { Database, Json } from '../types/supabase';

// NOTE: This service assumes you have a Supabase client initialized. 
// Since we are in a pure frontend context without the actual Supabase instance injected, 
// these are the structural functions you would call.

import { supabase } from './supabaseClient';

export const databaseService = {
  
  /**
   * Saves a full analysis result to the database.
   * Corresponds to the hierarchy: Document -> AnalysisRun -> [Scores, Capital, Visuals, Entities]
   */
  async saveAnalysisResult(
    userId: string,
    file: File,
    analysis: AnalysisResult
  ): Promise<string> {
    console.log('Saving analysis for user:', userId);

    try {
      // 1. Upload File to Storage (Bucket: user_uploads_raw)
      const fileExtension =
        file.name.includes('.') ? file.name.split('.').pop()!.toLowerCase() : '';

      const storagePath = `${userId}/${crypto.randomUUID()}_${file.name}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('user_uploads_raw')
        .upload(storagePath, file);

      if (uploadError) throw uploadError;

      // 2. Create Document Record
      const { data: document, error: documentError } = await supabase
        .from('documents')
        .insert({
          user_id: userId,
          original_filename: file.name,
          mime_type: file.type,
          file_extension: fileExtension,
          storage_bucket: 'user_uploads_raw',
          storage_path: uploadData.path,
          file_size: file.size
        } satisfies Database['public']['Tables']['documents']['Insert'])
        .select()
        .single();

      if (documentError || !document) throw documentError;

      // 3. Create AI Analysis session
      const { data: analysisRow, error: analysisError } = await supabase
        .from('ai_analysis')
        .insert({
          user_id: userId,
          document_id: document.id,
          model_used: 'gemini-2.5-flash',
          version: '1.0',
          overall_score: analysis.overallScore
        } satisfies Database['public']['Tables']['ai_analysis']['Insert'])
        .select()
        .single();

      if (analysisError || !analysisRow) throw analysisError;

      const analysisId = analysisRow.id;

      // 4. Save Individual Scores
      const scoreRows: Database['public']['Tables']['ai_scores']['Insert'][] = [
        {
          analysis_id: analysisId,
          category: 'overall',
          score: analysis.overallScore,
          details: {
            readabilityScore: analysis.readabilityScore,
            marketSignalingScore: analysis.marketSignalingScore,
            atsFriendlinessIndex: analysis.atsFriendlinessIndex
          } as Json
        },
        {
          analysis_id: analysisId,
          category: 'readability',
          score: analysis.readabilityScore,
          details: null
        },
        {
          analysis_id: analysisId,
          category: 'market_signaling',
          score: analysis.marketSignalingScore,
          details: null
        },
        {
          analysis_id: analysisId,
          category: 'ats_friendliness',
          score: analysis.atsFriendlinessIndex,
          details: null
        }
      ];

      const { error: scoresError } = await supabase
        .from('ai_scores')
        .insert(scoreRows);

      if (scoresError) throw scoresError;

      // 5. Save Capital Analysis
      const capitalEvidence = analysis.capitalEvidence as unknown as Record<
        string,
        Json
      >;

      const capitalRows: Database['public']['Tables']['ai_capital_analysis']['Insert'][] =
        [
          'material',
          'social',
          'cultural',
          'symbolic',
          'technological'
        ].map((capitalType) => ({
          analysis_id: analysisId,
          capital_type: capitalType,
          evidence: capitalEvidence[capitalType] ?? null
        }));

      const { error: capitalError } = await supabase
        .from('ai_capital_analysis')
        .insert(capitalRows);

      if (capitalError) throw capitalError;

      // 6. Save Semantic Metrics
      const semanticMetricRows: Database['public']['Tables']['ai_semantic_metrics']['Insert'][] =
        [
          {
            metric_name: 'skill_composition',
            metric_value: analysis.skillComposition as unknown as Json
          },
          {
            metric_name: 'visual_metrics',
            metric_value: analysis.visualAnalysis as unknown as Json
          }
        ].map((metric) => ({
          analysis_id: analysisId,
          metric_name: metric.metric_name,
          metric_value: metric.metric_value
        }));

      const { error: metricsError } = await supabase
        .from('ai_semantic_metrics')
        .insert(semanticMetricRows);

      if (metricsError) throw metricsError;

      // 7. Save Recommendations
      const recommendationRows: Database['public']['Tables']['ai_recommendations']['Insert'][] =
        [
          ...analysis.keyStrengths.map((text) => ({
            category: 'strength',
            text
          })),
          ...analysis.improvementAreas.map((text) => ({
            category: 'improvement',
            text
          }))
        ].map((row) => ({
          analysis_id: analysisId,
          category: row.category,
          text: row.text
        }));

      if (recommendationRows.length > 0) {
        const { error: recommendationsError } = await supabase
          .from('ai_recommendations')
          .insert(recommendationRows);

        if (recommendationsError) throw recommendationsError;
      }

      return analysisId;
    } catch (error) {
      console.error('Database save failed:', error);
      throw error;
    }
  },

  /**
   * Fetches a past analysis by ID.
   */
  async getAnalysis(analysisId: string) {
    const { data, error } = await supabase
      .from('ai_analysis')
      .select(
        `
        *,
        scores:ai_scores(*),
        capital:ai_capital_analysis(*),
        recommendations:ai_recommendations(*),
        semantic_metrics:ai_semantic_metrics(*)
      `
      )
      .eq('id', analysisId)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Lists all analyses for a user, with document info.
   */
  async listUserAnalyses(userId: string) {
    const { data, error } = await supabase
      .from('ai_analysis')
      .select(
        `
        id,
        created_at,
        overall_score,
        model_used,
        document:documents(
          id,
          original_filename,
          mime_type,
          file_size,
          storage_path
        ),
        scores:ai_scores(category, score)
      `
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  /**
   * Deletes an analysis and its associated document.
   */
  async deleteAnalysis(analysisId: string, userId: string) {
    // First get the document info to delete the file from storage
    const { data: analysis, error: fetchError } = await supabase
      .from('ai_analysis')
      .select('document_id, document:documents(storage_path)')
      .eq('id', analysisId)
      .eq('user_id', userId)
      .single();

    if (fetchError) throw fetchError;

    // Delete from storage if we have a path
    const storagePath = (analysis?.document as any)?.storage_path;
    if (storagePath) {
      await supabase.storage
        .from('user_uploads_raw')
        .remove([storagePath]);
    }

    // Delete analysis (cascades to related tables via FK)
    const { error: deleteError } = await supabase
      .from('ai_analysis')
      .delete()
      .eq('id', analysisId)
      .eq('user_id', userId);

    if (deleteError) throw deleteError;

    // Delete document record
    if (analysis?.document_id) {
      await supabase
        .from('documents')
        .delete()
        .eq('id', analysis.document_id)
        .eq('user_id', userId);
    }

    return true;
  },

  /**
   * Gets a signed URL for a document file.
   */
  async getDocumentUrl(storagePath: string): Promise<string | null> {
    const { data, error } = await supabase.storage
      .from('user_uploads_raw')
      .createSignedUrl(storagePath, 3600); // 1 hour expiry

    if (error) {
      console.error('Failed to get signed URL:', error);
      return null;
    }
    return data.signedUrl;
  }
};
