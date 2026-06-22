import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/cta-reveal.css';

gsap.registerPlugin(ScrollTrigger);

export const CTAReveal = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const card = cardRef.current;
    const services = document.querySelector<HTMLElement>('.services-reveal');
    if (!card || !services) return;

    // Card starts fixed below the viewport
    gsap.set(card, {
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: '100%',
      height: '100vh',
      yPercent: 100,
      zIndex: 20,
    });

    const ctx = gsap.context(() => {
      gsap.to(card, {
        yPercent: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: services,
          start: 'bottom bottom',
          end: '+=100%',
          scrub: 0.6,
          onLeave: () => {
            // Rise complete — card enters normal flow as first block of cta-portfolio-zone
            gsap.set(card, { clearProps: 'all' });
          },
          onEnterBack: () => {
            // User scrolled back — restore fixed position
            gsap.set(card, {
              position: 'fixed',
              left: 0,
              bottom: 0,
              width: '100%',
              height: '100vh',
              zIndex: 20,
            });
          },
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="cta-card" ref={cardRef}>
      <div className="cr-slide cr-slide-3">
        <div className="cr-content">
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
