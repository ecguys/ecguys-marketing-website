# ECGuys - Premium Web Application Specification

## Overview

A premium, Stripe/Vercel-inspired web application for ECGuys - a global consulting and innovation company serving India, Ireland, UK, and Gulf countries. The application features a dark theme with sophisticated animations, glass morphism effects, and smooth microinteractions.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Animations:** Framer Motion
- **UI Components:** shadcn/ui
- **State Management:** React useState + localStorage for persistence

---

## Folder Structure

```
/vercel/share/v0-project/
├── app/
│   ├── globals.css          # Premium design tokens, utilities, animations
│   ├── layout.tsx           # Root layout with dark theme
│   ├── page.tsx             # Main entry point with flow state management
│   └── global-error.tsx     # Error boundary
│
├── components/
│   ├── hero-animation.tsx   # Raining letters + text scramble animation
│   ├── selection-screen.tsx # Category selection (Student/Business/Career)
│   ├── dashboard.tsx        # Main dashboard wrapper
│   ├── navigation.tsx       # Premium navigation bar
│   ├── footer.tsx           # Site footer
│   ├── ecguys-logo.tsx      # Branded logo component </ECGUYS>
│   │
│   ├── sections/
│   │   ├── hero-section.tsx        # Dynamic hero with category content
│   │   ├── services-section.tsx    # Services grid with animations
│   │   ├── about-section.tsx       # About with statistics
│   │   ├── testimonials-section.tsx # Customer testimonials
│   │   └── contact-section.tsx     # Contact form with validation
│   │
│   └── ui/                  # shadcn/ui components (pre-installed)
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── ... (50+ components)
│
├── lib/
│   ├── utils.ts             # Utility functions (cn, etc.)
│   ├── types.ts             # TypeScript interfaces
│   └── category-data.ts     # Content for all 3 user categories
│
├── hooks/
│   ├── use-mobile.ts        # Mobile detection hook
│   └── use-toast.ts         # Toast notifications
│
└── styles/
    └── globals.css          # Legacy styles (not used)
```

---

## Branding

### Logo Component
The ECGuys brand is represented with a modern code-inspired logo: `</ECGUYS>`
- **Format:** HTML closing tag style with angle brackets and forward slash
- **Color:** Forward slash in accent yellow-green, text in gradient cyan
- **Usage:** Appears in:
  - Navigation header (primary branding)
  - Footer
  - Selection screen welcome badge
  - All brand references throughout the site

### Logo Component (`ecguys-logo.tsx`)
```typescript
<EcguysLogo />              // Full size - 24px
<EcguysLogoSmall />         // Compact - 16px
```

---

## Design System

### Color Palette (5 Colors)

| Token | Color | Usage |
|-------|-------|-------|
| `--background` | Deep dark blue-black | Page background |
| `--foreground` | Near white | Primary text |
| `--primary` | Electric cyan/teal | CTAs, links, accents |
| `--accent` | Warm amber | Secondary highlights |
| `--muted` | Subtle gray | Secondary text, borders |

### Typography

- **Font Family:** Geist Sans (headings & body)
- **Font Mono:** Geist Mono (code elements)

### Premium Effects

- **Glass Morphism:** `.glass`, `.glass-strong`
- **Glow Effects:** `.glow`, `.glow-sm`, `.glow-accent`
- **Text Gradients:** `.text-gradient`, `.text-gradient-accent`
- **Patterns:** `.grid-pattern`, `.dot-pattern`
- **Interactions:** `.hover-lift`, `.shine`, `.gradient-border`

---

## User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  1. LANDING ANIMATION                                       │
│     - Raining letters background                            │
│     - Text scramble effect cycling through phrases          │
│     - "Begin Your Journey" CTA button                       │
│                                                             │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  2. SELECTION SCREEN                                        │
│     Choose your path:                                       │
│     ┌─────────┐  ┌─────────┐  ┌─────────┐                  │
│     │ Student │  │Business │  │ Career  │                  │
│     │  Path   │  │  Path   │  │  Path   │                  │
│     └─────────┘  └─────────┘  └─────────┘                  │
│                                                             │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  3. PERSONALIZED DASHBOARD                                  │
│     - Navigation bar                                        │
│     - Hero section (category-specific)                      │
│     - Services section (6 services per category)            │
│     - About section with statistics                         │
│     - Testimonials carousel                                 │
│     - Contact form                                          │
│     - Footer                                                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Categories & Services

