---
name: seo-technical
description: Use this skill when creating a new page, modifying metadata, working on the sitemap, robots.txt, structured data, or anything that affects how search engines crawl and render the site. On a marketing site this is a core feature, not an afterthought. Read this when adding any `.astro` page or dynamic route.
---

# Technical SEO

The goal: every page is crawlable, indexable when it should be, rich when it appears in SERPs, and fast to render. Marketing teams will ask about SEO constantly — we ship it correctly by default so the conversation is short.

## Per-page metadata

Every page gets a `<Seo>` component or equivalent layout prop. Required fields:

```astro
---
// Every page must pass these
type Props = {
  title: string         // Max 60 chars, includes brand. "Page title — Brand"
  description: string   // 140–160 chars. Unique per page. Actually describes the page.
  canonical?: string    // Absolute URL. Defaults to current page.
  ogImage?: string      // 1200x630, under 300KB, absolute URL
  noindex?: boolean     // Only for staging, thank-you pages, internal tools
}
---

<head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical ?? Astro.url.href} />

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage ?? '/og-default.png'} />
  <meta property="og:url" content={Astro.url.href} />

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage ?? '/og-default.png'} />

  {noindex && <meta name="robots" content="noindex, nofollow" />}
</head>
```

### Rules
- **Title**: specific and unique per page. Never "Home" or "Untitled". Front-load the keyword.
- **Description**: a benefit-led sentence, not a keyword stuffing. Google rewrites bad ones anyway.
- **Canonical**: always set. Prevents duplicate content issues from query params (`?utm=...`).
- **OG image**: 1200×630, under 300KB. If you don't have a per-page one, use a well-designed default. Test with the [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/).

## Structured data (JSON-LD)

Add Schema.org markup where it applies. It doesn't guarantee rich results, but without it you never get them.

### Always on every page
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Brand Name",
  "url": "https://example.com",
  "logo": "https://example.com/logo.png",
  "sameAs": [
    "https://twitter.com/brand",
    "https://linkedin.com/company/brand"
  ]
}
</script>
```

### Per page type
- **Homepage**: `WebSite` with `SearchAction` (enables sitelinks search box)
- **Blog posts**: `Article` or `BlogPosting` with author, datePublished, image
- **Product pages**: `Product` with offers, aggregateRating
- **FAQ sections**: `FAQPage` (be careful — Google has pulled back on showing these)
- **Case studies**: `Article` with `about`

Validate with the [Rich Results Test](https://search.google.com/test/rich-results) before shipping.

## Sitemap

Use `@astrojs/sitemap`. Config in `astro.config.mjs`:

```js
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap({
    filter: (page) => !page.includes('/thank-you') && !page.includes('/404'),
    changefreq: 'weekly',
    priority: 0.7,
  })]
})
```

Sitemap is referenced in `robots.txt`:

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /thank-you

Sitemap: https://example.com/sitemap-index.xml
```

## Indexability

Before launching, audit for these common mistakes:

- [ ] Staging environment has `X-Robots-Tag: noindex` header OR password protection. Never let staging rank.
- [ ] `robots.txt` allows crawling of CSS/JS (Google needs these to render).
- [ ] No accidental `noindex` on important pages (check every template).
- [ ] No `rel="nofollow"` on internal links.
- [ ] Query parameter URLs have canonical pointing to the clean version.

## URLs

- **Lowercase, hyphens, no trailing slash** (pick one strategy and enforce with redirects).
- **Meaningful paths**: `/pricing` not `/page-2`.
- **Stable**: don't change URLs. If you must, 301 redirect. Never 302 for permanent moves.
- **Short but readable**: `/features/analytics` beats `/feature-analytics-real-time-dashboard`.

## Content structure

- One `<h1>` per page. It should match or closely relate to the title tag.
- Headings in hierarchical order. No skipping h2 → h4.
- Internal linking: every important page reachable in 3 clicks from the homepage.
- Descriptive link text. Never "click here" or "learn more" without context.

## Images for SEO

- Meaningful `alt` text on content images. Not keyword-stuffed, just descriptive.
- Compressed AVIF/WebP (see `performance-marketing`).
- Filename matters marginally: `hero-analytics-dashboard.webp` > `IMG_4829.webp`.

## Performance IS SEO

Google uses CWV as a ranking signal. Everything in `performance-marketing` applies here. A slow page with perfect metadata still loses.

## International / hreflang (if applicable)

If the site serves multiple languages:
- One URL per language (e.g., `/en/`, `/es/`, `/de/`).
- `hreflang` tags on every page referring to every language version.
- `x-default` for the fallback.

Don't use auto-redirect based on Accept-Language. Let the user choose.

## What NOT to do

- Don't put keywords in hidden text or with `color: same-as-background`. It's a penalty, and Google is very good at catching it.
- Don't buy backlinks. Ever.
- Don't use "SEO paragraphs" that read like they were written for a robot. They were written for humans who now include AI summarizers; good copy wins.
- Don't ignore search console warnings. Fix them weekly.
- Don't noindex the entire site "just in case" during launch. Plan the launch sequence.

## Launch checklist

Before DNS cutover:
- [ ] `robots.txt` allows crawling
- [ ] Sitemap submitted to Google Search Console & Bing Webmaster Tools
- [ ] Every page has unique title + description
- [ ] Canonical URLs correct
- [ ] OG tags render correctly (check with social debuggers)
- [ ] Structured data validates
- [ ] 404 page returns actual 404 status (not 200)
- [ ] Old URLs (if migration) 301 redirect to new ones
- [ ] Analytics set up with consent gating
