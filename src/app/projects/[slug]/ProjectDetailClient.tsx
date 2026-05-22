'use client'

import { Suspense, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Project } from '@/types'
import { LabelChip, Reveal, Divider } from '@/components/ui'
import { Footer } from '@/components/sections/ContactCTASection'

const ModelViewer = dynamic(
  () => import('@/components/3d/ModelViewer').then((m) => m.ModelViewer),
  { ssr: false, loading: () => <div className="w-full h-full bg-obsidian animate-pulse" /> }
)

// ============================================================
// DEMO TIMELINE DATA
// ============================================================
const DEMO_TIMELINE = [
  { date: 'Jan 2024', title: 'Brief & Research', description: 'Market research, competitor analysis, user interviews.', milestone: false },
  { date: 'Feb 2024', title: 'Concept Generation', description: '3 concept directions explored through sketch and foam models.', milestone: true },
  { date: 'Mar 2024', title: 'CAD Development', description: 'Full parametric 3D model, tolerances, material specs.', milestone: false },
  { date: 'Apr 2024', title: 'Prototype Validation', description: 'SLA prototype, functional testing, user testing sessions.', milestone: true },
  { date: 'May 2024', title: 'Final Delivery', description: 'Manufacturing documentation, Keyshot renders, handoff.', milestone: true },
]

const DEMO_MATERIALS = [
  { name: 'Anodized Aluminum 6061', description: 'Primary structural shell', color: '#c0c0c0' },
  { name: 'Polycarbonate (PC)', description: 'Translucent acoustic membrane', color: '#a8d8f0' },
  { name: 'TPE 45A', description: 'Grip overmold zones', color: '#222222' },
  { name: 'N52 Neodymium', description: 'Magnetic retention system', color: '#555555' },
]

