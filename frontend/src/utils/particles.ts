// Particle system utilities
export class Particle {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
  r: number = 0;
  a: number = 0;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.reset(canvasWidth, canvasHeight);
  }

  reset(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.r = Math.random() * 1.8 + 0.4;
    this.a = Math.random() * 0.45 + 0.1;
  }

  update(
    canvasWidth: number,
    canvasHeight: number,
    mouseX: number,
    mouseY: number
  ) {
    this.x += this.vx;
    this.y += this.vy;

    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const d = Math.sqrt(dx * dx + dy * dy);

    if (d < 110) {
      this.x += (dx / d) * 1.8;
      this.y += (dy / d) * 1.8;
    }

    if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
    if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0,200,255,${this.a})`;
    ctx.fill();
  }
}

export const drawParticleLines = (
  ctx: CanvasRenderingContext2D,
  particles: Particle[]
) => {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);

      if (d < 115) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,200,255,${0.11 * (1 - d / 115)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
};
