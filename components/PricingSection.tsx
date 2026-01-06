import React, { useEffect, useState } from 'react';
import {
  Zap,
  Rocket,
  Crown,
  Check,
  ArrowRight,
  Star,
  FileSearch,
  Loader2
} from 'lucide-react';
import { entitlementsService } from '../services/entitlementsService';
import type { PlanDetails } from '../types';

interface PricingProps {
  onSelectPlan?: (planId: string) => void;
  isAuthenticated?: boolean;
}

// Icons and styling per plan
const planStyles: Record<string, {
  icon: React.ReactNode;
  iconBg: string;
  badge: string;
  badgeColor: string;
}> = {
  'one-time': {
    icon: <FileSearch className="w-5 h-5 text-slate-600" />,
    iconBg: 'bg-slate-100',
    badge: 'Try First',
    badgeColor: 'text-slate-500',
  },
  'explorer': {
    icon: <Zap className="w-5 h-5 text-blue-600" />,
    iconBg: 'bg-blue-50',
    badge: 'Starter',
    badgeColor: 'text-blue-600',
  },
  'career-builder': {
    icon: <Rocket className="w-5 h-5 text-white" />,
    iconBg: 'bg-white/20',
    badge: 'Professional',
    badgeColor: 'text-indigo-200',
  },
  'career-accelerator': {
    icon: <Crown className="w-5 h-5 text-amber-600" />,
    iconBg: 'bg-amber-50',
    badge: 'Premium',
    badgeColor: 'text-amber-600',
  },
};

