import React from 'react';
import {
  Zap,
  Rocket,
  Crown,
  Check,
  ArrowRight,
  Star,
  FileSearch
} from 'lucide-react';

interface PricingProps {
  onSelectPlan?: (planId: string) => void;
  isAuthenticated?: boolean;
}

export const PricingSection: React.FC<PricingProps> = ({
  onSelectPlan,
  isAuthenticated
}) => {
  const handlePlanSelect = (planId: string) => {
    if (onSelectPlan) {
      onSelectPlan(planId);
    }
  };

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
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow h-full">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <FileSearch className="w-5 h-5 text-slate-600" />
                </div>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Try First</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">Single Scan</h3>

              <div className="mb-4">
                <span className="text-4xl font-bold text-slate-900">€3.99</span>
                <span className="text-slate-500 ml-1">one-time</span>
              </div>

              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Try once. Full power. No commitment.
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

          {/* Subscription Plans - Center, taking 3 columns */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Explorer Plan */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">Starter</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">Explorer</h3>
              <p className="text-sm text-slate-500 mb-4">For job seekers</p>

              <div className="mb-2">
                <span className="text-4xl font-bold text-slate-900">€9</span>
                <span className="text-slate-500 ml-1">/month</span>
              </div>

              <p className="text-xs text-emerald-600 font-medium mb-6">
                €1.80 per analysis (vs €3.99 one-time)
              </p>

              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600"><strong>5</strong> analyses per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600"><strong>1</strong> comparison analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">Full AI-powered insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">Eye-tracking heatmaps</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">ATS compatibility check</span>
                </li>
              </ul>

              <button
                onClick={() => handlePlanSelect('explorer')}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors"
              >
                Get Started
              </button>
            </div>

            {/* Career Builder - Most Popular (Highlighted) */}
            <div className="relative bg-indigo-600 rounded-2xl p-6 shadow-xl shadow-indigo-500/20 text-white transform lg:-translate-y-4 lg:scale-105">
              {/* Popular Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-400 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-lg">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  Most Popular
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 mt-2">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <Rocket className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm font-medium text-indigo-200 uppercase tracking-wider">Professional</span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1">Career Builder</h3>
              <p className="text-sm text-indigo-200 mb-4">For serious job hunters</p>

              <div className="mb-2">
                <span className="text-4xl font-bold text-white">€19</span>
                <span className="text-indigo-200 ml-1">/month</span>
              </div>

              <p className="text-xs text-emerald-300 font-medium mb-6">
                €1.90 per analysis — best for active searchers
              </p>

              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" />
                  <span className="text-indigo-100"><strong>10</strong> analyses per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" />
                  <span className="text-indigo-100"><strong>5</strong> comparison analyses</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" />
                  <span className="text-indigo-100">Full AI-powered insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" />
                  <span className="text-indigo-100">Eye-tracking heatmaps</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" />
                  <span className="text-indigo-100">ATS compatibility check</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-300 mt-0.5 flex-shrink-0" />
                  <span className="text-indigo-100">Priority support</span>
                </li>
              </ul>

              <button
                onClick={() => handlePlanSelect('career-builder')}
                className="w-full py-3 px-4 rounded-xl bg-white text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
              >
                Get Career Builder
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Career Accelerator - Premium */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-sm font-medium text-amber-600 uppercase tracking-wider">Premium</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-1">Career Accelerator</h3>
              <p className="text-sm text-slate-500 mb-4">For power users</p>

              <div className="mb-2">
                <span className="text-4xl font-bold text-slate-900">€29</span>
                <span className="text-slate-500 ml-1">/month</span>
              </div>

              <p className="text-xs text-emerald-600 font-medium mb-6">
                €0.97 per analysis — best value
              </p>

              <ul className="space-y-3 mb-6 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600"><strong>30</strong> analyses per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600"><strong>Unlimited</strong> comparisons</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">Full AI-powered insights</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">Eye-tracking heatmaps</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">ATS compatibility check</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-600">Priority support</span>
                </li>
              </ul>

              <button
                onClick={() => handlePlanSelect('career-accelerator')}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
              >
                Go Premium
              </button>

              <p className="text-xs text-slate-400 text-center mt-3">
                For PhD students, career switchers & power users
              </p>
            </div>

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
            Common Questions
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
              answer="We offer a one-time scan for €3.99 instead of a free trial. This lets you experience our full analysis power before committing to a subscription."
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
