import React from 'react';
import { ArrowLeft, Scale, CheckCircle2 } from 'lucide-react';
import { Footer } from './Footer';

interface Props {
  onBack: () => void;
  onNavigate: (page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'ai-ethics' | 'blog' | 'cv-analysis' | 'cv-comparison' | 'eye-tracking' | 'capital-theory' | 'ats-score' | 'market-signaling') => void;
  onPricingClick?: () => void;
}

export const GDPRCompliancePage: React.FC<Props> = ({ onBack, onNavigate, onPricingClick }) => {
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
            <h1 className="text-lg font-bold tracking-tight">GDPR Compliance</h1>
            <p className="text-xs text-slate-400">Your data protection rights</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-16">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <Scale className="w-16 h-16 mx-auto mb-6 text-indigo-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">GDPR Compliance</h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Your data protection rights under the General Data Protection Regulation
            </p>
            <p className="text-slate-400 mt-4">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 mb-8">
                CVIVID is committed to protecting your personal data in accordance with the General Data
                Protection Regulation (GDPR). This policy outlines your rights and our responsibilities
                regarding data protection.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Data Controller</h2>
              <div className="bg-slate-50 p-6 rounded-xl mb-8">
                <p className="text-slate-600"><strong>Company:</strong> CVIVID</p>
                <p className="text-slate-600 mt-2"><strong>Location:</strong> Kyiv, Ukraine</p>
                <p className="text-slate-600 mt-2">
                  <strong>Contact:</strong>{' '}
                  <a href="mailto:roman.zubariev@wiwi.digital" className="text-indigo-600 hover:text-indigo-700">
                    roman.zubariev@wiwi.digital
                  </a>
                </p>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Lawful Basis for Processing Personal Data</h2>
              <p className="text-slate-600 mb-4">We process your personal data under the following lawful bases:</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900">Consent</strong>
                    <p className="text-slate-600 text-sm mt-1">
                      For AI processing, email communications, analytics, and optional features where you have opted in.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900">Legitimate Interest</strong>
                    <p className="text-slate-600 text-sm mt-1">
                      For service improvement, fraud prevention, and security measures.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900">Legal Obligations</strong>
                    <p className="text-slate-600 text-sm mt-1">
                      To comply with applicable laws and regulations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <strong className="text-slate-900">Contract Performance</strong>
                    <p className="text-slate-600 text-sm mt-1">
                      To provide our CV analysis and career guidance services.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Your Data Protection Rights</h2>
              <p className="text-slate-600 mb-6">
                Under GDPR, you have the following rights regarding your personal data:
              </p>

              <div className="space-y-6 mb-8">
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-900">1. Right of Access</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Request copies of your personal data and information about how we process it.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-900">2. Right to Rectification</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Request correction of inaccurate or incomplete personal data.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-900">3. Right to Erasure</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Request deletion of your personal data in certain circumstances (also known as the "right to be forgotten").
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-900">4. Right to Restrict Processing</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Request limitation of processing in specific situations.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-900">5. Right to Data Portability</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Request transfer of your data to another service provider in a structured, commonly used format.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-900">6. Right to Object</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Object to processing based on legitimate interests or direct marketing.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-900">7. Right to Withdraw Consent</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Withdraw consent at any time where processing is based on consent.
                  </p>
                </div>

                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="text-lg font-semibold text-slate-900">8. Right to Complain</h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Lodge a complaint with your local data protection authority.
                  </p>
                </div>
              </div>

              <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 mb-8">
                <p className="text-slate-700">
                  <strong>To exercise your rights:</strong> Contact us at{' '}
                  <a href="mailto:roman.zubariev@wiwi.digital" className="text-indigo-600 hover:text-indigo-700">
                    roman.zubariev@wiwi.digital
                  </a>{' '}
                  with your request. We will respond within one month of receiving your request.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">AI Processing and Your Data</h2>
              <p className="text-slate-600 mb-4">
                CVIVID uses artificial intelligence technology to provide analysis and recommendations for
                your CV. Here's what you need to know about AI processing:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>AI processing is based on your explicit consent</li>
                <li>All AI-generated content is advisory and requires your review</li>
                <li>You can withdraw consent for AI processing at any time</li>
                <li>Your content is processed securely and in accordance with data protection laws</li>
                <li>We use Google's Gemini AI for document analysis</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Data Breach Notification</h2>
              <p className="text-slate-600 mb-4">
                In the event of a personal data breach that is likely to result in a high risk to your
                rights and freedoms:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>We will notify you within 72 hours of becoming aware of the breach</li>
                <li>The notification will include the nature of the breach and potential consequences</li>
                <li>We will provide information about steps taken to address the breach</li>
                <li>We will notify the relevant supervisory authority as required by law</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Children's Privacy Protection</h2>
              <p className="text-slate-600 mb-4">We take special care to protect children's privacy:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Our services are not directed at children under 16 years of age</li>
                <li>Users must be at least 16 years old to create an account</li>
                <li>If we become aware that we have collected data from a child under 16 without parental consent, we will delete such information</li>
                <li>Parents or guardians may contact us to request deletion of their child's data</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Data Retention</h2>
              <p className="text-slate-600 mb-4">
                We retain your personal data in accordance with our data retention policies:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Account data is retained while your account is active</li>
                <li>After account closure, personal data is deleted within a reasonable timeframe</li>
                <li>Some data may be retained for legal compliance or legitimate business purposes</li>
                <li>Anonymized data may be retained for research and service improvement</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">International Data Transfers</h2>
              <p className="text-slate-600 mb-4">
                When transferring personal data outside the UK/EEA, we ensure adequate protection through:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Adequacy decisions by the UK or European Commission</li>
                <li>Standard Contractual Clauses (SCCs)</li>
                <li>Other appropriate safeguards as required by law</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">Contact Information</h2>
              <div className="bg-slate-50 p-6 rounded-xl mb-6">
                <h3 className="font-semibold text-slate-900 mb-3">Data Protection Enquiries</h3>
                <p className="text-slate-600">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:roman.zubariev@wiwi.digital" className="text-indigo-600 hover:text-indigo-700">
                    roman.zubariev@wiwi.digital
                  </a>
                </p>
                <p className="text-slate-600 mt-2">
                  <strong>Address:</strong> Kyiv, Ukraine
                </p>
              </div>

              <div className="mt-12 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-slate-700 text-sm">
                  This GDPR Policy forms part of our comprehensive Terms of Service. For complete information
                  about our data processing practices, please refer to our{' '}
                  <button
                    onClick={() => onNavigate('privacy')}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Privacy Policy
                  </button>{' '}
                  and{' '}
                  <button
                    onClick={() => onNavigate('terms')}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Terms of Use
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
