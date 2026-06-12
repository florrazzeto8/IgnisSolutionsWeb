import { useEffect, useRef } from 'react';
import '../styles/portfolio.css';

interface Project {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
  tags: string[];
  device: 'laptop' | 'phones';
  link: string | null;
  linkLabel: string;
  accentColor: string;
  leftGradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    category: 'SOFTWARE A MEDIDA',
    categoryColor: '#00c8ff',
    title: 'Sistema de Stock',
    description:
      'Control total en tiempo real. Sistema operativo completo para gestión de inventario y ventas con dashboard en vivo.',
    tags: ['React', 'Node.js', 'Real-time'],
    device: 'laptop',
    link: null,
    linkLabel: 'PROYECTO PRIVADO',
    accentColor: '#00a8d6',
    leftGradient: 'linear-gradient(135deg, #001f4d 0%, #0b1528 100%)',
  },
  {
    id: 2,
    category: 'AUTOMATIZACIÓN',
    categoryColor: '#22c55e',
    title: 'Tienda Marista',
    description:
      'Tienda unificada que automatiza la gestión de pagos externos directamente a Google Sheets.',
    tags: ['Automation', 'E-commerce', 'Sheets API'],
    device: 'laptop',
    link: '#',
    linkLabel: 'VER PROYECTO →',
    accentColor: '#22c55e',
    leftGradient: 'linear-gradient(135deg, #001a0f 0%, #0b1528 100%)',
  },
  {
    id: 3,
    category: 'APP MÓVIL',
    categoryColor: '#a855f7',
    title: 'The Winemakers',
    description:
      'Digitalización de evaluaciones enológicas. Puntuación en tiempo real y trazabilidad total para eventos de cata.',
    tags: ['Mobile', 'Data Visualization', 'Live'],
    device: 'phones',
    link: '#',
    linkLabel: 'APP STORE →',
    accentColor: '#a855f7',
    leftGradient: 'linear-gradient(135deg, #1a0030 0%, #0b1528 100%)',
  },
  {
    id: 4,
    category: 'WEB APP',
    categoryColor: '#f59e0b',
    title: 'Dashboard Analítico',
    description:
      'Plataforma centralizada de métricas y KPIs. Reportes automáticos, alertas inteligentes y visualización en tiempo real.',
    tags: ['React', 'Python', 'Analytics'],
    device: 'laptop',
    link: '#',
    linkLabel: 'VER PROYECTO →',
    accentColor: '#f59e0b',
    leftGradient: 'linear-gradient(135deg, #1a0f00 0%, #0b1528 100%)',
  },
];

