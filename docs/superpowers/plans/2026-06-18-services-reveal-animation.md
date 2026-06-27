# Services Reveal Animation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the horizontal-scroll services section with full-width bands that slide in from alternating sides on scroll, using GSAP ScrollTrigger.

**Architecture:** Three sequential tasks: (1) fix the broken SVG art index caused by the earlier service merge, (2) rewrite the static layout in both TSX and CSS, (3) wire up GSAP ScrollTrigger animation. Each task is independently verifiable in the browser.

**Tech Stack:** React 19, TypeScript, GSAP + `@gsap/react` (already installed), CSS custom properties.

## Global Constraints

- All commands run from `frontend/` directory
- Dev server: `npm run dev` (Vite)
- No test suite — verification is browser-based
- `@gsap/react` and `gsap` are already installed; do not add new deps
- CSS custom properties for band colors: `--band-bg`, `--band-accent`
- Class prefix for new elements: `sr-` (services-reveal)
- Do not touch any file except `Services.tsx` and `services.css`

---

### Task 1: Fix PANEL_ARTS SVG array

The earlier merge of Desarrollo Web + Desarrollo Mobile into Desarrollo de Software left PANEL_ARTS misaligned. SVG index 1 (monitor/web) and index 2 (phone/mobile) no longer have corresponding services and must be removed. After removal, `artIndex === idx` is correct again.

**Files:**
- Modify: `frontend/src/components/Services.tsx`

**Interfaces:**
- Produces: `PANEL_ARTS` array with 4 items — indices 0 (terminal), 1 (network nodes), 2 (atom), 3 (bar chart)

---

- [ ] **Step 1: Remove SVGs at original indices 1 and 2 from PANEL_ARTS**

Open `frontend/src/components/Services.tsx`. The `PANEL_ARTS` array currently has 6 items. Delete the entire second element (comment: `// Panel 2: Desarrollo Web — monitor 3D + UI elements flotando`, lines ~76–133) and the third element (comment: `// Panel 3: Desarrollo Mobile — smartphone 3D + app UI`, lines ~135–194). After deletion, the array must have exactly 4 elements in this order:

```
PANEL_ARTS[0]  // Panel 1: Desarrollo de Software — terminal isométrico + engranajes
PANEL_ARTS[1]  // Panel 4: Soluciones Empresariales — nodos conectados + workflow
PANEL_ARTS[2]  // Panel 5: I+D — átomo + curvas de datos
PANEL_ARTS[3]  // Panel 6: Consultoría — gráfico ascendente + red de personas
```

Update the comments on the surviving elements to reflect their new indices:
- Change `// Panel 4: Soluciones Empresariales` → `// Panel 1 (was 3): Soluciones Empresariales`
- Change `// Panel 5: I+D` → `// Panel 2 (was 4): I+D`
- Change `// Panel 6: Consultoría` → `// Panel 3 (was 5): Consultoría`

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Navigate to the services section. Confirm:
- 4 service panels visible
- Panel 1 (Desarrollo de Software) shows the terminal SVG ✓
- Panel 2 (Soluciones Empresariales) shows the network nodes SVG ✓
- Panel 3 (I+D) shows the atom SVG ✓
- Panel 4 (Consultoría) shows the bar chart SVG ✓

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/Services.tsx
git commit -m "fix: align PANEL_ARTS indices after service merge"
```

---

### Task 2: Rewrite static layout (CSS + TSX)

Replace the horizontal-scroll mechanism with a vertical stack of full-width bands. No GSAP yet — bands render statically. CSS and TSX change together since new class names span both files.

**Files:**
- Modify: `frontend/src/components/Services.tsx`
- Modify: `frontend/src/styles/services.css`

**Interfaces:**
- Consumes: `PANEL_ARTS` (4-item array from Task 1), `SERVICES` from `utils/constants.ts`
- Produces: `<section class="services-reveal">` containing `.sr-band` elements with `data-dir="left"|"right"` and CSS custom properties `--band-bg`, `--band-accent`

---

- [ ] **Step 1: Rewrite services.css**

Replace the entire contents of `frontend/src/styles/services.css` with:

```css
/* ── SERVICES REVEAL BANDS ── */

