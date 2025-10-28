import { CollectionConfig } from 'payload'
import { triggerAstroRevalidation } from '../lib/revalidate'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'Project',
    plural: 'Projects',
  },

  // Control de acceso
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },

  // Configuración del admin panel
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'featured', 'createdAt'],
    group: 'Content',
  },

  // Hooks de colección
  hooks: {
    beforeValidate: [
      ({ data, operation }) => {
        // Auto-generar slug del título
        if (operation === 'create' && data?.title && !data?.slug) {
          data.slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        }
        return data
      },
    ],
    afterChange: [
      async ({ operation }) => {
        if (operation === 'create' || operation === 'update') {
          await triggerAstroRevalidation()
        }
      },
    ],
  },

  // Campos de la colección
  fields: [
    // ========================================
    // METADATOS GLOBALES
    // ========================================
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Project Title',
      admin: {
        description: 'Main title for the project (used in homepage and case study)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
        description: 'URL-friendly version of title (auto-generated)',
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

    // ========================================
    // HOMEPAGE PREVIEW DATA
    // ========================================
    {
      type: 'collapsible',
      label: 'Homepage Preview',
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: 'briefDescription',
          type: 'textarea',
          required: true,
          localized: true,
          admin: {
            description: 'Short description shown in homepage ProjectsIsland',
          },
        },
        {
          name: 'mainImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Main image (shown on hover in homepage + used in Article Section)',
          },
        },
      ],
    },

    // ========================================
    // STRIP 1: ARTICLE BANNER
    // ========================================
    {
      type: 'collapsible',
      label: '📄 Strip 1: Article Banner',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'mainTag',
          type: 'text',
          required: true,
          localized: true,
          defaultValue: 'Web Development',
          admin: {
            description: 'Main category tag (e.g., "Web Development", "UI Design")',
          },
        },
        {
          name: 'uploadDate',
          type: 'date',
          required: true,
          defaultValue: () => new Date().toISOString(),
          admin: {
            description: 'Publication date (auto-set to today)',
            date: {
              displayFormat: 'MM/dd/yyyy',
            },
          },
        },
        {
          name: 'authorImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Author profile image',
          },
        },
        {
          name: 'authorName',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Post by: Author name',
          },
        },
      ],
    },

    // ========================================
    // STRIP 2: ARTICLE SECTION
    // ========================================
    {
      type: 'collapsible',
      label: '📝 Strip 2: Article Section',
      admin: {
        initCollapsed: true,
        description: 'Main content sections with text and images',
      },
      fields: [
        {
          name: 'articleSections',
          type: 'array',
          label: 'Content Sections',
          admin: {
            description: 'Add multiple content sections with headings and paragraphs',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'paragraphs',
              type: 'richText',
              required: true,
              localized: true,
            },
          ],
        },
        {
          name: 'quote',
          type: 'group',
          label: 'Quote Container',
          fields: [
            {
              name: 'text',
              type: 'textarea',
              required: true,
              localized: true,
            },
            {
              name: 'author',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },

    // ========================================
    // STRIP 3: HORIZONTAL SCROLL GALLERY
    // ========================================
    {
      type: 'collapsible',
      label: '🖼️ Strip 3: Horizontal Scroll Gallery',
      admin: {
        initCollapsed: true,
        description: 'Infinite scroll gallery with images',
      },
      fields: [
        {
          name: 'galleryImages',
          type: 'array',
          label: 'Gallery Images',
          admin: {
            description: 'Add unlimited images for the horizontal scrolling gallery',
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
      ],
    },

    // ========================================
    // STRIP 4: TECH STACK
    // ========================================
    {
      type: 'collapsible',
      label: '⚙️ Strip 4: Tech Stack',
      admin: {
        initCollapsed: true,
        description: 'Technologies used in this project',
      },
      fields: [
        {
          name: 'techStack',
          type: 'array',
          label: 'Technologies',
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                description: 'Technology name (e.g., "React", "TypeScript")',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                description: 'Brief description of how this tech was used',
              },
            },
          ],
        },
      ],
    },

    // ========================================
    // STRIP 5: PROCESS WORKFLOW
    // ========================================
    {
      type: 'collapsible',
      label: '🔄 Strip 5: Process Workflow',
      admin: {
        initCollapsed: true,
        description: 'Step-by-step process workflow',
      },
      fields: [
        {
          name: 'workflowSteps',
          type: 'array',
          label: 'Workflow Steps',
          admin: {
            description: 'Step numbers (Step 1, Step 2...) are auto-generated',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                description: 'Step title',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                description: 'Step description',
              },
            },
          ],
        },
      ],
    },

    // ========================================
    // STRIP 6: PROJECT ACHIEVEMENTS
    // ========================================
    {
      type: 'collapsible',
      label: '🏆 Strip 6: Project Achievements',
      admin: {
        initCollapsed: true,
        description: 'Key achievements and results (max 4)',
      },
      fields: [
        {
          name: 'achievements',
          type: 'array',
          label: 'Achievements',
          maxRows: 4,
          admin: {
            description: 'Maximum 4 achievement accordions',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                description: 'Achievement title',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
              localized: true,
              admin: {
                description: 'Achievement description',
              },
            },
          ],
        },
      ],
    },

    // ========================================
    // STRIP 7: FINAL ACHIEVEMENTS
    // ========================================
    {
      type: 'collapsible',
      label: '✅ Strip 7: Final Achievements',
      admin: {
        initCollapsed: true,
        description: 'Final summary with tags',
      },
      fields: [
        {
          name: 'finalTitle',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'Final section title',
          },
        },
        {
          name: 'finalTags',
          type: 'array',
          label: 'Tags',
          admin: {
            description: 'Add as many tags as needed (also used in homepage)',
          },
          fields: [
            {
              name: 'tag',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },

    // ========================================
    // STRIP 8: TEMPLATE FAQs
    // ========================================
    {
      type: 'collapsible',
      label: '❓ Strip 8: Project FAQs',
      admin: {
        initCollapsed: true,
        description: 'FAQs specific to this project',
      },
      fields: [
        {
          name: 'templateFAQs',
          type: 'array',
          label: 'FAQs',
          admin: {
            description: 'Add project-specific frequently asked questions',
          },
          fields: [
            {
              name: 'question',
              type: 'text',
              required: true,
              localized: true,
            },
            {
              name: 'answer',
              type: 'textarea',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },

    // ========================================
    // SEO & METADATA
    // ========================================
    {
      type: 'collapsible',
      label: '🔍 SEO & Meta Tags',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'seo',
          type: 'group',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              localized: true,
              admin: {
                description: 'SEO title (50-60 characters recommended, leave empty to use project title)',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              localized: true,
              admin: {
                description: 'SEO description (150-160 characters recommended)',
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Open Graph image for social sharing (1200x630px recommended)',
              },
            },
            {
              name: 'keywords',
              type: 'array',
              fields: [
                {
                  name: 'keyword',
                  type: 'text',
                  required: true,
                  localized: true,
                },
              ],
            },
          ],
        },
      ],
    },

    // ========================================
    // MÉTRICAS (Opcional)
    // ========================================
    {
      type: 'collapsible',
      label: '📊 Metrics',
      admin: {
        initCollapsed: true,
        description: 'Optional project metrics and KPIs',
      },
      fields: [
        {
          name: 'metrics',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                placeholder: 'e.g., Performance Improvement',
              },
            },
            {
              name: 'value',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                placeholder: 'e.g., 85%',
              },
            },
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              admin: {
                placeholder: 'Additional context about this metric',
              },
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
