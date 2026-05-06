---
name: stitch-integration
description: Use this skill whenever you interact with the Stitch MCP or when the user references a Stitch design (Google Stitch / stitch.withgoogle.com). It defines the workflow for turning a Stitch design into production code without importing its defaults wholesale. Invoke this skill BEFORE writing any code derived from a Stitch output, and read `design-tokens` and `component-authoring` alongside it.
---

# Stitch Integration

Stitch generates fast, visually coherent designs. It does NOT generate production code for your project. Treat its output as a reference, not a paste target.

## Workflow

When a Stitch design comes in (via MCP or a link):

### 1. Extract, don't import

Go through the design and pull out:
- **Tokens** — colors, font sizes, spacing, radii. Map each one to an existing token in `src/styles/tokens.css`. If something doesn't map, add a token (see `design-tokens` skill for the rules).
- **Layout structure** — grid vs flex, breakpoints, gap sizes. Describe it in plain terms before writing code.
- **Components** — identify reusable blocks (Hero, FeatureCard, PricingTier). Those become components, not one-off divs.
- **Copy** — pull text into content/ or a typed constants file, never hardcode strings in components.

### 2. Map Stitch primitives to ours

Stitch will suggest generic structures. Re-map them:

| Stitch output | Our code |
|---|---|
| Plain `<button class="...">` | `<Button variant="...">` from `@/components/ui/Button` |
| Raw hex colors | Semantic tokens (`bg-accent`, `text-fg`) |
| Pixel values for spacing | Tailwind scale (`p-4`, `gap-6`) |
| Generic section div | `<section>` from `@/components/sections/*` with semantic role |
| Custom icon SVGs | Icon set already in the project (check `src/assets/icons/` or Lucide) |

### 3. Respect semantic HTML

Stitch often produces div soup. Before committing:
- Replace `<div class="header">` with `<header>`
- Replace `<div class="nav">` with `<nav aria-label="...">`
- Replace `<div class="hero">` with `<section aria-labelledby="...">`
- One `<h1>` per page. If Stitch puts two, promote one and demote the other.

### 4. Strip presentational scaffolding

Stitch outputs often include:
- Wrapping `<div>`s that do nothing
- Absolute positioning where flex/grid would do
- Inline styles
- Width/height locks that kill responsiveness

Remove them. The resulting markup should be simpler than what Stitch produced, not a verbatim copy.

### 5. Responsive by default

A Stitch design is usually rendered at one width. Before shipping:
- Check each section at 360px, 768px, 1024px, 1440px.
- Use container queries (`@container`) over media queries when the component should adapt to its parent, not the viewport.
- Images get responsive `srcset` / `sizes` (see `performance-marketing`).

## Quality gates

Before marking a Stitch-derived section done:

- [ ] Zero hex colors in the final code (all via tokens)
- [ ] Zero hardcoded `px` for spacing
- [ ] Uses our UI primitives (Button, Card, etc.) not raw elements
- [ ] Semantic HTML (sections, headings, landmarks)
- [ ] Works at 360px without horizontal scroll
- [ ] Keyboard navigable
- [ ] No orphan `<div>` wrappers with no purpose
- [ ] Copy moved to content or constants, not inlined

## Red flags in Stitch output

If you see these, don't copy them:

- **Fixed heights on text containers** (`h-[240px]` on a paragraph). Text must be able to reflow.
- **Absolute positioning for layout** (outside of overlays/tooltips). Use flex/grid.
- **Z-index wars** (z-50, z-99, z-9999). If you need more than z-10, z-20, z-30, the layering is wrong.
- **Duplicate media queries** for every breakpoint. Tailwind's mobile-first approach solves this.
- **Inline SVGs with 200+ nodes**. Pull into an `.svg` asset and reference.

## When Stitch and our system disagree

Stitch is a starting point. Our system wins. If Stitch produces something that violates `design-tokens`, `component-authoring`, or `accessibility`, fix the code. Don't add tokens or exceptions just because Stitch suggested it.

Exception: if the Stitch design reveals a gap in our tokens (e.g., we need a new semantic color for "success" and don't have one), extend the token layer properly. That's a legit outcome.
