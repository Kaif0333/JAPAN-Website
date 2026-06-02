# Tech Spec — JAPAN TOURS Landing Page

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^15.0 | Framework (App Router) |
| react | ^19.0 | UI library |
| react-dom | ^19.0 | React DOM renderer |
| typescript | ^5.0 | Type safety |
| tailwindcss | ^4.0 | Styling |
| @tailwindcss/postcss | ^4.0 | PostCSS integration for Tailwind v4 |
| gsap | ^3.12 | Animation engine (includes ScrollTrigger) |
| lenis | ^1.1 | Smooth scroll |
| lucide-react | ^0.400 | Icons (Globe, Users, Plane, Bus, Building) |

No shadcn/ui — all components are fully custom. No additional animation libraries; GSAP covers all motion needs.

---

## Component Inventory

### Layout

| Component | Source | Reuse | Notes |
|-----------|--------|-------|-------|
| Navigation | Custom | Shared | Fixed header, scroll-aware background transition |
| Footer | Custom | Shared | Lives inside Contact section |
| CustomCursor | Custom | Shared | Desktop-only, lerp-tracking dot |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Video bg, parallax layers, entrance timeline |
| AboutSection | Custom | Two-column, timeline with photo pairs |
| IncludedSection | Custom | 4-card grid, staggered entrance |
| ContactSection | Custom | Full-bleed bg image, glassmorphism form, footer |

### Reusable Components

| Component | Source | Used By | Notes |
|-----------|--------|---------|-------|
| SectionHeading | Custom | About, Included | Text flanked by animated hairline rules |
| PolaroidCard | Custom | Hero | White-framed photo with caption, rotation |
| InfoCard | Custom | Included | Glassmorphism card with icon/title/description |
| TimelineStop | Custom | About | Dot + label + overlapping photo pair |

### Hooks

| Hook | Purpose |
|------|---------|
| useLenis | Initializes Lenis, syncs with GSAP ScrollTrigger |
| useCursor | Tracks mouse position with lerp interpolation for custom cursor |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Hero entrance sequence | GSAP timeline | Single `gsap.timeline()` with 6 labeled tweens (video fade → title → polaroids stagger → kimono → icons → nav), fired on mount | High |
| Hero scroll parallax | GSAP ScrollTrigger | `useGSAP` hook with 4 ScrollTrigger instances: title (0.15x), polaroids (-0.08x), kimono (0.3x), video (0.05x), all `scrub: true` | Medium |
| Polaroid hover lift | CSS transition | `transition: transform 0.3s ease, box-shadow 0.3s ease` on `:hover` — translateY(-8px), shadow intensify, z-index bump | Low |
| Section heading line reveal | GSAP ScrollTrigger | Each line: `scaleX(0→1)` with ScrollTrigger `scrub: false, once: true`, triggered at viewport entry. Text: `opacity + y` tween. | Low |
| Scroll-triggered entrance (global) | GSAP ScrollTrigger | Reusable pattern: `gsap.from(el, { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out', stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 85%', once: true } })` | Medium |
| Timeline stop stagger | GSAP ScrollTrigger | Nested timeline: dot `scale(0→1)` + label `opacity/y` + photos `opacity/x`, parent timeline with `stagger: 0.2` between stops, ScrollTrigger once | Medium |
| Photo pair hover separation | CSS transition | `:hover` on container → child1 `translateX(-15px) rotate(-4deg)`, child2 `translateX(15px) rotate(4deg)`, `transition: 0.4s ease` | Low |
| Card hover lift | CSS transition | Same pattern as polaroid hover — `translateY(-4px)`, border/shadow transition | Low |
| Contact form entrance | GSAP ScrollTrigger | Panel: `opacity/x` tween. Background: `scale(1.03→1)` over 1.5s scrub. Fields: stagger `0.1s`. | Low |
| Contact bg parallax | GSAP ScrollTrigger | `translateY` at 0.1x rate, `scrub: true` | Low |
| Button hover fill | CSS pseudo-element | `::before` with `scaleY(0→1)`, `transform-origin: bottom`, `transition: 0.3s ease` | Low |
| Link underline | CSS pseudo-element | `::after` with `scaleX(0→1)`, `transform-origin: left` on hover, `right` on leave | Low |
| Custom cursor | RAF + lerp | `requestAnimationFrame` loop with lerp interpolation (factor 0.15), class-based state transitions (dot → ring → label) | Medium |
| Nav background transition | Scroll listener | Vanilla scroll event on Lenis instance; toggle class when scrollY > 80vh | Low |
| Form validation shake | GSAP | `gsap.to(input, { x: [-4, 4, -4, 4, 0], duration: 0.3 })` on invalid submit | Low |
| Smooth scroll | Lenis | Global instance in layout, synced to ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` | Low |

---

## State & Logic

### Lenis ↔ GSAP ScrollTrigger Bridge

Lenis owns the scroll position. GSAP ScrollTrigger must be notified of every Lenis scroll event to update its internal state. Initialize Lenis in the root layout, store instance in a ref, and wire: `lenis.on('scroll', ScrollTrigger.update)`. All ScrollTrigger `scrub` animations will then use Lenis-smoothed scroll progress.

### Custom Cursor Position Tracking

The cursor follows mouse position with lerp interpolation (factor 0.15) to create a smooth trailing effect. Use a `useCursor` hook that:
1. Attaches a `mousemove` listener to `window`
2. Stores target position in a ref (no React state — avoids re-renders)
3. Runs a `requestAnimationFrame` loop that interpolates current → target
4. Applies transform directly via ref to the cursor DOM node
5. Toggles CSS classes based on hovered element data attributes (`data-cursor="ring"`, `data-cursor="view"`)

### Form Validation Flow

Client-side only (no backend). On submit:
1. Validate name (≥2 chars) and phone (non-empty, basic pattern)
2. Invalid fields: border-bottom → `#E57373`, trigger shake animation
3. Valid: button text → "Sent!" + checkmark, 2s timeout, then reset

---

## Other Key Decisions

### Video Handling

The hero background video uses a native `<video>` element (not Next.js Image). Provide both MP4 (H.264) and WebM (VP9) sources. A JPEG poster frame displays immediately while the video loads. Under `prefers-reduced-motion`, freeze on the poster image and disable video autoplay.

### Image Strategy

All images are served via Next.js `<Image>` with `loading="lazy"` except the hero kimono figure (eager, above fold) and the contact background (eager when section approaches). Use `srcset` at 1x/2x for retina. The contact-bg is a large background image served via CSS `background-image` rather than `<Image>` since it needs parallax transform.

### No shadcn/ui Rationale

This landing page has zero standard UI patterns (no dialogs, dropdowns, tables, forms library). Every element is bespoke: polaroid cards, glassmorphism panels, timeline photo pairs, custom-styled inputs with bottom-border-only styling. Adding shadcn would introduce unused infrastructure without benefiting any component.
