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

Each slide: `height: 65vh`, `overflow: hidden`, `background-color: #060d1f` initially (animates to target color via scroll).

| Slide | Background | Text color | Em color | Text enters from |
|-------|-----------|------------|----------|-----------------|
| 1 | `#00a8d6` | `rgba(255,255,255,0.92)` | `#ffffff` + glow | Left (off-screen) |
| 2 | `#0052a3` | `rgba(255,255,255,0.92)` | — | Right (off-screen) |
| 3 | `#002f6c` | `rgba(255,255,255,0.92)` | `#00c8ff` | Top (within block) |

**Phrases:**
1. *"No solo creamos código, diseñamos tu **futuro**"* — `<em>futuro</em>` highlighted
2. *"¿Listo para escalar tu negocio?"*
3. *"Lo que hacemos habla **por nosotros**"* — `<em>por nosotros</em>` highlighted

---

## Scroll Animation

Each slide independently calculates `--slide-scroll` (0→1) via `getBoundingClientRect()`:

```js
// Slide 1: completes when card.top reaches 0 (card fully at viewport top)
s1 = clamp(0, 1, (vh * 1.5 - cardTop) / (vh * 1.5))

// Slide 2: starts when card.top = 0, ends when slide 2 center = viewport center
s2 = clamp(0, 1, (vh * 0.65 - s2top) / (vh * 0.475))

// Slide 3: starts when slide 3 top is at 65% of viewport
s3 = clamp(0, 1, (vh * 0.65 - s3top) / (vh * 0.57))
```

CSS animations are **paused** and driven by negative `animation-delay`:
```css
.cr-anim-bg  { animation-delay: calc(var(--slide-scroll, 0) * -0.2s)  !important; }
.cr-anim-txt { animation-delay: calc(var(--slide-scroll, 0) * -0.15s) !important; }
```

Both the background color (`bgFade`) and the content wrapper (`slideInLeft/Right/Down`) use `animation: ... 1 normal both paused` (full shorthand to prevent fill-mode reset).

---

## Scroll Arrow

- Rendered as `<span class="scroll-arrow">↓</span>` inside each `.cr-content` wrapper
- Enters **together with the text** (same `.cr-content` wrapper, same animation)
- Font size: `36px`
- `bounce-arrow` keyframe loops (`translateY 0→12px→0`, 1.1s ease-in-out)
- Bounce starts only when slide gets `.done` class (`--slide-scroll >= 0.95`)
- Bounce paused by default, running on `.cr-slide.done .scroll-arrow`

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
@keyframes slideInDown  { from { opacity:0; transform:translateY(-100%);  } to { opacity:1; transform:translateY(0); } }
@keyframes bounce-arrow { 0%,100% { transform:translateY(0); } 50% { transform:translateY(12px); } }
```

---

## Typography

- H1 font: `clamp(28px, 5vw, 68px)`, `font-weight: 900`, `letter-spacing: -2px`
- Site font (already global): inherits from `body`
