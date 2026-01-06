import React from 'react';
import {
  ArrowLeft,
  BrainCircuit,
  GraduationCap,
  Users,
  Crown,
  Cpu,
  Coins,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Lightbulb
} from 'lucide-react';
import { Footer } from '../Footer';

interface Props {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onStartAnalysis: () => void;
}

export const CapitalTheoryPage: React.FC<Props> = ({ onBack, onNavigate, onStartAnalysis }) => {
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
              <h1 className="text-lg font-bold tracking-tight">Capital Theory Framework</h1>
              <p className="text-xs text-slate-400">Bourdieu Methodology</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                <span>Sociological Framework</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Capital Theory Framework
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                CVSense evaluates your resume using Pierre Bourdieu's Capital Theory, measuring five distinct forms of capital that determine your position in the professional marketplace.
              </p>
              <button
                onClick={onStartAnalysis}
                className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-colors"
              >
                Analyze Your Capital
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
                Pierre Bourdieu was a French sociologist who developed the theory that social position is determined by various forms of "capital" beyond just money. CVSense applies this framework to resume analysis, revealing the hidden signals that determine how employers perceive your professional value.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Unlike simple keyword matching, Capital Theory analysis understands the deeper meaning behind your experiences, education, and achievements. It measures not just what you've done, but what those accomplishments signal about your professional potential.
              </p>
            </div>
          </div>
        </section>

        {/* The Five Types of Capital */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">The Five Types of Capital</h2>
            <p className="text-lg text-slate-600 mb-12 text-center max-w-2xl mx-auto">
              Each type represents a different dimension of professional value that employers consciously or unconsciously evaluate.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <GraduationCap className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Cultural Capital</h3>
                <p className="text-slate-600 mb-4">
                  Educational credentials, certifications, domain expertise, and knowledge that signal competence and intellectual ability.
                </p>
                <ul className="text-sm text-slate-500 space-y-1">
                  <li>• Degrees and academic prestige</li>
                  <li>• Professional certifications</li>
                  <li>• Industry expertise indicators</li>
                  <li>• Language and communication skills</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Social Capital</h3>
                <p className="text-slate-600 mb-4">
                  Network connections, institutional affiliations, and relationships that provide access to opportunities and resources.
                </p>
                <ul className="text-sm text-slate-500 space-y-1">
                  <li>• Elite company affiliations</li>
                  <li>• Professional associations</li>
                  <li>• References and recommendations</li>
                  <li>• Industry network signals</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                  <Crown className="w-7 h-7 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Symbolic Capital</h3>
                <p className="text-slate-600 mb-4">
                  Prestige, reputation, awards, and status markers that signal achievement and social recognition.
                </p>
                <ul className="text-sm text-slate-500 space-y-1">
                  <li>• Awards and honors</li>
                  <li>• Leadership titles</li>
                  <li>• Publications and speaking</li>
                  <li>• Brand prestige indicators</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                  <Cpu className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Technological Capital</h3>
                <p className="text-slate-600 mb-4">
                  Technical skills, tool proficiency, and digital literacy that demonstrate modern capability and adaptability.
                </p>
                <ul className="text-sm text-slate-500 space-y-1">
                  <li>• Programming languages</li>
                  <li>• Tools and platforms</li>
                  <li>• GitHub/portfolio activity</li>
                  <li>• Technical certifications</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                  <Coins className="w-7 h-7 text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Material Capital</h3>
                <p className="text-slate-600 mb-4">
                  Economic indicators, salary history signals, and tangible resources associated with career progression.
                </p>
                <ul className="text-sm text-slate-500 space-y-1">
                  <li>• Seniority progression</li>
                  <li>• Budget responsibility</li>
                  <li>• Team size managed</li>
                  <li>• Revenue/impact metrics</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-8 rounded-xl border border-indigo-200">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  <Lightbulb className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Why It Matters</h3>
                <p className="text-slate-600 mb-4">
                  Employers make hiring decisions based on these signals, often unconsciously. Understanding your capital profile helps you present yourself more effectively.
                </p>
                <button
                  onClick={onStartAnalysis}
                  className="text-indigo-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Discover your profile
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* How CVSense Uses It */}
        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">How CVSense Uses Capital Theory</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Our AI analyzes every element of your CV to identify capital indicators. It extracts evidence for each capital type and calculates scores based on the strength and clarity of these signals.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Identifies specific evidence for each capital type</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Calculates balanced scores across all dimensions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Visualizes your profile in an intuitive radar chart</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">Recommends ways to strengthen weak areas</span>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-50 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">Sample Capital Radar</h3>
                <div className="relative aspect-square max-w-sm mx-auto">
                  {/* Simple radar visualization */}
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Background pentagon */}
                    <polygon
                      points="100,20 180,70 160,160 40,160 20,70"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="1"
                    />
                    <polygon
                      points="100,40 160,80 145,145 55,145 40,80"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="1"
                    />
                    <polygon
                      points="100,60 140,90 130,130 70,130 60,90"
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="1"
                    />
                    {/* Data polygon */}
                    <polygon
                      points="100,35 155,75 140,140 60,145 45,85"
                      fill="rgba(99, 102, 241, 0.2)"
                      stroke="#6366f1"
                      strokeWidth="2"
                    />
                    {/* Labels */}
                    <text x="100" y="12" textAnchor="middle" className="text-xs fill-slate-600">Cultural</text>
                    <text x="188" y="72" textAnchor="start" className="text-xs fill-slate-600">Social</text>
                    <text x="165" y="172" textAnchor="start" className="text-xs fill-slate-600">Symbolic</text>
                    <text x="35" y="172" textAnchor="end" className="text-xs fill-slate-600">Tech</text>
                    <text x="12" y="72" textAnchor="end" className="text-xs fill-slate-600">Material</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Who Benefits */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Who Benefits Most</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Career Changers</h3>
                <p className="text-slate-600 text-sm">Understand which capital types transfer to your new field.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Senior Professionals</h3>
                <p className="text-slate-600 text-sm">Leverage symbolic capital to demonstrate leadership potential.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Tech Professionals</h3>
                <p className="text-slate-600 text-sm">Balance technical capital with other dimensions for leadership roles.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover Your Capital Profile</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Understand the hidden signals in your CV and learn how to strengthen your professional positioning.
            </p>
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors text-lg"
            >
              Analyze Your Capital
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
