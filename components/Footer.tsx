import React, { useEffect, useRef } from 'react';
import {
  BrainCircuit,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Instagram
} from 'lucide-react';

interface Props {
  onNavigate: (page: 'about' | 'contact' | 'privacy' | 'terms' | 'cookies' | 'gdpr' | 'ai-ethics' | 'blog' | 'cv-analysis' | 'cv-comparison' | 'eye-tracking' | 'capital-theory' | 'ats-score' | 'market-signaling') => void;
  onPricingClick?: () => void;
}

export const Footer: React.FC<Props> = ({ onNavigate, onPricingClick }) => {
  const currentYear = new Date().getFullYear();
  const trustboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load TrustBox widget after component mounts
    if (trustboxRef.current && (window as any).Trustpilot) {
      (window as any).Trustpilot.loadFromElement(trustboxRef.current, true);
    }
  }, []);

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-500 p-2 rounded-lg">
                <BrainCircuit className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">CVIVID</span>
            </div>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              AI-powered CV analysis using Bourdieu's capital theory and visual signal extraction.
              Understand your professional value and market positioning.
            </p>
            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-indigo-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={onPricingClick}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('cv-analysis')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  CV Analysis
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cv-comparison')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  CV Comparison
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('eye-tracking')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  Eye-Tracking Heatmaps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('capital-theory')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  Capital Theory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ats-score')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  ATS Compatibility
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('market-signaling')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  Market Signaling
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('cookies')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gdpr')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  GDPR Compliance
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('ai-ethics')}
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  AI Ethical Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <a
                  href="mailto:roman.zubariev@wiwi.digital"
                  className="text-sm text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  roman.zubariev@wiwi.digital
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-400">
                  Kyiv, Ukraine
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>

        {/* TrustBox widget */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div
            ref={trustboxRef}
            className="trustpilot-widget"
            data-locale="en-US"
            data-template-id="56278e9abfbbba0bdcd568bc"
            data-businessunit-id="6984a851c5b7f0ff5cd3e86b"
            data-style-height="52px"
            data-style-width="100%"
            data-token="6ee1bcd4-756c-4536-b45e-1135f5104dc3"
          >
            <a href="https://www.trustpilot.com/review/cvivid.space" target="_blank" rel="noopener noreferrer">Trustpilot</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-500">
              &copy; {currentYear} CVIVID. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => onNavigate('privacy')}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Privacy
              </button>
              <button
                onClick={() => onNavigate('terms')}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Terms
              </button>
              <span className="text-xs text-slate-500">
                Made with care in Ukraine
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
