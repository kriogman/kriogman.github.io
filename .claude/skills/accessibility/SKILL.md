---
name: accessibility
description: Use this skill whenever you finish a component, page, or section before considering it done. Also read it when adding interactive elements (buttons, forms, menus, dialogs, carousels), images, videos, or dynamic content. Accessibility is not a final polish step — it's a requirement that shapes markup choices from the start. Defines the WCAG 2.2 AA checklist we enforce.
---

# Accessibility

Target: **WCAG 2.2 AA**. This isn't optional. Landing pages with accessibility failures lose users, fail audits, and hurt SEO (Google penalizes poor mobile/a11y experiences).

## Core principles

1. **Semantic HTML first, ARIA last.** If a native element does the job, use it. ARIA is a patch for when it doesn't.
2. **Keyboard users exist.** Everything clickable must be reachable and operable with Tab/Shift+Tab/Enter/Space/Esc/arrows.
3. **Screen reader users exist.** Test with VoiceOver (Mac) or NVDA (Windows) at least once per major flow.
4. **Reduced motion users exist.** Respect `prefers-reduced-motion`.
5. **Low vision users exist.** Contrast matters, zoom matters, focus indicators matter.

## Checklist per component / page

### Structure
- [ ] One `<h1>` per page. Headings in order (no skipping levels).
- [ ] Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`. Each `<nav>` and `<section>` with a label if multiple exist.
- [ ] Skip link at the top of every page that jumps to `<main>`.

### Interactive elements
- [ ] `<button>` for actions, `<a href>` for navigation. Never the other way around.
- [ ] Never `<div onClick>`. If you need a clickable div, you need a button.
- [ ] Focus is visible on every interactive element. We use `focus-visible:ring-2 ring-accent ring-offset-2`.
- [ ] Focus order is logical (matches visual order).
- [ ] No keyboard traps. User can Tab out of every widget.
- [ ] Escape closes overlays/modals/menus.

### Forms
- [ ] Every input has a visible `<label>` (or `aria-label` for compact UIs with clear context).
- [ ] Required fields marked with `required` attribute AND visually indicated (not only by color).
- [ ] Error messages associated with inputs via `aria-describedby`.
- [ ] Errors announced to screen readers (`aria-live="polite"` on the error container).
- [ ] Submit button describes action ("Send message", not "Submit").

### Images
- [ ] Every `<img>` has `alt`. Decorative images get `alt=""`. Never omit.
- [ ] Complex images (charts, diagrams) have a text description nearby or in `aria-describedby`.
- [ ] SVG icons used as decoration get `aria-hidden="true"`; as meaningful content, `role="img"` with `<title>`.

### Color & contrast
- [ ] Text contrast ≥ 4.5:1 (normal) or 3:1 (large text, 18pt+ or 14pt bold).
- [ ] UI components and graphical objects ≥ 3:1 against adjacent colors (WCAG 2.2 SC 1.4.11).
- [ ] Information not conveyed by color alone (error states need icons/text, not just red).
- [ ] Focus indicator contrast ≥ 3:1 against the background.

### Motion
- [ ] All animations respect `prefers-reduced-motion: reduce`.
- [ ] Auto-playing video/carousels must be pausable. Prefer not to autoplay.
- [ ] Parallax and large motion effects disabled under reduced motion.

### Dynamic content
- [ ] Status changes announced via `aria-live` regions (toasts, form errors, loading states).
- [ ] Route changes in SPAs: focus managed (move focus to main or a heading). Astro's MPA behavior handles this natively.

## WCAG 2.2 new criteria to specifically watch

WCAG 2.2 added 9 criteria on top of 2.1. The ones most relevant here:

- **2.4.11 Focus Not Obscured (minimum)** — when an element receives focus, it's not entirely hidden by sticky headers, cookie banners, etc.
- **2.5.7 Dragging Movements** — any drag can also be done with a simple tap/click.
- **2.5.8 Target Size (minimum)** — interactive targets ≥ 24×24px (padding counts).
- **3.3.7 Redundant Entry** — don't ask the user to enter the same info twice in a flow.
- **3.3.8 Accessible Authentication (minimum)** — don't require cognitive tests (memory, transcription) for auth unless there's an alternative.

## Testing

Automated (catches ~30% of issues):
```bash
pnpm test:a11y  # runs axe-core against built pages
```

Manual (catches the rest):
1. **Tab through the whole page**. Can you reach everything? Is focus always visible? Is the order sane?
2. **Turn on VoiceOver** (Cmd+F5 on Mac) and navigate. Does it make sense?
3. **Zoom to 200%** in the browser. Does the layout still work? No horizontal scroll?
4. **Toggle reduced motion** (System Settings → Accessibility → Display → Reduce motion). Do animations stop?
5. **Check contrast** with browser DevTools or Stark.

## ARIA "rules"

When in doubt, less ARIA is better.

- Don't add `role="button"` to a button. It already is one.
- Don't add `aria-label` if there's visible text. Redundant and can override what screen readers announce.
- Don't use `role="presentation"` to "hide" things from screen readers when they should be hidden with `display: none` or `aria-hidden`.
- `aria-hidden="true"` hides from ALL assistive tech. Make sure that's what you want.
- Live regions (`aria-live`) need to be in the DOM before the content changes. Don't add the region and content at the same time.

## For complex widgets: use Radix

Dialogs, menus, tabs, accordions, popovers, tooltips, comboboxes, toggles — **use Radix UI primitives**. Don't roll your own. Radix handles focus management, keyboard navigation, ARIA, portal rendering, and all the edge cases. Style with Tailwind.

## Common failures to NEVER ship

- Placeholder as the only label
- Icon-only button with no `aria-label`
- Modal that doesn't trap focus
- Dropdown that can't be operated with keyboard
- Hover-only tooltips (no focus/click trigger)
- Carousel without pause button
- Form errors shown only via red border
- Autoplaying video with sound
- Text over image with insufficient contrast (common on hero sections)
