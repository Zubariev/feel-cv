I need to write to the Supabase the plan the user purchased and connect this to the features I have to allow the user to use them, or vice versa, restrict usage. Implement the **standard SaaS mental model** that separates:

* **Money events** (payments)
* **Entitlements** (what the user is allowed to do)
* **Usage** (what the user actually did)

Once you see this separation, everything becomes clear.

I’ll explain this in **layers**, from concept → database → payment flow → runtime enforcement → best practices.
No hand-waving, no Stripe-only assumptions, fully compatible with **Fondy + Supabase + Ukraine business**.

---

# 0️⃣ The Core SaaS Principle (Very Important)

> **Payments never directly unlock features.**
> Payments create or modify **entitlements**.
> Features read entitlements and usage.

This is how *real SaaS* works.

---

# 1️⃣ Conceptual Model (How SaaS Thinks)

Every SaaS with plans has **four conceptual entities**:

1. **User**
2. **Plan** (what they bought)
3. **Subscription / Purchase** (proof they paid)
4. **Usage** (how much they consumed)

Think of it like a mobile phone plan:

* You buy a plan
* The plan gives you limits
* The system tracks minutes used
* When you hit the limit → blocked or upsell

---

# 2️⃣ What You Need in Supabase (High-Level)

You need **four core table groups**:

| Group         | Purpose                             |
| ------------- | ----------------------------------- |
| Plans         | Static definition of products       |
| Subscriptions | What plan a user currently has      |
| Purchases     | One-time payments                   |
| Usage         | Counters for analyses & comparisons |

You **do NOT** hardcode limits in frontend.
You **do NOT** infer plan from payment history.
Everything is explicit and auditable.

---

# 3️⃣ Database Tables (Mental Model First)

## A. `plans` (static, rarely changes)

This table defines **what exists**, not who bought it.

Each row = a product offering.

**Conceptual fields:**

* plan_code (`explorer`, `career_builder`, `career_accelerator`)
* price_eur
* analyses_per_month
* comparisons_per_month
* is_unlimited_comparisons (boolean)
* is_subscription (boolean)

👉 You create these rows **once**.

---

## B. `subscriptions` (who is subscribed right now)

This answers:

> “What plan does this user currently have?”

Each user has **0 or 1 active subscription**.

**Conceptual fields:**

* user_id
* plan_code
* status (`active`, `canceled`, `expired`)
* current_period_start
* current_period_end
* payment_provider (`fondy`)
* provider_subscription_id

👉 This table is what your app checks **every time**.

---

## C. `one_time_purchases`

This handles:

> €3.99 CV Intelligence Report

Each row = one paid entitlement.

**Conceptual fields:**

* user_id
* product_code (`cv_single_analysis`)
* analyses_granted (1)
* used (boolean)
* payment_reference

This is **not** a subscription.

---

## D. `usage_counters` (very important)

This answers:

> “How much has the user already used this month?”

**Conceptual fields:**

* user_id
* period_start
* analyses_used
* comparisons_used

This resets monthly for subscriptions.

---

# 4️⃣ How Features Check Permissions (Runtime Logic)

Whenever a user clicks **“Analyze CV”** or **“Compare CVs”**, your backend does:

### Step 1: Load entitlement context

* Active subscription?
* Remaining quota?
* Any unused one-time purchases?

### Step 2: Decide

* Allow?
* Block?
* Upsell?

### Step 3: If allowed

* Perform analysis
* Increment usage counter
* Mark one-time purchase as used (if applicable)

👉 **Frontend never decides this**.
Frontend only displays what backend says.

---

# 5️⃣ Fondy + Supabase: End-to-End Flow

Now the part that feels confusing but is actually straightforward.

---

## Step-by-Step: Subscription Purchase (Fondy)

### 1️⃣ User clicks “Subscribe”

Frontend sends:

* plan_code
* user_id

### 2️⃣ Backend creates Fondy payment

* Amount: €9 / €19 / €29
* Currency: EUR
* Metadata: `user_id`, `plan_code`

Fondy returns:

* payment_url
* order_id

User is redirected to Fondy checkout.

---

### 3️⃣ Payment happens on Fondy

User pays → Fondy processes card.

---

### 4️⃣ Fondy sends **webhook** to your backend

