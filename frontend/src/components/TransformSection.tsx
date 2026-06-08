import { useEffect, useRef } from 'react';
import '../styles/transform-section.css';

const HEADLINE_LINES = ['Impulsando la', 'transformación digital'];

const PulseSVG = () => (
  <svg
    className="transform-pulse-svg"
    width="80"
    height="24"
    viewBox="0 0 80 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <polyline
      className="transform-pulse-line"
      points="0,12 15,12 20,4 25,20 30,2 35,22 40,12 55,12 60,4 65,20 70,2 75,22 80,12"
    />
  </svg>
);

const MARQUEE_ITEMS = [0, 1, 2, 3, 4, 5];

const MarqueeSet = () => (
  <>
    {MARQUEE_ITEMS.map((i) => (
      <div key={i} className="transform-marquee-item">
        <span className="transform-marquee-label">Keep Scrolling</span>
        <PulseSVG />
      </div>
    ))}
  </>
);

export const TransformSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.disconnect();
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="transform-section">
      <h2 ref={headlineRef} className="transform-headline">
        {HEADLINE_LINES.map((line, i) => (
          <div key={i} className="mask-line">
            <span
              className="mask-line-inner"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              {line}
            </span>
          </div>
        ))}
      </h2>
      <div className="transform-pill" aria-hidden="true">
        <div className="transform-marquee-track">
          <MarqueeSet />
          <MarqueeSet />
        </div>
      </div>
    </section>
  );
};
