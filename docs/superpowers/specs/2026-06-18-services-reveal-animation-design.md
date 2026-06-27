# Services Reveal Animation — Design Spec
Date: 2026-06-18

## Overview

Replace the current horizontal-scroll services section with a vertical stack of full-width bands that slide in from alternating sides (left/right) as the user scrolls down.

---

## Layout

Each service is rendered as a full-viewport-width horizontal band (~240px tall). Content inside each band is a flex row with text on one side and the SVG illustration on the other, alternating by index.

```
BAND 0  [franja | TEXT (title + desc + tags) | SVG art ]  ← slides from LEFT
BAND 1  [ SVG art | TEXT                     | franja  ]  ← slides from RIGHT
BAND 2  [franja | TEXT                       | SVG art ]  ← slides from LEFT
BAND 3  [ SVG art | TEXT                     | franja  ]  ← slides from RIGHT
```

- **Width**: `100vw` (full viewport, no horizontal padding on the band itself)
- **Height**: `~240px` (rectangular, not square)
- **Inner padding**: `0 80px` on the `.sr-inner` flex container
- **Franja**: 6px vertical colored strip on the entry edge (left edge for left-entry bands, right edge for right-entry bands)
- **SVG container**: fixed width ~`min(300px, 35vw)`, same aspect ratio as current (`500/380`)
- **Text**: `flex: 1`, contains `.panel-title` (large), `.panel-desc`, `.tags`

---

## Colors

| Band | Index | BG Color  | Franja Color | Slide from |
|------|-------|-----------|--------------|------------|
| 0    | even  | `#060d1f` | `#00c8ff`    | LEFT       |
| 1    | odd   | `#0b1528` | `#00a8d6`    | RIGHT      |
| 2    | even  | `#0f1d36` | `#0052a3`    | LEFT       |
| 3    | odd   | `#060d1f` | `#002f6c`    | RIGHT      |

Colors are applied via CSS custom properties on each band: `--band-bg` and `--band-accent`.

---

## Animation

**Mechanism**: GSAP ScrollTrigger, one trigger per band.

**Initial state**: each band starts fully offscreen:
- Even bands (from left): `x: -window.innerWidth * 1.1`
- Odd bands (from right): `x: window.innerWidth * 1.1`

**Trigger**: `gsap.from(band, { x, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: band, start: 'top 80%', toggleActions: 'play none none reverse' } })`

`toggleActions: 'play none none reverse'` — band slides back out if user scrolls back up past it.

**No scrub** — animation plays at full speed when trigger fires, not tied frame-by-frame to scroll position.

---

## SVG Art Index Fix

After merging Desarrollo Web + Desarrollo Mobile into Desarrollo de Software, the `artIndex` mapping broke. Fix: remove SVGs at index 1 (monitor/web) and index 2 (phone/mobile) from `PANEL_ARTS`. New mapping:

| Service                  | PANEL_ARTS index |
|--------------------------|-----------------|
| Desarrollo de Software   | 0 (terminal)    |
| Soluciones Empresariales | 1 (nodos) ← was 3 |
| I+D                      | 2 (átomo) ← was 4 |
| Consultoría              | 3 (gráfico) ← was 5 |

After removing the two unused SVGs, `artIndex` is simply `idx` again.

---

## Files Changed

### `frontend/src/components/Services.tsx`
- Remove: `zoneRef`, `gridRef`, `dotsRef`, horizontal scroll `useEffect`, `hscroll-dots` JSX
- Add: `useGSAP` hook (from `@gsap/react`) + ScrollTrigger registration
- Add: `data-dir` attribute per band (`"left"` | `"right"`) for GSAP targeting
- Fix: Remove SVGs 1 and 2 from `PANEL_ARTS`; artIndex becomes simply `idx`
- Change: outer wrapper `services-zone` → `services-reveal`; inner band classname `service-panel` → `sr-band`
- Keep: `.sec-tag` label above the bands

### `frontend/src/styles/services.css`
- Remove: all horizontal scroll zone styles (`.services-zone`, `.cards-grid` flex-row, `.hscroll-dot`, sticky positioning)
- Add: `.services-reveal` — simple block wrapper, `position: relative`, `z-index: 10`, `padding-top: 100px` for the header area above the bands
- Add: `.sr-band` — `width: 100vw`, `height: 240px`, `overflow: hidden`, `background: var(--band-bg)`, flex row, `position: relative`
- Add: `.sr-accent` — `width: 6px`, `height: 100%`, `background: var(--band-accent)`, positioned absolute on entry edge
- Add: `.sr-inner` — `flex: 1`, flex row, `align-items: center`, `padding: 0 80px`, `gap: 40px`
- Add: `.sr-art` — `width: min(300px, 35vw)`, `flex-shrink: 0`
- Keep: `.panel-title`, `.panel-desc`, `.tags`, `.t`, `.sec-tag` styles (unchanged)

---

## Out of Scope

- Mobile responsive breakpoints (not requested)
- Hover effects on bands
- Any changes to other sections
