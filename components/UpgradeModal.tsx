/**
 * Upgrade Modal Component
 *
 * Displayed when user hits a limit or tries to access a feature they don't have.
 * This is where conversions happen - designed for maximum ARPU.
 */

import React from 'react';
import {
  X,
  Zap,
  Rocket,
  Crown,
  Check,
  ArrowRight,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import type { EntitlementSnapshot, PlanCode } from '../types';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  entitlements: EntitlementSnapshot;
  blockedAction: 'analyze' | 'compare';
  onSelectPlan: (planCode: PlanCode) => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({
  isOpen,
  onClose,
  entitlements,
  blockedAction,
  onSelectPlan
}) => {
  if (!isOpen) return null;

  const currentPlan = entitlements.plan.code;
  const hasSubscription = entitlements.has_subscription;

  // Determine the message based on what's blocked
  const getMessage = () => {
    if (blockedAction === 'analyze') {
      if (!hasSubscription && entitlements.one_time.available_scans === 0) {
        return {
          title: 'Get Your First CV Analysis',
          subtitle: 'See how recruiters and AI systems perceive your CV',
          cta: 'Start with a single analysis or get a subscription for more.'
        };
      }
      return {
        title: 'Analysis Limit Reached',
        subtitle: `You've used all ${entitlements.limits.analyses_per_month} analyses this month.`,
        cta: 'Upgrade your plan to continue analyzing CVs.'
      };
    }

    // Comparison blocked
    if (!hasSubscription) {
      return {
        title: 'Comparisons Require a Subscription',
        subtitle: 'Track your CV improvements over time by comparing versions.',
        cta: 'Subscribe to unlock comparison features.'
      };
    }

    return {
      title: 'Comparison Limit Reached',
      subtitle: `You've used all ${entitlements.limits.comparisons_per_month} comparisons this month.`,
      cta: 'Upgrade to Career Accelerator for unlimited comparisons.'
    };
  };

  const message = getMessage();

  // Plans to show based on current plan
  const getRecommendedPlans = () => {
    if (!hasSubscription) {
      return ['one-time', 'explorer', 'career-builder', 'career-accelerator'] as PlanCode[];
    }
    if (currentPlan === 'explorer') {
      return ['career-builder', 'career-accelerator'] as PlanCode[];
    }
    if (currentPlan === 'career-builder') {
      return ['career-accelerator'] as PlanCode[];
    }
    return [];
  };

  const recommendedPlans = getRecommendedPlans();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-900 text-white p-8 pb-12 rounded-t-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500 rounded-lg">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-amber-300 font-medium uppercase text-sm tracking-wider">
              {blockedAction === 'analyze' ? 'Analysis' : 'Comparison'} Blocked
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-2">{message.title}</h2>
          <p className="text-slate-300">{message.subtitle}</p>
        </div>

        {/* Current status */}
        {hasSubscription && (
          <div className="px-8 -mt-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Current Plan</p>
                  <p className="font-semibold text-slate-900">{entitlements.plan.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">This Month</p>
                  <p className="text-sm text-slate-600">
                    {entitlements.usage.analyses_used} / {entitlements.limits.analyses_per_month ?? '∞'} analyses
                  </p>
                  <p className="text-sm text-slate-600">
                    {entitlements.usage.comparisons_used} / {entitlements.limits.unlimited_comparisons ? '∞' : entitlements.limits.comparisons_per_month} comparisons
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upgrade options */}
        <div className="p-8 pt-6">
          <p className="text-sm text-slate-600 mb-6">{message.cta}</p>

          <div className="space-y-4">
            {recommendedPlans.includes('one-time') && (
              <PlanOption
                icon={<Zap className="w-5 h-5" />}
                name="Single Scan"
                price="€3.99"
                priceNote="one-time"
                features={['1 complete CV analysis', 'Full AI insights']}
                onClick={() => onSelectPlan('one-time')}
                variant="outline"
              />
            )}

            {recommendedPlans.includes('explorer') && (
              <PlanOption
                icon={<Zap className="w-5 h-5" />}
                name="Explorer"
                price="€9"
                priceNote="/month"
                features={['5 analyses per month', '1 comparison']}
                onClick={() => onSelectPlan('explorer')}
                variant="outline"
              />
            )}

            {recommendedPlans.includes('career-builder') && (
              <PlanOption
                icon={<Rocket className="w-5 h-5" />}
                name="Career Builder"
                price="€19"
                priceNote="/month"
                features={['10 analyses per month', '5 comparisons', 'Priority support']}
                onClick={() => onSelectPlan('career-builder')}
                variant="primary"
                badge="Most Popular"
              />
            )}

            {recommendedPlans.includes('career-accelerator') && (
              <PlanOption
                icon={<Crown className="w-5 h-5" />}
                name="Career Accelerator"
                price="€29"
                priceNote="/month"
                features={['30 analyses per month', 'Unlimited comparisons', 'Priority support']}
                onClick={() => onSelectPlan('career-accelerator')}
                variant={currentPlan === 'career-builder' ? 'primary' : 'outline'}
                badge={currentPlan === 'career-builder' ? 'Recommended' : undefined}
              />
            )}
          </div>

          {/* Trust indicators */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                Cancel anytime
              </span>
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                7-day money back
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface PlanOptionProps {
  icon: React.ReactNode;
  name: string;
  price: string;
  priceNote: string;
  features: string[];
  onClick: () => void;
  variant: 'primary' | 'outline';
  badge?: string;
}

const PlanOption: React.FC<PlanOptionProps> = ({
  icon,
  name,
  price,
  priceNote,
  features,
  onClick,
  variant,
  badge
}) => {
  const isPrimary = variant === 'primary';

  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-xl border-2 transition-all text-left group ${
        isPrimary
          ? 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-500'
          : 'bg-white border-slate-200 hover:border-indigo-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={`p-2 rounded-lg ${isPrimary ? 'bg-white/20' : 'bg-slate-100'}`}>
            <span className={isPrimary ? 'text-white' : 'text-slate-600'}>{icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${isPrimary ? 'text-white' : 'text-slate-900'}`}>
                {name}
              </span>
              {badge && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  isPrimary ? 'bg-amber-400 text-amber-900' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {badge}
                </span>
              )}
            </div>
            <ul className="mt-1 space-y-0.5">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className={`text-xs flex items-center gap-1 ${
                    isPrimary ? 'text-indigo-100' : 'text-slate-500'
                  }`}
                >
                  <Check className="w-3 h-3" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-xl font-bold ${isPrimary ? 'text-white' : 'text-slate-900'}`}>
            {price}
          </span>
          <span className={`text-xs block ${isPrimary ? 'text-indigo-200' : 'text-slate-500'}`}>
            {priceNote}
          </span>
        </div>
      </div>

      <div className={`mt-3 flex items-center justify-end gap-1 text-sm font-medium ${
        isPrimary ? 'text-white' : 'text-indigo-600'
      }`}>
        <span>Select Plan</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </button>
  );
};

/**
 * Simpler inline upgrade prompt for less intrusive nudges
 */
interface UpgradePromptProps {
  message: string;
  planCode?: PlanCode;
  onUpgrade: () => void;
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({
  message,
  onUpgrade
}) => {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-6 text-center">
      <TrendingUp className="w-10 h-10 text-indigo-500 mx-auto mb-3" />
      <p className="text-slate-700 mb-4">{message}</p>
      <button
        onClick={onUpgrade}
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-500 transition-colors"
      >
        Upgrade Now
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default UpgradeModal;
