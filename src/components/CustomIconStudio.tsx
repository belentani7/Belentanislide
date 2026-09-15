import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { RepoIcon } from './RepoIcon';
import { Sparkles, Copy, Check, Wand2, ExternalLink } from 'lucide-react';
import { generateIconBrief, isMiniMaxConfigured, MINIMAX_DESIGN_URL } from '../services/minimax';

export const CustomIconStudio = memo(function CustomIconStudio() {
  const [selectedGlyph, setSelectedGlyph] = useState<string>('open-school-portal');
  const [isEducation, setIsEducation] = useState<boolean>(true);
  const [haloGlow, setHaloGlow] = useState<number>(55);
  const [puffBlur, setPuffBlur] = useState<number>(80);
  const [copied, setCopied] = useState<boolean>(false);
  const [brief, setBrief] = useState<string>('');
  const [briefLoading, setBriefLoading] = useState<boolean>(false);
  const [briefError, setBriefError] = useState<string>('');
  const copyTimeoutRef = useRef<number | null>(null);
  const briefAbortRef = useRef<AbortController | null>(null);
  const minimaxReady = isMiniMaxConfigured();

  useEffect(
    () => () => {
      if (copyTimeoutRef.current !== null) window.clearTimeout(copyTimeoutRef.current);
      briefAbortRef.current?.abort();
    },
    [],
  );

  const glyphOptions = [
    { id: 'open-school-portal', label: 'Open School Portal' },
    { id: 'ux-caliper-matrix', label: 'UX Caliper Matrix' },
    { id: 'hands-open-shield', label: 'Manos Abiertas Shield' },
    { id: 'lingua-acoustic-forge', label: 'LinguaForge Anvil' },
    { id: 'local-silicon-monolith', label: 'Local Agent Die' },
    { id: 'vocal-formant-prism', label: 'Voice Clone Prism' },
    { id: 'neural-router-singularity', label: 'Meta-Skill Crystal' },
    { id: 'neural-core-singularity', label: 'Neural Core Singularity' },
    { id: 'cyber-duck-synth', label: 'Cyber Duck Synth' },
    { id: 'governance-cipher-kernel', label: 'PVC-U Core Seal' },
    { id: 'bioclimatic-voronoi-lattice', label: 'CARQUIDEC Voronoi' },
    { id: 'omega-harmonic-glyph', label: 'Omega Harmonic' },
    { id: 'sanctuary-beacon-compass', label: 'Sanctuary Beacon' },
    { id: 'aegis-firewall-shield', label: 'AgentGuard Aegis' },
  ];

  const colorPalettes = [
    { name: 'Noir Violet', hex: '#c084fc', halo: 'rgba(192, 132, 252, 0.45)', puff: 'rgba(168, 85, 247, 0.3)' },
    { name: 'HBO Deep Magenta', hex: '#e879f9', halo: 'rgba(232, 121, 249, 0.45)', puff: 'rgba(217, 70, 239, 0.3)' },
    { name: 'Ultra Lavender', hex: '#e9d5ff', halo: 'rgba(233, 213, 255, 0.5)', puff: 'rgba(192, 132, 252, 0.35)' },
    { name: 'Cyber Neon Purple', hex: '#a855f7', halo: 'rgba(168, 85, 247, 0.55)', puff: 'rgba(126, 34, 206, 0.35)' },
    { name: 'Electric Cyan-Violet', hex: '#38bdf8', halo: 'rgba(56, 189, 248, 0.45)', puff: 'rgba(168, 85, 247, 0.25)' },
  ];

  const [currentPalette, setCurrentPalette] = useState(colorPalettes[0]);

  const handleBrief = useCallback(async () => {
    briefAbortRef.current?.abort();
    const controller = new AbortController();
    briefAbortRef.current = controller;
    setBriefLoading(true);
    setBriefError('');
    try {
      const text = await generateIconBrief(
        {
          glyph: selectedGlyph,
          paletteName: currentPalette.name,
          hex: currentPalette.hex,
          haloGlow,
          puffBlur,
          education: isEducation,
        },
        controller.signal,
      );
      setBrief(text);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setBriefError(err instanceof Error ? err.message : 'Error con MiniMax');
      }
    } finally {
      setBriefLoading(false);
    }
  }, [selectedGlyph, currentPalette, haloGlow, puffBlur, isEducation]);

  const handleCopyCode = () => {
    const snippet = `<div class="repo-noir-icon" data-glyph="${selectedGlyph}">
  <!-- Fine Luminous 1px Edge Halo -->
  <style>
    .repo-noir-icon {
      background: rgba(5, 1, 9, 0.88);
      border: 1px solid ${currentPalette.halo};
      box-shadow: 0 16px 50px rgba(0,0,0,0.95), 0 0 ${haloGlow}px ${currentPalette.halo};
      backdrop-filter: blur(32px) saturate(180%);
    }
  </style>
</div>`;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    if (copyTimeoutRef.current !== null) window.clearTimeout(copyTimeoutRef.current);
    copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative z-20 mx-auto max-w-5xl px-4 mb-20">
      <div className="rounded-[36px] border border-purple-500/25 bg-black/80 p-6 sm:p-10 backdrop-blur-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_60px_rgba(168,85,247,0.12)]">
        {/* Section title */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-purple-500/15">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-purple-300">
              ESTUDIO INTERACTIVO // LABORATORIO DE ICONOS
            </span>
            <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
              Diseño de Iconos <span className="text-purple-300">Noir Purple & Cristal Grueso</span>
            </h3>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] text-purple-400 bg-purple-950/60 border border-purple-400/30 px-3 py-1 rounded-full">
            <Sparkles aria-hidden="true" className="w-3.5 h-3.5" />
            VECTORES PROCESADOS EN VIVO
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Preview Box */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-3xl bg-black/90 border border-purple-500/20 relative overflow-hidden min-h-[300px]">
            {/* Custom Puff Diffusion */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none transition-all duration-700"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${currentPalette.puff} 0%, transparent 68%)`,
                filter: `blur(${puffBlur / 2}px)`,
                opacity: puffBlur / 100,
              }}
            />

            {/* Rendered Icon */}
            <div className="relative z-10 py-6">
              <RepoIcon
                glyphType={selectedGlyph}
                name={selectedGlyph}
                size="xl"
                isEducation={isEducation}
                accentColor={currentPalette.hex}
                haloColor={currentPalette.halo}
                puffGlow={currentPalette.puff}
              />
            </div>

            {/* Spec Tag */}
            <div className="font-mono text-[10px] text-purple-300/70 tracking-widest uppercase mt-4">
              GLYPH: {selectedGlyph} · HALO: {haloGlow}PX
            </div>
          </div>

          {/* Right Parameters Box */}
          <div className="lg:col-span-7 space-y-5">
            {/* Glyph Selector */}
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-purple-300/80 block mb-2">
                1. Seleccionar Glifo Vectorial
              </label>
              <select
                value={selectedGlyph}
                onChange={(e) => setSelectedGlyph(e.target.value)}
                aria-label="Seleccionar glifo vectorial"
                className="w-full rounded-xl border border-purple-500/30 bg-purple-950/30 px-4 py-2.5 font-mono text-xs text-purple-100 focus:border-purple-400 focus:outline-none"
              >
                {glyphOptions.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-black text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Palette Selector */}
            <div>
              <label className="font-mono text-xs uppercase tracking-wider text-purple-300/80 block mb-2">
                2. Tonalidad HBO Noir & Ultra Violeta
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {colorPalettes.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => setCurrentPalette(p)}
                    aria-pressed={currentPalette.name === p.name}
                    aria-label={`Usar paleta ${p.name}`}
                    className={`flex items-center gap-2 p-2 rounded-xl border text-left font-mono text-[10px] transition-all ${
                      currentPalette.name === p.name
                        ? 'border-purple-400 bg-purple-900/40 text-white shadow-[0_0_12px_rgba(192,132,252,0.3)]'
                        : 'border-purple-500/20 bg-black/40 text-purple-300/60 hover:text-white'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: p.hex }} />
                    <span className="truncate">{p.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders: Halo and Puff Puff */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex justify-between font-mono text-[10px] text-purple-200 mb-1.5">
                  <span>FINA LUZ HALO</span>
                  <span>{haloGlow}px</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="100"
                  value={haloGlow}
                  onChange={(e) => setHaloGlow(Number(e.target.value))}
                  aria-label="Intensidad de luz halo"
                  className="w-full accent-purple-400 bg-purple-950/50 h-1.5 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono text-[10px] text-purple-200 mb-1.5">
                  <span>DIFUMINADO PUFF</span>
                  <span>{puffBlur}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={puffBlur}
                  onChange={(e) => setPuffBlur(Number(e.target.value))}
                  aria-label="Nivel de difuminado puff"
                  className="w-full accent-purple-400 bg-purple-950/50 h-1.5 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Toggle Education Badge */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setIsEducation(!isEducation)}
                aria-pressed={isEducation}
                aria-label={isEducation ? 'Desactivar insignia de educación' : 'Activar insignia de educación'}
                className={`font-mono text-[10px] uppercase px-3 py-1.5 rounded-xl border transition-all ${
                  isEducation
                    ? 'border-purple-400 bg-purple-900/40 text-purple-100 shadow-[0_0_15px_rgba(192,132,252,0.3)]'
                    : 'border-purple-500/20 bg-black/40 text-purple-400/50'
                }`}
              >
                {isEducation ? '★ Insignia Educación Activada' : '○ Modo Estándar'}
              </button>
            </div>

            {/* Export Actions */}
            <div className="pt-3 border-t border-purple-500/15 flex flex-wrap items-center gap-3">
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 py-2.5 px-4 font-mono text-xs text-white transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
              >
                {copied ? <Check aria-hidden="true" className="w-4 h-4 text-emerald-400" /> : <Copy aria-hidden="true" className="w-4 h-4 text-purple-300" />}
                <span>{copied ? 'Código Copiado!' : 'Copiar Preset HTML/CSS'}</span>
              </button>
              <button
                onClick={handleBrief}
                disabled={!minimaxReady || briefLoading}
                title={minimaxReady ? 'Generar brief de dirección de arte con MiniMax M3' : 'Configura VITE_MINIMAX_API_KEY para activar'}
                className="flex items-center gap-2 rounded-xl border py-2.5 px-4 font-mono text-xs transition-all disabled:cursor-not-allowed disabled:opacity-40 border-fuchsia-400/40 bg-fuchsia-600/20 hover:bg-fuchsia-600/40 text-white"
              >
                <Wand2 aria-hidden="true" className="w-4 h-4 text-fuchsia-300" />
                <span>{briefLoading ? 'Generando…' : 'Brief IA con MiniMax'}</span>
              </button>
              <a
                href={MINIMAX_DESIGN_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-purple-300/60 hover:text-white transition-colors"
              >
                Abrir MiniMax Design
                <ExternalLink aria-hidden="true" className="w-3 h-3" />
              </a>
            </div>

            {/* MiniMax brief result */}
            {!minimaxReady && (
              <p className="font-mono text-[10px] text-purple-300/50 tracking-wide">
                Tip: añade VITE_MINIMAX_API_KEY en tu .env para activar el brief IA (¥15 de prueba en platform.minimax.io).
              </p>
            )}
            {briefError && (
              <p role="alert" className="font-mono text-[11px] text-rose-300/90">
                {briefError}
              </p>
            )}
            {brief && (
              <div className="rounded-2xl border border-fuchsia-400/25 bg-fuchsia-950/20 p-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fuchsia-300/80 mb-2">
                  Brief MiniMax M3
                </p>
                <p className="whitespace-pre-line text-sm leading-relaxed text-neutral-200">{brief}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});
