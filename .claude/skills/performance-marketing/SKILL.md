---
name: performance-marketing
description: Use this skill when working with images, fonts, third-party scripts, hero sections, above-the-fold content, or before merging anything to main. Defines the Core Web Vitals budget we hold ourselves to and the concrete techniques to hit it. On a marketing/landing site, performance is a conversion lever — not a nice-to-have. Read before adding any asset, dependency, or animated component.
---

# Performance (Marketing)

On a landing page, performance is money. LCP over 2.5s measurably reduces conversion. Google uses CWV as a ranking signal. We target **Lighthouse 95+** and real-user CWV in the "Good" band.

## Budget

| Metric | Target | Hard fail |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.0s | > 2.5s |
| **CLS** (Cumulative Layout Shift) | < 0.05 | > 0.1 |
| **INP** (Interaction to Next Paint) | < 150ms | > 200ms |
| **TTFB** | < 400ms | > 800ms |
| **Total JS (landing page)** | < 100KB gzipped | > 200KB |
| **Total page weight** | < 1MB | > 2MB |

Measured on mobile, simulated 4G, mid-tier device. If it passes there, desktop is fine.

## Images

The single biggest lever. Get this right and half the work is done.

### Formats
- AVIF for photos (40% smaller than WebP). WebP fallback.
- SVG for icons, logos, simple illustrations.
- Never JPEG or PNG in production unless there's a specific reason.

### Responsive
Use Astro's `<Image>` or `<Picture>` component:

```astro
---
import { Image } from 'astro:assets'
import heroImage from '@/assets/hero.jpg'
---

<Image
  src={heroImage}
  alt="..."
  widths={[400, 800, 1200, 1600]}
  sizes="(min-width: 1024px) 1200px, 100vw"
  formats={['avif', 'webp']}
  loading="eager"
  fetchpriority="high"
/>
```

### Loading strategy
- **LCP image** (hero): `loading="eager"` and `fetchpriority="high"`. Everything else: `loading="lazy"`.
- Never lazy-load above-the-fold images. It delays LCP.
- Always set explicit `width` and `height` (or aspect-ratio via CSS). Prevents CLS.

### Don't
- No background images via CSS `background-image` for LCP content. The browser discovers them late.
- No image CDN for assets that don't need transforms (static SVGs, icons).
- No 4K images served to mobile.

## Fonts

Second biggest lever. Fonts block render and cause layout shift.

### Rules
- **Self-host**. Don't use Google Fonts CDN. Download, subset, serve from our domain.
- **WOFF2 only**. Forget WOFF/TTF/EOT.
- **Subset** to the characters you use. If the site is Spanish/English, subset to Latin. Saves 50-70% file size.
- **`font-display: swap`** in `@font-face`.
- **Preload** the font used for LCP text (usually the hero heading):
  ```html
  <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
  ```
- **Variable fonts** when available (one file for all weights).

### CLS from fonts
Use `size-adjust`, `ascent-override`, `descent-override` in `@font-face` to match the fallback's metrics. Or use Next/Font / Astro's built-in font handling which do this automatically.

## JavaScript

### Measure before adding
Before installing any library, check bundlephobia.com or run `pnpm build` and check the diff. A 50KB library for one small feature is a bad trade on a landing page.

### Code splitting
- Astro does this natively — each page gets its own bundle.
- For React islands, only ship the component that's interactive. Not the whole UI kit.
- Use `client:visible` over `client:load` for anything below the fold.

### Third-party scripts
The usual performance killers. Rules:
- **Defer or lazy-load everything non-essential**. Analytics, chat widgets, A/B test tools.
- **Consent-gate** tracking scripts. Don't load GA/Meta Pixel until consent.
- **Use Partytown** for heavy third-party scripts that can run in a worker (GTM, analytics).
- **Inline critical, defer the rest**:
  ```html
  <script src="/analytics.js" defer></script>
  ```
- **Audit regularly**. Every new script is permanent debt. Push back when marketing asks for "just one more pixel."

### Never ship
- jQuery (you don't need it, ever)
- Moment.js (use date-fns or Intl.DateTimeFormat)
- Lodash full import (use `lodash-es` with specific imports, or just don't)
- Polyfills for browsers nobody uses (target last 2 versions, ES2022)

## CSS

- Critical CSS inlined in `<head>` for above-the-fold (Astro does this).
- Avoid CSS-in-JS runtime. Tailwind compiles to static CSS — no runtime cost.
- Purge unused Tailwind classes (v4 does this automatically).
- Avoid `@import` chains in CSS; use PostCSS/Astro's bundler.

## Third-party embeds

Videos, maps, social embeds — the worst offenders. Patterns:

- **YouTube**: use lite-youtube-embed. Don't embed the full iframe until user clicks play.
- **Maps**: lazy-load, or use a static map image with "view on map" link.
- **Tweets / social posts**: screenshot + link. Native embeds ship 200KB+ of JS each.
- **Analytics**: see "Third-party scripts" above.

## Measuring

Before every release:

```bash
pnpm build
pnpm preview
npx lighthouse http://localhost:4321 --preset=perf --view
```

Check:
1. Lighthouse Performance ≥ 95
2. LCP element is what you expect (the hero image/heading, not something weird)
3. No CLS contributors
4. No long tasks over 200ms

Real-user monitoring: enable Vercel Analytics / Cloudflare Web Analytics / Plausible (in that order of preference, depending on hosting). Monitor 75th percentile, not median.

## Red flags in code review

- New dependency added without bundle delta discussion
- `client:load` on a component that could be `client:visible` or `client:idle`
- Hero image without `fetchpriority="high"`
- Any `loading="lazy"` above the fold
- Inline `<style>` tags over 2KB
- `useEffect` running on every render
- `setInterval` / `requestAnimationFrame` left running when not visible
- `document.querySelector` in React components (sign of escape hatch)
