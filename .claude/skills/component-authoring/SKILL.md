---
name: component-authoring
description: Use this skill whenever you create a new React component or modify the API of an existing one. Covers component patterns (composition, polymorphism, variants), prop typing, refs, accessibility-by-default, and what not to do. Read this alongside `design-tokens` and `accessibility` before writing any `.tsx` file. If you're writing an `.astro` file, most of this still applies conceptually; ignore the React-specific parts.
---

# Component Authoring

Components here are built to last: composable, accessible, typed, with no surprises.

## Default file shape (React)

```tsx
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

const button = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-accent text-bg hover:bg-accent/90',
        secondary: 'bg-transparent text-fg border border-border hover:bg-fg/5',
        ghost: 'bg-transparent text-fg hover:bg-fg/5',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof button>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(button({ variant, size }), className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'
```

That's the template. Variants via CVA, forwardRef, spread rest props, merge className with `cn()` (clsx + tailwind-merge).

## Core rules

1. **Composition over configuration.** Don't invent props like `showIcon`, `iconName`, `iconPosition`. Let the consumer compose:
   ```tsx
   <Button><IconArrow /> Start free</Button>
   ```
   If you need structural slots (header/footer/content), use compound components, not props:
   ```tsx
   <Card>
     <Card.Header>...</Card.Header>
     <Card.Body>...</Card.Body>
   </Card>
   ```

2. **Polymorphism when it earns its weight.** A Button that renders as `<a>` when given `href` is useful. Don't build a full `as` prop unless there are 3+ cases. For 2 cases, discriminated union is cleaner (see `project-conventions`).

3. **Always forwardRef** on primitives that render a DOM element. Third-party libraries (Radix, Headless UI) rely on it. Skipping it will bite you.

4. **Spread rest props** to the underlying element so consumers can add `aria-*`, `data-*`, event handlers without you needing to enumerate them.

5. **Accept `className`** and merge with `cn()`. Not `class` (that breaks in React), and not "just override with a prop" — Tailwind order matters, use tailwind-merge.

## Accessibility is not optional

Every interactive component ships with:
- Keyboard support (Enter/Space for buttons, arrow keys for menus, Esc to close overlays)
- Visible focus state (`focus-visible:ring-2` or equivalent)
- Correct semantic element (`<button>` not `<div onClick>`)
- ARIA only when the native semantics fall short. First rule of ARIA: don't use ARIA.

For complex widgets (dialogs, menus, comboboxes, tabs), **use Radix UI primitives**. Do not roll your own. The accessibility footguns are many and Radix has solved them. Style Radix with Tailwind; we don't pull in `@radix-ui/themes`.

## Variants

Use **class-variance-authority** (CVA). It gives you typed variants, default values, and compound variants. It beats manual ternaries every time:

```tsx
// ❌ bad
className={`btn ${primary ? 'btn-primary' : ''} ${large ? 'btn-lg' : ''}`}

// ✅ good
className={button({ variant, size })}
```

For conditional classes that aren't variants (state-driven), use `cn()`:
```tsx
<div className={cn('base', isOpen && 'is-open', error && 'border-red-500')} />
```

## What NOT to do

- **No `React.FC`**. Use plain function declarations or `forwardRef`.
- **No prop drilling past 2 levels**. Lift to context or pull component up.
- **No `useState` for derived values**. Compute during render.
- **No `useEffect` to sync state with props**. That's a code smell; derive it.
- **No inline object/function props on hot paths** unless you've profiled. Don't premature-memoize either — only after a measured problem.
- **No `dangerouslySetInnerHTML`** except for trusted CMS content, and then with a sanitizer.
- **No uncontrolled + controlled** mixed on the same input. Pick one.

## Astro-specific notes

- Prefer `.astro` components for static content. They ship zero JS.
- Only use `.tsx` islands when you need interactivity. Pick the lightest `client:*` directive that works (`client:visible` > `client:idle` > `client:load`).
- Props to islands must be serializable (JSON). No functions, no Date objects — use ISO strings.

## Checklist before marking a component done

- [ ] Props are typed with no `any`
- [ ] forwardRef if it renders a DOM element (React)
- [ ] `className` prop merged with `cn()`
- [ ] Keyboard navigable and tested manually
- [ ] Focus state visible
- [ ] Works without JS (Astro) or degrades reasonably
- [ ] No hardcoded colors / spacing (see `design-tokens`)
- [ ] Storybook entry or at minimum a usage example in a page
