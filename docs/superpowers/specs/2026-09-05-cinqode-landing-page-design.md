# Cinqode Landing Page Design

## Goal

Build a responsive, accessible Cinqode marketing homepage that closely follows the supplied dark, electric-blue reference: a technology services brand with a prominent hero, service offerings, social proof, statistics, and a contact call to action.

## Scope

The first release is one public marketing page. Its navigation uses same-page anchors and the primary CTAs scroll to the contact section. There is no account area, database schema, authentication flow, dashboard, or live form submission in this release. Supabase and PostgreSQL remain a planned integration point for a later contact-capture backend.

## Technology

- Next.js App Router with TypeScript
- Tailwind CSS for responsive layout and visual tokens
- Framer Motion for small entrance, hover, and hero-motion effects
- Supabase/PostgreSQL prepared as the future backend, but not connected until a form submission requirement is defined
- Vercel-compatible deployment configuration

## Visual Direction

- Near-black page surface with soft blue radial glows, subtle grid/noise texture, cobalt accents, white headlines, and muted slate body copy.
- Fixed/translucent desktop header containing wordmark, Home, Services, Work, About, Process, Contact, and a “Let’s Talk” CTA.
- Two-column hero: a compact eyebrow, large “We Build Digital Solutions That Move You Forward.” heading, supporting copy, two CTAs, and a custom CSS/SVG Cinqode-style monogram visual with orbit lines and floating discipline tags.
- Partner proof strip immediately below the hero.
- Services section with ten cards: AI Chatbot, Web Development, ERP, Mobile App, WordPress Development, Graphic Design, Ads Video Editing, PC Related Issues, RDP, and Windows Server Management 2025. Each card has a decorative blue icon, description, and one accessible service link.
- Results strip with 120+ Projects Completed, 98% Client Satisfaction, 5+ Years Experience, and 24/7 Support Available.
- Closing CTA panel and a simple contact section, followed by a compact footer.

## Responsive Behavior

- Desktop mirrors the wide reference composition: hero copy and artwork side by side; five-column service grid at wider widths; inline stats.
- Tablet uses a two-column service grid and stacks the hero when the artwork would reduce copy readability.
- Mobile uses a menu button, single-column hero/services, stacked statistics, and full-width or comfortably sized CTAs. No essential visual element is cropped or dependent on hover.

## Animation

- Hero artwork: low-amplitude orbit drift, glow pulse, and tag float.
- Content: subtle opacity/translate entrance during scrolling; cards raise slightly on hover/focus.
- Counters retain complete static text in the DOM and do not announce individual animation frames.
- All nonessential animation is disabled or rendered static for `prefers-reduced-motion: reduce`. Moving content is not required to understand the page; the partner strip remains static.

## Accessibility and Content Contracts

- Meet WCAG 2.2 AA as the build target.
- Root document has the correct `lang` value and a descriptive title, “Cinqode — Digital Product Engineering.”
- The first focusable element is a skip link to a unique `<main id="main-content">`.
- Use native `<header>`, named `<nav>`, `<main>`, and `<footer>` landmarks. Do not label every section as a region.
- The hero contains the sole `<h1>`; sections use ordered `<h2>` headings; service titles use `<h3>`.
- Links navigate and buttons change state. Interactive cards have one clear link and no nested controls. Visible button/link labels are included in accessible names.
- The mobile menu uses a native named button with `aria-expanded` and `aria-controls`; its closed links are unavailable to Tab, Escape closes it, and focus returns to the trigger.
- Abstract hero artwork, glows, particles, and redundant service icons are decorative and hidden from assistive technology. The logo-only home link is named “Cinqode home.”
- Client marks are initially decorative with a nearby textual “Trusted by forward-thinking teams” summary; linked client marks must instead expose each client name.
- Stats use a semantic definition list with complete final values. Focus indicators, text, and UI boundaries meet measured contrast requirements against each final background.
- Layout reflows at 320 CSS pixels / 400% zoom; controls are at least 24 by 24 CSS pixels and targeted at 44 by 44 pixels on mobile.

## Component Boundaries

- `app/layout.tsx`: metadata, root language, global font/theme setup.
- `app/page.tsx`: page composition in reading order and section IDs.
- `components/site-header.tsx`: desktop navigation, mobile menu, and primary CTA.
- `components/hero.tsx` and `components/hero-artwork.tsx`: hero copy and decorative animated visual.
- `components/services.tsx` and `components/service-card.tsx`: service data and accessible card links.
- `components/trust-strip.tsx`, `components/stats.tsx`, `components/contact-cta.tsx`, and `components/footer.tsx`: supporting page sections.
- `app/globals.css`: dark visual tokens, background treatment, global focus styles, skip link, and motion fallback.

## Verification

- Production build and lint complete without errors.
- Automated accessibility scan (axe) has no serious or critical violations.
- Keyboard-only test validates skip link, all CTAs, desktop navigation, mobile menu, and logical Tab order.
- Manual checks cover dark-surface contrast, reduced motion, 320-pixel reflow/400% zoom, and a screen-reader smoke test for landmarks, headings, logo link, stats, and CTAs.

## Out of Scope

- A real contact-form backend or database writes.
- Authentication, customer accounts, admin tools, CMS, payments, or customer portal.
- Hosting/deployment to Vercel and provisioning a Supabase project; these require project credentials and a deployment decision.
