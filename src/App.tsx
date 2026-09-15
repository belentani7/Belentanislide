import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { REPOSITORIES } from './data/repositories';
import { Repository, LightingMode, AppViewVersion } from './types';
import { PlasmaCanvas } from './components/PlasmaCanvas';
import { LightParticles } from './components/LightParticles';
import { ErrorBoundary } from './components/ErrorBoundary';
import { X } from 'lucide-react';

// Lazy: cada pantalla pesada va en su propio chunk y no bloquea el primer paint.
// PlasmaCanvas queda eager porque es el fondo.
const Cascade3DStream = lazy(() =>
  import('./components/Cascade3DStream').then((m) => ({ default: m.Cascade3DStream })),
);
const SmartWatchCascadeTV = lazy(() =>
  import('./components/SmartWatchCascadeTV').then((m) => ({ default: m.SmartWatchCascadeTV })),
);
const NetflixGrandScreen = lazy(() =>
  import('./components/NetflixGrandScreen').then((m) => ({ default: m.NetflixGrandScreen })),
);
const ZeroTextScreen = lazy(() =>
  import('./components/ZeroTextScreen').then((m) => ({ default: m.ZeroTextScreen })),
);
const HarmoniaEscaparatismoModal = lazy(() =>
  import('./components/HarmoniaEscaparatismoModal').then((m) => ({
    default: m.HarmoniaEscaparatismoModal,
  })),
);
const LiquidLightArticleDrawer = lazy(() =>
  import('./components/LiquidLightArticleDrawer').then((m) => ({
    default: m.LiquidLightArticleDrawer,
  })),
);
const DevOpsCliBackend = lazy(() =>
  import('./components/DevOpsCliBackend').then((m) => ({ default: m.DevOpsCliBackend })),
);
const IconStudioModal = lazy(() =>
  import('./components/IconStudioModal').then((m) => ({ default: m.IconStudioModal })),
);
const CustomIconStudio = lazy(() =>
  import('./components/CustomIconStudio').then((m) => ({ default: m.CustomIconStudio })),
);

const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

function ViewFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-busy="true" aria-live="polite">
      <div className="font-mono text-xs uppercase tracking-[0.3em] text-purple-300/60">
        Cargando experiencia…
      </div>
    </div>
  );
}

