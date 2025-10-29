import { CollectionConfig } from 'payload'

export const Experiences: CollectionConfig = {
  slug: 'experiences',
  labels: {
    singular: 'Experience',
    plural: 'Experiences',
  },

  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'company', 'order', 'status'],
    group: 'Content',
    description: 'Professional experiences displayed in homepage marquee',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Job title (e.g., "UX/UI & Frontend Developer")',
      },
    },
    {
      name: 'company',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Company name and location (e.g., "OPINATOR (Madrid, Spain)")',
      },
    },
    {
      name: 'descriptionNormal',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Normal description text (first part of the description)',
      },
    },
    {
      name: 'descriptionHighlight',
      type: 'textarea',
      required: true,
      localized: true,
      admin: {
        description: 'Highlighted description text (emphasis part)',
      },
    },
    {
      name: 'href',
      type: 'text',
      required: true,
      admin: {
        description: 'Link for "Read More" button (URL or anchor)',
      },
    },
    {
      name: 'mainCompanyImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Company logo or main image',
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
