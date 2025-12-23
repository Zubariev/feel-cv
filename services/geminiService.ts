/**
 * Gemini Service
 *
 * This service handles resume analysis by calling the analyze-resume Edge Function.
 * The API key is stored securely on the server (never exposed to frontend).
 *
 * Security: All AI API calls are proxied through Supabase Edge Functions.
 */

import { AnalysisResult } from "../types";
import { supabase } from "./supabaseClient";

export const analyzeResume = async (
  base64Image: string,
  mimeType: string
): Promise<AnalysisResult> => {
  // Get current session for authorization
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new Error("You must be logged in to analyze a resume");
  }

  try {
    // Use supabase.functions.invoke which handles auth automatically
    const { data, error } = await supabase.functions.invoke('analyze-resume', {
      body: {
        base64Image,
        mimeType,
      },
    });

    if (error) {
      console.error("Edge function error:", error);
      throw new Error(error.message || "Analysis failed");
    }

    return data as AnalysisResult;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};
