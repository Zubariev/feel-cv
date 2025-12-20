import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Footer } from './Footer';

interface Props {
  onBack: () => void;
  onNavigate: (page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'ai-ethics') => void;
}

export const PrivacyPolicyPage: React.FC<Props> = ({ onBack, onNavigate }) => {
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
            <h1 className="text-lg font-bold tracking-tight">Privacy Policy</h1>
            <p className="text-xs text-slate-400">Your privacy matters to us</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-16">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-indigo-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-slate-300">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 mb-8">
                At CVSense, we take your privacy seriously. This Privacy Policy explains how we collect,
                use, disclose, and safeguard your information when you use our CV analysis service.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. Information We Collect</h2>

              <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">1.1 Personal Information</h3>
              <p className="text-slate-600 mb-4">When you create an account or use our services, we may collect:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Email address and account credentials</li>
                <li>CV/resume documents you upload for analysis</li>
                <li>Analysis results and history</li>
                <li>Payment information (processed securely by third-party payment providers)</li>
              </ul>

              <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">1.2 Automatically Collected Information</h3>
              <p className="text-slate-600 mb-4">We automatically collect certain information when you use our service:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Device information (browser type, operating system)</li>
                <li>IP address and general location data</li>
                <li>Usage data (pages visited, features used, time spent)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-600 mb-4">We use the collected information to:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Provide and maintain our CV analysis service</li>
                <li>Process your documents and generate analysis reports</li>
                <li>Store your analysis history for comparison features</li>
                <li>Communicate with you about your account and service updates</li>
                <li>Improve our services and develop new features</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. CV Document Processing</h2>
              <p className="text-slate-600 mb-4">
                Your CV documents are processed with the utmost care:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Documents are stored securely using industry-standard encryption</li>
                <li>AI analysis is performed to extract insights - we use Google's Gemini AI for processing</li>
                <li>We do not share your CV content with third parties for marketing purposes</li>
                <li>You can delete your documents and analysis data at any time</li>
                <li>We do not use your CV data to train AI models without explicit consent</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Data Storage and Security</h2>
              <p className="text-slate-600 mb-4">
                We implement appropriate security measures to protect your data:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>All data is encrypted in transit (TLS/SSL) and at rest</li>
                <li>We use Supabase for secure data storage with row-level security</li>
                <li>Access to user data is restricted to authorized personnel only</li>
                <li>Regular security audits and updates are performed</li>
                <li>Data is stored in secure cloud infrastructure</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Data Sharing and Disclosure</h2>
              <p className="text-slate-600 mb-4">
                We do not sell your personal information. We may share data only in these circumstances:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li><strong>Service Providers:</strong> Third-party services that help us operate (e.g., cloud hosting, payment processing)</li>
                <li><strong>AI Processing:</strong> Google's Gemini AI for document analysis (your content is processed according to Google's data policies)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">6. Your Rights and Choices</h2>
              <p className="text-slate-600 mb-4">You have the following rights regarding your data:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                <li><strong>Deletion:</strong> Request deletion of your data and account</li>
                <li><strong>Portability:</strong> Request your data in a portable format</li>
                <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              </ul>
              <p className="text-slate-600 mb-6">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:privacy@cvsense.com" className="text-indigo-600 hover:text-indigo-700">
                  privacy@cvsense.com
                </a>
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">7. Cookies and Tracking</h2>
              <p className="text-slate-600 mb-4">
                We use cookies and similar technologies for:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Authentication and session management</li>
                <li>Remembering your preferences</li>
                <li>Analytics to improve our service</li>
                <li>Security and fraud prevention</li>
              </ul>
              <p className="text-slate-600 mb-6">
                You can control cookies through your browser settings, though this may affect service functionality.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">8. Data Retention</h2>
              <p className="text-slate-600 mb-6">
                We retain your data for as long as your account is active or as needed to provide services.
                Analysis history is retained to enable the comparison feature. You can delete your data at any
                time through your account settings or by contacting us.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">9. International Data Transfers</h2>
              <p className="text-slate-600 mb-6">
                Your data may be processed in countries other than your own. We ensure appropriate safeguards
                are in place for international transfers, including standard contractual clauses where applicable.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">10. Children's Privacy</h2>
              <p className="text-slate-600 mb-6">
                Our service is not intended for users under 16 years of age. We do not knowingly collect
                personal information from children. If you believe we have collected data from a child,
                please contact us immediately.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">11. Changes to This Policy</h2>
              <p className="text-slate-600 mb-6">
                We may update this Privacy Policy from time to time. We will notify you of significant changes
                via email or through our service. Continued use after changes constitutes acceptance of the
                updated policy.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">12. Contact Us</h2>
              <p className="text-slate-600 mb-4">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-slate-50 p-6 rounded-xl">
                <p className="text-slate-600">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:privacy@cvsense.com" className="text-indigo-600 hover:text-indigo-700">
                    privacy@cvsense.com
                  </a>
                </p>
                <p className="text-slate-600 mt-2">
                  <strong>Address:</strong> Kyiv, Ukraine
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
