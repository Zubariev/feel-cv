import React from 'react';
import {
  ArrowLeft,
  BrainCircuit,
  FileSearch,
  Target,
  Users,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Eye,
  Zap
} from 'lucide-react';
import { Footer } from '../Footer';

interface Props {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onStartAnalysis: () => void;
  onPricingClick?: () => void;
}

export const CVAnalysisPage: React.FC<Props> = ({ onBack, onNavigate, onStartAnalysis, onPricingClick }) => {
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
              <h1 className="text-lg font-bold tracking-tight">CV Analysis</h1>
              <p className="text-xs text-slate-400">AI-Powered Resume Evaluation</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-20">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-sm font-medium mb-6">
                <FileSearch className="w-4 h-4" />
                <span>Core Feature</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                CV Analysis - AI-Powered Resume Evaluation
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                CVIVID analyzes your CV using advanced AI to evaluate capital theory scoring, visual hierarchy, ATS compatibility, and market signaling strength. Get actionable insights in seconds.
              </p>
              <button
                onClick={onStartAnalysis}
                className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors"
              >
                Analyze Your CV Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>

        {/* What It Is */}
        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">What It Is</h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                CVIVID CV Analysis is an AI-powered tool that evaluates your resume across multiple dimensions using Pierre Bourdieu's Capital Theory framework. Unlike simple keyword scanners, CVIVID understands the deeper signals your CV sends to employers.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                The analysis covers five types of capital (Material, Social, Cultural, Symbolic, and Technological), visual presentation quality, ATS compatibility, and overall market signaling effectiveness. Each analysis provides specific, actionable recommendations to improve your CV's performance.
              </p>
            </div>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Who It's For</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl border border-slate-200">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  <Briefcase className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Job Seekers</h3>
                <p className="text-slate-600">
                  Professionals actively looking for new opportunities who want to maximize their CV's impact and increase interview callbacks.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-slate-200">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Career Coaches</h3>
                <p className="text-slate-600">
                  Professionals who advise clients on career development and need objective, data-driven CV assessments to guide their recommendations.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-slate-200">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Career Changers</h3>
                <p className="text-slate-600">
                  Individuals transitioning between industries or roles who need to understand how their transferable skills are perceived.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Why It Matters</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Research shows recruiters spend an average of 6-7 seconds on initial CV screening. In that brief window, your CV must communicate value instantly and effectively.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Most candidates never receive feedback on why their CVs don't perform. CVIVID bridges this gap by providing the same insights that professional recruiters and HR consultants use—making expert-level analysis accessible to everyone.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Understand exactly what signals your CV sends</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Identify and fix weaknesses before applying</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Increase confidence in your applications</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-100 rounded-2xl p-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-indigo-600 mb-2">6-7s</div>
                  <div className="text-slate-600 font-medium">Average recruiter scan time</div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900">75%</div>
                    <div className="text-sm text-slate-500">CVs rejected by ATS</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-slate-900">250+</div>
                    <div className="text-sm text-slate-500">Average applicants per role</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Upload</h3>
                <p className="text-slate-600 text-sm">Upload your CV as PDF or image. Your data is encrypted and secure.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">AI Analysis</h3>
                <p className="text-slate-600 text-sm">Our AI evaluates your CV across capital theory, visual design, and ATS factors.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Visual Mapping</h3>
                <p className="text-slate-600 text-sm">See where recruiters will focus attention with our saliency heatmap.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Get Insights</h3>
                <p className="text-slate-600 text-sm">Receive detailed scores, evidence, and actionable recommendations.</p>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">What You Get</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Capital Radar Chart</h3>
                  <p className="text-slate-600 text-sm">Visual breakdown of your five capital types with detailed scoring.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Saliency Heatmap</h3>
                  <p className="text-slate-600 text-sm">Predictive eye-tracking visualization showing attention patterns.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">ATS Score</h3>
                  <p className="text-slate-600 text-sm">Compatibility rating for Applicant Tracking Systems.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Market Signaling Score</h3>
                  <p className="text-slate-600 text-sm">How effectively your CV communicates professional value.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileSearch className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Skills Analysis</h3>
                  <p className="text-slate-600 text-sm">Hard and soft skills extraction with visual highlighting.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Action Items</h3>
                  <p className="text-slate-600 text-sm">Specific recommendations to improve your CV immediately.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When to Use */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">When to Use CV Analysis</h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Before Starting a Job Search</h3>
                    <p className="text-slate-600">Get a baseline assessment and optimize your CV before sending applications.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">After Major CV Updates</h3>
                    <p className="text-slate-600">Verify that your changes actually improved your CV's effectiveness.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">When Targeting Competitive Roles</h3>
                    <p className="text-slate-600">Ensure your CV stands out when applying for high-demand positions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">During Career Transitions</h3>
                    <p className="text-slate-600">Understand how your transferable skills are perceived in a new context.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-600 text-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Analyze Your CV?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Get instant AI-powered insights and discover exactly how your resume performs.
            </p>
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors text-lg"
            >
              Start Your Analysis
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate as any} onPricingClick={onPricingClick} />
    </div>
  );
};
