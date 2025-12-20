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

      // Sanitize filename for storage (remove special characters, keep alphanumeric, dots, underscores, hyphens)
      const sanitizedFilename = file.name
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .replace(/_+/g, '_');
      const storagePath = `${userId}/${crypto.randomUUID()}_${sanitizedFilename}`;

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
          },
          {
            metric_name: 'tone_profile',
            metric_value: analysis.toneProfile as unknown as Json
          },
          {
            metric_name: 'capital_distribution',
            metric_value: analysis.capitalDistribution as unknown as Json
          },
          {
            metric_name: 'top_skills',
            metric_value: {
              hard: analysis.topHardSkills,
              soft: analysis.topSoftSkills
            } as unknown as Json
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
      .select('*, ai_scores(*), ai_capital_analysis(*), ai_recommendations(*), ai_semantic_metrics(*)')
      .eq('id', analysisId)
      .single();

    if (error) throw error;

    // Transform to expected format
    return data ? {
      ...data,
      scores: (data as any).ai_scores,
      capital: (data as any).ai_capital_analysis,
      recommendations: (data as any).ai_recommendations,
      semantic_metrics: (data as any).ai_semantic_metrics
    } : null;
  },

  /**
   * Reconstructs a full AnalysisResult from database records.
   * Used for comparison feature.
   */
  async getFullAnalysisResult(analysisId: string): Promise<AnalysisResult | null> {
    const data = await this.getAnalysis(analysisId);
    if (!data) return null;

    // Helper to find a score by category
    const findScore = (category: string): number => {
      const score = (data.scores as any[])?.find((s) => s.category === category);
      return score?.score ?? 0;
    };

    // Helper to find a semantic metric by name
    const findMetric = (metricName: string): any => {
      const metric = (data.semantic_metrics as any[])?.find(
        (m) => m.metric_name === metricName
      );
      return metric?.metric_value ?? null;
    };

    // Build capital evidence from capital analysis records
    const capitalEvidence: AnalysisResult['capitalEvidence'] = {
      material: [],
      social: [],
      cultural: [],
      symbolic: [],
      technological: []
    };
    (data.capital as any[])?.forEach((c) => {
      const type = c.capital_type as keyof typeof capitalEvidence;
      if (type in capitalEvidence && Array.isArray(c.evidence)) {
        capitalEvidence[type] = c.evidence;
      }
    });

    // Extract recommendations
    const keyStrengths: string[] = [];
    const improvementAreas: string[] = [];
    (data.recommendations as any[])?.forEach((r) => {
      if (r.category === 'strength') {
        keyStrengths.push(r.text);
      } else if (r.category === 'improvement') {
        improvementAreas.push(r.text);
      }
    });

    // Get parsed metrics from semantic_metrics
    const skillComposition = findMetric('skill_composition') || {
      hardSkills: 0,
      softSkills: 0,
      education: 0,
      impact: 0
    };
    const visualAnalysis = findMetric('visual_metrics') || {
      whitespaceScore: 0,
      typographyScore: 0,
      hierarchyScore: 0,
      colorHarmonyScore: 0,
      fixationScore: 0
    };
    const toneProfile = findMetric('tone_profile') || {
      formal: 0,
      professional: 0,
      confident: 0,
      assertive: 0,
      approachable: 0
    };
    const capitalDistribution = findMetric('capital_distribution') || {
      material: 0,
      social: 0,
      cultural: 0,
      symbolic: 0,
      technological: 0
    };
    const topSkills = findMetric('top_skills') || { hard: [], soft: [] };

    return {
      overallScore: findScore('overall'),
      readabilityScore: findScore('readability'),
      marketSignalingScore: findScore('market_signaling'),
      atsFriendlinessIndex: findScore('ats_friendliness'),
      capitalDistribution,
      capitalEvidence,
      toneProfile,
      skillComposition,
      visualAnalysis,
      visualHotspots: [], // Not stored in DB, only used during initial display
      skillHighlights: [], // Not stored in DB, only used during initial display
      topHardSkills: topSkills.hard || [],
      topSoftSkills: topSkills.soft || [],
      keyStrengths,
      improvementAreas
    };
  },

  /**
   * Lists all analyses for a user, with document info.
   */
  async listUserAnalyses(userId: string) {
    const { data, error } = await supabase
      .from('ai_analysis')
      .select('id, started_at, overall_score, model_used, document_id, documents(id, original_filename, mime_type, file_size, storage_path), ai_scores(category, score)')
      .eq('user_id', userId)
      .order('started_at', { ascending: false });

    if (error) throw error;

    // Transform the data to match expected format (map started_at to created_at for compatibility)
    return data?.map(item => ({
      ...item,
      created_at: (item as any).started_at,
      document: (item as any).documents,
      scores: (item as any).ai_scores
    }));
  },

  /**
   * Deletes an analysis and its associated document.
   */
  async deleteAnalysis(analysisId: string, userId: string) {
    // First get the document info to delete the file from storage
    const { data: analysis, error: fetchError } = await supabase
      .from('ai_analysis')
      .select('document_id, documents(storage_path)')
      .eq('id', analysisId)
      .eq('user_id', userId)
      .single();

    if (fetchError) throw fetchError;

    // Delete from storage if we have a path
    const storagePath = (analysis as any)?.documents?.storage_path;
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
