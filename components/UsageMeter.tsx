/**
 * Usage Meter Component
 *
 * Displays current usage vs limits for analyses and comparisons.
 * Shows a progress bar and remaining count.
 * Important for ARPU - creates psychological anchoring.
 */

import React from 'react';
import { BarChart3, GitCompare, Infinity } from 'lucide-react';

interface UsageMeterProps {
  type: 'analyses' | 'comparisons';
  used: number;
  limit: number | null;
  isUnlimited?: boolean;
  showUpgradeHint?: boolean;
  compact?: boolean;
}

export const UsageMeter: React.FC<UsageMeterProps> = ({
  type,
  used,
  limit,
  isUnlimited = false,
  showUpgradeHint = true,
  compact = false
}) => {
  const remaining = isUnlimited || limit === null ? null : Math.max(0, limit - used);
  const percentage = isUnlimited || limit === null || limit === 0 ? 0 : Math.min(100, (used / limit) * 100);

  const isLow = remaining !== null && remaining <= 2 && remaining > 0;
  const isEmpty = remaining === 0;

  const icon = type === 'analyses'
    ? <BarChart3 className="w-4 h-4" />
    : <GitCompare className="w-4 h-4" />;

  const label = type === 'analyses' ? 'CV Analyses' : 'Comparisons';

  // Determine color based on remaining
  const getBarColor = () => {
    if (isEmpty) return 'bg-red-500';
    if (isLow) return 'bg-amber-500';
    return 'bg-indigo-600';
  };

  const getTextColor = () => {
    if (isEmpty) return 'text-red-600';
    if (isLow) return 'text-amber-600';
    return 'text-slate-600';
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className={getTextColor()}>{icon}</span>
        <span className={`font-medium ${getTextColor()}`}>
          {isUnlimited ? (
            <span className="flex items-center gap-1">
              <Infinity className="w-4 h-4" />
              {label}
            </span>
          ) : (
            `${remaining} ${type} left`
          )}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">{icon}</span>
          <span className="text-sm font-medium text-slate-700">{label}</span>
        </div>
        <div className="text-right">
          {isUnlimited ? (
            <span className="flex items-center gap-1 text-sm font-semibold text-indigo-600">
              <Infinity className="w-4 h-4" />
              Unlimited
            </span>
          ) : (
            <span className={`text-sm font-semibold ${getTextColor()}`}>
              {used} / {limit}
            </span>
          )}
        </div>
      </div>

      {!isUnlimited && (
        <>
          <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
            <div
              className={`${getBarColor()} h-2 rounded-full transition-all duration-300`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {showUpgradeHint && (isEmpty || isLow) && (
            <p className={`text-xs ${isEmpty ? 'text-red-500' : 'text-amber-600'}`}>
              {isEmpty
                ? 'No analyses remaining. Upgrade to continue.'
                : `Only ${remaining} ${type} left this month.`}
            </p>
          )}
        </>
      )}
    </div>
  );
};

/**
 * Combined usage display showing both analyses and comparisons
 */
interface UsageSummaryProps {
  analysesUsed: number;
  analysesLimit: number | null;
  comparisonsUsed: number;
  comparisonsLimit: number | null;
  isUnlimitedComparisons: boolean;
  planName: string | null;
}

export const UsageSummary: React.FC<UsageSummaryProps> = ({
  analysesUsed,
  analysesLimit,
  comparisonsUsed,
  comparisonsLimit,
  isUnlimitedComparisons,
  planName
}) => {
  return (
    <div className="space-y-4">
      {planName && (
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <span className="text-sm text-slate-500">Current Plan</span>
          <span className="text-sm font-semibold text-indigo-600">{planName}</span>
        </div>
      )}

      <UsageMeter
        type="analyses"
        used={analysesUsed}
        limit={analysesLimit}
      />

      <UsageMeter
        type="comparisons"
        used={comparisonsUsed}
        limit={comparisonsLimit}
        isUnlimited={isUnlimitedComparisons}
      />
    </div>
  );
};

export default UsageMeter;
