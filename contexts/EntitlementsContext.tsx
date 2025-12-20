/**
 * Entitlements Context
 *
 * Provides entitlement state to the entire application.
 * This is the React layer that wraps the entitlements service.
 *
 * Usage:
 *   const { entitlements, isLoading, refresh } = useEntitlements();
 *
 * The entitlements object contains:
 *   - plan: Current plan info
 *   - limits: What the plan allows
 *   - usage: What has been used
 *   - remaining: What's left
 *   - can: Boolean flags for allowed actions
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { entitlementsService } from '../services/entitlementsService';
import type { EntitlementSnapshot, UsageIncrementResult } from '../types';

// Default entitlements for non-authenticated users
const DEFAULT_ENTITLEMENTS: EntitlementSnapshot = {
  has_subscription: false,
  plan: { code: null, name: null, is_subscription: false },
  limits: { analyses_per_month: null, comparisons_per_month: null, unlimited_comparisons: false },
  usage: { analyses_used: 0, comparisons_used: 0 },
  remaining: { analyses: 0, comparisons: 0 },
  one_time: { available_scans: 0 },
  can: { analyze_cv: false, compare_cvs: false },
  subscription: null
};

interface EntitlementsContextType {
  // Core state
  entitlements: EntitlementSnapshot;
  isLoading: boolean;
  error: string | null;

  // Actions
  refresh: () => Promise<void>;
  recordAnalysis: () => Promise<UsageIncrementResult>;
  recordComparison: () => Promise<UsageIncrementResult>;

  // Helpers
  canAnalyze: boolean;
  canCompare: boolean;
  hasSubscription: boolean;
  planName: string | null;
  analysesRemaining: number | null;
  comparisonsRemaining: number | null;
  isUnlimitedComparisons: boolean;
}

const EntitlementsContext = createContext<EntitlementsContextType | null>(null);

interface EntitlementsProviderProps {
  userId: string | null;
  children: React.ReactNode;
}

export const EntitlementsProvider: React.FC<EntitlementsProviderProps> = ({
  userId,
  children
}) => {
  const [entitlements, setEntitlements] = useState<EntitlementSnapshot>(DEFAULT_ENTITLEMENTS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch entitlements
  const refresh = useCallback(async () => {
    if (!userId) {
      setEntitlements(DEFAULT_ENTITLEMENTS);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await entitlementsService.getEntitlements(userId);
      setEntitlements(data);
    } catch (err) {
      console.error('Failed to fetch entitlements:', err);
      setError('Failed to load subscription status');
      setEntitlements(DEFAULT_ENTITLEMENTS);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Initial fetch and refetch when userId changes
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Record analysis usage and refresh entitlements
  const recordAnalysis = useCallback(async (): Promise<UsageIncrementResult> => {
    if (!userId) {
      return { success: false, error: 'not_authenticated', message: 'User not authenticated' };
    }

    const result = await entitlementsService.recordAnalysisUsage(userId);

    // Refresh entitlements to get updated counts
    if (result.success) {
      await refresh();
    }

    return result;
  }, [userId, refresh]);

  // Record comparison usage and refresh entitlements
  const recordComparison = useCallback(async (): Promise<UsageIncrementResult> => {
    if (!userId) {
      return { success: false, error: 'not_authenticated', message: 'User not authenticated' };
    }

    const result = await entitlementsService.recordComparisonUsage(userId);

    // Refresh entitlements to get updated counts
    if (result.success) {
      await refresh();
    }

    return result;
  }, [userId, refresh]);

  // Memoized computed values
  const contextValue = useMemo<EntitlementsContextType>(() => ({
    entitlements,
    isLoading,
    error,
    refresh,
    recordAnalysis,
    recordComparison,

    // Computed helpers
    canAnalyze: entitlements.can.analyze_cv,
    canCompare: entitlements.can.compare_cvs,
    hasSubscription: entitlements.has_subscription,
    planName: entitlements.plan.name,
    analysesRemaining: entitlements.remaining.analyses,
    comparisonsRemaining: entitlements.remaining.comparisons,
    isUnlimitedComparisons: entitlements.limits.unlimited_comparisons
  }), [entitlements, isLoading, error, refresh, recordAnalysis, recordComparison]);

  return (
    <EntitlementsContext.Provider value={contextValue}>
      {children}
    </EntitlementsContext.Provider>
  );
};

/**
 * Hook to access entitlements in any component.
 *
 * @example
 * const { canAnalyze, analysesRemaining, recordAnalysis } = useEntitlements();
 *
 * if (!canAnalyze) {
 *   return <UpgradePrompt />;
 * }
 */
export const useEntitlements = (): EntitlementsContextType => {
  const context = useContext(EntitlementsContext);

  if (!context) {
    throw new Error('useEntitlements must be used within an EntitlementsProvider');
  }

  return context;
};

/**
 * Hook to check if a specific action is allowed.
 * Useful for conditional rendering.
 *
 * @example
 * const canDoAnalysis = useCanPerformAction('analyze');
 */
export const useCanPerformAction = (action: 'analyze' | 'compare'): boolean => {
  const { canAnalyze, canCompare } = useEntitlements();

  if (action === 'analyze') return canAnalyze;
  if (action === 'compare') return canCompare;

  return false;
};

/**
 * Hook to get formatted usage display.
 *
 * @example
 * const { used, remaining, limit, percentage, isUnlimited } = useUsageDisplay('analyses');
 */
export const useUsageDisplay = (type: 'analyses' | 'comparisons') => {
  const { entitlements } = useEntitlements();

  if (type === 'analyses') {
    const used = entitlements.usage.analyses_used;
    const limit = entitlements.limits.analyses_per_month;
    const remaining = entitlements.remaining.analyses;
    const isUnlimited = limit === null;
    const percentage = isUnlimited ? 0 : entitlementsService.getUsagePercentage(used, limit);

    return {
      used,
      remaining,
      limit,
      percentage,
      isUnlimited,
      display: isUnlimited ? `${used} used` : `${used} / ${limit} used`
    };
  }

  // Comparisons
  const used = entitlements.usage.comparisons_used;
  const limit = entitlements.limits.comparisons_per_month;
  const remaining = entitlements.remaining.comparisons;
  const isUnlimited = entitlements.limits.unlimited_comparisons;
  const percentage = isUnlimited ? 0 : entitlementsService.getUsagePercentage(used, limit);

  return {
    used,
    remaining,
    limit,
    percentage,
    isUnlimited,
    display: isUnlimited ? 'Unlimited' : `${used} / ${limit} used`
  };
};

export default EntitlementsContext;
