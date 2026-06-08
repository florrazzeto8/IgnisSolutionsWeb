import { useEffect, useRef } from 'react';
import { SERVICES } from '../utils/constants';
import '../styles/services.css';

interface ServiceCardProps {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  desc,
  tags,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = (y / r.height - 0.5) * -10;
      const ry = (x / r.width - 0.5) * 10;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px) translateY(0)`;
      card.style.setProperty('--mx', (x / r.width * 100) + '%');
      card.style.setProperty('--my', (y / r.height * 100) + '%');
    };
    const onLeave = () => {
      card.style.transform = 'perspective(900px) rotateX(0) rotateY(0) translateZ(0) translateY(0)';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="card" data-tilt ref={cardRef}>
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="tags">
        {tags.map((tag, idx) => (
          <span key={idx} className="t">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export const Services = () => {
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.card') || [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.target.classList.toggle('visible', e.isIntersecting));
      },
      { threshold: 0.15 }
    );
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="services" id="services">
      <div className="sec-tag">Servicios</div>
      <h2 className="sec-title fu">
        Lo que <span className="acc">construimos</span>
        <br />
        para vos
      </h2>
      <p className="sec-sub fu d1">
        De la idea al producto. Cubrimos todo el espectro del desarrollo con
        equipos dedicados y procesos probados.
      </p>

      <div className="cards-grid" ref={gridRef}>
        {SERVICES.map((service, idx) => (
          <ServiceCard key={idx} {...service} />
        ))}
      </div>
    </section>
  );
};
