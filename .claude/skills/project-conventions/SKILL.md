---
name: project-conventions
description: Read this skill BEFORE writing or modifying any code in this repo. It defines the stack, folder structure, naming, TypeScript rules, and import conventions. Always consult it first when creating files, components, pages, or utilities. This skill takes precedence over generic defaults from any plugin (ui-ux-pro-max, 21st.dev magic, Stitch MCP). If a plugin suggests a pattern that contradicts this file, follow this file.
---

# Project Conventions

This is the **source of truth** for how code is organized, named, and typed in this project. Read this before any other skill.

## Stack

- **Astro 5** (SSG by default, SSR only on specific routes when needed)
- **React 19** for interactive islands (`client:*` directives)
- **Tailwind CSS v4** with CSS-first config
- **TypeScript strict mode** (`strict: true`, `noUncheckedIndexedAccess: true`)
- **pnpm** as package manager
- **Vitest** + **Playwright** for tests

If the user asks for a different stack, stop and confirm before proceeding.

## Folder structure

```
src/
  components/        # Reusable components
    ui/              # Primitives (Button, Input, Card...). Framework-agnostic where possible.
    sections/        # Page-level sections (Hero, Features, Pricing, CTA...)
    layouts/         # Page shells, nav, footer
  pages/             # Astro routes. File-based. Keep them thin.
  content/           # Content collections (blog, case studies, legal)
  lib/               # Pure TS utilities, no framework deps
  styles/            # Global CSS, tokens, Tailwind config
  assets/            # Images, fonts, static
tests/
  e2e/               # Playwright
  unit/              # Vitest (only for lib/ logic)
```

**Rules:**
- Pages import sections. Sections import UI. UI imports nothing from sections or pages. No circular flow.
- `.astro` files for static content and page composition. `.tsx` only when the component needs React state, effects, or lifecycle.
- Default to `.astro`. Reach for `.tsx` only when you can't avoid it.

## Naming

- **Components**: `PascalCase.astro` / `PascalCase.tsx`. One component per file. Match filename to export name.
- **Utilities**: `kebab-case.ts` (`format-date.ts`, `cn.ts`).
- **Hooks**: `use-kebab-case.ts` exporting `useCamelCase`.
- **Types**: colocate with consumer. Shared types in `src/lib/types.ts`.
- **Tests**: `component-name.test.ts` next to the source file for unit, or under `tests/e2e/` for flows.

## TypeScript rules

- **No `any`**. Ever. Use `unknown` and narrow.
- **No `as` casts** unless you can justify in a comment why TS can't infer it.
- **Props**: define with `type`, not `interface`, unless extending.
- **Exports**: named exports for components and utilities. No default exports except Astro pages (they require default).
- **Discriminated unions** over optional booleans with conditional shape.

```ts
// ❌ bad
type ButtonProps = { variant?: string; href?: string; onClick?: () => void }

// ✅ good
type ButtonProps =
  | { as: 'button'; onClick: () => void; variant?: 'primary' | 'secondary' }
  | { as: 'link'; href: string; variant?: 'primary' | 'secondary' }
```

## Imports

Order, separated by a blank line:
1. Node/external packages
2. Internal aliases (`@/components`, `@/lib`)
3. Relative imports
4. Types (prefix with `import type`)
5. Styles / assets

```ts
import { useState } from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

import { formatDate } from './utils'

import type { Post } from '@/lib/types'

import heroImage from '@/assets/hero.webp'
```

Path aliases are configured in `tsconfig.json`. Use `@/` for `src/`. No deep relative imports (`../../../`) — if you're doing that, the module is in the wrong place.

## What NOT to do

- No `React.FC`. Just type the props.
- No barrel files (`index.ts` re-exports). They break tree-shaking and make grep harder.
- No CSS-in-JS runtime libraries (styled-components, emotion). Tailwind + CSS modules only.
- No global state library yet. If you reach for Zustand in a marketing site, stop and reconsider.
- No `useEffect` for data fetching. Use Astro's data loading (frontmatter) or server endpoints.

## Commits

- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `perf:`, `a11y:`, `docs:`.
- One logical change per commit.

## Before you commit

Run these. If any fails, fix before pushing:
```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```