export const Portfolio = () => {
  const stackRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const eyebrow = eyebrowRef.current;
    if (eyebrow) {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            eyebrow.classList.add('revealed');
            obs.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      obs.observe(eyebrow);
    }
  }, []);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;

    const cards = Array.from(stack.querySelectorAll<HTMLElement>('.pf-card'));
    const N = cards.length;

    const tick = () => {
      const vh = window.innerHeight;
      const stackTop = stack.getBoundingClientRect().top + window.scrollY;
      const scrolled = window.scrollY - stackTop;

      cards.forEach((card, i) => {
        let depth = 0;
        for (let j = i + 1; j < N; j++) {
          // card j fully covers card i when scrolled = j * vh
          // start scale effect in the last 30% of card j's rise
          const coverAt = j * vh;
          const startAt = coverAt * 0.7;
          const progress = Math.max(0, Math.min(1, (scrolled - startAt) / (coverAt - startAt)));
          depth += progress;
        }
        const scale = Math.max(0.82, 1 - depth * 0.05);
        const brightness = Math.max(0.45, 1 - depth * 0.14);
        card.style.transform = `scale(${scale}) translateY(${-depth * 10}px)`;
        card.style.filter = `brightness(${brightness})`;
      });
    };

    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => window.removeEventListener('scroll', tick);
  }, []);

  return (
    <section className="portfolio-section" id="portfolio">
      <div className="pf-eyebrow" ref={eyebrowRef}>
        <div className="pf-mask-line">
          <span className="pf-mask-inner" style={{ transitionDelay: '0s' }}>NUESTRO TRABAJO</span>
        </div>
        <div className="pf-mask-line">
          <h2 className="pf-mask-inner" style={{ transitionDelay: '0.12s' }}>Portfolio</h2>
        </div>
      </div>
      <div className="portfolio-stack" ref={stackRef}>
        {projects.map((p, i) => (
          <div key={p.id} className="pf-card-wrapper" style={{ zIndex: i + 1 }}>
            <div
              className="pf-card"
              style={{ '--accent': p.accentColor } as React.CSSProperties}
            >
              <div className="pf-card-left" style={{ background: p.leftGradient }}>
                {p.device === 'laptop' ? (
                  <LaptopMockup accentColor={p.accentColor} />
                ) : (
                  <PhonesMockup accentColor={p.accentColor} />
                )}
              </div>

              <div className="pf-card-right">
                <span
                  className="pf-category"
                  style={{
                    color: p.categoryColor,
                    borderColor: p.categoryColor + '55',
                    background: p.categoryColor + '18',
                  }}
                >
                  {p.category}
                </span>
                <h3 className="pf-title">{p.title}</h3>
                <p className="pf-desc">{p.description}</p>
                <div className="pf-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="pf-tag">
                      {t}
                    </span>
                  ))}
                </div>
                {p.link ? (
                  <a href={p.link} className="pf-link">
                    {p.linkLabel}
                  </a>
                ) : (
                  <span className="pf-private">{p.linkLabel}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const LaptopMockup = ({ accentColor }: { accentColor: string }) => (
  <div className="laptop-mockup">
    <div className="laptop-screen" style={{ borderColor: accentColor + '55' }}>
      <div className="laptop-topbar">
        <span className="lm-dot" />
        <span className="lm-dot" />
        <span className="lm-dot" />
      </div>
      <div className="laptop-content">
        <div className="lc-sidebar">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="lc-bar" style={{ width: i === 0 ? '80%' : i % 2 === 0 ? '65%' : '70%' }} />
          ))}
        </div>
        <div className="lc-main">
          <div className="lc-header-row">
            <div className="lc-chip" style={{ background: accentColor + '44' }} />
            <div className="lc-chip" style={{ background: accentColor + '22', width: 40 }} />
            <div className="lc-chip" style={{ background: accentColor + '22', width: 40 }} />
          </div>
          <div className="lc-chart-area" style={{ borderColor: accentColor + '33' }}>
            <svg viewBox="0 0 100 38" preserveAspectRatio="none" width="100%" height="100%">
              <polyline
                points="0,34 12,26 25,30 38,16 52,20 65,9 80,13 100,6"
                fill="none"
                stroke={accentColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="0,34 12,26 25,30 38,16 52,20 65,9 80,13 100,6 100,38 0,38"
                fill={accentColor + '22'}
                stroke="none"
              />
            </svg>
          </div>
          <div className="lc-row-group">
            <div className="lc-row-item" />
            <div className="lc-row-item" style={{ opacity: 0.6 }} />
            <div className="lc-row-item" style={{ opacity: 0.4 }} />
          </div>
        </div>
      </div>
    </div>
    <div className="laptop-hinge" />
    <div className="laptop-base" />
  </div>
);

const PhonesMockup = ({ accentColor }: { accentColor: string }) => (
  <div className="phones-mockup">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="phone-frame"
        style={{
          transform: `translateX(${(i - 1) * 74}px) translateY(${i === 1 ? -18 : 4}px) rotate(${(i - 1) * 5}deg)`,
          zIndex: i === 1 ? 3 : 1,
          borderColor: accentColor + '66',
          boxShadow: i === 1 ? `0 12px 40px ${accentColor}33` : '0 8px 24px rgba(0,0,0,0.5)',
        }}
      >
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="ph-header" style={{ background: accentColor + '33' }} />
          <div className="ph-content">
            <div className="ph-bar" />
            <div className="ph-bar ph-bar-short" />
            <div className="ph-card-item" style={{ borderColor: accentColor + '44' }}>
              <div className="ph-dot" style={{ background: accentColor }} />
              <div className="ph-lines">
                <div className="ph-bar" />
                <div className="ph-bar ph-bar-short" />
              </div>
            </div>
            <div className="ph-card-item" style={{ borderColor: accentColor + '33' }}>
              <div className="ph-dot" style={{ background: accentColor + '66' }} />
              <div className="ph-lines">
                <div className="ph-bar" />
                <div className="ph-bar ph-bar-short" />
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
