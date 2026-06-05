import { useRef } from 'react';
import { useScrollNavigation } from '../hooks/useScrollNavigation';
import '../styles/header.css';

export const Header = () => {
  const navRef = useRef<HTMLElement | null>(null);
  useScrollNavigation(navRef);

  return (
    <nav ref={navRef} className="he">
      <a href="#" className="nav-logo">
        IGNIS <span>Solutions.</span>
      </a>
      <div className="nav-links">
        <a href="#about">Nosotros</a>
        <a href="#services">Servicios</a>
        <a href="#stack">Stack</a>
        <a href="#">Trabaja con nosotros</a>
        <a href="#" className="btn-cta">
          CONTACTO
        </a>
      </div>
    </nav>
  );
};
