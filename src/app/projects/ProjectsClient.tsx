'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProjectCategory } from '@/types'
import { LabelChip, Reveal } from '@/components/ui'
import { Footer } from '@/components/sections/ContactCTASection'
import { DEMO_PROJECTS } from '@/lib/demo-data'

const CATEGORIES: { value: ProjectCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Todo' },
  { value: 'consumer', label: 'Consumo' },
  { value: 'electronics', label: 'Electrónica' },
  { value: 'furniture', label: 'Mobiliario' },
  { value: 'experimental', label: 'Experimental' },
]

export function ProjectsClientPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all')

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return DEMO_PROJECTS
    return DEMO_PROJECTS.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <>
      <section className="min-h-screen pt-40 pb-32">
        <div className="container-fluid">

          {/* Header */}
          <div className="mb-20">
            <Reveal>
              <p className="label mb-4">
                <span className="text-pulse">Trabajo</span> — Proyectos seleccionados
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-display-xl text-chrome font-light leading-none tracking-tight">
                Proyectos
              </h1>
            </Reveal>
          </div>

          {/* Filtros */}
          <Reveal delay={0.2}>
            <div className="flex flex-wrap items-center gap-2 mb-16 pb-8 border-b border-white/6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-5 py-2.5 rounded-full font-mono text-[10px] tracking-widest uppercase
                    border transition-all duration-300
                    ${activeCategory === cat.value
                      ? 'bg-chrome text-void border-chrome'
                      : 'bg-transparent text-zinc-500 border-white/10 hover:border-white/30 hover:text-chrome'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
              <span className="ml-auto font-mono text-[10px] text-zinc-700 tracking-widest">
                {filtered.length} proyectos
              </span>
            </div>
          </Reveal>

          {/* Grid */}
          <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.19, 1, 0.22, 1] }}
                >
                  <Link
                    href={`/projects/${project.slug?.current ?? '#'}`}
                    className="group block rounded-2xl overflow-hidden border border-white/5 bg-carbon
                      hover:border-white/15 transition-colors duration-300"
                  >
                    {/* Imagen / Placeholder */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-ash">
                      <ProjectPlaceholder index={i} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/20
                        flex items-center justify-center opacity-0 group-hover:opacity-100
                        transition-all duration-300 backdrop-blur-sm bg-white/5
                        -translate-y-2 group-hover:translate-y-0">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h2 className="font-display text-xl text-chrome font-light tracking-tight">
                          {project.title}
                        </h2>
                        <span className="font-mono text-[10px] text-zinc-600 shrink-0 mt-0.5">
                          {project.year}
                        </span>
                      </div>
                      <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                        {project.tagline}
                      </p>
                      <LabelChip>{project.category}</LabelChip>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-32">
              <p className="font-mono text-[11px] text-zinc-700 tracking-widest uppercase">
                No hay proyectos en esta categoría aún
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

// ============================================================
// PLACEHOLDER VISUAL
// ============================================================
const PLACEHOLDER_COLORS = ['#1a1a1a', '#111111', '#0f0f0f', '#141414']

function ProjectPlaceholder({ index }: { index: number }) {
  const bg = PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length] ?? '#111'
  const svgs = [
    // Nike T1 — zapatilla abstracta
    <svg key="0" viewBox="0 0 120 80" className="w-24 h-16 opacity-20">
      <path d="M10 55 Q30 20 70 18 Q100 16 110 55" fill="none" stroke="#e8e8e8" strokeWidth="0.8" />
      <ellipse cx="60" cy="60" rx="50" ry="12" fill="none" stroke="#ff4500" strokeWidth="0.5" />
      <path d="M45 30 L65 22 L70 30" fill="none" stroke="#e8e8e8" strokeWidth="0.5" />
    </svg>,
    // Dice Tower — torre abstracta
    <svg key="1" viewBox="0 0 80 120" className="w-16 h-24 opacity-20">
      <rect x="25" y="20" width="30" height="80" rx="3" fill="none" stroke="#e8e8e8" strokeWidth="0.8" />
      <rect x="20" y="15" width="40" height="12" rx="2" fill="none" stroke="#e8e8e8" strokeWidth="0.5" />
      <rect x="30" y="35" width="8" height="12" rx="1" fill="none" stroke="#a8d8f0" strokeWidth="0.5" />
      <rect x="42" y="35" width="8" height="12" rx="1" fill="none" stroke="#a8d8f0" strokeWidth="0.5" />
      <polygon points="40,85 48,95 40,105 32,95" fill="none" stroke="#ff4500" strokeWidth="0.5" />
    </svg>,
    // Game Over — silueta pietà abstracta
    <svg key="2" viewBox="0 0 120 100" className="w-24 h-20 opacity-20">
      <ellipse cx="60" cy="45" rx="25" ry="35" fill="none" stroke="#e8e8e8" strokeWidth="0.8" />
      <path d="M35 65 Q60 80 85 65" fill="none" stroke="#e8e8e8" strokeWidth="0.5" />
      <circle cx="60" cy="22" r="10" fill="none" stroke="#c0c0c0" strokeWidth="0.5" />
      <path d="M40 55 Q50 70 60 68 Q70 70 80 55" fill="none" stroke="#ff4500" strokeWidth="0.4" />
    </svg>,
  ]
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ background: bg }}>
      {svgs[index % svgs.length]}
    </div>
  )
}
