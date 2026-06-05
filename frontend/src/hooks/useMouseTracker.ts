import { useEffect, useRef } from 'react';

export const useMouseTracker = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const ringXRef = useRef(0);
  const ringYRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
      mouseYRef.current = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top = e.clientY + 'px';
      }
    };

    const animateRing = () => {
      if (ringRef.current) {
        ringXRef.current +=
          (mouseXRef.current - ringXRef.current) * 0.14;
        ringYRef.current +=
          (mouseYRef.current - ringYRef.current) * 0.14;
        ringRef.current.style.left = ringXRef.current + 'px';
        ringRef.current.style.top = ringYRef.current + 'px';
      }
      requestAnimationFrame(animateRing);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const rafId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return { cursorRef, ringRef };
};
