import { useEffect } from 'react';

export const useScrollProgress = (
  progressBarRef: React.RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    const handleScroll = () => {
      if (progressBarRef.current) {
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / height) * 100;
        progressBarRef.current.style.width = progress + '%';
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progressBarRef]);
};
