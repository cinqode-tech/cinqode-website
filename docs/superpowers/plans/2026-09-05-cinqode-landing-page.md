# Cinqode Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive, dark Cinqode marketing homepage that closely follows the supplied visual reference while meeting WCAG 2.2 AA release gates.

**Architecture:** The site is a Next.js App Router application composed from focused page sections and data-driven service/stat content. Tailwind supplies the responsive visual system; Framer Motion supplies only decorative, reduced-motion-aware animation. The first release is static: primary CTAs jump to a contact section and no Supabase database writes occur.

**Tech Stack:** Next.js App Router, TypeScript, React, Tailwind CSS, Framer Motion, Lucide React, Playwright, axe-core/playwright.

**Spec:** `docs/superpowers/specs/2026-09-05-cinqode-landing-page-design.md`

## Global Constraints

- Follow the approved page order: header, hero, services, stats, trust, contact, footer.
- Use only native links for destinations and native buttons for state changes.
- The first focusable item is a skip link to `main#main-content`; do not use positive `tabIndex`.
- Maintain one H1, section H2s, and service H3s; use native page landmarks.
- Decorative artwork and text-adjacent icons are hidden from assistive technology.
- Every nonessential animation must render statically for `prefers-reduced-motion: reduce`.
- Do not add Supabase credentials, database writes, authentication, payment, or deployment configuration.
- Verify all final dark-theme foreground/background pairs meet WCAG AA before release.

---

### Task 1: Create the Next.js application and testing foundation

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`
- Create: `playwright.config.ts`, `tests/home.spec.ts`
- Modify: `README.md`

**Interfaces:**
- Produces: a runnable `npm run dev`, `npm run build`, `npm run lint`, and `npm run test:e2e` foundation.
- Consumed by: every subsequent page component and accessibility test.

- [ ] **Step 1: Scaffold the application with the App Router, TypeScript, Tailwind, ESLint, and a `src/`-free structure.**

Run:

```bash
npx create-next-app@latest . --ts --tailwind --eslint --app --use-npm --import-alias '@/*'
npm install framer-motion lucide-react
npm install --save-dev @playwright/test @axe-core/playwright
npx playwright install chromium
```

- [ ] **Step 2: Write the failing homepage smoke test.**

Create `tests/home.spec.ts` with:

```ts
import { expect, test } from '@playwright/test';

test('renders the Cinqode homepage landmark and value proposition', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Cinqode/);
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('We Build Digital Solutions');
});
```

- [ ] **Step 3: Run the test to verify it fails before the page exists.**

Run: `npm run test:e2e -- tests/home.spec.ts`

Expected: FAIL because the application server/test script is not configured.

- [ ] **Step 4: Configure the Playwright web server and scripts.**

Add these `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "test:e2e": "playwright test"
  }
}
```

Use a `playwright.config.ts` web server that runs `npm run dev`, targets `http://127.0.0.1:3000`, and reuses an existing server outside CI.

- [ ] **Step 5: Implement root metadata, language, and temporary semantic page shell.**

Use this minimum `app/layout.tsx` contract:

```tsx
export const metadata = {
  title: 'Cinqode — Digital Product Engineering',
  description: 'Cinqode builds scalable digital products, web platforms, and business systems.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
```

Render `<main id="main-content" tabIndex={-1}><h1>We Build Digital Solutions That Move You Forward.</h1></main>` in `app/page.tsx`.

- [ ] **Step 6: Run the smoke test and production checks.**

Run:

```bash
npm run lint
npm run build
npm run test:e2e -- tests/home.spec.ts
```

Expected: all commands PASS.

- [ ] **Step 7: Commit the foundation.**

```bash
git add package.json package-lock.json next.config.ts tsconfig.json postcss.config.mjs app playwright.config.ts tests README.md
git commit -m "feat: scaffold Cinqode landing page"
```

### Task 2: Implement global visual tokens and accessible site navigation

**Files:**
- Create: `components/site-header.tsx`
- Modify: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `tests/home.spec.ts`

**Interfaces:**
- Produces: `SiteHeader`, a logo home link, desktop navigation, a keyboard-operable mobile menu, global skip-link styles, and global `focus-visible` styles.
- Consumed by: `app/page.tsx` and all future anchor sections.

