export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      documents: {
        Row: {
          id: string
          user_id: string
          filename: string
          mime_type: string
          storage_path: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          filename: string
          mime_type: string
          storage_path: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          filename?: string
          mime_type?: string
          storage_path?: string
          created_at?: string
          updated_at?: string
        }
      }
      analysis_runs: {
        Row: {
          id: string
          document_id: string
          run_at: string
          model_version: string
        }
        Insert: {
          id?: string
          document_id: string
          run_at?: string
          model_version?: string
        }
        Update: {
          id?: string
          document_id?: string
          run_at?: string
          model_version?: string
        }
      }
      ai_scores: {
        Row: {
          id: string
          analysis_run_id: string
          readability_score: number
          market_signaling_score: number
          ats_friendliness_index: number
          overall_score: number
        }
        Insert: {
          id?: string
          analysis_run_id: string
          readability_score: number
          market_signaling_score: number
          ats_friendliness_index: number
          overall_score: number
        }
        Update: {
          id?: string
          analysis_run_id?: string
          readability_score?: number
          market_signaling_score?: number
          ats_friendliness_index?: number
          overall_score?: number
        }
      }
      ai_capital_analysis: {
        Row: {
          id: string
          analysis_run_id: string
          material_score: number
          social_score: number
          cultural_score: number
          symbolic_score: number
          technological_score: number
          evidence: Json
        }
        Insert: {
          id?: string
          analysis_run_id: string
          material_score: number
          social_score: number
          cultural_score: number
          symbolic_score: number
          technological_score: number
          evidence: Json
        }
        Update: {
          id?: string
          analysis_run_id?: string
          material_score?: number
          social_score?: number
          cultural_score?: number
          symbolic_score?: number
          technological_score?: number
          evidence?: Json
        }
      }
      ai_visual_metrics: {
        Row: {
          id: string
          analysis_run_id: string
          whitespace_score: number
          fixation_score: number
          typography_score: number
          hierarchy_score: number
          color_harmony_score: number
          hotspots: Json
        }
        Insert: {
          id?: string
          analysis_run_id: string
          whitespace_score: number
          fixation_score: number
          typography_score: number
          hierarchy_score: number
          color_harmony_score: number
          hotspots: Json
        }
        Update: {
          id?: string
          analysis_run_id?: string
          whitespace_score?: number
          fixation_score?: number
          typography_score?: number
          hierarchy_score?: number
          color_harmony_score?: number
          hotspots?: Json
        }
      }
    }
  }
}
