import { Link } from 'react-router-dom';
import '../styles/header.css';

export const Header = () => {
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
        <Link to="/trabaja-con-nosotros">Trabaja con nosotros</Link>
        <button className="btn-cta" onClick={openModal}>
          CONTACTO
        </button>
      </div>
    </nav>
  );
};
