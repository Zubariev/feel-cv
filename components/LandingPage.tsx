import React, { useState } from 'react';
import {
  BrainCircuit,
  Eye,
  TrendingUp,
  Activity,
  Users,
  GraduationCap,
  Cpu,
  Crown,
  Coins,
  ArrowRight,
  Heart,
  Shield,
  Lightbulb,
  Target,
  Sparkles,
  UserCheck,
  LogOut
} from 'lucide-react';

interface Props {
  onStart: () => void;
  isAuthenticated: boolean;
  userEmail?: string;
  onLogin: (email: string, password: string) => Promise<void> | void;
  onSignup: (email: string, password: string) => Promise<void> | void;
  onLogout: () => Promise<void> | void;
  authError?: string | null;
  authLoading?: boolean;
}

export const LandingPage: React.FC<Props> = ({
  onStart,
  isAuthenticated,
  userEmail,
  onLogin,
  onSignup,
  onLogout,
  authError,
  authLoading,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      await onLogin(email, password);
    } else {
      await onSignup(email, password);
    }
  };

  const scrollToAuth = () => {
    const authSection = document.getElementById('auth-section');
    if (authSection) {
      authSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCtaClick = () => {
    if (isAuthenticated) {
      onStart();
    } else {
      scrollToAuth();
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* Account Bar for authenticated users */}
      {isAuthenticated && (
        <div className="bg-slate-800 text-white py-2 px-4">
          <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
            <span className="text-sm text-slate-300">
              Signed in as <span className="font-medium text-white">{userEmail}</span>
            </span>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-24 pb-32">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-indigo-600 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600 blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <Heart className="w-4 h-4" />
            <span>Confidence Through Understanding</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            CVSense
          </h1>

          <p className="text-3xl md:text-4xl text-white font-medium max-w-4xl mb-6">
            Stop guessing. Start knowing.
          </p>

          <p className="text-xl md:text-2xl text-slate-400 max-w-4xl mb-12 leading-relaxed font-light">
            We give you the <span className="text-indigo-400 font-medium">confidence</span> and <span className="text-indigo-400 font-medium">support</span> to understand exactly how recruiters, AI systems, and hiring managers see you.
          </p>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <button
              onClick={handleCtaClick}
              className="group relative inline-flex items-center gap-3 px-10 py-5 text-lg rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
            >
              {isAuthenticated ? 'Launch CVSense' : 'Get Started'}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-sm text-slate-400 md:text-left">
              {isAuthenticated ? (
                <span>Signed in as <span className="text-slate-200 font-medium">{userEmail}</span></span>
              ) : (
                <span>Sign in or create an account below to start analyzing resumes.</span>
              )}
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12 text-base text-slate-400 font-medium">
            <div className="flex flex-col items-center gap-3">
              <Shield className="w-8 h-8 text-indigo-400" />
              <span className="text-lg">Less Anxiety</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Target className="w-8 h-8 text-teal-400" />
              <span className="text-lg">Clear Direction</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Sparkles className="w-8 h-8 text-rose-400" />
              <span className="text-lg">Expert Insights</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <UserCheck className="w-8 h-8 text-amber-400" />
              <span className="text-lg">Full Control</span>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding the User Section */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded bg-rose-50 text-rose-600 text-sm font-bold uppercase tracking-wider mb-6">
              We Get It
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Job Hunting is Stressful. We Understand.
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Behind every job posting are real people—recruiters with limited time, ATS systems with rigid rules, and hiring managers with specific expectations. You shouldn't have to figure this out alone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PainPointCard
              number="01"
              title="You know your CV matters"
              description="You understand that a well-crafted CV is the key to success, and you're willing to invest time and effort to get it right."
            />
            <PainPointCard
              number="02"
              title="You're not a recruiting expert"
              description="Psychology, design, color theory, font choices, visual hierarchy—you're great at your job, not at understanding how recruiters think."
            />
            <PainPointCard
              number="03"
              title="Templates feel risky"
              description="Will an experienced recruiter recognize that Canva template? Will it hurt more than help? There's no universal recipe for success."
            />
            <PainPointCard
              number="04"
              title="Limited feedback options"
              description="Not everyone has access to HR professionals or career coaches who can provide honest, expert feedback on their CV."
            />
            <PainPointCard
              number="05"
              title="ATS is a black box"
              description="You've heard about Applicant Tracking Systems filtering out candidates, but how do you know if yours will pass?"
            />
            <PainPointCard
              number="06"
              title="Every application feels like a gamble"
              description="Without knowing how your CV performs, each submission feels uncertain. You deserve clarity and confidence."
            />
          </div>
        </div>
      </section>

      {/* Our Response Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1.5 rounded bg-emerald-50 text-emerald-600 text-sm font-bold uppercase tracking-wider mb-6">
              Our Promise
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              From Uncertainty to Confidence
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We've combined expertise from HR, psychology, sociology, and cutting-edge AI to take the guesswork out of your job search.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ResponseCard
              icon={<Shield className="w-7 h-7" />}
              title="Less Anxiety, More Control"
              description="We inform you on exactly what's working and what isn't. Confidence in understanding and control of your CV—that's what you get with us."
              color="bg-indigo-50 text-indigo-600 border-indigo-100"
            />
            <ResponseCard
              icon={<Eye className="w-7 h-7" />}
              title="See Through Recruiter Eyes"
              description="Our technology mimics human attention patterns and simulates how recruiters scan your CV in those crucial first 7 seconds."
              color="bg-purple-50 text-purple-600 border-purple-100"
            />
            <ResponseCard
              icon={<BrainCircuit className="w-7 h-7" />}
              title="ATS-Proof Analysis"
              description="We proofread your CV down to the last character to ensure it passes through ATS algorithms and remains visible to recruiters."
              color="bg-blue-50 text-blue-600 border-blue-100"
            />
            <ResponseCard
              icon={<Lightbulb className="w-7 h-7" />}
              title="Expert Knowledge, Fair Price"
              description="You focus on being an expert in your field. We take care of everything else—bringing HR industry knowledge, psychology insights, and AI together."
              color="bg-amber-50 text-amber-600 border-amber-100"
            />
            <ResponseCard
              icon={<Sparkles className="w-7 h-7" />}
              title="Transform Any Template"
              description="There's no universal recipe for a successful CV. But even a template-based CV, with our recommendations, can be enhanced to work specifically for you."
              color="bg-emerald-50 text-emerald-600 border-emerald-100"
            />
            <ResponseCard
              icon={<Heart className="w-7 h-7" />}
              title="Trust the Experts"
              description="Our recommendations work because we've done the research. We're experts in what makes CVs succeed—so you don't have to be."
              color="bg-rose-50 text-rose-600 border-rose-100"
            />
          </div>
        </div>
      </section>

      {/* Prominent Sign-In CTA for non-authenticated users */}
      {!isAuthenticated && (
        <section id="auth-section" className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-700">
          <div className="max-w-screen-md mx-auto px-6 sm:px-8 lg:px-12">
            <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-indigo-100 mb-6">
                  <Sparkles className="w-10 h-10 text-indigo-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Ready to gain confidence in your CV?
                </h2>
                <p className="text-lg text-slate-600 max-w-xl mx-auto">
                  Create a free account to start analyzing your resume and get expert insights in seconds.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
                <div className="flex text-base rounded-full bg-slate-100 p-1.5 mb-8">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className={`flex-1 px-6 py-3 rounded-full font-medium transition-all ${
                      mode === 'login'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className={`flex-1 px-6 py-3 rounded-full font-medium transition-all ${
                      mode === 'signup'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    Create account
                  </button>
                </div>

                <div className="space-y-4">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-5 py-4 text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Email address"
                  />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-5 py-4 text-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Password (min. 6 characters)"
                  />
                </div>

                {authError && (
                  <div className="rounded-xl bg-rose-50 border border-rose-100 px-5 py-4 text-base text-rose-700">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/25"
                >
                  {authLoading ? 'Processing...' : mode === 'login' ? 'Sign in & Start Analyzing' : 'Create Account & Start'}
                  <ArrowRight className="w-6 h-6" />
                </button>

                <p className="text-center text-sm text-slate-500 mt-6">
                  Your data is protected with enterprise-grade security
                </p>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* How It Works Section */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 rounded bg-indigo-50 text-indigo-600 text-sm font-bold uppercase tracking-wider mb-6">
              How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">We translate complex analysis into actionable insights</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Eye className="w-8 h-8 text-purple-600" />}
              title="See What They See"
              description="Our AI simulates how a recruiter's eyes scan your CV in the first 7 seconds. Know exactly what grabs attention—and what gets missed."
            />
            <FeatureCard
              icon={<Activity className="w-8 h-8 text-indigo-600" />}
              title="Understand Your Strengths"
              description="Discover the hidden signals in your CV—the prestige markers, skill compositions, and capital items that set you apart from other candidates."
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-emerald-600" />}
              title="Improve With Confidence"
              description="Get clear, actionable recommendations backed by HR expertise. No guesswork—just concrete steps to make your CV work harder for you."
            />
          </div>
        </div>
      </section>

      {/* Bourdieu Section */}
      <section className="py-24 bg-white border-y border-slate-100">
         <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="w-full md:w-2/5">
                <div className="inline-block px-4 py-1.5 rounded bg-slate-100 text-slate-600 text-sm font-bold uppercase tracking-wider mb-6">
                  Sociological Framework
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Bourdieu's Theory of Capital
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  CVSense is built on sociological and market signaling theories. We interpret your professional history through 5 distinct forms of capital to measure your true leverage in the talent market.
                </p>
                <button onClick={handleCtaClick} className="text-lg text-indigo-600 font-semibold flex items-center hover:gap-3 transition-all">
                  Analyze your capital <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>

              <div className="w-full md:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                 <CapitalCard
                    icon={<GraduationCap className="w-6 h-6" />}
                    title="Cultural Capital"
                    desc="Degrees, academic prestige, domain expertise."
                    color="bg-blue-50 text-blue-700 border-blue-100"
                 />
                 <CapitalCard
                    icon={<Users className="w-6 h-6" />}
                    title="Social Capital"
                    desc="Institutions, networks, and elite affiliations."
                    color="bg-emerald-50 text-emerald-700 border-emerald-100"
                 />
                 <CapitalCard
                    icon={<Crown className="w-6 h-6" />}
                    title="Symbolic Capital"
                    desc="Reputation, status signals, awards, and titles."
                    color="bg-amber-50 text-amber-700 border-amber-100"
                 />
                 <CapitalCard
                    icon={<Cpu className="w-6 h-6" />}
                    title="Technological Capital"
                    desc="Stack modernity, engineering fluency, and technical depth."
                    color="bg-purple-50 text-purple-700 border-purple-100"
                 />
                 <CapitalCard
                    icon={<Coins className="w-6 h-6" />}
                    title="Material Capital"
                    desc="Economic indicators associated with past roles."
                    color="bg-slate-50 text-slate-700 border-slate-200"
                 />
              </div>
            </div>
         </div>
      </section>

      {/* Transformation Strip */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
               <h2 className="text-4xl md:text-5xl font-bold mb-6">The Support You Deserve</h2>
               <p className="text-xl text-slate-400">Expert-level insights, made accessible for everyone.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               <div className="text-center p-8 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <div className="text-5xl font-bold text-indigo-400 mb-3">7s</div>
                  <div className="text-base text-slate-400 font-medium uppercase tracking-wider">Recruiter Scan Time</div>
                  <p className="text-sm text-slate-500 mt-3">We show you what they see</p>
               </div>
               <div className="text-center p-8 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <div className="text-5xl font-bold text-teal-400 mb-3">5</div>
                  <div className="text-base text-slate-400 font-medium uppercase tracking-wider">Types of Capital</div>
                  <p className="text-sm text-slate-500 mt-3">Based on sociological theory</p>
               </div>
               <div className="text-center p-8 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <div className="text-5xl font-bold text-rose-400 mb-3">100%</div>
                  <div className="text-base text-slate-400 font-medium uppercase tracking-wider">Actionable Insights</div>
                  <p className="text-sm text-slate-500 mt-3">Clear, practical advice</p>
               </div>
               <div className="text-center p-8 rounded-2xl bg-slate-800/50 border border-slate-700">
                  <div className="text-5xl font-bold text-amber-400 mb-3">ATS</div>
                  <div className="text-base text-slate-400 font-medium uppercase tracking-wider">Pass</div>
                  <p className="text-sm text-slate-500 mt-3">We check every detail</p>
               </div>
            </div>
        </div>
      </section>

      {/* Footer / Final CTA */}
      <section className="py-28 bg-gradient-to-b from-white to-slate-50 text-center">
        <div className="max-w-screen-lg mx-auto px-6">
          <div className="inline-block px-5 py-2.5 rounded-full bg-indigo-50 text-indigo-600 text-base font-medium mb-8">
            The transformation starts here
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
            Stop guessing. Start knowing.
          </h2>
          <p className="text-xl text-slate-500 mb-12">
            Less anxiety. More control. <span className="text-indigo-600 font-semibold">Real confidence.</span>
          </p>
          <button
            onClick={handleCtaClick}
            className="inline-flex items-center gap-3 px-14 py-6 bg-indigo-600 hover:bg-indigo-500 text-white text-xl font-semibold rounded-full transition-all shadow-xl hover:shadow-2xl hover:shadow-indigo-500/25"
          >
            {isAuthenticated ? 'Get Your Confidence Back' : 'Get Started Now'}
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="p-10 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-6 bg-slate-50 w-20 h-20 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-lg text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const CapitalCard = ({ icon, title, desc, color }: { icon: React.ReactNode, title: string, desc: string, color: string }) => (
  <div className={`p-6 rounded-xl border ${color} bg-opacity-30 flex flex-col gap-3`}>
    <div className="flex items-center gap-3 text-lg font-bold">
      {icon}
      <span>{title}</span>
    </div>
    <p className="text-sm opacity-90 leading-relaxed">{desc}</p>
  </div>
);

const PainPointCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
  <div className="p-8 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="text-4xl font-bold text-slate-200 mb-4">{number}</div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-base text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const ResponseCard = ({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: string }) => (
  <div className={`p-8 rounded-xl border ${color} flex gap-5`}>
    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-white flex items-center justify-center shadow-sm">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-base text-slate-600 leading-relaxed">{description}</p>
    </div>
  </div>
);
