import { useEffect, useRef } from 'react';
import '../styles/services-intro.css';

export const ServicesIntro = () => {
  const zoneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const phraseRef = useRef<HTMLDivElement>(null);
  const origBtnRef = useRef<HTMLButtonElement>(null);
  const floatBtnRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => modalRef.current?.classList.add('open');
  const closeModal = () => modalRef.current?.classList.remove('open');

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
      const endY = 90;

      // Once landed, lock position and stop recalculating
      if (landed) {
        origBtn.style.opacity = '0';
        fBtn.style.display = 'flex';
        fBtn.style.left = endX + 'px';
        fBtn.style.top = endY + 'px';
        fBtn.style.fontSize = '18px';
        fBtn.style.padding = '10px 20px';
        // Hide when services-zone starts exiting (all panels shown)
        const zb = servicesZone ? servicesZone.getBoundingClientRect().bottom : window.innerHeight;
        const hidden = zb < window.innerHeight;
        fBtn.style.opacity = hidden ? '0' : '1';
        fBtn.style.pointerEvents = hidden ? 'none' : 'all';
        // Un-land only if user scrolls clearly back up
        if (pr.top > 8 && raw < 0.5) {
          landed = false;
          fBtn.classList.remove('landed');
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

  // Modal keyboard + overlay-click close
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    const onOverlay = (e: MouseEvent) => { if (e.target === modal) closeModal(); };
    document.addEventListener('keydown', onKey);
    modal.addEventListener('click', onOverlay);
    return () => {
      document.removeEventListener('keydown', onKey);
      modal.removeEventListener('click', onOverlay);
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

      <div className="modal-overlay" ref={modalRef}>
        <div className="modal-box">
          <button className="modal-close" onClick={closeModal}>✕</button>
          <div className="modal-columns">
            <div className="modal-form-col">
              <h3>Hablemos de tu proyecto</h3>
              <p className="modal-sub">Completá el formulario y te respondemos en menos de 24hs.</p>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <input type="text" placeholder="Tu nombre completo" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email de contacto" required />
                </div>
                <div className="form-group">
                  <input type="text" placeholder="Empresa / Proyecto" />
                </div>
                <div className="form-group">
                  <textarea placeholder="Contanos sobre tu idea..." rows={4}></textarea>
                </div>
                <button type="submit" className="submit-btn">Enviar mensaje →</button>
              </form>
            </div>

            <div className="modal-social-col">
              <h4 className="social-heading">
                Tambien podes contactarte a través de nuestras redes sociales
              </h4>
              <ul className="social-icons-list">
                <li>
                  <a
                    href="https://wa.me/5493512397098"
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-link"
                  >
                    <span className="soc-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="28" height="28">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                      </svg>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/ignis-solutions-ia/?originalSubdomain=ar"
                    target="_blank"
                    rel="noreferrer"
                    className="linkedin-link"
                  >
                    <span className="soc-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="28" height="28">
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                      </svg>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
