# CVSense - Project Plan & Progress

**Official Launch Date: January 1, 2026**

---

## Mission Statement

**CVSense isn't just another Dashboard business with AI. We sell confidence and support.**

---

## Understanding Our Users

Our target users share these characteristics:

1. **Lack of confidence** - Users who are confident in their CVs will not come to us
2. **Aware of the hiring process** - They understand that behind job postings are real people (recruiters) and ATS systems
3. **Willing to invest** - They know a "properly" written CV is key to success and are ready to invest time and money
4. **Limited network** - They have few social connections who can evaluate and help write a suitable CV
5. **Not experts in persuasion** - They don't understand how recruiter attention works, or how color, font, contrast, and layout affect perception
6. **Skeptical of templates** - They doubt universal CV templates work for everyone, and worry recognized templates may be perceived negatively

---

## Our Value Proposition

How we address user needs:

1. **Reduce anxiety** - We help users feel less stressed about their CVs; confidence in understanding and control is what they pay for
2. **Technology that works** - We mimic human attention points and ensure CVs pass through ATS algorithms and are visible to recruiters
3. **Expert knowledge** - We combine HR industry expertise, psychology, sociology, economics, and AI for best results
4. **Trust building** - Our recommendations work because we are genuine experts in the field
5. **Focus on their expertise** - Users focus on their professional skills; we handle everything else
6. **No universal recipes** - Even template-based CVs can be enhanced with our personalized recommendations

---

## Project Overview

CVSense is an AI-powered resume analysis platform that evaluates resumes through:
- Bourdieu Capital Theory (Material, Social, Cultural, Symbolic, Technological)
- Visual Design Analysis (Layout, Typography, Color Harmony)
- Market Signaling Metrics (ATS Friendliness, Brand Signals)
- Eye-tracking Saliency Heatmaps

**Tech Stack:** React 19 + Vite 6 + TypeScript + Tailwind CSS 4 + Supabase + Google Gemini AI

---

## Subscription Model

### Monthly Plans

| Plan | Price | Target Audience | Analyses | Comparisons |
|------|-------|-----------------|----------|-------------|
| **Starter** | €9/month | Job seekers | 5/month | 1/month |
| **Professional** | €19/month | Serious job hunters | 10/month | 4/month |
| **Premium** | €29/month | PhD students, Career switchers, Power users | 30/month | 10/month |

### One-Time Purchase
- **1 CV Deep Analysis** — €3.99

---

## Current Progress (As of December 17, 2025)

### Completed Features

- [x] User authentication (Sign up, Login, Logout via Supabase Auth)
- [x] Session persistence and user identification
- [x] Resume upload (PDF, PNG, JPG) with drag-and-drop
- [x] PDF to image conversion via pdf.js
- [x] Gemini AI integration for multimodal resume analysis
- [x] Bourdieu Capital Analysis (5 types with evidence quotes)
- [x] Tone Profile Analysis (Formal, Professional, Confident, Assertive, Approachable)
- [x] Skill Composition breakdown (Hard/Soft Skills, Education, Impact)
- [x] Visual Layout Metrics (Whitespace, Typography, Hierarchy, Color, Fixation)
- [x] Saliency Heatmap visualization (eye-tracking simulation)
- [x] Skill Bounding Box detection and overlay
- [x] Market Signaling Score
- [x] ATS Friendliness Index
- [x] Strategic Insights (Strengths & Improvement Areas)
- [x] Interactive Dashboard with toggleable overlays
- [x] Capital Radar Chart visualization
- [x] Tone Analysis Bar Chart
- [x] Skill Composition Bar Chart
- [x] Capital Evidence Cards
- [x] Database schema with RLS policies (Supabase PostgreSQL)
- [x] File storage (Supabase Storage bucket)
- [x] Analysis persistence to database
- [x] **Past analyses history page** ✅ (Dec 17)
- [x] **Error boundary components** ✅ (Dec 17)
- [x] **Loading skeletons** ✅ (Dec 17)
- [x] **Security: .env.local properly gitignored** ✅ (Dec 17)
- [x] **Analysis caching with image layers** ✅ (Dec 17)

### Not Yet Implemented

- [ ] Unit tests
- [ ] E2E tests
- [ ] CI/CD pipeline
- [ ] Vector search for skill similarity
- [ ] Comparative analysis (side-by-side)
- [ ] Industry benchmarking
- [ ] Admin analytics dashboard
- [ ] Mobile responsive optimization
- [ ] Landing page SEO optimization
- [ ] Social sharing features
- [ ] Pricing/subscription tiers UI
- [ ] Payment integration (Fondy/LiqPay/Paddle)
- [ ] Custom domain setup
- [ ] Production deployment

---

## TODO Tasks - Week of December 16-22, 2025

### Priority 1: Critical for Launch

