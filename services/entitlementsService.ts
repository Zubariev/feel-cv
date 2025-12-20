/**
 * Entitlements Service
 *
 * This service is the single source of truth for user entitlements.
 * It communicates with Supabase to fetch and manage:
 * - User's current plan and subscription status
 * - Usage limits and remaining quota
 * - One-time purchase availability
 *
 * The UI should NEVER calculate entitlements - it only renders what this service returns.
 */

import { supabase } from './supabaseClient';
import type {
  EntitlementSnapshot,
  UsageIncrementResult,
  PlanDetails
} from '../types';

// Default entitlement snapshot for users with no subscription or purchases
const DEFAULT_ENTITLEMENTS: EntitlementSnapshot = {
  has_subscription: false,
  plan: {
    code: null,
    name: null,
    is_subscription: false
  },
  limits: {
    analyses_per_month: null,
    comparisons_per_month: null,
    unlimited_comparisons: false
  },
  usage: {
    analyses_used: 0,
    comparisons_used: 0
  },
  remaining: {
    analyses: 0,
    comparisons: 0
  },
  one_time: {
    available_scans: 0
  },
  can: {
    analyze_cv: false,
    compare_cvs: false
  },
  subscription: null
};

export const entitlementsService = {
  /**
   * Get the current entitlement snapshot for a user.
   * This is the primary method the UI should call.
   *
   * @param userId - The authenticated user's ID
   * @returns EntitlementSnapshot with all access information
   */
  async getEntitlements(userId: string): Promise<EntitlementSnapshot> {
    try {
      const { data, error } = await supabase.rpc('get_user_entitlements', {
        p_user_id: userId
      });

      if (error) {
        console.error('Error fetching entitlements:', error);
        return DEFAULT_ENTITLEMENTS;
      }

      // The RPC returns JSONB which is already parsed
      return data as EntitlementSnapshot;
    } catch (err) {
      console.error('Unexpected error fetching entitlements:', err);
      return DEFAULT_ENTITLEMENTS;
    }
  },

  /**
   * Increment analysis usage and return the result.
   * Called AFTER a successful analysis is performed.
   *
   * @param userId - The authenticated user's ID
   * @returns Result indicating success or failure with details
   */
  async recordAnalysisUsage(userId: string): Promise<UsageIncrementResult> {
    try {
      const { data, error } = await supabase.rpc('increment_analysis_usage', {
        p_user_id: userId
      });

      if (error) {
        console.error('Error recording analysis usage:', error);
        return {
          success: false,
          error: 'database_error',
          message: error.message
        };
      }

      return data as UsageIncrementResult;
    } catch (err) {
      console.error('Unexpected error recording analysis usage:', err);
      return {
        success: false,
        error: 'unexpected_error',
        message: 'Failed to record analysis usage'
      };
    }
  },

  /**
   * Increment comparison usage and return the result.
   * Called AFTER a successful comparison is performed.
   *
   * @param userId - The authenticated user's ID
   * @returns Result indicating success or failure with details
   */
  async recordComparisonUsage(userId: string): Promise<UsageIncrementResult> {
    try {
      const { data, error } = await supabase.rpc('increment_comparison_usage', {
        p_user_id: userId
      });

      if (error) {
        console.error('Error recording comparison usage:', error);
        return {
          success: false,
          error: 'database_error',
          message: error.message
        };
      }

      return data as UsageIncrementResult;
    } catch (err) {
      console.error('Unexpected error recording comparison usage:', err);
      return {
        success: false,
        error: 'unexpected_error',
        message: 'Failed to record comparison usage'
      };
    }
  },

  /**
   * Check if user can perform an analysis (without incrementing usage).
   * Use this for UI gating before showing upload.
   *
   * @param userId - The authenticated user's ID
   * @returns Boolean indicating if analysis is allowed
   */
  async canAnalyze(userId: string): Promise<boolean> {
    const entitlements = await this.getEntitlements(userId);
    return entitlements.can.analyze_cv;
  },

  /**
   * Check if user can perform a comparison (without incrementing usage).
   * Use this for UI gating before showing comparison selector.
   *
   * @param userId - The authenticated user's ID
   * @returns Boolean indicating if comparison is allowed
   */
  async canCompare(userId: string): Promise<boolean> {
    const entitlements = await this.getEntitlements(userId);
    return entitlements.can.compare_cvs;
  },

  /**
   * Get all available plans.
   *
   * @returns Array of plan details
   */
  async getPlans(): Promise<PlanDetails[]> {
    try {
      const { data, error } = await supabase
        .from('plans')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) {
        console.error('Error fetching plans:', error);
        return [];
      }

      return data as PlanDetails[];
    } catch (err) {
      console.error('Unexpected error fetching plans:', err);
      return [];
    }
  },

  /**
   * Get upgrade recommendations based on current entitlements.
   * Returns plans that would give the user more quota.
   *
   * @param currentEntitlements - The user's current entitlement snapshot
   * @returns Array of recommended plan codes with reasons
   */
  getUpgradeRecommendations(
    currentEntitlements: EntitlementSnapshot
  ): { planCode: string; reason: string }[] {
    const recommendations: { planCode: string; reason: string }[] = [];

    // No subscription - recommend starting with explorer
    if (!currentEntitlements.has_subscription) {
      recommendations.push({
        planCode: 'explorer',
        reason: 'Start with 5 analyses per month'
      });
      recommendations.push({
        planCode: 'career-builder',
        reason: 'Most popular - 10 analyses + 5 comparisons'
      });
      return recommendations;
    }

    const currentPlan = currentEntitlements.plan.code;

    // Explorer - recommend career-builder
    if (currentPlan === 'explorer') {
      recommendations.push({
        planCode: 'career-builder',
        reason: '2x more analyses + 5 comparisons'
      });
      recommendations.push({
        planCode: 'career-accelerator',
        reason: 'Unlimited comparisons + 30 analyses'
      });
    }

    // Career Builder - recommend career-accelerator
    if (currentPlan === 'career-builder') {
      recommendations.push({
        planCode: 'career-accelerator',
        reason: 'Unlimited comparisons + 3x more analyses'
      });
    }

    return recommendations;
  },

  /**
   * Format remaining quota for display.
   *
   * @param remaining - Number of remaining uses, or null for unlimited
   * @param isUnlimited - Whether the quota is unlimited
   * @returns Formatted string for display
   */
  formatRemaining(remaining: number | null, isUnlimited: boolean = false): string {
    if (isUnlimited || remaining === null) {
      return 'Unlimited';
    }
    return remaining.toString();
  },

  /**
   * Get usage percentage for progress bars.
   *
   * @param used - Amount used
   * @param limit - Total limit, or null for unlimited
   * @returns Percentage (0-100) or 0 for unlimited
   */
  getUsagePercentage(used: number, limit: number | null): number {
    if (limit === null || limit === 0) {
      return 0;
    }
    return Math.min(100, Math.round((used / limit) * 100));
  }
};
