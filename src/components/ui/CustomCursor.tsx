'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useMotionValue(-100)
  const ringY = useMotionValue(-100)

  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 }
  const ringSpringConfig = { stiffness: 100, damping: 25, mass: 1 }

  const springDotX = useSpring(dotX, springConfig)
  const springDotY = useSpring(dotY, springConfig)
  const springRingX = useSpring(ringX, ringSpringConfig)
  const springRingY = useSpring(ringY, ringSpringConfig)

  const dotScaleMotion = useMotionValue(1)
  const ringScaleMotion = useMotionValue(1)
  const ringOpacity = useMotionValue(1)

  const isVisible = useRef(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)
      if (!isVisible.current) {
        isVisible.current = true
        ringOpacity.set(1)
      }
    }

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable =
        target.closest('a, button, [role="button"], input, textarea, select, label') !== null

      if (isClickable) {
        dotScaleMotion.set(0)
        ringScaleMotion.set(1.8)
      }
    }

    const onLeave = () => {
      dotScaleMotion.set(1)
      ringScaleMotion.set(1)
    }

    const onMouseLeave = () => {
      ringOpacity.set(0)
      isVisible.current = false
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [dotX, dotY, ringX, ringY, dotScaleMotion, ringScaleMotion, ringOpacity])

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-pulse rounded-full pointer-events-none mix-blend-difference"
        style={{
          x: springDotX,
          y: springDotY,
          translateX: '-50%',
          translateY: '-50%',
          scale: dotScaleMotion,
          zIndex: 9999,
        }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none border border-white/30"
        style={{
          x: springRingX,
          y: springRingY,
          translateX: '-50%',
          translateY: '-50%',
          scale: ringScaleMotion,
          opacity: ringOpacity,
          zIndex: 9998,
        }}
        transition={{ scale: { duration: 0.3, ease: [0.19, 1, 0.22, 1] } }}
      />
    </>
  )
}
