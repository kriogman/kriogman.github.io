# kriogman.com v2 — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild kriogman.com as a static Astro 5 site with Tailwind CSS v4, dark mode, full accessibility (WCAG 2.2 AA), and Lighthouse 95+ on mobile — delivering Home page, shared layout, and stub project pages.

**Architecture:** Pure SSG with Astro 5; React 19 used only for the ThemeToggle island (`client:load`). All content is defined in `src/lib/data.ts` as typed TypeScript arrays. CSS is token-first: every visual value is a CSS custom property in `tokens.css`, consumed by Tailwind v4 via `@theme`.

**Tech Stack:** Astro 5, React 19, Tailwind CSS v4 (`@tailwindcss/vite`), TypeScript strict, pnpm, IBM Plex Sans (self-hosted), Lucide React (icons), `class-variance-authority`, `clsx`, `tailwind-merge`, `@astrojs/sitemap`, Playwright + axe-playwright (e2e tests), Vitest (unit tests).

---

## File map

```
kriogman-v2/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.astro
│   │   │   ├── Badge.astro
│   │   │   └── SkipLink.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── PersonalDetails.astro
│   │   │   ├── Mindset.astro
│   │   │   ├── WorkExperience.astro
│   │   │   ├── TechGrid.astro
│   │   │   ├── Studies.astro
│   │   │   ├── FinalProject.astro
│   │   │   └── CtaFinal.astro
│   │   └── layouts/
│   │       ├── BaseLayout.astro
│   │       ├── PageLayout.astro
│   │       ├── SiteHeader.astro
│   │       ├── SiteNav.astro
│   │       ├── SiteFooter.astro
│   │       └── ThemeToggle.tsx
│   ├── pages/
│   │   ├── index.astro
│   │   ├── 404.astro
│   │   ├── 2gether.astro
│   │   ├── fintonic.astro
│   │   ├── kimia.astro
│   │   └── iot.astro
│   ├── lib/
│   │   ├── cn.ts
│   │   ├── data.ts
│   │   └── types.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   └── global.css
│   └── assets/
│       ├── fonts/
│       │   └── ibm-plex-sans-var.woff2
│       ├── images/
│       │   └── pal.png          ← copied from legacy repo
│       └── icons/
│           └── skills/          ← SVGs re-optimizados
├── public/
│   ├── favicon.svg
│   ├── og-default.png
│   └── robots.txt
├── tests/
│   └── e2e/
│       └── smoke.spec.ts
├── astro.config.mjs
├── tsconfig.json
├── vitest.config.ts
└── package.json
```

---

## Task 1: Scaffold Astro 5 project

**Files:**
- Create: `kriogman-v2/` (sibling to `kriogman.github.io/`)
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `package.json`

- [ ] **Step 1.1: Scaffold the project**

Run from the parent directory of `kriogman.github.io/`:

```bash
cd /Users/kriogman/Documents
pnpm create astro@latest kriogman-v2 -- \
  --template minimal \
  --typescript strictest \
  --no-git \
  --no-install
cd kriogman-v2
```

When prompted interactively, choose: minimal template, TypeScript strict, skip git, skip install.

- [ ] **Step 1.2: Install all dependencies**

```bash
pnpm install
pnpm add react react-dom
pnpm add @astrojs/react @astrojs/sitemap
pnpm add tailwindcss @tailwindcss/vite
pnpm add class-variance-authority clsx tailwind-merge
pnpm add lucide-react
pnpm add -D @types/react @types/react-dom
pnpm add -D vitest @vitest/ui
pnpm add -D @playwright/test axe-playwright
pnpm add -D svgo
```

- [ ] **Step 1.3: Configure astro.config.mjs**

Replace the scaffolded `astro.config.mjs` with:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  site: 'https://kriogman.com',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
```

- [ ] **Step 1.4: Configure tsconfig.json**

Replace the scaffolded `tsconfig.json` with:

```json
{
  "extends": "astro/tsconfigs/strictest",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

- [ ] **Step 1.5: Configure vitest.config.ts**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
})
```

- [ ] **Step 1.6: Add scripts to package.json**

Add these scripts (merge with what `pnpm create` generated):

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "typecheck": "astro check",
    "lint": "tsc --noEmit",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "test:a11y": "playwright test tests/e2e/smoke.spec.ts"
  }
}
```

- [ ] **Step 1.7: Verify scaffold compiles**

```bash
pnpm build
```

Expected: build completes with no errors. Output in `dist/`.

- [ ] **Step 1.8: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Astro 5 project"
```

---

## Task 2: Design tokens (tokens.css)

**Files:**
- Create: `src/styles/tokens.css`

- [ ] **Step 2.1: Create src/styles/ directory**

```bash
mkdir -p src/styles
```

- [ ] **Step 2.2: Write tokens.css**

Create `src/styles/tokens.css`:

```css
/* ─────────────────────────────────────────
   tokens.css — single source of truth for
   all visual values in this project.
   Do NOT hardcode colors, spacing, or fonts
   anywhere else.
   ───────────────────────────────────────── */

@theme {
  /* ── Palette (literal, internal use only) ── */
  --palette-lavender: #f3e8ee;
  --palette-ash:      #bacdb0;
  --palette-teal:     #729b79;
  --palette-slate:    #475b63;
  --palette-shadow:   #2e2c2f;

  /* ── Color: Semantic — Light mode (default) ──
     Contrast ratios on bg measured with WCAG 2.1 formula:
     --color-fg (Shadow Grey):       11.6:1 ✅ AAA
     --color-accent (Blue Slate):     5.98:1 ✅ AA
     --color-accent-surface (Teal):   2.63:1 ⚠️  decorative only, NOT for text
     --color-fg on --color-muted-bg:  8.2:1  ✅ AAA
  */
  --color-bg:               var(--palette-lavender);
  --color-fg:               var(--palette-shadow);
  --color-surface:          #ffffff;
  --color-muted-bg:         var(--palette-ash);
  --color-accent:           var(--palette-slate);
  --color-accent-surface:   var(--palette-teal);
  --color-accent-strong:    color-mix(in oklab, var(--palette-slate) 85%, var(--palette-shadow) 15%);
  --color-border:           color-mix(in oklab, var(--color-fg) 15%, transparent);
  --color-border-interactive: color-mix(in oklab, var(--color-fg) 60%, var(--color-bg));

  /* ── Typography ── */
  --font-sans: 'IBM Plex Sans', system-ui, -apple-system, sans-serif;

  /* ── Spacing (4px scale) ── */
  --space-1:  0.25rem;   /*  4px */
  --space-2:  0.5rem;    /*  8px */
  --space-3:  0.75rem;   /* 12px */
  --space-4:  1rem;      /* 16px */
  --space-6:  1.5rem;    /* 24px */
  --space-8:  2rem;      /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */

  /* ── Radius ── */
  --radius-sm:   0.25rem;
  --radius-md:   0.5rem;
  --radius-lg:   0.75rem;
  --radius-xl:   1rem;
  --radius-full: 9999px;

  /* ── Motion ── */
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);
}

/* ── Display / heading sizes (not Tailwind utilities — use as CSS vars)
   Applied with: font-size: var(--text-display) etc.
*/
:root {
  --text-display: clamp(3rem, 6vw, 5rem);       /* Hero name */
  --text-h1:      clamp(2rem, 4vw, 3rem);        /* Page titles */
  --text-h2:      clamp(1.375rem, 2.5vw, 2rem);  /* Section headers */
  --text-h3:      clamp(1.125rem, 1.8vw, 1.375rem); /* Company names */
}