- [ ] **Step 1: Extend the test with the keyboard bypass and navigation contract.**

Add:

```ts
test('offers a skip link and exposes a labelled main navigation', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to main content' })).toBeFocused();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
});
```

- [ ] **Step 2: Run the targeted test to verify it fails.**

Run: `npm run test:e2e -- tests/home.spec.ts -g "skip link"`

Expected: FAIL because no skip link or named navigation exists.

- [ ] **Step 3: Add tokens and global accessibility styles.**

In `app/globals.css`, define dark-surface, blue-accent, muted-text, border, and focus-ring CSS variables. Add:

```css
.skip-link { position: fixed; left: 1rem; top: -4rem; z-index: 100; }
.skip-link:focus-visible { top: 1rem; }
:focus-visible { outline: 3px solid var(--focus-ring); outline-offset: 4px; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; scroll-behavior: auto !important; transition-duration: 0.01ms !important; } }
```

- [ ] **Step 4: Build `SiteHeader` using native navigation controls.**

Implement a logo home `<a aria-label="Cinqode home" href="#home">`, `<nav aria-label="Main navigation">`, anchor links to `#home`, `#services`, `#work`, `#about`, `#process`, and `#contact`, and a `Let’s Talk` anchor. On mobile, implement a real button with `aria-expanded` and `aria-controls="mobile-navigation"`; close it with Escape and return focus to the trigger. Render inactive navigation with `hidden` so it cannot be tabbed.

- [ ] **Step 5: Compose skip link and header before the page main landmark.**

Use this page shell:

```tsx
<>
  <a className="skip-link" href="#main-content">Skip to main content</a>
  <SiteHeader />
  <main id="main-content" tabIndex={-1}>...</main>
</>
```

- [ ] **Step 6: Run target tests, lint, and build.**

Run:

```bash
npm run test:e2e -- tests/home.spec.ts
npm run lint
npm run build
```

Expected: PASS, with the first Tab focusing the skip link.

- [ ] **Step 7: Commit navigation.**

```bash
git add app components/site-header.tsx tests/home.spec.ts
git commit -m "feat: add accessible site navigation"
```

### Task 3: Build the hero composition and reduced-motion decorative artwork

**Files:**
- Create: `components/hero.tsx`, `components/hero-artwork.tsx`
- Modify: `app/page.tsx`, `tests/home.spec.ts`

**Interfaces:**
- Produces: `Hero` with its sole H1 and navigation CTAs, plus a decorative `HeroArtwork` that never enters the accessibility tree.
- Consumed by: `app/page.tsx`.

- [ ] **Step 1: Add a failing hero interaction test.**

Add:

```ts
test('hero CTAs navigate to the intended sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Explore Services' })).toHaveAttribute('href', '#services');
  await expect(page.getByRole('link', { name: 'View Our Work' })).toHaveAttribute('href', '#work');
});
```

- [ ] **Step 2: Run it to verify it fails.**

Run: `npm run test:e2e -- tests/home.spec.ts -g "hero CTAs"`

Expected: FAIL because the CTA links do not exist.

- [ ] **Step 3: Implement the hero text and semantic structure.**

`Hero` renders `<section id="home">`, one compact non-heading eyebrow, the sole H1, body copy, and visible-text `<a>` CTAs named “Explore Services” and “View Our Work.” Use `scroll-margin-top` on all linked sections so the sticky header does not obscure target headings.

- [ ] **Step 4: Implement the custom decorative hero artwork.**

Create the monogram, orbits, particles, plinth, and discipline tags from CSS and inline SVG; wrap all decorative layers in `aria-hidden="true"` and use `focusable="false"` on SVGs. Apply Framer Motion only when reduced motion is not preferred; the static rendered state must retain all visual information needed for the page.

- [ ] **Step 5: Run verification.**

Run:

