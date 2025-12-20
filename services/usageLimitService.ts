/**
 * Usage limit service for comparison feature.
 * STUB: Currently uses localStorage until subscription backend is implemented.
 * TODO: Replace with actual subscription check when backend is ready.
 */

type PlanId = 'one-time' | 'explorer' | 'career-builder' | 'career-accelerator';

const COMPARISON_LIMITS: Record<PlanId, number> = {
  'one-time': 0,
  explorer: 1,
  'career-builder': 5,
  'career-accelerator': Infinity
};

export const usageLimitService = {
  /**
   * Get the current month key for tracking usage
   */
  getMonthKey(userId: string): string {
    const now = new Date();
    return `comparisons_${userId}_${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  },

  /**
   * Get user's current plan
   * STUB: Returns 'career-accelerator' for development/testing
   */
  getUserPlan(userId: string): PlanId {
    const stored = localStorage.getItem(`user_plan_${userId}`);
    // Default to career-accelerator for development so comparisons work
    return (stored as PlanId) || 'career-accelerator';
  },

  /**
   * Set user's plan (for testing)
   */
  setUserPlan(userId: string, plan: PlanId): void {
    localStorage.setItem(`user_plan_${userId}`, plan);
  },

  /**
   * Get current month's comparison count
   */
  getComparisonCount(userId: string): number {
    const monthKey = this.getMonthKey(userId);
    return parseInt(localStorage.getItem(monthKey) || '0', 10);
  },

  /**
   * Check if user can perform a comparison
   */
  canCompare(userId: string): { allowed: boolean; remaining: number; limit: number } {
    const plan = this.getUserPlan(userId);
    const limit = COMPARISON_LIMITS[plan];
    const used = this.getComparisonCount(userId);

    return {
      allowed: used < limit,
      remaining: limit === Infinity ? Infinity : Math.max(0, limit - used),
      limit
    };
  },

  /**
   * Record a comparison usage
   */
  recordComparison(userId: string): void {
    const monthKey = this.getMonthKey(userId);
    const current = this.getComparisonCount(userId);
    localStorage.setItem(monthKey, String(current + 1));
  },

  /**
   * Reset comparison count (for testing)
   */
  resetComparisonCount(userId: string): void {
    const monthKey = this.getMonthKey(userId);
    localStorage.removeItem(monthKey);
  }
};
