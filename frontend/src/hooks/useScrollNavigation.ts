import { useEffect, useRef } from 'react';

export const useScrollNavigation = (
  navRef: React.RefObject<HTMLElement | null>
) => {
  const hiddenRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current || hiddenRef.current) return;

      const scrolled = window.scrollY > 60;
      navRef.current.classList.toggle('scrolled', scrolled);

      if (window.scrollY >= window.innerHeight) {
        hiddenRef.current = true;
        navRef.current.classList.add('hidden');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navRef]);
};
