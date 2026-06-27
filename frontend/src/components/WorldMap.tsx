import { useEffect, useRef, useState } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { gsap } from 'gsap';
import type { Topology } from 'topojson-specification';
import '../styles/world-map.css';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const W = 460;
const H = 560;

// ISO 3166-1 numeric codes for Latin American countries
const LATAM = new Set([
  484,        // México
  320, 84, 340, 222, 558, 188, 591, // Central America
  170, 862, 328, 740, 76, 218, 604, 68, 600, 858, 32, 152, // South America
  192, 214, 332, 388, // Caribbean (optional flavour)
]);

const FEATURED = new Set([484, 170, 152, 32]); // MX, CO, CL, AR

const COUNTRY_INFO = [
  { id: 484, name: 'México',    flag: 'https://flagcdn.com/w40/mx.png', lat: 23.6,  lng: -102.5 },
  { id: 170, name: 'Colombia',  flag: 'https://flagcdn.com/w40/co.png', lat: 4.7,   lng: -74.1  },
  { id: 152, name: 'Chile',     flag: 'https://flagcdn.com/w40/cl.png', lat: -33.0, lng: -70.6  },
  { id: 32,  name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png', lat: -36.0, lng: -63.0  },
];

interface GeoShape { id: number; d: string; featured: boolean }
interface MarkerPos { id: number; x: number; y: number; flag: string; name: string }

const COUNTRIES_LIST = [
  { name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png' },
  { name: 'Colombia',  flag: 'https://flagcdn.com/w40/co.png' },
  { name: 'México',    flag: 'https://flagcdn.com/w40/mx.png' },
  { name: 'Chile',     flag: 'https://flagcdn.com/w40/cl.png' },
];

export const WorldMap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const svgRef     = useRef<SVGSVGElement>(null);
  const [shapes,  setShapes]  = useState<GeoShape[]>([]);
  const [markers, setMarkers] = useState<MarkerPos[]>([]);
  const [arcs,    setArcs]    = useState<string[]>([]);

  // Load geo data
  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((world: Topology) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const all = (feature(world, (world as any).objects.countries) as any).features as any[];
        const latamFeats = all.filter((f) => LATAM.has(Number(f.id)));

        const projection = geoMercator().fitSize([W, H], {
          type: 'FeatureCollection',
          features: latamFeats,
        });
        const pathGen = geoPath(projection);

        setShapes(
          latamFeats.map((f) => ({
            id: Number(f.id),
            d: pathGen(f) ?? '',
            featured: FEATURED.has(Number(f.id)),
          }))
        );

        const mkrs: MarkerPos[] = COUNTRY_INFO.map((c) => {
          const [x, y] = projection([c.lng, c.lat]) ?? [0, 0];
          return { id: c.id, x, y, flag: c.flag, name: c.name };
        });
        setMarkers(mkrs);

        // Arcs from Argentina to others
        const ar = mkrs.find((m) => m.id === 32)!;
        setArcs(
          mkrs
            .filter((m) => m.id !== 32)
            .map((m) => {
              const mx = (ar.x + m.x) / 2;
              const my = (ar.y + m.y) / 2;
              const dx = m.x - ar.x;
              const dy = m.y - ar.y;
              // perpendicular offset for the bezier curve
              const cx = mx - dy * 0.25;
              const cy = my + dx * 0.25;
              return `M ${ar.x.toFixed(1)},${ar.y.toFixed(1)} Q ${cx.toFixed(1)},${cy.toFixed(1)} ${m.x.toFixed(1)},${m.y.toFixed(1)}`;
            })
        );
      });
  }, []);

  // GSAP animations — run after shapes are ready
  useEffect(() => {
    if (!shapes.length || !svgRef.current) return;

    const ctx = gsap.context(() => {
      // Animate arcs: draw on load then repeat
      const arcEls = svgRef.current!.querySelectorAll<SVGPathElement>('.wm-arc');
      arcEls.forEach((arc, i) => {
        const len = arc.getTotalLength();
        gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(arc, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: 'power2.out',
          delay: 0.5 + i * 0.2,
          repeat: -1,
          repeatDelay: 2.5,
        });
      });

      // Pulse rings
      svgRef.current!.querySelectorAll<SVGCircleElement>('.wm-ring').forEach((ring, i) => {
        gsap.to(ring, {
          attr: { r: 14, opacity: 0 },
          duration: 1.8,
          ease: 'power1.out',
          delay: i * 0.4,
          repeat: -1,
        });
      });

      // Entrance fade
      gsap.fromTo(
        svgRef.current,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'power2.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [shapes]);

  return (
    <section className="wm-section" id="world" ref={sectionRef}>
      <div className="wm-inner">
        {/* ── TEXT ── */}
        <div className="wm-text">
          <span className="wm-tag">Presencia Global</span>
          <h2 className="wm-title fu">
            Soluciones alrededor
            <br />
            <span className="wm-accent">del Mundo</span>
          </h2>
          <p className="wm-sub fu d1">
            Empresas en América Latina confían en nuestros servicios.
            Ignis Solutions ha brindado desarrollos a países como:
          </p>
          <ul className="wm-countries fu d2">
            {COUNTRIES_LIST.map((c) => (
              <li key={c.name} className="wm-country">
                <img src={c.flag} alt={c.name} className="wm-flag-img" />
                <span className="wm-cname">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── MAP ── */}
        <div className="wm-map-wrap">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${W} ${H}`}
            xmlns="http://www.w3.org/2000/svg"
            className="wm-svg"
            aria-label="Mapa de América Latina"
          >
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Country shapes */}
            {shapes.map((s) => (
              <path
                key={s.id}
                d={s.d}
                className={s.featured ? 'wm-hi' : 'wm-bg'}
              />
            ))}

            {/* Animated arcs */}
            {arcs.map((d, i) => (
              <path
                key={i}
                d={d}
                className="wm-arc"
                fill="none"
                stroke="#00c8ff"
                strokeWidth="1.2"
                strokeLinecap="round"
                filter="url(#glow)"
              />
            ))}

            {/* Markers */}
            {markers.map((m) => (
              <g key={m.id}>
                <circle
                  className="wm-ring"
                  cx={m.x}
                  cy={m.y}
                  r="5"
                  fill="none"
                  stroke="#00c8ff"
                  strokeWidth="1"
                  opacity="0.8"
                />
                <circle cx={m.x} cy={m.y} r="4"   fill="#00c8ff" filter="url(#glow)" />
                <circle cx={m.x} cy={m.y} r="2.2" fill="#ffffff" />
                {/* Flag image */}
                <image
                  href={m.flag}
                  x={m.x + 7}
                  y={m.y - 20}
                  width="26"
                  height="17"
                  preserveAspectRatio="xMidYMid meet"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>
    </section>
  );
};
