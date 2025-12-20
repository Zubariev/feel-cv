import {
  AnalysisResult,
  ComparisonResult,
  MetricDelta,
  CapitalDistribution,
  VisualAnalysis,
  ToneProfile,
  SkillComposition
} from '../types';

const NEUTRAL_THRESHOLD = 2; // Deltas within +/-2 are considered neutral

export const comparisonService = {
  /**
   * Compute delta for a single metric
   */
  computeDelta(current: number, previous: number, threshold = NEUTRAL_THRESHOLD): MetricDelta {
    const delta = current - previous;
    const percentChange =
      previous !== 0 ? ((current - previous) / previous) * 100 : current > 0 ? 100 : 0;

    let direction: 'improved' | 'regressed' | 'neutral';
    if (delta > threshold) direction = 'improved';
    else if (delta < -threshold) direction = 'regressed';
    else direction = 'neutral';

    return { current, previous, delta, percentChange, direction };
  },

  /**
   * Compare two string arrays for set differences
   */
  compareStringArrays(
    base: string[],
    compare: string[]
  ): { added: string[]; removed: string[]; retained: string[] } {
    const normalize = (s: string) => s.toLowerCase().trim();
    const baseSet = new Set(base.map(normalize));
    const compareSet = new Set(compare.map(normalize));

    return {
      added: compare.filter((s) => !baseSet.has(normalize(s))),
      removed: base.filter((s) => !compareSet.has(normalize(s))),
      retained: compare.filter((s) => baseSet.has(normalize(s)))
    };
  },

  /**
   * Compare improvement areas (issues resolved vs new vs persistent)
   */
  compareImprovementAreas(
    base: string[],
    compare: string[]
  ): { resolved: string[]; new: string[]; persistent: string[] } {
    const normalize = (s: string) => s.toLowerCase().trim();
    const baseSet = new Set(base.map(normalize));
    const compareSet = new Set(compare.map(normalize));

    return {
      resolved: base.filter((s) => !compareSet.has(normalize(s))),
      new: compare.filter((s) => !baseSet.has(normalize(s))),
      persistent: compare.filter((s) => baseSet.has(normalize(s)))
    };
  },

  /**
   * Compare capital distribution
   */
  compareCapitalDistribution(
    base: CapitalDistribution,
    compare: CapitalDistribution
  ): ComparisonResult['capitalDistribution'] {
    return {
      material: this.computeDelta(compare.material, base.material),
      social: this.computeDelta(compare.social, base.social),
      cultural: this.computeDelta(compare.cultural, base.cultural),
      symbolic: this.computeDelta(compare.symbolic, base.symbolic),
      technological: this.computeDelta(compare.technological, base.technological)
    };
  },

  /**
   * Compare visual analysis
   */
  compareVisualAnalysis(
    base: VisualAnalysis,
    compare: VisualAnalysis
  ): ComparisonResult['visualAnalysis'] {
    return {
      whitespaceScore: this.computeDelta(compare.whitespaceScore, base.whitespaceScore),
      typographyScore: this.computeDelta(compare.typographyScore, base.typographyScore),
      hierarchyScore: this.computeDelta(compare.hierarchyScore, base.hierarchyScore),
      colorHarmonyScore: this.computeDelta(compare.colorHarmonyScore, base.colorHarmonyScore),
      fixationScore: this.computeDelta(compare.fixationScore, base.fixationScore)
    };
  },

  /**
   * Compare tone profile
   */
  compareToneProfile(
    base: ToneProfile,
    compare: ToneProfile
  ): ComparisonResult['toneProfile'] {
    return {
      formal: this.computeDelta(compare.formal, base.formal),
      professional: this.computeDelta(compare.professional, base.professional),
      confident: this.computeDelta(compare.confident, base.confident),
      assertive: this.computeDelta(compare.assertive, base.assertive),
      approachable: this.computeDelta(compare.approachable, base.approachable)
    };
  },

  /**
   * Compare skill composition
   */
  compareSkillComposition(
    base: SkillComposition,
    compare: SkillComposition
  ): ComparisonResult['skillComposition'] {
    return {
      hardSkills: this.computeDelta(compare.hardSkills, base.hardSkills),
      softSkills: this.computeDelta(compare.softSkills, base.softSkills),
      education: this.computeDelta(compare.education, base.education),
      impact: this.computeDelta(compare.impact, base.impact)
    };
  },

  /**
   * Compare two analyses and generate full comparison result
   */
  compareAnalyses(
    baseAnalysis: AnalysisResult,
    compareAnalysis: AnalysisResult,
    baseId: string,
    compareId: string,
    baseName: string,
    compareName: string,
    baseDate: string,
    compareDate: string
  ): ComparisonResult {
    return {
      baseAnalysisId: baseId,
      compareAnalysisId: compareId,
      baseDocumentName: baseName,
      compareDocumentName: compareName,
      baseDate,
      compareDate,

      // Core scores
      overallScore: this.computeDelta(compareAnalysis.overallScore, baseAnalysis.overallScore),
      readabilityScore: this.computeDelta(
        compareAnalysis.readabilityScore,
        baseAnalysis.readabilityScore
      ),
      marketSignalingScore: this.computeDelta(
        compareAnalysis.marketSignalingScore,
        baseAnalysis.marketSignalingScore
      ),
      atsFriendlinessIndex: this.computeDelta(
        compareAnalysis.atsFriendlinessIndex,
        baseAnalysis.atsFriendlinessIndex
      ),

      // Structured comparisons
      capitalDistribution: this.compareCapitalDistribution(
        baseAnalysis.capitalDistribution,
        compareAnalysis.capitalDistribution
      ),
      visualAnalysis: this.compareVisualAnalysis(
        baseAnalysis.visualAnalysis,
        compareAnalysis.visualAnalysis
      ),
      toneProfile: this.compareToneProfile(baseAnalysis.toneProfile, compareAnalysis.toneProfile),
      skillComposition: this.compareSkillComposition(
        baseAnalysis.skillComposition,
        compareAnalysis.skillComposition
      ),

      // Qualitative comparisons
      strengthsAnalysis: this.compareStringArrays(
        baseAnalysis.keyStrengths,
        compareAnalysis.keyStrengths
      ),
      improvementsAnalysis: this.compareImprovementAreas(
        baseAnalysis.improvementAreas,
        compareAnalysis.improvementAreas
      ),
      skillsChanges: {
        hardSkillsAdded: compareAnalysis.topHardSkills.filter(
          (s) => !baseAnalysis.topHardSkills.map((x) => x.toLowerCase()).includes(s.toLowerCase())
        ),
        hardSkillsRemoved: baseAnalysis.topHardSkills.filter(
          (s) =>
            !compareAnalysis.topHardSkills.map((x) => x.toLowerCase()).includes(s.toLowerCase())
        ),
        softSkillsAdded: compareAnalysis.topSoftSkills.filter(
          (s) => !baseAnalysis.topSoftSkills.map((x) => x.toLowerCase()).includes(s.toLowerCase())
        ),
        softSkillsRemoved: baseAnalysis.topSoftSkills.filter(
          (s) =>
            !compareAnalysis.topSoftSkills.map((x) => x.toLowerCase()).includes(s.toLowerCase())
        )
      }
    };
  }
};
