import React from 'react';
import { ArrowLeft, Cookie } from 'lucide-react';
import { Footer } from './Footer';

interface Props {
  onBack: () => void;
  onNavigate: (page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'ai-ethics' | 'blog' | 'cv-analysis' | 'cv-comparison' | 'eye-tracking' | 'capital-theory' | 'ats-score' | 'market-signaling') => void;
  onPricingClick?: () => void;
}

export const CookiePolicyPage: React.FC<Props> = ({ onBack, onNavigate, onPricingClick }) => {
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
            <h1 className="text-lg font-bold tracking-tight">Cookie Policy</h1>
            <p className="text-xs text-slate-400">How we use cookies</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white py-16">
          <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
            <Cookie className="w-16 h-16 mx-auto mb-6 text-indigo-400" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-slate-300">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="prose prose-slate max-w-none">
              <p className="text-lg text-slate-600 mb-8">
                Understanding how CVIVID uses cookies to enhance your experience and protect your privacy.
                This Cookie Policy explains what cookies are, how we use them, and your choices regarding cookies.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">1. What Are Cookies?</h2>
              <p className="text-slate-600 mb-6">
                Cookies are small text files that are stored on your device when you visit a website. They help
                websites remember your preferences and improve your browsing experience. Cookies can be "session"
                cookies (deleted when you close your browser) or "persistent" cookies (remain on your device for
                a set period).
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">2. Cookie Usage and Agreement</h2>
              <p className="text-slate-600 mb-4">
                CVIVID uses cookies and similar tracking technologies on our platform in accordance with this
                Cookie Policy, which forms part of our Terms and Conditions.
              </p>
              <p className="text-slate-600 mb-6">
                By using our services, you acknowledge and agree to the use of cookies as described in this
                policy, subject to your consent preferences.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">3. How We Use Cookies</h2>
              <p className="text-slate-600 mb-4">Cookies are used for various purposes including:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li><strong>Essential Functionality:</strong> Ensuring the proper functioning of our platform and services</li>
                <li><strong>Preferences:</strong> Remembering your preferences and settings</li>
                <li><strong>Analytics:</strong> Analyzing usage patterns to improve our services</li>
                <li><strong>Personalization:</strong> Providing personalized content and recommendations</li>
                <li><strong>AI Support:</strong> Supporting the AI functionality of our platform</li>
                <li><strong>Security:</strong> Protecting against fraud and unauthorized access</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">4. Types of Cookies We Use</h2>

              <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">4.1 Essential Cookies</h3>
              <p className="text-slate-600 mb-4">
                These cookies are necessary for the website to function and cannot be switched off in our systems.
                They are usually only set in response to actions made by you, such as setting your privacy
                preferences, logging in, or filling in forms.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-slate-600">
                  <strong>Examples:</strong> Session cookies, authentication cookies, security cookies
                </p>
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">4.2 Performance Cookies</h3>
              <p className="text-slate-600 mb-4">
                These cookies allow us to count visits and traffic sources so we can measure and improve the
                performance of our site. They help us understand which pages are the most and least popular
                and see how visitors move around the site.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-slate-600">
                  <strong>Examples:</strong> Analytics cookies, load balancing cookies
                </p>
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mt-8 mb-3">4.3 Functional Cookies</h3>
              <p className="text-slate-600 mb-4">
                These cookies enable the website to provide enhanced functionality and personalization. They
                may be set by us or by third-party providers whose services we have added to our pages.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-slate-600">
                  <strong>Examples:</strong> Language preference cookies, theme preference cookies
                </p>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">5. Managing Cookie Preferences</h2>
              <p className="text-slate-600 mb-4">You may manage cookie preferences through:</p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li>Browser settings to block or delete cookies</li>
                <li>Cookie preference tools provided on our platform</li>
                <li>Opting out of non-essential cookies while maintaining access to core services</li>
              </ul>
              <p className="text-slate-600 mb-6">
                Please note that blocking some cookies may impact your experience on our site and the services
                we are able to offer.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">6. Third-Party Cookies</h2>
              <p className="text-slate-600 mb-4">
                We may use third-party services that set their own cookies. These include:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li><strong>Supabase:</strong> For authentication and database services</li>
                <li><strong>Google Gemini:</strong> For AI-powered analysis features</li>
                <li><strong>Analytics providers:</strong> To help us understand how you use our service</li>
              </ul>
              <p className="text-slate-600 mb-6">
                We do not control third-party cookies and recommend reviewing their respective privacy policies.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">7. Cookie Retention</h2>
              <p className="text-slate-600 mb-4">
                Different cookies have different retention periods:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 mb-6">
                <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain for a set period (typically 30 days to 2 years)</li>
                <li><strong>Authentication cookies:</strong> Expire based on your session settings</li>
              </ul>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">8. Policy Updates</h2>
              <p className="text-slate-600 mb-6">
                We may update this Cookie Policy from time to time to reflect changes in our practices or for
                other operational, legal, or regulatory reasons. Continued use of our services after such
                updates constitutes acceptance of the revised policy.
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-4">9. Contact Us</h2>
              <p className="text-slate-600 mb-4">
                If you have questions about our use of cookies, please contact us:
              </p>
              <div className="bg-slate-50 p-6 rounded-xl">
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
                  This Cookie Policy forms part of our comprehensive Terms and Conditions. For complete
                  information about our data practices, please refer to our{' '}
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
