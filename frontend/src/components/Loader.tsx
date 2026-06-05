import { useEffect, useRef } from 'react';
import '../styles/loader.css';

interface LoaderProps {
  onFinish: () => void;
}

export const Loader: React.FC<LoaderProps> = ({ onFinish }) => {
  const loaderBgRef = useRef<HTMLDivElement | null>(null);
  const loaderContentRef = useRef<HTMLDivElement | null>(null);
  const lNumRef = useRef<HTMLDivElement | null>(null);
  const lFillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const totalTime = 2600;
    const startTime = performance.now();

    const loaderTick = (now: number) => {
      const t = Math.min((now - startTime) / totalTime, 1);
      const eased = 1 - Math.pow(1 - t, 2.5);
      const val = Math.round(eased * 100);

      if (lNumRef.current) lNumRef.current.textContent = String(val);
      if (lFillRef.current) lFillRef.current.style.width = val + '%';

      if (t < 1) {
        requestAnimationFrame(loaderTick);
      } else {
        finishLoader();
      }
    };

    const finishLoader = () => {
      if (loaderContentRef.current) {
        loaderContentRef.current.classList.add('exit');
      }

      setTimeout(() => {
        if (loaderBgRef.current) {
          loaderBgRef.current.classList.add('exit');
        }
        document.body.style.overflow = '';
        onFinish();
      }, 150);
    };

    document.body.style.overflow = 'hidden';
    requestAnimationFrame(loaderTick);

    return () => {
      document.body.style.overflow = '';
    };
  }, [onFinish]);

  return (
    <>
      <div ref={loaderBgRef} id="loader-bg"></div>
      <div ref={loaderContentRef} id="loader-content">
        <div ref={lNumRef} className="l-num">
          0
        </div>
        <div className="l-bar-wrap">
          <div className="l-bar-track">
            <div ref={lFillRef} className="l-bar-fill"></div>
          </div>
        </div>
        <div className="l-lbl">Cargando</div>
      </div>
    </>
  );
};