```bash
npm run test:e2e -- tests/home.spec.ts
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 6: Commit hero implementation.**

```bash
git add app/page.tsx components/hero.tsx components/hero-artwork.tsx tests/home.spec.ts
git commit -m "feat: add animated Cinqode hero"
```

### Task 4: Implement services, proof, statistics, and contact sections

**Files:**
- Create: `components/service-card.tsx`, `components/services.tsx`, `components/trust-strip.tsx`, `components/stats.tsx`, `components/contact-cta.tsx`, `components/footer.tsx`
- Modify: `app/page.tsx`, `tests/home.spec.ts`

**Interfaces:**
- Produces: data-driven service cards, a static trust list, semantic stats, a contact anchor section, and footer.
- Consumed by: `app/page.tsx` and end-to-end tests.

- [ ] **Step 1: Write failing structure tests.**

Add:

```ts
test('uses a service heading hierarchy and complete stats', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 2, name: 'Our Services' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3 })).toHaveCount(10);
  await expect(page.getByText('98% Client Satisfaction')).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: /Start a project/i })).toBeVisible();
});
```

- [ ] **Step 2: Run the tests to verify failure.**

Run: `npm run test:e2e -- tests/home.spec.ts -g "service heading"`

Expected: FAIL because service/stat/contact components are absent.

- [ ] **Step 3: Implement `Services` and `ServiceCard`.**

Store the ten approved services in a typed array. Render a `<section id="services">` with H2, a `<ul>`, and each card as an `<li><article>` containing an H3, short copy, decorative `aria-hidden` icon, and one descriptive link such as “Explore Web Development services.” Avoid nesting links or buttons.

- [ ] **Step 4: Implement static trust and semantic statistics.**

Render `TrustStrip` as a static list with the nearby text “Trusted by forward-thinking teams”; marks are decorative until real client permission/names are provided. Render `Stats` as a `<section id="about">` containing an H2 and `<dl>` pairs where the accessible text is complete: “Projects Completed: 120+”, “Client Satisfaction: 98%”, “Years Experience: 5+”, and “Support Available: 24/7”.

- [ ] **Step 5: Implement the closing CTA, anchor targets, and footer.**

Render `<section id="work">` and `<section id="process">` with concise, visible headings so every header link has a valid target. Render `<section id="contact">` with H2 “Start a project with Cinqode” and a visible `mailto:` link named “Get Started”; no fake form submission. Build a native `<footer>` with a separately named footer navigation when links are repeated.

- [ ] **Step 6: Run full tests, lint, and build.**

Run:

```bash
npm run test:e2e -- tests/home.spec.ts
npm run lint
npm run build
```

Expected: PASS.

- [ ] **Step 7: Commit content sections.**

```bash
git add app/page.tsx components tests/home.spec.ts
git commit -m "feat: add Cinqode service and proof sections"
```

### Task 5: Verify presentation and accessibility release gates

**Files:**
- Create: `tests/accessibility.spec.ts`
- Modify: `app/globals.css`, `README.md`

**Interfaces:**
- Produces: automated accessibility regression coverage and a documented verification process.
- Consumed by: future feature work and release checks.

- [ ] **Step 1: Write the failing axe accessibility test.**

Create `tests/accessibility.spec.ts`:

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('has no serious or critical accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  const blocked = results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical');
  expect(blocked).toEqual([]);
});
```

- [ ] **Step 2: Run it to identify any violations.**

Run: `npm run test:e2e -- tests/accessibility.spec.ts`

Expected: FAIL until all semantic, name, contrast, or keyboard implementation gaps are resolved.

- [ ] **Step 3: Resolve every reported issue without weakening the test.**

Keep native semantics, skip-link behavior, visible focus styles, button/link names, correct heading order, and decorative-media hiding. Adjust visual tokens rather than lowering the axe severity filter.

- [ ] **Step 4: Perform manual release checks.**

Validate: keyboard path from skip link through footer; mobile menu open/close/Escape/focus restoration; reduced-motion static artwork; 320 CSS pixel reflow and 400% zoom; visible focus under sticky header; contrast of every final text/button/surface pairing.

- [ ] **Step 5: Run final automated verification.**

Run:

```bash
npm run lint
npm run build
npm run test:e2e
```

Expected: PASS with zero serious or critical axe violations.

- [ ] **Step 6: Document setup and checks in the README.**

Include exact commands:

```bash
npm install
npm run dev
npm run lint
npm run build
npm run test:e2e
```

State that Supabase/PostgreSQL is intentionally not connected in this static first release.

- [ ] **Step 7: Commit release verification.**

```bash
git add app/globals.css tests/accessibility.spec.ts README.md
git commit -m "test: add landing page accessibility coverage"
```
