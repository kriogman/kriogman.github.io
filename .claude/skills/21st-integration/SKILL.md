---
name: 21st-integration
description: Use this skill whenever you install, import, or adapt a component from 21st.dev — whether through the Magic MCP (`/ui`, `magic.21st.dev`), a copy-paste snippet, or the 21st.dev component library directly. Covers how to integrate third-party components without poisoning the design system, what to strip, what to keep, and when NOT to use 21st.dev at all. Read alongside `design-tokens` and `component-authoring`.
---

# 21st.dev Integration

21st.dev ships polished React components fast. Great for animations, hero sections, bento grids, and things that would take a day to build from scratch. But each component is authored in isolation, with its own colors, fonts, motion values, and dependencies. Dump them in raw and your project becomes a frankenstein.

## When to use a 21st.dev component

✅ Good fit:
- A specific visual pattern you don't want to build (animated gradient background, infinite testimonial marquee, 3D card hover)
- A one-off section where the wow-factor is the point (hero, CTA)
- Something that uses Framer Motion / GSAP well and you'd do worse

❌ Bad fit:
- Basic primitives (Button, Input, Card) — you have those
- Accessible widgets (Dialog, Menu, Tabs) — use Radix, not 21st.dev. 21st.dev components rarely handle a11y properly.
- Layout primitives (Container, Grid) — build these once, use forever
- Anything that can be done in under 30 minutes with Tailwind

If what you need is a Button variant, stop. We have a Button.

## Integration workflow

### 1. Install to an isolated path first

When using the Magic MCP or copy-paste, land the component in `src/components/vendor/21st/` initially, NOT directly in `src/components/ui/`. This is a staging area.

### 2. Audit before adapting

Read the component and note:
- **Dependencies it pulls in**. Does it want `framer-motion`, `three`, `@react-spring/*`, `tsparticles`? Check if we already have one. Do NOT install a second animation library. Pick one.
- **Hardcoded values**. Colors, fonts, spacing, durations. All of these need to move to tokens.
- **Props surface**. Is it configurable or does everything live inside? If not configurable, wrap it.
- **Client-only code**. Window/document access, `useLayoutEffect`, browser APIs. For Astro, this determines the `client:*` directive.
- **Bundle cost**. Run `pnpm build && pnpm analyze` if in doubt. A 200KB animated hero on the landing page is a tradeoff; make it consciously.

### 3. Adapt to the system

Before moving the component from `vendor/21st/` to `components/ui/` or `components/sections/`:

- Replace every color literal with a token utility (`bg-accent` not `bg-[#5b5bd6]`)
- Replace font stacks with `font-sans` / `font-display`
- Replace custom durations with our motion tokens (`duration-[var(--duration-base)]`)
- Remove any CSS that fights our globals
- Rename the component to match our naming (`AnimatedHero` not `Hero3DMagicBackground`)
- Add our standard prop shape: `className`, rest spread, forwardRef if it renders a DOM element
- Add TypeScript types if the component came as loose JSX

### 4. Accessibility pass

21st.dev components are pretty. They're often not accessible. Before shipping:
- Does it trap keyboard users?
- Are decorative SVGs marked `aria-hidden`?
- Do animations respect `prefers-reduced-motion`?
- Is there alt text / label for anything interactive?

Add `@media (prefers-reduced-motion: reduce)` fallbacks for every animation. This is non-negotiable.

```css
@media (prefers-reduced-motion: reduce) {
  .animated-thing {
    animation: none;
    transform: none;
  }
}
```

### 5. Performance pass

- Heavy 3D / canvas / WebGL components: lazy-load, `client:visible`, and put them below-the-fold or behind a user interaction. They can tank LCP.
- Marquees / infinite loops: use CSS animations, not JS rAF, unless there's a reason. CSS is cheaper.
- Large SVG backgrounds: check if they can become a CSS gradient or a compressed image.

## Dependency hygiene

Rules:

- **One animation library max**. Default to Framer Motion for React islands. Don't add GSAP, Motion One, or Anime.js alongside it.
- **One icon set**. Lucide by default. Don't add Heroicons + Lucide + Radix Icons because three different 21st.dev components used them.
- **No UI kits as dependencies**. If a 21st.dev component wants `@mantine/*` or `@chakra-ui/*`, strip it out or don't use the component.
- **No analytics/telemetry hidden inside**. Audit.

## When you realize it was the wrong choice

If, after adapting, the component is:
- 80%+ rewritten
- Still pulling in deps you don't want
- Fighting your tokens
- Shipping more JS than the rest of the page combined

Delete it. Build it from scratch with our primitives. You'll save time in the long run.

## Checklist before merge

- [ ] Lives in `components/sections/` or `components/ui/`, not `vendor/`
- [ ] All color/spacing/typography goes through tokens
- [ ] Uses our `cn()`, `className` merging, forwardRef conventions
- [ ] No new dependency without explicit justification in the PR
- [ ] `prefers-reduced-motion` respected
- [ ] Keyboard accessible
- [ ] Bundle size delta checked and acceptable
- [ ] Works with JS disabled (degrades gracefully) — critical on landing pages for SEO bots
