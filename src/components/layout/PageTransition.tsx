'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [displayChildren, setDisplayChildren] = useState(children)
  const [transitionStage, setTransitionStage] = useState<'fadeIn' | 'fadeOut'>('fadeIn')

  useEffect(() => {
    setTransitionStage('fadeIn')
    setDisplayChildren(children)
  }, [pathname, children])

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
      className="min-h-screen"
      onAnimationComplete={() => setTransitionStage('fadeIn')}
    >
      {displayChildren}
    </motion.div>
  )
}
