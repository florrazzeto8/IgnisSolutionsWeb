import { useEffect, useRef } from 'react';
import { SERVICES } from '../utils/constants';
import '../styles/services.css';

const CARD_ARTS = [
  // Card 1: Software – terminal SVG
  <svg viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="18" y="10" width="264" height="110" rx="8" stroke="#00c8ff" strokeOpacity=".14" strokeWidth="1"/>
    <rect x="18" y="10" width="264" height="26" rx="8" fill="#00c8ff" fillOpacity=".05"/>
    <line x1="18" y1="36" x2="282" y2="36" stroke="#00c8ff" strokeOpacity=".1" strokeWidth="1"/>
    <circle cx="34" cy="23" r="4" fill="#00c8ff" fillOpacity=".4"/>
    <circle cx="48" cy="23" r="4" fill="#00c8ff" fillOpacity=".2"/>
    <circle cx="62" cy="23" r="4" fill="#00c8ff" fillOpacity=".1"/>
    <text x="28" y="56" fontFamily="monospace" fontSize="11" fill="#00c8ff" fillOpacity=".85">$ npm run build</text>
    <text x="28" y="73" fontFamily="monospace" fontSize="11" fill="#00c8ff" fillOpacity=".4">  ✓ Built in 1.2s — ready</text>
    <text x="28" y="90" fontFamily="monospace" fontSize="11" fill="#00c8ff" fillOpacity=".8">$ git push origin main</text>
    <text x="28" y="107" fontFamily="monospace" fontSize="11" fill="#00c8ff" fillOpacity=".35">  → Everything up-to-date</text>
    <rect x="28" y="114" width="7" height="2.5" rx="1" fill="#00c8ff" fillOpacity=".8">
      <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
    </rect>
  </svg>,

  // Card 2: UX/UI – wireframe SVG
  <svg viewBox="0 0 300 130" fill="none">
    <rect x="80" y="6" width="140" height="112" rx="7" stroke="#00c8ff" strokeOpacity=".18" strokeWidth="1"/>
    <rect x="86" y="20" width="128" height="88" rx="4" fill="#00c8ff" fillOpacity=".025"/>
    <rect x="80" y="6" width="140" height="20" rx="7" fill="#00c8ff" fillOpacity=".06"/>
    <circle cx="93" cy="16" r="3.5" fill="#00c8ff" fillOpacity=".35"/>
    <line x1="110" y1="118" x2="190" y2="118" stroke="#00c8ff" strokeOpacity=".18" strokeWidth="2"/>
    <rect x="86" y="20" width="128" height="16" rx="3" fill="#00c8ff" fillOpacity=".06"/>
    <rect x="94" y="25" width="50" height="5" rx="2" fill="#00c8ff" fillOpacity=".18"/>
    <rect x="190" y="25" width="18" height="5" rx="2" fill="#00c8ff" fillOpacity=".1"/>
    <rect x="94" y="44" width="112" height="28" rx="4" fill="#00c8ff" fillOpacity=".05" stroke="#00c8ff" strokeOpacity=".12" strokeWidth=".8"/>
    <rect x="100" y="50" width="55" height="6" rx="2" fill="#00c8ff" fillOpacity=".22"/>
    <rect x="100" y="60" width="36" height="5" rx="2" fill="#00c8ff" fillOpacity=".1"/>
    <rect x="94" y="80" width="32" height="22" rx="3" stroke="#00c8ff" strokeOpacity=".16" strokeWidth=".8"/>
    <rect x="132" y="80" width="32" height="22" rx="3" stroke="#00c8ff" strokeOpacity=".2" strokeWidth=".8" fill="#00c8ff" fillOpacity=".04"/>
    <rect x="170" y="80" width="32" height="22" rx="3" stroke="#00c8ff" strokeOpacity=".16" strokeWidth=".8"/>
    <path d="M232 55 L240 75 L244 68 L254 74 L247 57Z" fill="#00c8ff" fillOpacity=".45" stroke="#00c8ff" strokeOpacity=".6" strokeWidth=".8"/>
  </svg>,

  // Card 3: AI/Data – neural network SVG
  <svg viewBox="0 0 300 130" fill="none">
    <circle cx="35" cy="28" r="7" stroke="#00c8ff" strokeOpacity=".4" strokeWidth="1.5"/>
    <circle cx="35" cy="65" r="7" stroke="#00c8ff" strokeOpacity=".4" strokeWidth="1.5"/>
    <circle cx="35" cy="102" r="7" stroke="#00c8ff" strokeOpacity=".3" strokeWidth="1.5"/>
    <circle cx="120" cy="18" r="7" stroke="#00c8ff" strokeOpacity=".3" strokeWidth="1.5"/>
    <circle cx="120" cy="50" r="8" stroke="#00c8ff" strokeOpacity=".85" strokeWidth="1.5" fill="#00c8ff" fillOpacity=".07"/>
    <circle cx="120" cy="82" r="7" stroke="#00c8ff" strokeOpacity=".35" strokeWidth="1.5"/>
    <circle cx="120" cy="112" r="7" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1.5"/>
    <circle cx="210" cy="35" r="7" stroke="#00c8ff" strokeOpacity=".5" strokeWidth="1.5"/>
    <circle cx="210" cy="75" r="8" stroke="#00c8ff" strokeOpacity=".75" strokeWidth="1.5" fill="#00c8ff" fillOpacity=".06"/>
    <circle cx="210" cy="110" r="7" stroke="#00c8ff" strokeOpacity=".3" strokeWidth="1.5"/>
    <circle cx="275" cy="65" r="9" stroke="#00c8ff" strokeOpacity=".8" strokeWidth="1.8" fill="#00c8ff" fillOpacity=".1"/>
    <line x1="42" y1="28" x2="113" y2="18" stroke="#00c8ff" strokeOpacity=".1" strokeWidth=".8"/>
    <line x1="42" y1="28" x2="113" y2="50" stroke="#00c8ff" strokeOpacity=".2" strokeWidth=".8"/>
    <line x1="42" y1="65" x2="113" y2="50" stroke="#00c8ff" strokeOpacity=".18" strokeWidth=".8"/>
    <line x1="42" y1="65" x2="113" y2="82" stroke="#00c8ff" strokeOpacity=".12" strokeWidth=".8"/>
    <line x1="42" y1="102" x2="113" y2="82" stroke="#00c8ff" strokeOpacity=".14" strokeWidth=".8"/>
    <line x1="42" y1="102" x2="113" y2="112" stroke="#00c8ff" strokeOpacity=".1" strokeWidth=".8"/>
    <line x1="127" y1="50" x2="203" y2="35" stroke="#00c8ff" strokeOpacity=".14" strokeWidth=".8"/>
    <line x1="127" y1="50" x2="203" y2="75" stroke="#00c8ff" strokeOpacity=".32" strokeWidth="1.2"/>
    <line x1="127" y1="82" x2="203" y2="75" stroke="#00c8ff" strokeOpacity=".16" strokeWidth=".8"/>
    <line x1="217" y1="35" x2="266" y2="65" stroke="#00c8ff" strokeOpacity=".2" strokeWidth=".8"/>
    <line x1="217" y1="75" x2="266" y2="65" stroke="#00c8ff" strokeOpacity=".4" strokeWidth="1.2"/>
    <line x1="217" y1="110" x2="266" y2="65" stroke="#00c8ff" strokeOpacity=".12" strokeWidth=".8"/>
    <circle cx="120" cy="50" r="8" stroke="#00c8ff" strokeOpacity=".5" strokeWidth="1">
      <animate attributeName="r" values="8;18;8" dur="2.5s" repeatCount="indefinite"/>
      <animate attributeName="stroke-opacity" values=".5;0;.5" dur="2.5s" repeatCount="indefinite"/>
    </circle>
  </svg>,

  // Card 4: Cloud/DevOps – CI/CD pipeline SVG
  <svg viewBox="0 0 300 130" fill="none">
    <circle cx="55" cy="22" r="5" stroke="#00c8ff" strokeOpacity=".3" strokeWidth="1.2"/>
    <line x1="60" y1="22" x2="80" y2="22" stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1" strokeDasharray="3 2"/>
    <circle cx="86" cy="22" r="5" stroke="#00c8ff" strokeOpacity=".45" strokeWidth="1.2"/>
    <line x1="91" y1="22" x2="111" y2="22" stroke="#00c8ff" strokeOpacity=".25" strokeWidth="1" strokeDasharray="3 2"/>
    <circle cx="117" cy="22" r="5" fill="#00c8ff" fillOpacity=".1" stroke="#00c8ff" strokeOpacity=".55" strokeWidth="1.2"/>
    <text x="46" y="13" fontFamily="monospace" fontSize="7" fill="#00c8ff" fillOpacity=".4">build</text>
    <text x="78" y="13" fontFamily="monospace" fontSize="7" fill="#00c8ff" fillOpacity=".4">test</text>
    <text x="107" y="13" fontFamily="monospace" fontSize="7" fill="#00c8ff" fillOpacity=".55">deploy ✓</text>
    <path d="M75 88 Q73 100 87 102 L215 102 Q228 102 228 90 Q230 78 218 75 Q220 62 207 58 Q205 43 190 43 Q180 43 175 51 Q168 41 152 46 Q136 46 131 58 Q115 56 111 68 Q97 68 93 80 Q87 84 75 88Z"
          stroke="#00c8ff" strokeOpacity=".2" strokeWidth="1.3" fill="#00c8ff" fillOpacity=".04"/>
    <line x1="120" y1="102" x2="75" y2="118" stroke="#00c8ff" strokeOpacity=".18" strokeWidth=".8" strokeDasharray="4 3"/>
    <line x1="152" y1="102" x2="152" y2="118" stroke="#00c8ff" strokeOpacity=".22" strokeWidth=".8" strokeDasharray="4 3"/>
    <line x1="184" y1="102" x2="228" y2="118" stroke="#00c8ff" strokeOpacity=".18" strokeWidth=".8" strokeDasharray="4 3"/>
    <rect x="48" y="118" width="52" height="8" rx="3" stroke="#00c8ff" strokeOpacity=".22" strokeWidth="1"/>
    <rect x="126" y="118" width="52" height="8" rx="3" stroke="#00c8ff" strokeOpacity=".3" strokeWidth="1" fill="#00c8ff" fillOpacity=".03"/>
    <rect x="204" y="118" width="52" height="8" rx="3" stroke="#00c8ff" strokeOpacity=".22" strokeWidth="1"/>
    <circle cx="60" cy="122" r="2" fill="#00c8ff" fillOpacity=".5">
      <animate attributeName="fill-opacity" values=".5;1;.5" dur="1.8s" repeatCount="indefinite"/>
    </circle>
    <circle cx="152" cy="122" r="2" fill="#00c8ff" fillOpacity=".9"/>
    <circle cx="216" cy="122" r="2" fill="#00c8ff" fillOpacity=".3">
      <animate attributeName="fill-opacity" values=".3;.9;.3" dur="2.4s" begin=".7s" repeatCount="indefinite"/>
    </circle>
  </svg>,
];

