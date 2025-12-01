import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const SYSTEM_INSTRUCTION = `
You are the "CV Intelligence Engine", an advanced AI combining Data Science and HR expertise. 
Your goal is to analyze resume images to extract deep sociological and professional signals based on the Bourdieu Capital theory and modern visual design principles.

Analyze the provided resume image for the following:

1. **NLP Analysis**:
   - **Keywords**: Extract hard/soft skills.
   - **Tone**: Evaluate Formal, Professional, Confident, Assertive, Friendly tones (0-100).
   - **Skill Composition**: Estimate percentage of text dedicated to Hard Skills, Soft Skills, Education, and Impact statements.
   - **Forms of Capital (Bourdieu)**:
     - **Scores (0-100)** for distribution analysis.
     - **Evidence (Quotes/Citations)**: Extract 1-3 specific short text fragments from the resume for each capital type to justify the score.
   - **Market Signaling**: Rarity of experience, brand power of employers, GitHub strength, etc. (0-100).

2. **Visual Analysis & Saliency**:
   - **Visual Saliency Simulation (MSI-Net style)**: Identify 20 specific coordinates (x, y as percentages 0-100) where a recruiter's eye is most likely to fixate.
   - **Skill & Content Localization**: Visually identify the **exact** bounding boxes for the following categories:
     - "Hard Skills" (tools, languages, frameworks, technical terms)
     - "Soft Skills" (leadership, communication, problem-solving)
     - "Impact" (quantitative metrics, numbers like "20% growth", "$1M revenue", specific achievements)
     - "Education" (university names, degrees, certificates, graduation dates)
   - **CRITICAL COORDINATE RULES**: 
     - Return coordinates on a **0-1000 scale** (integer) for maximum precision. 
     - ymin, xmin, ymax, xmax.
     - Ensure bounding boxes are **tight** around the text. Do not include excessive padding.
     - Do not group distinct items into one huge box; separate them where possible (return up to 40 distinct boxes total).
   - **Fixation/Attention**: Rate how well the layout guides the eye to key sections (0-100).
   - **Typography**: Consistency, hierarchy, readability.
   - **Whitespace**: Effective use of negative space.
   - **ATS Friendliness**: Estimated parsability based on layout complexity (columns, graphics).

Return the data in a strict JSON format.
`;

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    readabilityScore: { type: Type.NUMBER, description: "0-100 score for ease of reading" },
    marketSignalingScore: { type: Type.NUMBER, description: "0-100 score for candidate market value signals" },
    atsFriendlinessIndex: { type: Type.NUMBER, description: "0-100 score for machine parsability" },
    overallScore: { type: Type.NUMBER, description: "0-100 integrated score" },
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
        hardSkills: { type: Type.NUMBER, description: "Percentage (0-100)" },
        softSkills: { type: Type.NUMBER, description: "Percentage (0-100)" },
        education: { type: Type.NUMBER, description: "Percentage (0-100)" },
        impact: { type: Type.NUMBER, description: "Percentage (0-100)" },
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
      description: "List of visual fixation points for saliency map generation",
      items: {
        type: Type.OBJECT,
        properties: {
          x: { type: Type.NUMBER, description: "X coordinate percentage (0-100)" },
          y: { type: Type.NUMBER, description: "Y coordinate percentage (0-100)" },
          weight: { type: Type.NUMBER, description: "Intensity weight (0-1)" },
        },
        required: ["x", "y", "weight"],
      },
    },
    skillHighlights: {
      type: Type.ARRAY,
      description: "Bounding boxes for Hard skills, Soft skills, Impact, and Education. Use 0-1000 scale.",
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, enum: ["hard", "soft", "impact", "education"] },
          name: { type: Type.STRING, description: "The text content of the highlight" },
          ymin: { type: Type.INTEGER, description: "Top Y coordinate (0-1000)" },
          xmin: { type: Type.INTEGER, description: "Left X coordinate (0-1000)" },
          ymax: { type: Type.INTEGER, description: "Bottom Y coordinate (0-1000)" },
          xmax: { type: Type.INTEGER, description: "Right X coordinate (0-1000)" },
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

export const analyzeResume = async (base64Image: string, mimeType: string): Promise<AnalysisResult> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: "Analyze this resume according to the CV Intelligence Engine protocols.",
          },
        ],
      },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.1, // Reduced temperature for higher precision
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    const result = JSON.parse(text) as AnalysisResult;

    // Post-process normalization: Convert 0-1000 scale to 0-100 scale for frontend usage
    if (result.skillHighlights && Array.isArray(result.skillHighlights)) {
      result.skillHighlights = result.skillHighlights.map((box: any) => ({
        ...box,
        ymin: box.ymin / 10,
        xmin: box.xmin / 10,
        ymax: box.ymax / 10,
        xmax: box.xmax / 10,
      }));
    }

    return result;
  } catch (error) {
    console.error("Analysis failed:", error);
    throw error;
  }
};