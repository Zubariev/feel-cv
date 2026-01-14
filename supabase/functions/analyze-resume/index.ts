/**
 * Analyze Resume Edge Function
 *
 * This Edge Function proxies resume analysis requests to Google Gemini API.
 * The API key is stored securely in Supabase secrets (never exposed to frontend).
 *
 * Flow:
 * 1. Frontend sends base64 image + mimeType
 * 2. Edge Function validates user authentication
 * 3. Edge Function calls Gemini API with server-side API key
 * 4. Results are returned to frontend
 *
 * Security:
 * - API key never exposed to frontend bundle
 * - Rate limiting per user (TODO: implement)
 * - User must be authenticated
 */

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

// System instruction for Gemini
const SYSTEM_INSTRUCTION = `
You are the "CVIVID", an expert AI combining Data Science, HR analytics, and Document Vision.
Your task is to analyze resume images to extract sociological signals (Bourdieu Capital), professional metrics, and **precise visual layout data**.

### 1. NLP & Content Analysis
   - **Tone**: Evaluate Formal, Professional, Confident, Assertive, Friendly tones (0-100).
   - **Capital Scores**: Evaluate Material, Social, Cultural, Symbolic, Technological capital (0-100) with short evidence quotes.
   - **Skill Composition**: Estimate text coverage % for Hard Skills, Soft Skills, Education, and Impact.
   - **Market Signaling**: Score based on prestige, rarity, and presentation (0-100).

### 2. Precise Visual Grounding (OCR & Layout)
   **Unified Coordinate System**: All coordinates (points and boxes) must be on a **0-1000 scale** (0,0 top-left to 1000,1000 bottom-right).

   - **Saliency**: Identify 20 fixation points (x, y on 0-1000 scale) where a human eye would naturally land (headers, bold text, numbers, visual anchors).
   - **Skill & Content Highlights (CRITICAL)**:
     You must act as an OCR engine. Find the **exact bounding boxes** for text segments belonging to these categories:
     1. **"hard"**: Technical skills, tools, languages, software (e.g., "Python", "React", "SQL", "Project Management").
     2. **"soft"**: Interpersonal skills, traits (e.g., "Leadership", "Communication", "Mentoring").
     3. **"impact"**: Quantitative results, metrics, achievements (e.g., "Increased revenue by 20%", "Reduced latency by 50%", "Managed $1M budget").
     4. **"education"**: Degree titles, university names, graduation years (e.g., "B.Sc. Computer Science", "Harvard University").

   **Bounding Box Rules**:
   - **Precision is paramount.** The box must tightly enclose the text glyphs.
   - **Do not** include surrounding whitespace or margins.
   - **Split** multi-line skills into separate bounding boxes (one per line).
   - Return up to 50 distinct bounding boxes to ensure comprehensive coverage.

Return the result in strict JSON format.
`;