- [x] **Security Fix**: Ensure `.env.local` is properly gitignored ✅
- [x] **Past Analyses Page**: Build UI to view and manage previous analysis history ✅
- [x] **Error Handling**: Add error boundary components and user-friendly error messages ✅
- [x] **Loading States**: Implement loading skeletons for better UX during analysis ✅

### Priority 2: High Value Features

- [ ] **Mobile Responsive**: Optimize dashboard layout for tablet and mobile screens
- [x] **Analysis Caching**: Prevent duplicate analyses of same document ✅ (Dec 17)

### Priority 3: Quality & Testing

- [ ] **Unit Tests**: Add tests for geminiService and databaseService
- [ ] **Component Tests**: Add tests for key React components
- [ ] **Manual QA**: Test full user flow on different browsers

---

## TODO Tasks - Week of December 23-29, 2025

### Priority 1: Launch Preparation

- [ ] **Production Deployment**: Deploy to Vercel/Netlify with environment variables
- [ ] **Custom Domain**: Configure custom domain and SSL
- [ ] **Performance Audit**: Run Lighthouse and optimize scores
- [ ] **Analytics Setup**: Add Google Analytics or Plausible for usage tracking
- [ ] **Payment Integration**: Integrate Fondy/LiqPay or Paddle for subscriptions

### Priority 2: Polish & UX

- [ ] **Landing Page**: Enhance messaging based on user understanding (reduce anxiety, build trust)
- [ ] **Onboarding Flow**: Add first-time user tutorial/walkthrough
- [ ] **Pricing Page**: Display subscription tiers with clear value propositions

### Priority 3: Documentation

- [ ] **README Update**: Complete documentation for developers
- [ ] **Privacy Policy**: Create privacy policy page
- [ ] **Terms of Service**: Create terms of service page

---

## TODO Tasks - Week of December 30, 2025 - January 1, 2026

### Launch Week Checklist

- [ ] **Final QA**: Complete end-to-end testing on production
- [ ] **Monitoring Setup**: Configure error tracking (Sentry) and uptime monitoring
- [ ] **Backup Strategy**: Verify database backup procedures
- [ ] **Load Testing**: Ensure system handles expected traffic
- [ ] **Social Media**: Prepare launch announcements
- [ ] **Launch Day (Jan 1)**: Go live and monitor closely

---

## Post-Launch Roadmap (Q1 2026)

### January 2026
- User feedback collection and bug fixes
- Performance optimization based on real usage
- A/B testing for conversion optimization
- Comparison analysis feature (1-4 comparisons based on plan)

### February 2026
- Vector search for skill similarity
- Comparative analysis feature
- Industry benchmarking

### March 2026
- Premium tier advanced features
- Team/enterprise features exploration
- Internationalization (multi-language support)

---

## Financial Overview

### Monthly Expenses (Estimated)

| Scenario | Payment Fees | API | Supabase | Hosting | Taxes (25%) | **Total** |
|----------|-------------|-----|----------|---------|-------------|-----------|
| **Minimum** | €0 | €10 | €0 | €0 | €2.50 | **~€12.50** |
| **Starter** (100 users) | €50 | €50 | €25 | €0 | €31.25 | **~€156** |
| **Growth** (500 users) | €150 | €150 | €25 | €20 | €86.25 | **~€431** |

### Revenue Projections

| Users | Plan Mix | Gross Revenue | Expenses | **Net Profit** |
|-------|----------|---------------|----------|----------------|
| 50 users | Mixed | €475 | ~€100 | **~€375** |
| 100 users | Mixed | €1,000 | ~€160 | **~€840** |
| 500 users | Mixed | €5,000 | ~€450 | **~€4,550** |

### Break-even
- Minimum viable: ~15 Starter subscribers (€135/month)
- Comfortable: ~50 mixed subscribers (€400-500/month)

---

## Technical Debt & Known Issues

1. **CDN Dependencies**: Consider bundling Tailwind and pdf.js instead of CDN imports
2. **Gemini Model Version**: Verify consistent model version between code and database
3. **Missing Tests**: No test coverage currently exists
4. **No CI/CD**: Manual deployment process
5. **TypeScript types**: Supabase generated types need regeneration

---

## Key Metrics to Track Post-Launch

### Product Metrics
- Daily Active Users (DAU)
- Resume analyses per day
- Analysis completion rate
- Average session duration
- Error rate

### Business Metrics
- Conversion rate (visitor → signup → paid)
- User retention rate (monthly)
- Churn rate
- Average Revenue Per User (ARPU)
- Customer Acquisition Cost (CAC)

---

## Team & Resources

- **Development**: [Your Name]
- **Design**: [TBD]
- **Marketing**: [TBD]

---

## Notes

- Launch is in **15 days** (as of Dec 17, 2025)
- Focus on stability and core features over new features
- Prioritize user experience and reliability
- Remember: We sell **confidence and support**, not just analytics

---

*Last Updated: December 17, 2025*
