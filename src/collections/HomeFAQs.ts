import { CollectionConfig } from 'payload'

export const HomeFAQs: CollectionConfig = {
  slug: 'home-faqs',
  labels: {
    singular: 'Homepage FAQ',
    plural: 'Homepage FAQs',
  },

  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'order', 'status'],
    group: 'Content',
    description: 'Global FAQs displayed in homepage FAQs Island',
  },

  defaultSort: 'order',

  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      admin: {
        description: 'FAQ question',
      },
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      admin: {
        description: 'FAQ answer',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 1,
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
