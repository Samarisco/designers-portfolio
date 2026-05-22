import type { Metadata, Viewport } from 'next'
import { SITE_CONFIG } from '@/config'
import '@/styles/globals.css'
import { Providers } from '@/components/layout/Providers'
import { Navigation } from '@/components/layout/Navigation'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { NoiseOverlay } from '@/components/ui'
import { PageTransition } from '@/components/layout/PageTransition'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['diseño industrial', 'modelado 3D', 'art toys', 'portafolio', 'diseñador', 'México'],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: SITE_CONFIG.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="bg-obsidian text-chrome antialiased">
        <Providers>
          <NoiseOverlay />
          <CustomCursor />
          <Navigation />
          <PageTransition>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </PageTransition>
        </Providers>
      </body>
    </html>
  )
}