interface ServiceCardProps {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  artIndex: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, desc, tags, artIndex }) => {
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
      <div className="card-art">{CARD_ARTS[artIndex]}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="tags">
        {tags.map((tag, idx) => (
          <span key={idx} className="t">{tag}</span>
        ))}
      </div>
    </div>
  );
};

export const Services = () => {
  const zoneRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);

  // Intersection observer for card visible state
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

  // Horizontal scroll driven by page scroll
  useEffect(() => {
    const zone = zoneRef.current;
    const grid = gridRef.current;
    const dotsWrap = dotsRef.current;
    if (!zone || !grid || !dotsWrap) return;

    const dots = Array.from(dotsWrap.children) as HTMLElement[];

    function setHeight() {
      const slideW = Math.max(0, grid!.scrollWidth - window.innerWidth + 180);
      zone!.style.height = window.innerHeight + slideW * 1.4 + 'px';
    }

    function tick() {
      const zr = zone!.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -zr.top / (zone!.offsetHeight - window.innerHeight)));
      const maxSlide = Math.max(0, grid!.scrollWidth - window.innerWidth + 180);
      grid!.style.transform = `translateX(${-p * maxSlide}px)`;
      const active = Math.min(dots.length - 1, Math.round(p * (dots.length - 1)));
      dots.forEach((d, i) => d.classList.toggle('active', i === active));
    }

    setHeight();
    const onResize = () => { setHeight(); tick(); };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', tick, { passive: true });
    tick();
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', tick);
    };
  }, []);

  return (
    <div className="services-zone" ref={zoneRef}>
      <section className="services" id="services">
        <div className="sec-tag">Servicios</div>
        <div className="cards-grid" ref={gridRef}>
          {SERVICES.map((service, idx) => (
            <ServiceCard key={idx} {...service} artIndex={idx} />
          ))}
        </div>
        <div id="hscroll-dots" ref={dotsRef}>
          {SERVICES.map((_, idx) => (
            <div key={idx} className="hscroll-dot" />
          ))}
        </div>
      </section>
    </div>
  );
};
