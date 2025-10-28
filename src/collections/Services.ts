import { CollectionConfig } from 'payload'
import { triggerAstroRevalidation } from '../lib/revalidate'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },

  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  admin: {
    useAsTitle: 'title1',
    defaultColumns: ['title1', 'title2', 'status'],
    group: 'Content',
    description: 'Services displayed in homepage Services Island',
  },

  hooks: {
    afterChange: [
      async ({ operation }) => {
        if (operation === 'create' || operation === 'update') {
          await triggerAstroRevalidation(['/'])
        }
      },
    ],
  },

  fields: [
    {
      name: 'title1',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'First line of title (e.g., "UX/UI Design")',
      },
    },
    {
      name: 'title2',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Second line of title (e.g., "& Engineering")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Service description',
      },
    },
    {
      name: 'serviceTags',
      type: 'array',
      required: true,
      admin: {
        description: 'Service-related tags (unlimited)',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            placeholder: 'e.g., User Interface, Design Systems',
          },
        },
      ],
    },
    {
      name: 'techTags',
      type: 'array',
      required: true,
      admin: {
        description: 'Technologies & Tools used (unlimited)',
      },
      fields: [
        {
          name: 'tech',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            placeholder: 'e.g., Figma, React, TypeScript',
          },
        },
      ],
    },
    {
      name: 'exampleProject',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Optional: Example project description',
      },
    },
    {
      name: 'images',
      type: 'array',
      maxRows: 4,
      admin: {
        description: 'Optional: Maximum 4 images for BounceCards',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
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
