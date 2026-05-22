import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/config'

// import { sanityClient, queries } from '@/lib/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]

  // Dynamic project pages
  // const projects = await sanityClient.fetch<{ slug: string; _updatedAt: string }[]>(queries.projectsForSitemap)
  // const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
  //   url: `${baseUrl}/projects/${p.slug}`,
  //   lastModified: new Date(p._updatedAt),
  //   changeFrequency: 'monthly',
  //   priority: 0.8,
  // }))

  return [...staticPages /* , ...projectPages */]
}
