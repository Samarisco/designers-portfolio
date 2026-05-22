import type { Metadata } from 'next'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedProjectsSection } from '@/components/sections/FeaturedProjectsSection'
import { AboutTeaserSection, DisciplinesSection } from '@/components/sections/AboutTeaserSection'
import { ContactCTASection, Footer } from '@/components/sections/ContactCTASection'
import { SITE_CONFIG } from '@/config'

// Optional: fetch from Sanity if connected
// import { sanityClient, queries } from '@/lib/sanity/client'
// import type { Project } from '@/types'

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.title}`,
  description: SITE_CONFIG.description,
}

export default async function HomePage() {
  // Uncomment when Sanity is configured:
  // const projects = await sanityClient.fetch<Project[]>(queries.featuredProjects)

  return (
    <>
      <HeroSection />
      <FeaturedProjectsSection /* projects={projects} */ />
      <AboutTeaserSection />
      <DisciplinesSection />
      <ContactCTASection />
      <Footer />
    </>
  )
}
