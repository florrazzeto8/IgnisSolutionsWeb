
import '../styles/logoCarousel.css';

// Define tus logos en un array. Esto hace que el código sea mucho más limpio.
const logos = [
  { id: 1, src: "/mercado-libre-logo-png_seeklogo-653365.png", alt: "Mercado Libre" },
  { id: 2, src: "/png-clipart-santander-group-santander-bank-logo-quiz-ultimate-bank-text-hand-thumbnail%20(1).png", alt: "Santander" },
  { id: 3, src: "/images%20(2).jpg", alt: "Cliente" },
  { id: 4, src: "/Claro.svg.png", alt: "Claro" },
];

export const LogoCarousel = () => {
  return (
    <div className="logos-strip">
      <div className="logos-track">
        {[1, 2, 3, 4].flatMap((set) =>
          logos.map((logo) => (
            <div key={`set${set}-${logo.id}`} className="logo-item">
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