/* ── Dark mode — system preference (no manual override) ──
   Contrast ratios on dark bg:
   --color-fg (Lavender Blush):          11.6:1 ✅ AAA
   --color-accent (Ash Grey):             8.2:1 ✅ AAA
   --color-accent-surface (Teal+10%):    ~5.2:1 ✅ AA
   --color-fg on --color-surface (Slate): 5.98:1 ✅ AA
*/
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg:             var(--palette-shadow);
    --color-fg:             var(--palette-lavender);
    --color-surface:        var(--palette-slate);
    --color-muted-bg:       color-mix(in oklab, var(--palette-slate) 50%, var(--palette-shadow) 50%);
    --color-accent:         var(--palette-ash);
    --color-accent-surface: color-mix(in oklab, var(--palette-teal) 85%, var(--palette-lavender) 15%);
    --color-accent-strong:  color-mix(in oklab, var(--palette-ash) 80%, var(--palette-lavender) 20%);
  }
}

/* ── Dark mode — manual override ── */
:root[data-theme="dark"] {
  --color-bg:             var(--palette-shadow);
  --color-fg:             var(--palette-lavender);
  --color-surface:        var(--palette-slate);
  --color-muted-bg:       color-mix(in oklab, var(--palette-slate) 50%, var(--palette-shadow) 50%);
  --color-accent:         var(--palette-ash);
  --color-accent-surface: color-mix(in oklab, var(--palette-teal) 85%, var(--palette-lavender) 15%);
  --color-accent-strong:  color-mix(in oklab, var(--palette-ash) 80%, var(--palette-lavender) 20%);
}
```

- [ ] **Step 2.3: Commit**

```bash
git add src/styles/tokens.css
git commit -m "feat(tokens): add color, spacing, typography, and motion tokens"
```

---

## Task 3: Global CSS + IBM Plex Sans font

**Files:**
- Create: `src/styles/global.css`
- Create: `src/assets/fonts/ibm-plex-sans-var.woff2`

- [ ] **Step 3.1: Download IBM Plex Sans Variable font**

```bash
mkdir -p src/assets/fonts

# Download the variable font from fontsource (Latin subset)
curl -L "https://cdn.jsdelivr.net/fontsource/fonts/ibm-plex-sans@latest/latin-variable-wdth-normal.woff2" \
  -o src/assets/fonts/ibm-plex-sans-var.woff2
```

If that URL doesn't resolve, download from:
`https://github.com/IBM/plex/releases` → IBM-Plex-Sans-Variable.zip → extract the WOFF2 Latin subset.

Verify the file exists and is > 10KB:
```bash
ls -lh src/assets/fonts/ibm-plex-sans-var.woff2
```

- [ ] **Step 3.2: Create global.css**

Create `src/styles/global.css`:

```css
@import "tailwindcss";
@import "./tokens.css";

/* ── Font face ── */
@font-face {
  font-family: 'IBM Plex Sans';
  src: url('@/assets/fonts/ibm-plex-sans-var.woff2') format('woff2-variations');
  font-weight: 100 700;
  font-style: normal;
  font-display: swap;
}

/* ── Base reset ── */
*, *::before, *::after {
  box-sizing: border-box;
}

html {
  font-family: var(--font-sans);
  background-color: var(--color-bg);
  color: var(--color-fg);
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

body {
  margin: 0;
  min-height: 100dvh;
  line-height: 1.7;
}

/* ── Focus visible ── */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

/* ── Skip link (visible only on focus) ── */
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: var(--color-accent);
  color: var(--color-bg);
  font-weight: 600;
  border-radius: var(--radius-md);
  text-decoration: none;
  z-index: 9999;
  transition: top var(--duration-fast);
}
.skip-link:focus {
  top: var(--space-4);
}

/* ── Prose defaults ── */
h1, h2, h3, h4 {
  line-height: 1.2;
  font-weight: 600;
  color: var(--color-fg);
}

a {
  color: var(--color-accent);
  text-decoration-color: color-mix(in oklab, var(--color-accent) 40%, transparent);
  text-underline-offset: 3px;
  transition: color var(--duration-fast), text-decoration-color var(--duration-fast);
}
a:hover {
  color: var(--color-accent-strong);
  text-decoration-color: var(--color-accent-strong);
}

/* ── Selection ── */
::selection {
  background: color-mix(in oklab, var(--color-accent) 25%, transparent);
}

/* ── Section layout utility ── */
.section-container {
  width: 100%;
  max-width: 72rem; /* 1152px */
  margin-inline: auto;
  padding-inline: var(--space-6);
}

@media (min-width: 768px) {
  .section-container {
    padding-inline: var(--space-8);
  }
}
```

- [ ] **Step 3.3: Commit**

```bash
git add src/styles/global.css src/assets/fonts/
git commit -m "feat(styles): add global CSS, font-face, and base resets"
```

---

## Task 4: cn utility + unit test

**Files:**
- Create: `src/lib/cn.ts`
- Create: `src/lib/cn.test.ts`

- [ ] **Step 4.1: Write failing test**

Create `src/lib/cn.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn', () => {
  it('returns a single class unchanged', () => {
    expect(cn('foo')).toBe('foo')
  })

  it('joins multiple classes', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('drops falsy values', () => {
    expect(cn('foo', false && 'bar', undefined, null, '')).toBe('foo')
  })

  it('resolves Tailwind conflicts — last wins', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2')
  })

  it('handles conditional object syntax', () => {
    expect(cn({ active: true, inactive: false })).toBe('active')
  })
})
```

- [ ] **Step 4.2: Run test to confirm it fails**

```bash
pnpm test
```

Expected output: `FAIL src/lib/cn.test.ts` — `cn is not defined` or similar.

- [ ] **Step 4.3: Implement cn.ts**

Create `src/lib/cn.ts`:

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
```

- [ ] **Step 4.4: Run tests to confirm they pass**

```bash
pnpm test
```

Expected: `PASS src/lib/cn.test.ts — 5 tests passed`.

- [ ] **Step 4.5: Commit**

```bash
git add src/lib/cn.ts src/lib/cn.test.ts
git commit -m "feat(lib): add cn utility with clsx + tailwind-merge"
```

---

## Task 5: Site content data

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/data.ts`

This centralizes all site content so sections are pure presentational components.

- [ ] **Step 5.1: Create types.ts**

Create `src/lib/types.ts`:

```ts
export type WorkEntry = {
  company: string
  role: string
  period: string
  description: string
  slug: string | null  // null = no sub-page in Phase 1
}

export type Principle = {
  headline: string
  body: string
}

export type TechItem = {
  name: string
  iconFile: string  // filename in src/assets/icons/skills/
}

export type StudyEntry = {
  degree: string
  school: string
  location: string
  years?: string
}
```

- [ ] **Step 5.2: Create data.ts**

Create `src/lib/data.ts`:

```ts
import type { WorkEntry, Principle, TechItem, StudyEntry } from './types'

export const workExperience: WorkEntry[] = [
  {
    company: 'Quadrant Travel Technologies',
    role: 'DevOps Engineer',
    period: '2022 — Present',
    description:
      'Building and operating cloud infrastructure for a travel-tech platform. Kubernetes on AWS EKS, GitOps with ArgoCD, observability with Datadog.',
    slug: null, // no sub-page in Phase 1
  },
  {
    company: '2gether',
    role: 'Site Reliability Engineer',
    period: '2021 — 2022',
    description:
      'Maintained high platform availability for a regulated digital bank offering crypto and fiat financial services.',
    slug: '2gether',
  },
  {
    company: 'Yogabot',
    role: 'R&D Consultant',
    period: '2020 — 2021',
    description:
      'Infrastructure and DevOps consulting for an AI-powered yoga application.',
    slug: null,
  },
  {
    company: 'Fintonic',
    role: 'DevOps Engineer',
    period: '2017 — 2020',
    description:
      'Led the evolution from IaaS + Chef to a Kubernetes-based platform, improving deployment frequency and operational visibility.',
    slug: 'fintonic',
  },
  {
    company: 'Kimia',
    role: 'Junior Systems Architect',
    period: '2015 — 2017',
    description:
      'First professional infrastructure role. Built monitoring, configuration management, and CI/CD foundations for a global ad-tech platform.',
    slug: 'kimia',
  },
]

export const mindsetPrinciples: Principle[] = [
  {
    headline: 'Automate to eliminate toil',
    body: 'Repetitive manual work is a bug in the system. Automate it, document why, and reclaim engineering time for work that compounds.',
  },
  {
    headline: 'Ship small, ship often',
    body: 'Large releases are large risks. Frequent, small changes are easier to understand, review, and roll back.',
  },
  {
    headline: 'Declare state, eliminate drift',
    body: 'Infrastructure as code means the repo is the truth. If it isn\'t in version control, it doesn\'t exist.',
  },
  {
    headline: 'Platform thinking over siloed ops',
    body: 'The job isn\'t to gate deployments — it\'s to build a platform that lets developers ship safely without needing a ticket.',
  },
  {
    headline: 'Error budgets, not blame',
    body: 'When things break, the question is how to improve the system, not who to blame. Blameless postmortems, actionable follow-ups.',
  },
  {
    headline: 'Observability over monitoring',
    body: 'Metrics tell you something is wrong. Traces and structured logs tell you why. Build systems you can ask questions about.',
  },
]

export const techStack: TechItem[] = [
  { name: 'Kubernetes', iconFile: 'kubernetes.svg' },
  { name: 'Docker',     iconFile: 'docker.svg' },
  { name: 'Terraform',  iconFile: 'terraform.svg' },
  { name: 'AWS',        iconFile: 'aws.svg' },
  { name: 'ArgoCD',     iconFile: 'argocd.svg' },
  { name: 'Datadog',    iconFile: 'datadog.svg' },
  { name: 'Ansible',    iconFile: 'ansible.svg' },
  { name: 'Chef',       iconFile: 'chef.svg' },
  { name: 'MongoDB',    iconFile: 'mongodb.svg' },
  { name: 'Nginx',      iconFile: 'nginx.svg' },
  { name: 'RabbitMQ',   iconFile: 'rabbitmq.svg' },
  { name: 'Git',        iconFile: 'git.svg' },
  { name: 'Python',     iconFile: 'python.svg' },
  { name: 'Java',       iconFile: 'java.svg' },
  { name: 'Kibana',     iconFile: 'kibana.svg' },
  { name: 'Logstash',   iconFile: 'logstash.svg' },
]

export const studies: StudyEntry[] = [
  {
    degree: 'B.Eng. Telematics Engineering',
    school: 'Universidad Carlos III de Madrid',
    location: 'Madrid, Spain',
  },
  {
    degree: 'B.Eng. Telecommunications & Electronics',
    school: 'Universidad Tecnológica de La Habana',
    location: 'Havana, Cuba',
  },
]
```

- [ ] **Step 5.3: Commit**

```bash
git add src/lib/types.ts src/lib/data.ts
git commit -m "feat(data): add typed site content data and types"
```

---

## Task 6: Copy and optimize assets

**Files:**
- Create: `src/assets/images/pal.png`
- Create: `src/assets/icons/skills/*.svg`

- [ ] **Step 6.1: Copy profile photo**

```bash
mkdir -p src/assets/images
cp /Users/kriogman/Documents/kriogman.github.io/images/pal.png src/assets/images/pal.png
```

Verify:
```bash
ls -lh src/assets/images/pal.png
```

- [ ] **Step 6.2: Copy skill SVGs**

```bash
mkdir -p src/assets/icons/skills
cp /Users/kriogman/Documents/kriogman.github.io/images/skills/*.svg src/assets/icons/skills/
```

- [ ] **Step 6.3: Optimize SVGs with svgo**

```bash
npx svgo src/assets/icons/skills/*.svg --multipass
```

Expected: each SVG reduced in size. Verify the SVGs still look correct by opening one:
```bash
cat src/assets/icons/skills/kubernetes.svg | head -5
```

Expected: valid SVG content starting with `<svg`.

- [ ] **Step 6.4: Create a placeholder OG image**

```bash
mkdir -p public
# Create a minimal 1200x630 placeholder — replace with real design before launch
cat > public/og-default.png << 'NOTE'
NOTE
# This is a placeholder — generate a real 1200×630 PNG before go-live
# Tools: Satori (Vercel), sharp, or any image editor
# Content: name, role, brand color bg
echo "TODO: add real og-default.png (1200x630)"
```

- [ ] **Step 6.5: Create favicon.svg**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#475b63"/>
  <text x="16" y="22" font-family="system-ui,sans-serif" font-size="18"
        font-weight="700" fill="#f3e8ee" text-anchor="middle">J</text>
</svg>
```

- [ ] **Step 6.6: Commit**

```bash
git add src/assets/ public/favicon.svg
git commit -m "feat(assets): add profile photo, skill icons (svgo-optimized), and favicon"
```

---

## Task 7: BaseLayout + FOUC prevention

**Files:**
- Create: `src/components/layouts/BaseLayout.astro`

This is the HTML shell shared by every page. It handles: SEO meta, dark mode initialization (no flash), font preload, skip link slot.

- [ ] **Step 7.1: Create BaseLayout.astro**

Create `src/components/layouts/BaseLayout.astro`:

```astro
---
import '@/styles/global.css'

type Props = {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
}

const {
  title,
  description,
  canonical = Astro.url.href,
  ogImage = '/og-default.png',
  noindex = false,
} = Astro.props

const siteName = 'Javier González'
const fullTitle = `${title} — ${siteName}`
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- FOUC prevention: run before first paint -->
    <script is:inline>
      ;(function () {
        const stored = localStorage.getItem('theme')
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        const theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light')
        document.documentElement.setAttribute('data-theme', theme)
      })()
    </script>

    <!-- Font preload (LCP text element) -->
    <link
      rel="preload"
      href="/fonts/ibm-plex-sans-var.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />

    <title>{fullTitle}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    {noindex && <meta name="robots" content="noindex, nofollow" />}

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content={siteName} />
    <meta property="og:title" content={fullTitle} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(ogImage, Astro.site).href} />
    <meta property="og:url" content={canonical} />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={fullTitle} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(ogImage, Astro.site).href} />

    <!-- Structured data: Person -->
    <script type="application/ld+json" set:html={JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Javier González',
      url: 'https://kriogman.com',
      jobTitle: 'Platform Engineer',
      sameAs: [
        'https://www.linkedin.com/in/kriogman',
        'https://github.com/kriogman',
        'https://instagram.com/kriogman',
      ],
    })} />

    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  </head>
  <body>
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <slot />
  </body>
</html>
```

**Important:** The font preload href uses `/fonts/ibm-plex-sans-var.woff2`. Astro serves `src/assets/` through its image optimization pipeline — for fonts, we need them in `public/fonts/` so they're served at a stable URL. Update the font copy step:

```bash
mkdir -p public/fonts
cp src/assets/fonts/ibm-plex-sans-var.woff2 public/fonts/ibm-plex-sans-var.woff2
```

Also update the `@font-face` src in `global.css` to use the public URL:

```css
@font-face {
  font-family: 'IBM Plex Sans';
  src: url('/fonts/ibm-plex-sans-var.woff2') format('woff2-variations');
  font-weight: 100 700;
  font-style: normal;
  font-display: swap;
}
```

- [ ] **Step 7.2: Verify build with BaseLayout**

Create a minimal test page `src/pages/index.astro` temporarily:

```astro
---
import BaseLayout from '@/components/layouts/BaseLayout.astro'
---
<BaseLayout title="Home" description="test">
  <main id="main-content"><h1>Test</h1></main>
</BaseLayout>
```

Run:
```bash
pnpm build
```

Expected: build succeeds, `dist/index.html` contains the `<title>Home — Javier González</title>`.

- [ ] **Step 7.3: Commit**

```bash
git add src/components/layouts/BaseLayout.astro public/fonts/
git commit -m "feat(layout): add BaseLayout with SEO, FOUC prevention, and font preload"
```

---

## Task 8: ThemeToggle React island

**Files:**
- Create: `src/components/layouts/ThemeToggle.tsx`

- [ ] **Step 8.1: Create ThemeToggle.tsx**

Create `src/components/layouts/ThemeToggle.tsx`:

```tsx
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

