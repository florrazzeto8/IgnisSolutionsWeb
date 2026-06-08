import { useEffect, useRef } from 'react';

export const useMouseTracker = () => {
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const ringXRef = useRef(0);
  const ringYRef = useRef(0);

  useEffect(() => {
    const cur = document.getElementById('cur') as HTMLDivElement | null;
    const ring = document.getElementById('ring') as HTMLDivElement | null;

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
      mouseYRef.current = e.clientY;
      if (cur) {
        cur.style.left = e.clientX + 'px';
        cur.style.top = e.clientY + 'px';
      }
    };

    let rafId: number;
    const animateRing = () => {
      if (ring) {
        ringXRef.current += (mouseXRef.current - ringXRef.current) * 0.14;
        ringYRef.current += (mouseYRef.current - ringYRef.current) * 0.14;
        ring.style.left = ringXRef.current + 'px';
        ring.style.top = ringYRef.current + 'px';
      }
      rafId = requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
};
