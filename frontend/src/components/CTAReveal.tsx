import { useEffect, useRef } from 'react';
import '../styles/cta-reveal.css';

export const CTAReveal = ({ children }: { children?: React.ReactNode }) => {
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
      {children}
    </div>
  );
};
