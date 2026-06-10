import '../styles/header.css';

export const Header = () => {
  return (
    <nav className="he">
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
