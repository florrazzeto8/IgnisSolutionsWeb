# CTA Reveal Section — Design Spec
**Date:** 2026-06-11  
**Branch:** feat/about

---

## Overview

A new `CTAReveal` component inserted between `<Services />` and `<LogoCarousel />` in `App.tsx`. It appears as a card rising from below after the services section, then plays a 3-panel scroll-driven animation with brand phrases. The existing `<CTA />` section at the end of the page remains untouched.

---

## Structure in App.tsx

```
<Services />
<CTAReveal />       ← NEW
<LogoCarousel />
<Skills />
<CTA />
<Footer />
```

---

## Card Rise

- Card starts at `transform: translateY(120px); opacity: 0`
- IntersectionObserver (threshold: 0.05) triggers `.risen` class → CSS transition:
  `transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease`
- Card visual style: `border-radius: 32px 32px 0 0`, `border-top: 1px solid rgba(0,200,255,0.3)`, `box-shadow: 0 -24px 60px rgba(0,200,255,0.14)`
- Full viewport width, no horizontal margins

---

## 3 Slide Panels

Each slide: `height: 100vh`, `overflow: hidden`, `background-color: #060d1f` initially (animates to target color via scroll).

| Slide | Background | Text color | Em color | Text enters from |
|-------|-----------|------------|----------|-----------------|
| 1 | `#00c8ff` (cyan) | `#060d1f` (navy) | `#1a3aff` (blue) | Left (off-screen) |
| 2 | `#1a3aff` (royal blue) | `#ffffff` | — | Right (off-screen) |
| 3 | `#ffffff` (white) | `#060d1f` (navy) | `#1a3aff` (blue) | Top (off-screen) |

**Phrases:**
1. *"No solo creamos código, diseñamos tu **futuro**"* — `<em>futuro</em>` highlighted
2. *"¿Listo para escalar tu negocio?"*
3. *"Lo que hacemos habla **por nosotros**"* — `<em>por nosotros</em>` highlighted

---

## Scroll Animation

Each slide independently calculates `--slide-scroll` (0→1) via `getBoundingClientRect()`:

Each slide tracks its own `--slide-scroll` (0→1) via `getBoundingClientRect()` on the scroll event. Progress is `clamp(0, 1, (triggerY - slideTop) / range)` where `triggerY` and `range` are tuned per slide so the animation completes while the slide fills the viewport.

CSS animations are **paused** and driven by negative `animation-delay`:
```css
.cr-anim-bg  { animation-delay: calc(var(--slide-scroll, 0) * -0.2s)  !important; }
.cr-anim-txt { animation-delay: calc(var(--slide-scroll, 0) * -0.15s) !important; }
```

Both the background color (`bgFade`) and the content wrapper (`slideInLeft/Right/Down`) use `animation: ... 1 normal both paused` (full shorthand to prevent fill-mode reset).

---

## Files to Create/Modify

| Action | File |
|--------|------|
| Create | `frontend/src/components/CTAReveal.tsx` |
| Create | `frontend/src/styles/cta-reveal.css` |
| Modify | `frontend/src/App.tsx` — insert `<CTAReveal />` after `<Services />` |

---

## CSS Keyframes

```css
@keyframes bgFade {
  from { background-color: #060d1f; }
  to   { background-color: var(--bg); }
}
@keyframes slideInLeft  { from { opacity:0; transform:translateX(-110vw); } to { opacity:1; transform:translateX(0); } }
@keyframes slideInRight { from { opacity:0; transform:translateX(110vw);  } to { opacity:1; transform:translateX(0); } }
@keyframes slideInDown  { from { opacity:0; transform:translateY(-80vh);  } to { opacity:1; transform:translateY(0); } }
```

---

## Typography

- H1 font: `clamp(28px, 5vw, 68px)`, `font-weight: 900`, `letter-spacing: -2px`
- Site font (already global): inherits from `body`
