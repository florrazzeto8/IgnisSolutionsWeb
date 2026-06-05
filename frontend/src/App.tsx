import { useRef, useState } from 'react';
import { useMouseTracker } from './hooks/useMouseTracker';
import { useScrollProgress } from './hooks/useScrollProgress';
import { Loader } from './components/Loader';
import { Header } from './components/Header';
import { ParticleSystem } from './components/ParticleSystem';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { Skills } from './components/Skills';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import './styles/global.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useMouseTracker();
  useScrollProgress(progressBarRef);

  const handleLoaderFinish = () => {
    const heEls = Array.from(document.querySelectorAll('.he'));
    const delays = [200, 400, 600, 800, 1000];
    heEls.forEach((el, i) =>
      setTimeout(
        () => el.classList.add('in'),
        500 + (delays[i] || i * 150)
      )
    );
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loader onFinish={handleLoaderFinish} />}

      <div ref={progressBarRef} className="progress-bar"></div>
      <div className="cursor" id="cur"></div>
      <div className="cursor-ring" id="ring"></div>

      <Header />

      <section className="hero">
        <ParticleSystem />
        <Hero />
      </section>

      <About />

      <Services />

      <Process />

      <Skills />

      <CTA />

      <Footer />
    </>
  );
}

export default App;
