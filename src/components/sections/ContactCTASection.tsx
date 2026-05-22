'use client'

import Link from 'next/link'
import { Reveal, Magnetic } from '@/components/ui'
import { SITE_CONFIG, NAV_ITEMS } from '@/config'

// ============================================================
// CONTACT CTA SECTION
// ============================================================
export function ContactCTASection() {
  return (
    <section className="section-padding border-t border-white/6 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96
          rounded-full bg-pulse/5 blur-[100px]" />
      </div>

      <div className="container-fluid relative z-10 text-center">
        <Reveal>
          <p className="label mb-8">
            <span className="text-pulse">04</span> — Hablemos
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-display-xl text-chrome font-light leading-none tracking-tight mb-8">
            ¿Tienes un proyecto
            <br />
            <span className="text-zinc-500">en mente?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-zinc-500 text-lg max-w-lg mx-auto mb-12 leading-relaxed">
            Abierto a colaboraciones, conceptos, proyectos de diseño 3D
            y cualquier conversación sobre cultura, forma y manufactura.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-chrome text-void rounded-full
                  font-mono text-[11px] tracking-widest uppercase hover:bg-white transition-colors duration-300"
              >
                Iniciar conversación
                <svg className="transition-transform duration-300 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </Link>
            </Magnetic>

            <Magnetic>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center gap-3 px-10 py-5 border border-white/10 rounded-full
                  font-mono text-[11px] text-zinc-400 tracking-widest uppercase
                  hover:border-white/30 hover:text-chrome transition-all duration-300"
              >
                {SITE_CONFIG.phone}
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ============================================================
// FOOTER
// ============================================================
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/6 py-12">
      <div className="container-fluid">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <div>
            <Link href="/" className="font-mono text-label-sm text-chrome tracking-[0.2em] uppercase block mb-2">
              {SITE_CONFIG.name}
            </Link>
            <p className="font-mono text-[10px] text-zinc-700 tracking-widest">{SITE_CONFIG.title}</p>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase
                  hover:text-chrome transition-colors duration-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social + copyright */}
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-4">
              {Object.entries(SITE_CONFIG.social).map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase
                    hover:text-chrome transition-colors duration-300 capitalize"
                >
                  {name}
                </a>
              ))}
            </div>
            <p className="font-mono text-[10px] text-zinc-800 tracking-widest">
              ©{year} {SITE_CONFIG.name}. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
