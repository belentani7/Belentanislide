/**
 * Tipos compartidos de la experiencia BELENTANI Neural Icons.
 *
 * POR QUE EXISTE ESTE ARCHIVO: la app se sirve como codigo fuente en el
 * repositorio, y las interfaces describen la forma exacta que consumen
 * App.tsx y los componentes. Sin el, Vite no puede resolver las rutas
 * relativas y la compilacion falla.
 *
 * Las formas de aqui NO son inventadas: cada campo se deduce del uso real
 * de los componentes (repo.stats.stars, repo.iconConfig.accentColor, etc.).
 */

/** Categoria tematica de un repositorio dentro del catalogo. */
export type RepositoryCategory =
  | 'education'
  | 'art'
  | 'tooling'
  | 'audio'
  | 'web'
  | 'archive';

/** Lenguaje principal declarado por GitHub. */
export type PrimaryLanguage =
  | 'TypeScript'
  | 'JavaScript'
  | 'Python'
  | 'Java'
  | 'HTML'
  | 'CSS'
  | 'Shell'
  | 'GLSL'
  | (string & {});

/** Etiqueta tematica asociada a un repositorio. */
export interface Tag {
  id: string;
  label: string;
  category?: RepositoryCategory;
}

/** Metricas publicas del repositorio, tal como las expone la API de GitHub. */
export interface RepositoryStats {
  stars: number;
  forks: number;
  /** Numero de modulos o piezas publicadas dentro del repositorio. */
  modules?: number;
  /** Metricas adicionales de presentacion (clave -> valor). */
  metrics?: Record<string, number | string>;
}

/** Descripcion visual del icono generado para el repositorio. */
export interface IconConfig {
  /** Tipo de glifo base que dibuja el estudio de iconos. */
  glyphType: string;
  /** Texto humano que explica que representa el simbolo. */
  symbolDescription: string;
  accentColor: string;
  haloColor: string;
  puffGlow: number;
  /** Rasgos visuales activados para este icono. */
  features?: string[];
}

/**
 * Descripcion fisica de la "luz liquida" asociada al repositorio.
 * Los campos imitan propiedades opticas reales (indice de refraccion)
 * porque el fondo se renderiza con un canvas que las usa como uniformes.
 */
export interface LiquidLight {
  colorName: string;
  /** Color en notacion hex, usado directamente por el canvas. */
  hex: string;
  milkyGlow: number;
  refractiveIndex: number;
  /** Referencia o nota divulgativa que acompana al efecto. */
  scientificArticle?: string;
}

/** Un repositorio tal como lo presenta la experiencia. */
export interface Repository {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  githubUrl: string;
  liveUrl?: string;
  primaryLanguage: PrimaryLanguage;
  languageColor: string;
  category: RepositoryCategory;
  tags: Tag[];
  stats: RepositoryStats;
  iconConfig: IconConfig;
  liquidLight: LiquidLight;
  /** Una sola palabra que resume el proyecto; se usa en las pantallas minimalistas. */
  singleWord: string;
  /** Marca los repositorios de contenido educativo (ManosAbiertas, Open School...). */
  isEducation: boolean;
  /** Orden explicito de aparicion; menor va antes. */
  priorityOrder: number;
}

/**
 * Modos de iluminacion. Los valores literales salen de los useState de App.tsx
 * y de las comparaciones lightingMode === '...' repartidas por los componentes.
 */
export type LightingMode =
  | 'ultra-noir-3'
  | 'noir-6'
  | 'noir-12'
  | 'plasma-full';

/** Vistas principales de la aplicacion. */
export type AppViewVersion =
  | 'cascade-3d'
  | 'smartwatch'
  | 'netflix'
  | 'zero-text';

/** Modo de cascada de Apple (haptics + transiciones). */
export type AppleCascadeMode = 'off' | 'subtle' | 'cinematic';
