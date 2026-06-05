// Animation utilities

export const easeOut = (t: number) => 1 - Math.pow(1 - t, 2);

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const counter = (
  target: number,
  duration: number = 2000,
  onUpdate: (value: number) => void
) => {
  const startTime = performance.now();

  const animate = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    onUpdate(value);

    if (progress < 1) requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
};
