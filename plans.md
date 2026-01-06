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
| **Explorer** | €9/month | Job seekers | 5/month | 1/month |
| **Career Builder** | €19/month | Serious job hunters | 10/month | 5/month |
| **Career Accelerator** | €29/month | PhD students, Career switchers, Power users | 30/month | Unlimited |

### One-Time Purchase
- **1 CV Deep Analysis** — €3.99

---

## Current Progress (As of December 20, 2025)

### Completed Features

#### Core Analysis
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

#### Visualization & Dashboard
- [x] Interactive Dashboard with toggleable overlays
- [x] Capital Radar Chart visualization
- [x] Tone Analysis Bar Chart
- [x] Skill Composition Bar Chart
- [x] Capital Evidence Cards
- [x] Visual Metrics grid display

#### Data Persistence
- [x] Database schema with RLS policies (Supabase PostgreSQL)
- [x] File storage (Supabase Storage bucket)
- [x] Analysis persistence to database
- [x] Past analyses history page
- [x] Analysis caching with image layers
- [x] Document fingerprinting for duplicate detection

#### Comparison Feature
- [x] Side-by-side CV comparison dashboard
- [x] Delta indicators for score changes
- [x] Comparison capital radar (overlaid)
- [x] Strengths/improvements diff view
- [x] Skills changes tracking

#### Billing System (NEW - Dec 18-20)
- [x] Complete billing database schema (plans, subscriptions, one_time_purchases, usage_counters)
- [x] RLS policies for all billing tables
- [x] Entitlements service with `get_user_entitlements()` RPC
- [x] Usage tracking with lazy reset pattern
- [x] Fondy webhook handler (Edge Function)
- [x] Payment service for checkout initiation
- [x] Upgrade modal component
- [x] Usage meter components
- [x] Payment success page
- [x] Pricing section on landing page
- [x] Feature gating for analysis and comparison

#### Pages & Legal
- [x] Landing page with value proposition
- [x] About page
- [x] Contact page
- [x] Privacy Policy page
- [x] Terms of Use page
- [x] Cookie Policy page
- [x] GDPR Compliance page
- [x] AI Ethical Policy page
- [x] Footer with navigation

#### Quality & UX
- [x] Error boundary components
- [x] Loading skeletons
- [x] Security: .env.local properly gitignored

---

## Critical Issues Identified (Code Review - Dec 20, 2025)

### CRITICAL SEVERITY - Must Fix Before Production

| Issue | Location | Risk | Priority |
|-------|----------|------|----------|
| **Gemini API Key Exposed** | `.env.local` line 1, `geminiService.ts:151` | API key visible in frontend bundle, can be extracted and abused | P0 |
| **Fondy Payment Not Signed Server-Side** | `paymentService.ts:128-132` | Payment requests sent without signature from frontend | P0 |
| **Webhook Signature Bypass** | `fondy-webhook/index.ts:190-195` | Returns `true` if env var missing instead of throwing error | P0 |
| **Missing RLS for Document Tables** | `document_fingerprints`, `document_layers` | Tables referenced in code but no migrations/RLS found | P0 |
| **Plan Prices in 3 Locations** | `paymentService.ts`, `PricingSection.tsx`, `billing_system.sql` | Price mismatch risk if one location updated | P0 |

### HIGH SEVERITY - Fix Before Launch

| Issue | Location | Risk | Priority |
|-------|----------|------|----------|
| **usageLimitService Uses localStorage** | `usageLimitService.ts:29-32` | Defaults to unlimited plan, user can manipulate | P1 |
| **App.tsx Monolith** | `App.tsx` (1000+ lines) | 14+ state variables, multiple concerns mixed, hard to maintain | P1 |
| **No Input Validation** | `FileUpload.tsx:17-21` | No file size limit, no magic byte verification | P1 |
| **PDF.js CDN Without SRI** | `pdfService.ts:15` | CDN could be compromised, no integrity hash | P1 |
| **No TypeScript Strict Mode** | `tsconfig.json` | Missing `strict: true`, allows implicit `any` | P1 |
| **Race Condition in Analysis** | `App.tsx:312-360` | Usage recorded async, display before persistence | P1 |

