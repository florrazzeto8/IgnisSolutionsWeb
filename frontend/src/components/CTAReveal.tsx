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
      // Single timeline: rise (100vh) → hold (100vh) → exit (100vh)
      // pinSpacing: true pushes the portfolio zone below the 300vh pin range
      // so the card is fully gone before portfolio enters the viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: services,
          start: 'bottom bottom',
          end: '+=300%',
          pin: true,
          pinSpacing: true,
          scrub: true,
        },
      });

      tl.fromTo(card, { yPercent: 100 }, { yPercent: 0, ease: 'none', duration: 1 });
      tl.to(card, { yPercent: 0, ease: 'none', duration: 1 });
      tl.to(card, { yPercent: -100, ease: 'none', duration: 1 });
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
