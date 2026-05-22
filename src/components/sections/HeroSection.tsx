'use client'

import { Suspense, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { SplitText, LabelChip, ScrollProgressBar } from '@/components/ui'
import { SITE_CONFIG } from '@/config'

const HeroViewer = dynamic(
  () => import('@/components/3d/ModelViewer').then((m) => m.HeroViewer),
  { ssr: false, loading: () => <div className="w-full h-full bg-black" /> }
)

// ============================================================
// SCROLL INDICATOR
// ============================================================
function ScrollIndicator() {
  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.5, duration: 1 }}
    >
      <span className="font-mono text-[9px] text-zinc-600 tracking-[0.3em] uppercase">Scroll</span>
      <div className="relative w-[1px] h-12 bg-white/10 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-transparent via-pulse to-transparent"
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  )
}

// ============================================================
// HERO SECTION
// ============================================================
export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const canvasScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92])
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 0.6])

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen min-h-[600px] overflow-hidden"
      aria-label="Hero"
    >
      <ScrollProgressBar />

      {/* 3D Canvas */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: canvasScale, opacity: canvasOpacity }}
      >
        <HeroViewer />
      </motion.div>

      {/* Gradientes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-obsidian to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-obsidian/60 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-obsidian/80 to-transparent" />
      </div>

      {/* Scroll overlay */}
      <motion.div
        className="absolute inset-0 z-10 bg-obsidian pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Contenido */}
      <motion.div
        className="relative z-20 h-full flex flex-col justify-end pb-24 md:pb-32"
        style={{ y: textY }}
      >
        <div className="container-fluid">
          <div className="max-w-5xl">
            {/* Label */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
            >
              <LabelChip accent>Portafolio 2025–2026</LabelChip>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display font-light leading-none tracking-tight mb-8">
              <div className="overflow-hidden">
                <SplitText
                  text="Diseño que"
                  className="text-display text-chrome"
                  delay={0.5}
                  stagger={0.04}
                />
              </div>
              <div className="overflow-hidden">
                <SplitText
                  text="nace de la"
                  className="text-display text-zinc-500"
                  delay={0.65}
                  stagger={0.04}
                />
              </div>
              <div className="overflow-hidden">
                <SplitText
                  text="cultura."
                  className="text-display text-chrome"
                  delay={0.8}
                  stagger={0.04}
                />
              </div>
            </h1>

            {/* Subline */}
            <motion.p
              className="font-sans text-zinc-400 text-lg max-w-lg leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease: [0.19, 1, 0.22, 1] }}
            >
              {SITE_CONFIG.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3, ease: [0.19, 1, 0.22, 1] }}
            >
              <Link
                href="/projects"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-chrome text-void
                  rounded-full font-mono text-[11px] tracking-widest uppercase
                  transition-all duration-500 hover:bg-white"
              >
                Ver proyectos
                <svg className="transition-transform duration-300 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/10 rounded-full
                  font-mono text-[11px] text-zinc-400 tracking-widest uppercase
                  transition-all duration-300 hover:border-white/30 hover:text-chrome"
              >
                Sobre mí
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Side labels */}
      <motion.div
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-end gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {['Concepto', 'Cultura', 'Forma'].map((label, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-zinc-600 tracking-[0.25em] uppercase">{label}</span>
            <div className="w-6 h-[1px] bg-white/10" />
          </div>
        ))}
      </motion.div>

      {/* Year indicator */}
      <motion.div
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span
          className="font-mono text-[9px] text-zinc-700 tracking-[0.25em] uppercase"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Luis García 2025–2026
        </span>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
