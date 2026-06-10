import { useRef } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { WORDS_TYPEWRITER } from '../utils/constants';
import '../styles/hero.css';

export const Hero = () => {
  const typedRef = useRef<HTMLSpanElement | null>(null);
  useTypewriter(WORDS_TYPEWRITER, typedRef);

  return (
    <>
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <div className="hero-inner">
        <h1 className="he">
          Tu próximo producto<br />
          digital, <span style={{ whiteSpace: 'nowrap' }}>construido por</span>
          <span className="typed-line">
            <span className="typed-wrap" ref={typedRef}></span>
            <span className="cursor-blink"></span>
          </span>
        </h1>
        <p className="hero-sub he">
          Transformamos ideas en productos digitales que escalan. Metodologías ágiles,
          arquitecturas modernas y un equipo que domina cada línea de código.
        </p>
        <div className="hero-actions he">
          <a href="#" className="btn-primary">
            Ver casos de éxito <span>→</span>
          </a>
        </div>
      </div>

      <div className="scroll-hint he">scroll</div>
    </>
  );
};
