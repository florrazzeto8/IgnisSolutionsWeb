import { useEffect, useRef, useState } from 'react';
import { useMouseTracker } from '../hooks/useMouseTracker';
import { Header } from '../components/Header';
import { ContactModal } from '../components/ContactModal';
import { ABOUT_STATS } from '../utils/constants';
import '../styles/sobre-nosotros.css';

const VALUES = [
  {
    icon: '⚡',
    title: 'Agilidad real',
    desc: 'Sprints de 2 semanas con entregables concretos. Ajustamos en tiempo real sin burocracia.',
  },
  {
    icon: '🏗️',
    title: 'Arquitectura que escala',
    desc: 'Diseñamos sistemas que crecen con tu negocio, no que necesitan ser reescritos cuando tenés éxito.',
  },
  {
    icon: '🤝',
    title: 'Equipo extendido',
    desc: 'No somos proveedores, somos el equipo tech que tu empresa necesita. Con ownership real del producto.',
  },
];

const SUBTITLE_WORDS =
  'Somos una software factory argentina con ADN tecnológico. Combinamos metodologías ágiles, arquitecturas modernas y un equipo apasionado para entregar soluciones que generan impacto real.'.split(' ');

const HEADING_WORD_COUNT = 7;
const TOTAL_WORDS = HEADING_WORD_COUNT + SUBTITLE_WORDS.length;

export const SobreNosotros = () => {
  useMouseTracker();

  const boxRef = useRef<HTMLDivElement>(null);
  const [litCount, setLitCount] = useState(0);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.he').forEach((el) => el.classList.add('in'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle('vis', e.isIntersecting));
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.fu').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (!boxRef.current) return;
      const rect = boxRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const boxCenter = rect.top + rect.height / 2;
      const progress = (viewH - boxCenter) / (viewH / 2);
      const clamped = Math.max(0, Math.min(1, progress));
      setLitCount(Math.round(clamped * TOTAL_WORDS));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const w = (index: number) =>
    `sn-word${litCount > index ? ' lit' : ''}`;

  const openModal = () => document.querySelector('.modal-overlay')?.classList.add('open');

  return (
    <div className="sn-page">
      <div className="cursor visible" id="cur" />
      <div className="cursor-ring visible" id="ring" />

      <Header />

      <main>
        {/* ── HERO ── */}
        <section className="sn-hero">
          <div className="sn-hero-orb-1" />
          <div className="sn-hero-orb-2" />
          <div className="sn-hero-inner">
            <div className="sn-reveal-box" ref={boxRef}>
              <h1 className="sn-heading">
                <span className={w(0)}>Construimos </span>
                <span className={w(1)}>el </span>
                <span className={`${w(2)} sn-em`}>futuro</span>
                <br />
                <span className={w(3)}>digital </span>
                <span className={w(4)}>de </span>
                <span className={w(5)}>tu </span>
                <span className={w(6)}>empresa</span>
              </h1>
              <p className="sn-subtitle">
                {SUBTITLE_WORDS.map((word, i) => (
                  <span key={i} className={w(HEADING_WORD_COUNT + i)}>
                    {word}{' '}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </section>

        {/* ── STORY ── */}
        <section className="sn-story">
          <div className="sn-story-inner">
            <div className="sn-story-photo fu">
              <img
                src="/Gemini_Generated_Image_5l340c5l340c5l34 (1).png"
                alt="Equipo IGNIS"
              />
            </div>
            <div className="sn-story-text">
              <span className="sn-section-label">Nuestra historia</span>
              <h2 className="sn-story-title fu">
                De la ideación al escalamiento
              </h2>
              <p className="fu d1">
                Nacimos con el propósito de cerrar la brecha entre las empresas
                y la tecnología de punta. Desde startups en etapa temprana hasta
                corporaciones establecidas, acompañamos cada etapa del ciclo de
                vida del producto.
              </p>
              <p className="fu d2">
                Nuestro equipo combina expertise técnico profundo con una visión
                de negocio clara. No solo escribimos código, entendemos el
                problema, diseñamos la solución y la llevamos a producción con
                cero sorpresas.
              </p>
              <div className="sn-stats">
                {ABOUT_STATS.map((stat, i) => (
                  <div key={i} className="sn-stat fu">
                    <span className="sn-stat-num">{stat.number}+</span>
                    <span className="sn-stat-lbl">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="sn-values">
          <div className="sn-values-inner">
            <div className="sn-values-header">
              <span className="sn-section-label">Nuestros valores</span>
              <h2 className="sn-values-title fu">Cómo trabajamos</h2>
            </div>
            <div className="sn-values-grid">
              {VALUES.map((v, i) => (
                <div key={i} className={`sn-value-card fu d${i + 1}`}>
                  <span className="sn-value-icon">{v.icon}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="sn-cta">
          <h2 className="fu">
            ¿Listo para construir
            <br />
            algo <em>extraordinario</em>?
          </h2>
          <p className="fu d1">Contanos tu proyecto y arrancamos.</p>
          <button className="sn-cta-btn" onClick={openModal}>
            Escribinos →
          </button>
        </section>
      </main>

      <ContactModal />
    </div>
  );
};
