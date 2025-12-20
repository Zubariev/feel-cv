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

// Comparison feature types

export interface MetricDelta {
  current: number;
  previous: number;
  delta: number;
  percentChange: number;
  direction: 'improved' | 'regressed' | 'neutral';
}

export interface ComparisonResult {
  baseAnalysisId: string;
  compareAnalysisId: string;
  baseDocumentName: string;
  compareDocumentName: string;
  baseDate: string;
  compareDate: string;

  overallScore: MetricDelta;
  readabilityScore: MetricDelta;
  marketSignalingScore: MetricDelta;
  atsFriendlinessIndex: MetricDelta;

  capitalDistribution: {
    material: MetricDelta;
    social: MetricDelta;
    cultural: MetricDelta;
    symbolic: MetricDelta;
    technological: MetricDelta;
  };

  visualAnalysis: {
    whitespaceScore: MetricDelta;
    typographyScore: MetricDelta;
    hierarchyScore: MetricDelta;
    colorHarmonyScore: MetricDelta;
    fixationScore: MetricDelta;
  };

  toneProfile: {
    formal: MetricDelta;
    professional: MetricDelta;
    confident: MetricDelta;
    assertive: MetricDelta;
    approachable: MetricDelta;
  };

  skillComposition: {
    hardSkills: MetricDelta;
    softSkills: MetricDelta;
    education: MetricDelta;
    impact: MetricDelta;
  };

  strengthsAnalysis: {
    added: string[];
    removed: string[];
    retained: string[];
  };

  improvementsAnalysis: {
    resolved: string[];
    new: string[];
    persistent: string[];
  };

  skillsChanges: {
    hardSkillsAdded: string[];
    hardSkillsRemoved: string[];
    softSkillsAdded: string[];
    softSkillsRemoved: string[];
  };
}

export interface AnalysisSelectionItem {
  id: string;
  documentName: string;
  createdAt: string;
  overallScore: number;
  isSelected: boolean;
}

// ============================================================================
// Billing & Entitlements Types
// ============================================================================

export type PlanCode = 'one-time' | 'explorer' | 'career-builder' | 'career-accelerator' | null;

export interface Plan {
  code: PlanCode;
  name: string | null;
  is_subscription: boolean;
}

export interface EntitlementLimits {
  analyses_per_month: number | null;
  comparisons_per_month: number | null;
  unlimited_comparisons: boolean;
}

export interface EntitlementUsage {
  analyses_used: number;
  comparisons_used: number;
}

export interface EntitlementRemaining {
  analyses: number | null;
  comparisons: number | null;
}

export interface EntitlementOneTime {
  available_scans: number;
}

export interface EntitlementCan {
  analyze_cv: boolean;
  compare_cvs: boolean;
}

export interface SubscriptionInfo {
  status: 'active' | 'canceled' | 'expired' | 'past_due' | 'pending';
  current_period_end: string;
  cancel_at_period_end: boolean;
}

export interface EntitlementSnapshot {
  has_subscription: boolean;
  plan: Plan;
  limits: EntitlementLimits;
  usage: EntitlementUsage;
  remaining: EntitlementRemaining;
  one_time: EntitlementOneTime;
  can: EntitlementCan;
  subscription: SubscriptionInfo | null;
}

export interface UsageIncrementResult {
  success: boolean;
  source?: 'subscription' | 'one_time';
  error?: string;
  message?: string;
  analyses_used?: number;
  comparisons_used?: number;
  limit?: number;
  unlimited?: boolean;
  purchase_id?: string;
}

export interface PlanDetails {
  id: string;
  plan_code: PlanCode;
  name: string;
  description: string;
  price_eur: number;
  analyses_per_month: number | null;
  comparisons_per_month: number | null;
  is_unlimited_comparisons: boolean;
  is_subscription: boolean;
  display_order: number;
}