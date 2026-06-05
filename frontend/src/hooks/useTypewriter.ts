import { useEffect, useRef } from 'react';

export const useTypewriter = (
  words: string[],
  elementRef: React.RefObject<HTMLSpanElement | null>,
  startDelay: number = 1200
) => {
  const stateRef = useRef({
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const state = stateRef.current;
      const word = words[state.wordIndex];

      if (state.isDeleting) {
        state.charIndex--;
        if (state.charIndex < 0) {
          state.isDeleting = false;
          state.wordIndex = (state.wordIndex + 1) % words.length;
          timeoutId = setTimeout(type, 450);
          return;
        }
      } else {
        state.charIndex++;
        if (state.charIndex > word.length) {
          state.isDeleting = true;
          timeoutId = setTimeout(type, 2200);
          return;
        }
      }

      if (elementRef.current) {
        elementRef.current.textContent = word.slice(0, state.charIndex);
      }

      timeoutId = setTimeout(type, state.isDeleting ? 55 : 95);
    };

    timeoutId = setTimeout(type, startDelay);

    return () => clearTimeout(timeoutId);
  }, [words, elementRef, startDelay]);
};
