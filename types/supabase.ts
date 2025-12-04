export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      documents: {
        Row: {
          id: string;
          user_id: string;
          original_filename: string;
          mime_type: string;
          file_extension: string;
          storage_bucket: string;
          storage_path: string;
          file_size: number | null;
          uploaded_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          original_filename: string;
          mime_type: string;
          file_extension: string;
          storage_bucket?: string;
          storage_path: string;
          file_size?: number | null;
          uploaded_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          original_filename?: string;
          mime_type?: string;
          file_extension?: string;
          storage_bucket?: string;
          storage_path?: string;
          file_size?: number | null;
          uploaded_at?: string;
          updated_at?: string;
        };
      };
      ai_analysis: {
        Row: {
          id: string;
          user_id: string;
          document_id: string;
          started_at: string;
          finished_at: string | null;
          model_used: string | null;
          version: string | null;
          overall_score: number | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          document_id: string;
          started_at?: string;
          finished_at?: string | null;
          model_used?: string | null;
          version?: string | null;
          overall_score?: number | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          document_id?: string;
          started_at?: string;
          finished_at?: string | null;
          model_used?: string | null;
          version?: string | null;
          overall_score?: number | null;
        };
      };
      ai_scores: {
        Row: {
          id: string;
          analysis_id: string;
          category: string;
          score: number | null;
          details: Json | null;
        };
        Insert: {
          id?: string;
          analysis_id: string;
          category: string;
          score?: number | null;
          details?: Json | null;
        };
        Update: {
          id?: string;
          analysis_id?: string;
          category?: string;
          score?: number | null;
          details?: Json | null;
        };
      };
      ai_capital_analysis: {
        Row: {
          id: string;
          analysis_id: string;
          capital_type: string;
          evidence: Json;
        };
        Insert: {
          id?: string;
          analysis_id: string;
          capital_type: string;
          evidence: Json;
        };
        Update: {
          id?: string;
          analysis_id?: string;
          capital_type?: string;
          evidence?: Json;
        };
      };
      ai_recommendations: {
        Row: {
          id: string;
          analysis_id: string;
          category: string;
          text: string;
        };
        Insert: {
          id?: string;
          analysis_id: string;
          category: string;
          text: string;
        };
        Update: {
          id?: string;
          analysis_id?: string;
          category?: string;
          text?: string;
        };
      };
      ai_semantic_metrics: {
        Row: {
          id: string;
          analysis_id: string;
          metric_name: string;
          metric_value: Json;
        };
        Insert: {
          id?: string;
          analysis_id: string;
          metric_name: string;
          metric_value: Json;
        };
        Update: {
          id?: string;
          analysis_id?: string;
          metric_name?: string;
          metric_value?: Json;
        };
      };
      generated_images: {
        Row: {
          id: string;
          analysis_id: string;
          user_id: string;
          document_id: string;
          image_type: string;
          storage_bucket: string;
          storage_path: string;
          width: number | null;
          height: number | null;
          checksum: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          analysis_id: string;
          user_id: string;
          document_id: string;
          image_type: string;
          storage_bucket?: string;
          storage_path: string;
          width?: number | null;
          height?: number | null;
          checksum?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          analysis_id?: string;
          user_id?: string;
          document_id?: string;
          image_type?: string;
          storage_bucket?: string;
          storage_path?: string;
          width?: number | null;
          height?: number | null;
          checksum?: string | null;
          created_at?: string;
        };
      };
    };
  };
}

