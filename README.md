# Portfolio — Industrial Design

Premium industrial design portfolio built with Next.js 15, Three.js/R3F, Framer Motion, and Sanity CMS.

## Stack

- **Framework**: Next.js 15 (App Router, RSC)
- **3D**: React Three Fiber + Drei + Postprocessing
- **Animation**: Framer Motion + GSAP + Lenis
- **CMS**: Sanity v3
- **Styling**: Tailwind CSS v3
- **Language**: TypeScript (strict)

## Project Structure

```
src/
├── app/                      # Next.js App Router pages
│   ├── page.tsx              # Home
│   ├── projects/             # Projects listing + [slug] detail
│   ├── about/                # About page
│   ├── contact/              # Contact page
│   └── sitemap.ts            # Auto-generated sitemap
├── components/
│   ├── 3d/                   # Three.js / R3F components
│   │   └── ModelViewer.tsx   # Main 3D viewer (GLTF, bloom, orbit)
│   ├── layout/               # Navigation, Providers, PageTransition
│   ├── sections/             # Page sections (Hero, Projects, About...)
│   └── ui/                   # Design system primitives
├── config/                   # Design tokens, constants, site config
├── lib/
│   ├── sanity/               # Sanity client + GROQ queries
│   ├── hooks/                # Custom React hooks
│   └── animations/           # Shared animation configs
├── styles/
│   └── globals.css           # Design system CSS variables
└── types/                    # Global TypeScript types

sanity/
├── schemas/
│   ├── documents/            # project.ts, about.ts
│   └── index.ts
└── sanity.config.ts
```

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
# Fill in NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN

# 3. Run development server
npm run dev

# 4. Run Sanity Studio (in separate terminal)
npm run sanity
```

## Sanity Setup

1. Create a project at [sanity.io](https://sanity.io)
2. Copy your Project ID to `.env.local`
3. Create an API token with read access
4. Run `npm run sanity` to open the Studio
5. Add your projects via the CMS

## 3D Models

- Place GLB/GLTF models in `public/models/`
- Upload via Sanity Studio for production use
- Models are Draco-compressed automatically by Drei
- Supported formats: `.glb`, `.gltf`

## Performance Targets

- Lighthouse Score: 95+
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- WebGL uses AdaptiveDpr for device-appropriate quality

## Customization

### Design Tokens
Edit `src/config/index.ts` and `src/styles/globals.css`

### Site Info
Edit `SITE_CONFIG` in `src/config/index.ts`:
```ts
export const SITE_CONFIG = {
  name: 'Your Name',
  title: 'Your Title',
  email: 'hello@yourdomain.com',
  ...
}
```

### Colors
The palette uses a void/carbon/chrome/pulse system.
Override in `tailwind.config.ts` and CSS variables.

### Fonts
Currently configured for Neue Haas Grotesk (body) + PP Editorial New (display).
Replace with your licensed fonts via Next.js font loading.

## Deployment

```bash
npm run build
npm run start
```

Deploy to Vercel for optimal performance with Next.js 15.
