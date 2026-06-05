import { useEffect, useRef } from 'react';

interface ObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
}

export const useIntersectionObserver = (
  elements: (HTMLElement | null)[],
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: ObserverOptions = { threshold: 0.15 }
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(callback, options);

    elements.forEach((el) => {
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [elements, callback, options]);

  return observerRef;
};
