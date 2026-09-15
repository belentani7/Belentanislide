import { memo, useEffect, useRef } from 'react';
import { LightingMode } from '../types';

interface PlasmaCanvasProps {
  mode: LightingMode;
  interactive?: boolean;
}

interface ModeParams {
  maxBrightness: number;
  speed: number;
  palette: readonly (readonly [number, number, number])[];
  haloMultiplier: number;
  milkyPower: number;
}

// Hoisted: se crean una sola vez, no 60 veces/segundo como antes.
const MODE_PARAMS: Record<LightingMode, ModeParams> = {
  'ultra-noir-3': {
    maxBrightness: 8,
    speed: 0.0005,
    palette: [
      [0, 0, 1],
      [1, 0, 3],
      [2, 1, 5],
      [4, 1, 8],
      [6, 2, 11],
      [3, 1, 6],
      [1, 0, 3],
      [0, 0, 1],
    ],
    haloMultiplier: 1.2,
    milkyPower: 0.03,
  },
  'hbo-noir': {
    maxBrightness: 46,
    speed: 0.001,
    palette: [
      [4, 1, 9],
      [12, 4, 25],
      [26, 9, 52],
      [48, 18, 92],
      [72, 28, 135],
      [40, 15, 80],
      [18, 6, 36],
      [6, 2, 12],
    ],
    haloMultiplier: 16,
    milkyPower: 0.15,
  },
  'liquid-bloom': {
    maxBrightness: 95,
    speed: 0.0016,
    palette: [
      [10, 3, 22],
      [35, 12, 68],
      [70, 24, 132],
      [115, 45, 195],
      [155, 75, 235],
      [85, 30, 155],
      [40, 14, 82],
      [15, 5, 30],
    ],
    haloMultiplier: 32,
    milkyPower: 0.28,
  },
};

const STEP = 8;
const TARGET_FPS = 30;
const FRAME_MS = 1000 / TARGET_FPS;

