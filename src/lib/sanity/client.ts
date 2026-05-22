import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage } from '@/types'
import { SANITY_CONFIG } from '@/config'

export const sanityClient = createClient({
  projectId: SANITY_CONFIG.projectId,
  dataset: SANITY_CONFIG.dataset,
  apiVersion: SANITY_CONFIG.apiVersion,
  useCdn: SANITY_CONFIG.useCdn,
  perspective: 'published',
  stega: {
    enabled: false,
  },
})

const builder = imageUrlBuilder(sanityClient)

export function urlForImage(source: SanityImage) {
  return builder.image(source)
}

export function urlForImageWithDimensions(
  source: SanityImage,
  width: number,
  height?: number
) {
  const base = builder.image(source).width(width).auto('format').fit('crop')
  return height ? base.height(height).url() : base.url()
}

// ============================================================
// GROQ QUERIES
// ============================================================
export const queries = {
  allProjects: `
    *[_type == "project"] | order(year desc) {
      _id,
      _createdAt,
      title,
      slug,
      tagline,
      category,
      status,
      year,
      featured,
      tags,
      "coverImage": coverImage {
        asset,
        alt,
        hotspot
      }
    }
  `,

  featuredProjects: `
    *[_type == "project" && featured == true] | order(year desc)[0...6] {
      _id,
      title,
      slug,
      tagline,
      category,
      year,
      "coverImage": coverImage {
        asset,
        alt,
        hotspot
      }
    }
  `,

  projectBySlug: `
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      _createdAt,
      title,
      slug,
      tagline,
      description,
      category,
      status,
      year,
      client,
      role,
      featured,
      tags,
      awards,
      dimensions,
      weight,
      "coverImage": coverImage { asset, alt, hotspot },
      "images": images[] { asset, alt, hotspot },
      "model3d": model3d { asset->{ url } },
      hdriEnvironment,
      materials,
      technologies,
      timeline,
      seo
    }
  `,

  aboutPage: `
    *[_type == "about"][0] {
      _id,
      name,
      tagline,
      bio,
      "portrait": portrait { asset, alt },
      skills,
      experience,
      education,
      awards,
      "clients": clients[] {
        name,
        "logo": logo { asset }
      },
      "resumeFile": resumeFile { asset->{ url } }
    }
  `,

  projectSlugs: `
    *[_type == "project"] { "slug": slug.current }
  `,

  projectsForSitemap: `
    *[_type == "project"] {
      "slug": slug.current,
      _updatedAt
    }
  `,
} as const
