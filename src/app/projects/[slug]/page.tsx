import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProjectDetailClient } from './ProjectDetailClient'
import { DEMO_PROJECTS } from '@/lib/demo-data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = DEMO_PROJECTS.find((p) => p.slug?.current === slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: project.title,
    description: project.tagline,
    openGraph: { title: project.title, description: project.tagline },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params

  // Fetch from Sanity when connected:
  // const project = await sanityClient.fetch<Project>(queries.projectBySlug, { slug })

  const project = DEMO_PROJECTS.find((p) => p.slug?.current === slug)
  if (!project) notFound()

  return <ProjectDetailClient project={project} />
}

export async function generateStaticParams() {
  return DEMO_PROJECTS.map((p) => ({ slug: p.slug?.current ?? '' }))
}
