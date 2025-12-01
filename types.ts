export interface CapitalDistribution {
  material: number;
  social: number;
  cultural: number;
  symbolic: number;
  technological: number;
}

export interface CapitalEvidence {
  material: string[];
  social: string[];
  cultural: string[];
  symbolic: string[];
  technological: string[];
}

export interface ToneProfile {
  formal: number;
  professional: number;
  confident: number;
  assertive: number;
  approachable: number;
}

export interface SkillComposition {
  hardSkills: number;
  softSkills: number;
  education: number;
  impact: number;
}

export interface VisualAnalysis {
  whitespaceScore: number;
  typographyScore: number;
  hierarchyScore: number;
  colorHarmonyScore: number;
  fixationScore: number; // Simulated eye-tracking attention score
}

export interface VisualHotspot {
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
  weight: number; // 0-1 intensity
}

export interface SkillHighlight {
  type: 'hard' | 'soft' | 'education' | 'impact';
  name: string;
  ymin: number; // 0-100 percentage
  xmin: number; // 0-100 percentage
  ymax: number; // 0-100 percentage
  xmax: number; // 0-100 percentage
}

export interface AnalysisResult {
  readabilityScore: number;
  marketSignalingScore: number;
  atsFriendlinessIndex: number;
  overallScore: number;
  
  capitalDistribution: CapitalDistribution;
  capitalEvidence: CapitalEvidence;
  toneProfile: ToneProfile;
  skillComposition: SkillComposition;
  visualAnalysis: VisualAnalysis;
  visualHotspots: VisualHotspot[];
  skillHighlights: SkillHighlight[];

  topHardSkills: string[];
  topSoftSkills: string[];
  keyStrengths: string[];
  improvementAreas: string[];
}

export interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
}