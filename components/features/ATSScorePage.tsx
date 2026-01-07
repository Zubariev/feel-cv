import React from 'react';
import {
  ArrowLeft,
  BrainCircuit,
  Zap,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Settings,
  Search,
  FileText
} from 'lucide-react';
import { Footer } from '../Footer';

interface Props {
  onBack: () => void;
  onNavigate: (page: string) => void;
  onStartAnalysis: () => void;
}

export const ATSScorePage: React.FC<Props> = ({ onBack, onNavigate, onStartAnalysis }) => {
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
              <h1 className="text-lg font-bold tracking-tight">ATS Compatibility</h1>
              <p className="text-xs text-slate-400">Pass the Robot Gatekeepers</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 text-white py-20">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-medium mb-6">
                <Zap className="w-4 h-4" />
                <span>Technical Optimization</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                ATS Compatibility Score
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                75% of resumes are rejected by ATS before a human ever sees them. CViviD checks your CV against common ATS parsing requirements to ensure your application gets through.
              </p>
              <button
                onClick={onStartAnalysis}
                className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-xl transition-colors"
              >
                Check Your ATS Score
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
                Applicant Tracking Systems (ATS) are software programs that scan and filter resumes before recruiters see them. These systems look for specific formatting, keywords, and structure to determine if a candidate matches a role.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                CViviD ATS Compatibility analysis evaluates your CV against common ATS requirements including text parsability, formatting issues, keyword optimization, and structural clarity. A high ATS score means your resume is more likely to pass automated screening.
              </p>
            </div>
          </div>
        </section>

        {/* The Problem */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">The ATS Problem</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Most job seekers don't realize that their beautifully designed CV may be completely unreadable by ATS software. Creative layouts, graphics, tables, and certain fonts can cause parsing failures.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                    <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-red-900">Common ATS Killers</h4>
                      <ul className="text-red-700 text-sm mt-1 space-y-1">
                        <li>• Graphics and images (including headshots)</li>
                        <li>• Tables and columns</li>
                        <li>• Headers and footers</li>
                        <li>• Unusual fonts or special characters</li>
                        <li>• PDF files created from design software</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-red-500 mb-2">75%</div>
                  <div className="text-slate-600 font-medium">of resumes never reach human reviewers</div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Applications received</span>
                    <span className="font-bold text-slate-900">250</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div className="bg-slate-400 rounded-full h-4 w-full"></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Pass ATS screening</span>
                    <span className="font-bold text-emerald-600">~63</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4">
                    <div className="bg-emerald-500 rounded-full h-4 w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What We Check */}
        <section className="py-16 bg-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">What We Check</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-cyan-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Text Parsability</h3>
                  <p className="text-slate-600 text-sm">Can all text be extracted correctly, or are there parsing issues?</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Format Compatibility</h3>
                  <p className="text-slate-600 text-sm">Is the layout ATS-friendly without problematic elements?</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Search className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Section Recognition</h3>
                  <p className="text-slate-600 text-sm">Can ATS identify standard sections like Experience, Education, Skills?</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Contact Information</h3>
                  <p className="text-slate-600 text-sm">Is contact info easily parsable and in a standard location?</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileCheck className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Date Formatting</h3>
                  <p className="text-slate-600 text-sm">Are dates in recognizable formats that ATS can parse?</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-2">Keyword Presence</h3>
                  <p className="text-slate-600 text-sm">Does your CV contain industry-standard keywords and terms?</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tips for ATS Success */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Tips for ATS Success</h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Use Standard Section Headers</h3>
                  <p className="text-slate-600">Stick to "Experience", "Education", "Skills" rather than creative alternatives like "My Journey" or "What I Know".</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Avoid Tables and Columns</h3>
                  <p className="text-slate-600">ATS often reads tables left-to-right across rows, scrambling your carefully organized information.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Use Standard Fonts</h3>
                  <p className="text-slate-600">Arial, Calibri, Times New Roman, and Helvetica are safe choices that all ATS can read.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white p-6 rounded-xl border border-slate-200">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Save as Word or Simple PDF</h3>
                  <p className="text-slate-600">PDFs from design software may have text as images. Word .docx files are most reliable.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-cyan-600 text-white">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Check Your ATS Compatibility</h2>
            <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
              Don't let robots reject you. Verify your CV passes ATS screening before you apply.
            </p>
            <button
              onClick={onStartAnalysis}
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-cyan-600 font-semibold rounded-xl hover:bg-cyan-50 transition-colors text-lg"
            >
              Get Your ATS Score
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