type Theme = 'light' | 'dark'

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light'
  const stored = localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(getInitialTheme())
  }, [])

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        background: 'none',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '0.375rem',
        cursor: 'pointer',
        color: 'var(--color-fg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: `border-color var(--duration-fast), color var(--duration-fast)`,
        minWidth: '2rem',
        minHeight: '2rem',
      }}
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  )
}
```

- [ ] **Step 8.2: Commit**

```bash
git add src/components/layouts/ThemeToggle.tsx
git commit -m "feat(layout): add ThemeToggle React island with localStorage persistence"
```

---

## Task 9: Site chrome — Header, Nav, Footer, PageLayout

**Files:**
- Create: `src/components/layouts/SiteNav.astro`
- Create: `src/components/layouts/SiteHeader.astro`
- Create: `src/components/layouts/SiteFooter.astro`
- Create: `src/components/layouts/PageLayout.astro`

- [ ] **Step 9.1: Create SiteNav.astro**

Create `src/components/layouts/SiteNav.astro`:

```astro
---
type Props = {
  /** If true, nav links are anchor links (#section). If false, they are page links. */
  isHomePage?: boolean
}
const { isHomePage = false } = Astro.props

const links = [
  { label: 'Mindset',    href: isHomePage ? '#mindset'    : '/#mindset' },
  { label: 'Experience', href: isHomePage ? '#experience' : '/#experience' },
  { label: 'Skills',     href: isHomePage ? '#skills'     : '/#skills' },
  { label: 'Studies',    href: isHomePage ? '#studies'    : '/#studies' },
]
---

<nav aria-label="Main navigation">
  <ul role="list" style="list-style:none; margin:0; padding:0; display:flex; gap:var(--space-6); align-items:center;">
    {links.map(({ label, href }) => (
      <li>
        <a
          href={href}
          style="color:var(--color-fg); text-decoration:none; font-size:0.875rem; font-weight:500; opacity:0.8; transition:opacity var(--duration-fast);"
          onmouseover="this.style.opacity='1'"
          onmouseout="this.style.opacity='0.8'"
        >
          {label}
        </a>
      </li>
    ))}
  </ul>
</nav>
```

- [ ] **Step 9.2: Create SiteHeader.astro**

Create `src/components/layouts/SiteHeader.astro`:

```astro
---
import SiteNav from './SiteNav.astro'
import { ThemeToggle } from './ThemeToggle'

type Props = { isHomePage?: boolean }
const { isHomePage = false } = Astro.props
---

<header
  style="
    position: sticky;
    top: 0;
    z-index: 100;
    background: color-mix(in oklab, var(--color-bg) 85%, transparent);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
  "
>
  <div
    class="section-container"
    style="display:flex; align-items:center; justify-content:space-between; height:3.5rem;"
  >
    <a
      href="/"
      aria-label="Javier González — home"
      style="font-weight:700; font-size:1rem; color:var(--color-fg); text-decoration:none; letter-spacing:-0.01em;"
    >
      javier<span style="color:var(--color-accent);">.</span>
    </a>

    <div style="display:flex; align-items:center; gap:var(--space-6);">
      <SiteNav isHomePage={isHomePage} />
      <ThemeToggle client:load />
    </div>
  </div>
</header>
```

- [ ] **Step 9.3: Create SiteFooter.astro**

Create `src/components/layouts/SiteFooter.astro`:

```astro
---
const year = new Date().getFullYear()

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kriogman' },
  { label: 'GitHub',   href: 'https://github.com/kriogman' },
  { label: 'Instagram', href: 'https://instagram.com/kriogman' },
]
---

<footer
  style="
    border-top: 1px solid var(--color-border);
    padding-block: var(--space-8);
    margin-top: var(--space-24);
  "
