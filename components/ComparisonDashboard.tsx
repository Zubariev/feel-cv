import React from 'react';
import {
  ArrowLeft,
  GitCompare,
  TrendingUp,
  Activity,
  BookOpen,
  FileText,
  Calendar
} from 'lucide-react';
import { AnalysisResult, ComparisonResult } from '../types';
import { DeltaIndicator } from './DeltaIndicator';
import { ComparisonCapitalRadar } from './ComparisonCapitalRadar';
import { ComparisonVisualMetrics } from './ComparisonVisualMetrics';
import { ComparisonToneAnalysis } from './ComparisonToneAnalysis';
import { StrengthsDelta } from './StrengthsDelta';

interface Props {
  comparison: ComparisonResult;
  baseAnalysis: AnalysisResult;
  compareAnalysis: AnalysisResult;
  onBack: () => void;
}

export const ComparisonDashboard: React.FC<Props> = ({
  comparison,
  baseAnalysis,
  compareAnalysis,
  onBack
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
              title="Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 flex-1">
              <div className="bg-indigo-500 p-2 rounded-lg">
                <GitCompare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-tight">CV Comparison</h1>
                <p className="text-xs text-slate-400">Side-by-side analysis comparison</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Document Comparison Header */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Base Document */}
            <div className="text-center md:text-left">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Base Version (Older)
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="w-10 h-12 bg-slate-100 rounded flex items-center justify-center">
                  <FileText className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 truncate max-w-[200px]">
                    {comparison.baseDocumentName}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(comparison.baseDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* VS Badge */}
            <div className="flex justify-center">
              <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold">
                VS
              </div>
            </div>

            {/* Compare Document */}
            <div className="text-center md:text-right">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Compare Version (Newer)
              </div>
              <div className="flex items-center gap-3 justify-center md:justify-end">
                <div>
                  <p className="font-semibold text-slate-800 truncate max-w-[200px]">
                    {comparison.compareDocumentName}
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1 justify-center md:justify-end">
                    <Calendar className="w-3 h-3" />
                    {formatDate(comparison.compareDate)}
                  </p>
                </div>
                <div className="w-10 h-12 bg-indigo-50 rounded flex items-center justify-center">
                  <FileText className="w-5 h-5 text-indigo-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Score Comparison - Prominent */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-8 mb-8 text-white">
          <h2 className="text-lg font-semibold text-white/80 mb-6 text-center">
            Overall Score Change
          </h2>
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white/70">
                {comparison.overallScore.previous}
              </div>
              <div className="text-sm text-white/60 mt-1">Before</div>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl text-white/50">&rarr;</span>
              <div className="mt-2 px-4 py-2 bg-white/20 rounded-lg">
                <DeltaIndicator delta={comparison.overallScore} size="lg" />
              </div>
            </div>
            <div className="text-center">
              <div className={`text-6xl font-bold ${getScoreColor(comparison.overallScore.current)}`}>
                {comparison.overallScore.current}
              </div>
              <div className="text-sm text-white/60 mt-1">After</div>
            </div>
          </div>
        </div>

        {/* Core Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ScoreComparisonCard
            title="Readability"
            icon={<BookOpen className="w-5 h-5 text-blue-600" />}
            delta={comparison.readabilityScore}
          />
          <ScoreComparisonCard
            title="Market Signaling"
            icon={<TrendingUp className="w-5 h-5 text-purple-600" />}
            delta={comparison.marketSignalingScore}
          />
          <ScoreComparisonCard
            title="ATS Friendliness"
            icon={<Activity className="w-5 h-5 text-teal-600" />}
            delta={comparison.atsFriendlinessIndex}
          />
        </div>

        {/* Capital Distribution & Tone Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <ComparisonCapitalRadar
              baseData={baseAnalysis.capitalDistribution}
              compareData={compareAnalysis.capitalDistribution}
              baseLabel="Base"
              compareLabel="Compare"
            />
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <ComparisonToneAnalysis
              baseData={baseAnalysis.toneProfile}
              compareData={compareAnalysis.toneProfile}
              deltas={comparison.toneProfile}
              baseLabel="Base"
              compareLabel="Compare"
            />
          </div>
        </div>

        {/* Visual Metrics */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
          <ComparisonVisualMetrics
            baseData={baseAnalysis.visualAnalysis}
            compareData={compareAnalysis.visualAnalysis}
            deltas={comparison.visualAnalysis}
          />
        </div>

        {/* Skill Composition Comparison */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Semantic Content Distribution
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CompositionComparisonCard
              label="Hard Skills"
              delta={comparison.skillComposition.hardSkills}
              colorClass="text-blue-600"
            />
            <CompositionComparisonCard
              label="Soft Skills"
              delta={comparison.skillComposition.softSkills}
              colorClass="text-purple-600"
            />
            <CompositionComparisonCard
              label="Education"
              delta={comparison.skillComposition.education}
              colorClass="text-amber-600"
            />
            <CompositionComparisonCard
              label="Impact"
              delta={comparison.skillComposition.impact}
              colorClass="text-emerald-600"
            />
          </div>
        </div>

        {/* Strengths & Improvements Delta */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <StrengthsDelta
            strengthsAnalysis={comparison.strengthsAnalysis}
            improvementsAnalysis={comparison.improvementsAnalysis}
            skillsChanges={comparison.skillsChanges}
          />
        </div>
      </main>
    </div>
  );
};

// Helper component for score comparison cards
const ScoreComparisonCard = ({
  title,
  icon,
  delta
}: {
  title: string;
  icon: React.ReactNode;
  delta: ComparisonResult['overallScore'];
}) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h4 className="font-semibold text-slate-700">{title}</h4>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl text-slate-400">{delta.previous}</span>
        <span className="text-slate-300">&rarr;</span>
        <span className="text-3xl font-bold text-slate-800">{delta.current}</span>
      </div>
      <DeltaIndicator delta={delta} size="md" />
    </div>
  </div>
);

// Helper component for composition comparison
const CompositionComparisonCard = ({
  label,
  delta,
  colorClass
}: {
  label: string;
  delta: ComparisonResult['skillComposition']['hardSkills'];
  colorClass: string;
}) => (
  <div className="bg-slate-50 rounded-xl p-4 text-center">
    <div className={`text-sm font-medium ${colorClass} mb-2`}>{label}</div>
    <div className="flex items-center justify-center gap-2 mb-2">
      <span className="text-lg text-slate-400">{delta.previous.toFixed(0)}%</span>
      <span className="text-slate-300">&rarr;</span>
      <span className="text-xl font-bold text-slate-800">{delta.current.toFixed(0)}%</span>
    </div>
    <DeltaIndicator delta={delta} size="sm" showPercentage />
  </div>
);
