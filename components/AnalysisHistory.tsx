import React, { useState, useEffect } from 'react';
import {
  History,
  FileText,
  Trash2,
  Eye,
  Calendar,
  TrendingUp,
  Activity,
  FileSearch,
  AlertCircle,
  ArrowLeft,
  GitCompare
} from 'lucide-react';
import { databaseService } from '../services/databaseService';
import { HistoryListSkeleton } from './LoadingSkeletons';
import { ErrorMessage } from './ErrorBoundary';

interface AnalysisHistoryItem {
  id: string;
  created_at: string;
  overall_score: number;
  model_used: string;
  document: {
    id: string;
    original_filename: string;
    mime_type: string;
    file_size: number;
    storage_path: string;
  } | null;
  scores: Array<{ category: string; score: number }>;
}

interface Props {
  userId: string;
  onBack: () => void;
  onViewAnalysis: (analysisId: string) => void;
  onStartComparison?: () => void;
}

export const AnalysisHistory: React.FC<Props> = ({ userId, onBack, onViewAnalysis, onStartComparison }) => {
  const [analyses, setAnalyses] = useState<AnalysisHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchAnalyses = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await databaseService.listUserAnalyses(userId);
      setAnalyses((data as AnalysisHistoryItem[]) || []);
    } catch (err) {
      console.error('Failed to fetch analyses:', err);
      setError('Failed to load your analysis history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalyses();
  }, [userId]);

  const handleDelete = async (analysisId: string) => {
    if (!confirm('Are you sure you want to delete this analysis? This action cannot be undone.')) {
      return;
    }

    setDeletingId(analysisId);
    try {
      await databaseService.deleteAnalysis(analysisId, userId);
      setAnalyses(prev => prev.filter(a => a.id !== analysisId));
    } catch (err) {
      console.error('Failed to delete analysis:', err);
      alert('Failed to delete analysis. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50';
    if (score >= 60) return 'text-blue-600 bg-blue-50';
    if (score >= 40) return 'text-amber-600 bg-amber-50';
    return 'text-red-600 bg-red-50';
  };

  const getScoreByCategory = (scores: Array<{ category: string; score: number }>, category: string) => {
    const found = scores.find(s => s.category === category);
    return found?.score ?? null;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <History className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Analysis History</h1>
              <p className="text-xs text-slate-400">View and manage your past resume analyses</p>
            </div>
          </div>
          {onStartComparison && analyses.length >= 2 && (
            <button
              onClick={onStartComparison}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <GitCompare className="w-4 h-4" />
              Compare CVs
            </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <HistoryListSkeleton />
        ) : error ? (
          <ErrorMessage message={error} onRetry={fetchAnalyses} />
        ) : analyses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
              <FileSearch className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">No analyses yet</h2>
            <p className="text-slate-500 mb-6">Upload a resume to get started with your first analysis.</p>
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg transition-colors"
            >
              Start New Analysis
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500">
                {analyses.length} {analyses.length === 1 ? 'analysis' : 'analyses'} found
              </p>
            </div>

            {analyses.map((analysis) => (
              <div
                key={analysis.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* File Icon */}
                    <div className="w-16 h-20 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-200">
                      <FileText className="w-8 h-8 text-slate-400" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-slate-900 truncate mb-1">
                        {analysis.document?.original_filename || 'Unknown Document'}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(analysis.created_at)}
                        </span>
                        {analysis.document?.file_size && (
                          <span>{formatFileSize(analysis.document.file_size)}</span>
                        )}
                      </div>

                      {/* Scores */}
                      <div className="flex flex-wrap gap-3">
                        <div className={`px-3 py-1.5 rounded-lg ${getScoreColor(analysis.overall_score)}`}>
                          <span className="text-xs font-medium opacity-70">Overall</span>
                          <span className="ml-2 font-bold">{analysis.overall_score}</span>
                        </div>

                        {getScoreByCategory(analysis.scores, 'market_signaling') !== null && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600">
                            <TrendingUp className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">Market</span>
                            <span className="font-bold">{getScoreByCategory(analysis.scores, 'market_signaling')}</span>
                          </div>
                        )}

                        {getScoreByCategory(analysis.scores, 'ats_friendliness') !== null && (
                          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-600">
                            <Activity className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium">ATS</span>
                            <span className="font-bold">{getScoreByCategory(analysis.scores, 'ats_friendliness')}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => onViewAnalysis(analysis.id)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(analysis.id)}
                        disabled={deletingId === analysis.id}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        {deletingId === analysis.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
