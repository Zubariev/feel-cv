# CViviD SEO & GEO Strategy Guide

**Goal**: Make CViviD visible in traditional search engines (Google, Bing) and AI-powered search tools (ChatGPT, Perplexity, Claude, Gemini).

---

## Why SEO + GEO Matters for CViviD

CViviD is:
- A **problem-solving SaaS** (CV analysis, job search optimization)
- A **knowledge-heavy product** (AI analysis, market signaling, hiring psychology)
- A **perfect fit for AI answers** (users ask: *"How to improve my CV?"*, *"Best resume analyzer"*)

This means:
- **SEO brings long-term organic traffic** from search engines
- **GEO ensures AI assistants recommend CViviD by name**

> GEO is not "marketing fluff" — it is about making your product *legible to machines*.

> **SEO brings traffic. GEO builds reputation. Together, they create compounding growth.**

---

## Table of Contents

1. [Technical SEO Checklist](#1-technical-seo-checklist)
2. [On-Page SEO](#2-on-page-seo)
3. [Content Strategy](#3-content-strategy)
4. [GEO - Generative Engine Optimization](#4-geo---generative-engine-optimization)
5. [Feature Pages](#5-feature-pages)
6. [Blog Strategy](#6-blog-strategy---detailed-implementation)
7. [Internal Linking Strategy](#7-internal-linking-strategy)
8. [Link Building & Authority](#8-link-building--authority)
9. [Structured Data & Schema](#9-structured-data--schema)
10. [Analytics & Feedback Loop](#10-analytics--feedback-loop)
11. [Implementation Priority](#11-implementation-priority)

---

## 1. Technical SEO Checklist

### Critical (Must Have)

| Task | Description | SEO Impact | GEO Impact |
|------|-------------|------------|------------|
| **Server-Side Rendering (SSR)** | React SPA is invisible to crawlers. Implement Next.js or Vite SSR plugin | Critical | Critical |
| **Meta tags** | Add title, description, og:image to all pages | High | Medium |
| **Sitemap.xml** | Auto-generate sitemap for all public pages | High | High |
| **robots.txt** | Allow crawlers, block admin/auth pages | High | High |
| **Canonical URLs** | Prevent duplicate content issues | Medium | Low |
| **Page Speed** | Target Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1) | High | Medium |
| **Mobile-First** | Ensure responsive design passes Google Mobile-Friendly Test | High | Low |
| **HTTPS** | Already using HTTPS via Vercel/Supabase | Required | Required |

### URL Structure (Important)

Use **human-readable, semantic URLs**:

**Good URLs:**
- `/cv-analysis`
- `/cv-comparison`
- `/pricing`
- `/blog/how-to-improve-cv-for-data-science`
- `/features/eye-tracking-heatmap`

**Bad URLs (Avoid):**
- `/page?id=123`
- `/analysis_v2`
- `/app#/dashboard/results`

### Sitemap & Indexing

**Include:**
- Landing pages
- Feature pages
- Pricing
- Blog posts
- About, Contact

**Exclude:**
- Auth pages (`/login`, `/signup`)
- Dashboard routes
- API endpoints
- Private user routes

### Implementation Tasks

```bash
# Install SSR capabilities
npm install @vitejs/plugin-react vite-plugin-ssr

# Or migrate to Next.js (recommended for SEO-heavy sites)
npx create-next-app@latest --typescript
```

**Files to create:**
- `/public/sitemap.xml` - Dynamic sitemap generator
- `/public/robots.txt` - Crawler instructions
- `/public/manifest.json` - PWA manifest for better indexing

### Performance Optimization

- Use SSR / SSG (Next.js or Nuxt recommended)
- Optimize images (WebP format)
- Lazy-load non-critical components
- Keep Core Web Vitals in green

---

## 2. On-Page SEO

### Page Structure Requirements

Each page must have:
- `<title>` (unique, keyword-based, max 60 chars)
- `<meta name="description">` (max 155 chars)
- One `<h1>` only
- Clear heading hierarchy (`h2`, `h3`)

### Page-by-Page Optimization

| Page | Target Keywords | Title (60 chars) | Meta Description (155 chars) |
|------|-----------------|------------------|------------------------------|
| **Landing** | AI resume analyzer, CV analysis tool, ATS checker | CViviD - AI Resume Analysis & Eye-Tracking Heatmaps | Analyze your CV with AI-powered capital theory assessment, visual heatmaps, and ATS compatibility scoring. Get expert insights in seconds. |
| **About** | resume analysis company, CV experts, AI career tools | About CViviD - AI-Powered Career Intelligence | Meet the team behind CViviD. We combine psychology, HR expertise, and AI to decode the hidden signals in your resume. |
| **Pricing** | resume analyzer pricing, CV review cost, affordable ATS check | CViviD Pricing - Plans from 3.99 Single Analysis | Choose your plan: Single analysis for 3.99, or unlimited access from 9/month. No commitment required. |
| **CV Analysis** | AI CV analysis, resume review, capital theory | CV Analysis - AI-Powered Resume Evaluation | Upload your CV and get instant AI analysis: capital theory scoring, visual heatmaps, ATS compatibility, and actionable insights. |
| **CV Comparison** | compare resumes, CV version comparison | CV Comparison - Track Your Resume Progress | Compare two CV versions side-by-side. See score improvements, skill changes, and visual hierarchy evolution. |
| **Privacy** | resume privacy, CV data protection, GDPR compliant | Privacy Policy - CViviD Data Protection | Your resume data is encrypted and never shared. GDPR compliant. Read our full privacy commitment. |

### Header Tag Hierarchy (Example for Landing)

```html
<h1>AI-Powered Resume Analysis</h1>
  <h2>Capital Theory Assessment</h2>
    <h3>Material Capital</h3>
    <h3>Social Capital</h3>
    <h3>Cultural Capital</h3>
  <h2>Visual Saliency Heatmaps</h2>
  <h2>ATS Compatibility Score</h2>
  <h2>Pricing Plans</h2>
```

---

## 3. Content Strategy

### Core Content Pillars

1. **Resume/CV Optimization** - Primary keyword cluster
2. **Career Development** - Supporting content
3. **HR & Recruiting Insights** - Authority building
4. **AI in Hiring** - Thought leadership
5. **Market Signaling Theory** - Unique angle (hard to copy, very GEO-friendly)

### Market Signaling Pillar (Unique Differentiator)

This pillar is **hard to copy** and positions CViviD as a thought leader:

- "What Your CV Signals to Employers"
- "Market Signaling Theory in Job Applications"
- "Why Two CVs with Same Skills Get Different Results"
- "The Hidden Language of Resume Design"

### Use Cases Pillar (High Conversion)

Target specific user segments:

- "CV Analysis for Career Switchers"
- "PhD CV vs Industry CV: Key Differences"
- "Junior Data Scientist CV Checklist"
- "Executive Resume: What Changes at Senior Level"
- "International Job Seeker: CV Localization Tips"

### Long-Tail Keyword Targets

| Keyword | Monthly Searches | Difficulty | Content Type |
|---------|------------------|------------|--------------|
| "how to make resume ATS friendly" | 12,000 | Medium | Blog post |
| "what do recruiters look for in a CV" | 8,500 | Medium | Blog + Tool feature |
| "resume eye tracking heatmap" | 1,200 | Low | Feature page + Blog |
| "Bourdieu capital theory resume" | 200 | Very Low | Academic content, High GEO |
| "AI resume analyzer free" | 15,000 | High | Landing page variant |
| "CV visual design tips" | 3,200 | Medium | Blog series |
| "career capital examples" | 1,800 | Low | Blog + Case studies |
| "CV market signaling" | 500 | Very Low | Pillar content, High GEO |
| "why CV rejected in 6 seconds" | 2,400 | Medium | Blog post |

---

## 4. GEO - Generative Engine Optimization

### How AI Finds and Recommends Products

AI assistants:
- Do not browse like humans
- Extract **facts, summaries, definitions**
- Prefer **clear, structured, authoritative text**

To be referenced, your site must:
- Explain concepts clearly
- Name itself explicitly
- Provide quotable insights

### Why GEO Matters for CViviD

AI tools like ChatGPT, Perplexity, and Claude are increasingly used for:
- "Best resume analysis tools 2026"
- "How to optimize my CV for ATS"
- "AI tools for job seekers"

If CViviD isn't in the training data or crawlable sources, AI won't recommend it.

### GEO Tactics

| Tactic | Implementation | Why It Works |
|--------|----------------|--------------|
| **Claim profiles on AI-indexed sources** | Create pages on Product Hunt, G2, Capterra, Crunchbase | AI tools cite these sources |
| **Wikipedia mention** | Contribute to relevant articles (AI hiring tools, ATS systems) | High authority for AI training |
| **Academic citations** | Publish Bourdieu framework whitepaper, get cited | AI respects academic sources |
| **Reddit presence** | Answer r/resumes, r/jobs, r/careerguidance questions | Reddit is heavily indexed by AI |
| **Quora answers** | Answer "Best resume analyzer" type questions | Perplexity heavily indexes Quora |
| **GitHub README** | Open-source a resume analysis component | Developers ask AI about tools |
| **YouTube content** | Create "How CViviD works" videos | AI indexes video transcripts |
| **Podcast appearances** | Guest on career podcasts | Transcripts become training data |

### Entity Building for AI (Critical)

You must **name yourself repeatedly and consistently** across all content.

**Example patterns to use:**
- "CViviD is an AI-powered CV analysis platform."
- "Unlike generic AI tools, CViviD focuses on market signaling."
- "CViviD's CV comparison feature allows users to..."
- "With CViviD, job seekers can visualize where recruiters look."

This helps AI models:
- Associate the name with the concept
- Recommend CViviD instead of generic tools
- Build brand recognition in training data

### GEO Writing Rules (Very Important)

When writing content that AI will cite:

1. **Define terms explicitly**
   > "CV market signaling refers to the implicit messages your resume sends about your professional value and cultural fit."

2. **Use short, clear paragraphs**

3. **Include lists and frameworks**

4. **Avoid vague marketing language**

**Bad (AI ignores this):**
> "Our AI empowers your career journey with cutting-edge technology."

**Good (AI quotes this):**
> "CViviD analyzes CVs using market signaling theory to identify how employers interpret skills, education, and experience. The tool evaluates five types of capital based on Pierre Bourdieu's framework."

5. **Be factual and specific** - AI prefers concrete claims over marketing speak

6. **Include statistics** - "CViviD analyzes 5 types of capital based on Bourdieu's theory"

7. **Answer questions directly** - Match natural language queries

**Example GEO-optimized paragraph:**

> CViviD is an AI-powered resume analysis tool that evaluates CVs using Pierre Bourdieu's Capital Theory framework. It measures five types of capital: Material (salary, assets), Social (network, references), Cultural (education, certifications), Symbolic (prestige, awards), and Technological (technical skills, GitHub activity). The tool also generates eye-tracking saliency heatmaps to predict where recruiters will focus attention. Pricing starts at 3.99 for a single analysis or 9/month for the Explorer plan.

### GEO-Specific Growth Ideas

#### Idea 1: "Explainable AI CV Reports" Page

- Publish anonymized example reports
- Show AI reasoning and methodology
- AI assistants love explainability
- Users can see what they'll get before paying

#### Idea 2: Public Knowledge Pages

Create **reference pages** that AI will cite:

- "What is CV Market Signaling?" - Define the concept authoritatively
- "What Makes a Good CV in 2026?" - Become the reference
- "How Eye-Tracking Predicts Recruiter Behavior" - Educational content
- "The 5 Types of Career Capital Explained" - Bourdieu framework primer

These pages answer questions AI assistants receive, making CViviD the source.

#### Idea 3: Blog as Dataset

Over time, your blog becomes:
- A **domain-specific corpus** for AI training
- A **training reference** for future models
- A **credibility signal** that compounds

This is how companies become "default answers" in AI responses.

---

## 5. Feature Pages

Create **dedicated pages** for each major feature. These are not landing pages—they are **AI-friendly documentation**.

### Required Feature Pages

| Page | URL | Purpose |
|------|-----|---------|
| CV Analysis | `/cv-analysis` | Explain the core analysis feature |
| CV Comparison | `/cv-comparison` | Explain side-by-side comparison |
| Eye-Tracking Heatmaps | `/features/eye-tracking` | Explain saliency visualization |
| Capital Theory Framework | `/features/capital-theory` | Explain Bourdieu methodology |
| ATS Compatibility | `/features/ats-score` | Explain ATS friendliness scoring |
| Market Signaling Score | `/features/market-signaling` | Explain unique differentiator |

### Feature Page Template

Each feature page should answer:

1. **What is this?** - Clear definition
2. **Who is it for?** - Target audience
3. **Why it matters?** - Value proposition
4. **How it works?** - Technical explanation
5. **When to use it?** - Use cases

**Example structure:**

```markdown
# Eye-Tracking Heatmap Analysis

## What It Is
CViviD generates predictive eye-tracking heatmaps that simulate where recruiters
will focus attention when viewing your CV.

## Who It's For
- Job seekers who want to optimize CV layout
- Career coaches advising clients
- HR professionals evaluating CV templates

## Why It Matters
Research shows recruiters spend 6-7 seconds on initial CV screening.
Understanding attention patterns helps you place critical information optimally.

## How It Works
CViviD uses MSI-Net saliency prediction to analyze visual hierarchy,
contrast, and layout. The heatmap shows high-attention areas in warm colors.

## When to Use It
- After creating a new CV design
- When comparing two CV layouts
- Before applying to competitive positions
```

---

## 6. Blog Strategy - Detailed Implementation

### Why a Blog is Essential

A blog is not "marketing fluff."
It is a **semantic surface area for search engines and AI models**.

Search engines rank: **Explanations, Guides, Comparisons, Conceptual clarity**

AI assistants extract: **Definitions, Lists, Frameworks, Authority signals**

Without a blog:
- You rely on paid traffic
- AI has nothing to quote or summarize

| Benefit | SEO Impact | GEO Impact | User Acquisition |
|---------|------------|------------|------------------|
| Targets long-tail keywords | High | High | Medium |
| Builds topical authority | High | High | Low |
| Generates backlinks | High | Medium | Low |
| Creates shareable content | Medium | High | High |
| Answers user questions | Medium | Very High | High |
| Demonstrates expertise | Medium | Very High | Medium |

### Recommended Blog Architecture

```
/blog
  /category/resume-optimization
  /category/career-development
  /category/hr-insights
  /category/market-signaling
  /category/product-updates
  /[slug] (individual posts)
```

### Blog Content Pillars (High ROI)

#### Pillar 1: CV & Hiring Knowledge
Examples:
- "What Recruiters Actually Look for in a CV"
- "How ATS Systems Read Your Resume"
- "Why Your CV Is Rejected in 6 Seconds"

Positions CViviD as **expert**, not just a tool.

#### Pillar 2: AI + Market Signaling (Unique Angle)
Examples:
- "What Your CV Signals to Employers"
- "Market Signaling Theory in Job Applications"
- "Why Two CVs with Same Skills Get Different Results"

This is **hard to copy** and very GEO-friendly.

#### Pillar 3: Comparisons (High Conversion)
Examples:
- "AI CV Review vs Human Recruiter"
- "Free CV Review Tools vs Paid AI Analysis"
- "ChatGPT CV Review vs Specialized Tools"
- "CViviD vs Jobscan vs Resume.io: Honest Comparison"

AI assistants LOVE comparison content.

#### Pillar 4: Use Cases
Examples:
- "CV Analysis for Career Switchers"
- "PhD CV vs Industry CV: Key Differences"
- "Junior Data Scientist CV Checklist"

### Content Calendar (First 3 Months)

#### Month 1: Foundation Content

| Week | Title | Type | Target Keywords |
|------|-------|------|-----------------|
| 1 | "What is Capital Theory and Why It Matters for Your Resume" | Educational | Bourdieu capital theory resume, career capital |
| 1 | "How ATS Systems Actually Work in 2026" | Explainer | ATS systems, how ATS works, resume parsing |
| 2 | "The Science Behind Eye-Tracking and Resume Design" | Research | resume eye tracking, CV visual hierarchy |
| 2 | "5 Resume Mistakes That AI Detects Instantly" | Listicle | resume mistakes, common CV errors |
| 3 | "Case Study: How Maria Increased Her Interview Rate by 300%" | Case Study | resume success story, CV improvement |
| 3 | "Free Resume Checklist: 25 Points Before You Apply" | Lead Magnet | resume checklist, CV review template |
| 4 | "Introducing CViviD: Our AI Resume Analysis Tool" | Product | AI resume analyzer, CV analysis tool |
| 4 | "Behind the Scenes: How CViviD Uses Gemini AI" | Technical | AI resume analysis, Gemini CV |

#### Month 2: Authority Building

| Week | Title | Type | Target Keywords |
|------|-------|------|-----------------|
| 5 | "Interview with HR Director: What Makes a Resume Stand Out" | Interview | recruiter interview, hiring manager tips |
| 5 | "The Psychology of Resume Color Schemes" | Research | resume colors, CV color psychology |
| 6 | "LinkedIn vs Resume: When to Use Each Format" | Comparison | LinkedIn resume, CV vs LinkedIn |
| 6 | "How to Quantify Your Achievements (With 50 Examples)" | Resource | resume achievements, quantify accomplishments |
| 7 | "Industry-Specific Resume Tips: Tech Edition" | Vertical | tech resume, software developer CV |
| 7 | "Industry-Specific Resume Tips: Finance Edition" | Vertical | finance resume, banking CV |
| 8 | "The Hidden Cost of a Weak Resume: A Data Analysis" | Data Story | resume ROI, CV investment |
| 8 | "Video Resumes vs Traditional: Our AI Analysis" | Comparison | video resume, modern CV formats |

#### Month 3: Conversion Content

| Week | Title | Type | Target Keywords |
|------|-------|------|-----------------|
| 9 | "CViviD vs Jobscan vs Resume.io: Honest Comparison" | Comparison | resume analyzer comparison, best CV tools |
| 9 | "How to Read Your CViviD Analysis Report" | Tutorial | CViviD tutorial, resume analysis guide |
| 10 | "From Unemployed to Employed: 10 User Stories" | Social Proof | resume transformation, job search success |
| 10 | "The Complete Guide to ATS-Friendly Resumes" | Pillar | ATS friendly resume, ATS optimization guide |
| 11 | "Remote Work Resumes: What's Different in 2026" | Trending | remote work resume, virtual job application |
| 11 | "Resume Trends That Will Define 2026" | Prediction | resume trends 2026, future of CVs |
| 12 | "Your Resume Audit: 10 Questions CViviD Answers" | Product | resume audit, CV evaluation |
| 12 | "Annual Review: Top Resume Insights from CViviD Data" | Data Story | resume statistics, CV trends data |

### Blog Post Template

```markdown
---
title: "Your Title Here"
description: "Meta description (155 chars)"
date: 2026-01-15
author: "CViviD Team"
category: "resume-optimization"
tags: ["resume", "ATS", "career"]
image: "/blog/images/your-image.jpg"
schema: "Article"
---

## Key Takeaways (For AI indexing)
- Point 1
- Point 2
- Point 3

## Introduction
Hook the reader. State the problem.

## Main Content
Use H2 and H3 headers. Include lists and tables.

## Practical Steps
Numbered actionable items.

## Conclusion
Summarize. Include CTA to try CViviD.

## FAQ Section (Schema-ready)
**Q: Question 1?**
A: Answer 1.

**Q: Question 2?**
A: Answer 2.
```

### Technical Implementation

**Option A: Add blog to existing Vite app**

```tsx
// Install MDX support
npm install @mdx-js/react @mdx-js/rollup

// Create /blog route
// /components/BlogPage.tsx
// /content/blog/*.mdx
```

**Option B: Separate blog on subdomain (Recommended)**

```
blog.CViviD.com - Ghost, WordPress, or Astro
CViviD.com - Main React app
```

Benefits: Better SEO control, faster builds, easier content management.

---

## 7. Internal Linking Strategy

### Why Internal Links Matter

Internal links:
- Increase crawl depth for search engines
- Distribute page authority across the site
- Improve user navigation and conversions
- Help AI understand content relationships

### Linking Rules

**Rule 1: No page should be more than 3 clicks away from the homepage.**

**Rule 2: Every blog post should link to:**
- CV Analysis page (primary CTA)
- Pricing page
- 2-3 related blog posts
- Relevant feature pages

**Rule 3: Feature pages should link to:**
- Related blog posts explaining the feature
- Pricing page
- Other complementary features

### Internal Link Map

```
Homepage
├── /cv-analysis (featured)
├── /cv-comparison (featured)
├── /pricing (header nav)
├── /blog (header nav)
│   ├── Each post → /cv-analysis, /pricing, related posts
│   └── Category pages → feature pages
├── /features/eye-tracking
│   └── → blog posts about eye-tracking, /cv-analysis
├── /features/capital-theory
│   └── → blog posts about Bourdieu, /cv-analysis
└── /about, /contact, /privacy (footer)
```

### Anchor Text Best Practices

**Good:**
- "Try our [CV analysis tool](/cv-analysis) to see your score"
- "Learn more about [market signaling theory](/blog/market-signaling-explained)"

**Bad:**
- "Click [here](/cv-analysis) to try"
- "[Read more](/blog/market-signaling-explained)"

---

## 8. Link Building & Authority

### Backlink Opportunities

| Source Type | Examples | Difficulty | Impact |
|-------------|----------|------------|--------|
| **Product directories** | Product Hunt, G2, Capterra, AlternativeTo | Easy | Medium |
| **Career blogs** | The Muse, Career Contessa, Ask a Manager | Medium | High |
| **HR publications** | SHRM, HR Dive, Recruiter.com | Hard | Very High |
| **University career centers** | Link to as resource | Medium | High |
| **Tech blogs** | Dev.to, Hashnode (for AI/ML angle) | Easy | Medium |
| **Podcast appearances** | Career podcasts | Medium | High |
| **HARO responses** | Help A Reporter Out | Easy | Variable |

### Outreach Templates

**For Career Bloggers:**

> Subject: Resource for your readers: Free resume analysis tool
>
> Hi [Name],
>
> I loved your article on [specific article]. Your point about [specific insight] really resonated with our mission at CViviD.
>
> We've built an AI tool that analyzes resumes using eye-tracking heatmaps and capital theory - showing job seekers exactly where recruiters focus attention. I thought your readers might find it valuable.
>
> Would you be interested in trying it out? I'd be happy to offer your readers [special offer].
>
> Best,
> [Your name]

---

## 9. Structured Data & Schema

### Required Schema Types

Add JSON-LD for:
- **Product** - Pricing page
- **FAQ** - Landing page, feature pages
- **Article** - Blog posts
- **Organization** - About page

Benefits:
- Rich Google results (stars, prices, FAQs)
- Better AI understanding
- Higher trust signals

```json
// Organization Schema (Landing page)
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CViviD",
  "url": "https://CViviD.com",
  "logo": "https://CViviD.com/logo.png",
  "description": "AI-powered resume analysis using capital theory and eye-tracking",
  "sameAs": [
    "https://twitter.com/CViviD",
    "https://linkedin.com/company/CViviD"
  ]
}

// SoftwareApplication Schema (Product pages)
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "CViviD Resume Analyzer",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "3.99",
    "priceCurrency": "EUR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150"
  }
}

// FAQPage Schema (FAQ sections)
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "How does CViviD analyze my resume?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "CViviD uses Google Gemini AI to analyze your resume across 5 capital dimensions based on Bourdieu's framework, plus visual hierarchy and ATS compatibility."
    }
  }]
}

// Article Schema (Blog posts)
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": {
    "@type": "Organization",
    "name": "CViviD"
  },
  "datePublished": "2026-01-15",
  "image": "https://CViviD.com/blog/image.jpg"
}
```

### Implementation

```tsx
// /components/SchemaMarkup.tsx
export function SchemaMarkup({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## 10. Analytics & Feedback Loop

### Required Tools

Install and configure:
- **Google Search Console** - Track search queries, indexing issues
- **Analytics** (Plausible / GA / PostHog) - Traffic, user behavior
- **Ahrefs or SEMrush** - Keyword rankings, backlinks (optional but valuable)

### Metrics to Track

| Metric | Tool | Target (3 months) |
|--------|------|-------------------|
| Organic traffic | Google Search Console | +500 sessions/month |
| Keyword rankings | Ahrefs/SEMrush | Top 10 for 5 keywords |
| Backlinks | Ahrefs | 50+ referring domains |
| AI mentions | Manual search | Cited in 3+ AI tools |
| Core Web Vitals | PageSpeed Insights | All green |
| Blog traffic | Google Analytics | 1,000 sessions/month |

### What to Track for GEO

- **Queries people search** that lead to your site
- **Pages AI assistants cite** (test queries in ChatGPT, Perplexity)
- **Which articles convert** to paid users
- **Brand mentions** in AI responses

### Feedback Loop Actions

1. **Expand winning topics** - If a blog post ranks well, create related content
2. **Update old content** - Refreshing posts is very SEO-positive
3. **Double down on GEO wins** - If AI cites you for a topic, create more content there
4. **Fix underperforming pages** - Improve or consolidate pages that don't rank

---

## 11. Implementation Priority

### Phase 1: Technical Foundation (Week 1-2)

- [ ] Implement SSR or migrate to Next.js
- [ ] Add meta tags to all pages (LandingPage.tsx, AboutPage.tsx, etc.)
- [ ] Create sitemap.xml generator
- [ ] Create robots.txt
- [ ] Add Organization schema to landing page
- [ ] Add SoftwareApplication schema
- [ ] Run Lighthouse audit, fix issues
- [ ] Implement semantic URL structure

### Phase 2: Content Infrastructure (Week 3-4)

- [ ] Set up blog (subdomain or integrated)
- [ ] Create blog post template with schema support
- [ ] Write 4 foundation articles
- [ ] Add FAQ section to landing page with schema
- [ ] Create "How it works" page (SEO + GEO optimized)
- [ ] Create feature pages (/cv-analysis, /cv-comparison, etc.)

### Phase 3: GEO Foundation (Week 5-6)

- [ ] Create Product Hunt listing
- [ ] Create G2/Capterra profiles
- [ ] Write Reddit/Quora answers (5-10 per week)
- [ ] Publish whitepaper on Bourdieu framework
- [ ] Create YouTube explainer video
- [ ] Create public knowledge pages ("What is CV Market Signaling?")
- [ ] Publish "Explainable AI CV Reports" page with examples

### Phase 4: Authority Building (Ongoing)

- [ ] Publish 2 blog posts per week
- [ ] Guest post outreach (1-2 per month)
- [ ] Podcast pitch (1 per month)
- [ ] Monitor and respond to brand mentions
- [ ] Build relationships with career bloggers
- [ ] Track and expand winning content
- [ ] Update old content quarterly

---

## Quick Wins (Can Do Today)

1. **Add meta tags** to LandingPage.tsx:
```tsx
useEffect(() => {
  document.title = "CViviD - AI Resume Analysis & Eye-Tracking Heatmaps";
  document.querySelector('meta[name="description"]')?.setAttribute(
    "content",
    "Analyze your CV with AI-powered capital theory assessment, visual heatmaps, and ATS compatibility scoring."
  );
}, []);
```

2. **Create robots.txt**:
```
User-agent: *
Allow: /
Disallow: /api/
Disallow: /supabase/
Disallow: /auth/
Sitemap: https://CViviD.com/sitemap.xml
```

3. **Add Open Graph tags** to index.html:
```html
<meta property="og:title" content="CViviD - AI Resume Analysis">
<meta property="og:description" content="Decode the hidden signals in your resume">
<meta property="og:image" content="https://CViviD.com/og-image.jpg">
<meta property="og:url" content="https://CViviD.com">
<meta name="twitter:card" content="summary_large_image">
```

4. **Create a simple FAQ** on landing page (GEO gold):
```
Q: What is CViviD?
A: CViviD is an AI-powered resume analysis tool that evaluates CVs using Bourdieu's Capital Theory framework and generates eye-tracking heatmaps to predict recruiter attention patterns.

Q: How much does CViviD cost?
A: Single analysis costs 3.99. Monthly plans start at 9/month (Explorer) with options up to 29/month (Career Accelerator).

Q: Is my resume data secure?
A: Yes. All uploads are encrypted, processed securely, and never shared with third parties. CViviD is GDPR compliant.

Q: How is CViviD different from other resume tools?
A: CViviD uses market signaling theory and capital theory frameworks, not just keyword matching. We analyze what your CV communicates about your professional value, not just whether it has the right words.
```

---

## Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Ahrefs SEO Blog](https://ahrefs.com/blog/)
- [GEO Research Paper](https://arxiv.org/abs/2311.09735)
- [Core Web Vitals](https://web.dev/vitals/)

---

Features:
  - Search functionality across post titles, descriptions, and tags
  - Category filtering (resume-optimization, career-development, hr-insights, market-signaling, product-updates)
  - Individual post pages with social sharing (LinkedIn, Twitter, copy link)
  - Related posts section based on category
  - "Coming Soon" state shown when no posts exist yet
  - CTAs linking back to CV analysis

  To add posts later, edit data/blogData.ts and add entries to the blogPosts array:

  {
    slug: 'how-ats-systems-work',
    title: 'How ATS Systems Actually Work in 2026',
    description: 'Meta description here...',
    category: 'resume-optimization',
    tags: ['ATS', 'resume', 'parsing'],
    content: '<p>HTML content here...</p>'
  }

*Document created: December 31, 2025*
*Last updated: December 02, 2026*
