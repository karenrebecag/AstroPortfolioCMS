import { CollectionConfig } from 'payload'

// Hook para rebuild de Astro
const triggerAstroRebuild = async () => {
  // Si tienes un webhook de Vercel/Netlify para rebuild
  const rebuildWebhook = process.env.ASTRO_REBUILD_WEBHOOK

  if (rebuildWebhook) {
    try {
      await fetch(rebuildWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      console.log('✅ Astro rebuild triggered')
    } catch (error) {
      console.error('❌ Failed to trigger Astro rebuild:', error)
    }
  }
}

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

  // Hooks de colección
  hooks: {
    afterChange: [
      async ({ operation }) => {
        // Trigger rebuild solo en create/update, no en delete
        if (operation === 'create' || operation === 'update') {
          await triggerAstroRebuild()
        }
      },
    ],
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

    // ========================================
    // 📊 MÉTRICAS DEL PROYECTO
    // ========================================
    {
      name: 'metrics',
      type: 'array',
      label: 'Project Metrics',
      admin: {
        description: 'Key metrics and achievements for this project',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., Performance Improvement',
          },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'e.g., 85%',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            placeholder: 'Additional context about this metric',
          },
        },
      ],
    },

    // ========================================
    // 🔍 SEO & OPEN GRAPH
    // ========================================
    {
      name: 'seo',
      type: 'group',
      label: 'SEO & Meta Tags',
      admin: {
        description: 'Optimize how this project appears in search engines and social media',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Meta Title',
          admin: {
            description: 'SEO title (50-60 characters recommended)',
            placeholder: 'Leave empty to use project title',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Meta Description',
          admin: {
            description: 'SEO description (150-160 characters recommended)',
            placeholder: 'Compelling description for search results',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          label: 'Open Graph Image',
          relationTo: 'media',
          admin: {
            description: 'Image for social media sharing (1200x630px recommended)',
          },
        },
        {
          name: 'keywords',
          type: 'array',
          label: 'Keywords',
          admin: {
            description: 'SEO keywords for this project',
          },
          fields: [
            {
              name: 'keyword',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
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