### 1. Student Path
- Academic Research & Writing
- Thesis & Dissertation Support
- Data Analysis & Statistics
- Programming Assignments
- Presentation Design
- Exam Preparation

### 2. Business Path
- Software Development
- IoT Solutions
- AI & Automation
- Business Consulting
- Digital Transformation
- Cloud Solutions

### 3. Career Path
- Resume Building
- Interview Coaching
- LinkedIn Optimization
- Career Strategy
- Skills Assessment
- Job Search Support

---

## Animations & Microinteractions

### Hero Animation (`hero-animation.tsx`)
- **Raining Letters:** Random characters falling with varying speeds
- **Highlight Effect:** Random letters glow cyan periodically
- **Text Scramble:** Typewriter effect cycling through brand phrases
- **Character Set:** Alphanumeric for tech aesthetic

### Page Transitions
- **AnimatePresence:** Smooth fade/slide between views
- **Staggered Children:** Cards animate in sequence
- **whileInView:** Scroll-triggered animations

### Hover Effects
- **Cards:** Scale up, lift with shadow, border glow
- **Buttons:** Shine sweep effect, scale feedback
- **Links:** Underline animation

---

## State Management

### Flow State (`page.tsx`)
```typescript
type FlowState = 'landing' | 'selection' | 'dashboard'
```

### Category Persistence
- Stored in `localStorage` as `ecguys-category`
- Persists across sessions
- Can be changed via navigation

---

## Current Status

### Implemented
- [x] Premium dark theme with design tokens
- [x] Landing animation with text scramble
- [x] Category selection flow
- [x] Responsive navigation
- [x] All dashboard sections
- [x] Contact form with validation
- [x] Framer Motion animations
- [x] localStorage persistence

### Not Yet Implemented (Requires Setup)
- [ ] Supabase authentication (login/signup)
- [ ] Database integration
- [ ] Contact form backend
- [ ] User profiles
- [ ] Admin dashboard

---

## Environment Variables

### Required for Supabase Integration

```env
# Add these in v0 Settings > Vars section
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (for server-side)
```

### How to Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project or select existing
3. Go to **Settings** > **API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

---

## Accessing the Web Application

### In v0 Environment
1. The preview panel on the right shows your live application
2. Click the preview to interact with it
3. Changes are reflected immediately via HMR

### Deploying to Production
1. Click **"Publish"** button (top right of v0)
2. Connect your Vercel account if prompted
3. Your app will be deployed to a `.vercel.app` URL

### Adding Environment Variables
1. Click the **Settings** icon (top right of v0)
2. Go to **"Vars"** section
3. Add your Supabase credentials here
4. Variables will be automatically injected into your deployment

---

## Authentication (To Be Implemented)

Currently, the application does not have authentication. To add login/signup:

### Option 1: Supabase Auth (Recommended)
Request Supabase integration in v0, and I can implement:
- Email/password login
- OAuth providers (Google, GitHub, etc.)
- Magic link authentication
- Protected routes

### Option 2: Custom Auth
Build custom authentication with:
- Password hashing (bcrypt)
- Session management
- Database-backed user storage

---

## Next Steps

1. **Connect Supabase** - Click Settings > Settings > Request Supabase integration
2. **Add Auth** - I can implement login/signup once Supabase is connected
3. **Contact Form Backend** - Save form submissions to database
4. **User Dashboard** - Personal area for returning users
5. **Admin Panel** - Manage content and users

---

## Brand Guidelines Reference

- **Primary Color:** Electric Cyan (#00D4FF equivalent in oklch)
- **Accent Color:** Warm Amber (#FFB347 equivalent in oklch)
- **Font:** Geist Sans/Mono
- **Style:** Premium dark, Stripe/Vercel-inspired
- **Interactions:** Smooth, subtle, professional

---

*Generated by v0 for ECGuys*
*Last Updated: April 2026*
