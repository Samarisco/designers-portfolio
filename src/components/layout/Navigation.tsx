'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { NAV_ITEMS, SITE_CONFIG, motionVariants } from '@/config'
import { useAppStore } from '@/components/layout/Providers'

export function Navigation() {
  const pathname = usePathname()
  const menuOpen = useAppStore((s) => s.menuOpen)
  const setMenuOpen = useAppStore((s) => s.setMenuOpen)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const direction = latest > lastScrollY.current ? 'down' : 'up'
    setScrolled(latest > 60)
    setHidden(direction === 'down' && latest > 200)
    lastScrollY.current = latest
  })

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* Main Nav Bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[var(--z-nav)] mix-blend-normal"
        animate={{ y: hidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
      >
        <div
          className="container-fluid flex items-center justify-between py-6 transition-all duration-500"
          style={{
            background: scrolled && !menuOpen
              ? 'rgba(8,8,8,0.85)'
              : 'transparent',
            backdropFilter: scrolled && !menuOpen ? 'blur(20px)' : 'none',
            borderBottom: scrolled && !menuOpen
              ? '1px solid rgba(255,255,255,0.06)'
              : '1px solid transparent',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-mono text-label-sm text-chrome tracking-[0.2em] uppercase hover:text-pulse transition-colors duration-300 z-10"
            onClick={() => setMenuOpen(false)}
          >
            {SITE_CONFIG.name.split(' ').map((w, i) => (
              <span key={i}>
                {i === 0 ? w : <span className="text-zinc-500"> {w}</span>}
              </span>
            ))}
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} active={pathname.startsWith(item.href)} index={item.index}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <button
            className="relative z-10 flex flex-col justify-center items-end gap-[5px] w-8 h-8 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              className="block h-[1px] bg-chrome origin-right"
              animate={{ width: menuOpen ? '100%' : '100%', rotate: menuOpen ? -45 : 0, y: menuOpen ? 3 : 0 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            />
            <motion.span
              className="block h-[1px] bg-chrome w-[70%] origin-right"
              animate={{ width: menuOpen ? '100%' : '70%', rotate: menuOpen ? 45 : 0, y: menuOpen ? -3 : 0 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            />
          </button>

          {/* Status indicator */}
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-neon animate-pulse-slow" />
            <span className="font-mono text-[10px] text-zinc-500 tracking-widest uppercase">Available</span>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[35] bg-obsidian flex flex-col justify-end pb-16 px-8"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          >
            {/* Grid bg */}
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

            {/* Nav items */}
            <motion.ul
              className="flex flex-col gap-2"
              variants={motionVariants.staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {NAV_ITEMS.map((item) => (
                <motion.li key={item.href} variants={motionVariants.staggerItem}>
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-4 py-4 border-b border-white/5"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="font-mono text-[10px] text-zinc-600 tracking-widest">{item.index}</span>
                    <span
                      className="font-display text-[clamp(2.5rem,10vw,6rem)] text-chrome leading-none tracking-tight
                        group-hover:text-pulse transition-colors duration-300"
                    >
                      {item.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>

            {/* Footer of menu */}
            <motion.div
              className="mt-12 flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
                {SITE_CONFIG.email}
              </span>
              <span className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase">
                ©{new Date().getFullYear()}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ============================================================
// NAV LINK
// ============================================================
function NavLink({
  href,
  children,
  active,
  index,
}: {
  href: string
  children: React.ReactNode
  active: boolean
  index?: string
}) {
  return (
    <Link
      href={href}
      className="group relative flex items-center gap-2 font-mono text-label-sm tracking-widest uppercase"
    >
      {index && (
        <span className="text-zinc-600 text-[9px] group-hover:text-pulse transition-colors">{index}</span>
      )}
      <span
        className={`transition-colors duration-300 ${active ? 'text-chrome' : 'text-zinc-500 hover:text-chrome'}`}
      >
        {children}
      </span>
      {/* Underline */}
      <span
        className="absolute -bottom-0.5 left-0 h-[1px] bg-pulse origin-left transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{ transform: active ? 'scaleX(1)' : 'scaleX(0)', width: '100%' }}
      />
    </Link>
  )
}
