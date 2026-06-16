import { Link, useLocation } from 'react-router-dom';
import '../styles/header.css';

export const Header = () => {
  const location = useLocation();

  const goToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/#${id}`;
    }
  };

  const openModal = () => {
    document.querySelector('.modal-overlay')?.classList.add('open');
  };

  return (
    <nav className="he">
      <Link to="/" className="nav-logo">
        IGNIS <span>Solutions.</span>
      </Link>
      <div className="nav-links">
        <Link to="/sobre-nosotros">Sobre nosotros</Link>
        <a href="#services" onClick={goToSection('services')}>Servicios</a>
        <a href="#stack" onClick={goToSection('stack')}>Stack</a>
        <a href="#">Trabaja con nosotros</a>
        <button className="btn-cta" onClick={openModal}>
          CONTACTO
        </button>
      </div>
    </nav>
  );
};
