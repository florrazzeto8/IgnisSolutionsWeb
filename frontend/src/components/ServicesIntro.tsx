import { useEffect, useRef } from 'react';
import { ContactModal } from './ContactModal';
import '../styles/services-intro.css';

export const ServicesIntro = () => {
  const zoneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);
  const origBtnRef = useRef<HTMLButtonElement>(null);
  const floatBtnRef = useRef<HTMLButtonElement>(null);

  const openModal = () => document.querySelector('.modal-overlay')?.classList.add('open');

  useEffect(() => {
    let rafId: number | null = null;
    let landed = false;
    let savedX = 0;
    let savedY = 0;
    let savedFS = 24;

    const zone = zoneRef.current;
    const card = cardRef.current;
    const phrase = phraseRef.current;
    const origBtn = origBtnRef.current;
    const fBtn = floatBtnRef.current;
    if (!zone || !card || !phrase || !origBtn || !fBtn) return;

    const servicesZone = document.querySelector('.services-zone') as HTMLElement | null;

    const updateAll = () => {
      const rect = zone.getBoundingClientRect();
      const total = zone.offsetHeight - window.innerHeight;
      const raw = Math.max(0, -rect.top / total);
      const vh = window.innerHeight;
      const phraseH = phrase.offsetHeight;

      // ── Phase 1 (raw 0→0.35): card reveals bottom→top ──
      const p1 = Math.min(1, raw / 0.35);
      const e1 = 1 - Math.pow(1 - p1, 2); // quadratic: card at ~65% when raw=0.15
      card.style.clipPath = `inset(${(1 - e1) * 100}% 0 0 0 round 28px)`;

      // ── Phase 2 (raw 0.15→0.45): phrase enters from below to center ──
      // starts when card is ~65% revealed (screenshot height)
      const p2 = Math.max(0, Math.min(1, (raw - 0.15) / 0.3));
      const e2 = 1 - Math.pow(1 - p2, 2);
      const enterStart = (vh + phraseH) / 2;
      const enterOffset = enterStart * (1 - e2);

      // ── Phase 3 (raw 0.45→0.75): phrase center → near-top ──
      const p3 = Math.max(0, Math.min(1, (raw - 0.45) / 0.3));
      const e3 = 1 - Math.pow(1 - p3, 2);
      const deltaY = -(vh - phraseH) / 2; // phrase top → 0 = viewport top
      const exitOffset = deltaY * e3;

      phrase.style.transform = `translateY(${enterOffset + exitOffset}px)`;

      // ── Floating button ──
      const pr = phrase.getBoundingClientRect();
      const obr = origBtn.getBoundingClientRect();
      const vw = window.innerWidth;
      const endX = vw - 210;
      const endY = 28;

      // Once landed, fly toward CTA button at bottom of page
      if (landed) {
        origBtn.style.opacity = '0';
        fBtn.style.display = 'flex';

        const ctaBtnEl = document.querySelector('.cta-btns .btn-primary') as HTMLElement | null;
        const fW = fBtn.offsetWidth;
        const fH = fBtn.offsetHeight;

        if (ctaBtnEl) {
          const cbr = ctaBtnEl.getBoundingClientRect();

          if (cbr.bottom < 0) {
            // Scrolled past CTA — hide
            fBtn.style.opacity = '0';
            fBtn.style.pointerEvents = 'none';
          } else if (cbr.top > vh) {
            // CTA not yet in view — stay at top-right
            fBtn.style.left = endX + 'px';
            fBtn.style.top = endY + 'px';
            fBtn.style.fontSize = '18px';
            fBtn.style.padding = '10px 20px';
            fBtn.style.borderRadius = '100px';
            fBtn.style.opacity = '1';
            fBtn.style.pointerEvents = 'all';
            ctaBtnEl.style.opacity = '1';
          } else {
            // CTA entering view — fly toward it
            const targetX = cbr.left + cbr.width / 2 - fW / 2;
            const targetY = cbr.top + cbr.height / 2 - fH / 2;
            const distTraveled = vh - cbr.top;
            const ctaP = Math.max(0, Math.min(1, distTraveled / (vh * 0.5)));
            const ease = 1 - Math.pow(1 - ctaP, 3);

            fBtn.style.left = endX + (targetX - endX) * ease + 'px';
            fBtn.style.top = endY + (targetY - endY) * ease + 'px';
            fBtn.style.fontSize = 18 + (14.5 - 18) * ease + 'px';
            fBtn.style.padding = `${(10 + (14 - 10) * ease).toFixed(1)}px ${(20 + (30 - 20) * ease).toFixed(1)}px`;
            fBtn.style.borderRadius = 100 + (10 - 100) * ease + 'px';
            fBtn.style.opacity = '1';
            fBtn.style.pointerEvents = 'all';
            ctaBtnEl.style.opacity = String(Math.max(0, 1 - ease * 2));
          }
        } else {
          // Fallback: old behavior
          fBtn.style.left = endX + 'px';
          fBtn.style.top = endY + 'px';
          fBtn.style.fontSize = '18px';
          fBtn.style.padding = '10px 20px';
          const zb = servicesZone ? servicesZone.getBoundingClientRect().bottom : window.innerHeight;
          const hidden = zb < window.innerHeight;
          fBtn.style.opacity = hidden ? '0' : '1';
          fBtn.style.pointerEvents = hidden ? 'none' : 'all';
        }

        if (pr.top > 8 && raw < 0.5) {
          landed = false;
          fBtn.classList.remove('landed');
          fBtn.style.borderRadius = '';
          if (ctaBtnEl) ctaBtnEl.style.opacity = '';
        }
        return;
      }

      if (pr.top > 8) {
        savedX = obr.left;
        savedY = obr.top;
        savedFS = parseFloat(getComputedStyle(origBtn).fontSize);
        origBtn.style.opacity = '1';
        fBtn.style.display = 'none';
      } else {
        origBtn.style.opacity = '0';
        fBtn.style.display = 'flex';

        const scrolledPast = -pr.top;
        const bp = Math.max(0, Math.min(1, scrolledPast / (vh * 1.0)));
        const ep = 1 - Math.pow(1 - bp, 3);

        fBtn.style.left = savedX + (endX - savedX) * ep + 'px';
        fBtn.style.top = savedY + (endY - savedY) * ep + 'px';
        fBtn.style.opacity = String(0.4 + 0.6 * ep);
        fBtn.style.fontSize = savedFS + (18 - savedFS) * ep + 'px';
        fBtn.style.padding = `10px ${(24 + (20 - 24) * ep).toFixed(1)}px`;

        if (bp >= 0.95) {
          landed = true;
          fBtn.classList.add('landed');
        }
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateAll();
        rafId = null;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateAll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div className="si-zone" ref={zoneRef} id="servicesIntro">
        <div className="si-sticky">
          <div className="si-card" ref={cardRef}>
            <div className="si-inner">
              <div className="intro-phrase" ref={phraseRef}>
                <span className="line">Lo que construimos</span>{' '}
                <button className="escribinos-btn" ref={origBtnRef} onClick={openModal}>
                  Escribinos ↗
                </button>{' '}
                <span className="line">para vos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button className="escribinos-float" ref={floatBtnRef} onClick={openModal}>
        Escribinos ↗
      </button>

      <ContactModal />
    </>
  );
};
