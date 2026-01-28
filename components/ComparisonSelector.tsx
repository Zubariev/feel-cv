import React, { useState, useEffect } from 'react';
import {
  GitCompare,
  FileText,
  Calendar,
  Check,
  ArrowLeft,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { databaseService } from '../services/databaseService';
import { HistoryListSkeleton } from './LoadingSkeletons';
import { EntitlementSnapshot } from '../types';

interface AnalysisItem {
  id: string;
  created_at: string;
  overall_score: number;
  document: {
    original_filename: string;
    file_size: number;
  } | null;
}

interface Props {
  userId: string;
  onCompare: (baseId: string, compareId: string) => void;
  onCancel: () => void;
  entitlements?: EntitlementSnapshot | null;
}

export const ComparisonSelector: React.FC<Props> = ({ userId, onCompare, onCancel, entitlements }) => {
  const [analyses, setAnalyses] = useState<AnalysisItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comparing, setComparing] = useState(false);

  // Calculate comparisons remaining from entitlements prop
  const isUnlimitedComparisons = entitlements?.limits.unlimited_comparisons ?? false;
  const comparisonsLimit = entitlements?.limits.comparisons_per_month ?? 0;
  const comparisonsUsed = entitlements?.usage.comparisons_used ?? 0;
  const remaining = isUnlimitedComparisons ? Infinity : Math.max(0, comparisonsLimit - comparisonsUsed);
  const limit = isUnlimitedComparisons ? Infinity : comparisonsLimit;

  useEffect(() => {
    const fetchAnalyses = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await databaseService.listUserAnalyses(userId);
        setAnalyses((data as AnalysisItem[]) || []);
      } catch (err) {
        console.error('Failed to fetch analyses:', err);
        setError('Failed to load your analyses. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalyses();
  }, [userId]);

  const handleSelect = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 2) {
        // Replace the oldest selection
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  const handleCompare = () => {
    if (selected.length !== 2) return;

    // Sort by date to determine base (older) vs compare (newer)
    const selectedAnalyses = selected
      .map((id) => analyses.find((a) => a.id === id)!)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

    setComparing(true);
    onCompare(selectedAnalyses[0].id, selectedAnalyses[1].id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50';
    if (score >= 60) return 'text-blue-600 bg-blue-50';
    if (score >= 40) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getSelectionLabel = (id: string): string | null => {
    const idx = selected.indexOf(id);
    if (idx === -1) return null;

    if (selected.length === 2) {
      const selectedAnalyses = selected
        .map((sid) => analyses.find((a) => a.id === sid)!)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

      if (id === selectedAnalyses[0].id) return 'Base (older)';
      return 'Compare (newer)';
    }
    return `Selected ${idx + 1}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <button
            onClick={onCancel}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            title="Cancel"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <GitCompare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Compare CVs</h1>
              <p className="text-xs text-slate-400">Select two analyses to compare</p>
            </div>
          </div>
          {limit !== Infinity && (
            <div className="text-sm text-slate-400">
              {remaining} comparison{remaining !== 1 ? 's' : ''} remaining
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Selection Summary */}
        {selected.length > 0 && (
          <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-indigo-800">
                  {selected.length}/2 selected
                </span>
                {selected.length === 2 && (
                  <span className="text-xs text-indigo-600">
                    The older analysis will be the base, newer will be compared against it.
                  </span>
                )}
              </div>
              <button
                onClick={handleCompare}
                disabled={selected.length !== 2 || comparing}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
              >
                {comparing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Comparing...
                  </>
                ) : (
                  <>
                    <GitCompare className="w-4 h-4" />
                    Compare Now
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mb-6 text-sm text-slate-600">
          Click on two analyses below to select them for comparison. The older analysis will automatically be set as the base version.
        </div>

        {loading ? (
          <HistoryListSkeleton />
        ) : error ? (
          <div className="text-center py-16">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-400" />
            <p className="text-slate-600">{error}</p>
          </div>
        ) : analyses.length < 2 ? (
          <div className="text-center py-16">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 text-amber-400" />
            <h2 className="text-xl font-semibold text-slate-800 mb-2">Not enough analyses</h2>
            <p className="text-slate-500 mb-6">
              You need at least 2 analyses to compare. Upload and analyze more CVs first.
            </p>
            <button
              onClick={onCancel}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors"
            >
              Go Back
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {analyses.map((analysis) => {
              const isSelected = selected.includes(analysis.id);
              const selectionLabel = getSelectionLabel(analysis.id);

              return (
                <button
                  key={analysis.id}
                  onClick={() => handleSelect(analysis.id)}
                  className={`w-full text-left bg-white rounded-xl border-2 transition-all overflow-hidden ${
                    isSelected
                      ? 'border-indigo-500 shadow-md ring-2 ring-indigo-200'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex items-center gap-4">
                      {/* Selection Indicator */}
                      <div
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 border-indigo-600'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-5 h-5 text-white" />}
                      </div>

                      {/* File Icon */}
                      <div className="w-12 h-14 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-200">
                        <FileText className="w-6 h-6 text-slate-400" />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-semibold text-slate-900 truncate">
                          {analysis.document?.original_filename || 'Unknown Document'}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(analysis.created_at)}
                          </span>
                        </div>
                      </div>

                      {/* Score */}
                      <div className={`px-3 py-1.5 rounded-lg ${getScoreColor(analysis.overall_score)}`}>
                        <span className="text-xs font-medium opacity-70">Score</span>
                        <span className="ml-2 font-bold">{analysis.overall_score}</span>
                      </div>

                      {/* Selection Label */}
                      {selectionLabel && (
                        <div className="px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg">
                          {selectionLabel}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};
