import React from 'react';
import { ArrowLeft, BrainCircuit } from 'lucide-react';
import { Footer } from './Footer';
import { PricingSection } from './PricingSection';

interface Props {
  onBack: () => void;
  onNavigate: (page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'ai-ethics' | 'blog' | 'cv-analysis' | 'cv-comparison' | 'eye-tracking' | 'capital-theory' | 'ats-score' | 'market-signaling') => void;
  onPricingClick?: () => void;
  onSelectPlan?: (planId: string) => void;
  isAuthenticated?: boolean;
}

export const PricingPage: React.FC<Props> = ({ onBack, onNavigate, onPricingClick, onSelectPlan, isAuthenticated }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-indigo-500 p-2 rounded-lg">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Pricing</h1>
              <p className="text-xs text-slate-400">Choose your plan</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <PricingSection onSelectPlan={onSelectPlan} isAuthenticated={isAuthenticated} />
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} onPricingClick={onPricingClick} />
    </div>
  );
};
