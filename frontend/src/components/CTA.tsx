import '../styles/cta.css';

export const CTA = () => {
  return (
    <section className="cta">
      <div className="cta-glow"></div>
      <h2 className="fu">
        ¿Listo para construir
        <br />
        <span style={{ color: 'var(--cyan)' }}>algo grande?</span>
      </h2>
      <p className="fu d1">
        Contanos tu idea. Te respondemos en menos de 24 horas con un plan de
        acción concreto.
      </p>
      <div className="cta-btns fu d2" style={{ justifyContent: 'center' }}>
        <a href="#" className="btn-primary">
          Empezar mi proyecto →
        </a>
      </div>
    </section>
  );
};