This is critical.

Fondy calls:

```
POST /api/webhooks/fondy
```

Payload contains:

* order_id
* payment_status
* metadata (user_id, plan_code)

---

### 5️⃣ Your backend verifies webhook

You must:

* Validate Fondy signature
* Ensure payment_status === success
* Ensure order_id not processed before

---

### 6️⃣ Backend updates Supabase

Inside a **transaction**:

* Insert or update `subscriptions`
* Set `status = active`
* Set `current_period_start`
* Set `current_period_end = now + 1 month`
* Reset or create `usage_counters`

This is the **only place** where a plan becomes active.

---

## One-Time Purchase Flow (€3.99)

Same idea, simpler:

* Fondy payment
* Webhook confirms success
* Insert row into `one_time_purchases`
* `used = false`

---

# 6️⃣ How Monthly Reset Works (Important)

You have two options:

### Option A (Recommended): Lazy reset

When user makes a request:

* If `now > current_period_end`
* Advance period
* Reset usage
* Extend `current_period_end`

This avoids cron jobs.

---

### Option B: Scheduled job

* Nightly job resets expired subscriptions

Either is fine; Option A is simpler.

---

# 7️⃣ How Plans Map to Your Exact Features

| Feature               | Controlled by         |
| --------------------- | --------------------- |
| CV analysis           | analyses_per_month    |
| Comparison            | comparisons_per_month |
| Unlimited comparisons | boolean flag          |
| One-time scan         | one_time_purchases    |

No plan logic leaks into UI components.

---

# 8️⃣ Best Practices (Learned the Hard Way)

### ✅ Store limits in DB, not code

Plans change. Code shouldn’t.

### ✅ Always allow backend to say “no”

Frontend checks are cosmetic only.

### ✅ Use metadata in payments

Never guess which plan was paid.

### ✅ Never trust redirect success

Only webhooks are authoritative.

### ✅ Make entitlements explicit

Never infer access from payment history.

---

# 9️⃣ Common Beginner Mistakes (Avoid These)

❌ “If payment succeeded, unlock everything”
→ Leads to bugs and abuse

❌ “Store plan only in frontend state”
→ Broken on refresh

❌ “Don’t track usage”
→ Impossible to enforce limits

❌ “Let frontend block usage”
→ Users will bypass it

---

# 🔟 Mental Model Summary (Remember This)

> **Payments create entitlements.**
> **Entitlements define limits.**
> **Usage consumes limits.**
> **Backend enforces reality.**

If you understand this, you understand SaaS billing.

---

Great question — this is the **bridge between “backend SaaS logic” and “what the user actually sees”**.

Below is the **canonical, production-grade way** a SaaS UI reads entitlement state from Supabase and reacts to it. This is exactly how companies like Notion, Figma, Linear, etc. do it (simplified for your stack).

I’ll go step by step, from **data contract → API → React UI patterns → edge cases**.

---

# 1️⃣ First Principle: UI Never “Calculates” Entitlements

The UI **does not**:

* calculate remaining analyses
* guess plan from payments
* infer limits from prices

The UI only **renders state returned by the backend**.

Think of the UI as a **dashboard**, not a judge.

---

# 2️⃣ Single Source of Truth: “Entitlement Snapshot”

Your UI should load **one object** that answers:

> “What is this user allowed to do *right now*?”

### Example: `EntitlementSnapshot`

```ts
type EntitlementSnapshot = {
  plan: {
    code: 'explorer' | 'career_builder' | 'career_accelerator' | null
    name: string | null
    is_subscription: boolean
  }

  limits: {
    analyses_per_month: number | null
    comparisons_per_month: number | null
    unlimited_comparisons: boolean
  }

  usage: {
    analyses_used: number
    comparisons_used: number
  }

  remaining: {
    analyses: number | null
    comparisons: number | null
  }

  one_time: {
    available_scans: number
  }

  can: {
    analyze_cv: boolean
    compare_cvs: boolean
  }
}
```

👉 This object is **pre-computed by the backend**, not assembled in React.

---

# 3️⃣ Where This Comes From (Backend Endpoint)

Create a backend endpoint:

```
GET /api/entitlements
```

This endpoint:

