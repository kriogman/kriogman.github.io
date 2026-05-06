---
name: design-tokens
description: Use this skill whenever you are about to write color values, spacing, typography, border-radius, shadows, breakpoints, or any design-related CSS value. Read it BEFORE importing components from 21st.dev or generating code from Stitch designs, because those sources always ship hardcoded values that must be adapted. If you catch yourself typing a hex color, a px value for spacing, or a rem for font-size, stop and consult this file.
---

# Design Tokens

Tokens are the **single source of truth** for visual style. Hardcoding a color, spacing, or font-size anywhere outside the token layer is a bug.

## Where tokens live

```
src/styles/
  tokens.css        # CSS custom properties — the actual source of truth
  global.css        # Resets, base styles, imports tokens
```

Tailwind v4 reads from `tokens.css` via `@theme`. We do NOT duplicate tokens in `tailwind.config.js`.

## Token categories

1. **Color** — semantic first, not literal
   - `--color-bg`, `--color-fg`, `--color-muted`, `--color-accent`, `--color-border`
   - Never `--color-blue-500` in component code. Semantic names only.
   - Literals (palette scale) live in `tokens.css` and feed the semantic ones.

2. **Spacing** — 4px scale
   - `--space-1` (4px) through `--space-24` (96px).
   - No odd values. If you need 13px, the design is wrong, not the scale.

3. **Typography**
   - `--font-sans`, `--font-display`
   - Sizes: `--text-xs`, `--text-sm`, `--text-base`, `--text-lg`, `--text-xl`, `--text-2xl`, `--text-3xl`, `--text-display`
   - Each size ships with `line-height` and `letter-spacing` locked in.

4. **Radius**: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`

5. **Shadow**: `--shadow-sm`, `--shadow-md`, `--shadow-lg`. No custom shadows inline.

6. **Motion**: `--duration-fast` (150ms), `--duration-base` (250ms), `--ease-out-soft`

## Example `tokens.css`

```css
@theme {
  /* Palette (literal, internal use) */
  --color-neutral-0: #ffffff;
  --color-neutral-950: #0a0a0a;
  --color-brand-500: #5b5bd6;

  /* Semantic (what components use) */
  --color-bg: var(--color-neutral-0);
  --color-fg: var(--color-neutral-950);
  --color-accent: var(--color-brand-500);
  --color-border: color-mix(in oklab, var(--color-fg) 12%, transparent);

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --text-base: 1rem;
  --text-display: clamp(2.5rem, 5vw, 4.5rem);
}

@media (prefers-color-scheme: dark) {
  @theme {
    --color-bg: var(--color-neutral-950);
    --color-fg: var(--color-neutral-0);
  }
}
```

## How to use in components

- Tailwind utility classes consume tokens automatically (`bg-bg`, `text-fg`, `p-4`).
- Raw CSS uses `var(--...)`.
- **Never** write `style={{ color: '#333' }}` or `className="bg-[#5b5bd6]"`.

## Adding a new token

Before adding, ask: **can the design work with an existing token?** 90% of the time, yes.

If genuinely new:
1. Add to `tokens.css` with a semantic name.
2. If it's part of a scale (spacing, radius), confirm it fits the existing pattern. Don't break the scale.
3. Document why it exists if it's non-obvious (comment in `tokens.css`).

## Red flags to reject

When integrating code from Stitch or 21st.dev, **before merging**, search for and fix:
- Any hex color literal (`#...`)
- Any `rgb()` / `hsl()` with literal numbers
- Any `px` value for spacing/font-size (borders can be 1px, that's fine)
- Any `rem` that doesn't map to a token
- Inline `style={{ ... }}` with visual values

All of those become tokens or token-based utilities before the code lands.

## Dark mode

If the site has dark mode, every color token must have a dark variant. Test in both modes before merging. If a token is only used once and only in one mode, it's probably not a token — just a one-off.
