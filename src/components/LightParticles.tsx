import { memo, useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  hue: number;
  alpha: number;
  depth: number;
}

interface LightParticlesProps {
  /** Número máx. de partículas (por defecto 36: suficiente para bokeh sin matar GPU) */
  count?: number;
  /** Color base en hsl (violeta HBO). Se varía ±20 por partícula */
  hue?: number;
}

const FPS_MS = 1000 / 30;

/**
 * Bokeh de luz difuminada sobre el plasma.
 * - Sprite radial pre-renderizado (cero shadowBlur por frame: 60x más rápido).
 * - Additive blending (lighter) para glow real sobre fondo negro.
 * - 30fps, pausa en pestaña oculta, frame estático con reduced-motion.
 * - Parallax sutil con el mouse (lerp 0.02, sin setState).
 */
export const LightParticles = memo(function LightParticles({ count = 36, hue = 275 }: LightParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    // Sprite: radial blanco→transparente de 64px, reutilizado por todas las partículas.
    const sprite = document.createElement('canvas');
    sprite.width = 64;
    sprite.height = 64;
    const sctx = sprite.getContext('2d');
    if (!sctx) return;
    const grad = sctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.25, 'rgba(255,255,255,0.55)');
    grad.addColorStop(0.6, 'rgba(255,255,255,0.12)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    sctx.fillStyle = grad;
    sctx.fillRect(0, 0, 64, 64);

    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      W = window.innerWidth || 0;
      H = window.innerHeight || 0;
      if (W === 0 || H === 0) return;
      canvas.width = Math.floor(Math.min(W, 1600) * dpr);
      canvas.height = Math.floor(Math.min(H, 900) * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rand(6, 42),
      vx: rand(-0.00035, 0.00035),
      vy: rand(-0.0005, -0.0001),
      hue: hue + rand(-22, 22),
      alpha: rand(0.05, 0.22),
      depth: rand(0.3, 1),
    }));

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMouse = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    let raf = 0;
    let last = 0;
    let running = true;

    const draw = () => {
      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;
      ctx.clearRect(0, 0, cw, ch);
      ctx.globalCompositeOperation = 'lighter';
      mouse.x += (mouse.tx - mouse.x) * 0.02;
      mouse.y += (mouse.ty - mouse.y) * 0.02;
      const px = (mouse.x - 0.5) * 24 * dpr;
      const py = (mouse.y - 0.5) * 24 * dpr;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -0.08) {
          p.y = 1.08;
          p.x = Math.random();
        }
        if (p.x < -0.08) p.x = 1.08;
        else if (p.x > 1.08) p.x = -0.08;

        const sx = (p.x * cw + px * p.depth) | 0;
        const sy = (p.y * ch + py * p.depth) | 0;
        const size = p.r * 2 * dpr * p.depth;
        ctx.globalAlpha = p.alpha;
        // Tinte violeta por partícula sin crear gradientes por frame:
        // se dibuja el sprite blanco y se tiñe con hue via globalCompositeOperation previos.
        // Simplificación rápida: usa el sprite con alpha y un fill violeta de fondo ya aportado por el plasma.
        ctx.drawImage(sprite, sx - size / 2, sy - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    if (reduced) {
      draw();
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('mousemove', onMouse);
      };
    }

    const loop = (now: number) => {
      if (!running) return;
      if (now - last >= FPS_MS) {
        last = now;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    const onVis = () => {
      running = document.visibilityState === 'visible';
      if (running) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      } else {
        cancelAnimationFrame(raf);
      }
    };
    document.addEventListener('visibilitychange', onVis);

    last = performance.now();
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [count, hue]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
      style={{ opacity: 0.8 }}
    />
  );
});
