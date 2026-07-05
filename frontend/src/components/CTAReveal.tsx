import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/cta-reveal.css';

gsap.registerPlugin(ScrollTrigger);

const CardContent = () => (
  <div className="cr-slide">
    <div className="cr-content">
      <h1>
        Resultados que hablan<br />
        <em>por sí solos</em>
      </h1>
      <span className="scroll-arrow">↓</span>
    </div>
  </div>
);

export const CTAReveal = () => {
  const fixedRef = useRef<HTMLDivElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const fixed = fixedRef.current;
    const flow = flowRef.current;
    const services = document.querySelector<HTMLElement>('.services-reveal');
    if (!fixed || !flow || !services) return;

    gsap.set(fixed, { y: '100%' });
    gsap.set(flow, { visibility: 'hidden' });

    // Single phase — pin Services while CTA rises fully from bottom to viewport top.
    // Text is centered in the 100vh card — naturally enters viewport from below as card rises.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: services,
        start: 'bottom bottom',
        end: () => '+=' + window.innerHeight,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    tl.to(fixed, { y: '0%', ease: 'none' });

    // Hand-off: when cta-flow.top = 0 (viewport top), swap fixed→flow seamlessly.
    let settled = false;
    const onScroll = () => {
      const flowTop = flow.getBoundingClientRect().top;
      if (flowTop <= 0 && !settled) {
        settled = true;
        gsap.set(fixed, { display: 'none' });
        gsap.set(flow, { visibility: 'visible' });
      } else if (flowTop > 0 && settled) {
        settled = false;
        gsap.set(fixed, { display: '' });
        gsap.set(flow, { visibility: 'hidden' });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });

  return (
    <>
      <div className="cta-card cta-fixed" ref={fixedRef}>
        <CardContent />
      </div>
      <div className="cta-card cta-flow" ref={flowRef}>
        <CardContent />
      </div>
    </>
  );
};