.services-reveal {
  position: relative;
  z-index: 10;
  padding-top: 100px;
}

.services-header {
  padding: 0 64px;
  margin-bottom: 24px;
}

.sr-band {
  width: 100vw;
  height: 240px;
  overflow: hidden;
  background: var(--band-bg, #060d1f);
  position: relative;
  display: flex;
  align-items: stretch;
}

/* franja on the LEFT edge for left-entry bands */
.sr-band[data-dir="left"]::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 6px;
  height: 100%;
  background: var(--band-accent, #00c8ff);
  z-index: 1;
}

/* franja on the RIGHT edge for right-entry bands */
.sr-band[data-dir="right"]::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  width: 6px;
  height: 100%;
  background: var(--band-accent, #00c8ff);
  z-index: 1;
}

.sr-inner {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 80px;
  gap: 40px;
}

/* right-entry bands: SVG on left, text on right */
.sr-band[data-dir="right"] .sr-inner {
  flex-direction: row-reverse;
}

.sr-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sr-art {
  width: min(300px, 35vw);
  flex-shrink: 0;
  aspect-ratio: 500 / 380;
}

/* ── SVG art frame (animated gradient border) ── */
@keyframes liquid-shift {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.panel-art {
  width: 100%;
  height: 100%;
  padding: 2px;
  background: linear-gradient(
    135deg,
    rgba(0, 200, 255, 0.75),
    rgba(0, 40, 160, 0.35),
    rgba(0, 200, 255, 0.18),
    rgba(0, 100, 255, 0.65),
    rgba(0, 200, 255, 0.75)
  );
  background-size: 300% 300%;
  animation: liquid-shift 5s ease infinite;
  border-radius: 16px;
  box-shadow:
    0 0 28px rgba(0, 200, 255, 0.18),
    0 0 56px rgba(0, 200, 255, 0.07);
}

.panel-art svg {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 14px;
  background: #050d1a;
}

/* ── Text styles ── */
.panel-title {
  font-size: clamp(28px, 3vw, 52px);
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1.02;
  color: #fff;
  margin: 0 0 10px 0;
}

.panel-desc {
  color: rgba(255, 255, 255, 0.6);
  font-size: clamp(13px, 1vw, 16px);
  line-height: 1.65;
  max-width: 520px;
  margin-bottom: 14px;
}

/* ── Tags ── */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.t {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.09);
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
}

/* ── Section label ── */
.sec-tag {
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--cyan);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.sec-tag::before {
  content: '';
  width: 22px;
  height: 2px;
  background: var(--cyan);
}
```

- [ ] **Step 2: Rewrite Services.tsx**

Replace the entire contents of `frontend/src/components/Services.tsx` with the following. The PANEL_ARTS array body (the SVG JSX) is taken verbatim from the current file after Task 1 — do not alter the SVG content, only the surrounding structure changes.

```tsx
import { SERVICES } from '../utils/constants';
import '../styles/services.css';

const PANEL_ARTS = [
  // Panel 0: Desarrollo de Software — terminal isométrico + engranajes
  /* --- PASTE SVG 0 from current file here (unchanged) --- */,

  // Panel 1 (was 3): Soluciones Empresariales — nodos conectados + workflow
  /* --- PASTE SVG 1 from current file here (unchanged) --- */,

  // Panel 2 (was 4): I+D — átomo + curvas de datos
  /* --- PASTE SVG 2 from current file here (unchanged) --- */,

  // Panel 3 (was 5): Consultoría — gráfico ascendente + red de personas
  /* --- PASTE SVG 3 from current file here (unchanged) --- */,
];

const BAND_COLORS = [
  { bg: '#060d1f', accent: '#00c8ff' },
  { bg: '#0b1528', accent: '#00a8d6' },
  { bg: '#0f1d36', accent: '#0052a3' },
  { bg: '#060d1f', accent: '#002f6c' },
];

export const Services = () => {
  return (
    <section className="services-reveal" id="services">
      <div className="services-header">
        <div className="sec-tag">Servicios</div>
      </div>
      {SERVICES.map((service, idx) => {
        const dir = idx % 2 === 0 ? 'left' : 'right';
        const { bg, accent } = BAND_COLORS[idx];
        return (
          <div
            key={idx}
            className="sr-band"
            data-dir={dir}
            style={{ '--band-bg': bg, '--band-accent': accent } as React.CSSProperties}
          >
            <div className="sr-inner">
              <div className="sr-text">
                <h2 className="panel-title">{service.title}</h2>
                <p className="panel-desc">{service.desc}</p>
                <div className="tags">
                  {service.tags.map((tag, ti) => (
                    <span key={ti} className="t">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="sr-art panel-art">
                {PANEL_ARTS[idx]}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
};
```

Note: The `/* --- PASTE SVG N --- */` placeholders must be replaced with the actual SVG JSX from the Task 1 result. The SVG elements themselves are unchanged — only the component wrapper changes.

- [ ] **Step 3: Verify static layout in browser**

```bash
npm run dev
```

Check:
- 4 bands render vertically, stacked, each ~240px tall
- Band 0: dark (`#060d1f`) bg, 6px cyan franja on LEFT, text on left, SVG on right
- Band 1: slightly lighter (`#0b1528`) bg, 6px franja on RIGHT, SVG on left, text on right
- Band 2: (`#0f1d36`) bg, franja on LEFT
- Band 3: (`#060d1f`) bg, franja on RIGHT
- "SERVICIOS" label appears above the bands
- No horizontal scroll behavior
- TypeScript compile: no errors (`npm run build` should pass)

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/Services.tsx frontend/src/styles/services.css
git commit -m "feat: rewrite services section as full-width reveal bands"
```

---

### Task 3: Add GSAP ScrollTrigger animation

Wire up the slide-in animation. Each band animates from offscreen when its scroll trigger fires.

**Files:**
- Modify: `frontend/src/components/Services.tsx`

**Interfaces:**
- Consumes: `.sr-band[data-dir]` elements rendered by Task 2
- Produces: Bands animate `translateX` from ±110vw to 0 when scrolled into view; reverse on scroll up

---

- [ ] **Step 1: Add GSAP imports and plugin registration**

At the top of `frontend/src/components/Services.tsx`, add these imports after the existing ones:

```tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

- [ ] **Step 2: Add ref and useGSAP hook to the Services component**

Replace the `export const Services = () => {` function with:

```tsx
export const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const bands = sectionRef.current?.querySelectorAll<HTMLElement>('.sr-band') ?? [];
    bands.forEach((band) => {
      const isLeft = band.dataset.dir === 'left';
      gsap.from(band, {
        x: isLeft ? -window.innerWidth * 1.1 : window.innerWidth * 1.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: band,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section className="services-reveal" id="services" ref={sectionRef}>
```

The only change to the JSX is adding `ref={sectionRef}` to the `<section>` element. Everything else in the return stays identical to Task 2.

- [ ] **Step 3: Verify animation in browser**

```bash
npm run dev
```

Scroll down to the services section and check:
- Band 0 starts offscreen-left and slides RIGHT into position when top of band reaches 80% of viewport height
- Band 1 starts offscreen-right and slides LEFT into position
- Band 2 starts offscreen-left, Band 3 starts offscreen-right
- Scrolling back up causes bands to slide back offscreen (reverse toggle)
- No console errors from GSAP
- First band (Band 0) may already be visible on page load if services section is near the top — this is expected since `start: 'top 80%'` fires immediately if already in view

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/Services.tsx
git commit -m "feat: add GSAP ScrollTrigger slide-in animation to services bands"
```
