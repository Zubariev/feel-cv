import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

const SITE_NAME = 'CVIVID';
const SITE_URL = 'https://cvivid.space';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

export function SEOHead({
  title,
  description,
  path = '/',
  type = 'website',
  image = DEFAULT_IMAGE,
  publishedTime,
  modifiedTime,
  author = 'CVIVID Team',
  noindex = false,
}: SEOHeadProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Article specific (for blog posts) */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
    </Helmet>
  );
}

// Pre-defined SEO configs for each page
export const SEO_CONFIG = {
  home: {
    title: 'CVIVID - AI-Powered CV Analysis & Resume Optimization',
    description: 'Analyze your CV with AI-powered insights. Get eye-tracking heatmaps, capital theory analysis, ATS scores, and actionable feedback.',
    path: '/',
  },
  about: {
    title: 'About Us',
    description: 'Learn about CVIVID and our mission to help job seekers optimize their resumes using AI-powered analysis, behavioral science, and market signaling theory.',
    path: '/about',
  },
  contact: {
    title: 'Contact Us',
    description: 'Get in touch with the CVIVID team. We\'re here to help with questions about CV analysis, pricing, or technical support.',
    path: '/contact',
  },
  pricing: {
    title: 'Pricing',
    description: 'Choose the right CVIVID plan for your needs. From single CV analysis to unlimited monthly comparisons, find the perfect option for your job search.',
    path: '/pricing',
  },
  blog: {
    title: 'Blog',
    description: 'Expert insights on resume optimization, ATS systems, career development, and market signaling. Learn how to make your CV stand out.',
    path: '/blog',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'CVIVID Privacy Policy. Learn how we collect, use, and protect your personal data when you use our CV analysis service.',
    path: '/privacy',
  },
  terms: {
    title: 'Terms of Use',
    description: 'CVIVID Terms of Use. Read our terms and conditions for using the CV analysis platform and related services.',
    path: '/terms',
  },
  cookies: {
    title: 'Cookie Policy',
    description: 'CVIVID Cookie Policy. Understand how we use cookies and similar technologies on our website.',
    path: '/cookies',
  },
  gdpr: {
    title: 'GDPR Compliance',
    description: 'CVIVID GDPR Compliance. Learn about your rights under GDPR and how we handle your data as EU residents.',
    path: '/gdpr',
  },
  aiEthics: {
    title: 'AI Ethical Policy',
    description: 'CVIVID AI Ethical Policy. Our commitment to responsible AI use in CV analysis and how we ensure fairness and transparency.',
    path: '/ai-ethics',
  },
  features: {
    cvAnalysis: {
      title: 'CV Analysis',
      description: 'Deep AI analysis of your CV. Get detailed insights on structure, content, visual appeal, and market signaling strength.',
      path: '/features/cv-analysis',
    },
    cvComparison: {
      title: 'CV Comparison',
      description: 'Compare two CVs side-by-side. Understand improvements between versions or benchmark against industry standards.',
      path: '/features/comparison',
    },
    eyeTracking: {
      title: 'Eye-Tracking Heatmaps',
      description: 'See where recruiters look first on your CV with AI-predicted eye-tracking heatmaps based on visual saliency research.',
      path: '/features/eye-tracking',
    },
    capitalTheory: {
      title: 'Capital Theory Analysis',
      description: 'Analyze your CV through Bourdieu\'s capital theory lens. Understand your cultural, social, economic, and symbolic capital signals.',
      path: '/features/capital-theory',
    },
    atsScore: {
      title: 'ATS Compatibility Score',
      description: 'Check if your CV is ATS-friendly. Get scoring on format, keywords, and structure for better applicant tracking system compatibility.',
      path: '/features/ats-score',
    },
    marketSignaling: {
      title: 'Market Signaling Analysis',
      description: 'Measure how effectively your CV signals value to employers. Based on economic signaling theory and recruiter behavior research.',
      path: '/features/market-signaling',
    },
  },
} as const;
