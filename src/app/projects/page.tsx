import type { Metadata } from 'next'
import { ProjectsClientPage } from './ProjectsClient'

export const metadata: Metadata = {
  title: 'Proyectos',
  description: 'Proyectos seleccionados de diseño industrial, modelado 3D y art toys.',
}

export default function ProjectsPage() {
  return <ProjectsClientPage />
}
