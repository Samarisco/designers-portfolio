'use client'

import { type ReactNode, useEffect } from 'react'
import { create } from 'zustand'
import type { AppState, Project } from '@/types'

// ============================================================
// GLOBAL STORE
// ============================================================
export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  setIsLoading: (v) => set({ isLoading: v }),
  menuOpen: false,
  setMenuOpen: (v) => set({ menuOpen: v }),
  currentProject: null,
  setCurrentProject: (p: Project | null) => set({ currentProject: p }),
  reducedMotion: false,
}))

// ============================================================
// PROVIDERS
// ============================================================
export function Providers({ children }: { children: ReactNode }) {
  const setIsLoading = useAppStore((s) => s.setIsLoading)

  useEffect(() => {
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis')

        const lenis = new Lenis({
          duration: 1.4,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 1.5,
        })

        // Connect to GSAP ScrollTrigger
        const { default: gsap } = await import('gsap')
        const { ScrollTrigger } = await import('gsap/ScrollTrigger')
        gsap.registerPlugin(ScrollTrigger)

        // Sync lenis scroll with ScrollTrigger
        lenis.on('scroll', () => ScrollTrigger.update())

        // Use GSAP ticker for smooth raf
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000)
        })
        gsap.ticker.lagSmoothing(0)
      } catch (err) {
        // Graceful fallback — lenis is optional
        console.warn('Smooth scroll init failed:', err)
      }
    }

    initLenis()

    // Detect reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    useAppStore.setState({ reducedMotion: mq.matches })

    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [setIsLoading])

  return <>{children}</>
}
