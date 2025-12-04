import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const SYSTEM_INSTRUCTION = `
You are the "CVSense", an expert AI combining Data Science, HR analytics, and Document Vision.
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

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    readabilityScore: { type: Type.NUMBER, description: "0-100 score" },
    marketSignalingScore: { type: Type.NUMBER, description: "0-100 score" },
    atsFriendlinessIndex: { type: Type.NUMBER, description: "0-100 score" },
    overallScore: { type: Type.NUMBER, description: "0-100 score" },
    capitalDistribution: {
      type: Type.OBJECT,
      properties: {
        material: { type: Type.NUMBER },
        social: { type: Type.NUMBER },
        cultural: { type: Type.NUMBER },
        symbolic: { type: Type.NUMBER },
        technological: { type: Type.NUMBER },
      },
      required: ["material", "social", "cultural", "symbolic", "technological"],
    },
    capitalEvidence: {
      type: Type.OBJECT,
      properties: {
        material: { type: Type.ARRAY, items: { type: Type.STRING } },
        social: { type: Type.ARRAY, items: { type: Type.STRING } },
        cultural: { type: Type.ARRAY, items: { type: Type.STRING } },
        symbolic: { type: Type.ARRAY, items: { type: Type.STRING } },
        technological: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ["material", "social", "cultural", "symbolic", "technological"],
    },
    toneProfile: {
      type: Type.OBJECT,
      properties: {
        formal: { type: Type.NUMBER },
        professional: { type: Type.NUMBER },
        confident: { type: Type.NUMBER },
        assertive: { type: Type.NUMBER },
        approachable: { type: Type.NUMBER },
      },
      required: ["formal", "professional", "confident", "assertive", "approachable"],
    },
    skillComposition: {
      type: Type.OBJECT,
      properties: {
        hardSkills: { type: Type.NUMBER },
        softSkills: { type: Type.NUMBER },
        education: { type: Type.NUMBER },
        impact: { type: Type.NUMBER },
      },
      required: ["hardSkills", "softSkills", "education", "impact"],
    },
    visualAnalysis: {
      type: Type.OBJECT,
      properties: {
        whitespaceScore: { type: Type.NUMBER },
        typographyScore: { type: Type.NUMBER },
        hierarchyScore: { type: Type.NUMBER },
        colorHarmonyScore: { type: Type.NUMBER },
        fixationScore: { type: Type.NUMBER },
      },
      required: ["whitespaceScore", "typographyScore", "hierarchyScore", "colorHarmonyScore", "fixationScore"],
    },
    visualHotspots: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          x: { type: Type.NUMBER, description: "0-1000 scale" },
          y: { type: Type.NUMBER, description: "0-1000 scale" },
          weight: { type: Type.NUMBER, description: "0-1 importance" },
        },
        required: ["x", "y", "weight"],
      },
    },
    skillHighlights: {
      type: Type.ARRAY,
      description: "Precise bounding boxes for identified text segments.",
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, enum: ["hard", "soft", "impact", "education"] },
          name: { type: Type.STRING },
          ymin: { type: Type.INTEGER, description: "0-1000 scale" },
          xmin: { type: Type.INTEGER, description: "0-1000 scale" },
          ymax: { type: Type.INTEGER, description: "0-1000 scale" },
          xmax: { type: Type.INTEGER, description: "0-1000 scale" },
        },
        required: ["type", "name", "ymin", "xmin", "ymax", "xmax"],
      },
    },
    topHardSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
    topSoftSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
    keyStrengths: { type: Type.ARRAY, items: { type: Type.STRING } },
    improvementAreas: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: [
    "readabilityScore",
    "marketSignalingScore",
    "atsFriendlinessIndex",
    "overallScore",
    "capitalDistribution",
    "capitalEvidence",
    "toneProfile",
    "skillComposition",
    "visualAnalysis",
    "visualHotspots",
    "skillHighlights",
    "topHardSkills",
    "topSoftSkills",
    "keyStrengths",
    "improvementAreas",
  ],
};

export const analyzeResume = async (
  base64Image: string,
  mimeType: string
): Promise<AnalysisResult> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "VITE_GEMINI_API_KEY is not defined. Please set it in your environment."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", 
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: "Analyze this resume. Extract Bourdieu capital signals and generate precise bounding boxes for Hard Skills, Soft Skills, Impact/Metrics, and Education.",
          },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.0,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    const result = JSON.parse(text) as AnalysisResult;

    // Post-process normalization: Convert 0-1000 scale to 0-100 scale for frontend usage
    
    // Normalize Bounding Boxes
    if (result.skillHighlights && Array.isArray(result.skillHighlights)) {
      result.skillHighlights = result.skillHighlights.map((box: any) => ({
        ...box,
        ymin: box.ymin / 10,
        xmin: box.xmin / 10,
        ymax: box.ymax / 10,
        xmax: box.xmax / 10,
      }));
    }

    // Normalize Saliency Hotspots
    if (result.visualHotspots && Array.isArray(result.visualHotspots)) {
      result.visualHotspots = result.visualHotspots.map((spot: any) => ({
        ...spot,
        x: spot.x / 10,
        y: spot.y / 10,
      }));
    }

    return result;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};
