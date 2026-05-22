'use client'

// ============================================================
// NOISE OVERLAY
// ============================================================
export function NoiseOverlay() {
  return (
    <div
      className="noise-overlay"
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

// ============================================================
// SPLIT TEXT — reveals character by character
// ============================================================
import { motion } from 'framer-motion'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

export function SplitText({ text, className = '', delay = 0, stagger = 0.03 }: SplitTextProps) {
  const words = text.split(' ')

  return (
    <span className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: delay + wi * stagger,
              ease: [0.19, 1, 0.22, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// ============================================================
// REVEAL — scroll-triggered fade up
// ============================================================
import { useInView } from 'react-intersection-observer'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  threshold?: number
}

export function Reveal({ children, className = '', delay = 0, direction = 'up', threshold = 0.1 }: RevealProps) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true, rootMargin: '0px 0px -5% 0px' })

  const initialMap = {
    up: { opacity: 0, y: 40 },
    down: { opacity: 0, y: -40 },
    left: { opacity: 0, x: -40 },
    right: { opacity: 0, x: 40 },
    none: { opacity: 0 },
  }

  const visibleMap = {
    up: { opacity: 1, y: 0 },
    down: { opacity: 1, y: 0 },
    left: { opacity: 1, x: 0 },
    right: { opacity: 1, x: 0 },
    none: { opacity: 1 },
  }

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      initial={initialMap[direction]}
      animate={inView ? visibleMap[direction] : initialMap[direction]}
      transition={{ duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ============================================================
// LABEL CHIP
// ============================================================
interface LabelChipProps {
  children: ReactNode
  accent?: boolean
  className?: string
}

export function LabelChip({ children, accent = false, className = '' }: LabelChipProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
        font-mono text-[10px] tracking-widest uppercase
        border transition-colors
        ${accent
          ? 'border-pulse/30 bg-pulse/5 text-pulse'
          : 'border-white/10 bg-white/3 text-zinc-500'
        }
        ${className}
      `}
    >
      {accent && <span className="w-1 h-1 rounded-full bg-pulse animate-pulse-slow" />}
      {children}
    </span>
  )
}

// ============================================================
// MAGNETIC BUTTON
// ============================================================
import { useRef } from 'react'

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className = '', strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * strength
    const dy = (e.clientY - cy) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
    el.style.transition = 'transform 0.15s cubic-bezier(0.19, 1, 0.22, 1)'
  }

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'translate(0, 0)'
      ref.current.style.transition = 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)'
    }
  }

  return (
    <div
      ref={ref}
      className={`inline-flex ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

// ============================================================
// BUTTON
// ============================================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  asLink?: boolean
  href?: string
}

export function Button({ variant = 'primary', size = 'md', children, className = '', ...props }: ButtonProps) {
  const sizes = {
    sm: 'px-4 py-2 text-[11px]',
    md: 'px-6 py-3 text-[11px]',
    lg: 'px-8 py-4 text-[12px]',
  }

  const variants = {
    primary: 'bg-chrome text-void hover:bg-white border border-transparent',
    ghost: 'bg-transparent text-chrome hover:bg-white/5 border border-white/10',
    outline: 'bg-transparent text-pulse hover:bg-pulse/5 border border-pulse/30',
  }

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-mono tracking-widest uppercase
        rounded-full transition-all duration-300
        ${sizes[size]} ${variants[variant]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}

// ============================================================
// DIVIDER
// ============================================================
export function Divider({ className = '' }: { className?: string }) {
  return <div className={`w-full h-[1px] bg-white/6 ${className}`} />
}

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
import { useScroll, useTransform } from 'framer-motion'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-pulse origin-left z-[100]"
      style={{ scaleX }}
    />
  )
}
