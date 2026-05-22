'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal, Button } from '@/components/ui'
import { Footer } from '@/components/sections/ContactCTASection'
import { SITE_CONFIG } from '@/config'

const PROJECT_TYPES = [
  'Diseño de Producto',
  'Visualización 3D',
  'Art Toy / Escultura',
  'CMF & Materialidad',
  'Consultoría',
  'Otro',
]

export function ContactClient() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    type: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [activeType, setActiveType] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await new Promise((r) => setTimeout(r, 800))
    setSubmitted(true)
  }

  return (
    <>
      <main className="min-h-screen pt-40 pb-24">
        <div className="container-fluid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

            {/* Left — info */}
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <p className="label mb-6"><span className="text-pulse">Contacto</span></p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="font-display text-display-lg text-chrome font-light leading-none tracking-tight mb-10">
                  Hagamos algo<br />
                  <span className="text-zinc-500">extraordinario</span><br />
                  juntos.
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="space-y-6 mb-12">
                  {[
                    { label: 'Teléfono', value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                    { label: 'Email', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                    { label: 'Ubicación', value: 'México', href: null },
                    { label: 'Disponibilidad', value: 'Proyectos globales', href: null },
                  ].map(({ label, value, href }) => (
                    <div key={label} className="flex items-start gap-8">
                      <span className="font-mono text-[10px] text-zinc-700 tracking-widest uppercase w-24 flex-shrink-0 mt-0.5">
                        {label}
                      </span>
                      {href ? (
                        <a href={href} className="text-zinc-300 hover:text-chrome transition-colors">
                          {value}
                        </a>
                      ) : (
                        <span className="text-zinc-400">{value}</span>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="flex items-center gap-4">
                  {Object.entries(SITE_CONFIG.social).map(([name, href]) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase
                        hover:text-chrome transition-colors capitalize"
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — form */}
            <Reveal delay={0.2}>
              {submitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center py-24"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                >
                  <div className="w-16 h-16 rounded-full border border-neon/30 bg-neon/5
                    flex items-center justify-center mb-8">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="#39ff14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="font-display text-3xl text-chrome font-light mb-4">
                    Mensaje enviado
                  </h2>
                  <p className="text-zinc-500 max-w-sm">
                    Gracias por escribir. Te respondo en menos de 48 horas.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      label="Nombre"
                      id="name"
                      required
                      value={formState.name}
                      onChange={(v) => setFormState((s) => ({ ...s, name: v }))}
                    />
                    <FormField
                      label="Email"
                      id="email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(v) => setFormState((s) => ({ ...s, email: v }))}
                    />
                  </div>

                  <FormField
                    label="Empresa / Proyecto (opcional)"
                    id="company"
                    value={formState.company}
                    onChange={(v) => setFormState((s) => ({ ...s, company: v }))}
                  />

                  {/* Tipo de proyecto */}
                  <div>
                    <label className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase block mb-3">
                      Tipo de proyecto
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {PROJECT_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            setActiveType(type)
                            setFormState((s) => ({ ...s, type }))
                          }}
                          className={`px-4 py-2 rounded-full font-mono text-[10px] tracking-widest uppercase border transition-all
                            ${activeType === type
                              ? 'bg-pulse/10 border-pulse/40 text-pulse'
                              : 'border-white/10 text-zinc-600 hover:border-white/20 hover:text-zinc-400'
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label htmlFor="message"
                      className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase block mb-3">
                      Mensaje <span className="text-pulse">*</span>
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formState.message}
                      onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                      placeholder="Cuéntame sobre tu proyecto, timeline y objetivos..."
                      className="w-full bg-carbon border border-white/8 rounded-xl px-5 py-4 text-chrome
                        placeholder:text-zinc-700 font-sans text-sm leading-relaxed
                        focus:outline-none focus:border-white/20 focus:bg-ash transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-5 bg-chrome text-void rounded-xl font-mono text-[11px]
                      tracking-widest uppercase hover:bg-white transition-colors duration-300"
                  >
                    Enviar mensaje →
                  </button>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function FormField({
  label, id, type = 'text', required = false, value, onChange,
}: {
  label: string
  id: string
  type?: string
  required?: boolean
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label htmlFor={id}
        className="font-mono text-[10px] text-zinc-600 tracking-widest uppercase block mb-3">
        {label} {required && <span className="text-pulse">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-carbon border border-white/8 rounded-xl px-5 py-4 text-chrome
          placeholder:text-zinc-800 font-sans text-sm
          focus:outline-none focus:border-white/20 focus:bg-ash transition-all"
      />
    </div>
  )
}