>
  <div
    class="section-container"
    style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:var(--space-4);"
  >
    <p style="margin:0; font-size:0.875rem; color:color-mix(in oklab, var(--color-fg) 60%, transparent);">
      © {year} Javier González
    </p>

    <nav aria-label="Social links">
      <ul role="list" style="list-style:none; margin:0; padding:0; display:flex; gap:var(--space-6);">
        {socials.map(({ label, href }) => (
          <li>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style="font-size:0.875rem; color:color-mix(in oklab, var(--color-fg) 60%, transparent); text-decoration:none; transition:color var(--duration-fast);"
              aria-label={`${label} (opens in new tab)`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
</footer>
```

- [ ] **Step 9.4: Create PageLayout.astro**

Create `src/components/layouts/PageLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro'
import SiteHeader from './SiteHeader.astro'
import SiteFooter from './SiteFooter.astro'

type Props = {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
  isHomePage?: boolean
}

const { isHomePage = false, ...baseProps } = Astro.props
---

<BaseLayout {...baseProps}>
  <SiteHeader isHomePage={isHomePage} />
  <main id="main-content">
    <slot />
  </main>
  <SiteFooter />
</BaseLayout>
```

- [ ] **Step 9.5: Verify build**

Update `src/pages/index.astro` to use `PageLayout`:

```astro
---
import PageLayout from '@/components/layouts/PageLayout.astro'
---
<PageLayout
  title="Home"
  description="Javier González — Platform Engineer & SRE with 10+ years building reliable infrastructure."
  isHomePage
>
  <div class="section-container" style="padding-block: var(--space-16);">
    <h1>Under construction</h1>
  </div>
</PageLayout>
```

```bash
pnpm build && pnpm preview
```

Open `http://localhost:4321` and verify:
- Header renders with "javier." logotype and nav links
- ThemeToggle button visible
- Footer renders with social links
- No console errors
- Clicking ThemeToggle switches theme without page flash

- [ ] **Step 9.6: Commit**

```bash
git add src/components/layouts/
git commit -m "feat(layout): add SiteHeader, SiteNav, SiteFooter, and PageLayout"
```

---

## Task 10: UI primitives — Button, Badge, SkipLink

**Files:**
- Create: `src/components/ui/Button.astro`
- Create: `src/components/ui/Badge.astro`

- [ ] **Step 10.1: Create Button.astro**

Create `src/components/ui/Button.astro`:

```astro
---
type ButtonBase = {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

type ButtonAsButton = ButtonBase & {
  as?: 'button'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onclick?: string
}

type ButtonAsLink = ButtonBase & {
  as: 'link'
  href: string
  external?: boolean
}

type Props = ButtonAsButton | ButtonAsLink

const {
  variant = 'primary',
  size = 'md',
  class: className = '',
  as: element = 'button',
  ...rest
} = Astro.props

const baseStyles = `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  font-family: var(--font-sans);
  font-weight: 500;
  border-radius: var(--radius-md);
  cursor: pointer;
  text-decoration: none;
  transition: background-color var(--duration-fast), color var(--duration-fast), border-color var(--duration-fast);
  white-space: nowrap;
`

const sizeStyles = {
  sm: 'font-size: 0.875rem; padding: var(--space-2) var(--space-3); min-height: 2rem;',
  md: 'font-size: 1rem;     padding: var(--space-2) var(--space-4); min-height: 2.5rem;',
  lg: 'font-size: 1.125rem; padding: var(--space-3) var(--space-6); min-height: 3rem;',
}

const variantStyles = {
  primary:   'background: var(--color-accent); color: var(--color-bg); border: 2px solid var(--color-accent);',
  secondary: 'background: transparent; color: var(--color-accent); border: 2px solid var(--color-accent);',
  ghost:     'background: transparent; color: var(--color-fg); border: 2px solid transparent;',
}

const style = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`

const isExternal = element === 'link' && (rest as ButtonAsLink).external
---

{element === 'link' ? (
  <a
    href={(rest as ButtonAsLink).href}
    style={style}
    class={className}
    target={isExternal ? '_blank' : undefined}
    rel={isExternal ? 'noopener noreferrer' : undefined}
  >
    <slot />
  </a>
) : (
  <button
    type={(rest as ButtonAsButton).type ?? 'button'}
    disabled={(rest as ButtonAsButton).disabled}
    style={style}
    class={className}
  >
    <slot />
  </button>
)}
```

- [ ] **Step 10.2: Create Badge.astro**

Create `src/components/ui/Badge.astro`:

```astro
---
type Props = {
  variant?: 'outline' | 'filled' | 'teal'
  class?: string
}

const { variant = 'outline', class: className = '' } = Astro.props

const styles = {
  outline: 'border: 1px solid var(--color-border); color: var(--color-fg); background: transparent;',
  filled:  'border: 1px solid transparent; color: var(--color-fg); background: var(--color-surface);',
  teal:    'border: 1px solid var(--color-accent-surface); color: var(--color-fg); background: color-mix(in oklab, var(--color-accent-surface) 15%, transparent);',
}
---

<span
  style={`
    display: inline-flex;
    align-items: center;
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.125rem var(--space-2);
    border-radius: var(--radius-full);
    letter-spacing: 0.01em;
    ${styles[variant]}
  `}
  class={className}
>
  <slot />
</span>
```

- [ ] **Step 10.3: Commit**

```bash
git add src/components/ui/
git commit -m "feat(ui): add Button and Badge primitives"
```

---

## Task 11: Hero section

**Files:**
- Create: `src/components/sections/Hero.astro`

- [ ] **Step 11.1: Create Hero.astro**

Create `src/components/sections/Hero.astro`:

```astro
---
import { Image } from 'astro:assets'
import palPhoto from '@/assets/images/pal.png'
---

<section
  aria-label="Introduction"
  style="padding-block: var(--space-20) var(--space-16);"
>
  <div class="section-container">
    <div
      style="
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-10);
        align-items: center;
      "
    >
      <!-- Text content -->
      <div style="max-width: 44rem;">
        <p
          style="
            font-size: 0.875rem;
            font-weight: 500;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--color-accent);
            margin: 0 0 var(--space-4);
          "
        >
          Platform Engineer · SRE
        </p>

        <h1
          style="
            font-size: var(--text-display);
            font-weight: 700;
            letter-spacing: -0.03em;
            line-height: 1.05;
            color: var(--color-fg);
            margin: 0 0 var(--space-6);
          "
        >
          Javier<br />González
        </h1>

        <p
          style="
            font-size: clamp(1.0625rem, 1.5vw, 1.25rem);
            line-height: 1.65;
            color: color-mix(in oklab, var(--color-fg) 75%, transparent);
            margin: 0;
            max-width: 38rem;
          "
        >
          Over a decade building reliable, scalable infrastructure.
          I automate toil, eliminate drift, and design platforms
          that let engineering teams ship without friction.
        </p>
      </div>

      <!-- Profile photo -->
      <div
        style="
          width: 10rem;
          height: 10rem;
          border-radius: var(--radius-full);
          overflow: hidden;
          border: 2px solid var(--color-border);
          flex-shrink: 0;
        "
      >
        <Image
          src={palPhoto}
          alt="Javier González"
          width={160}
          height={160}
          loading="eager"
          fetchpriority="high"
          style="width:100%; height:100%; object-fit:cover;"
        />
      </div>
    </div>
  </div>
</section>
```

**Note on layout:** Hero uses single column on mobile; add a media query in global.css or use Tailwind classes to create a two-column layout on desktop (text + photo side by side). Add to `global.css`:

```css
/* Hero two-column layout on desktop */
@media (min-width: 768px) {
  .hero-grid {
    grid-template-columns: 1fr auto !important;
  }
}
```

Add `class="hero-grid"` to the grid div in Hero.astro.

- [ ] **Step 11.2: Commit**

```bash
git add src/components/sections/Hero.astro src/styles/global.css
git commit -m "feat(sections): add Hero with profile photo and display typography"
```

---

## Task 12: PersonalDetails + Mindset sections

**Files:**
- Create: `src/components/sections/PersonalDetails.astro`
- Create: `src/components/sections/Mindset.astro`

- [ ] **Step 12.1: Create PersonalDetails.astro**

Create `src/components/sections/PersonalDetails.astro`:

```astro
---
const details = [
  { label: 'Nationality', value: 'Spanish' },
  { label: 'Languages',   value: 'Spanish, English' },
  { label: 'Contact',     value: null }, // rendered as links below
]
---

<section
  aria-label="Personal details"
  style="padding-block: var(--space-8); border-top: 1px solid var(--color-border);"
>
  <div class="section-container">
    <dl
      style="
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-6) var(--space-12);
        margin: 0;
      "
    >
      <div>
        <dt style="font-size:0.75rem; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; color:color-mix(in oklab,var(--color-fg) 50%,transparent); margin-bottom:var(--space-1);">Nationality</dt>
        <dd style="margin:0; font-size:0.9375rem;">Spanish</dd>
      </div>
      <div>
        <dt style="font-size:0.75rem; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; color:color-mix(in oklab,var(--color-fg) 50%,transparent); margin-bottom:var(--space-1);">Languages</dt>
        <dd style="margin:0; font-size:0.9375rem;">Spanish, English</dd>
      </div>
      <div>
        <dt style="font-size:0.75rem; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; color:color-mix(in oklab,var(--color-fg) 50%,transparent); margin-bottom:var(--space-1);">Contact</dt>
        <dd style="margin:0; display:flex; gap:var(--space-4); font-size:0.9375rem;">
          <a href="mailto:javier@kriogman.com" aria-label="Send email to Javier González">Email</a>
          <a href="https://www.linkedin.com/in/kriogman" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in new tab)">LinkedIn</a>
        </dd>
      </div>
    </dl>
  </div>
</section>
```

**Note:** Replace `javier@kriogman.com` with the actual email address before launch.

- [ ] **Step 12.2: Create Mindset.astro**

Create `src/components/sections/Mindset.astro`:

```astro
---
import { mindsetPrinciples } from '@/lib/data'
---

<section
  id="mindset"
  aria-labelledby="mindset-heading"
  style="padding-block: var(--space-20); background: var(--color-muted-bg);"
