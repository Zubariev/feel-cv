import React from 'react';
import {
  ArrowLeft,
  BrainCircuit,
  Heart,
  Shield,
  Target,
  Users,
  Lightbulb,
  Award,
  GraduationCap,
  TrendingUp
} from 'lucide-react';
import { Footer } from './Footer';

interface Props {
  onBack: () => void;
  onNavigate: (page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'ai-ethics' | 'blog' | 'cv-analysis' | 'cv-comparison' | 'eye-tracking' | 'capital-theory' | 'ats-score' | 'market-signaling') => void;
}

export const AboutPage: React.FC<Props> = ({ onBack, onNavigate }) => {
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
          <div>
            <h1 className="text-lg font-bold tracking-tight">About CVSense</h1>
            <p className="text-xs text-slate-400">Our mission and story</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-20">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="bg-indigo-500 p-3 rounded-xl">
                <BrainCircuit className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About CVSense</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Empowering professionals to understand and articulate their true value in the job market.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We believe that everyone deserves to understand their professional worth. CVSense was born from a simple
                observation: too many talented professionals struggle to articulate their value, not because they lack skills,
                but because they lack the tools to see and communicate what makes them unique.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-2xl bg-slate-50">
                <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Confidence</h3>
                <p className="text-slate-600">
                  Our analysis helps you see your strengths clearly and present them with conviction.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-slate-50">
                <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Transparency</h3>
                <p className="text-slate-600">
                  No black boxes. Every score, every insight is explainable. You understand exactly what we measure and why.
                </p>
              </div>

              <div className="text-center p-8 rounded-2xl bg-slate-50">
                <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Control</h3>
                <p className="text-slate-600">
                  You own your data. You compare to yourself, not others. Your progress is yours alone to track.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Approach</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                We combine sociological theory with cutting-edge AI to provide a unique perspective on your professional profile.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <GraduationCap className="w-8 h-8 text-indigo-600" />
                  Bourdieu's Capital Theory
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Pierre Bourdieu's sociological framework identifies five forms of capital that determine an individual's
                  position in society. We apply this lens to your CV, measuring:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-slate-900">Material Capital</strong>
                      <span className="text-slate-600"> - Economic resources and tangible assets</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-slate-900">Social Capital</strong>
                      <span className="text-slate-600"> - Network connections and relationships</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-slate-900">Cultural Capital</strong>
                      <span className="text-slate-600"> - Education, knowledge, and cultural sophistication</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-slate-900">Symbolic Capital</strong>
                      <span className="text-slate-600"> - Prestige, reputation, and brand recognition</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-slate-900">Technological Capital</strong>
                      <span className="text-slate-600"> - Technical skills and digital literacy</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                  <Lightbulb className="w-8 h-8 text-indigo-600" />
                  Visual Signal Extraction
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Your CV communicates before it's read. We use AI-powered visual analysis to understand how
                  your document performs at a glance:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-slate-900">Saliency Mapping</strong>
                      <span className="text-slate-600"> - Simulated eye-tracking to see where attention lands</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-slate-900">Typography Analysis</strong>
                      <span className="text-slate-600"> - Readability and professional presentation</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-slate-900">Visual Hierarchy</strong>
                      <span className="text-slate-600"> - Information structure and flow</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <div>
                      <strong className="text-slate-900">Color Harmony</strong>
                      <span className="text-slate-600"> - Design cohesion and professionalism</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">What We Stand For</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="flex items-start gap-4 p-6 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">No Population Comparison</h3>
                  <p className="text-slate-600 text-sm">
                    You are compared only to yourself. We don't rank you against others or use
                    aggregate data that could demotivate or mislead.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Explainable Metrics</h3>
                  <p className="text-slate-600 text-sm">
                    Every score comes with evidence. We show you exactly what in your CV
                    contributed to each assessment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Privacy First</h3>
                  <p className="text-slate-600 text-sm">
                    Your CV contains sensitive information. We process it securely and never
                    share your data with third parties.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-xl border border-slate-200">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Progress Tracking</h3>
                  <p className="text-slate-600 text-sm">
                    With our comparison feature, you can track your improvement over time and
                    make data-driven decisions about your career documents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-indigo-600 text-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Discover Your Value?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Start with a free analysis and see what makes you stand out in the job market.
            </p>
            <button
              onClick={onBack}
              className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-indigo-50 transition-colors"
            >
              Analyze Your CV
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
