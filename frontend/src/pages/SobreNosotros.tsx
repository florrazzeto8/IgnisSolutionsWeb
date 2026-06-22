import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMouseTracker } from '../hooks/useMouseTracker';
import { Header } from '../components/Header';
import { ContactModal } from '../components/ContactModal';
import { ParticleSystem } from '../components/ParticleSystem';
import { ABOUT_STATS } from '../utils/constants';
import '../styles/sobre-nosotros.css';

gsap.registerPlugin(ScrollTrigger);

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

const ALL_WORDS =
  'Somos el equipo tecnológico que convierte tus desafíos digitales en soluciones que hacen crecer tu negocio.'.split(' ');

export const SobreNosotros = () => {
  useMouseTracker();

  const heroPanelRef = useRef<HTMLDivElement>(null);
  const storyPanelRef = useRef<HTMLDivElement>(null);

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

  useGSAP(() => {
    // Panel historia: arranca a la derecha
    gsap.set(storyPanelRef.current, { xPercent: 100 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.sn-transition-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      }
    });

    // Fase 1: Iluminar palabras (GSAP se encarga del color directo)
    tl.to('.sn-word', {
      color: '#ffffff',
      stagger: 0.1,
      duration: 1
    });

    // Fase 2: Slide horizontal
    tl.to(heroPanelRef.current, {
      xPercent: -100,
      duration: 1,
      ease: "none"
    }, "+=0.2");

    tl.to(storyPanelRef.current, {
      xPercent: 0,
      duration: 1,
      ease: "none"
    }, "<");
  });

  const openModal = () => document.querySelector('.modal-overlay')?.classList.add('open');

  return (
    <div className="sn-page">
      <ParticleSystem />
      <div className="cursor visible" id="cur" />
      <div className="cursor-ring visible" id="ring" />

      <Header />

      <main>
        <div className="sn-transition-wrapper">
          <div className="sn-pin">
          <div className="sn-pin-clip">
            <div className="sn-hero-orb-1" />
            <div className="sn-hero-orb-2" />

            <div className="sn-hero-panel" ref={heroPanelRef}>
              <div className="sn-hero-inner">
                <div className="sn-reveal-box">
                  <h1 className="sn-heading">
                    {ALL_WORDS.map((word, i) => (
                      <span key={i} className="sn-word" style={{ color: 'rgba(15, 25, 80, 0.7)' }}>
                        {word}{' '}
                      </span>
                    ))}
                  </h1>
                </div>
              </div>
            </div>

            <div className="sn-story-panel" ref={storyPanelRef}>
              <div className="sn-story-inner">
                <div className="sn-story-photo">
                  <img
                    src="/Gemini_Generated_Image_5l340c5l340c5l34 (1).png"
                    alt="Equipo IGNIS"
                  />
                </div>
                <div className="sn-story-text">
                  <span className="sn-section-label">Nuestra historia</span>
                  <h2 className="sn-story-title">De la ideación al escalamiento</h2>
                  <p>
                    Nacimos con el propósito de cerrar la brecha entre las empresas
                    y la tecnología de punta. Desde startups en etapa temprana hasta
                    corporaciones establecidas, acompañamos cada etapa del ciclo de
                    vida del producto.
                  </p>
                  <p>
                    Nuestro equipo combina expertise técnico profundo con una visión
                    de negocio clara. No solo escribimos código, entendemos el
                    problema, diseñamos la solución y la llevamos a producción con
                    cero sorpresas.
                  </p>
                  <div className="sn-stats">
                    {ABOUT_STATS.map((stat, i) => (
                      <div key={i} className="sn-stat">
                        <span className="sn-stat-num">{stat.number}+</span>
                        <span className="sn-stat-lbl">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

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
