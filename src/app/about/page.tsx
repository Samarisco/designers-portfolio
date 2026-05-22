import type { Metadata } from 'next'
import { AboutPageClient } from './AboutClient'

export const metadata: Metadata = {
  title: 'Sobre mí',
  description: 'Diseñador industrial y artista 3D mexicano. Diseño con narrativa cultural.',
}

export default function AboutPage() {
  return <AboutPageClient />
}
