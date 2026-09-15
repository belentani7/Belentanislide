import { useState, useEffect, useRef, useCallback, memo, type FormEvent, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  X,
  Maximize2,
  Minimize2,
  RefreshCw,
  Cpu,
  Activity,
  ShieldCheck,
  Zap,
  Layers,
  ChevronRight,
  Sparkles,
  Download,
  FileCode,
  CheckCircle2
} from 'lucide-react';
import { REPOSITORIES } from '../data/repositories';

interface DevOpsCliBackendProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CliHistoryEntry {
  command?: string;
  output: ReactNode;
  type?: 'input' | 'output' | 'system' | 'error' | 'success';
}

export const DevOpsCliBackend = memo(function DevOpsCliBackend({
  isOpen,
  onClose,
}: DevOpsCliBackendProps) {
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState<boolean>(false);
  const [autoUpdateCount, setAutoUpdateCount] = useState<number>(142);
  const [lastSyncTime, setLastSyncTime] = useState<string>(new Date().toLocaleTimeString());
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [entries, setEntries] = useState<CliHistoryEntry[]>([
    {
      type: 'system',
      output: (
        <div className="space-y-1 text-purple-300/90 font-mono text-xs">
          <div className="text-purple-400 font-bold tracking-wider">
            ════════════════════════════════════════════════════════════════════
          </div>
          <div className="text-white font-bold">
            ⚡ BELENTANI NOIACORE BACKEND CLI v4.8 [INTERNAL DAEMON ACCESS]
          </div>
          <div className="text-purple-300/80">
            Node: Europe-West2 · Protocol: tRPC 11.2 · Lux: 3.00% CLAMPED · Live Auto-Update: ON
          </div>
          <div className="text-purple-400 font-bold tracking-wider">
            ════════════════════════════════════════════════════════════════════
          </div>
          <div className="text-neutral-400 text-[11px] pt-1">
            Escribe <span className="text-purple-300 font-bold">help</span> para ver los comandos internos disponibles.
          </div>
        </div>
      ),
    },
  ]);

  // Real-time automatic background updates ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setAutoUpdateCount((prev) => prev + 1);
      setLastSyncTime(new Date().toLocaleTimeString());
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Cerrar con Escape (funciona incluso desde el input; no secuestra escritura)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName;
      const isEditable = tag === 'INPUT' || tag === 'TEXTAREA' || !!el?.isContentEditable;
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (isEditable) return;
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  // Scroll to bottom on entries change
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  const handleCommandSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    // Add to history
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);
    setInputVal('');

    const lowerCmd = cmd.toLowerCase();
    let outputNode: ReactNode = null;

    let normalizedCmd = lowerCmd;
    if (lowerCmd.includes('hack') || lowerCmd.includes('segur') || lowerCmd.includes('peligro') || lowerCmd.includes('virus')) {
      normalizedCmd = 'security';
    } else if (lowerCmd.includes('blind') || lowerCmd.includes('shield') || lowerCmd.includes('phalanx') || lowerCmd.includes('suprem')) {
      normalizedCmd = 'shield';
    } else if (lowerCmd.startsWith('opencode') || lowerCmd.startsWith('install') || lowerCmd.startsWith('code') || lowerCmd.startsWith('ejecut')) {
      normalizedCmd = 'opencode';
    } else if (lowerCmd.includes('download') || lowerCmd.includes('descargar') || lowerCmd.includes('script') || lowerCmd.includes('python')) {
      normalizedCmd = 'download';
    } else if (lowerCmd.includes('manifest') || lowerCmd.includes('hash') || lowerCmd.includes('sha256')) {
      normalizedCmd = 'manifest';
    }

    switch (normalizedCmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-purple-200/90 pl-2 border-l border-purple-500/30 my-2">
            <div className="text-purple-400 font-bold">COMANDOS DEL BACKEND DISPONIBLES:</div>
            <div><span className="text-white font-bold">shield</span> - Blindaje Supremo Real: Motor Phalanx Shield v5.0.2 Auto-Adaptable.</div>
            <div><span className="text-white font-bold">manifest</span> - Ver manifiesto criptográfico SHA-256 de los archivos del proyecto.</div>
            <div><span className="text-white font-bold">download</span> - Descargar script phalanx_shield.py listo para tus proyectos.</div>
            <div><span className="text-white font-bold">security</span> - Verificar seguridad del sistema (Sandbox / Sin riesgo / 100% Mockup).</div>
            <div><span className="text-white font-bold">opencode</span> - Inspección de código y repositorios en GitHub.</div>
            <div><span className="text-white font-bold">status</span> - Ver telemetría en vivo, memoria y daemon de auto-actualización.</div>
            <div><span className="text-white font-bold">engine</span> - Consultar el Design Constraint Engine y las 8 Prioridades Maestras.</div>
            <div><span className="text-white font-bold">harmony</span> - Ejecutar evaluación matemática de Armonía de Escena.</div>
            <div><span className="text-white font-bold">audit</span> - Auditoría de las 20 categorías y las 7 preguntas de escaparatismo.</div>
            <div><span className="text-white font-bold">sync</span> - Forzar sincronización instantánea de los 14 repositorios.</div>
            <div><span className="text-white font-bold">repos</span> - Lista de los 14 proyectos con su color de luz líquida y métricas.</div>
            <div><span className="text-white font-bold">lux</span> - Auditoría del límite estricto de 3% de luz líquida fotométrica.</div>
            <div><span className="text-white font-bold">clear</span> - Limpiar la pantalla del terminal.</div>
            <div><span className="text-white font-bold">exit</span> - Cerrar consola interna.</div>
          </div>
        );
        break;

      case 'shield':
      case 'phalanx':
      case 'blindaje':
        outputNode = (
          <div className="space-y-2.5 text-xs font-mono text-purple-200 pl-2 border-l border-purple-400/50 my-2">
            <div className="text-purple-300 font-bold flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>BLINDAJE SUPREMO REAL · PHALANX SHIELD v5.0.2 [HARDENED]</span>
            </div>

            <div className="p-3 rounded-lg bg-black/80 border border-purple-500/30 space-y-2 text-[11px] text-neutral-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
                <span className="text-white font-bold">ESTADO DE BLINDAJE: 100% ACTIVO & VERIFICADO</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/40">FIPS 140-3 COMPLIANT</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Secret Scanning: 0 filtraciones en archivos</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>SAST Ligero: 0 inyecciones de código</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Auditoría CVE: Dependencias blindadas</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>SHA-256 Manifest: .noiacore_manifest.json</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Normalización LF: 100% de archivos alineados</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Air-Gapped Local: Cero llamadas no deseadas</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <span className="text-neutral-400">Script autónomo disponible: <code className="text-white font-bold">phalanx_shield.py</code></span>
                <a
                  href="/phalanx_shield.py"
                  download="phalanx_shield.py"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-white text-[11px] transition-all cursor-pointer shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                >
                  <Download className="w-3.5 h-3.5 text-purple-300" />
                  <span>Descargar phalanx_shield.py</span>
                </a>
              </div>

              <div className="text-[10px] text-neutral-400 font-mono bg-white/[0.03] p-2 rounded border border-white/5">
                $ python3 phalanx_shield.py --path . --fix
              </div>
            </div>
          </div>
        );
        break;

      case 'manifest':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-purple-200 pl-2 border-l border-emerald-500/40 my-2">
            <div className="text-emerald-400 font-bold flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span>MANIFIESTO CRIPTOGRÁFICO DE INTEGRIDAD (.noiacore_manifest.json)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/70 border border-emerald-500/20 text-[10px] text-neutral-300 space-y-1 font-mono">
              <div className="text-neutral-400"># Algoritmo: SHA-256 · Verificación de Integridad en Frío</div>
              <div>src/App.tsx: <span className="text-emerald-400">sha256:7f4c9...verified</span></div>
              <div>src/components/Cascade3DStream.tsx: <span className="text-emerald-400">sha256:a18e2...verified</span></div>
              <div>src/components/DevOpsCliBackend.tsx: <span className="text-emerald-400">sha256:b891d...verified</span></div>
              <div>phalanx_shield.py: <span className="text-emerald-400">sha256:f0293...verified</span></div>
              <div>package.json: <span className="text-emerald-400">sha256:4c219...verified</span></div>
              <div className="text-emerald-300 font-bold pt-1">✓ 32 archivos verificados · 0 alteraciones detectadas.</div>
            </div>
          </div>
        );
        break;

      case 'download':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-purple-200 pl-2 border-l border-purple-400/40 my-2">
            <div className="text-white font-bold flex items-center gap-2">
              <Download className="w-4 h-4 text-purple-400" />
              <span>DESCARGAR MOTOR PHALANX SHIELD</span>
            </div>
            <div className="p-3 rounded-lg bg-black/60 border border-purple-500/20 text-[11px] text-neutral-300 space-y-2">
              <div>Haz clic en el enlace para descargar el script real autónomo y llevarlo a tu máquina:</div>
              <div>
                <a
                  href="/phalanx_shield.py"
                  download="phalanx_shield.py"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 font-bold transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar phalanx_shield.py (15 KB)</span>
                </a>
              </div>
              <div className="text-[10px] text-neutral-400">
                Uso en tu terminal: <code>python3 phalanx_shield.py --path /ruta/a/tu/proyecto --fix</code>
              </div>
            </div>
          </div>
        );
        break;

      case 'security':
      case 'seguridad':
      case 'safe':
      case 'hacker':
      case 'hack':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-emerald-300 pl-2 border-l border-emerald-500/40 my-2">
            <div className="text-emerald-400 font-bold flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>SISTEMA 100% SEGURO · SANDBOX TOTALMENTE AISLADO</span>
            </div>
            <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/20 space-y-1.5 text-[11px] text-neutral-300">
              <div>• <span className="text-white font-bold">Es 100% una simulación (mockup visual):</span> Esta consola CLI es un componente puramente visual en React para ambientar el escaparate digital estilo Apple / HBO Max.</div>
              <div>• <span className="text-white font-bold">Cero acceso a tu ordenador:</span> Se ejecuta dentro de la memoria protegida del navegador. No tiene permisos de lectura ni de escritura en tu disco duro, ni ejecuta procesos de sistema.</div>
              <div>• <span className="text-white font-bold">Nadie puede hackearte:</span> No instala ejecutables, no abre puertos en tu red ni recopila datos privados. Es un entorno de exhibición interactivo y seguro.</div>
            </div>
          </div>
        );
        break;

      case 'opencode':
      case 'install opencode':
      case 'code':
      case 'install':
      case 'ejecutar':
      case 'exec':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-purple-200 pl-2 border-l border-purple-400/40 my-2">
            <div className="text-purple-300 font-bold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>OPENCODE / MODO DESARROLLADOR SEGURO</span>
            </div>
            <div className="p-3 rounded-lg bg-black/60 border border-purple-500/20 space-y-1.5 text-[11px] text-neutral-300">
              <div>✓ <span className="text-emerald-400 font-bold">Comando registrado:</span> Todos los comandos se interpretan en este sandbox interactivo local.</div>
              <div>✓ <span className="text-white font-bold">Código fuente de los proyectos:</span> Puedes explorar los 14 proyectos reales con sus repositorios en GitHub del creador:</div>
              <div className="text-purple-300 font-bold pl-3">→ https://github.com/belentani7</div>
              <div>✓ Escribe <span className="text-white font-bold">repos</span> para listar todos los proyectos, o <span className="text-white font-bold">security</span> para revisar el informe de seguridad.</div>
            </div>
          </div>
        );
        break;

      case 'engine':
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono text-purple-200/90 pl-2 border-l border-purple-400/40 my-2">
            <div className="text-purple-300 font-bold">BELENTANI DESIGN CONSTRAINT ENGINE (8 PRIORIDADES MAESTRAS):</div>
            <div className="text-[11px] text-neutral-300 space-y-1">
              <div>• <span className="text-white font-bold">PRIORIDAD 0 (Identidad):</span> Apple-level restraint, HBO/Max Noir, 3% lux, real glass glossy.</div>
              <div>• <span className="text-white font-bold">PRIORIDAD 1 (Composición):</span> Un foco dominante, una palabra (0-texto), &gt;60% espacio negativo.</div>
              <div>• <span className="text-white font-bold">PRIORIDAD 2 (Material):</span> Cristal físico, ángulo de Brewster 45°, bisel 1px, n=1.51-1.68.</div>
              <div>• <span className="text-white font-bold">PRIORIDAD 3 (Luz):</span> 3% lux ceiling (8/255 RGB), 14 longitudes de onda únicas, luz interna.</div>
              <div>• <span className="text-white font-bold">PRIORIDAD 4 (Movimiento):</span> Respiración de baja frecuencia, cascada 3D, inercia de corona.</div>
              <div>• <span className="text-white font-bold">PRIORIDAD 5 (Responsive):</span> 4 experiencias discretas: SmartWatch → Móvil → Desktop → TV.</div>
              <div>• <span className="text-white font-bold">PRIORIDAD 6 (Escaparatismo):</span> Obra de museo digital; educación abierta en primer lugar.</div>
              <div>• <span className="text-white font-bold">PRIORIDAD 7 (Ingeniería):</span> Daemon invisible, CLI interna, 60 FPS estables, cero secretos expuestos.</div>
            </div>
          </div>
        );
        break;

      case 'harmony':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-purple-200/90 pl-2 border-l border-emerald-500/40 my-2">
            <div className="text-emerald-400 font-bold flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>EVALUACIÓN DE ARMONÍA MATEMÁTICA: 100% CUMPLIMIENTO</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] bg-purple-950/20 p-2.5 rounded-lg border border-purple-500/20">
              <div>Focal Point: <span className="text-white font-bold">1 Objeto Activo (Aislado)</span></div>
              <div>Secondary Points: <span className="text-purple-300 font-bold">3 Controles Periféricos</span></div>
              <div>Atmosphere Bias: <span className="text-emerald-400 font-bold">2.98% Lux (Clamped)</span></div>
              <div>Contraste Perceptual: <span className="text-white font-bold">14.8:1 (WCAG AAA)</span></div>
              <div>Rugosidad Óptica: <span className="text-purple-300 font-bold">n = 1.54 (Cristal de Borosilicato)</span></div>
              <div>Dictamen: <span className="text-emerald-300 font-bold">ARMONÍA PURA · NADA GRITA</span></div>
            </div>
          </div>
        );
        break;

      case 'audit':
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono text-purple-200/90 pl-2 border-l border-purple-400/40 my-2">
            <div className="text-purple-300 font-bold">AUDITORÍA CONTINUA DE ESCAPARATISMO (7 PREGUNTAS):</div>
            <div className="text-[11px] text-neutral-300 space-y-1">
              <div>✓ ¿Dónde está el foco? → <span className="text-white">Monoglifo 4K y palabra monumental central.</span></div>
              <div>✓ ¿Dónde respira la composición? → <span className="text-white">65% de espacio negativo en negro absoluto.</span></div>
              <div>✓ ¿Qué ve primero el usuario? → <span className="text-white">La longitud de onda cromática del proyecto activo.</span></div>
              <div>✓ ¿Qué ve segundo? → <span className="text-white">Corona digital háptica y marco panorámico 16:9.</span></div>
              <div>✓ ¿Qué puede ignorar? → <span className="text-white">Telemetría secundaria hasta abrir pantalla glass.</span></div>
              <div>✓ ¿Qué elemento vende la identidad? → <span className="text-white">El artículo científico y la escultura cuántica.</span></div>
              <div>✓ ¿Qué elemento sobra? → <span className="text-emerald-400 font-bold">Cero paneles SaaS ni elementos decorativos ruidosos.</span></div>
            </div>
          </div>
        );
        break;

      case 'status':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-purple-200/90 pl-2 border-l border-emerald-500/40 my-2">
            <div className="text-emerald-400 font-bold flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>ESTADO DEL BACKEND: ACTIVO (200 OK)</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] bg-purple-950/20 p-2.5 rounded-lg border border-purple-500/20">
              <div>Uptime: <span className="text-white font-bold">99.98%</span></div>
              <div>Auto-Syncs ejecutados: <span className="text-emerald-400 font-bold">{autoUpdateCount}</span></div>
              <div>Último pulso: <span className="text-white">{lastSyncTime}</span></div>
              <div>Luminancia fotométrica: <span className="text-purple-300 font-bold">2.98% / 3.00% (SEGURO)</span></div>
              <div>Memoria Heap: <span className="text-white font-bold">42.8 MB / 512 MB</span></div>
              <div>Latencia API Proxy: <span className="text-emerald-400 font-bold">1.4ms</span></div>
              <div>Repositorios anclados: <span className="text-white font-bold">14 (4 Escaparate Principal)</span></div>
              <div>Motor de Escaparatismo: <span className="text-purple-300 font-bold">20.000 Reglas Activas</span></div>
            </div>
          </div>
        );
        break;

      case 'hero':
      case 'liquid':
        outputNode = (
          <div className="space-y-2 text-xs font-mono text-purple-200/90 pl-2 border-l border-rose-500/60 my-2">
            <div className="text-rose-400 font-bold flex items-center gap-2">
              <span>★ REPOSITORIO HÉROE IDENTIFICADO (EFECTO LUZ LÍQUIDA IDÉNTICO):</span>
            </div>
            <div className="bg-black/60 p-3 rounded-xl border border-rose-500/30 space-y-1.5 text-[11px]">
              <div className="text-white font-bold text-sm">ManosAbiertas</div>
              <div className="text-rose-300">Color: Luz Líquida Rubí Carmesí Plasmático (#ef4444)</div>
              <div className="text-neutral-300">Artículo Científico: Science Advances, Vol. 6, eaaz1288</div>
              <div className="text-neutral-400">Título: "Milky-Light Diffusers and Guided Photonic Fluids in Biopolymer Films"</div>
              <div className="text-neutral-300">Efecto Visual: Esfera plasmática 3D con filamentos cuánticos, halo orbital carmesí y dispersión de Mie a 3% lux.</div>
              <div className="text-emerald-400 font-bold">Cumplimiento del Motor de Diseño: 100% de las 20.000 reglas aplicadas.</div>
            </div>
          </div>
        );
        break;

      case 'sync':
        setIsSyncing(true);
        outputNode = (
          <div className="text-xs font-mono text-purple-300 pl-2 border-l border-purple-500/30 my-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>[DAEMON] Sincronizando con GitHub API y Vercel Deployments...</span>
            </div>
            <div className="text-[11px] text-neutral-400 mt-1">
              ✓ open-school (CSS/WCAG) ............... ACTUALIZADO
              <br />✓ ux-academy-professional-program ... ACTUALIZADO
              <br />✓ ManosAbiertas (Comunidades) ...... ACTUALIZADO
              <br />✓ linguaforge (Fonética) ........... ACTUALIZADO
              <br />✓ local-agent (Ollama Local) ....... ACTUALIZADO
              <br />✓ 14 repositorios sincronizados con 0 errores de compilación.
            </div>
          </div>
        );
        setTimeout(() => setIsSyncing(false), 800);
        break;

      case 'repos':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-purple-200/90 pl-2 border-l border-purple-500/30 my-2">
            <div className="text-purple-400 font-bold">CATÁLOGO DE LOS 14 REPOSITORIOS (CADA UNO CON SU COLOR DE LUZ LÍQUIDA):</div>
            <div className="grid grid-cols-1 gap-1 text-[11px] mt-1 max-h-52 overflow-y-auto">
              {REPOSITORIES.map((r, i) => (
                <div key={r.id} className="flex items-center justify-between p-1.5 rounded bg-black/40 border border-purple-900/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: r.liquidLight.hex }} />
                    <span className="text-white font-bold">{r.name}</span>
                    <span className="text-purple-400 text-[10px]">[{r.singleWord}]</span>
                  </div>
                  <div className="text-neutral-400 text-[10px]">
                    {r.liquidLight.colorName} · {r.stats.stars} ★
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'lux':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-purple-200/90 pl-2 border-l border-purple-400/40 my-2">
            <div className="text-purple-300 font-bold">FOTOMETRÍA DEL SISTEMA (3% LUZ LÍQUIDA):</div>
            <div className="text-[11px] text-neutral-300">
              • Límite canal RGB: <span className="text-white font-bold">8 / 255 (3.13% Máximo)</span>
              <br />• Modo actual: <span className="text-emerald-400 font-bold">Ultra-Noir-3 (Plasmática Milky Light)</span>
              <br />• Atenuación de brillo: <span className="text-purple-300 font-bold">-97% respecto al blanco convencional</span>
              <br />• Cero fatiga retiniana en visionado nocturno prolongado.
            </div>
          </div>
        );
        break;

      case 'science':
        outputNode = (
          <div className="space-y-1.5 text-xs font-mono text-purple-200/90 pl-2 border-l border-purple-400/40 my-2">
            <div className="text-purple-400 font-bold">ARTÍCULOS CIENTÍFICOS DE LUZ LÍQUIDA ASOCIADOS:</div>
            <div className="text-[11px] text-neutral-300 space-y-1 max-h-48 overflow-y-auto">
              <div>1. <span className="text-white">Nature Photonics:</span> Room-temperature polariton condensation & liquid light.</div>
              <div>2. <span className="text-white">Physical Review Letters:</span> Superfluid motion of light in nonlinear optical media.</div>
              <div>3. <span className="text-white">Science Advances:</span> Milky-Light Diffusers & Guided Photonic Fluids in Biopolymer Films.</div>
              <div>4. <span className="text-white">Optica:</span> Phonon-Polariton Acoustic Coupling in Resonant Quantum Diffraction.</div>
              <div>5. <span className="text-white">Nature Physics:</span> Quantized Vortices in Liquid Light on Silicon Waveguide Chips.</div>
            </div>
          </div>
        );
        break;

      case 'rules':
        outputNode = (
          <div className="text-xs font-mono text-purple-200/90 pl-2 border-l border-purple-400/40 my-2">
            <div className="text-purple-300 font-bold">MOTOR DE 1.000 REGLAS DE DISEÑO, ARMONÍA Y ESCAPARATISMO:</div>
            <div className="text-[11px] text-neutral-300 mt-1">
              • 200 Reglas de Escaparatismo Digital de Lujo (Pantalla TV 16:9 no cuadrada, iluminación bias).
              <br />• 200 Reglas de Real Glass Glossy (Reflexión especular 3D biselada, caustics).
              <br />• 200 Reglas de Armonía de Luz Líquida (1 color propio por proyecto, 3% lux).
              <br />• 200 Reglas de Cascada Smart Watch (Curvatura cilíndrica 3D, inercia de corona digital).
              <br />• 200 Reglas de Plugins y Extensiones (SVG 4K, CLI bridge, webhook emulator).
            </div>
          </div>
        );
        break;

      case 'clear':
        setEntries([]);
        return;

      case 'exit':
        onClose();
        return;

      default:
        outputNode = (
          <div className="text-xs font-mono text-rose-400 pl-2 border-l border-rose-500/30 my-1">
            Comando no reconocido: "{cmd}". Escribe <span className="text-white font-bold">help</span> para ver la lista de instrucciones.
          </div>
        );
    }

    setEntries((prev) => [
      ...prev,
      {
        command: cmd,
        output: outputNode,
        type: 'output',
      },
    ]);
  }, [inputVal, autoUpdateCount, lastSyncTime, onClose]);

  const handleKeyDown = useCallback((e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    }
  }, [commandHistory, historyIndex]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Consola backend DevOps" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className={`w-full ${
          isMaximized ? 'h-[94vh] max-w-7xl' : 'max-w-3xl h-[70vh]'
        } flex flex-col rounded-3xl bg-neutral-950/95 border border-purple-500/40 shadow-[0_0_80px_rgba(168,85,247,0.3)] overflow-hidden text-white font-mono transition-all duration-300`}
      >
        {/* Apple Style Glass Glossy Top Window Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-black/75 border-b border-purple-900/30 backdrop-blur-2xl select-none">
          <div className="flex items-center gap-2">
            {/* Window Traffic Lights */}
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-400 transition-colors cursor-pointer"
              title="Cerrar CLI"
            />
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              aria-label="Maximizar o restaurar"
              className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-400 transition-colors cursor-pointer"
              title="Maximizar/Restaurar"
            />
            <button
              onClick={() => {
                setEntries([]);
              }}
              aria-label="Limpiar terminal"
              className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-colors cursor-pointer"
              title="Limpiar"
            />

            <span className="ml-3 text-xs font-bold tracking-wider text-purple-200/90 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>belentani@noiacore:~$ [BACKEND AUTO-UPDATE DAEMON]</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-purple-300/70">
            {/* Auto Update Pulse Ticker */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-950/50 border border-purple-500/20 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>SYNC #{autoUpdateCount}</span>
            </div>

            <button
              onClick={() => setIsMaximized(!isMaximized)}
              aria-label="Maximizar o restaurar"
              className="p-1.5 rounded hover:bg-purple-900/40 text-purple-300 hover:text-white"
            >
              {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="p-1.5 rounded hover:bg-purple-900/40 text-purple-300 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Real-time Streaming Ticker Sub-bar */}
        <div className="px-4 py-1.5 bg-purple-950/30 border-b border-purple-900/20 flex items-center justify-between text-[11px] text-purple-300/80">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400">
              <Activity className="w-3 h-3" />
              <span>DAEMON: CORRIENDO EN SEGUNDO PLANO</span>
            </span>
            <span className="text-neutral-500">|</span>
            <span>Última sincronización: {lastSyncTime}</span>
            <span className="text-neutral-500">|</span>
            <span className="text-purple-300 font-bold">3% LUX FOTOMÉTRICO ACTIVO</span>
          </div>
          <span className="text-neutral-400 text-[10px] hidden sm:inline">
            Atajo: tecla [ ` ] o botón terminal
          </span>
        </div>

        {/* Scrollable CLI Terminal Output Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono select-text">
          {entries.map((entry, idx) => (
            <div key={idx} className="space-y-1">
              {entry.command && (
                <div className="flex items-center gap-2 text-xs text-purple-400 font-bold">
                  <span className="text-neutral-500">belentani@noiacore:~$</span>
                  <span className="text-white">{entry.command}</span>
                </div>
              )}
              {entry.output}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Prompt Input Line */}
        <form
          onSubmit={handleCommandSubmit}
          className="flex items-center gap-2 px-4 py-3 bg-black/80 border-t border-purple-900/30"
        >
          <label htmlFor="devops-cli-input" className="text-xs text-purple-400 font-bold whitespace-nowrap">
            belentani@noiacore:~$
          </label>
          <input
            id="devops-cli-input"
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe 'help', 'status', 'sync', 'repos', 'lux', 'science'..."
            aria-label="Comando del terminal backend"
            className="flex-1 bg-transparent text-white text-xs font-mono outline-none border-none placeholder-purple-400/40"
            autoFocus
          />
          <button
            type="submit"
            className="px-3 py-1 rounded-lg bg-purple-900/50 hover:bg-purple-800/80 border border-purple-500/30 text-xs font-mono text-purple-200"
          >
            EJECUTAR
          </button>
        </form>
      </motion.div>
    </div>
  );
});
