export type RepoCategory = 
  | 'education' 
  | 'ai-agents' 
  | 'systems-core' 
  | 'creative-audio' 
  | 'social-impact' 
  | 'architecture';

export type LightingMode = 'ultra-noir-3' | 'hbo-noir' | 'liquid-bloom';
export type PulseRate = 'slow-hypnotic' | 'organic-breath' | 'still';
export type AppViewVersion = 'cascade-3d' | 'smartwatch-cascade' | 'zero-text' | 'netflix-cinema';
export type DeviceExperience = 'smartwatch' | 'mobile' | 'desktop' | 'tv';

export type RuleCategory =
  | 'COMPOSITION'
  | 'TYPOGRAPHY'
  | 'COLOR'
  | 'LIGHT'
  | 'MATERIAL'
  | 'GLASS'
  | 'MOTION'
  | 'DEPTH'
  | 'SPACING'
  | 'RESPONSIVE'
  | 'ACCESSIBILITY'
  | 'PERFORMANCE'
  | 'ESCAPARATISMO'
  | 'ICONOGRAPHY'
  | 'INTERACTION'
  | 'NAVIGATION'
  | 'CONTENT'
  | 'DATA'
  | 'ENGINEERING'
  | 'QUALITY';

export type RulePriorityLevel = 'PRIORITY_0' | 'PRIORITY_1' | 'PRIORITY_2' | 'PRIORITY_3' | 'PRIORITY_4' | 'PRIORITY_5' | 'PRIORITY_6' | 'PRIORITY_7';
export type RuleSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface DesignEngineRule {
  id: string;
  category: RuleCategory;
  priority: RulePriorityLevel;
  condition: string;
  action: string;
  rationale: string;
  validation: string;
  severity: RuleSeverity;
  status: 'VERIFIED' | 'COMPLIANT' | 'ACTIVE';
}

export interface LiquidLightSpec {
  colorName: string;
  hex: string;
  milkyGlow: string;
  refractiveIndex: number;
  scientificArticle: {
    title: string;
    source: string;
    topic: string;
    excerpt: string;
  };
}

export interface Repository {
  id: string;
  name: string;
  singleWord: string; // The 0-Text single powerful word per project
  category: RepoCategory;
  isPublic: boolean;
  isEducation: boolean;
  priorityOrder: number;
  tagline: string;
  description: string;
  longDescription: string;
  primaryLanguage: string;
  languageColor: string;
  liquidLight: LiquidLightSpec;
  license?: string;
  tags: string[];
  updatedAt: string;
  githubUrl: string;
  liveUrl?: string;
  stats: {
    stars: number;
    forks: number;
    modules?: number;
    metrics?: string;
  };
  iconConfig: {
    glyphType: string;
    accentColor: string;
    haloColor: string;
    puffGlow: string;
    symbolDescription: string;
    features: string[];
  };
}

export interface IconPreset {
  id: string;
  name: string;
  haloIntensity: number;
  puffBlur: number;
  glassReflectivity: number;
  chromaticDispersion: boolean;
}
