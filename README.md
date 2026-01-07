## CViviD – Visual & Capital Intelligence for Resumes

CViviD is a Vite/React frontend that ingests a resume (PDF or image), calls AI for multimodal analysis, and visualizes:

- **Bourdieu capital** distributions
- **Visual saliency** heatmaps and layout metrics
- **Tone, skills and ATS/market signaling scores**

### Tech Stack

- **Frontend**: React 19, Vite 6, Tailwind (via CDN)
- **Charts & visuals**: Recharts, custom canvas heatmap
- **Backend-as-a-service**: Supabase (Postgres, Storage, Auth, RLS)

---

## Project Structure

```text
.
├─ App.tsx                     # Main application shell and analysis dashboard
├─ index.tsx                   # React/Vite entrypoint
├─ index.html                  # HTML shell, Tailwind & pdf.js CDNs
├─ env.example                 # Template for required environment variables
├─ components/
│  ├─ LandingPage.tsx         # Marketing + Supabase Auth (login/signup/logout) + CTA
│  ├─ FileUpload.tsx          # Drag-and-drop uploader (PDF/images)
│  ├─ CapitalRadar.tsx        # Bourdieu capital radar chart
│  ├─ ToneAnalysis.tsx        # Tone profile bar chart
│  ├─ SkillComposition.tsx    # Semantic content distribution bar
│  ├─ VisualMetrics.tsx       # Visual layout metrics (whitespace, hierarchy, etc.)
│  ├─ SaliencyHeatmap.tsx     # Canvas-based heatmap overlay
│  ├─ SkillsOverlay.tsx       # Skill bounding-box overlay
│  ├─ CapitalEvidence.tsx     # Evidence lists per capital type
│  └─ VisualMetrics.tsx       # Visual metrics panel
├─ services/
│  ├─ geminiService.ts        # Gemini client & analysis orchestration
│  ├─ pdfService.ts           # PDF → image conversion via pdf.js
│  ├─ supabaseClient.ts       # Typed Supabase client
│  └─ databaseService.ts      # All Supabase persistence & retrieval for analyses
├─ types.ts                   # Frontend domain types (AnalysisResult, etc.)
├─ types/
│  └─ supabase.ts             # Generated Supabase Database types
├─ prisma/
│  └─ schema.prisma           # (Optional) Local schema mirror of Supabase DB
└─ supabase/
   ├─ config.toml             # Supabase CLI config
   └─ migrations/             # SQL migrations (extensions, tables, RLS, storage)
```

---

## Environment Configuration

Create a `.env.local` (or `.env`) at the project root based on `env.example`:

```bash
cp env.example .env.local
```

Required variables:

- **`VITE_GEMINI_API_KEY`**: Gemini API key for `@google/genai`
- **`VITE_SUPABASE_URL`**: Supabase project URL (e.g. `https://YOUR_PROJECT.supabase.co`)
- **`VITE_SUPABASE_ANON_KEY`**: Supabase anon public key

These are all **Vite**-prefixed so they are readable on the client: the app will throw a clear error if any are missing.

---

## Supabase & RLS Behaviour

The schema and RLS policies (see `supabase/migrations/*_rls_policies.sql`) assume:

- Tables such as `documents`, `ai_analysis`, `ai_scores`, etc. are protected with `WHERE user_id = auth.uid()`.
- All inserts and reads must therefore include the authenticated `user_id`.

The frontend enforces this:

- Users **must authenticate** via Supabase Auth from the **landing page**.
- The app tracks the current session and user via `supabase.auth.getSession()` and `onAuthStateChange`.
- When a resume is analyzed, `App.tsx` calls:
  - `databaseService.saveAnalysisResult(currentUser.id, file, analysis)`
  - If no user is signed in, the analysis will **not** be persisted and a warning is logged.

If you see RLS errors in Supabase logs, confirm:

- The user is signed in (you see their email in the header).
- The `user_id` column values match `auth.uid()` for their session.

---

## Running the App Locally

**Prerequisites:** Node.js (LTS recommended), npm

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   ```bash
   cp env.example .env.local
   # then edit .env.local with your real keys
   ```

3. **Run the dev server**

   ```bash
   npm run dev
   ```

4. Open the printed localhost URL in your browser.

---

## Auth Flow (Login, Signup, Logout)

- The **landing page** (`LandingPage.tsx`) includes an Auth card:
  - **Sign in** with email/password
  - **Sign up** with email/password (Supabase will send a confirmation email, if configured)
  - **Sign out** of the current session
- The primary CTA **“Launch CViviD”** is disabled until the user is authenticated.
- Once signed in:
  - The header and hero show the user’s email.
  - All subsequent analyses will be stored under that user’s `user_id` in Supabase.

You can also sign out from the main dashboard header; this will end the Supabase session but not clear the currently displayed analysis.

---

## Production Notes

- **Environment safety**: Never commit `.env*` files; keep secrets in your deployment platform.
- **RLS**: All DB operations go through `databaseService.ts` which always includes a `user_id` derived from the authenticated Supabase session.
- **Error handling**:
  - Missing env vars for Supabase/Gemini throw explicit errors on startup or before analysis.
  - PDF parsing and Gemini calls are wrapped in `try/catch` with user-facing error messages.
- **Performance**:
  - Only a single page of PDFs is rendered to an image for analysis (configurable in `pdfService.ts`).
  - Visualizations are client-side only; no server components required.

For deployment, point your hosting platform at the Vite build:

```bash
npm run build
```

and serve the `dist` directory via your preferred static host or edge runtime.
