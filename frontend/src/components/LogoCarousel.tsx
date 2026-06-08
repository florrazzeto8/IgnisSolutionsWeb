import React from 'react';
import '../styles/logoCarousel.css';

// Define tus logos en un array. Esto hace que el código sea mucho más limpio.
const logos = [
  { id: 1, src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIkAAABQCAIAAACid8F5...", alt: "MercadoLibre" },
  { id: 2, src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABQCAIAAAASpCUO...", alt: "El Delfín" },
  { id: 3, src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABQCAIAAABtdTf/...", alt: "Santander" },
  { id: 4, src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAIAAAABc2X6...", alt: "ABNET" },
  { id: 5, src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABQCAIAAAB6V6c2...", alt: "AVNET" },
];

export const LogoCarousel = () => {
  return (
    <div className="logos-strip">
      <div className="logos-track">
        {/* Renderizamos el primer set de logos */}
        {logos.map((logo) => (
          <div key={`set1-${logo.id}`} className="logo-item">
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
        
        {/* Renderizamos el segundo set idéntico para crear el efecto de loop infinito */}
        {logos.map((logo) => (
          <div key={`set2-${logo.id}`} className="logo-item">
            <img src={logo.src} alt={logo.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}
