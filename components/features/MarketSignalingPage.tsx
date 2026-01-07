import React from 'react';
import {
  ArrowLeft,
  BrainCircuit,
  Signal,
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Megaphone,
  Sparkles
} from 'lucide-react';
import { Footer } from '../Footer';

interface Props {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onStartAnalysis: () => void;
}

export const MarketSignalingPage: React.FC<Props> = ({ onBack, onNavigate, onStartAnalysis }) => {
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
              <h1 className="text-lg font-bold tracking-tight">Market Signaling Score</h1>
              <p className="text-xs text-slate-400">Professional Value Communication</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-900 text-white py-20">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-sm font-medium mb-6">
                <Signal className="w-4 h-4" />
                <span>Economic Theory Applied</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Market Signaling Score
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Based on Nobel Prize-winning economic theory, your Market Signaling Score measures how effectively your CV communicates professional value to employers in a competitive talent market.
              </p>
              <button
                onClick={onStartAnalysis}
                className="inline-flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl transition-colors"
              >
                Get Your Signal Score
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
                Market Signaling Theory, developed by economist Michael Spence (Nobel Prize 2001), explains how candidates communicate unobservable qualities to employers through observable signals. Your degree, certifications, company names, and achievements all serve as signals.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                CViviD applies this economic framework to evaluate how effectively your CV communicates your true professional value. A high signal score means your CV efficiently conveys quality indicators that employers use in hiring decisions.
              </p>
            </div>
          </div>
        </section>

        {/* The Theory */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Understanding Market Signals</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    Strong Signals
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">
                    Costly or difficult-to-fake indicators that reliably communicate quality:
                  </p>
                  <ul className="text-sm text-slate-500 space-y-1">
                    <li>• Degrees from prestigious universities</li>
                    <li>• Employment at recognized companies</li>
                    <li>• Quantified achievements with metrics</li>
                    <li>• Professional certifications</li>
                    <li>• Published work or patents</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-slate-400" />
                    Weak Signals
                  </h3>
                  <p className="text-slate-600 text-sm mb-3">
                    Easy-to-claim indicators that carry less credibility:
                  </p>
                  <ul className="text-sm text-slate-500 space-y-1">
                    <li>• Self-assessed skill levels</li>
                    <li>• Vague descriptions without evidence</li>
                    <li>• Generic soft skills claims</li>
                    <li>• Unverifiable achievements</li>
                  </ul>
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Signal Strength Pyramid</h3>
                <div className="space-y-3">
                  <div className="bg-amber-500 text-white rounded-lg p-4 text-center">
                    <div className="font-bold">Verified Credentials</div>
                    <div className="text-sm opacity-90">Degrees, certifications, licenses</div>
                  </div>
                  <div className="bg-amber-400 text-white rounded-lg p-4 text-center mx-6">
                    <div className="font-bold">Quantified Achievements</div>
                    <div className="text-sm opacity-90">Metrics, results, impact</div>
                  </div>
                  <div className="bg-amber-300 text-amber-900 rounded-lg p-4 text-center mx-12">
                    <div className="font-bold">Company Names</div>
                    <div className="text-sm opacity-90">Brand recognition</div>
                  </div>
                  <div className="bg-amber-200 text-amber-900 rounded-lg p-4 text-center mx-18">
                    <div className="font-bold text-sm">Soft Claims</div>
                    <div className="text-xs opacity-90">Self-descriptions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Measure */}
        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">What We Measure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Signal Density</h3>
                  <p className="text-slate-600 text-sm">How many credible signals appear per section of your CV.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Signal Clarity</h3>
                  <p className="text-slate-600 text-sm">How clearly and unambiguously your achievements are communicated.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Progression Signals</h3>
                  <p className="text-slate-600 text-sm">Evidence of career advancement and increasing responsibility.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Verification Potential</h3>
                  <p className="text-slate-600 text-sm">How easily employers could verify your claimed achievements.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Prestige Indicators</h3>
                  <p className="text-slate-600 text-sm">Recognition from respected institutions and organizations.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Differentiation</h3>
                  <p className="text-slate-600 text-sm">Signals that distinguish you from other candidates at your level.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Why It Matters</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Employers can't directly observe your abilities. They must rely on signals—observable characteristics that correlate with the qualities they're looking for. The strength and clarity of your signals directly impact your perceived value.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  A CV with strong market signals can command higher salary offers and more interview invitations, even with identical underlying qualifications. Signal optimization is about communication, not fabrication.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Transform vague claims into concrete evidence</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Maximize the impact of your existing achievements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Communicate quality that justifies higher compensation</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Signal Impact on Callbacks</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Weak Signals</span>
                      <span className="font-bold text-slate-400">8% callback rate</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4">
                      <div className="bg-slate-400 rounded-full h-4 w-[8%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Average Signals</span>
                      <span className="font-bold text-amber-500">18% callback rate</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4">
                      <div className="bg-amber-400 rounded-full h-4 w-[18%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-600">Strong Signals</span>
                      <span className="font-bold text-emerald-600">34% callback rate</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-4">
                      <div className="bg-emerald-500 rounded-full h-4 w-[34%]"></div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-4 text-center">Based on labor economics research</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-amber-600 text-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Strengthen Your Market Signals</h2>
            <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
              Discover how effectively your CV communicates your professional value and learn to optimize your signals.
            </p>
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-colors text-lg"
            >
              Get Your Signal Score
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
