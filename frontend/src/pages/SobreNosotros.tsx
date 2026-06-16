import { useEffect } from 'react';
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

export const SobreNosotros = () => {
  useMouseTracker();

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
            <span className="sn-tag">Sobre Nosotros</span>
            <h1 className="sn-heading fu">
              Construimos el <em>futuro</em>
              <br />
              digital de tu empresa
            </h1>
            <p className="sn-subtitle fu d1">
              Somos una software factory argentina con ADN tecnológico.
              Combinamos metodologías ágiles, arquitecturas modernas y un equipo
              apasionado para entregar soluciones que generan impacto real.
            </p>
          </div>
          <div className="sn-hero-scroll">Scroll</div>
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
