# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands run from the `frontend/` directory:

```bash
npm run dev        # start dev server (Vite)
npm run build      # type-check then bundle (tsc -b && vite build)
npm run lint       # ESLint
npm run preview    # preview production build locally
```

No test suite exists.

## Architecture

Single-page React 19 + TypeScript app built with Vite. All code lives under `frontend/src/`.

**Routing** (`App.tsx`): Three routes via react-router-dom v7 — `/` (HomePage), `/sobre-nosotros` (SobreNosotros), `/trabaja-con-nosotros` (TrabajaConNosotros).

**Static content**: All copy, service cards, process steps, stats, and skill data live in `utils/constants.ts`. Edit there when updating text.

**Styling**: Each component has a paired CSS file in `styles/`. Design tokens (colors, transitions) are CSS custom properties in `styles/variables.css`. `styles/global.css` defines global layout primitives and the two animation utility classes below.

**Animation system** — two CSS-class patterns driven by class toggling, not React state:
- `.fu` / `.fu.vis` — fade-up on scroll. `HomePage` sets up a single `IntersectionObserver` that toggles `.vis` on all `.fu` elements. Use `d1`–`d4` modifier classes for staggered delays.
- `.he` / `.he.in` — hero entrance after loader. `handleLoaderFinish` in `HomePage` imperatively adds `.in` to all `.he` elements with staggered `setTimeout`s.

**Custom cursor**: Two DOM elements (`#cur`, `#ring`) in `HomePage` are positioned via `useMouseTracker`. The cursor is hidden until the loader finishes (`.visible` class toggled via React state).

**Particle system**: `ParticleSystem` renders a full-viewport `<canvas id="particles">` fixed behind the hero. Particle logic lives in `utils/particles.ts`; the canvas is `position: fixed` and `z-index: 0` so page content scrolls over it. The `.cta-portfolio-zone` wrapper (`z-index: 2`, solid background) visually buries the particles for the portfolio section.

**Contact modal**: Opened imperatively via `document.querySelector('.modal-overlay')?.classList.add('open')` — no React state involved. The modal lives in `ContactModal.tsx`.

**GSAP**: Used for complex scroll-triggered animations. Import via `@gsap/react` (`useGSAP` hook).
