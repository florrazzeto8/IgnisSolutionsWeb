import { useEffect, useRef, useState } from 'react';
import { useMouseTracker } from './hooks/useMouseTracker';
import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { ParticleSystem } from './components/ParticleSystem';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { TransformSection } from './components/TransformSection';
import { ServicesIntro } from './components/ServicesIntro';
import { LogoCarousel } from './components/LogoCarousel';
import { Services } from './components/Services';
import { Skills } from './components/Skills';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import './styles/global.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorVisible, setCursorVisible] = useState(false);

  useMouseTracker();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle('vis', e.isIntersecting));
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.fu').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleLoaderFinish = () => {
    // start hero entrance animations while curtain slides down (1s transition)
    const heEls = Array.from(document.querySelectorAll('.he'));
    const delays = [200, 400, 600, 800, 1000];
    heEls.forEach((el, i) =>
      setTimeout(
        () => el.classList.add('in'),
        500 + (delays[i] || i * 150)
      )
    );
    setTimeout(() => setCursorVisible(true), 150);
    // unmount loader only after curtain animation completes (150ms delay + 1000ms transition + buffer)
    setTimeout(() => setIsLoading(false), 1200);
  };

  return (
    <>
      {isLoading && <Loader onFinish={handleLoaderFinish} />}

      <div className={`cursor${cursorVisible ? ' visible' : ''}`} id="cur"></div>
      <div className={`cursor-ring${cursorVisible ? ' visible' : ''}`} id="ring"></div>

      <Header />

      <section className="hero">
        <ParticleSystem />
        <Hero />
      </section>

      <About />

      <TransformSection />

      <ServicesIntro />

      <Services />

      <LogoCarousel />

<Skills />

      <CTA />

      <Footer />
    </>
  );
}

export default App;
