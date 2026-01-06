import React from 'react';
import {
  ArrowLeft,
  BrainCircuit,
  GitCompare,
  TrendingUp,
  History,
  Target,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Layers,
  RefreshCw
} from 'lucide-react';
import { Footer } from '../Footer';

interface Props {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onStartAnalysis: () => void;
}

export const CVComparisonPage: React.FC<Props> = ({ onBack, onNavigate, onStartAnalysis }) => {
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
              <h1 className="text-lg font-bold tracking-tight">CV Comparison</h1>
              <p className="text-xs text-slate-400">Track Your Resume Progress</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-sm font-medium mb-6">
                <GitCompare className="w-4 h-4" />
                <span>Progress Tracking</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                CV Comparison - Track Your Resume Progress
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Compare two CV versions side-by-side to see exactly how your improvements affect scores, capital distribution, and visual presentation. Data-driven iteration for career success.
              </p>
              <button
                onClick={onStartAnalysis}
                className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors"
              >
                Compare Your CVs
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
                CVSense CV Comparison allows you to analyze the differences between two versions of your resume. By comparing analyses side-by-side, you can see exactly how your edits impact every metric—from capital scores to visual hierarchy effectiveness.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                This feature is designed for iterative improvement. Instead of guessing whether your changes made a difference, you get concrete data showing score improvements, new strengths identified, and areas that still need work.
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
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                  <RefreshCw className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Iterative Improvers</h3>
                <p className="text-slate-600">
                  Professionals who continuously refine their CV and want to track improvements over time with concrete metrics.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-slate-200">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Layers className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Multiple CV Holders</h3>
                <p className="text-slate-600">
                  Job seekers maintaining different CV versions for various roles or industries who need to compare effectiveness.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-slate-200">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">A/B Testers</h3>
                <p className="text-slate-600">
                  Data-driven professionals who want to test different CV approaches and determine which performs better.
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
                  Without comparison data, CV improvement is guesswork. You might spend hours tweaking your resume without knowing if those changes actually help or hurt your chances.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  CV Comparison provides the feedback loop that transforms resume optimization from an art into a science. Every change you make can be measured, validated, and refined.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Validate that your edits actually improve scores</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Identify which changes have the biggest impact</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Track progress toward your career goals</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600 font-medium">Overall Score</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +12 points
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-3">
                        <div className="bg-slate-400 rounded-full h-3 w-[65%]"></div>
                      </div>
                      <div className="flex-1 bg-emerald-200 rounded-full h-3">
                        <div className="bg-emerald-500 rounded-full h-3 w-[77%]"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>Before: 65</span>
                      <span>After: 77</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-600 font-medium">ATS Score</span>
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        +18 points
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-3">
                        <div className="bg-slate-400 rounded-full h-3 w-[52%]"></div>
                      </div>
                      <div className="flex-1 bg-emerald-200 rounded-full h-3">
                        <div className="bg-emerald-500 rounded-full h-3 w-[70%]"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>Before: 52</span>
                      <span>After: 70</span>
                    </div>
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
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Select Base</h3>
                <p className="text-slate-600 text-sm">Choose your original CV from your analysis history as the baseline.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Select Compare</h3>
                <p className="text-slate-600 text-sm">Pick the updated version you want to compare against the base.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">View Deltas</h3>
                <p className="text-slate-600 text-sm">See score changes, capital shifts, and visual improvements highlighted.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Take Action</h3>
                <p className="text-slate-600 text-sm">Use insights to make further improvements or validate your approach.</p>
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
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Score Deltas</h3>
                  <p className="text-slate-600 text-sm">See exactly how much each score improved or declined between versions.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Capital Comparison</h3>
                  <p className="text-slate-600 text-sm">Side-by-side radar charts showing capital distribution changes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Layers className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Visual Metrics</h3>
                  <p className="text-slate-600 text-sm">Compare typography, color harmony, and layout effectiveness.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Strengths Evolution</h3>
                  <p className="text-slate-600 text-sm">Track which strengths were added, maintained, or lost.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <History className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Timeline View</h3>
                  <p className="text-slate-600 text-sm">See your improvement journey over multiple CV versions.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Tone Analysis</h3>
                  <p className="text-slate-600 text-sm">Compare how your professional tone evolved between versions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When to Use */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">When to Use CV Comparison</h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">After Making Significant Edits</h3>
                    <p className="text-slate-600">Verify that your changes actually moved the needle on important metrics.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Testing Different Approaches</h3>
                    <p className="text-slate-600">Compare a skills-focused layout versus an achievements-focused one.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Role-Specific CVs</h3>
                    <p className="text-slate-600">Compare CVs tailored for different roles to understand positioning differences.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Quarterly Reviews</h3>
                    <p className="text-slate-600">Track how your CV has evolved as you've gained new experience and skills.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-emerald-600 text-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Track Your Progress?</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
              Start comparing your CV versions and see measurable improvement in your resume's effectiveness.
            </p>
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-emerald-50 transition-colors text-lg"
            >
              Start Comparing
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate as any} />
    </div>
  );
};
