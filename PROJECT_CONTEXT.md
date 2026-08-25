# ECGuys Website — Project Context

Last updated: 2026-08-25

## Overview

Marketing/consulting site for ECGuys, serving India, Ireland, UK, and Gulf
countries across three audience paths: **Student**, **Business**, and
**Career**. Originally scaffolded with v0.dev, then extended with Payload CMS
for content management and lead capture.

## Repo location

`C:\Users\hpmsi\OneDrive\Documents\EC-Guys\ECguys-website\version-1`
(the actual app lives in the `version-1/` subfolder of the top-level
`ECguys-website` directory).

- Git remote: `https://github.com/ecguys/ecguys-marketing-website.git`
- Current branch: `feature/payload-cms`
- No CI config, `vercel.json`, or `Dockerfile` found — hosting target
  wasn't confirmed from the repo. README/`.gitignore` suggest it originated
  as a Vercel/v0.dev deployment.

## Tech stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **CMS/backend:** Payload CMS 3.87 (`payload`, `@payloadcms/next`,
  `@payloadcms/db-postgres`)
- **Database:** Postgres, hosted on Supabase project **"ecguys's Project"**
  (ref `mqkxnteupakzpycfgnwj`, region `eu-west-1`)
- **Styling:** Tailwind CSS v4, shadcn/ui, Framer Motion
- **Package manager:** pnpm (the lockfile actually kept in sync —
  `package-lock.json` is stale, left over from before Payload was added,
  and still lists a `@supabase/supabase-js` dependency that was removed
  from the project)
- **Email:** Resend, via a Supabase Edge Function (see below)

## Architecture

```
Browser
  └─ Next.js app (app/, components/)
       └─ fetch('/api/...')
            └─ Payload REST API  (app/(payload)/api/[...slug]/route.ts)
                 └─ Postgres  (schema: "payload", NOT "public")
                      └─ payload.leads / payload.services / payload.testimonials / ...
```

Payload's tables live in a dedicated `payload` Postgres schema, deliberately
kept separate from the Supabase project's `public` schema (see comment in
`payload.config.ts`). There is **no Supabase JS client** anywhere in the
frontend — Supabase is used purely as the Postgres host for Payload, via
`DATABASE_URI` in `.env.local`.

## Directory structure (relevant parts)

```
app/
  (frontend)/          # public site routes
  (payload)/            # Payload admin UI + REST API catch-all route
    api/[...slug]/route.ts
components/
  dashboard.tsx         # main dashboard shell after category selection
  hero-animation.tsx    # landing hero animation
  navigation.tsx
  selection-screen.tsx  # student/business/career picker
  footer.tsx
  sections/
    hero-section.tsx
    about-section.tsx
    services-section.tsx
    testimonials-section.tsx
    contact-section.tsx   # the signup/lead form
  ui/                    # shadcn components
collections/
  Users.ts
  Leads.ts               # signup form data
  Services.ts
  Testimonials.ts
globals/
  SiteSettings.ts         # site-wide email/phone/locations
lib/
  category-data.ts         # per-category (student/business/career) copy
  types.ts
supabase/
  functions/send-signup-emails/index.ts   # Resend email sender (Edge Function)
  migrations/20260825000000_lead_signup_webhook_trigger.sql
  config.toml
payload.config.ts
.env.local            # DATABASE_URI, PAYLOAD_SECRET (gitignored)
```

## Payload collections (Postgres tables under the `payload` schema)

### `payload.leads` — the signup/contact form
Columns: `id, name, institution, email, phone, category, message, newsletter, created_at, updated_at`
- `category`: enum `student | business | career`
- Publicly `create`-able (unauthenticated), but `read/update/delete` require
  a logged-in Payload user.
- Populated by `components/sections/contact-section.tsx`, which POSTs to
  `/api/leads`.

### `payload.testimonials`
Columns: `id, name, role, company, content, avatar, category, created_at, updated_at`
- `category`: enum `student | business | career`
- Currently seeded with 4 real testimonials (replaced the original 9-10
  placeholder/seed entries on 2026-08-25):
  - Gopika (student) — Physical Verification Engineer, Qualcomm
  - Alka Elsa Saji (student) — Embedded Systems Trainee, B.Tech ECE
  - Nafla (business) — Developer, Trivandrum
  - Pavi (business) — Developer, Bangalore
  - No testimonial currently exists under the "career" category.
