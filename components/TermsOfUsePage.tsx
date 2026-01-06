import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { Footer } from './Footer';

interface Props {
  onBack: () => void;
  onNavigate: (page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'ai-ethics' | 'blog' | 'cv-analysis' | 'cv-comparison' | 'eye-tracking' | 'capital-theory' | 'ats-score' | 'market-signaling') => void;
}

export const TermsOfUsePage: React.FC<Props> = ({ onBack, onNavigate }) => {
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
            <h1 className="text-lg font-bold tracking-tight">Terms of Use</h1>
            <p className="text-xs text-slate-400">Please read carefully</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-16">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <FileText className="w-16 h-16 mx-auto mb-6 text-indigo-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Use</h1>
            <p className="text-slate-300">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 mb-8">
                Welcome to CVSense. By accessing or using our service, you agree to be bound by these
                Terms of Use. Please read them carefully before using our CV analysis platform.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-600 mb-6">
                By creating an account or using CVSense, you acknowledge that you have read, understood,
                and agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree
                to these terms, please do not use our service.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. Description of Service</h2>
              <p className="text-slate-600 mb-4">
                CVSense provides an AI-powered CV analysis service that:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Analyzes uploaded CV documents using artificial intelligence</li>
                <li>Provides insights based on Bourdieu's capital theory framework</li>
                <li>Offers visual analysis and saliency mapping</li>
                <li>Enables comparison between different versions of your CV</li>
                <li>Stores analysis history for future reference</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. User Accounts</h2>

              <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">3.1 Account Creation</h3>
              <p className="text-slate-600 mb-4">
                To use certain features of CVSense, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Promptly update any changes to your information</li>
                <li>Accept responsibility for all activities under your account</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">3.2 Account Termination</h3>
              <p className="text-slate-600 mb-6">
                We reserve the right to suspend or terminate your account if you violate these terms
                or engage in fraudulent, abusive, or illegal activities.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Acceptable Use</h2>
              <p className="text-slate-600 mb-4">You agree NOT to:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Upload documents containing illegal, harmful, or offensive content</li>
                <li>Upload documents that belong to others without their consent</li>
                <li>Attempt to reverse engineer, decompile, or hack our service</li>
                <li>Use automated systems to access our service without permission</li>
                <li>Interfere with or disrupt the service or servers</li>
                <li>Resell or redistribute our service without authorization</li>
                <li>Use the service for any unlawful purpose</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Content and Intellectual Property</h2>

              <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">5.1 Your Content</h3>
              <p className="text-slate-600 mb-6">
                You retain ownership of the CVs and documents you upload. By uploading content, you grant
                us a limited license to process, analyze, and store your documents solely for providing
                our service to you.
              </p>

              <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">5.2 Our Content</h3>
              <p className="text-slate-600 mb-6">
                The CVSense platform, including its design, features, analysis methodology, and branding,
                is our intellectual property. You may not copy, modify, or distribute any part of our
                service without written permission.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">6. Subscription and Payments</h2>

              <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">6.1 Subscription Plans</h3>
              <p className="text-slate-600 mb-4">
                CVSense offers various subscription plans with different features and usage limits.
                Plan details, including pricing and features, are available on our website.
              </p>

              <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">6.2 Billing</h3>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Subscriptions are billed according to the chosen billing cycle</li>
                <li>Payments are processed securely through our payment providers</li>
                <li>You agree to pay all applicable fees and taxes</li>
                <li>Prices may change with reasonable notice</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">6.3 Refunds</h3>
              <p className="text-slate-600 mb-6">
                Refund requests are handled on a case-by-case basis. Please contact our support team
                if you have concerns about a charge.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">7. Disclaimer of Warranties</h2>
              <p className="text-slate-600 mb-4">
                CVSense is provided "as is" and "as available" without warranties of any kind, either
                express or implied, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Merchantability or fitness for a particular purpose</li>
                <li>Accuracy, reliability, or completeness of analysis results</li>
                <li>Uninterrupted or error-free service</li>
                <li>Employment outcomes based on our analysis</li>
              </ul>
              <p className="text-slate-600 mb-6">
                Our analysis is intended as a tool for self-improvement and does not guarantee
                job offers, interviews, or career success.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">8. Limitation of Liability</h2>
              <p className="text-slate-600 mb-6">
                To the maximum extent permitted by law, CVSense and its affiliates shall not be liable
                for any indirect, incidental, special, consequential, or punitive damages, including
                loss of profits, data, or business opportunities, arising from your use of our service.
              </p>
              <p className="text-slate-600 mb-6">
                Our total liability shall not exceed the amount you paid for the service in the
                12 months preceding the claim.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">9. Indemnification</h2>
              <p className="text-slate-600 mb-6">
                You agree to indemnify and hold harmless CVSense, its officers, directors, employees,
                and agents from any claims, damages, losses, or expenses arising from your use of
                the service or violation of these terms.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">10. Third-Party Services</h2>
              <p className="text-slate-600 mb-6">
                Our service integrates with third-party services (e.g., AI providers, payment processors).
                Your use of these services is subject to their respective terms and policies. We are not
                responsible for third-party service availability or actions.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">11. Modifications to Terms</h2>
              <p className="text-slate-600 mb-6">
                We may modify these Terms of Use at any time. Material changes will be communicated
                via email or through our service. Continued use after changes constitutes acceptance
                of the updated terms.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">12. Governing Law</h2>
              <p className="text-slate-600 mb-6">
                These Terms of Use shall be governed by and construed in accordance with the laws of
                Ukraine. Any disputes shall be resolved in the courts of Kyiv, Ukraine.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">13. Severability</h2>
              <p className="text-slate-600 mb-6">
                If any provision of these terms is found to be unenforceable, the remaining provisions
                shall continue in full force and effect.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">14. Contact Information</h2>
              <p className="text-slate-600 mb-4">
                If you have questions about these Terms of Use, please contact us:
              </p>
              <div className="bg-slate-50 p-6 rounded-xl">
                <p className="text-slate-600">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:legal@cvsense.com" className="text-indigo-600 hover:text-indigo-700">
                    legal@cvsense.com
                  </a>
                </p>
                <p className="text-slate-600 mt-2">
                  <strong>Address:</strong> Kyiv, Ukraine
                </p>
              </div>

              <div className="mt-12 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                <p className="text-slate-700 text-sm">
                  <strong>By using CVSense, you acknowledge that you have read, understood, and agree
                  to these Terms of Use.</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
