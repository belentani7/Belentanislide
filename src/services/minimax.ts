/**
 * MiniMax (MiniMax Design / Open Platform) — integración opcional.
 * Usa el endpoint OpenAI-compatible: https://api.minimax.io/v1/chat/completions
 * Modelos: MiniMax-M3 (frontera, 1M contexto) · MiniMax-M2.7.
 * Sin key configurada el estudio funciona igual (solo se desactiva el brief IA).
 */

const BASE_URL = 'https://api.minimax.io/v1';

export function getMiniMaxKey(): string {
  return import.meta.env.VITE_MINIMAX_API_KEY?.trim() ?? '';
}

export function isMiniMaxConfigured(): boolean {
  return getMiniMaxKey().length > 0;
}

/** Enlace a la app MiniMax Design (plataforma de agentes de contenido). */
export const MINIMAX_DESIGN_URL = 'https://design.minimax.io/';

export interface IconSpec {
  glyph: string;
  paletteName: string;
  hex: string;
  haloGlow: number;
  puffBlur: number;
  education: boolean;
}

export async function generateIconBrief(spec: IconSpec, signal?: AbortSignal): Promise<string> {
  const key = getMiniMaxKey();
  if (!key) {
    throw new Error('Falta VITE_MINIMAX_API_KEY en tu .env');
  }

  const prompt = [
    'Eres director de arte HBO noir. Devuelve en español un brief de 6 líneas máximo para este icono procedural:',
    `Glifo: ${spec.glyph}`,
    `Paleta: ${spec.paletteName} (${spec.hex})`,
    `Halo: ${spec.haloGlow}px · Puff: ${spec.puffBlur}% · Insignia educación: ${spec.education ? 'sí' : 'no'}`,
    'Formato: CONCEPTO / LUZ / BORDE / SOMBRA / ACCESIBILIDAD / EXPORT. Sin introducciones.',
  ].join('\n');

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    signal,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'MiniMax-M3',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`MiniMax ${res.status}: ${text.slice(0, 160) || res.statusText}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error('MiniMax devolvió una respuesta vacía');
  return content;
}