### MEDIUM SEVERITY - Address Post-Launch

| Issue | Location | Risk | Priority |
|-------|----------|------|----------|
| **No Test Coverage** | Entire codebase | Zero unit/integration tests | P2 |
| **No CI/CD Pipeline** | Root directory | Manual deployment only | P2 |
| **No Error Tracking** | `ErrorBoundary.tsx` | Logs to console only, no Sentry integration | P2 |
| **Canvas Not Accessible** | `SaliencyHeatmap.tsx`, `SkillsOverlay.tsx` | No ARIA labels, screen readers can't interpret | P2 |
| **No Toast Notifications** | `App.tsx` | Silent success operations, user feedback missing | P2 |
| **RLS Subquery Performance** | `20240101000005_rls_policies.sql:36-39` | Indirect ownership checks may cause N+1 | P2 |

---

## Immediate Action Items (Dec 20-22)

### Security Fixes (BLOCKING LAUNCH)

- [x] **Move Gemini API to Edge Function** *(Completed Dec 21, 2025)*
  - Create `/supabase/functions/analyze-resume/index.ts`
  - Proxy requests through backend
  - Add rate limiting per user
  - Revoke and regenerate exposed API key

- [x] **Create Payment Signing Edge Function** *(Completed Dec 21, 2025)*
  - Create `/supabase/functions/fondy-create-order/index.ts`
  - Sign requests with `FONDY_MERCHANT_SECRET` server-side
  - Never expose merchant secret to frontend
  - Update `paymentService.ts` to call Edge Function

- [x] **Fix Webhook Signature Validation** *(Completed Dec 21, 2025)*
  - Change `fondy-webhook/index.ts` line 194: throw error instead of `return true`
  - Add validation that plan_code exists before subscription creation

- [x] **Verify/Create Missing Tables** *(Completed Dec 21, 2025 - Already existed)*
  - Check if `document_fingerprints` and `document_layers` exist
  - Create migration with proper RLS if missing
  - Add to `20240101000009_document_cache.sql`

- [x] **Centralize Plan Prices** *(Completed Dec 21, 2025)*
  - Fetch prices from database `plans` table at runtime
  - Remove hardcoded prices from `paymentService.ts` and `PricingSection.tsx`
  - Single source of truth: database

### Code Quality Fixes

- [x] **Delete `usageLimitService.ts`** *(Completed Dec 21, 2025)*
  - All usage tracking now uses `entitlementsService.ts`
  - Remove any references in codebase

- [x] **Add File Validation** *(Completed Dec 21, 2025)*
  - Max file size: 10MB
  - Verify file magic bytes (PDF: `%PDF`, PNG: `\x89PNG`, etc.)
  - Client-side check + server-side validation

- [x] **Enable TypeScript Strict Mode** *(Completed Dec 21, 2025)*
  - Add `"strict": true` to `tsconfig.json`
  - Fix resulting type errors


Next Steps

  Before deploying to production, you should:
  1. Set these Supabase secrets:
    - GEMINI_API_KEY
    - FONDY_MERCHANT_ID
    - FONDY_MERCHANT_SECRET
  2. Regenerate Supabase types:
  supabase gen types typescript --local > types/supabase.ts
  3. Revoke and regenerate the exposed Gemini API key
---

## TODO Tasks - Week of December 23-29, 2025

### Priority 1: Launch Preparation

- [ ] **Production Deployment**: Deploy to Vercel with environment variables
- [ ] **Custom Domain**: Configure custom domain and SSL
- [ ] **Performance Audit**: Run Lighthouse, target 90+ scores
- [ ] **Analytics Setup**: Add Plausible or PostHog for usage tracking
- [ ] **Error Tracking**: Integrate Sentry for frontend error monitoring

### Priority 2: Testing

