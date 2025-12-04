import React from 'react';
import { 
  BrainCircuit, 
  Eye, 
  Layers, 
  TrendingUp, 
  Activity, 
  Users, 
  GraduationCap, 
  Cpu, 
  Crown, 
  Coins, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface Props {
  onStart: () => void;
}

export const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-24 pb-32">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-600 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600 blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-medium mb-6 backdrop-blur-sm">
            <BrainCircuit className="w-3 h-3" />
            <span>Next-Gen Career Signal Analytics</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            CVSense
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mb-10 leading-relaxed font-light">
            Transforms any resume into a fully analyzed <span className="text-white font-medium">market signal profile</span>. 
            Uncover how recruiters, AI, and hiring managers perceive you—visually, semantically, and symbolically.
          </p>

          <button 
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)]"
          >
            Launch CVSense
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm text-slate-400 font-medium">
            <div className="flex flex-col items-center gap-2">
              <Eye className="w-6 h-6 text-indigo-400" />
              <span>MSI-Net Saliency</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Users className="w-6 h-6 text-teal-400" />
              <span>Bourdieu Capital</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Activity className="w-6 h-6 text-rose-400" />
              <span>Market Signaling</span>
            </div>
             <div className="flex flex-col items-center gap-2">
              <Layers className="w-6 h-6 text-amber-400" />
              <span>Visual Hierarchy</span>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Not Another Keyword Checker</h2>
            <p className="text-lg text-slate-600">
              This is full-spectrum resume intelligence. Our multi-layer document analysis parses structure, layout, semantics, and sociological capital to give you a 360° evaluation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Eye className="w-8 h-8 text-purple-600" />}
              title="Visual Signal Extraction"
              description="Powered by custom MSI-Net models to predict exactly where human eyes fixate first. We generate heatmaps, whitespace diagnostics, and fixation zones."
            />
            <FeatureCard 
              icon={<Activity className="w-8 h-8 text-indigo-600" />}
              title="AI Recruiter Simulation"
              description="Simulates a 7-second screening pass. Identifies 'Low Attention' zones you're wasting space on and 'High Fixation' zones driving impressions."
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8 text-emerald-600" />}
              title="Global Performance Metrics"
              description="Get concrete scores on Market Signaling (prestige/rarity), ATS Friendliness, and an Overall Composite Score (0-100)."
            />
          </div>
        </div>
      </section>

      {/* Bourdieu Section */}
      <section className="py-24 bg-white border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-1/3">
                <div className="inline-block px-3 py-1 rounded bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-4">
                  Sociological Framework
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Bourdieu's Theory of Capital
                </h2>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  CVSense is built on sociological market theory. We interpret your professional history through 5 distinct forms of capital to measure your true leverage in the talent market.
                </p>
                <button onClick={onStart} className="text-indigo-600 font-semibold flex items-center hover:gap-2 transition-all">
                  Analyze your capital <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>

              <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <CapitalCard 
                    icon={<GraduationCap className="w-5 h-5" />}
                    title="Cultural Capital"
                    desc="Degrees, academic prestige, domain expertise."
                    color="bg-blue-50 text-blue-700 border-blue-100"
                 />
                 <CapitalCard 
                    icon={<Users className="w-5 h-5" />}
                    title="Social Capital"
                    desc="Institutions, networks, and elite affiliations."
                    color="bg-emerald-50 text-emerald-700 border-emerald-100"
                 />
                 <CapitalCard 
                    icon={<Crown className="w-5 h-5" />}
                    title="Symbolic Capital"
                    desc="Reputation, status signals, awards, and titles."
                    color="bg-amber-50 text-amber-700 border-amber-100"
                 />
                 <CapitalCard 
                    icon={<Cpu className="w-5 h-5" />}
                    title="Technological Capital"
                    desc="Stack modernity, engineering fluency, and technical depth."
                    color="bg-purple-50 text-purple-700 border-purple-100"
                 />
                 <CapitalCard 
                    icon={<Coins className="w-5 h-5" />}
                    title="Material Capital"
                    desc="Economic indicators associated with past roles."
                    color="bg-slate-50 text-slate-700 border-slate-200"
                 />
              </div>
            </div>
         </div>
      </section>

      {/* Metrics Strip */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold mb-4">Quantify Your Professional Identity</h2>
               <p className="text-slate-400">Data-driven, theory-informed, and visually intelligent.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               <div className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <div className="text-4xl font-bold text-indigo-400 mb-2">92</div>
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Market Signaling</div>
               </div>
               <div className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <div className="text-4xl font-bold text-teal-400 mb-2">MSI</div>
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Saliency Net</div>
               </div>
               <div className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <div className="text-4xl font-bold text-rose-400 mb-2">NLP</div>
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Semantic Density</div>
               </div>
               <div className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <div className="text-4xl font-bold text-amber-400 mb-2">ATS</div>
                  <div className="text-sm text-slate-400 font-medium uppercase tracking-wider">Parsability</div>
               </div>
            </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">The job market is noisy.</h2>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
             Recruiters skim. ATS filters misread. The <span className="text-indigo-600 font-semibold">CVSense</span> exposes these invisible dynamics and shows you how to optimize with scientific precision.
          </p>
          <button 
            onClick={onStart}
            className="inline-flex items-center gap-2 px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white text-lg font-semibold rounded-lg transition-colors shadow-xl"
          >
            Start Analysis Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4 bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const CapitalCard = ({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) => (
  <div className={`p-5 rounded-xl border ${color} bg-opacity-30 flex flex-col gap-2`}>
    <div className="flex items-center gap-2 font-bold">
      {icon}
      <span>{title}</span>
    </div>
    <p className="text-xs opacity-90 leading-relaxed">{desc}</p>
  </div>
);