export const PlasmaCanvas = memo(function PlasmaCanvas({ mode, interactive = true }: PlasmaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Reutilizado: antes se creaba un canvas + contexto en CADA frame (60/s).
    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d');

    let animId = 0;
    let lastFrame = 0;
    let time = 0;
    let running = true;

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    const handleResize = () => {
      const w = window.innerWidth || 0;
      const h = window.innerHeight || 0;
      if (w === 0 || h === 0) return;
      canvas.width = Math.min(w, 1920);
      canvas.height = Math.min(h, 1080);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = e.clientX / window.innerWidth;
      mousePos.current.targetY = e.clientY / window.innerHeight;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      mousePos.current.targetX = e.touches[0].clientX / window.innerWidth;
      mousePos.current.targetY = e.touches[0].clientY / window.innerHeight;
    };

    if (interactive && !prefersReduced) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('touchmove', handleTouchMove, { passive: true });
    }

    const handleVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) {
        lastFrame = performance.now();
        animId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const drawStaticFrame = () => {
      // Un solo frame para reduced-motion: sin bucle.
      handleResize();
      if (canvas.width === 0 || canvas.height === 0 || !offCtx) return;
      const params = MODE_PARAMS[modeRef.current];
      const cw = canvas.width;
      const ch = canvas.height;
      const gridW = Math.max(1, Math.ceil(cw / STEP));
      const gridH = Math.max(1, Math.ceil(ch / STEP));
      const imgData = ctx.createImageData(gridW, gridH);
      const data = imgData.data;
      const pal = params.palette;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = pal[2][0];
        data[i + 1] = pal[2][1];
        data[i + 2] = pal[2][2];
        data[i + 3] = 255;
      }
      offscreen.width = gridW;
      offscreen.height = gridH;
      offCtx.putImageData(imgData, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'low';
      ctx.drawImage(offscreen, 0, 0, cw, ch);
    };

    if (prefersReduced) {
      drawStaticFrame();
      return () => {
        window.removeEventListener('resize', handleResize);
        document.removeEventListener('visibilitychange', handleVisibility);
      };
    }

    const render = (now: number) => {
      if (!running) return;
      // Throttle a 30fps: la mitad de CPU/GPU que 60fps, indistinguible en fondo.
      if (now - lastFrame < FRAME_MS) {
        animId = requestAnimationFrame(render);
        return;
      }
      lastFrame = now;
      time += 1;

      if (canvas.width === 0 || canvas.height === 0) {
        handleResize();
        animId = requestAnimationFrame(render);
        return;
      }

      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.04;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.04;

      const { maxBrightness, speed, palette, haloMultiplier, milkyPower } =
        MODE_PARAMS[modeRef.current];
      const cw = canvas.width;
      const ch = canvas.height;
      const gridW = Math.ceil(cw / STEP);
      const gridH = Math.ceil(ch / STEP);

      if (!offCtx || gridW === 0 || gridH === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const imgData = ctx.createImageData(gridW, gridH);
      const data = imgData.data;
      const mx = mousePos.current.x * gridW;
      const my = mousePos.current.y * gridH;
      const palLen = palette.length;
      const haloRadius = gridW * 0.35;

      for (let y = 0; y < gridH; y++) {
        for (let x = 0; x < gridW; x++) {
          const idx = (y * gridW + x) * 4;
          const v1 = Math.sin(x * 0.035 + time * speed * 2.2);
          const v2 = Math.sin(y * 0.045 - time * speed * 1.8);
          const v3 = Math.sin((x + y) * 0.025 + time * speed * 2.8);
          const dx = x - mx;
          const dy = y - my;
          // sqrt solo si está cerca del halo; fuera se omite el cálculo caro.
          const distSq = dx * dx + dy * dy;
          const inHalo = distSq < haloRadius * haloRadius;
          const distMouse = inHalo ? Math.sqrt(distSq) : haloRadius;
          const mouseWave = Math.cos(distMouse * 0.08 - time * speed * 3.5);

          const combined = (v1 + v2 + v3 + mouseWave + 4) / 8;
          const scaled = combined * (palLen - 1);
          const idx1 = Math.floor(scaled);
          const idx2 = Math.min(idx1 + 1, palLen - 1);
          const frac = scaled - idx1;
          const c1 = palette[idx1];
          const c2 = palette[idx2];

          let r = c1[0] + (c2[0] - c1[0]) * frac;
          let g = c1[1] + (c2[1] - c1[1]) * frac;
          let b = c1[2] + (c2[2] - c1[2]) * frac;

          if (inHalo) {
            const halo = 1 - distMouse / haloRadius;
            r += halo * haloMultiplier * 0.6;
            g += halo * haloMultiplier * 0.25;
            b += halo * haloMultiplier;
          }

          const puffNoise = Math.sin(x * 0.1 - y * 0.12 + time * 0.015);
          if (puffNoise > 0.4) {
            r += puffNoise * milkyPower * 25;
            g += puffNoise * milkyPower * 10;
            b += puffNoise * milkyPower * 45;
          }

          data[idx] = Math.min(maxBrightness, Math.max(0, Math.floor(r)));
          data[idx + 1] = Math.min(maxBrightness, Math.max(0, Math.floor(g)));
          data[idx + 2] = Math.min(maxBrightness, Math.max(0, Math.floor(b)));
          data[idx + 3] = 255;
        }
      }

      offscreen.width = gridW;
      offscreen.height = gridH;
      offCtx.putImageData(imgData, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'low';
      ctx.drawImage(offscreen, 0, 0, cw, ch);

      animId = requestAnimationFrame(render);
    };

    lastFrame = performance.now();
    animId = requestAnimationFrame(render);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      style={{
        opacity: mode === 'ultra-noir-3' ? 0.95 : 0.85,
      }}
    />
  );
});
