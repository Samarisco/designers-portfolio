// ============================================================
// SANITY TYPES
// ============================================================
export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  alt?: string
}

export interface SanityFile {
  _type: 'file'
  asset: { _ref: string; _type: 'reference'; url?: string }
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

// ============================================================
// PROJECT TYPES
// ============================================================
export type ProjectStatus = 'concept' | 'prototype' | 'production' | 'awarded'
export type ProjectCategory =
  | 'furniture'
  | 'electronics'
  | 'automotive'
  | 'packaging'
  | 'medical'
  | 'consumer'
  | 'spatial'
  | 'experimental'

export interface ProjectMaterial {
  name: string
  description?: string
  color?: string
}

export interface ProjectTechnology {
  name: string
  category: 'software' | 'process' | 'material' | 'manufacturing'
}

export interface ProjectTimelineEvent {
  date: string
  title: string
  description?: string
  milestone: boolean
}

export interface Project {
  _id: string
  _createdAt: string
  title: string
  slug: SanitySlug
  tagline: string
  description: string
  category: ProjectCategory
  status: ProjectStatus
  year: number
  client?: string
  role: string
  coverImage: SanityImage
  images: SanityImage[]
  model3d?: SanityFile
  hdriEnvironment?: string
  materials: ProjectMaterial[]
  technologies: ProjectTechnology[]
  timeline: ProjectTimelineEvent[]
  dimensions?: { width: number; height: number; depth: number; unit: string }
  weight?: string
  awards?: string[]
  featured: boolean
  tags: string[]
  seo?: {
    title?: string
    description?: string
    ogImage?: SanityImage
  }
}

// ============================================================
// ABOUT TYPES
// ============================================================
export interface AboutPage {
  _id: string
  name: string
  tagline: string
  bio: string
  portrait: SanityImage
  skills: { category: string; items: string[] }[]
  experience: { role: string; company: string; period: string; description: string }[]
  education: { degree: string; institution: string; year: number }[]
  awards: { title: string; organization: string; year: number }[]
  clients: { name: string; logo?: SanityImage }[]
  resumeFile?: SanityFile
}

// ============================================================
// UI / COMPONENT TYPES
// ============================================================
export interface NavItem {
  label: string
  href: string
  index?: string
}

export interface ThreeSceneProps {
  modelUrl?: string
  hdriUrl?: string
  autoRotate?: boolean
  enableZoom?: boolean
  enablePan?: boolean
  className?: string
}

export interface AnimationVariants {
  hidden: Record<string, unknown>
  visible: Record<string, unknown>
  exit?: Record<string, unknown>
}

export type ColorScheme = 'dark' | 'light'

export interface PageMeta {
  title: string
  description: string
  ogImage?: string
  canonical?: string
}

// ============================================================
// STORE TYPES
// ============================================================
export interface AppState {
  isLoading: boolean
  setIsLoading: (v: boolean) => void
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
  currentProject: Project | null
  setCurrentProject: (p: Project | null) => void
  reducedMotion: boolean
}

// ============================================================
// THREE.JS EXTENDED TYPES
// ============================================================
export interface ModelViewerProps {
  url: string
  environment?: string
  autoRotate?: boolean
  enableOrbit?: boolean
  enableBloom?: boolean
  wireframe?: boolean
  className?: string
  onLoad?: () => void
}
