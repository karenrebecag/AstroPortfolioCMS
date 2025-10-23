import { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',

  // Control de acceso
  access: {
    // Lectura pública (para tu portfolio)
    read: () => true,
    // Escritura solo usuarios autenticados
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  // Configuración del admin panel
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedDate'],
    group: 'Content',
  },

  // Campos de la colección
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true, // Soporte multi-idioma
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === 'create' && data?.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
          },
        ],
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'text',
        },
      ],
    },
    {
      name: 'demoUrl',
      type: 'text',
      admin: {
        placeholder: 'https://demo.example.com',
      },
    },
    {
      name: 'githubUrl',
      type: 'text',
      admin: {
        placeholder: 'https://github.com/user/repo',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Show in homepage featured section',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
  ],

  // Versiones y drafts
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },

  // Timestamps automáticos
  timestamps: true,
}
