'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Reveal } from '@/components/ui'

// ============================================================
// MARQUEE
// ============================================================
const MARQUEE_ITEMS = [
  'Diseño Industrial', 'Modelado 3D', 'Art Toys', 'CMF',
  'Escultura Digital', 'Impresión 3D', 'Renders Fotorrealistas', 'Cultura Pop',
]

function Marquee() {
  return (
    <div className="relative overflow-hidden py-5 border-y border-white/6 my-24">
      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 24s linear infinite;
        }
      `}</style>
      <div className="marquee-track flex gap-12 whitespace-nowrap will-change-transform">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-8">
            <span className="font-display text-3xl md:text-4xl text-zinc-700 font-light tracking-tight">
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-pulse flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// STAT ITEM
// ============================================================
function Stat({ number, label, suffix = '' }: { number: string; label: string; suffix?: string }) {
  return (
    <Reveal>
      <div className="flex flex-col gap-2">
        <div className="font-display text-display-md text-chrome font-light leading-none tracking-tight">
          {number}
          <span className="text-pulse">{suffix}</span>
        </div>
        <p className="font-mono text-[11px] text-zinc-600 tracking-widest uppercase">{label}</p>
      </div>
    </Reveal>
  )
}

// ============================================================
// ABOUT TEASER
// ============================================================
export function AboutTeaserSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <>
      <Marquee />

      <section ref={sectionRef} className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

        <div className="container-fluid relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

            {/* Left — texto */}
            <div>
              <Reveal>
                <p className="label mb-6">
                  <span className="text-pulse">02</span> — Sobre mí
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="font-display text-display-lg text-chrome font-light leading-none tracking-tight mb-8">
                  Diseño con narrativa. Objetos con historia.
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  Soy Luis García, diseñador industrial y artista 3D mexicano.
                  Mi trabajo transita entre el diseño conceptual de producto,
                  el modelado escultórico 3D y los art toys funcionales.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="text-zinc-500 text-base leading-relaxed mb-10">
                  Cada proyecto parte de una referencia cultural profunda —
                  un equipo de esports, un juego de rol, una escultura clásica —
                  y la transforma en algo que se puede tocar, imprimir o admirar.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-4 font-mono text-[11px] text-zinc-400
                    tracking-widest uppercase hover:text-chrome transition-colors duration-300"
                >
                  <span className="w-12 h-[1px] bg-zinc-700 group-hover:w-20 group-hover:bg-pulse
                    transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
                  Conoce más
                </Link>
              </Reveal>
            </div>

            {/* Right — stats + visual */}
            <div>
              <Reveal delay={0.2}>
                <div className="relative mb-12 h-48 rounded-2xl overflow-hidden border border-white/6 glass">
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ y }}
                  >
                    <svg viewBox="0 0 300 200" className="w-full h-full opacity-20">
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#ff4500" />
                          <stop offset="100%" stopColor="#a8d8f0" />
                        </linearGradient>
                      </defs>
                      {/* Zapatilla abstracta */}
                      <ellipse cx="150" cy="130" rx="100" ry="30" fill="none" stroke="url(#grad)" strokeWidth="0.5" />
                      <path d="M60 130 Q90 80 150 70 Q200 65 240 130" fill="none" stroke="#e8e8e8" strokeWidth="0.5" />
                      {/* Torre dados abstracta */}
                      <rect x="230" y="60" width="30" height="70" rx="3" fill="none" stroke="#ff4500" strokeWidth="0.5" />
                      <rect x="233" y="55" width="24" height="10" rx="2" fill="none" stroke="#ff4500" strokeWidth="0.4" />
                      {/* D20 abstracto */}
                      <polygon points="40,80 55,55 70,80 55,100" fill="none" stroke="#a8d8f0" strokeWidth="0.5" />
                    </svg>
                  </motion.div>
                  <div className="absolute top-4 left-4">
                    <span className="font-mono text-[9px] text-zinc-700 tracking-widest">DISEÑO & CULTURA</span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="font-mono text-[9px] text-zinc-700 tracking-widest">MÉXICO 2025–2026</span>
                  </div>
                </div>
              </Reveal>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 border-t border-white/6 pt-8">
                <Stat number="3" label="Proyectos en portafolio" />
                <Stat number="3" label="Software dominados" />
                <Stat number="2" suffix="+" label="Años de práctica" />
                <Stat number="∞" label="Referencias culturales" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

// ============================================================
// DISCIPLINES SECTION
// ============================================================
const DISCIPLINES = [
  {
    index: '01',
    title: 'Diseño Conceptual',
    desc: 'Desarrollo de conceptos de producto con una narrativa cultural sólida — desde footwear hasta art toys funcionales.',
  },
  {
    index: '02',
    title: 'Escultura Digital 3D',
    desc: 'Modelado orgánico de alta resolución con ZBrush y Blender, optimizado para render e impresión 3D.',
  },
  {
    index: '03',
    title: 'CMF & Materialidad',
    desc: 'Definición de paletas de Color, Material y Acabado que comunican la identidad de cada proyecto.',
  },
  {
    index: '04',
    title: 'Diseño para Impresión 3D',
    desc: 'Optimización de modelos para fabricación FDM y SLA — ensamblables, tolerancias calibradas, mínimo soporte.',
  },
]

export function DisciplinesSection() {
  return (
    <section className="section-padding border-t border-white/6">
      <div className="container-fluid">
        <Reveal>
          <p className="label mb-16">
            <span className="text-pulse">03</span> — Disciplinas
          </p>
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
  )
}