// ============================================================
// PROJECT DETAIL CLIENT
// ============================================================
export function ProjectDetailClient({ project }: { project: Partial<Project> }) {
  const [viewerMode, setViewerMode] = useState<'render' | 'wireframe'>('render')
  const [activeTab, setActiveTab] = useState<'info' | 'materials' | 'process'>('info')

  return (
    <>
      <article className="min-h-screen">
        {/* Back button */}
        <div className="fixed top-24 left-8 z-30 hidden lg:block">
          <Link
            href="/projects"
            className="group flex items-center gap-2 font-mono text-[10px] text-zinc-600
              tracking-widest uppercase hover:text-chrome transition-colors"
          >
            <svg className="transition-transform duration-300 group-hover:-translate-x-1" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M10 6H2M2 6L5.5 2.5M2 6L5.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Back
          </Link>
        </div>

        {/* ── HERO 3D VIEWER ── */}
        <section className="relative w-full h-[70vh] md:h-screen max-h-[900px] bg-obsidian overflow-hidden">
          <Suspense fallback={<div className="w-full h-full bg-obsidian" />}>
            <ModelViewer
              url={project.model3d?.asset?.url ?? undefined}
              autoRotate
              enableOrbit
              enableBloom
              wireframe={viewerMode === 'wireframe'}
              className="w-full h-full"
            />
          </Suspense>

          {/* Mode toggle */}
          <div className="absolute top-8 right-8 z-10 flex items-center gap-1 glass rounded-full p-1">
            {(['render', 'wireframe'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewerMode(mode)}
                className={`px-4 py-2 rounded-full font-mono text-[10px] tracking-widest uppercase transition-all
                  ${viewerMode === mode ? 'bg-chrome text-void' : 'text-zinc-500 hover:text-chrome'}`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Project title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <LabelChip accent>{project.category}</LabelChip>
                <LabelChip>{project.year}</LabelChip>
                {project.status && <LabelChip>{project.status}</LabelChip>}
              </div>
              <h1 className="font-display text-display-lg text-chrome font-light leading-none tracking-tight mb-3">
                {project.title}
              </h1>
              <p className="text-zinc-400 text-lg max-w-xl">{project.tagline}</p>
            </motion.div>
          </div>
        </section>

        {/* ── CONTENT ── */}
        <div className="container-fluid py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main content col */}
            <div className="lg:col-span-2 space-y-16">
              {/* Tab navigation */}
              <div className="flex items-center gap-1 border-b border-white/6 pb-0">
                {(['info', 'materials', 'process'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-6 py-4 font-mono text-[11px] tracking-widest uppercase transition-colors
                      ${activeTab === tab ? 'text-chrome' : 'text-zinc-600 hover:text-zinc-400'}`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-pulse"
                        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              {activeTab === 'info' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <p className="text-zinc-300 text-lg leading-relaxed mb-8">
                    {project.description ??
                      `This project explores the relationship between acoustic precision and sculptural restraint.
                      Every surface decision emerged from a process of reduction — asking what could be removed
                      without sacrificing function or presence. The result is an object that communicates
                      confidence through silence rather than excess.`}
                  </p>
                  <p className="text-zinc-500 leading-relaxed">
                    The material language draws from precision manufacturing traditions — anodized aluminum,
                    machined tolerances, and considered surface treatments that reveal their making without
                    fetishizing it.
                  </p>
                </motion.div>
              )}

              {activeTab === 'materials' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <div className="space-y-4">
                    {(project.materials ?? DEMO_MATERIALS).map((mat, i) => (
                      <div key={i} className="flex items-center gap-5 p-5 rounded-xl border border-white/6 bg-carbon
                        hover:border-white/12 transition-colors">
                        <div
                          className="w-10 h-10 rounded-lg flex-shrink-0 border border-white/10"
                          style={{ background: (mat as typeof DEMO_MATERIALS[0]).color ?? '#333' }}
                        />
                        <div>
                          <p className="text-chrome font-light mb-1">{mat.name}</p>
                          <p className="text-zinc-600 text-sm">{mat.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'process' && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                  <div className="relative">
                    {/* Vertical timeline line */}
                    <div className="absolute left-[19px] top-0 bottom-0 w-[1px] bg-white/6" />

                    <div className="space-y-0">
                      {(project.timeline ?? DEMO_TIMELINE).map((event, i) => (
                        <div key={i} className="flex gap-6 pb-10 last:pb-0">
                          {/* Dot */}
                          <div className="relative flex-shrink-0 mt-1">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border
                              ${event.milestone
                                ? 'bg-pulse/10 border-pulse/30'
                                : 'bg-ash border-white/10'
                              }`}>
                              {event.milestone && (
                                <div className="w-2 h-2 rounded-full bg-pulse" />
                              )}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="pb-8">
                            <span className="font-mono text-[10px] text-zinc-700 tracking-widest block mb-1">
                              {event.date}
                            </span>
                            <h4 className="font-display text-xl text-chrome font-light mb-2">{event.title}</h4>
                            <p className="text-zinc-500 text-sm leading-relaxed">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar — project details */}
            <aside className="space-y-8">
              <Reveal>
                <div className="p-6 rounded-2xl border border-white/6 bg-carbon space-y-6">
                  <h3 className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">Project Details</h3>
                  <Divider />

                  {[
                    { label: 'Año', value: project.year?.toString() ?? '2024' },
                    { label: 'Categoría', value: project.category ?? 'Product Design' },
                    { label: 'Estado', value: project.status ?? 'Prototype' },
                    { label: 'Rol', value: project.role ?? 'Lead Designer' },
                    { label: 'Cliente', value: project.client ?? 'Independent' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between items-start gap-4">
                      <span className="font-mono text-[10px] text-zinc-700 tracking-widest uppercase">{label}</span>
                      <span className="text-zinc-300 text-sm text-right capitalize">{value}</span>
                    </div>
                  ))}

                  {project.dimensions && (
                    <>
                      <Divider />
                      <div>
                        <span className="font-mono text-[10px] text-zinc-700 tracking-widest uppercase block mb-2">Dimensions</span>
                        <span className="text-zinc-400 text-sm font-mono">
                          {project.dimensions.width} × {project.dimensions.height} × {project.dimensions.depth} {project.dimensions.unit}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </Reveal>

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <Reveal delay={0.1}>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <LabelChip key={tag}>{tag}</LabelChip>
                    ))}
                  </div>
                </Reveal>
              )}

              {/* Awards */}
              {project.awards && project.awards.length > 0 && (
                <Reveal delay={0.2}>
                  <div className="p-6 rounded-2xl border border-pulse/20 bg-pulse/5">
                    <h3 className="font-mono text-[10px] text-pulse tracking-widest uppercase mb-4">Awards</h3>
                    <ul className="space-y-2">
                      {project.awards.map((award, i) => (
                        <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                          <span className="text-pulse mt-1">↗</span>
                          {award}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </aside>
          </div>
        </div>
      </article>
      <Footer />
    </>
  )
}
