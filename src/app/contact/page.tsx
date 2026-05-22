import type { Metadata } from 'next'
import { ContactClient } from './ContactClient'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Hablemos sobre tu próximo proyecto de diseño.',
}

export default function ContactPage() {
  return <ContactClient />
}