export default function App() {
  // Defaulting strictly to 3% liquid light (ultra-noir-3) as requested
  const [lightingMode, setLightingMode] = useState<LightingMode>('ultra-noir-3');
  // Primary view version: 'cascade-3d' (Identical 3D Suspended Glass Stream matching image.png)
  const [viewVersion, setViewVersion] = useState<AppViewVersion>('cascade-3d');

  // Modals & Drawers
  const [show1000RulesModal, setShow1000RulesModal] = useState<boolean>(false);
  const [showCliBackend, setShowCliBackend] = useState<boolean>(false);
  const [selectedRepoForArticle, setSelectedRepoForArticle] = useState<Repository | null>(null);
  const [selectedRepoForModal, setSelectedRepoForModal] = useState<Repository | null>(null);
  const [showStudioWorkbench, setShowStudioWorkbench] = useState<boolean>(false);

  // Global listener for backend CLI shortcut (backtick key ` or ~)
  // Ignora cuando el usuario escribe en inputs para no romper la escritura.
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setShowCliBackend((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const cloudStyle = useMemo(
    () => ({
      opacity: lightingMode === 'ultra-noir-3' ? 0.04 : lightingMode === 'hbo-noir' ? 0.16 : 0.3,
      background: `
        radial-gradient(ellipse at 25% 25%, rgba(192, 132, 252, 0.08) 0%, transparent 55%),
        radial-gradient(ellipse at 75% 75%, rgba(147, 51, 234, 0.06) 0%, transparent 65%),
        radial-gradient(ellipse at 50% 50%, rgba(216, 180, 254, 0.03) 0%, transparent 70%)
      `,
      filter: 'blur(64px) saturate(1.1)',
      transform: 'translateZ(0)',
    }),
    [lightingMode],
  );

  const handleInspectIcon = useCallback((repo: Repository) => setSelectedRepoForModal(repo), []);
  const handleOpenRules = useCallback(() => setShow1000RulesModal(true), []);
  const handleOpenCli = useCallback(() => setShowCliBackend(true), []);
  const handleOpenArticle = useCallback((repo: Repository) => setSelectedRepoForArticle(repo), []);
  const handleCloseArticle = useCallback(() => setSelectedRepoForArticle(null), []);
  const handleCloseIconModal = useCallback(() => setSelectedRepoForModal(null), []);
  const handleCloseCli = useCallback(() => setShowCliBackend(false), []);
  const handleCloseRules = useCallback(() => setShow1000RulesModal(false), []);
  const handleCloseWorkbench = useCallback(() => setShowStudioWorkbench(false), []);
  const handleOpenWorkbench = useCallback(() => setShowStudioWorkbench(true), []);

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black text-[#e8e0f5] font-sans selection:bg-purple-900 selection:text-white">
      {/* ─── 1. Ultra-Dark 3% Liquid Light Plasma Canvas ─── */}
      <PlasmaCanvas mode={lightingMode} />

      {/* ─── 1b. Bokeh de luz difuminada (sprite pre-render, 30fps, additive) ─── */}
      <LightParticles count={36} />

      {/* ─── 2. Faint Milky Diffuse Clouds (3% lux ceiling) ─── */}
      <div
        className="fixed inset-0 pointer-events-none z-[2] transition-opacity duration-1000"
        style={cloudStyle}
      />

      {/* ─── 3. HBO Max Cinematic Grain Texture ─── */}
      <div
        className="fixed inset-0 pointer-events-none z-[3] opacity-[0.025] mix-blend-screen"
        style={{
          backgroundImage: GRAIN_BG,
        }}
      />

      {/* ─── 4. Active Experience Version Switcher ─── */}
      <div className="relative z-10 w-full h-full">
        <ErrorBoundary fallbackLabel="Falló la vista. Reintenta.">
          <Suspense fallback={<ViewFallback />}>
          {viewVersion === 'cascade-3d' ? (
            <Cascade3DStream
              repositories={REPOSITORIES}
              lightingMode={lightingMode}
              onLightingChange={setLightingMode}
              onInspectIcon={handleInspectIcon}
              onOpenRulesModal={handleOpenRules}
              onOpenCliBackend={handleOpenCli}
              onOpenLiquidLightArticle={handleOpenArticle}
            />
          ) : viewVersion === 'smartwatch-cascade' ? (
            <SmartWatchCascadeTV
              repositories={REPOSITORIES}
              lightingMode={lightingMode}
              onLightingChange={setLightingMode}
              onInspectIcon={handleInspectIcon}
              onOpenStudioWorkbench={handleOpenWorkbench}
              onSwitchVersion={setViewVersion}
              onOpenRulesModal={handleOpenRules}
              onOpenCliBackend={handleOpenCli}
              onOpenLiquidLightArticle={handleOpenArticle}
            />
          ) : viewVersion === 'zero-text' ? (
            <ZeroTextScreen
              repositories={REPOSITORIES}
              lightingMode={lightingMode}
              onLightingChange={setLightingMode}
              onInspectIcon={handleInspectIcon}
              onSwitchVersion={setViewVersion}
              onOpenRulesModal={handleOpenRules}
              onOpenStudioWorkbench={handleOpenWorkbench}
            />
          ) : (
            <NetflixGrandScreen
              repositories={REPOSITORIES}
              lightingMode={lightingMode}
              onLightingChange={setLightingMode}
              onInspectIcon={handleInspectIcon}
              onSwitchVersion={setViewVersion}
              onOpenRulesModal={handleOpenRules}
              onOpenStudioWorkbench={handleOpenWorkbench}
            />
          )}
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* ─── 5. 1,000 Reglas de Diseño, Armonía, Escaparatismo y Real Glass Glossy ─── */}
      {show1000RulesModal && (
        <Suspense fallback={null}>
          <HarmoniaEscaparatismoModal isOpen={show1000RulesModal} onClose={handleCloseRules} />
        </Suspense>
      )}

      {/* ─── 6. Liquid Light Scientific Articles Drawer (Polaritons & Superfluidity) ─── */}
      {selectedRepoForArticle && (
        <Suspense fallback={null}>
          <LiquidLightArticleDrawer
            repo={selectedRepoForArticle}
            isOpen={Boolean(selectedRepoForArticle)}
            onClose={handleCloseArticle}
          />
        </Suspense>
      )}

      {/* ─── 7. DevOps CLI Backend Terminal (Accessed internally via [ ` ] or button) ─── */}
      {showCliBackend && (
        <Suspense fallback={null}>
          <DevOpsCliBackend isOpen={showCliBackend} onClose={handleCloseCli} />
        </Suspense>
      )}

      {/* ─── 8. 4K High-Resolution Icon Studio Modal ─── */}
      {selectedRepoForModal && (
        <Suspense fallback={null}>
          <IconStudioModal
            repo={selectedRepoForModal}
            onClose={handleCloseIconModal}
            lightingMode={lightingMode}
            onLightingChange={setLightingMode}
          />
        </Suspense>
      )}

      {/* ─── 9. Custom Icon Studio Drawer / Laboratory Modal ─── */}
      {showStudioWorkbench && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-3xl overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Laboratorio de iconos procedurales"
        >
          <div className="relative w-full max-w-4xl my-8 bg-black/95 border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.25)]">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-purple-500/20">
              <div>
                <h3 className="text-base font-mono uppercase tracking-wider text-white">
                  LABORATORIO DE ICONOS PROCEDURALES EN VIVO
                </h3>
                <p className="text-xs font-mono text-purple-300/60 mt-0.5">
                  Prueba de halo fino, puff puff y dispersión cromática para repositorios públicos
                </p>
              </div>
              <button
                onClick={handleCloseWorkbench}
                aria-label="Cerrar laboratorio"
                className="p-1.5 rounded-xl border border-purple-500/20 bg-purple-950/40 text-purple-300 hover:text-white hover:border-purple-400/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Suspense fallback={<ViewFallback />}>
              <CustomIconStudio />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}