// Schema for Gemini's response
const analysisSchema = {
  type: 'OBJECT',
  properties: {
    readabilityScore: { type: 'NUMBER', description: '0-100 score' },
    marketSignalingScore: { type: 'NUMBER', description: '0-100 score' },
    atsFriendlinessIndex: { type: 'NUMBER', description: '0-100 score' },
    overallScore: { type: 'NUMBER', description: '0-100 score' },
    capitalDistribution: {
      type: 'OBJECT',
      properties: {
        material: { type: 'NUMBER' },
        social: { type: 'NUMBER' },
        cultural: { type: 'NUMBER' },
        symbolic: { type: 'NUMBER' },
        technological: { type: 'NUMBER' },
      },
      required: ['material', 'social', 'cultural', 'symbolic', 'technological'],
    },
    capitalEvidence: {
      type: 'OBJECT',
      properties: {
        material: { type: 'ARRAY', items: { type: 'STRING' } },
        social: { type: 'ARRAY', items: { type: 'STRING' } },
        cultural: { type: 'ARRAY', items: { type: 'STRING' } },
        symbolic: { type: 'ARRAY', items: { type: 'STRING' } },
        technological: { type: 'ARRAY', items: { type: 'STRING' } },
      },
      required: ['material', 'social', 'cultural', 'symbolic', 'technological'],
    },
    toneProfile: {
      type: 'OBJECT',
      properties: {
        formal: { type: 'NUMBER' },
        professional: { type: 'NUMBER' },
        confident: { type: 'NUMBER' },
        assertive: { type: 'NUMBER' },
        approachable: { type: 'NUMBER' },
      },
      required: ['formal', 'professional', 'confident', 'assertive', 'approachable'],
    },
    skillComposition: {
      type: 'OBJECT',
      properties: {
        hardSkills: { type: 'NUMBER' },
        softSkills: { type: 'NUMBER' },
        education: { type: 'NUMBER' },
        impact: { type: 'NUMBER' },
      },
      required: ['hardSkills', 'softSkills', 'education', 'impact'],
    },
    visualAnalysis: {
      type: 'OBJECT',
      properties: {
        whitespaceScore: { type: 'NUMBER' },
        typographyScore: { type: 'NUMBER' },
        hierarchyScore: { type: 'NUMBER' },
        colorHarmonyScore: { type: 'NUMBER' },
        fixationScore: { type: 'NUMBER' },
      },
      required: ['whitespaceScore', 'typographyScore', 'hierarchyScore', 'colorHarmonyScore', 'fixationScore'],
    },
    visualHotspots: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          x: { type: 'NUMBER', description: '0-1000 scale' },
          y: { type: 'NUMBER', description: '0-1000 scale' },
          weight: { type: 'NUMBER', description: '0-1 importance' },
        },
        required: ['x', 'y', 'weight'],
      },
    },
    skillHighlights: {
      type: 'ARRAY',
      description: 'Precise bounding boxes for identified text segments.',
      items: {
        type: 'OBJECT',
        properties: {
          type: { type: 'STRING', enum: ['hard', 'soft', 'impact', 'education'] },
          name: { type: 'STRING' },
          ymin: { type: 'INTEGER', description: '0-1000 scale' },
          xmin: { type: 'INTEGER', description: '0-1000 scale' },
          ymax: { type: 'INTEGER', description: '0-1000 scale' },
          xmax: { type: 'INTEGER', description: '0-1000 scale' },
        },
        required: ['type', 'name', 'ymin', 'xmin', 'ymax', 'xmax'],
      },
    },
    topHardSkills: { type: 'ARRAY', items: { type: 'STRING' } },
    topSoftSkills: { type: 'ARRAY', items: { type: 'STRING' } },
    keyStrengths: { type: 'ARRAY', items: { type: 'STRING' } },
    improvementAreas: { type: 'ARRAY', items: { type: 'STRING' } },
  },
  required: [
    'readabilityScore',
    'marketSignalingScore',
    'atsFriendlinessIndex',
    'overallScore',
    'capitalDistribution',
    'capitalEvidence',
    'toneProfile',
    'skillComposition',
    'visualAnalysis',
    'visualHotspots',
    'skillHighlights',
    'topHardSkills',
    'topSoftSkills',
    'keyStrengths',
    'improvementAreas',
  ],
};

interface AnalyzeRequest {
  base64Image: string;
  mimeType: string;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get authorization header
    const authHeader = req.headers.get('authorization');
    console.log('Auth header present:', !!authHeader);

    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verify user is authenticated using service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    console.log('Supabase URL:', supabaseUrl?.substring(0, 30) + '...');
    console.log('Service key present:', !!supabaseServiceKey);

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase env vars');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Extract token from header
    const token = authHeader.replace('Bearer ', '');

    // Create admin client to verify user
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Verify the JWT token
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    console.log('Auth result - user:', !!user, 'error:', authError?.message);

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized', details: authError?.message }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('User authenticated:', user.id);

    // Parse request body
    const { base64Image, mimeType }: AnalyzeRequest = await req.json();

    if (!base64Image || !mimeType) {
      return new Response(JSON.stringify({ error: 'Missing base64Image or mimeType' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Get Gemini API key from secrets
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      console.error('GEMINI_API_KEY not configured');
      return new Response(JSON.stringify({ error: 'Server configuration error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Call Gemini API
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64Image,
                  },
                },
                {
                  text: 'Analyze this resume. Extract Bourdieu capital signals and generate precise bounding boxes for Hard Skills, Soft Skills, Impact/Metrics, and Education.',
                },
              ],
            },
          ],
          systemInstruction: {
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: analysisSchema,
            temperature: 0.0,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', errorText);
      return new Response(JSON.stringify({ error: 'Analysis service error' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const geminiData = await geminiResponse.json();

    // Extract the text response
    const text = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return new Response(JSON.stringify({ error: 'No response from analysis service' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Parse the JSON result
    const result = JSON.parse(text);

    // Post-process normalization: Convert 0-1000 scale to 0-100 scale for frontend usage
    if (result.skillHighlights && Array.isArray(result.skillHighlights)) {
      result.skillHighlights = result.skillHighlights.map((box: Record<string, unknown>) => ({
        ...box,
        ymin: (box.ymin as number) / 10,
        xmin: (box.xmin as number) / 10,
        ymax: (box.ymax as number) / 10,
        xmax: (box.xmax as number) / 10,
      }));
    }

    if (result.visualHotspots && Array.isArray(result.visualHotspots)) {
      result.visualHotspots = result.visualHotspots.map((spot: Record<string, unknown>) => ({
        ...spot,
        x: (spot.x as number) / 10,
        y: (spot.y as number) / 10,
      }));
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Analysis error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
