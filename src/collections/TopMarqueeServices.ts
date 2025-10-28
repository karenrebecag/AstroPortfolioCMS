import { CollectionConfig } from 'payload'
import { triggerAstroRevalidation } from '../lib/revalidate'

export const TopMarqueeServices: CollectionConfig = {
  slug: 'top-marquee-services',
  labels: {
    singular: 'Top Marquee Service',
    plural: 'Top Marquee Services',
  },

  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  admin: {
    useAsTitle: 'text',
    defaultColumns: ['text', 'order', 'status'],
    group: 'Content',
    description: 'Services/texts displayed in the top marquee banner',
  },

  // Hooks de colección
  hooks: {
    afterChange: [
      async ({ operation, doc }) => {
        console.log('🔥 TopMarqueeServices afterChange hook triggered!', { operation, docId: doc?.id })
        if (operation === 'create' || operation === 'update') {
          console.log('🚀 Triggering Astro revalidation...')
          await triggerAstroRevalidation(['/'])
          console.log('✅ Revalidation call completed')
        }
      },
    ],
  },

  fields: [
    {
      name: 'text',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Service text (e.g., "UX/UI Design & Frontend Development")',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Display order (lower numbers appear first)',
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],

  timestamps: true,
}
