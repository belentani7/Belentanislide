import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  ChevronRight,
  ChevronLeft,
  Terminal,
  ExternalLink,
} from 'lucide-react';
import { Repository, LightingMode } from '../types';
import { LiquidPolyFluidOrb } from './LiquidPolyFluidOrb';
import { SwipeUpGlassDrawer } from './SwipeUpGlassDrawer';

interface Cascade3DStreamProps {
  repositories: Repository[];
  lightingMode: LightingMode;
  onLightingChange: (mode: LightingMode) => void;
  onInspectIcon: (repo: Repository) => void;
  onOpenRulesModal: () => void;
  onOpenCliBackend: () => void;
  onOpenLiquidLightArticle: (repo: Repository) => void;
}

export const Cascade3DStream: React.FC<Cascade3DStreamProps> = ({
  repositories,
  lightingMode,
  onLightingChange,
  onInspectIcon,
  onOpenRulesModal,
  onOpenCliBackend,
  onOpenLiquidLightArticle,
}) => {
  const defaultIndex = repositories.findIndex((r) => r.id === 'ManosAbiertas');
  const [activeIndex, setActiveIndex] = useState(defaultIndex !== -1 ? defaultIndex : 1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Micro-distortion pointer tracking for active glass card
  const [tilt, setTilt] = useState<{ x: number; y: number; sheenX: number; sheenY: number }>({
    x: 0,
    y: 0,
    sheenX: 0,
    sheenY: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const activeRepo = repositories[activeIndex] || repositories[0];

  // Navigation functions
  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % repositories.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + repositories.length) % repositories.length);
  };

  const goToIndex = (idx: number) => {
    setActiveIndex(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        onOpenCliBackend();
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [repositories.length]);

  // Mouse wheel scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) > 35) {
      if (e.deltaY > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Touch drag handling
  const touchStartYRef = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    if (Math.abs(deltaY) > 40) {
      if (deltaY < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  };

  // Micro-distortion pointer tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      x: x * 5,
      y: -y * 5,
      sheenX: x * 25,
      sheenY: y * 25,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, sheenX: 0, sheenY: 0 });
  };

  // Prepare cards to render in perspective stream
  const len = repositories.length;
  const prevIndex = (activeIndex - 1 + len) % len;
  const nextIndex = (activeIndex + 1) % len;

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full min-h-screen flex flex-col justify-between bg-black text-white font-sans overflow-hidden select-none"
    >
      {/* ─── 1. PURE MINIMALIST ATMOSPHERE: WHISPER-SOFT 3% LIQUID LIGHT ─── */}
      <div
        className="fixed inset-0 pointer-events-none transition-all duration-1000 opacity-20 z-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${activeRepo.liquidLight.hex} 0%, transparent 60%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* ─── 2. ULTRA-MINIMALIST BASIC GLASS HEADER ─── */}
      <header className="relative z-30 flex items-center justify-between px-6 sm:px-10 py-5">
        {/* Minimal Identity */}
        <div className="flex items-center gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] transition-colors duration-500"
            style={{
              backgroundColor: activeRepo.liquidLight.hex,
              color: activeRepo.liquidLight.hex,
            }}
          />
          <span className="text-xs font-mono tracking-widest text-neutral-400 font-medium">
            PEDRO BELENTANI
          </span>
        </div>

        {/* Minimal Actions & Counter */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-neutral-500">
            {String(activeIndex + 1).padStart(2, '0')} / {String(repositories.length).padStart(2, '0')}
          </span>

          <button
            onClick={onOpenCliBackend}
            className="p-2 rounded-full bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-neutral-400 hover:text-white transition-all cursor-pointer"
            title="Terminal CLI [`]"
          >
            <Terminal className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ─── 3. PURE MINIMALIST BASIC GLASS CASCADE ─── */}
      <main className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden [perspective:1200px]">
        <div className="relative w-full max-w-[560px] h-[460px] flex items-center justify-center [transform-style:preserve-3d]">
          {/* Previous Card (Subtle Silhouette Above) — amplified glass + purple-dark halo */}
          <div
            onClick={goToPrev}
            className="absolute z-10 w-full max-w-[540px] h-[310px] rounded-[32px] p-6 flex flex-col justify-between cursor-pointer transition-all duration-500 overflow-hidden backdrop-blur-2xl"
            style={{
              transform: 'translateY(-58%) translateZ(-140px) scale(0.93)',
              opacity: 0.42,
              filter: 'blur(1.5px)',
              background: `linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(88, 28, 135, 0.12) 30%, rgba(6, 4, 10, 0.86) 65%, rgba(0, 0, 0, 0.96) 100%)`,
              border: `1px solid ${repositories[prevIndex].liquidLight.hex}22`,
              boxShadow: `0 0 55px ${repositories[prevIndex].liquidLight.hex}26, inset 0 1px 1px rgba(255,255,255,0.06)`,
            }}
          >
            <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>{repositories[prevIndex].primaryLanguage}</span>
            </div>
            <div>
              <h3 className="text-xl font-medium text-neutral-300">
                {repositories[prevIndex].name}
              </h3>
            </div>
          </div>

          {/* Active Card: PURE BASIC GLASS ─── */}
          <motion.div
            key={activeRepo.id}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0.85, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20 w-full max-w-[540px] h-[340px] sm:h-[360px] rounded-[36px] p-8 sm:p-10 flex flex-col justify-between overflow-hidden cursor-default transition-transform duration-100"
            style={{
              transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 30%, rgba(5, 5, 8, 0.75) 70%, rgba(0, 0, 0, 0.90) 100%)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: `
                0 30px 60px -15px rgba(0, 0, 0, 0.9),
                0 0 30px ${activeRepo.liquidLight.hex}18,
                inset 0 1px 1.5px rgba(255, 255, 255, 0.4),
                inset 0 0 0 1px rgba(255, 255, 255, 0.05)
              `,
            }}
          >
            {/* Subtle Glass Brewster Sheen */}
            <div
              className="absolute inset-0 pointer-events-none rounded-[36px] transition-transform duration-100 z-30"
              style={{
                transform: `translate(${tilt.sheenX}px, ${tilt.sheenY}px)`,
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.03) 25%, transparent 50%)',
              }}
            />

            {/* Glowing Pure Liquid Light Orb */}
            <div
              onClick={() => onInspectIcon(activeRepo)}
              className="absolute right-6 top-6 z-10 cursor-pointer pointer-events-auto transition-transform duration-300 hover:scale-105"
              title="Inspeccionar Icono"
            >
              <LiquidPolyFluidOrb
                repoId={activeRepo.id}
                colorHex={activeRepo.liquidLight.hex}
                size="md"
                interactive={true}
              />
            </div>

            {/* Top Minimal Info */}
            <div className="relative z-20 flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activeRepo.languageColor || '#fff' }}
              />
              <span>{activeRepo.primaryLanguage}</span>
              <span className="text-neutral-600">·</span>
              <span className="text-neutral-500">{activeRepo.isPublic ? 'Public' : 'Private'}</span>
            </div>

            {/* Center Content: Clean, Uncluttered Typography */}
            <div className="relative z-20 my-auto text-left max-w-[360px] space-y-2">
              <h1 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
                {activeRepo.name}
              </h1>
              <p className="text-neutral-400 text-xs sm:text-sm font-normal leading-relaxed line-clamp-2">
                {activeRepo.tagline || activeRepo.description}
              </p>
            </div>

            {/* Bottom Minimal Actions — at least 2 links per project: repo + live */}
            <div className="relative z-20 flex items-center justify-between pt-4 border-t border-white/[0.07]">
              <div className="flex items-center gap-4">
                <a
                  href={activeRepo.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>belentani7</span>
                </a>
                {activeRepo.liveUrl && (
                  <a
                    href={activeRepo.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live</span>
                  </a>
                )}
              </div>

              <button
                onClick={() => setIsDrawerOpen(true)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.15] text-xs text-neutral-200 hover:text-white transition-all cursor-pointer"
              >
                <span>Detalles</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>

          {/* Next Card (Subtle Silhouette Below) */}
          <div
            onClick={goToNext}
            className="absolute z-10 w-full max-w-[500px] h-[280px] rounded-[32px] bg-black/60 border border-white/[0.06] p-6 flex flex-col justify-between cursor-pointer transition-all duration-500 overflow-hidden backdrop-blur-md"
            style={{
              transform: 'translateY(55%) translateZ(-140px) scale(0.90)',
              opacity: 0.3,
              filter: 'blur(2px)',
            }}
          >
            <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>{repositories[nextIndex].primaryLanguage}</span>
            </div>
            <div>
              <h3 className="text-xl font-medium text-neutral-300">
                {repositories[nextIndex].name}
              </h3>
            </div>
          </div>
        </div>
      </main>

      {/* ─── 4. ULTRA-MINIMAL BASIC GLASS FOOTER / PAGINATION ─── */}
      <footer className="relative z-30 px-6 sm:px-10 py-6 flex items-center justify-center">
        <div className="flex items-center gap-6 px-5 py-2 rounded-full bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl">
          <button
            onClick={goToPrev}
            className="p-1 text-neutral-500 hover:text-white transition-colors cursor-pointer"
            title="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {repositories.map((repo, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={repo.id}
                  onClick={() => goToIndex(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-6 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                  style={{
                    backgroundColor: isActive ? repo.liquidLight.hex : undefined,
                  }}
                  title={repo.name}
                />
              );
            })}
          </div>

          <button
            onClick={goToNext}
            className="p-1 text-neutral-500 hover:text-white transition-colors cursor-pointer"
            title="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* ─── 5. SWIPE-UP SUSPENDED GLASS DRAWER ─── */}
      <SwipeUpGlassDrawer
        repo={activeRepo}
        isOpen={isDrawerOpen}
        onToggle={() => setIsDrawerOpen((prev) => !prev)}
        onClose={() => setIsDrawerOpen(false)}
        onInspectIcon={onInspectIcon}
        onOpenArticle={onOpenLiquidLightArticle}
      />
    </div>
  );
};

