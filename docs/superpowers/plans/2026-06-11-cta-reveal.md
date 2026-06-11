# CTAReveal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `CTAReveal` component between `<Services />` and `<LogoCarousel />` that rises as a card from below and plays a 3-panel scroll-driven animation with brand phrases.

**Architecture:** One CSS file with all keyframes/styles, one TSX component with IntersectionObserver (card rise) + scroll listener (per-slide `--slide-scroll` CSS var), one line change in App.tsx. No state — pure DOM manipulation via refs.

**Tech Stack:** React 18, TypeScript, plain CSS (no CSS-in-JS), Vite dev server

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `frontend/src/styles/cta-reveal.css` | All keyframes, card wrapper, slide, content, arrow styles |
| Create | `frontend/src/components/CTAReveal.tsx` | Component: IntersectionObserver rise + scroll tick |
| Modify | `frontend/src/App.tsx:69-71` | Import + insert `<CTAReveal />` after `<Services />` |

---

### Task 1: CSS — keyframes and card wrapper

**Files:**
- Create: `frontend/src/styles/cta-reveal.css`

- [ ] **Step 1: Create the CSS file**

```css
/* ── CTAReveal — card rise ── */
.cta-reveal-card {
  border-radius: 32px 32px 0 0;
  overflow: hidden;
  transform: translateY(120px);
  opacity: 0;
  transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.9s ease;
  border-top: 1px solid rgba(0, 200, 255, 0.3);
  box-shadow: 0 -24px 60px rgba(0, 200, 255, 0.14);
}

.cta-reveal-card.risen {
  transform: translateY(0);
  opacity: 1;
}

/* ── Keyframes ── */
@keyframes cr-bg-fade {
  from { background-color: #060d1f; }
  to   { background-color: var(--bg); }
}

@keyframes cr-slide-left {
  from { opacity: 0; transform: translateX(-110vw); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes cr-slide-right {
  from { opacity: 0; transform: translateX(110vw); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes cr-slide-down {
  from { opacity: 0; transform: translateY(-100%); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes cr-bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(12px); }
}

/* ── Slides ── */
.cr-slide {
  height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  background-color: #060d1f;
  overflow: hidden;
  animation: cr-bg-fade 0.2s linear 0s 1 normal both paused;
}

.cr-slide-1 { --bg: #00a8d6; }
.cr-slide-2 { --bg: #0052a3; }
.cr-slide-3 { --bg: #002f6c; }

/* scroll-driven delay — set via JS --slide-scroll (0→1) */
.cr-anim-bg  { animation-delay: calc(var(--slide-scroll, 0) * -0.2s)  !important; }
.cr-anim-txt { animation-delay: calc(var(--slide-scroll, 0) * -0.15s) !important; }

/* ── Content wrapper (carries slide-in animation) ── */
.cr-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cr-slide-1 .cr-content {
  animation: cr-slide-left  0.15s linear 0s 1 normal both paused;
  color: rgba(255, 255, 255, 0.92);
}

.cr-slide-2 .cr-content {
  animation: cr-slide-right 0.15s linear 0s 1 normal both paused;
  color: rgba(255, 255, 255, 0.92);
}

.cr-slide-3 .cr-content {
  animation: cr-slide-down  0.15s linear 0s 1 normal both paused;
  color: rgba(255, 255, 255, 0.92);
}

/* ── Headings ── */
.cr-slide h1 {
  font-size: clamp(28px, 5vw, 68px);
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1.1;
  margin: 0;
}

.cr-slide-1 h1 em {
  color: #ffffff;
  font-style: normal;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
}

.cr-slide-3 h1 em {
  color: #00c8ff;
  font-style: normal;
}

/* ── Scroll arrow ── */
.scroll-arrow {
  display: block;
  margin-top: 24px;
  font-size: 36px;
  animation: cr-bounce 1.1s ease-in-out infinite paused;
  pointer-events: none;
}

.cr-slide.done .scroll-arrow {
  animation-play-state: running;
}
```

- [ ] **Step 2: Verify file saved** — no build step needed, just confirm file exists at `frontend/src/styles/cta-reveal.css`

---

### Task 2: TSX component

