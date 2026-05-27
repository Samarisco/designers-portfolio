import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemas'
import { SANITY_CONFIG } from '../src/config'

export default defineConfig({
  name: 'portfolio',
  title: 'Portfolio CMS',
  projectId: SANITY_CONFIG.projectId,
  dataset: SANITY_CONFIG.dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Projects').schemaType('project').child(S.documentTypeList('project')),
            S.divider(),
            S.listItem().title('About Page').schemaType('about').child(S.document().schemaType('about').documentId('about')),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
})
