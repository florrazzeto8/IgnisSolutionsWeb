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
        Lo que hacemos habla<br />
        <em>por nosotros</em>
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

    // PHASE 1 — pin Services for 50vh while CTA rises from bottom to viewport center.
    // end uses a function — GSAP doesn't parse CSS vh units in strings (treats '+=50vh' as 50px).
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: services,
        start: 'bottom bottom',
        end: () => '+=' + window.innerHeight * 0.85,
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    tl.to(fixed, { y: '15%', ease: 'none' });

    // PHASE 2 — Services now in normal flow scrolling up.
    // CTA finishes covering (y:15% → y:0%) while Services scrolls away.
    // immediateRender:false → don't apply FROM (y:15%) at creation time, which would override
    // gsap.set(fixed, { y:'100%' }). invalidateOnRefresh:true → re-measure flow position after
    // Phase 1 pin spacer is inserted so Phase 2 starts exactly where Phase 1 ends.
    gsap.fromTo(fixed,
      { y: '15%' },
      {
        y: '0%',
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: flow,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      }
    );

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