**Files:**
- Create: `frontend/src/components/CTAReveal.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { useEffect, useRef } from 'react';
import '../styles/cta-reveal.css';

export const CTAReveal = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            card.classList.add('risen');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(card);

    const slides = Array.from(card.querySelectorAll<HTMLElement>('.cr-slide'));

    const tick = () => {
      const vh = window.innerHeight;
      const cardTop = card.getBoundingClientRect().top;

      // Slide 1: completes when card top reaches viewport top
      const s1 = Math.max(0, Math.min(1, (vh * 1.5 - cardTop) / (vh * 1.5)));
      slides[0]?.style.setProperty('--slide-scroll', String(s1));
      slides[0]?.classList.toggle('done', s1 >= 0.95);

      // Slide 2: starts when card top = 0, ends when slide center = viewport center
      const s2top = slides[1]?.getBoundingClientRect().top ?? 0;
      const s2 = Math.max(0, Math.min(1, (vh * 0.65 - s2top) / (vh * 0.475)));
      slides[1]?.style.setProperty('--slide-scroll', String(s2));
      slides[1]?.classList.toggle('done', s2 >= 0.95);

      // Slide 3: starts when slide top is at 65% of viewport
      const s3top = slides[2]?.getBoundingClientRect().top ?? 0;
      const s3 = Math.max(0, Math.min(1, (vh * 0.65 - s3top) / (vh * 0.57)));
      slides[2]?.style.setProperty('--slide-scroll', String(s3));
      slides[2]?.classList.toggle('done', s3 >= 0.95);
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', tick);
    };
  }, []);

  return (
    <div className="cta-reveal-card" ref={cardRef}>
      <div className="cr-slide cr-slide-1 cr-anim-bg">
        <div className="cr-content cr-anim-txt">
          <h1>
            No solo creamos código,<br />
            diseñamos tu <em>futuro</em>
          </h1>
          <span className="scroll-arrow">↓</span>
        </div>
      </div>

      <div className="cr-slide cr-slide-2 cr-anim-bg">
        <div className="cr-content cr-anim-txt">
          <h1>
            ¿Listo para escalar<br />
            tu negocio?
          </h1>
          <span className="scroll-arrow">↓</span>
        </div>
      </div>

      <div className="cr-slide cr-slide-3 cr-anim-bg">
        <div className="cr-content cr-anim-txt">
          <h1>
            Lo que hacemos habla<br />
            <em>por nosotros</em>
          </h1>
          <span className="scroll-arrow">↓</span>
        </div>
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Verify TypeScript compiles** — run from `frontend/`:

```bash
npx tsc --noEmit
```

Expected: no errors. If `slides[N]?.getBoundingClientRect()` errors, add `if (!slides[N]) return;` guards instead of optional chaining.

---

### Task 3: Wire into App.tsx

**Files:**
- Modify: `frontend/src/App.tsx`

- [ ] **Step 1: Add import** — insert after line 11 (`import { Services }...`):

```tsx
import { CTAReveal } from './components/CTAReveal';
```

- [ ] **Step 2: Insert component** — replace lines 69–71:

```tsx
      <Services />

      <CTAReveal />

      <LogoCarousel />
```

Full diff context:
```tsx
      <Services />

      <CTAReveal />        // ← ADD THIS LINE

      <LogoCarousel />

<Skills />
```

- [ ] **Step 3: Commit**

```bash
git add frontend/src/components/CTAReveal.tsx frontend/src/styles/cta-reveal.css frontend/src/App.tsx
git commit -m "feat: add CTAReveal scroll-driven animation section after Services"
```

---

### Task 4: Visual verification

- [ ] **Step 1: Start dev server** from `frontend/`:

```bash
npm run dev
```

- [ ] **Step 2: Open browser** at `http://localhost:5173` (or whatever port Vite reports)

- [ ] **Step 3: Scroll checklist**
  - [ ] Card rises from below with rounded top corners when Services section ends
  - [ ] Slide 1 (`#00a8d6` cyan): text slides from left, animation complete when card top = viewport top
  - [ ] Slide 2 (`#0052a3` blue): text slides from right, starts right after slide 1 completes
  - [ ] Slide 3 (`#002f6c` midnight): text slides from top of its own block, starts when slide 3 peeks at 65% vh
  - [ ] "futuro" renders in white with glow, "por nosotros" in `#00c8ff`
  - [ ] `↓` arrow appears and bounces when each slide is fully animated
  - [ ] LogoCarousel and Skills sections render normally after the card
  - [ ] Existing CTA section unchanged at end of page
