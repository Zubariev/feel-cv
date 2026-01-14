import React from 'react';
import { ArrowLeft, BrainCircuit, Shield, Eye, Users, RefreshCw, UserCheck } from 'lucide-react';
import { Footer } from './Footer';

interface Props {
  onBack: () => void;
  onNavigate: (page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'ai-ethics' | 'blog' | 'cv-analysis' | 'cv-comparison' | 'eye-tracking' | 'capital-theory' | 'ats-score' | 'market-signaling') => void;
  onPricingClick?: () => void;
}

export const AIEthicalPolicyPage: React.FC<Props> = ({ onBack, onNavigate, onPricingClick }) => {
  const lastUpdated = 'December 20, 2025';

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
            <h1 className="text-lg font-bold tracking-tight">AI Ethical Policy</h1>
            <p className="text-xs text-slate-400">Our commitment to responsible AI</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-16">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <BrainCircuit className="w-16 h-16 mx-auto mb-6 text-indigo-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Ethical Policy</h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our commitment to responsible AI development, transparency, and ethical practices
              in building career advancement tools
            </p>
            <p className="text-slate-400 mt-4">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Core Principles */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core AI Principles</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                These principles guide every aspect of how we develop, deploy, and maintain our AI systems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <PrincipleCard
                icon={<Shield className="w-8 h-8" />}
                title="Responsible Use"
                description="AI provides suggestions and recommendations that are advisory in nature, empowering you to make informed decisions."
                color="bg-indigo-100 text-indigo-600"
              />
              <PrincipleCard
                icon={<Users className="w-8 h-8" />}
                title="Bias Mitigation"
                description="Our AI is trained to avoid discrimination based on protected characteristics including age, gender, ethnicity, and disability."
                color="bg-emerald-100 text-emerald-600"
              />
              <PrincipleCard
                icon={<Eye className="w-8 h-8" />}
                title="Transparency"
                description="We clearly inform you when AI tools are being used and explain that outputs are suggestions, not guarantees."
                color="bg-purple-100 text-purple-600"
              />
              <PrincipleCard
                icon={<Shield className="w-8 h-8" />}
                title="Privacy First"
                description="Your data is processed securely with appropriate technical measures to protect against unauthorized access."
                color="bg-blue-100 text-blue-600"
              />
              <PrincipleCard
                icon={<RefreshCw className="w-8 h-8" />}
                title="Continuous Improvement"
                description="Models are regularly updated to improve accuracy, reduce bias, and comply with evolving ethical standards."
                color="bg-amber-100 text-amber-600"
              />
              <PrincipleCard
                icon={<UserCheck className="w-8 h-8" />}
                title="Human Oversight"
                description="Final decisions always rest with you. AI assists but never replaces human judgment in career decisions."
                color="bg-rose-100 text-rose-600"
              />
            </div>
          </div>
        </section>

        {/* Detailed Policy */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="prose prose-slate max-w-none">

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. Responsible AI Use</h2>
              <p className="text-slate-600 mb-4">
                CVIVID's AI analyzes CVs and application data to provide optimization suggestions. We aim for
                fairness, transparency, and accuracy in all our AI-powered features.
              </p>
              <p className="text-slate-600 mb-4">
                We utilize AI technology to provide suggestions, recommendations, and assistance through our
                services, including content generation, CV optimization, and analysis guidance.
              </p>
              <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl mb-6">
                <p className="text-slate-700">
                  <strong>Important:</strong> CVIVID, our AI, and everything we do is not intended to help you
                  get jobs you are not qualified for. It is designed to help you present yourself authentically
                  and effectively for positions you are genuinely qualified for.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. Bias Mitigation</h2>
              <p className="text-slate-600 mb-4">
                Our AI is trained to avoid discrimination based on age, gender, ethnicity, religion, disability,
                or other protected characteristics. We actively work to identify and eliminate bias in our systems.
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Users are encouraged to review AI-generated suggestions and exercise their own judgment</li>
                <li>AI recommendations may not be suitable for all circumstances or job applications</li>
                <li>Users remain solely responsible for reviewing, editing, and approving all content before submission</li>
                <li>We regularly audit our AI outputs for potential bias</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. Transparency</h2>
              <p className="text-slate-600 mb-4">
                We believe in being open about how our AI works and its limitations:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Users are informed when AI tools are being used throughout our platform</li>
                <li>AI outputs are suggestions, not guarantees of employment outcomes</li>
                <li>We make no warranties regarding the success of any job application</li>
                <li>Employment decisions are made solely by employers</li>
                <li>We clearly indicate which features are AI-powered</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Data Handling & Privacy</h2>
              <p className="text-slate-600 mb-4">
                Your data security is paramount to us:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>CV data and usage data are processed securely in accordance with our Privacy Policy and GDPR Policy</li>
                <li>AI models do not retain personally identifiable information beyond what is necessary</li>
                <li>By using our services, you consent to your content being processed by AI systems</li>
                <li>We implement appropriate technical and organizational measures to protect your data</li>
                <li>Your CV content is never used to train AI models without explicit consent</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Continuous Improvement</h2>
              <p className="text-slate-600 mb-4">
                We are committed to ongoing improvement of our AI systems:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Models are regularly updated to improve accuracy and reduce bias</li>
                <li>User feedback is incorporated into AI improvement cycles</li>
                <li>We may use aggregated and anonymized data for service improvement</li>
                <li>We stay current with ethical AI best practices and standards</li>
                <li>Regular third-party audits help ensure compliance</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">6. Human Oversight</h2>
              <p className="text-slate-600 mb-4">
                AI assists but never replaces human judgment:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Human review is recommended for all CV edits and AI outputs before submission</li>
                <li>CVIVID does not make hiring decisions; final responsibility lies with you</li>
                <li>Users must exercise their own judgment when using AI suggestions</li>
                <li>The accuracy of AI-generated content cannot be guaranteed</li>
                <li>You remain solely responsible for all content you submit to employers</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">7. AI Technology We Use</h2>
              <p className="text-slate-600 mb-4">
                We are transparent about the AI technology powering our services:
              </p>
              <div className="bg-slate-50 p-6 rounded-xl mb-6">
                <p className="text-slate-600 mb-4">
                  <strong>Google Gemini AI:</strong> We use Google's Gemini AI for document analysis and
                  content processing. Your data is processed according to both our privacy policy and
                  Google's data handling practices.
                </p>
                <p className="text-slate-600">
                  <strong>Bourdieu's Capital Theory:</strong> Our analysis framework is based on sociological
                  research, providing a unique lens for understanding professional value.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">8. Your Rights</h2>
              <p className="text-slate-600 mb-4">
                Regarding AI processing of your data, you have the right to:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Opt out of AI processing at any time</li>
                <li>Request information about how AI decisions are made</li>
                <li>Challenge AI-generated recommendations</li>
                <li>Request human review of AI outputs</li>
                <li>Delete all data that has been processed by AI</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">9. Contact Us</h2>
              <p className="text-slate-600 mb-4">
                If you have questions or concerns about our AI practices:
              </p>
              <div className="bg-slate-50 p-6 rounded-xl">
                <p className="text-slate-600">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:ai-ethics@CVIVID.com" className="text-indigo-600 hover:text-indigo-700">
                    ai-ethics@CVIVID.com
                  </a>
                </p>
                <p className="text-slate-600 mt-2">
                  <strong>General Support:</strong>{' '}
                  <a href="mailto:support@CVIVID.com" className="text-indigo-600 hover:text-indigo-700">
                    support@CVIVID.com
                  </a>
                </p>
              </div>

              <div className="mt-12 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-slate-700 text-sm">
                  This AI Ethical Policy is part of our comprehensive Terms & Conditions that govern your use
                  of CVIVID's services. For complete details, please refer to our{' '}
                  <button
                    onClick={() => onNavigate('terms')}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Terms of Use
                  </button>{' '}
                  and{' '}
                  <button
                    onClick={() => onNavigate('privacy')}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Privacy Policy
                  </button>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} onPricingClick={onPricingClick} />
    </div>
  );
};

const PrincipleCard = ({
  icon,
  title,
  description,
  color
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className={`w-16 h-16 ${color} rounded-xl flex items-center justify-center mb-6`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);
