import { defineType, defineField } from 'sanity'

export const aboutSchema = defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 8 }),
    defineField({ name: 'portrait', title: 'Portrait Photo', type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'skills', title: 'Skills', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'category', type: 'string', title: 'Category' },
          { name: 'items', type: 'array', of: [{ type: 'string' }], title: 'Items' },
        ],
      }],
    }),
    defineField({
      name: 'experience', title: 'Work Experience', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'role', type: 'string', title: 'Role' },
          { name: 'company', type: 'string', title: 'Company' },
          { name: 'period', type: 'string', title: 'Period' },
          { name: 'description', type: 'text', title: 'Description' },
        ],
      }],
    }),
    defineField({
      name: 'education', title: 'Education', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'degree', type: 'string', title: 'Degree' },
          { name: 'institution', type: 'string', title: 'Institution' },
          { name: 'year', type: 'number', title: 'Year' },
        ],
      }],
    }),
    defineField({
      name: 'awards', title: 'Awards & Recognition', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', type: 'string', title: 'Award' },
          { name: 'organization', type: 'string', title: 'Organization' },
          { name: 'year', type: 'number', title: 'Year' },
        ],
      }],
    }),
    defineField({
      name: 'clients', title: 'Clients', type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string', title: 'Name' },
          { name: 'logo', type: 'image', title: 'Logo' },
        ],
      }],
    }),
    defineField({ name: 'resumeFile', title: 'Resume PDF', type: 'file', options: { accept: '.pdf' } }),
  ],
})
