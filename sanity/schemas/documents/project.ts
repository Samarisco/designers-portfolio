import { defineType, defineField } from 'sanity'

export const projectSchema = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', validation: (r) => r.required().max(120) }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 5 }),
    defineField({
      name: 'category', title: 'Category', type: 'string',
      options: { list: ['furniture', 'electronics', 'automotive', 'packaging', 'medical', 'consumer', 'spatial', 'experimental'] },
    }),
    defineField({
      name: 'status', title: 'Status', type: 'string',
      options: { list: ['concept', 'prototype', 'production', 'awarded'] },
    }),
    defineField({ name: 'year', title: 'Year', type: 'number', validation: (r) => r.required().min(2000).max(2100) }),
    defineField({ name: 'client', title: 'Client', type: 'string' }),
    defineField({ name: 'role', title: 'My Role', type: 'string' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', title: 'Alt text', type: 'string' }] }),
    defineField({ name: 'images', title: 'Image Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt' }] }] }),
    defineField({ name: 'model3d', title: '3D Model (GLB/GLTF)', type: 'file', options: { accept: '.glb,.gltf' } }),
    defineField({ name: 'hdriEnvironment', title: 'HDRI Environment', type: 'string', options: { list: ['studio', 'city', 'park', 'forest', 'sunset', 'night'] } }),
    defineField({
      name: 'materials', title: 'Materials', type: 'array',
      of: [{ type: 'object', fields: [{ name: 'name', type: 'string', title: 'Name' }, { name: 'description', type: 'string', title: 'Description' }, { name: 'color', type: 'string', title: 'Color (hex)' }] }],
    }),
    defineField({
      name: 'technologies', title: 'Technologies', type: 'array',
      of: [{ type: 'object', fields: [{ name: 'name', type: 'string', title: 'Name' }, { name: 'category', type: 'string', title: 'Category', options: { list: ['software', 'process', 'material', 'manufacturing'] } }] }],
    }),
    defineField({
      name: 'timeline', title: 'Project Timeline', type: 'array',
      of: [{ type: 'object', fields: [{ name: 'date', type: 'string', title: 'Date' }, { name: 'title', type: 'string', title: 'Title' }, { name: 'description', type: 'text', title: 'Description' }, { name: 'milestone', type: 'boolean', title: 'Milestone', initialValue: false }] }],
    }),
    defineField({
      name: 'dimensions', title: 'Dimensions', type: 'object',
      fields: [{ name: 'width', type: 'number', title: 'W' }, { name: 'height', type: 'number', title: 'H' }, { name: 'depth', type: 'number', title: 'D' }, { name: 'unit', type: 'string', title: 'Unit', options: { list: ['mm', 'cm', 'm', 'in'] } }],
    }),
    defineField({ name: 'weight', title: 'Weight', type: 'string' }),
    defineField({ name: 'awards', title: 'Awards', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }], options: { layout: 'tags' } }),
    defineField({
      name: 'seo', title: 'SEO', type: 'object',
      fields: [{ name: 'title', type: 'string', title: 'Meta Title' }, { name: 'description', type: 'text', title: 'Meta Description' }, { name: 'ogImage', type: 'image', title: 'OG Image' }],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'year', media: 'coverImage' },
    prepare: ({ title, subtitle, media }: { title: string; subtitle: number; media: unknown }) => ({
      title,
      subtitle: subtitle?.toString(),
      media,
    }),
  },
  orderings: [
    { title: 'Year (Newest)', name: 'yearDesc', by: [{ field: 'year', direction: 'desc' }] },
    { title: 'Featured First', name: 'featured', by: [{ field: 'featured', direction: 'desc' }] },
  ],
})
