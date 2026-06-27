import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ABOUT_STATS } from '../utils/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMouseTracker } from '../hooks/useMouseTracker';
import { Header } from '../components/Header';
import { ContactModal } from '../components/ContactModal';
import { ParticleSystem } from '../components/ParticleSystem';
import '../styles/sobre-nosotros.css';

gsap.registerPlugin(ScrollTrigger);


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

    // Pausa: historia visible ~100vh de scroll sin cambios
    tl.to({}, { duration: 2 });
  });

  const navigate = useNavigate();

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
                  <h2 className="sn-story-title">
                    IGNIS Solutions:<br />
                    <em>Software Factory</em>
                  </h2>
                  <p>
                    Somos una empresa Argentina de tecnología enfocada en apoyar a Start-Ups y a otras
                    empresas a impulsar su transformación digital brindando servicios de desarrollo de
                    software, ampliación de equipos, consultorías en temas tecnológicos e Investigación
                    y Desarrollo (I+D).
                  </p>
                  <p>
                    Nuestro equipo formado por diversos perfiles profesionales nos permite implementar
                    diversas tecnologías para apoyarlo en cualquier fase del ciclo de vida del
                    desarrollo de software.
                  </p>
                  <p>
                    Nuestras metodologías ágiles, nos permite construir rápidamente aplicaciones, web y
                    software adaptado a las necesidades de su negocio manteniendo un alto estándar de
                    calidad a través de un riguroso proceso de control y testing.
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

<section className="sn-cta">
          <h2 className="fu">¿Querés unirte a nuestro equipo?</h2>
          <button className="sn-cta-btn" onClick={() => navigate('/trabaja-con-nosotros')}>
            Postularme →
          </button>
        </section>
      </main>

      <ContactModal />
    </div>
  );
};