>
  <div class="section-container">
    <h2
      id="mindset-heading"
      style="
        font-size: var(--text-h2);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin: 0 0 var(--space-12);
        color: var(--color-fg);
      "
    >
      Mindset
    </h2>

    <ol
      role="list"
      style="
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--space-8);
      "
      class="mindset-grid"
    >
      {mindsetPrinciples.map((principle, i) => (
        <li
          style="
            display: flex;
            gap: var(--space-4);
            align-items: flex-start;
          "
        >
          <span
            aria-hidden="true"
            style="
              font-size: 0.75rem;
              font-weight: 700;
              color: var(--color-accent);
              margin-top: 0.375rem;
              min-width: 1.5rem;
              font-variant-numeric: tabular-nums;
            "
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h3
              style="
                font-size: var(--text-h3);
                font-weight: 600;
                margin: 0 0 var(--space-2);
                color: var(--color-fg);
              "
            >
              {principle.headline}
            </h3>
            <p
              style="
                margin: 0;
                font-size: 0.9375rem;
                line-height: 1.7;
                color: color-mix(in oklab, var(--color-fg) 75%, transparent);
              "
            >
              {principle.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  </div>
</section>
```

Add to `global.css`:
```css
@media (min-width: 640px) {
  .mindset-grid {
    grid-template-columns: 1fr 1fr !important;
  }
}
```

- [ ] **Step 12.3: Commit**

```bash
git add src/components/sections/PersonalDetails.astro src/components/sections/Mindset.astro
git commit -m "feat(sections): add PersonalDetails and Mindset"
```

---

## Task 13: WorkExperience section

**Files:**
- Create: `src/components/sections/WorkExperience.astro`

- [ ] **Step 13.1: Create WorkExperience.astro**

Create `src/components/sections/WorkExperience.astro`:

```astro
---
import { workExperience } from '@/lib/data'
---

<section
  id="experience"
  aria-labelledby="experience-heading"
  style="padding-block: var(--space-20);"
>
  <div class="section-container">
    <h2
      id="experience-heading"
      style="
        font-size: var(--text-h2);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin: 0 0 var(--space-12);
      "
    >
      Work Experience
    </h2>

    <ol role="list" style="list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:0;">
      {workExperience.map((entry, i) => (
        <li
          style="
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-2);
            padding-block: var(--space-8);
            border-top: 1px solid var(--color-border);
          "
          class="work-entry"
        >
          <div style="display:flex; flex-wrap:wrap; align-items:baseline; justify-content:space-between; gap:var(--space-2);">
            <h3
              style="
                font-size: var(--text-h3);
                font-weight: 600;
                margin: 0;
                color: var(--color-fg);
              "
            >
              {entry.slug ? (
                <a href={`/${entry.slug}`} style="color:inherit; text-decoration:none; border-bottom:1px solid var(--color-border);">
                  {entry.company}
                </a>
              ) : (
                entry.company
              )}
            </h3>
            <span
              style="
                font-size: 0.8125rem;
                color: color-mix(in oklab, var(--color-fg) 50%, transparent);
                font-variant-numeric: tabular-nums;
                white-space: nowrap;
              "
            >
              {entry.period}
            </span>
          </div>
          <p
            style="
              margin: 0;
              font-size: 0.875rem;
              font-weight: 500;
              color: var(--color-accent);
            "
          >
            {entry.role}
          </p>
          <p
            style="
              margin: 0;
              font-size: 0.9375rem;
              line-height: 1.7;
              color: color-mix(in oklab, var(--color-fg) 75%, transparent);
              max-width: 56rem;
            "
          >
            {entry.description}
          </p>
        </li>
      ))}
      <!-- Close the last border -->
      <li style="border-top: 1px solid var(--color-border); padding-top:0;" aria-hidden="true" />
    </ol>
  </div>
</section>
```

Add to `global.css`:
```css
@media (min-width: 640px) {
  .work-entry {
    grid-template-columns: 1fr !important;
  }
}
```

- [ ] **Step 13.2: Commit**

```bash
git add src/components/sections/WorkExperience.astro
git commit -m "feat(sections): add WorkExperience timeline"
```

---

## Task 14: TechGrid, Studies, FinalProject, CtaFinal

**Files:**
- Create: `src/components/sections/TechGrid.astro`
- Create: `src/components/sections/Studies.astro`
- Create: `src/components/sections/FinalProject.astro`
- Create: `src/components/sections/CtaFinal.astro`

- [ ] **Step 14.1: Create TechGrid.astro**

Create `src/components/sections/TechGrid.astro`:

```astro
---
import { techStack } from '@/lib/data'

// Astro doesn't support dynamic image imports easily — we use public path for SVGs
// The SVGs are served from public/icons/skills/ (copy step below)
---

<section
  id="skills"
  aria-labelledby="skills-heading"
  style="padding-block: var(--space-20); background: var(--color-muted-bg);"
>
  <div class="section-container">
    <h2
      id="skills-heading"
      style="font-size:var(--text-h2); font-weight:700; letter-spacing:-0.02em; margin:0 0 var(--space-12);"
    >
      Work Expertise
    </h2>

    <ul
      role="list"
      style="
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
        gap: var(--space-6);
      "
    >
      {techStack.map(({ name, iconFile }) => (
        <li
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--space-2);
          "
        >
          <img
            src={`/icons/skills/${iconFile}`}
            alt=""
            aria-hidden="true"
            width="40"
            height="40"
            loading="lazy"
            style="width:2.5rem; height:2.5rem; object-fit:contain;"
          />
          <span
            style="
              font-size: 0.75rem;
              font-weight: 500;
              color: color-mix(in oklab, var(--color-fg) 70%, transparent);
              text-align: center;
            "
          >
            {name}
          </span>
        </li>
      ))}
    </ul>
  </div>
</section>
```

**Copy SVGs to public for static serving:**
```bash
mkdir -p public/icons/skills
cp src/assets/icons/skills/*.svg public/icons/skills/
```

- [ ] **Step 14.2: Create Studies.astro**

Create `src/components/sections/Studies.astro`:

```astro
---
import { studies } from '@/lib/data'
---

<section
  id="studies"
  aria-labelledby="studies-heading"
  style="padding-block: var(--space-20);"
>
  <div class="section-container">
    <h2
      id="studies-heading"
      style="font-size:var(--text-h2); font-weight:700; letter-spacing:-0.02em; margin:0 0 var(--space-12);"
    >
      Studies
    </h2>

    <ol role="list" style="list-style:none; margin:0; padding:0; display:flex; flex-direction:column;">
      {studies.map((entry) => (
        <li
          style="
            padding-block: var(--space-6);
            border-top: 1px solid var(--color-border);
            display: flex;
            flex-wrap: wrap;
            align-items: baseline;
            justify-content: space-between;
            gap: var(--space-2);
          "
        >
          <div>
            <h3 style="font-size:1rem; font-weight:600; margin:0 0 var(--space-1);">{entry.degree}</h3>
            <p style="margin:0; font-size:0.9375rem; color:color-mix(in oklab, var(--color-fg) 70%, transparent);">{entry.school}</p>
          </div>
          <span style="font-size:0.8125rem; color:color-mix(in oklab, var(--color-fg) 50%, transparent);">{entry.location}</span>
        </li>
      ))}
      <li style="border-top:1px solid var(--color-border);" aria-hidden="true" />
    </ol>
  </div>
</section>
```

- [ ] **Step 14.3: Create FinalProject.astro**

Create `src/components/sections/FinalProject.astro`:

```astro
---
import Button from '@/components/ui/Button.astro'
---

<section
  aria-labelledby="tfg-heading"
  style="padding-block: var(--space-12);"
>
  <div class="section-container">
    <div
      style="
        border: 1px solid var(--color-border);
        border-left: 3px solid var(--color-accent);
        border-radius: var(--radius-lg);
        padding: var(--space-8);
        background: var(--color-surface);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-6);
      "
    >
      <div>
        <p
          style="font-size:0.75rem; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; color:var(--color-accent); margin:0 0 var(--space-2);"
        >
          Final Degree Project
        </p>
        <h2
          id="tfg-heading"
          style="font-size:var(--text-h3); font-weight:700; margin:0 0 var(--space-2);"
        >
          Zigbee Gateway for IoT Environment
        </h2>
        <p style="margin:0; font-size:0.9375rem; color:color-mix(in oklab,var(--color-fg) 70%,transparent); max-width:42rem;">
          End-to-end smart home system connecting Zigbee sensors and actuators to a
          cloud-accessible interface via Raspberry Pi, MQTT, and AWS IoT Core.
        </p>
      </div>
      <Button as="link" href="/iot" variant="secondary" size="sm">
        View project →
      </Button>
    </div>
  </div>
</section>
```

- [ ] **Step 14.4: Create CtaFinal.astro**

Create `src/components/sections/CtaFinal.astro`:

```astro
---
import Button from '@/components/ui/Button.astro'
---

<section
  aria-labelledby="cta-heading"
  style="
    padding-block: var(--space-24);
    text-align: center;
  "
>
  <div class="section-container" style="max-width:40rem;">
    <h2
      id="cta-heading"
      style="
        font-size: var(--text-h1);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin: 0 0 var(--space-6);
        line-height: 1.15;
      "
    >
      Let's Build Something<br />Together
    </h2>
    <p
      style="
        font-size: 1.0625rem;
        line-height: 1.7;
        color: color-mix(in oklab, var(--color-fg) 70%, transparent);
        margin: 0 0 var(--space-8);
      "
    >
      Available for infrastructure consulting, SRE engagements, and platform
      engineering roles. Reach out on LinkedIn or by email.
    </p>
    <div style="display:flex; flex-wrap:wrap; gap:var(--space-4); justify-content:center;">
      <Button as="link" href="https://www.linkedin.com/in/kriogman" external variant="primary" size="lg">
        Connect on LinkedIn
      </Button>
      <Button as="link" href="mailto:javier@kriogman.com" variant="secondary" size="lg">
        Send an email
      </Button>
    </div>
  </div>
</section>
```

- [ ] **Step 14.5: Commit**

```bash
git add src/components/sections/ public/icons/
git commit -m "feat(sections): add TechGrid, Studies, FinalProject, and CtaFinal"
```

---

## Task 15: Assemble index.astro

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 15.1: Replace index.astro with full home page**

Replace the contents of `src/pages/index.astro`:

```astro
---
import PageLayout from '@/components/layouts/PageLayout.astro'
import Hero from '@/components/sections/Hero.astro'
import PersonalDetails from '@/components/sections/PersonalDetails.astro'
import Mindset from '@/components/sections/Mindset.astro'
import WorkExperience from '@/components/sections/WorkExperience.astro'
import TechGrid from '@/components/sections/TechGrid.astro'
import Studies from '@/components/sections/Studies.astro'
import FinalProject from '@/components/sections/FinalProject.astro'
import CtaFinal from '@/components/sections/CtaFinal.astro'
---

<PageLayout
  title="Javier González"
  description="Platform Engineer & SRE with 10+ years building reliable, scalable infrastructure on Kubernetes, AWS, and Terraform."
  isHomePage
>
  <Hero />
  <PersonalDetails />
  <Mindset />
  <WorkExperience />
  <TechGrid />
  <Studies />
  <FinalProject />
  <CtaFinal />
</PageLayout>
```

- [ ] **Step 15.2: Build and preview**

```bash
pnpm build && pnpm preview
```

Open `http://localhost:4321` and manually verify:
- [ ] Page loads with no console errors
- [ ] All 8 sections visible
- [ ] Hero photo renders
- [ ] Tech grid shows all 16 icons
- [ ] Work experience lists all 5 companies; 3 have links (2gether, fintonic, kimia)
- [ ] ThemeToggle switches theme cleanly (no flash)
- [ ] Tab through page: focus visible on all interactive elements
- [ ] Skip link appears on first Tab press

- [ ] **Step 15.3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat(pages): assemble home page from all sections"
```

---

## Task 16: 404 page + stub pages

**Files:**
- Create: `src/pages/404.astro`
- Create: `src/pages/2gether.astro`
- Create: `src/pages/fintonic.astro`
- Create: `src/pages/kimia.astro`
- Create: `src/pages/iot.astro`

- [ ] **Step 16.1: Create 404.astro**

Create `src/pages/404.astro`:

```astro
---
import PageLayout from '@/components/layouts/PageLayout.astro'
---

<PageLayout
  title="Page not found"
  description="The page you are looking for does not exist."
  noindex
>
  <div
    class="section-container"
    style="
      min-height: 60vh;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding-block: var(--space-24);
    "
  >
    <p
      style="
        font-size: 0.75rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--color-accent);
        margin: 0 0 var(--space-4);
      "
    >
      404
    </p>
    <h1
      style="
        font-size: var(--text-h1);
        font-weight: 700;
        letter-spacing: -0.02em;
        margin: 0 0 var(--space-4);
      "
    >
      Page not found
    </h1>
    <p
      style="
        font-size: 1.0625rem;
        line-height: 1.7;
        color: color-mix(in oklab, var(--color-fg) 70%, transparent);
        margin: 0 0 var(--space-8);
      "
    >
      The page you are looking for doesn't exist or has moved.
    </p>
    <a
      href="/"
      style="
        color: var(--color-accent);
        font-weight: 500;
        text-decoration: none;
        border-bottom: 1px solid var(--color-accent);
      "
    >
      ← Back to home
    </a>
  </div>
</PageLayout>
```

- [ ] **Step 16.2: Create stub pages**

Create `src/pages/2gether.astro`:

```astro
---
import PageLayout from '@/components/layouts/PageLayout.astro'
import Button from '@/components/ui/Button.astro'
---

<PageLayout
  title="2gether — Site Reliability Engineer"
  description="Case study coming soon: SRE at 2gether, a regulated digital bank."
>
  <div class="section-container" style="min-height:60vh; display:flex; flex-direction:column; justify-content:center; padding-block:var(--space-24);">
    <p style="font-size:0.75rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--color-accent); margin:0 0 var(--space-4);">Case Study</p>
    <h1 style="font-size:var(--text-h1); font-weight:700; letter-spacing:-0.02em; margin:0 0 var(--space-4);">2gether</h1>
    <p style="font-size:1.0625rem; line-height:1.7; color:color-mix(in oklab, var(--color-fg) 70%, transparent); margin:0 0 var(--space-8); max-width:40rem;">
      Site Reliability Engineer · 2021 – 2022. Full case study coming soon.
    </p>
    <Button as="link" href="/" variant="secondary" size="sm">← Back to home</Button>
  </div>
</PageLayout>
```

Create `src/pages/fintonic.astro` (same structure, different content):

```astro
---
import PageLayout from '@/components/layouts/PageLayout.astro'
import Button from '@/components/ui/Button.astro'
---

<PageLayout
  title="Fintonic — DevOps Engineer"
  description="Case study coming soon: DevOps at Fintonic, personal finance platform."
>
  <div class="section-container" style="min-height:60vh; display:flex; flex-direction:column; justify-content:center; padding-block:var(--space-24);">
    <p style="font-size:0.75rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--color-accent); margin:0 0 var(--space-4);">Case Study</p>
    <h1 style="font-size:var(--text-h1); font-weight:700; letter-spacing:-0.02em; margin:0 0 var(--space-4);">Fintonic</h1>
    <p style="font-size:1.0625rem; line-height:1.7; color:color-mix(in oklab, var(--color-fg) 70%, transparent); margin:0 0 var(--space-8); max-width:40rem;">
      DevOps Engineer · 2017 – 2020. Full case study coming soon.
    </p>
    <Button as="link" href="/" variant="secondary" size="sm">← Back to home</Button>
  </div>
</PageLayout>
```

Create `src/pages/kimia.astro`:

```astro
---
import PageLayout from '@/components/layouts/PageLayout.astro'
import Button from '@/components/ui/Button.astro'
---

<PageLayout
  title="Kimia — Junior Systems Architect"
  description="Case study coming soon: Systems Architect at Kimia, global ad-tech."
>
  <div class="section-container" style="min-height:60vh; display:flex; flex-direction:column; justify-content:center; padding-block:var(--space-24);">
    <p style="font-size:0.75rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--color-accent); margin:0 0 var(--space-4);">Case Study</p>
    <h1 style="font-size:var(--text-h1); font-weight:700; letter-spacing:-0.02em; margin:0 0 var(--space-4);">Kimia</h1>
    <p style="font-size:1.0625rem; line-height:1.7; color:color-mix(in oklab, var(--color-fg) 70%, transparent); margin:0 0 var(--space-8); max-width:40rem;">
      Junior Systems Architect · 2015 – 2017. Full case study coming soon.
    </p>
    <Button as="link" href="/" variant="secondary" size="sm">← Back to home</Button>
  </div>
</PageLayout>
```

Create `src/pages/iot.astro`:

```astro
---
import PageLayout from '@/components/layouts/PageLayout.astro'
import Button from '@/components/ui/Button.astro'
---

<PageLayout
  title="Zigbee IoT Gateway — Final Degree Project"
  description="End-to-end smart home gateway connecting Zigbee sensors to AWS IoT Core via Raspberry Pi and MQTT."
>
  <div class="section-container" style="min-height:60vh; display:flex; flex-direction:column; justify-content:center; padding-block:var(--space-24);">
    <p style="font-size:0.75rem; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--color-accent); margin:0 0 var(--space-4);">Final Degree Project</p>
    <h1 style="font-size:var(--text-h1); font-weight:700; letter-spacing:-0.02em; margin:0 0 var(--space-4);">Zigbee Gateway for IoT</h1>
    <p style="font-size:1.0625rem; line-height:1.7; color:color-mix(in oklab, var(--color-fg) 70%, transparent); margin:0 0 var(--space-8); max-width:40rem;">
      Full write-up coming soon. Meanwhile: Zigbee · MQTT · Mosquitto · Raspberry Pi · AWS IoT Core · Node-RED.
    </p>
    <Button as="link" href="/" variant="secondary" size="sm">← Back to home</Button>
  </div>
</PageLayout>
```

- [ ] **Step 16.3: Verify 404 status code**

Astro needs `export const prerender = false` on the 404 or a static fallback. For GitHub Pages static hosting, a `404.html` file is all that's needed. Verify:

```bash
pnpm build && ls dist/
```

Expected: `dist/404.html` exists.

- [ ] **Step 16.4: Commit**

```bash
git add src/pages/
git commit -m "feat(pages): add 404 page and stub pages for project case studies"
```

---

## Task 17: Sitemap + robots.txt

**Files:**
- Create: `public/robots.txt`

The sitemap is auto-generated by `@astrojs/sitemap` during `pnpm build`.

- [ ] **Step 17.1: Create robots.txt**

Create `public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://kriogman.com/sitemap-index.xml
```

- [ ] **Step 17.2: Verify sitemap generation**

```bash
pnpm build
ls dist/sitemap*.xml
```

Expected: `dist/sitemap-index.xml` and `dist/sitemap-0.xml` exist.

Inspect the sitemap to confirm all pages are listed (index, 2gether, fintonic, kimia, iot) and 404 is excluded:

```bash
cat dist/sitemap-0.xml
```

- [ ] **Step 17.3: Commit**

```bash
git add public/robots.txt
git commit -m "feat(seo): add robots.txt; sitemap auto-generated by @astrojs/sitemap"
```

---

## Task 18: E2E accessibility smoke tests

**Files:**
- Create: `tests/e2e/smoke.spec.ts`
- Create: `playwright.config.ts`

- [ ] **Step 18.1: Install Playwright browsers**

```bash
npx playwright install chromium
```

- [ ] **Step 18.2: Create playwright.config.ts**

Create `playwright.config.ts`:

```ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:4321',
  },
  webServer: {
    command: 'pnpm preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env['CI'],
  },
})
```

- [ ] **Step 18.3: Write smoke tests**

Create `tests/e2e/smoke.spec.ts`:

```ts
import { test, expect } from '@playwright/test'
import AxeBuilder from 'axe-playwright'

test.describe('Home page', () => {
  test('loads without JS errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    await page.goto('/')
    expect(errors).toHaveLength(0)
  })

  test('has correct page title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Javier González/)
  })

  test('has one h1', async ({ page }) => {
    await page.goto('/')
    const h1s = await page.locator('h1').count()
    expect(h1s).toBe(1)
  })

  test('skip link is present and functional', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    const skipLink = page.getByText('Skip to main content')
    await expect(skipLink).toBeVisible()
  })

  test('theme toggle switches data-theme attribute', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const toggleBtn = page.getByRole('button', { name: /switch to (dark|light) mode/i })
    await toggleBtn.click()
    const theme = await html.getAttribute('data-theme')
    expect(['light', 'dark']).toContain(theme)
  })

  test('passes axe accessibility audit', async ({ page }) => {
    await page.goto('/')
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()
    expect(results.violations).toHaveLength(0)
  })
})

test.describe('404 page', () => {
  test('returns 404 status', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist')
    expect(response?.status()).toBe(404)
  })

  test('has link back to home', async ({ page }) => {
    await page.goto('/this-does-not-exist')
    await expect(page.getByRole('link', { name: /back to home/i })).toBeVisible()
  })
})

test.describe('Stub pages', () => {
  for (const slug of ['2gether', 'fintonic', 'kimia', 'iot']) {
    test(`/${slug} loads and links back home`, async ({ page }) => {
      await page.goto(`/${slug}`)
      await expect(page.getByRole('link', { name: /back to home/i })).toBeVisible()
    })
  }
})
```

- [ ] **Step 18.4: Run tests**

```bash
pnpm build && pnpm test:e2e
```

Expected: all tests pass. If any axe violations appear, fix the issue before moving on (do not suppress the test).

- [ ] **Step 18.5: Commit**

```bash
git add tests/ playwright.config.ts
git commit -m "test(e2e): add accessibility and smoke tests with axe-playwright"
```

---

## Task 19: Final build verification

- [ ] **Step 19.1: Full quality gate**

```bash
pnpm typecheck
pnpm test
pnpm build
```

All three must pass with zero errors before proceeding.

- [ ] **Step 19.2: Lighthouse audit**

```bash
pnpm preview &
sleep 3
npx lighthouse http://localhost:4321 \
  --preset=perf \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json \
  --output-path=lighthouse-report.json \
  --chrome-flags="--headless"
cat lighthouse-report.json | grep -E '"score"' | head -8
```

Target scores (mobile):
- Performance: ≥ 0.95
- Accessibility: 1.0
- Best Practices: 1.0
- SEO: 1.0

If Performance < 0.95, investigate LCP: check that `fetchpriority="high"` is set on the hero photo, font is preloaded, and no render-blocking resources.

- [ ] **Step 19.3: Manual dark mode check**

Open `http://localhost:4321` and verify:
- Light mode: Lavender Blush bg, Shadow Grey text, Blue Slate links
- Click ThemeToggle: switches to dark (Shadow Grey bg, Lavender Blush text, Ash Grey links)
- Refresh in dark mode: page loads in dark mode without flash (FOUC prevention working)
- System dark mode (toggle in OS): page responds correctly when no localStorage value is set

- [ ] **Step 19.4: Final commit**

```bash
git add -A
git commit -m "chore: Phase 1 complete — home page, layout, stubs, a11y tests"
```

---

## Self-review checklist

### Spec coverage

| Requirement | Task |
|---|---|
| Astro 5 + React 19 + Tailwind v4 + TypeScript strict + pnpm | Task 1 |
| IBM Plex Sans self-hosted variable font | Tasks 3, 7 |
| WCAG 2.2 AA contrast — validated in tokens | Task 2 |
| Dark mode: prefers-color-scheme + manual toggle + localStorage | Tasks 2, 7, 8 |
| Skip link | Task 7 (global.css), BaseLayout |
| Hero: name, role, bio, photo | Task 11 |
| PersonalDetails: nationality, languages, contact links (no email visible) | Task 12 |
| Mindset: 6 principles | Task 12 |
| WorkExperience: 5 entries, links to sub-pages where applicable | Task 13 |
| TechGrid: 16 technology logos | Task 14 |
| Studies: 2 degrees | Task 14 |
| FinalProject callout → /iot | Task 14 |
| CtaFinal with CTA buttons | Task 14 |
| 404 page (returns 404 status) | Task 16 |
| Stub pages for 2gether, fintonic, kimia, iot | Task 16 |
| Sitemap (@astrojs/sitemap) | Task 17 |
| robots.txt | Task 17 |
| Structured data (Person schema) | Task 7 |
| SVG icons optimized with svgo | Task 6 |
| No Framer Motion | ✅ Not added anywhere |
| One icon library (Lucide) | ✅ Only in ThemeToggle |
| No jQuery, no CSS-in-JS runtime | ✅ |
| Playwright e2e + axe accessibility tests | Task 18 |
| Lighthouse 95+ target | Task 19 |
| Quadrant sub-page omitted (current employer) | ✅ `slug: null` in data.ts |

### Known TODOs before go-live (not in Phase 1 scope)

1. Replace `javier@kriogman.com` in PersonalDetails and CtaFinal with actual email
2. Verify LinkedIn URL slug is `kriogman`
3. Generate a real OG image (1200×630) — current is placeholder
4. Verify IBM Plex Sans Variable font downloads correctly from the CDN URL in Task 3.1; if not, fall back to downloading from `https://github.com/IBM/plex/releases` manually
5. Add `prerender` export if needed for 404 on SSR-adjacent setups (not needed for pure SSG + GitHub Pages)
