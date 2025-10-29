import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { QuickProjects } from './collections/QuickProjects'
import { Services } from './collections/Services'
import { HomeFAQs } from './collections/HomeFAQs'
import { Experiences } from './collections/Experiences'
import { TopMarqueeServices } from './collections/TopMarqueeServices'
import { migrations } from './migrations'
import { deployEndpoint } from './endpoints/deploy'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // URL completa de tu CMS desplegado en Vercel
  serverURL:
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),

  // Secret para encriptación
  secret: process.env.PAYLOAD_SECRET || '',

  // Configuración del panel admin
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- Portfolio CMS',
    },
    components: {
      beforeDashboard: ['@/components/DeployButton#DeployButton'],
    },
  },

  // Colecciones (tus tipos de contenido)
  collections: [
    Users,
    Projects,
    QuickProjects,
    Services,
    HomeFAQs,
    Experiences,
    TopMarqueeServices,
    Media,
  ],

  // Endpoints personalizados
  endpoints: [deployEndpoint],

  // Editor de texto enriquecido
  editor: lexicalEditor(),

  // Localization (i18n) - Compatible con tu sistema de traducciones
  localization: {
    locales: [
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'es',
        label: 'Español',
      },
      {
        code: 'fr',
        label: 'Français',
      },
      {
        code: 'hi',
        label: 'हिन्दी (Hindi)',
      },
      {
        code: 'ja',
        label: '日本語 (Japanese)',
      },
      {
        code: 'zh',
        label: '中文 (Chinese Simplified)',
      },
      {
        code: 'zh-TW',
        label: '繁體中文 (Chinese Traditional)',
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },

  // TypeScript: Genera tipos automáticamente
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // Configuración de base de datos
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
    // CRÍTICO: Desactiva auto-push en producción
    push: process.env.NODE_ENV === 'development',
    // Migraciones para producción
    prodMigrations: migrations,
  }),

  // CORS: Permite peticiones desde tu portfolio
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:4321',
    'https://port25karen.vercel.app',
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ],

  // CSRF protection
  csrf: [
    process.env.FRONTEND_URL || 'http://localhost:4321',
    'https://port25karen.vercel.app',
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
  ],

  // GraphQL habilitado
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },

  // Límites de seguridad
  maxDepth: 5,

  // Plugin de almacenamiento
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
