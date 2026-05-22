// ============================================================
// DESIGN TOKENS
// ============================================================
export const tokens = {
  colors: {
    void: '#000000',
    obsidian: '#080808',
    graphite: '#0d0d0d',
    carbon: '#111111',
    ash: '#1a1a1a',
    smoke: '#222222',
    chrome: '#e8e8e8',
    titanium: '#c0c0c0',
    platinum: '#f0f0f0',
    pulse: '#ff4500',
    neon: '#39ff14',
    ice: '#a8d8f0',
    white: '#ffffff',
    border: 'rgba(255,255,255,0.06)',
    'border-raised': 'rgba(255,255,255,0.12)',
  },

  easing: {
    expoOut: [0.19, 1, 0.22, 1] as const,
    expoIn: [0.95, 0.05, 0.795, 0.035] as const,
    circOut: [0, 0.55, 0.45, 1] as const,
    spring: { type: 'spring', stiffness: 200, damping: 30 },
    springBouncy: { type: 'spring', stiffness: 400, damping: 25 },
  },

  duration: {
    instant: 0.1,
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
    cinematic: 1.2,
    epic: 2.0,
  },

  blur: {
    none: 0,
    sm: 8,
    md: 20,
    lg: 40,
    xl: 80,
  },
} as const

// ============================================================
// FRAMER MOTION VARIANTS
// ============================================================
export const motionVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] } },
  },
  clipReveal: {
    hidden: { clipPath: 'inset(0 100% 0 0)' },
    visible: {
      clipPath: 'inset(0 0% 0 0)',
      transition: { duration: 1, ease: [0.19, 1, 0.22, 1] },
    },
  },
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: [0.95, 0.05, 0.795, 0.035] } },
  },
} as const

// ============================================================
// NAVIGATION
// ============================================================
export const NAV_ITEMS = [
  { label: 'Proyectos', href: '/projects', index: '01' },
  { label: 'Sobre mí', href: '/about', index: '02' },
  { label: 'Contacto', href: '/contact', index: '03' },
] as const

// ============================================================
// THREE.JS CONFIG
// ============================================================
export const THREE_CONFIG = {
  camera: {
    fov: 45,
    near: 0.1,
    far: 1000,
    position: [0, 0, 5] as [number, number, number],
  },
  lights: {
    ambient: { intensity: 0.3 },
    directional: {
      position: [10, 10, 5] as [number, number, number],
      intensity: 1.2,
      castShadow: true,
    },
    point1: {
      position: [-5, 5, 5] as [number, number, number],
      intensity: 0.8,
      color: '#a8d8f0',
    },
    point2: {
      position: [5, -5, -5] as [number, number, number],
      intensity: 0.4,
      color: '#ff4500',
    },
  },
  bloom: {
    intensity: 0.3,
    luminanceThreshold: 0.8,
    luminanceSmoothing: 0.9,
  },
  dpr: [1, 2] as [number, number],
} as const

// ============================================================
// SANITY CONFIG
// ============================================================
export const SANITY_CONFIG = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
} as const

// ============================================================
// SITE CONFIG
// ============================================================
export const SITE_CONFIG = {
  name: 'Luis García',
  title: 'Diseñador Industrial & Artista 3D',
  description:
    'Diseñador industrial y artista 3D con una visión que cruza la cultura pop, los videojuegos y la manufactura física. Diseño que nace de la cultura.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://luisgarcia.design',
  phone: '55-7682-9802',
  email: 'contacto@luisgarcia.design',
  social: {
    instagram: 'https://instagram.com/luisgarcia.design',
    behance: 'https://behance.net/luisgarcia',
    linkedin: 'https://linkedin.com/in/luisgarcia',
  },
} as const