- Rendered by `components/sections/testimonials-section.tsx`, fetched via
  `/api/testimonials?where[category][equals]=<category>`.

### `payload.services`
Columns: `id, title, description, icon (Lucide icon name), category, created_at, updated_at`

### `payload.site-settings` (global)
Fields: `email, phone, locations` — powers the contact section's info panel.
Fetched via `/api/globals/site-settings`.

## Signup flow (current, as of the Resend integration)

```
User submits contact form (contact-section.tsx)
  → fetch POST /api/leads
      → Payload inserts into payload.leads   [DB insert = source of truth]
          → AFTER INSERT trigger (payload.notify_lead_signup)
              → pg_net async HTTP POST → Supabase Edge Function
                  (send-signup-emails)
                  → Resend: welcome email → user's submitted address
                  → Resend: admin notification → ecguys03@gmail.com
```

Key properties:
- **No application code was touched** to add emails — it's a pure database
  trigger, invisible to the Next.js app and to Vercel/hosting.
- The trigger fires only *after* a successful commit, so email failures can
  never affect the signup itself (email errors are logged via
  `console.error` inside the Edge Function, visible in Supabase Dashboard →
  Edge Functions → Logs).
- Duplicate-send protection: each Resend call carries an
  `Idempotency-Key` derived from the lead's row `id`
  (`welcome-<id>`, `admin-notify-<id>`).
- The Edge Function authenticates the trigger's call via a shared secret
  header (`x-webhook-secret`), since a DB-originated `pg_net` call carries
  no Supabase user JWT. The function is deployed with `verify_jwt = false`
  for this reason (see `supabase/config.toml`).

### Required Edge Function secrets (Supabase → Project Settings → Edge Functions → Secrets)
- `RESEND_API_KEY` — already set by the user
- `FROM_EMAIL` = `EC Guys <hello@ecguys.net>`
- `ADMIN_NOTIFICATION_EMAIL` = `ecguys03@gmail.com`
- `DB_WEBHOOK_SECRET` — must match the value stored in Supabase Vault under
  the secret name `lead_signup_webhook_secret` (looked up at call time by
  `payload.notify_lead_signup()`, not embedded in any file — see the
  migration file's header comment for how to view/rotate it). The function
  returns 401 without it. **Do not paste the literal value into this file
  or any other repo file** — that's exactly the mistake that caused the
  first version of this secret to need rotating on 2026-08-25.

### Resolved
- The welcome email templates are implemented (student + business), using
  the site's actual brand colours/wordmark. See
  `supabase/functions/send-signup-emails/templates.ts`.

## Content edits made this session (2026-08-25)

- `components/sections/about-section.tsx`:
  - Removed the "ECGuys was founded by Abhi... partnering with Biphi and
    Bazil" origin-story paragraph entirely.
  - Removed "Partnership with UK-based companies" from the highlights list
    (now 3 items instead of 4).
- `components/sections/hero-section.tsx`:
  - Stat changed from `"15+" / "Countries Served"` to `"8+" / "Country"`.
  - Replaced the mouse-shaped scroll indicator icon with a bouncing
    `ArrowDown` icon plus a "Scroll Down" label.
  - Committed and pushed to `origin/feature/payload-cms` as `ec8f972`.
- `payload.testimonials` table (direct DB write, not a code change — see
  Testimonials section above).

## Known issue / operational note

The Supabase project (`mqkxnteupakzpycfgnwj`) is on a plan that
**auto-pauses after inactivity** (was found `INACTIVE` and had to be
restored once already this session, which took ~4 minutes to come back
`ACTIVE_HEALTHY`). If the site starts throwing 500s from `/api/*` routes
again, check Supabase project status first — after restoring, the Next.js
dev server needs a restart too (Payload caches its DB connection at boot
and won't retry automatically).

## Local dev

```
pnpm install   # or npm install — pnpm-lock.yaml is the source of truth
pnpm dev       # next dev (Turbopack), served at http://localhost:3000
```

Requires `.env.local` with `DATABASE_URI` (Supabase Postgres connection
string, pooler host) and `PAYLOAD_SECRET`.

Payload admin UI: `http://localhost:3000/admin`
