import { useEffect, useRef } from 'react';
import { counter } from '../utils/animations';
import { ABOUT_STATS } from '../utils/constants';
import '../styles/about.css';

export const About = () => {
  const aboutZoneRef = useRef<HTMLDivElement | null>(null);
  const aboutCardRef = useRef<HTMLDivElement | null>(null);
  const heroInnerRef = useRef<HTMLDivElement | null>(null);
  const aboutInnerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateAbout = () => {
      if (!aboutZoneRef.current || !aboutCardRef.current) return;

      const rect = aboutZoneRef.current.getBoundingClientRect();
      const total =
        aboutZoneRef.current.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      const e = 1 - Math.pow(1 - p, 2);

      const w = 44 + 56 * e;
      const h = 40 + (window.innerHeight - 40) * e;
      const br = Math.round(16 * (1 - e));
      const shadowAlpha = e * 0.5;

      aboutCardRef.current.style.width = w + 'vw';
      aboutCardRef.current.style.height = h + 'px';
      aboutCardRef.current.style.borderRadius = `${br}px 0 0 ${br}px`;
      aboutCardRef.current.style.boxShadow = `-8px -8px 40px rgba(0,0,0,${shadowAlpha})`;

      const heroInner = document.querySelector<HTMLElement>('.hero-inner');
      if (heroInner) {
        heroInner.style.opacity = String(Math.max(0, 1 - p * 3));
      }

      const scrollHint = document.querySelector<HTMLElement>('.scroll-hint');
      if (scrollHint) {
        scrollHint.style.opacity = String(Math.max(0, 1 - p * 3));
      }

      if (aboutInnerRef.current) {
        const scale = w / 100;
        aboutInnerRef.current.style.transform = `scale(${scale})`;
      }
    };

    const scrollHandler = () => updateAbout();
    window.addEventListener('scroll', scrollHandler, { passive: true });
    updateAbout();

    return () => window.removeEventListener('scroll', scrollHandler);
  }, []);

  return (
    <div className="about-zone" ref={aboutZoneRef} id="about">
      <div className="about-sticky">
        <div className="about-card" ref={aboutCardRef}>
          <div className="about-inner" ref={aboutInnerRef}>
            <div className="about-left">
              <div className="about-block-title">
                <div className="about-tag">Sobre Nosotros</div>
                <h2>
                  Construimos el <span className="acc">futuro</span>
                  <br />
                  digital de tu <span className="acc">empresa</span>
                </h2>
              </div>
              <div className="about-block-text">
                <p>
                  Somos una software factory argentina con ADN tecnológico.
                  Combinamos metodologías ágiles, arquitecturas modernas y un
                  equipo apasionado para entregar soluciones digitales que
                  generan impacto real.
                </p>
                <p>
                  Desde startups hasta corporaciones, acompañamos cada etapa del
                  ciclo de vida del producto, desde la ideación hasta el
                  escalamiento en producción.
                </p>
              </div>
              <div className="about-stats">
                {ABOUT_STATS.map((stat, idx) => (
                  <div key={idx} className="about-stat">
                    <div className="about-stat-num">
                      <StatCounter target={stat.number} />+
                    </div>
                    <div className="about-stat-lbl">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-photo">
              <img
                src="/Gemini_Generated_Image_5l340c5l340c5l34 (1).png"
                alt="Equipo IGNIS"
                className="about-photo-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCounterProps {
  target: number;
}

const StatCounter: React.FC<StatCounterProps> = ({ target }) => {
  const countRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && countRef.current) {
          counter(target, 2000, (value) => {
            if (countRef.current) countRef.current.textContent = String(value);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (countRef.current) observer.observe(countRef.current);

    return () => observer.disconnect();
  }, [target]);

  return <span ref={countRef}>0</span>;
};
