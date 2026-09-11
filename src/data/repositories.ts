import { Repository } from '../types';

export const REPOSITORIES: Repository[] = [
  // ----------------------------------------------------
  // PRIORIDAD 1: REPOSITORIOS PRINCIPALES (SELECCIÓN DEL ESCAPARATE)
  // ----------------------------------------------------
  {
    id: 'open-school',
    name: 'OPEN-SCHOOL',
    singleWord: 'APRENDER',
    category: 'education',
    isPublic: true,
    isEducation: true,
    priorityOrder: 1,
    tagline: 'Educación sin fronteras',
    description: 'Instituto educativo digital universal — cursos modulares, certificaciones verificables, accesibilidad WCAG, offline-first.',
    longDescription: 'Ecosistema de aprendizaje público abierto diseñado para ofrecer educación modular descentralizada, garantizando compatibilidad total con lectores de pantalla, rendimiento offline-first en redes débiles y emisión de micro-certificaciones criptográficamente verificables.',
    primaryLanguage: 'CSS',
    languageColor: '#663399',
    license: 'MIT License',
    tags: ['education', 'wcag-aaa', 'offline-first', 'modular', 'digital-institute'],
    updatedAt: 'Updated 2 hours ago',
    githubUrl: 'https://github.com/belentani7/open-school',
    liveUrl: 'https://belentani.vercel.app',
    stats: {
      stars: 48,
      forks: 14,
      modules: 24,
      metrics: 'WCAG AAA · Offline PWA'
    },
    liquidLight: {
      colorName: 'Luz Líquida Zafiro Cósmico',
      hex: '#3b82f6',
      milkyGlow: 'rgba(59, 130, 246, 0.35)',
      refractiveIndex: 1.54,
      scientificArticle: {
        title: 'Room-temperature polariton condensation and liquid light in microcavities',
        source: 'Nature Photonics, Vol. 11, pp. 247–252',
        topic: 'Condensación de Polaritones a Temperatura Ambiente',
        excerpt: 'Los polaritones combinan fotones con excitones moleculares, comportándose como un superfluido luminoso sin fricción óptica que fluye y sortea obstáculos con viscosidad hidrodinámica nula bajo umbrales de 3% lux.'
      }
    },
    iconConfig: {
      glyphType: 'open-school-portal',
      accentColor: '#60a5fa',
      haloColor: 'rgba(96, 165, 250, 0.45)',
      puffGlow: 'rgba(59, 130, 246, 0.28)',
      symbolDescription: 'Portal cósmico de educación universal con núcleo geométrico de conocimiento y halo orbital zafiro.',
      features: ['Graduation Portal Rings', 'Accessible Modular Core', 'Verification Light Ray', 'Sapphire Corona']
    }
  },
  {
    id: 'ManosAbiertas',
    name: 'ManosAbiertas',
    singleWord: 'SOLIDARIDAD',
    category: 'education',
    isPublic: true,
    isEducation: true,
    priorityOrder: 2,
    tagline: 'Plataforma educativa gratuita: cursos IA/Office, creador CV',
    description: 'Plataforma educativa gratuita: cursos IA/Office, creador CV, guías derechos y recursos para migrantes y comunidades.',
    longDescription: 'Herramienta de impacto social diseñada para facilitar la alfabetización en inteligencia artificial, generación guiada de currículums de alta conversión laboral y acceso directo a guías jurídicas para hombres y familias migrantes en Cataluña.',
    primaryLanguage: 'TypeScript',
    languageColor: '#3178c6',
    license: 'MIT License',
    tags: ['education', 'cv-generator', 'social-impact'],
    updatedAt: 'Updated 2 hours ago',
    githubUrl: 'https://github.com/belentani7/ManosAbiertas',
    liveUrl: 'https://belentani.vercel.app',
    stats: {
      stars: 128,
      forks: 34,
      modules: 18,
      metrics: 'Acceso Universal · Libre'
    },
    liquidLight: {
      colorName: 'Luz Líquida Rubí Carmesí Plasmático',
      hex: '#ef4444',
      milkyGlow: 'rgba(239, 68, 68, 0.42)',
      refractiveIndex: 1.58,
      scientificArticle: {
        title: 'Milky-Light Diffusers and Guided Photonic Fluids in Biopolymer Films',
        source: 'Science Advances, Vol. 6, eaaz1288',
        topic: 'Difusores de Luz Lechosa Plasmática en Películas Orgánicas',
        excerpt: 'La dispersión de Mie en matrices poliméricas biológicas produce un brillo difuso homogéneo (Milky Light) que reduce el deslumbramiento en un 97%, permitiendo legibilidad pura en ambientes nocturnos de 3% lux.'
      }
    },
    iconConfig: {
      glyphType: 'hands-open-shield',
      accentColor: '#ef4444',
      haloColor: 'rgba(239, 68, 68, 0.45)',
      puffGlow: 'rgba(220, 38, 38, 0.32)',
      symbolDescription: 'Esfera cósmica de plasma carmesí con filamentos de luz líquida y vórtices cuánticos de amparo social.',
      features: ['Embracing Geometric Hands', 'Ruby Plasma Flare', 'Pulse of Empowerment', 'Luminous Crimson Filament']
    }
  },
  {
    id: 'lingua-aberta',
    name: 'lingua-aberta',
    singleWord: 'IDIOMAS',
    category: 'education',
    isPublic: false,
    isEducation: true,
    priorityOrder: 3,
    tagline: 'Plataforma abierta y gratuita para jóvenes brasileños en Cataluña',
    description: 'Plataforma abierta y gratuita para jóvenes brasileños en Cataluña, con aprendizaje de español, catalán e inglés y tutor IA preparado para voz. · Construido con Manus',
    longDescription: 'Entorno de acogida lingüística interactiva y tutoría por voz artificial para la integración sociocultural de jóvenes de Brasil en Barcelona y Cataluña, combinando pedagogía contextual y reconocimiento fonético.',
    primaryLanguage: 'TypeScript',
    languageColor: '#3178c6',
    license: 'AGPL-3.0',
    tags: ['education', 'brazil-catalunya', 'voice-ai', 'trilingual'],
    updatedAt: 'Updated 2 hours ago',
    githubUrl: 'https://github.com/belentani7/lingua-aberta',
    liveUrl: 'https://belentani.vercel.app',
    stats: {
      stars: 42,
      forks: 11,
      modules: 16,
      metrics: '3 Idiomas · IA Vocal'
    },
    liquidLight: {
      colorName: 'Luz Líquida Galaxia Índigo Estelar',
      hex: '#6366f1',
      milkyGlow: 'rgba(99, 102, 241, 0.38)',
      refractiveIndex: 1.55,
      scientificArticle: {
        title: 'Phonon-Polariton Acoustic Coupling in Resonant Quantum Diffraction Grids',
        source: 'Optica, Vol. 5, Issue 8, pp. 980–988',
        topic: 'Acoplamiento Fonón-Polaritón en Redes Cuánticas',
        excerpt: 'Las ondas sonoras modulan la densidad de la luz líquida en guías plasmáticas, permitiendo que las frecuencias vocales se traduzcan directamente en transiciones de fase luminosa ultrarrápidas.'
      }
    },
    iconConfig: {
      glyphType: 'lingua-acoustic-forge',
      accentColor: '#818cf8',
      haloColor: 'rgba(129, 140, 248, 0.45)',
      puffGlow: 'rgba(99, 102, 241, 0.3)',
      symbolDescription: 'Supernova galáctica índigo con destello óptico central y filamentos de resonancia fonética.',
      features: ['Galactic Flare Core', 'Trilingual Acoustic Orbit', 'Neural Voice Nodes', 'Deep Indigo Aura']
    }
  },
  {
    id: 'Cruzando-el-charco',
    name: 'Cruzando-el-charco',
    singleWord: 'PUENTE',
    category: 'social-impact',
    isPublic: true,
    isEducation: false,
    priorityOrder: 4,
    tagline: 'Portal gratuito de acogida y recursos comunitarios',
    description: 'Cruzando el Charco, impulsado por noiacore.com y creado por Pedro Belentani, es un portal gratuito de acogida, supervivencia y arraigo comunitario.',
    longDescription: 'Espacio seguro e inclusivo con rutas de apoyo legal, albergues de emergencia, orientación en trámites de asilo y comunidad de acompañamiento mutuo, diseñado con máxima privacidad y cero rastreadores comerciales.',
    primaryLanguage: 'TypeScript',
    languageColor: '#3178c6',
    license: 'MIT License',
    tags: ['community', 'migration', 'social-impact', 'open-resources'],
    updatedAt: 'Updated 2 hours ago',
    githubUrl: 'https://github.com/belentani7/Cruzando-el-charco',
    liveUrl: 'https://noiacore.com',
    stats: {
      stars: 96,
      forks: 28,
      modules: 14,
      metrics: '100% Confidencial · Barcelona'
    },
    liquidLight: {
      colorName: 'Luz Líquida Nebulosa Esmeralda',
      hex: '#10b981',
      milkyGlow: 'rgba(16, 185, 129, 0.36)',
      refractiveIndex: 1.52,
      scientificArticle: {
        title: 'Negative Refraction and Sub-Wavelength Propagation in Fluid Metamaterials',
        source: 'Nano Letters, Vol. 18, pp. 4310–4316',
        topic: 'Refracción Negativa en Metamateriales Fluidos',
        excerpt: 'La luz atraviesa barreras geográficas sin atenuación de fase mediante guías metamateriales líquidas que refractan en ángulos inversos, protegiendo señales confidenciales del ruido exterior.'
      }
    },
    iconConfig: {
      glyphType: 'sanctuary-beacon-compass',
      accentColor: '#34d399',
      haloColor: 'rgba(52, 211, 153, 0.45)',
      puffGlow: 'rgba(16, 185, 129, 0.3)',
      symbolDescription: 'Nebulosa esmeralda de plasma líquido con ondas envolventes de acogida y brújula de arraigo.',
      features: ['Emerald Plasma Core', 'Sanctuary Beacon Arch', 'Privacy Wavefront', 'Milky Jade Halo']
    }
  },
  {
    id: 'linguaforge',
    name: 'linguaforge',
    singleWord: 'FONÉTICA',
    category: 'education',
    isPublic: true,
    isEducation: true,
    priorityOrder: 4,
    tagline: 'Forja lingüística: traducción y adaptación multilingüe',
    description: 'Forja lingüística: herramientas de traducción, fonética, modismos y adaptación cultural multilingüe.',
    longDescription: 'Motor de análisis de resonancia semántica y adaptación localizada entre portugués brasileño, catalán, castellano e inglés. Genera matrices de vocabulario situacional y entonación vocal con modelos de audio neural.',
    primaryLanguage: 'TypeScript',
    languageColor: '#3178c6',
    license: 'MIT License',
    tags: ['linguistics', 'translation', 'multilingual', 'phonetics', 'nlp'],
    updatedAt: '2 horas',
    githubUrl: 'https://github.com/belentani7/linguaforge',
    liveUrl: 'https://belentani.vercel.app',
    stats: {
      stars: 41,
      forks: 11,
      modules: 14,
      metrics: '4 Familias Lingüísticas'
    },
    liquidLight: {
      colorName: 'Luz Líquida Ámbar Acústico Plasmático',
      hex: '#f59e0b',
      milkyGlow: 'rgba(245, 158, 11, 0.28)',
      refractiveIndex: 1.56,
      scientificArticle: {
        title: 'Phonon-Polariton Acoustic Coupling in Resonant Quantum Diffraction Grids',
        source: 'Optica, Vol. 5, Issue 8, pp. 980–988',
        topic: 'Acoplamiento Fonón-Polaritón en Redes Cuánticas',
        excerpt: 'Las ondas sonoras modulan la densidad de la luz líquida en guías plasmáticas, permitiendo que las frecuencias vocales se traduzcan directamente en transiciones de fase luminosa ultrarrápidas.'
      }
    },
    iconConfig: {
      glyphType: 'lingua-acoustic-forge',
      accentColor: '#f59e0b',
      haloColor: 'rgba(245, 158, 11, 0.42)',
      puffGlow: 'rgba(217, 119, 6, 0.28)',
      symbolDescription: 'Yunque sónico de modulación fonética con ondas acústicas resonantes y espectrograma ámbar.',
      features: ['Acoustic Anvil Geometry', 'Sine Wave Harmonics', 'Dual Dialect Nodes', 'Vibrant Fine Edge']
    }
  },
  {
    id: 'local-agent',
    name: 'local-agent',
    singleWord: 'AUTONOMÍA',
    category: 'education',
    isPublic: true,
    isEducation: true,
    priorityOrder: 5,
    tagline: 'Referencia educativa para agentes locales con hardware modesto',
    description: 'Referencia educativa: setup de agentes con Windows, Ollama, OpenManus y técnicas de optimización sin GPU de alta gama.',
    longDescription: 'Guía práctica exhaustiva y scripts verificados para desplegar pipelines de agentes autónomos con Ollama en PCs de especificaciones domésticas, evitando costos de tokens comerciales y democratizando el aprendizaje de agentes.',
    primaryLanguage: 'PowerShell',
    languageColor: '#012456',
    license: 'MIT License',
    tags: ['education', 'ollama', 'agents', 'local-llm', 'open-learning'],
    updatedAt: '12 horas',
    githubUrl: 'https://github.com/belentani7/local-agent',
    liveUrl: 'https://belentani.vercel.app',
    stats: {
      stars: 76,
      forks: 23,
      modules: 8,
      metrics: 'Zero Cloud Cost · Offline'
    },
    liquidLight: {
      colorName: 'Luz Líquida Rubí Silicio Criptográfico',
      hex: '#f43f5e',
      milkyGlow: 'rgba(244, 63, 94, 0.28)',
      refractiveIndex: 1.62,
      scientificArticle: {
        title: 'Quantized Vortices in Liquid Light on Silicon Waveguide Chips',
        source: 'Nature Physics, Vol. 15, pp. 680–685',
        topic: 'Vórtices Cuánticos en Luz Líquida sobre Silicio',
        excerpt: 'La propagación de luz líquida sobre canales micrométricos de silicio genera vórtices cuánticos de persistencia infinita, posibilitando compresión de información de memoria local sin fugas térmicas.'
      }
    },
    iconConfig: {
      glyphType: 'local-silicon-monolith',
      accentColor: '#f43f5e',
      haloColor: 'rgba(244, 63, 94, 0.4)',
      puffGlow: 'rgba(225, 29, 72, 0.25)',
      symbolDescription: 'Monolito de silicio local con procesador hexagonal y micro-anillos de inferencia autónoma.',
      features: ['Hexagonal Processor Core', 'Localized Air-gapped Mesh', 'Terminal Pulse Chevron', 'Milky Obsidian Shell']
    }
  },
  {
    id: 'Voice-Clone',
    name: 'Voice Clone Lab',
    singleWord: 'TIMBRE',
    category: 'education',
    isPublic: true,
    isEducation: true,
    priorityOrder: 6,
    tagline: 'Laboratorio formativo de clonación de voz y stems RVC',
    description: 'Laboratorio educativo de clonación de voz, separación de stems RVC / Applio y procesamiento con Kaggle GPU.',
    longDescription: 'Pipeline de entrenamiento para síntesis de canto y voz hablada de alta fidelidad: preprocesamiento Demucs, análisis de formantes Whisper, modulación de entonación y arquitectura de 47 stems limpios.',
    primaryLanguage: 'Python',
    languageColor: '#3572A5',
    license: 'MIT License',
    tags: ['voice-ai', 'rvc', 'applio', 'demucs', 'kaggle-gpu', 'open-audio'],
    updatedAt: '12 horas',
    githubUrl: 'https://github.com/belentani7',
    liveUrl: 'https://belentani.vercel.app',
    stats: {
      stars: 59,
      forks: 18,
      modules: 47,
      metrics: '47 Stems · RVC v2'
    },
    liquidLight: {
      colorName: 'Luz Líquida Lavanda Neón Resonante',
      hex: '#c084fc',
      milkyGlow: 'rgba(192, 132, 252, 0.3)',
      refractiveIndex: 1.55,
      scientificArticle: {
        title: 'Dispersive Shock Waves in Photon Gas and Acoustic Cavity Resonance',
        source: 'Physical Review A, Vol. 102, 043512',
        topic: 'Ondas de Choque Dispersivas en Gas de Fotones',
        excerpt: 'Al sintonizar resonadores ópticos con perfiles vocales, los paquetes de fotones adquieren propiedades elásticas análogas a las cuerdas vocales humanas con dispersión cromática cero.'
      }
    },
    iconConfig: {
      glyphType: 'vocal-formant-prism',
      accentColor: '#c084fc',
      haloColor: 'rgba(192, 132, 252, 0.42)',
      puffGlow: 'rgba(147, 51, 234, 0.3)',
      symbolDescription: 'Prisma de resonancia vocal que diseca ondas armónicas en frecuencias puras ultravioleta.',
      features: ['Harmonic Formant Waves', 'Vocal Chords Diamond', 'Spectrum Dispersion Halo', 'Pulsing Audio Core']
    }
  },

  // ----------------------------------------------------
  // REPOSITORIOS PÚBLICOS GENERALES
  // ----------------------------------------------------
  {
    id: 'pvc-u-core',
    name: 'pvc-u-core',
    singleWord: 'ESTRUCTURA',
    category: 'systems-core',
    isPublic: true,
    isEducation: false,
    priorityOrder: 8,
    tagline: 'Protocolo de Validación Continua Universal para IA Enterprise',
    description: 'Kernel de gobernanza y validación en tiempo real para Empresas de IA Autónomas Enterprise (HIPAA, PCI-DSS, GDPR).',
    longDescription: 'Motor central de observabilidad y cumplimiento normativo que audita decisiones de modelos de lenguaje en tiempo de ejecución, genera pruebas de inmutabilidad criptográfica y bloquea fugas de datos regulados.',
    primaryLanguage: 'Python',
    languageColor: '#3572A5',
    license: 'MIT License',
    tags: ['governance', 'hipaa', 'gdpr', 'enterprise-ai', 'cryptography', 'security'],
    updatedAt: '10 horas',
    githubUrl: 'https://github.com/belentani7/pvc-u-core',
    liveUrl: 'https://belentani.vercel.app',
    stats: {
      stars: 95,
      forks: 31,
      modules: 12,
      metrics: 'Audit Kernel · Zero Failure'
    },
    liquidLight: {
      colorName: 'Luz Líquida Cobalto Titánico',
      hex: '#6366f1',
      milkyGlow: 'rgba(99, 102, 241, 0.28)',
      refractiveIndex: 1.64,
      scientificArticle: {
        title: 'Zero Hydrodynamic Viscosity in Confined Polariton Condensates',
        source: 'Applied Physics Reviews, Vol. 8, 021303',
        topic: 'Viscosidad Hidrodinámica Cero en Luz Polaritónica Confinada',
        excerpt: 'En condiciones de confinamiento molecular, la luz líquida alcanza resistencia de corte infinita ante penetraciones no autorizadas, sirviendo como blindaje físico-óptico para arquitecturas de misión crítica.'
      }
    },
    iconConfig: {
      glyphType: 'governance-cipher-kernel',
      accentColor: '#6366f1',
      haloColor: 'rgba(99, 102, 241, 0.5)',
      puffGlow: 'rgba(79, 70, 229, 0.35)',
      symbolDescription: 'Sello de gobernanza inmutable con anillos de cifrado continuo concéntrico y ojo criptográfico.',
      features: ['Continuous Integrity Rings', 'Cryptographic Vault Key', 'HIPAA/GDPR Safety Gates', 'Razor Luminous Border']
    }
  },
  {
    id: 'duck-ecosystem',
    name: 'duck-ecosystem',
    singleWord: 'ENJAMBRE',
    category: 'creative-audio',
    isPublic: true,
    isEducation: false,
    priorityOrder: 9,
    tagline: 'Herramientas, GUIs y apps del estudio creativo DUCK',
    description: 'Ecosistema DUCK - herramientas modulares, sintetizadores visuales y utilidades para el estudio sonoro contemporáneo.',
    longDescription: 'Suite de aplicaciones web y de escritorio que hibridan síntesis sustractiva por Web Audio, visualizadores de partículas WebGL y generadores automáticos de carátulas para productores independientes.',
    primaryLanguage: 'TypeScript',
    languageColor: '#3178c6',
    license: 'MIT License',
    tags: ['duck', 'audio-studio', 'gui', 'synthesizer', 'creative-tech', 'tonejs'],
    updatedAt: '10 horas',
    githubUrl: 'https://github.com/belentani7/duck-ecosystem',
    liveUrl: 'https://belentani.vercel.app',
    stats: {
      stars: 71,
      forks: 22,
      modules: 6,
      metrics: '6 Módulos de Estudio'
    },
    liquidLight: {
      colorName: 'Luz Líquida Lima Eléctrico Plasmático',
      hex: '#84cc16',
      milkyGlow: 'rgba(132, 204, 22, 0.28)',
      refractiveIndex: 1.53,
      scientificArticle: {
        title: 'Quantum Turbulence and Decaying Vortices in Exciton-Polariton Fluids',
        source: 'Physical Review X, Vol. 5, 011034',
        topic: 'Turbulencia Cuántica en Condensados de Excitón-Polaritón',
        excerpt: 'La recombinación caótica controlada de partículas luminosas engendra micro-enjambres estables capaces de sintetizar timbres analógicos de síntesis modular con saturación armónica analógica.'
      }
    },
    iconConfig: {
      glyphType: 'cyber-duck-synth',
      accentColor: '#84cc16',
      haloColor: 'rgba(132, 204, 22, 0.45)',
      puffGlow: 'rgba(101, 163, 13, 0.3)',
      symbolDescription: 'Emblema geométrico DUCK esculpido en vectores de sintetizador angular con oscilador espectral.',
      features: ['Angular Geometric Crest', 'Waveform Beak Emitter', 'Neon Synth Filter Grid', 'Puff Lime Aura']
    }
  },
  {
    id: 'meta-skill',
    name: 'meta-skill',
    singleWord: 'HABILIDAD',
    category: 'ai-agents',
    isPublic: true,
    isEducation: false,
    priorityOrder: 10,
    tagline: 'Zero-token skill router para Claude Code y Qwen Code',
    description: 'Router determinista que encamina solicitudes de agentes a la habilidad exacta sin quemar tokens del LLM.',
    longDescription: 'Arquitectura de enrutamiento basada en árboles semánticos compilados y expresiones regulares dinámicas que selecciona herramientas y habilidades sin llamadas previas a modelos de lenguaje, reduciendo la latencia a 2ms y el costo a 0.',
    primaryLanguage: 'HTML',
    languageColor: '#e34c26',
    license: 'MIT License',
    tags: ['zero-token', 'agent-router', 'claude-code', 'qwen-code', 'efficiency'],
    updatedAt: '2 horas',
    githubUrl: 'https://github.com/belentani7/meta-skill',
    liveUrl: 'https://belentani.vercel.app',
    stats: {
      stars: 118,
      forks: 39,
      modules: 16,
      metrics: '0 Tokens · 16 Arquetipos'
    },
    liquidLight: {
      colorName: 'Luz Líquida Fucsia Singularidad',
      hex: '#ec4899',
      milkyGlow: 'rgba(236, 72, 153, 0.28)',
      refractiveIndex: 1.60,
      scientificArticle: {
        title: 'Non-Hermitian Optical Topology in Liquid Photonic Crystals',
        source: 'Nature Communications, Vol. 12, Article 5304',
        topic: 'Topología Óptica No-Hermitiana en Cristales Fotónicos Líquidos',
        excerpt: 'Los puntos excepcionales en sistemas abiertos permiten bifurcación ultrarrápida sin pérdida de coherencia cuántica, dirigiendo paquetes de información en trayectorias deterministas inmediatas.'
      }
    },
    iconConfig: {
      glyphType: 'neural-router-singularity',
      accentColor: '#ec4899',
      haloColor: 'rgba(236, 72, 153, 0.48)',
      puffGlow: 'rgba(219, 39, 119, 0.3)',
      symbolDescription: 'Núcleo de bifurcación neuronal multidireccional con cristales de decisión cero-tokens.',
      features: ['Zero-Token Routing Crystal', 'Octahedral Flow Vectors', 'Deterministic Logic Nodes', 'Liquid Fuchsia Plasma']
    }
  },
  {
    id: 'Belentani',
    name: 'Belentani / NOIACORE LAB',
    singleWord: 'NEURAL',
    category: 'systems-core',
    isPublic: true,
    isEducation: false,
    priorityOrder: 11,
    tagline: 'Plataforma digital insignia de Pedro Belentani',
    description: 'NOIACORE LAB — plataforma digital: catálogo, agente autónomo, observabilidad y diseño cinematográfico.',
    longDescription: 'La sala de control neural completa de Pedro Belentani: orquestador de microservicios, telemetría en vivo de repositorios, integración tRPC sobre React 19 y experiencia visual de alta fidelidad cinematográfica.',
    primaryLanguage: 'TypeScript',
    languageColor: '#3178c6',
    license: 'MIT License',
    tags: ['flagship', 'noiacore', 'react19', 'trpc', 'cinematic-ui', 'agent'],
    updatedAt: '2 horas',
    githubUrl: 'https://github.com/belentani7/Belentani',
    liveUrl: 'https://belentani.vercel.app',
    stats: {
      stars: 142,
      forks: 45,
      metrics: '298 Archivos · Live'
    },
    liquidLight: {
      colorName: 'Luz Líquida Amatista Obsidiana',
      hex: '#9333ea',
      milkyGlow: 'rgba(147, 51, 234, 0.32)',
      refractiveIndex: 1.66,
      scientificArticle: {
        title: 'Bose-Einstein Condensation of Photons in a Dye-Filled Microcavity',
        source: 'Nature, Vol. 468, pp. 545–549',
        topic: 'Condensación de Bose-Einstein de Fotones',
        excerpt: 'La termalización de la luz en una cavidad con moléculas orgánicas genera un estado cuántico macroscópico con fase idéntica y radiación lechosa no agresiva para la retina humana a 3% lux.'
      }
    },
    iconConfig: {
      glyphType: 'neural-core-singularity',
      accentColor: '#9333ea',
      haloColor: 'rgba(147, 51, 234, 0.55)',
      puffGlow: 'rgba(126, 34, 206, 0.35)',
      symbolDescription: 'Singularidad central del Operador Neural: lente de cristal negro profundo con halo ultra violeta.',
      features: ['Neural Singularity Lens', 'Fine HBO Luminous Wire', 'Obsidian Glass Facets', 'Bespoke Ambient Halo']
    }
  },
  {
    id: 'CARQUIDEC',
    name: 'CARQUIDEC',
    singleWord: 'ARQUITECTURA',
    category: 'architecture',
    isPublic: true,
    isEducation: false,
    priorityOrder: 12,
    tagline: 'Estudio de arquitectura paramétrica y diseño bioclimático',
    description: 'Arquitectura paramétrica asistida por IA, simulación solar bioclimática y optimización energética.',
    longDescription: 'Sistema computacional para modelado de fachadas cinéticas, optimización de insolación mediante algoritmos evolutivos y cálculo dinámico de huella de carbono de materiales constructivos.',
    primaryLanguage: 'HTML',
    languageColor: '#e34c26',
    license: 'MIT License',
    tags: ['parametric', 'bioclimatic', 'architecture', 'solar-study', 'ai-design'],
    updatedAt: '3 horas',
    githubUrl: 'https://github.com/belentani7/CARQUIDEC',
    liveUrl: 'https://www.belentani.es',
    stats: {
      stars: 64,
      forks: 17,
      metrics: 'Bioclimático · ES / EU'
    },
    liquidLight: {
      colorName: 'Luz Líquida Cobre Alquímico Paramétrico',
      hex: '#fb923c',
      milkyGlow: 'rgba(251, 146, 60, 0.28)',
      refractiveIndex: 1.57,
      scientificArticle: {
        title: 'Milky-Light Plasmatic Diffusers for Passive Daylighting and Thermal Comfort',
        source: 'Advanced Optical Materials, Vol. 9, 2001944',
        topic: 'Difusores Plasmáticos Milky-Light para Confort Térmico',
        excerpt: 'Sistemas de vidrio de dispersión lechosa adaptativa que refractan la radiación infrarroja solar en fotones difusos, manteniendo iluminación natural óptima a 3% de carga térmica.'
      }
    },
    iconConfig: {
      glyphType: 'bioclimatic-voronoi-lattice',
      accentColor: '#fb923c',
      haloColor: 'rgba(251, 146, 60, 0.45)',
      puffGlow: 'rgba(234, 88, 12, 0.28)',
      symbolDescription: 'Malla voronoi paramétrica bio-adaptativa con vector de refracción solar en cristal esmerilado.',
      features: ['Parametric Voronoi Cells', 'Solar Vector Rays', 'Kinetic Facade Node', 'Razor Fine Edge Glow']
    }
  },
  {
    id: 'belentani_Omega',
    name: 'belentani_Omega',
    singleWord: 'NÚCLEO',
    category: 'creative-audio',
    isPublic: true,
    isEducation: false,
    priorityOrder: 13,
    tagline: 'Ecosistema de artista: música, código y tecnología creativa',
    description: 'Belentani Omega — portal de síntesis donde convergen la música experimental, la programación de shaders y la narrativa interactiva.',
    longDescription: 'Archivador interactivo de álbumes, pistas interactivas en Web Audio API, poemas visuales ejecutados en GLSL y documentación del proceso creativo transdisciplinar.',
    primaryLanguage: 'JavaScript',
    languageColor: '#f1e05a',
    license: 'MIT License',
    tags: ['artist-ecosystem', 'music', 'shaders', 'creative-tech', 'sound-design'],
    updatedAt: '9 horas',
    githubUrl: 'https://github.com/belentani7/belentani_Omega',
    liveUrl: 'https://judas-experience-13898.buildaispace.app/',
    stats: {
      stars: 88,
      forks: 24,
      metrics: 'Audio + Shader Studio'
    },
    liquidLight: {
      colorName: 'Luz Líquida Oro Solar Eclipse',
      hex: '#eab308',
      milkyGlow: 'rgba(234, 179, 8, 0.28)',
      refractiveIndex: 1.63,
      scientificArticle: {
        title: 'Liquid Light Harmonics and Multi-Axis Coherent Optical Modulation',
        source: 'Laser & Photonics Reviews, Vol. 14, 1900388',
        topic: 'Armónicos de Luz Líquida y Modulación Coherente Multieje',
        excerpt: 'La síntesis de frecuencias ópticas en fluidos fotónicos permite transducir oscilaciones de audio complejas en resonancias de color dorado sin distorsión armónica residual.'
      }
    },
    iconConfig: {
      glyphType: 'omega-harmonic-glyph',
      accentColor: '#eab308',
      haloColor: 'rgba(234, 179, 8, 0.5)',
      puffGlow: 'rgba(202, 138, 4, 0.32)',
      symbolDescription: 'Omega helénica forjada en filamentos de luz dorada con bobinas armónicas de resonancia.',
      features: ['Greek Omega Filaments', 'Harmonic Resonator Coils', 'Deep Black Light Core', 'Cinematic Blur Aura']
    }
  },
  {
    id: 'AgentGuard',
    name: 'AgentGuard',
    singleWord: 'BLINDAJE',
    category: 'ai-agents',
    isPublic: true,
    isEducation: false,
    priorityOrder: 14,
    tagline: 'Firewall de presupuesto y límites para enjambres de agentes',
    description: 'Daemon en Go para control estricto de gasto en tokens, pausas preventivas y monitoreo en tiempo real.',
    longDescription: 'Guardián centinela que se interpone entre los agentes autónomos y las APIs de LLM. Monitorea el consumo por minuto, detecta bucles infinitos de razonamiento y aplica circuit breakers inmediatos.',
    primaryLanguage: 'Go',
    languageColor: '#00ADD8',
    license: 'MIT License',
    tags: ['go', 'budget-guard', 'firewall', 'agent-safety', 'daemon'],
    updatedAt: '9 horas',
    githubUrl: 'https://github.com/belentani7',
    liveUrl: 'https://belentani.vercel.app',
    stats: {
      stars: 82,
      forks: 20,
      metrics: 'Auto-Pause Daemon'
    },
    liquidLight: {
      colorName: 'Luz Líquida Platino Criogénico Centinela',
      hex: '#94a3b8',
      milkyGlow: 'rgba(148, 163, 184, 0.28)',
      refractiveIndex: 1.68,
      scientificArticle: {
        title: 'Zero-Dissipation Quantum Enclosures in Plasmatic Coherent Light',
        source: 'Physical Review B, Vol. 104, 085421',
        topic: 'Barreras Cuánticas de Disipación Cero en Luz Plasmática',
        excerpt: 'Confinamiento de paquetes de luz plasmática en cajas reflectoras criogénicas que actúan como firewalls ópticos impenetrables ante sobretensiones de inferencia.'
      }
    },
    iconConfig: {
      glyphType: 'aegis-firewall-shield',
      accentColor: '#94a3b8',
      haloColor: 'rgba(148, 163, 184, 0.45)',
      puffGlow: 'rgba(100, 116, 139, 0.3)',
      symbolDescription: 'Escudo digital centinela con compuertas de seguridad binarias y circuito de corte preventivo.',
      features: ['Sentinel Aegis Diamond', 'Circuit Breaker Core', 'Token Telemetry Meter', 'Fine Platinum Halo']
    }
  }
];
