import { useEffect, useRef } from 'react';

export const useScrollNavigation = (
  navRef: React.RefObject<HTMLElement | null>
) => {
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const scrolled = window.scrollY > 60;
        const isHidden = window.scrollY > lastScrollYRef.current && window.scrollY > 100;

        navRef.current.classList.toggle('scrolled', scrolled);
        navRef.current.classList.toggle('hidden', isHidden);

        lastScrollYRef.current = window.scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navRef]);
};
