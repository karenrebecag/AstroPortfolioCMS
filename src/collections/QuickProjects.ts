import { CollectionConfig } from 'payload'

export const QuickProjects: CollectionConfig = {
  slug: 'quick-projects',
  labels: {
    singular: 'Quick Project',
    plural: 'Quick Projects',
  },

  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'projectType', 'status'],
    group: 'Content',
    description: 'Small projects displayed in homepage marquee',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Project title (e.g., "Ancient Tech Redesign")',
      },
    },
    {
      name: 'briefDescription',
      type: 'textarea',
      required: true,
      maxLength: 150,
      admin: {
        description: 'Short description (~120 characters)',
      },
    },
    {
      name: 'projectType',
      type: 'text',
      required: true,
      admin: {
        description: 'Main tag (e.g., "UI Redesign", "Vibe Code", "E-commerce")',
      },
    },
    {
      name: 'cardImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Background image for the card',
      },
    },
    {
      name: 'tags',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 3,
      admin: {
        description: 'Maximum 3 tags',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'visitUrl',
      type: 'text',
      required: true,
      admin: {
        description: 'Link for "Visit" button (Figma, GitHub, live site, etc.)',
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
