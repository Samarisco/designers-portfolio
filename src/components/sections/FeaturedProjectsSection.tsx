'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import type { Project } from '@/types'
import { LabelChip, Reveal } from '@/components/ui'
import { urlForImage } from '@/lib/sanity/client'
import { DEMO_PROJECTS } from '@/lib/demo-data'

export { DEMO_PROJECTS }

// ============================================================
// PROJECT CARD
// ============================================================
function ProjectCard({ project, index }: { project: Partial<Project>; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const isLarge = index === 0 || index === 3
  const imageColors = ['#1a1a1a', '#111111', '#0d0d0d', '#151515']

  return (
    <motion.div
      ref={(el) => {
        cardRef.current = el
        if (typeof inViewRef === 'function') inViewRef(el)
      }}
      className={`group relative overflow-hidden rounded-2xl bg-carbon border border-white/5
        ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}`}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
    >
      <Link href={`/projects/${project.slug?.current ?? '#'}`} className="block">
        {/* Image area */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: isLarge ? '16/9' : '4/3' }}
        >
          {project.coverImage ? (
            <Image
              src={urlForImage(project.coverImage).width(800).url()}
              alt={project.coverImage.alt ?? project.title ?? ''}
              fill
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
              sizes={isLarge ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          ) : (
            /* Placeholder gradient */
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: imageColors[index % imageColors.length] }}
            >
              <DemoModelPreview index={index} />
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent
            opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* View project overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
            style={{ transition: 'opacity 0.3s' }}
          >
            <div className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center
              backdrop-blur-sm bg-white/5">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8H14M14 8L8.5 2.5M14 8L8.5 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-display text-2xl text-chrome font-light leading-tight tracking-tight mb-1">
                {project.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{project.tagline}</p>
            </div>
            <span className="font-mono text-[10px] text-zinc-600 mt-1 shrink-0">{project.year}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2 mt-4">
            <LabelChip>{project.category}</LabelChip>
            {project.tags?.slice(0, 2).map((tag) => (
              <LabelChip key={tag}>{tag}</LabelChip>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ============================================================
// DEMO MODEL PREVIEWS (geometric SVG placeholders)
// ============================================================
function DemoModelPreview({ index }: { index: number }) {
  const shapes = [
    // Speaker
    <svg key={0} viewBox="0 0 200 200" className="w-32 h-32 opacity-30">
      <circle cx="100" cy="100" r="70" fill="none" stroke="#e8e8e8" strokeWidth="1" />
      <circle cx="100" cy="100" r="45" fill="none" stroke="#e8e8e8" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="20" fill="none" stroke="#ff4500" strokeWidth="1" />
      <circle cx="100" cy="100" r="6" fill="#ff4500" opacity="0.5" />
    </svg>,
    // Lamp
    <svg key={1} viewBox="0 0 200 200" className="w-32 h-32 opacity-30">
      <ellipse cx="100" cy="80" rx="50" ry="20" fill="none" stroke="#e8e8e8" strokeWidth="1" />
      <line x1="100" y1="80" x2="100" y2="160" stroke="#e8e8e8" strokeWidth="1" />
      <ellipse cx="100" cy="160" rx="30" ry="10" fill="none" stroke="#a8d8f0" strokeWidth="0.5" />
    </svg>,
    // Watch
    <svg key={2} viewBox="0 0 200 200" className="w-32 h-32 opacity-30">
      <rect x="75" y="70" width="50" height="60" rx="8" fill="none" stroke="#e8e8e8" strokeWidth="1" />
      <circle cx="100" cy="100" r="18" fill="none" stroke="#c0c0c0" strokeWidth="0.5" />
      <line x1="100" y1="100" x2="100" y2="87" stroke="#ff4500" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="100" y1="100" x2="108" y2="104" stroke="#e8e8e8" strokeWidth="1" strokeLinecap="round" />
    </svg>,
    // Chair
    <svg key={3} viewBox="0 0 200 200" className="w-32 h-32 opacity-30">
      <rect x="60" y="90" width="80" height="12" rx="2" fill="none" stroke="#e8e8e8" strokeWidth="1" />
      <rect x="70" y="60" width="8" height="30" fill="none" stroke="#e8e8e8" strokeWidth="0.5" />
      <rect x="122" y="60" width="8" height="30" fill="none" stroke="#e8e8e8" strokeWidth="0.5" />
      <line x1="70" y1="102" x2="65" y2="145" stroke="#e8e8e8" strokeWidth="1" strokeLinecap="round" />
      <line x1="130" y1="102" x2="135" y2="145" stroke="#e8e8e8" strokeWidth="1" strokeLinecap="round" />
      <line x1="74" y1="102" x2="74" y2="145" stroke="#e8e8e8" strokeWidth="0.5" />
      <line x1="126" y1="102" x2="126" y2="145" stroke="#e8e8e8" strokeWidth="0.5" />
    </svg>,
  ]

  return shapes[index % shapes.length] ?? null
}

// ============================================================
// FEATURED PROJECTS SECTION
// ============================================================
interface FeaturedProjectsProps {
  projects?: Partial<Project>[]
}

export function FeaturedProjectsSection({ projects = DEMO_PROJECTS }: FeaturedProjectsProps) {
  return (
    <section className="section-padding relative">
      <div className="container-fluid">
        {/* Section header */}
        <div className="flex items-end justify-between mb-16 pb-6 border-b border-white/6">
          <Reveal>
            <div>
              <p className="label mb-3">
                <span className="text-pulse">01</span> — Selected Work
              </p>
              <h2 className="font-display text-display-lg text-chrome font-light leading-none tracking-tight">
                Recent Projects
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Link
              href="/projects"
              className="hidden md:inline-flex items-center gap-3 font-mono text-[11px] text-zinc-500
                tracking-widest uppercase hover:text-chrome transition-colors duration-300 group"
            >
              All Projects
              <svg className="transition-transform duration-300 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>
          </Reveal>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>

        {/* Mobile: View all */}
        <div className="mt-10 flex justify-center md:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/10 rounded-full
              font-mono text-[11px] text-zinc-400 tracking-widest uppercase
              hover:border-white/30 hover:text-chrome transition-all duration-300"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  )
}