export const PricingSection: React.FC<PricingProps> = ({
  onSelectPlan,
}) => {
  const [plans, setPlans] = useState<PlanDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await entitlementsService.getPlans();
        setPlans(fetchedPlans);
      } catch (err) {
        console.error('Failed to fetch plans:', err);
        setError('Failed to load pricing');
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const handlePlanSelect = (planId: string) => {
    console.log('[PricingSection] handlePlanSelect called with planId:', planId);
    console.log('[PricingSection] onSelectPlan exists:', !!onSelectPlan);
    if (onSelectPlan) {
      onSelectPlan(planId);
    } else {
      console.warn('[PricingSection] onSelectPlan is not defined!');
    }
  };

  const formatPrice = (price: number, isSubscription: boolean) => {
    if (isSubscription) {
      return `€${price.toFixed(0)}`;
    }
    return `€${price.toFixed(2)}`;
  };

  const getFeatures = (plan: PlanDetails) => {
    const features: string[] = [];

    if (plan.analyses_per_month) {
      features.push(`${plan.analyses_per_month} ${plan.analyses_per_month === 1 ? 'analysis' : 'analyses'} per month`);
    }

    if (plan.is_unlimited_comparisons) {
      features.push('Unlimited comparisons');
    } else if (plan.comparisons_per_month && plan.comparisons_per_month > 0) {
      features.push(`${plan.comparisons_per_month} comparison ${plan.comparisons_per_month === 1 ? 'analysis' : 'analyses'}`);
    }

    features.push('Full AI-powered insights');
    features.push('Eye-tracking heatmaps');
    features.push('ATS compatibility check');

    if (plan.plan_code === 'career-builder' || plan.plan_code === 'career-accelerator') {
      features.push('Priority support');
    }

    return features;
  };

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  const oneTimePlan = plans.find(p => p.plan_code === 'one-time');
  const subscriptionPlans = plans.filter(p => p.is_subscription);
  const careerBuilderPlan = plans.find(p => p.plan_code === 'career-builder');

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded bg-indigo-50 text-indigo-600 text-sm font-bold uppercase tracking-wider mb-6">
            Simple and Transparent Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Invest in Your Career
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Choose the plan that fits your job search. Every plan gives you full access to our AI-powered analysis.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">

          {/* One-Time Purchase - Small, on the left */}
          {oneTimePlan && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${planStyles['one-time'].iconBg} flex items-center justify-center`}>
                    {planStyles['one-time'].icon}
                  </div>
                  <span className={`text-sm font-medium ${planStyles['one-time'].badgeColor} uppercase tracking-wider`}>
                    {planStyles['one-time'].badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{oneTimePlan.name}</h3>

                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900">
                    {formatPrice(oneTimePlan.price_eur, false)}
                  </span>
                  <span className="text-slate-500 ml-1">one-time</span>
                </div>

                <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                  {oneTimePlan.description}
                </p>

                <ul className="space-y-3 mb-6 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">1 complete CV analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Full AI insights & market signaling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">Eye-tracking heatmap</span>
                  </li>
                </ul>

                <button
                  onClick={() => handlePlanSelect('one-time')}
                  className="w-full py-3 px-4 rounded-xl border border-slate-300 text-slate-700 font-medium hover:bg-slate-50 transition-colors text-sm"
                >
                  Buy Single Scan
                </button>

                <p className="text-xs text-slate-400 text-center mt-3">
                  Most users upgrade after first scan
                </p>
              </div>
            </div>
          )}

          {/* Subscription Plans - Center, taking 3 columns */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => {
              const isPopular = plan.plan_code === 'career-builder';
              const style = planStyles[plan.plan_code || ''] || planStyles['explorer'];
              const features = getFeatures(plan);

              if (isPopular) {
                return (
                  <div key={plan.id} className="relative bg-indigo-600 rounded-2xl p-6 shadow-xl shadow-indigo-500/20 text-white transform lg:-translate-y-4 lg:scale-105">
                    {/* Popular Badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-lg">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        Most Popular
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4 mt-2">
                      <div className={`w-10 h-10 rounded-lg ${style.iconBg} flex items-center justify-center`}>
                        {style.icon}
                      </div>
                      <span className={`text-sm font-medium ${style.badgeColor} uppercase tracking-wider`}>
                        {style.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-sm text-indigo-200 mb-4">{plan.description}</p>

                    <div className="mb-2">
                      <span className="text-4xl font-bold text-white">
                        {formatPrice(plan.price_eur, true)}
                      </span>
                      <span className="text-indigo-200 ml-1">/month</span>
                    </div>

                    <p className="text-xs text-emerald-300 font-medium mb-6">
                      {plan.analyses_per_month ? `€${(plan.price_eur / plan.analyses_per_month).toFixed(2)} per analysis` : ''}
                    </p>

                    <ul className="space-y-3 mb-6 text-sm">
                      {features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" />
                          <span className="text-indigo-100">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handlePlanSelect(plan.plan_code || '')}
                      className="w-full py-3 px-4 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
                    >
                      Get {plan.name}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              }

              const isPremium = plan.plan_code === 'career-accelerator';

              return (
                <div key={plan.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${style.iconBg} flex items-center justify-center`}>
                      {style.icon}
                    </div>
                    <span className={`text-sm font-medium ${style.badgeColor} uppercase tracking-wider`}>
                      {style.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{plan.description}</p>

                  <div className="mb-2">
                    <span className="text-4xl font-bold text-slate-900">
                      {formatPrice(plan.price_eur, true)}
                    </span>
                    <span className="text-slate-500 ml-1">/month</span>
                  </div>

                  <p className="text-xs text-emerald-600 font-medium mb-6">
                    {plan.analyses_per_month ? `€${(plan.price_eur / plan.analyses_per_month).toFixed(2)} per analysis` : ''}
                    {isPremium ? ' — best value' : ''}
                  </p>

                  <ul className="space-y-3 mb-6 text-sm">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePlanSelect(plan.plan_code || '')}
                    className={`w-full py-3 px-4 rounded-xl font-medium transition-colors ${
                      isPremium
                        ? 'bg-slate-900 text-white hover:bg-slate-800'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isPremium ? 'Go Premium' : 'Get Started'}
                  </button>

                  {isPremium && (
                    <p className="text-xs text-slate-400 text-center mt-3">
                      For PhD students, career switchers & power users
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500 mb-6">
            All plans include our core features. No hidden fees. Cancel anytime.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>7-day money-back guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Secure payment via SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Cancel subscription anytime</span>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
            FAQ
          </h3>
          <div className="space-y-4">
            <FaqItem
              question="What counts as one analysis?"
              answer="Each CV you upload and analyze counts as one analysis. If you upload the same CV multiple times to track changes, each upload counts separately."
            />
            <FaqItem
              question="What is a comparison analysis?"
              answer="Comparison analysis lets you see two versions of your CV side-by-side, helping you understand which changes improved your scores and which areas still need work."
            />
            <FaqItem
              question="Can I change plans later?"
              answer="Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle."
            />
            <FaqItem
              question="Is there a free trial?"
              answer="We offer a one-time scan for a small fee instead of a free trial. This lets you experience our full analysis power before committing to a subscription."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FaqItem = ({ question, answer }: { question: string; answer: string }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-6">
    <h4 className="text-lg font-semibold text-slate-900 mb-2">{question}</h4>
    <p className="text-slate-600 leading-relaxed">{answer}</p>
  </div>
);
