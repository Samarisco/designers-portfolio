'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Reveal, LabelChip, Divider } from '@/components/ui'
import { Footer } from '@/components/sections/ContactCTASection'

const SKILLS = [
  {
    category: 'Diseño',
    items: ['Diseño Industrial', 'Diseño Conceptual', 'CMF', 'Art Toys', 'Diseño para manufactura'],
  },
  {
    category: '3D & Visualización',
    items: ['Blender', 'ZBrush', 'Keyshot', 'Cinema 4D', 'Rhino'],
  },
  {
    category: 'Manufactura',
    items: ['Impresión FDM', 'Impresión SLA/MSLA', 'Modelado para impresión 3D', 'Ensamble modular'],
  },
  {
    category: 'Software',
    items: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Procreate'],
  },
]

const EXPERIENCE = [
  {
    role: 'Diseñador Industrial & Artista 3D',
    company: 'Freelance — Proyectos Independientes',
    period: '2023 — Presente',
    description:
      'Desarrollo de conceptos de diseño de producto, modelado 3D para impresión, renders fotorrealistas y art toys. Proyectos que cruzan la cultura pop, los videojuegos y el diseño industrial.',
  },
  {
    role: 'Estudiante de Diseño Industrial',
    company: 'Formación Profesional',
    period: '2021 — Presente',
    description:
      'Formación en diseño industrial con enfoque en modelado digital, materialidad, procesos de manufactura y narrativa de producto.',
  },
]

const DISCIPLINES = [
  {
    index: '01',
    title: 'Diseño Conceptual',
    desc: 'Desarrollo de conceptos de producto con narrativa cultural sólida — desde footwear hasta art toys funcionales.',
  },
  {
    index: '02',
    title: 'Escultura Digital 3D',
    desc: 'Modelado orgánico de alta resolución con ZBrush y Blender, optimizado para render fotorrealista e impresión 3D.',
  },
  {
    index: '03',
    title: 'CMF & Materialidad',
    desc: 'Definición de paletas de Color, Material y Acabado que comunican la identidad y narrativa de cada proyecto.',
  },
  {
    index: '04',
    title: 'Diseño para Impresión 3D',
    desc: 'Optimización de modelos para fabricación FDM y SLA — piezas ensamblables, tolerancias y mínimo uso de soportes.',
  },
]

export function AboutPageClient() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return <div className="min-h-screen bg-obsidian" />

  return (
    <>
      <main className="min-h-screen">

        {/* ── HERO ── */}
        <section className="pt-40 pb-24 border-b border-white/6">
          <div className="container-fluid">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-end">
              <div>
                <Reveal>
                  <p className="label mb-6"><span className="text-pulse">Sobre mí</span></p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h1 className="font-display text-display-xl text-chrome font-light leading-none tracking-tight mb-8">
                    Luis<br />
                    <span className="text-zinc-500">García</span>
                  </h1>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="text-zinc-400 text-xl leading-relaxed max-w-lg">
                    Diseñador industrial y artista 3D con una visión que cruza
                    la cultura pop, el mundo de los videojuegos y la manufactura
                    física. Basado en México.
                  </p>
                </Reveal>
              </div>

              {/* Portrait placeholder */}
              <Reveal delay={0.3}>
                <div className="relative aspect-[3/4] max-w-sm rounded-2xl overflow-hidden border border-white/6 bg-carbon">
                  <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <svg viewBox="0 0 200 280" className="w-full h-full">
                      <ellipse cx="100" cy="100" rx="50" ry="60" fill="none" stroke="#e8e8e8" strokeWidth="0.5" />
                      <rect x="50" y="160" width="100" height="120" rx="4" fill="none" stroke="#e8e8e8" strokeWidth="0.5" />
                    </svg>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                    <LabelChip accent>Disponible para proyectos</LabelChip>
                    <LabelChip>México 🇲🇽</LabelChip>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── FILOSOFÍA ── */}
        <section className="section-padding border-b border-white/6">
          <div className="container-fluid">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div>
                <Reveal>
                  <p className="label"><span className="text-pulse">01</span> — Filosofía</p>
                </Reveal>
              </div>
              <div className="lg:col-span-2 space-y-6">
                {[
                  `Más que diseñar objetos, construyo historias materializadas. Cada proyecto parte de una referencia cultural — un equipo de esports, un juego de rol, una obra de arte clásica — y la transforma en algo que se puede sostener, imprimir o admirar.`,
                  `El diseño industrial y el arte digital no son mundos separados para mí. Son el mismo proceso: entender una narrativa, encontrar su forma y traducirla a un objeto que la comunique sin necesidad de palabras.`,
                  `La cultura pop es tan válida como cualquier otra fuente de inspiración. Nintendo, D&D, League of Legends — estas son las mitologías de nuestra generación, y merecen objetos que estén a su altura.`,
                ].map((para, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <p className="text-zinc-400 text-lg leading-relaxed">{para}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCIA ── */}
        <section className="section-padding border-b border-white/6">
          <div className="container-fluid">
            <Reveal>
              <p className="label mb-16"><span className="text-pulse">02</span> — Experiencia</p>
            </Reveal>
            <div className="space-y-0">
              {EXPERIENCE.map((exp, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-10 border-t border-white/6">
                    <div>
                      <span className="font-mono text-[10px] text-zinc-700 tracking-widest uppercase">
                        {exp.period}
                      </span>
                    </div>
                    <div className="md:col-span-3">
                      <h3 className="font-display text-2xl text-chrome font-light mb-1">{exp.role}</h3>
                      <p className="text-pulse font-mono text-[11px] tracking-widest mb-3">{exp.company}</p>
                      <p className="text-zinc-500 leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── DISCIPLINAS ── */}
        <section className="section-padding border-b border-white/6">
          <div className="container-fluid">
            <Reveal>
              <p className="label mb-16"><span className="text-pulse">03</span> — Disciplinas</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {DISCIPLINES.map((item, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="group py-10 px-8 border-t border-white/6 md:border-l
                    odd:border-l-0 hover:bg-white/2 transition-colors duration-300 cursor-default">
                    <div className="flex items-start gap-6">
                      <span className="font-mono text-[10px] text-zinc-700 tracking-widest mt-1">
                        {item.index}
                      </span>
                      <div>
                        <h3 className="font-display text-2xl text-chrome font-light tracking-tight mb-3
                          group-hover:text-pulse transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section className="section-padding">
          <div className="container-fluid">
            <Reveal>
              <p className="label mb-16"><span className="text-pulse">04</span> — Herramientas & Skills</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
              {SKILLS.map((group, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div>
                    <h3 className="font-mono text-[11px] text-zinc-600 tracking-widest uppercase mb-6">
                      {group.category}
                    </h3>
                    <ul className="space-y-3">
                      {group.items.map((skill) => (
                        <li key={skill} className="flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full bg-pulse flex-shrink-0" />
                          <span className="text-zinc-400 text-sm">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
