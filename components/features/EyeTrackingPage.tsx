import React from 'react';
import {
  ArrowLeft,
  BrainCircuit,
  Eye,
  Scan,
  Users,
  Palette,
  CheckCircle2,
  ArrowRight,
  Layers,
  Focus,
  Clock
} from 'lucide-react';
import { Footer } from '../Footer';

interface Props {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onStartAnalysis: () => void;
}

export const EyeTrackingPage: React.FC<Props> = ({ onBack, onNavigate, onStartAnalysis }) => {
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
              <h1 className="text-lg font-bold tracking-tight">Eye-Tracking Heatmaps</h1>
              <p className="text-xs text-slate-400">Visual Saliency Analysis</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900 text-white py-20">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-sm font-medium mb-6">
                <Eye className="w-4 h-4" />
                <span>Visual Intelligence</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Eye-Tracking Heatmap Analysis
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                CViviD generates predictive eye-tracking heatmaps that simulate where recruiters will focus attention when viewing your CV. See through their eyes in seconds.
              </p>
              <button
                onClick={onStartAnalysis}
                className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors"
              >
                See Your Heatmap
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
                Eye-tracking heatmap analysis uses MSI-Net saliency prediction technology to analyze your CV's visual hierarchy and generate a predictive map of where human eyes will focus. Warm colors indicate high-attention areas; cool colors show regions that may be overlooked.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                This technology is based on the same principles used in professional UX research, where eye-tracking studies reveal how users actually view interfaces. CViviD brings this powerful insight to resume optimization.
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
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Palette className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Design-Conscious Applicants</h3>
                <p className="text-slate-600">
                  Job seekers who want to optimize CV layout and ensure critical information captures attention.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-slate-200">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Career Coaches</h3>
                <p className="text-slate-600">
                  Professionals advising clients who need visual evidence to explain CV design recommendations.
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl border border-slate-200">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                  <Scan className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">HR Professionals</h3>
                <p className="text-slate-600">
                  Recruiters evaluating CV templates and layouts to understand what actually draws attention.
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
                  Research shows recruiters spend just 6-7 seconds on initial CV screening. In that brief window, visual hierarchy determines what information gets seen—and what gets missed entirely.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Your most impressive achievements mean nothing if they're buried in low-attention areas. Eye-tracking analysis reveals these blind spots so you can strategically position critical information.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Discover what recruiters actually see first</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Identify "dead zones" that get overlooked</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Optimize placement of key achievements</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-60">
                  <div className="absolute top-4 left-4 w-32 h-8 bg-yellow-400 rounded blur-xl"></div>
                  <div className="absolute top-16 left-8 w-48 h-6 bg-orange-400 rounded blur-xl"></div>
                  <div className="absolute top-28 left-4 w-24 h-24 bg-red-400 rounded blur-xl"></div>
                  <div className="absolute bottom-20 right-8 w-40 h-6 bg-blue-300 rounded blur-xl"></div>
                  <div className="absolute bottom-8 left-12 w-56 h-4 bg-purple-300 rounded blur-xl"></div>
                </div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                  <div className="h-4 bg-slate-300 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-5/6 mb-4"></div>
                  <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-4/5 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-full mb-4"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                </div>
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-md">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded bg-gradient-to-r from-purple-600 via-red-500 to-yellow-400"></div>
                    <span className="text-slate-600 font-medium">Attention Heatmap</span>
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
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Upload CV</h3>
                <p className="text-slate-600 text-sm">Your CV image is processed through our visual analysis pipeline.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Saliency Analysis</h3>
                <p className="text-slate-600 text-sm">MSI-Net predicts visual attention patterns based on contrast and layout.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Heatmap Generation</h3>
                <p className="text-slate-600 text-sm">Results are visualized as an interactive heatmap overlay.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Insights Delivery</h3>
                <p className="text-slate-600 text-sm">You see exactly where attention falls and what improvements to make.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Understanding the Heatmap */}
        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Understanding the Heatmap</h2>
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-50 rounded-2xl p-8">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-600">Low Attention</span>
                    <div className="h-4 w-64 rounded-full bg-gradient-to-r from-purple-900 via-purple-600 via-red-500 via-orange-400 to-yellow-200"></div>
                    <span className="text-sm font-medium text-slate-600">High Fixation</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-6 h-6 rounded bg-yellow-400"></div>
                      <span className="font-bold text-slate-900">Hot Zones</span>
                    </div>
                    <p className="text-slate-600 text-sm">Areas of highest visual attention. Place your most important information here.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-6 h-6 rounded bg-red-500"></div>
                      <span className="font-bold text-slate-900">Warm Zones</span>
                    </div>
                    <p className="text-slate-600 text-sm">Moderate attention areas. Good for supporting details and context.</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-6 h-6 rounded bg-purple-800"></div>
                      <span className="font-bold text-slate-900">Cold Zones</span>
                    </div>
                    <p className="text-slate-600 text-sm">Low attention areas. Avoid placing critical information here.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* When to Use */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">When to Use Eye-Tracking Analysis</h2>
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Focus className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">After Creating a New CV Design</h3>
                    <p className="text-slate-600">Verify that your layout effectively draws attention to key information before sending applications.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Layers className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">When Comparing Two CV Layouts</h3>
                    <p className="text-slate-600">Use heatmaps to determine which design more effectively highlights your strengths.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">Before Applying to Competitive Positions</h3>
                    <p className="text-slate-600">Ensure your CV makes maximum impact in the crucial 6-7 second initial scan.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-purple-600 text-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">See What Recruiters See</h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Discover where eyes will focus on your CV and optimize for maximum impact.
            </p>
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-colors text-lg"
            >
              Generate Your Heatmap
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
