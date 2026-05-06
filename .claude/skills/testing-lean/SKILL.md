---
name: testing-lean
description: Use this skill when deciding what to test, writing tests, or when a user asks to "add tests." Defines a lean testing strategy appropriate for a marketing/landing site — enough to protect critical flows and business logic, not so much that it slows down iteration. Read before writing Vitest or Playwright tests to avoid over-testing or testing the wrong things.
---

# Testing (Lean)

A marketing site doesn't need 90% code coverage. It needs the flows that make or cost money to work, and the business logic (form validation, pricing calculations, geolocation redirects) to be correct. Anything beyond that is process theater.

## What to test

### YES, always test
- **Lead form submission flow** (Playwright E2E): user fills form → submits → sees success → data lands in CRM/webhook.
- **Payment / checkout flow** if the site has one (Playwright).
- **Pricing calculator** or any interactive tool with business logic (Vitest).
- **Form validation rules** if they're non-trivial (Vitest).
- **Utility functions** in `src/lib/` that have branching logic (Vitest).
- **Critical navigation** — primary CTAs on key pages reach the expected destination (Playwright smoke).

### MAYBE test (if they break often or matter a lot)
- Custom hooks with complex logic (Vitest + React Testing Library).
- Components with state machines or multi-step flows.
- Content collection schemas (Vitest — test the Zod schema, catch malformed content).

### NO, don't test
- Presentational components with no logic (don't test that a Button renders).
- Styling (that's what visual regression or manual review is for).
- Third-party library internals.
- Astro pages end-to-end — use Playwright for flows, not for "does this page render."
- Every possible prop combination. Test the contract, not the combinatorics.

## Tooling

| Tool | Used for |
|---|---|
| **Vitest** | Unit tests of pure functions and hooks. Fast. |
| **@testing-library/react** | Testing React components from a user's perspective (if at all). |
| **Playwright** | E2E flows. Cross-browser. |
| **axe-core** (via `@axe-core/playwright`) | Automated a11y checks in Playwright tests. |

We do NOT use:
- Jest (Vitest is faster, same API).
- Enzyme (dead).
- Cypress (Playwright is better, broadly). Exception: if the team already knows Cypress cold, fine.

## Vitest patterns

```ts
// src/lib/format-price.test.ts
import { describe, it, expect } from 'vitest'
import { formatPrice } from './format-price'

describe('formatPrice', () => {
  it('formats EUR with 2 decimals', () => {
    expect(formatPrice(1234.5, 'EUR', 'es-ES')).toBe('1234,50 €')
  })

  it('handles zero', () => {
    expect(formatPrice(0, 'EUR', 'es-ES')).toBe('0,00 €')
  })

  it('throws on negative', () => {
    expect(() => formatPrice(-1, 'EUR', 'es-ES')).toThrow()
  })
})
```

**Rules:**
- One behavior per test. The `it(...)` reads like a spec.
- Test the contract, not the implementation. If the function returns a value, test the value. Don't spy on internal calls.
- No mocking unless necessary. Mocks are maintenance debt.

## React Testing Library

If you do test a component:

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsletterForm } from './NewsletterForm'

it('shows error when email is invalid', async () => {
  const user = userEvent.setup()
  render(<NewsletterForm />)

  await user.type(screen.getByLabelText(/email/i), 'not-an-email')
  await user.click(screen.getByRole('button', { name: /subscribe/i }))

  expect(await screen.findByText(/valid email/i)).toBeInTheDocument()
})
```

**Rules:**
- Query by role, label, or text — the way a user finds things. Not by test-id.
- `test-id` is a last resort. If you need one, the component's accessibility is probably wrong.
- Use `userEvent`, not `fireEvent`. It matches real user behavior.
- Assert on what the user sees, not on internal state.

## Playwright patterns

Organize tests by user flow, not by page:

```
tests/e2e/
  homepage-cta-to-signup.spec.ts
  pricing-to-checkout.spec.ts
  blog-navigation.spec.ts
  a11y-key-pages.spec.ts
```

Example:
```ts
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('newsletter signup from homepage', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('textbox', { name: /email/i }).fill('test@example.com')
  await page.getByRole('button', { name: /subscribe/i }).click()
  await expect(page.getByText(/thanks for subscribing/i)).toBeVisible()
})

test('homepage has no a11y violations', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})
```

**Rules:**
- One `test()` per user-facing scenario.
- Use `getByRole` / `getByLabel` / `getByText` — same principle as RTL.
- Don't chain 10 assertions in one test. If something breaks you want to know what.
- Run Playwright against the preview build, not dev. Dev's HMR and source maps distort behavior.
- Include `tablet` and `mobile` viewports in the project config for critical flows.

## Test data

- **No production data in tests**. Synthetic only.
- **No shared state between tests**. Each test sets up and tears down what it needs.
- **Webhook/API tests**: mock the external service, or use a dedicated test environment. Never hit production third-party APIs from CI.

## CI

Tests run on every PR:
```yaml
# Pseudocode
- typecheck
- lint
- unit tests (Vitest)
- build
- e2e tests (Playwright against preview build)
- Lighthouse CI on 3 key pages (perf regression guard)
```

If any fail, merge is blocked.

## When you'd think about testing more heavily

Scale the testing investment with complexity:

- **MVP landing page**: Playwright smoke test for signup form + Lighthouse CI. That's it.
- **Content-heavy site with blog + case studies**: add Vitest for content schema validation.
- **Landing + pricing calculator + interactive demos**: add Vitest for the calculator logic and RTL for the interactive widgets.
- **Landing + portal/auth (if it creeps in)**: you're past marketing scope. Revisit this skill.

## Things to NEVER do

- Tests that depend on real network, real clocks, or current date without mocking.
- Tests that call `setTimeout` to "wait for things." Use `waitFor` / `expect().toBeVisible()` which retry.
- Snapshot tests on entire components. They're noise, everyone just updates them.
- Tests that require manual setup steps to run.
- Skipping (`.skip`) tests without a dated TODO and an owner. A skipped test is a deleted test.