- [ ] **Critical Path Tests**: Add Vitest tests for:
  - Signature verification function
  - Entitlement calculations
  - Usage recording logic
  - Plan price validation
- [ ] **E2E Smoke Test**: One test covering: signup → upload → analyze → view history

### Priority 3: Polish

- [ ] **Mobile Responsive**: Fix FileUpload height, VisualMetrics grid on mobile
- [ ] **Accessibility**: Add ARIA labels to canvas elements
- [ ] **Toast Notifications**: Add success feedback for uploads, analysis completion

---

## TODO Tasks - Week of December 30, 2025 - January 1, 2026

### Payment Integration (Completed Dec 30, 2025)

- [x] **Fix Fondy Edge Function**: Deploy with `--no-verify-jwt` flag
- [x] **Fix Auth Token Passing**: Use `getUser(token)` directly instead of global headers
- [x] **Fix Signature Algorithm**: Sort by keys (not values), use Python dict format for `recurring_data`
- [x] **One-time Payment Flow**: Checkout page loads successfully
- [x] **Subscription Payment Flow**: Checkout page loads successfully for Career Builder

### Payment Testing (In Progress)

- [ ] **Test Payment with Test Card**: Complete a test payment using Fondy test card numbers
- [ ] **Verify Webhook Processing**: Confirm `fondy-webhook` Edge Function receives and processes callbacks
- [ ] **Verify Subscription Creation**: Check that subscriptions are created in Supabase `subscriptions` table
- [ ] **Verify Entitlements Update**: Confirm user entitlements update after successful payment
- [ ] **Test One-time Purchase Flow**: Verify one-time purchase records in `one_time_purchases` table
- [ ] **Test Usage Counters**: Confirm usage limits work after subscription activation

### Launch Week Checklist

- [ ] **Final Security Audit**: Verify all API keys rotated and secured
- [ ] **Monitoring Setup**: Sentry dashboard, uptime monitoring (UptimeRobot)
- [ ] **Backup Strategy**: Verify Supabase backup procedures
- [ ] **Load Testing**: Ensure system handles 100 concurrent users
- [ ] **Production Payment Test**: Complete end-to-end payment flow in production environment
- [ ] **Social Media**: Prepare launch announcements
- [ ] **Launch Day (Jan 1)**: Go live and monitor closely

---

## Technical Debt Registry

### Critical Debt (Blocks Scale)

| ID | Description | Location | Effort | Impact |
|----|-------------|----------|--------|--------|
| TD-001 | App.tsx monolith needs decomposition | `App.tsx` | Large | High |
| TD-002 | No test coverage | All services | Large | High |
| TD-003 | Canvas operations recreated per render | `SaliencyHeatmap.tsx` | Medium | Medium |
| TD-004 | No lazy loading for routes | `App.tsx` imports | Medium | Medium |

### Medium Debt (Affects Quality)

| ID | Description | Location | Effort | Impact |
|----|-------------|----------|--------|--------|
| TD-005 | Type casting with `as any` | `databaseService.ts:113, 339` | Small | Low |
| TD-006 | Silent error fallbacks | `App.tsx:301-303` | Small | Medium |
| TD-007 | No retry logic for API calls | `geminiService.ts` | Medium | Medium |
| TD-008 | Subscription expiry not automated | Missing cron job | Medium | Medium |

### Low Debt (Nice to Have)

| ID | Description | Location | Effort | Impact |
|----|-------------|----------|--------|--------|
| TD-009 | No bundle size monitoring | `vite.config.ts` | Small | Low |
| TD-010 | RLS subquery performance | `20240101000005_rls_policies.sql` | Medium | Low |
| TD-011 | PDF.js should be lazy loaded | `pdfService.ts` | Small | Low |

---

## Architecture Recommendations

### Immediate Refactoring (Q1 2026)

1. **Extract Custom Hooks from App.tsx**
   ```
   useAuth() - Authentication state and handlers
   useEntitlements() - Already exists in context, use it
   useAnalysis() - File handling, analysis orchestration
   useComparison() - Comparison logic
   usePayment() - Payment flow
   ```

