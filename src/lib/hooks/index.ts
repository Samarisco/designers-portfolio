import { useEffect, useRef, useState, useCallback } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'

// ============================================================
// useMousePosition - Normalized mouse coordinates
// ============================================================
export function useMousePosition() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springX = useSpring(x, { stiffness: 150, damping: 30 })
  const springY = useSpring(y, { stiffness: 150, damping: 30 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1
      x.set(nx)
      y.set(ny)
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [x, y, rawX, rawY])

  return { x, y, springX, springY, rawX, rawY }
}

// ============================================================
// useScrollProgress - Scroll progress 0 to 1
// ============================================================
export function useScrollProgress(ref?: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref?.current

    const handler = () => {
      if (el) {
        const rect = el.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        const scrolled = -rect.top
        setProgress(Math.max(0, Math.min(1, scrolled / total)))
      } else {
        const total = document.body.scrollHeight - window.innerHeight
        setProgress(Math.max(0, Math.min(1, window.scrollY / total)))
      }
    }

    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [ref])

  return progress
}

// ============================================================
// useReducedMotion - Respects user preference
// ============================================================
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return reduced
}

// ============================================================
// useIntersectionObserver - Scroll-triggered visibility
// ============================================================
export function useIntersection(
  options: IntersectionObserverInit = { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
) {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setIsVisible(true)
        setHasBeenVisible(true)
      } else {
        setIsVisible(false)
      }
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
  }, [options])

  return { ref, isVisible, hasBeenVisible }
}

// ============================================================
// useWindowSize
// ============================================================
export function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    handler()
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}

// ============================================================
// useLenis - Smooth scroll utilities
// ============================================================
export function useLenisScroll() {
  const scrollTo = useCallback((target: string | number | HTMLElement, options?: object) => {
    // Access lenis from GSAP ticker context via dynamic import
    import('lenis').then(({ default: Lenis }) => {
      // Scroll utility for programmatic navigation
      const tempLenis = new Lenis()
      tempLenis.scrollTo(target, options)
    })
  }, [])

  return { scrollTo }
}

// ============================================================
// useParallax - GSAP ScrollTrigger parallax
// ============================================================
export function useParallax<T extends HTMLElement>(speed: number = 0.5) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let cleanup: (() => void) | undefined

    const init = async () => {
      try {
        const { default: gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        const tween = gsap.to(el, {
          y: () => el.offsetHeight * speed * -1,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })

        cleanup = () => {
          tween.kill()
          ScrollTrigger.getAll().forEach((t) => t.kill())
        }
      } catch (err) {
        console.warn('Parallax init failed:', err)
      }
    }

    init()
    return () => cleanup?.()
  }, [speed])

  return ref
}