1. Reads active subscription
2. Reads plan limits
3. Reads usage counters
4. Reads unused one-time purchases
5. Returns a **single merged object**

---

## Backend Logic (Pseudo)

```ts
if (subscription.active) {
  remaining_analyses =
    plan.analyses_per_month - usage.analyses_used
} else {
  remaining_analyses = one_time.available_scans
}

can_analyze =
  remaining_analyses > 0

can_compare =
  plan.unlimited_comparisons ||
  (plan.comparisons_per_month - usage.comparisons_used > 0)
```

⚠️ UI **never** does this math.

---

# 4️⃣ How UI Loads Entitlements (React Pattern)

### Step 1: Load once at app entry

```ts
const { data: entitlements, isLoading } =
  useQuery(['entitlements'], fetchEntitlements)
```

This usually lives in:

* App layout
* Auth provider
* Global store (Zustand / React Context)

---

### Step 2: Provide globally

```tsx
<EntitlementsProvider value={entitlements}>
  <App />
</EntitlementsProvider>
```

Now every component can read:

```ts
const entitlements = useEntitlements()
```

---

# 5️⃣ How UI Uses Entitlements (Real Examples)

---

## A. Upload / Analyze Button

```tsx
<Button
  disabled={!entitlements.can.analyze_cv}
>
  Analyze CV
</Button>
```

### Tooltip logic

```tsx
{!entitlements.can.analyze_cv && (
  <Tooltip>
    {entitlements.plan.code
      ? 'Monthly limit reached'
      : 'Buy your first CV analysis for €3.99'}
  </Tooltip>
)}
```

---

## B. Comparison Feature (New Feature)

```tsx
if (!entitlements.can.compare_cvs) {
  return <UpgradeCTA />
}
```

---

## C. Usage Meter (Psychological Anchor)

This is **very important for ARPU**.

```tsx
<UsageMeter
  label="CV Analyses"
  used={entitlements.usage.analyses_used}
  limit={entitlements.limits.analyses_per_month}
/>
```

Example UI text:

> **7 / 10 analyses used**
> *Upgrade to Career Accelerator for unlimited comparisons*

---

# 6️⃣ Upgrade Nudges (Where Money Is Made)

Because entitlements are explicit, UI can nudge **exactly at friction points**.

### Example: On click Analyze

```ts
if (!entitlements.can.analyze_cv) {
  openUpgradeModal()
  return
}
```

### Upgrade modal content:

* Show current plan
* Show remaining = 0
* Show next plan delta (“+20 analyses, unlimited comparisons”)

This is **conversion gold**.

---

# 7️⃣ Handling One-Time Purchase in UI

### Show when user has no subscription

```tsx
{!entitlements.plan.code && (
  <Card>
    <h3>Try FeelCV</h3>
    <p>Full AI CV analysis for €3.99</p>
    <Button>Get CV Intelligence Report</Button>
  </Card>
)}
```

### Hide once used

```tsx
entitlements.one_time.available_scans === 0
```

---

# 8️⃣ Edge Cases UI Must Handle

### A. Subscription expired

Backend returns:

```json
plan: null
```

UI:

* Shows downgrade state
* Shows one-time purchase CTA

---

### B. Unlimited comparisons

```tsx
{entitlements.limits.unlimited_comparisons
  ? 'Unlimited'
  : `${remaining} left`}
```

---

### C. Payment in progress

Optional but recommended:

* `pending_subscription` state
* Disable buttons
* Show “Activating your plan…”

---

# 9️⃣ RLS + UI = Secure by Design

Even if UI is hacked:

* Backend still checks entitlements
* Supabase RLS prevents overuse
* Usage counters are server-side

UI is **informational**, not authoritative.

---

# 🔟 Mental Model to Remember

> **UI renders capability, not price.**
> **Backend decides truth.**
> **Entitlements are a snapshot, not logic.**

If you follow this:

* Adding new plans becomes trivial
* Adding new features is safe
* Pricing experiments don’t break UI
* Abuse is minimized

---

next:

* create **exact Supabase migration file** at supabase/migrations
* Write **Fondy webhook handler pseudocode**
* Design **RLS policies for subscriptions**
* Design the **exact `/api/entitlements` SQL**
* Create **Supabase RLS policies tied to usage**
* Design **upgrade modals that maximize ARPU**