2. **Implement Code Splitting**
   ```typescript
   // vite.config.ts
   build: {
     rollupOptions: {
       output: {
         manualChunks: {
           'vendor-charts': ['recharts'],
           'vendor-auth': ['@supabase/supabase-js'],
           'vendor-ai': ['@google/genai']
         }
       }
     }
   }
   ```

3. **Add React.lazy for Routes**
   ```typescript
   const LandingPage = lazy(() => import('./components/LandingPage'));
   const ComparisonDashboard = lazy(() => import('./components/ComparisonDashboard'));
   const AnalysisHistory = lazy(() => import('./components/AnalysisHistory'));
   ```

### Backend Evolution (Q2 2026)

1. **Move All AI Calls to Edge Functions**
   - Gemini API behind Supabase Edge Function
   - Rate limiting per user/IP
   - Request logging for debugging

2. **Add Webhook Retry Queue**
   - If Fondy webhook fails, queue for retry
   - Exponential backoff with max 5 attempts

3. **Subscription Lifecycle Automation**
   - Cron job to mark expired subscriptions
   - Email notifications before expiry
   - Grace period handling

---

## Post-Launch Roadmap (Q1 2026)

### January 2026
- User feedback collection and bug fixes
- Performance optimization based on real usage
- A/B testing for conversion optimization
- Complete test coverage (target: 60%)

### February 2026
- Vector search for skill similarity
- Industry benchmarking ("How does your CV compare to others in your field?")
- Email notifications (analysis complete, subscription expiring)

### March 2026
- Premium tier advanced features
- Team/enterprise features exploration
- Internationalization (multi-language support)
- Annual billing option

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
- Minimum viable: ~15 Explorer subscribers (€135/month)
- Comfortable: ~50 mixed subscribers (€400-500/month)

---

## Key Metrics to Track Post-Launch

### Product Metrics
- Daily Active Users (DAU)
- Resume analyses per day
- Analysis completion rate
- Comparison feature adoption rate
- Average session duration
- Error rate by feature

### Business Metrics
- Conversion rate (visitor → signup → paid)
- Plan distribution (Explorer vs Builder vs Accelerator)
- One-time to subscription conversion
- User retention rate (monthly)
- Churn rate
- Average Revenue Per User (ARPU)
- Customer Lifetime Value (LTV)
- Customer Acquisition Cost (CAC)

### Technical Metrics
- API latency (Gemini, Supabase)
- Error rates by endpoint
- Edge Function cold start times
- Bundle size over time

---

## Security Checklist (Pre-Launch)

- [x] All API keys rotated and stored in Supabase secrets
- [x] Gemini API proxied through Edge Function
- [x] Fondy payment signed server-side *(Fixed Dec 30, 2025)*
- [x] Webhook signature verification mandatory
- [x] RLS enabled on ALL tables
- [x] No secrets in frontend bundle
- [ ] HTTPS enforced on custom domain
- [ ] Rate limiting on public endpoints
- [x] Input validation on file uploads
- [ ] Error messages don't leak internal details

---

## Team & Resources

- **Development**: Solo founder
- **Design**: [TBD]
- **Marketing**: [TBD]

---

## Notes

- Launch is in **2 days** (as of Dec 30, 2025)
- **CRITICAL**: Payment testing must be completed before launch
- Focus on stability and security over new features
- Prioritize user experience and reliability
- Remember: We sell **confidence and support**, not just analytics

---

## Review History

| Date | Reviewer | Focus Areas | Status |
|------|----------|-------------|--------|
| Dec 17, 2025 | Initial | Feature completion | Done |
| Dec 20, 2025 | Comprehensive Code Review | Architecture, Security, Performance, Billing | Done |
| Dec 21, 2025 | Security Implementation | Edge Functions, Webhook Fixes, File Validation, Strict Mode | Done |
| Dec 30, 2025 | Payment Integration Fix | Fondy signature algorithm, JWT bypass, Auth token handling | Done |

---

*Last Updated: December 30, 2025*
