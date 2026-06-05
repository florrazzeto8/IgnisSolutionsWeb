import { useEffect, useRef } from 'react';
import { Particle, drawParticleLines } from '../utils/particles';
import '../styles/particles.css';

export const ParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas FIRST before initializing particles
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();

    // Initialize particles AFTER canvas has correct size
    if (particlesRef.current.length === 0) {
      for (let i = 0; i < 75; i++) {
        particlesRef.current.push(
          new Particle(canvas.width, canvas.height)
        );
      }
    }

    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let rafId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.update(
          canvas.width,
          canvas.height,
          mouseRef.current.x,
          mouseRef.current.y
        );
        p.draw(ctx);
      });

      drawParticleLines(ctx, particlesRef.current);
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas ref={canvasRef} id="particles" style={{ display: 'block' }} />;
};
