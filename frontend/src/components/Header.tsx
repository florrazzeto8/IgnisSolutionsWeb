import '../styles/header.css';

export const Header = () => {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (id === 'about') {
      // about-zone has scroll animation: card is fully visible at end of zone
      const top = el.getBoundingClientRect().top + window.scrollY + el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openModal = () => {
    document.querySelector('.modal-overlay')?.classList.add('open');
  };

  return (
    <nav className="he">
      <a href="#" className="nav-logo">
        IGNIS <span>Solutions.</span>
      </a>
      <div className="nav-links">
        <a href="#about" onClick={scrollTo('about')}>Nosotros</a>
        <a href="#services" onClick={scrollTo('services')}>Servicios</a>
        <a href="#stack">Stack</a>
        <a href="#">Trabaja con nosotros</a>
        <button className="btn-cta" onClick={openModal}>
          CONTACTO
        </button>
      </div>
    </nav>
  );
};
