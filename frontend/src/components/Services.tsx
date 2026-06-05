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
  return (
    <div className="card" data-tilt>
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

      <div className="cards-grid">
        {SERVICES.map((service, idx) => (
          <ServiceCard key={idx} {...service} />
        ))}
      </div>
    </section>
  );
};
