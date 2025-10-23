# Payload CMS - Karen's Portfolio

Este es el CMS (Content Management System) para el portfolio de Karen, construido con Payload CMS v3 y configurado para despliegue en Vercel.

## 🏗️ Arquitectura

Este proyecto está configurado como un **repositorio independiente** que se desplegará por separado del portfolio principal. Esto permite:

- Escalabilidad independiente del CMS y el frontend
- Actualizaciones del CMS sin recompilar el portfolio
- Mejor seguridad al mantener el admin panel en un dominio separado
- Facilidad para agregar diferentes frontends (web, mobile, etc.)

## 📦 Colecciones Disponibles

### 1. Projects (Proyectos)
Campos completos para gestionar proyectos del portfolio:
- **Título y slug** (auto-generado)
- **Descripción y contenido** rich-text con Lexical
- **Featured image** y galería de imágenes
- **Tecnologías** utilizadas
- **Links** (demo y GitHub)
- **Estado** (draft, published, archived)
- **Featured** checkbox para destacar en homepage
- **Fecha de publicación**
- **Versioning** y drafts habilitados

### 2. Media (Multimedia)
- Almacenamiento en Vercel Blob
- Múltiples tamaños automáticos (thumbnail, card, tablet, desktop)
- Alt text y captions

### 3. Users (Usuarios)
- Autenticación integrada
- Rate limiting y seguridad

## 🚀 Instalación Local

### 1. Instalar dependencias

```bash
pnpm install
```

### 2. Configurar base de datos

**Opción A: Vercel Postgres (Recomendado para desarrollo rápido)**

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Crea un nuevo proyecto Postgres Storage
3. Copia la `POSTGRES_URL` de las variables de entorno

**Opción B: Neon (Recomendado para producción)**

1. Registra una cuenta en [Neon.tech](https://neon.tech)
2. Crea un nuevo proyecto
3. Copia el connection string

**Opción C: Supabase**

1. Registra una cuenta en [Supabase](https://supabase.com)
2. Crea un nuevo proyecto
3. Copia el connection string de la configuración

### 3. Configurar variables de entorno

Copia `.env.example` a `.env.local` y configura:

```bash
# Base de datos
POSTGRES_URL=postgresql://user:password@host:5432/database

# Secret de Payload (generado con: openssl rand -base64 32)
PAYLOAD_SECRET=tu-secret-aqui

# URLs
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
FRONTEND_URL=http://localhost:4321

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=tu-token-aqui

NODE_ENV=development
```

### 4. Ejecutar migraciones

```bash
pnpm payload migrate
```

### 5. Iniciar servidor de desarrollo

```bash
pnpm dev
```

El CMS estará disponible en: `http://localhost:3000/admin`

### 6. Crear primer usuario administrador

Al acceder a `/admin` por primera vez, se te pedirá crear un usuario administrador.

## 📤 Despliegue en Vercel

### Paso 1: Preparar Base de Datos

1. **Crear base de datos en Neon o Vercel Postgres**
   - Neon: https://neon.tech (plan gratuito disponible)
   - Vercel Postgres: https://vercel.com/storage/postgres

2. **Crear Vercel Blob Storage**
   - Ve a: https://vercel.com/dashboard/stores
   - Crea un nuevo Blob Store
   - Copia el `BLOB_READ_WRITE_TOKEN`

### Paso 2: Configurar Vercel CLI

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Login
vercel login

# Deploy inicial (desde el directorio CMS)
vercel

# Sigue el wizard:
# - Setup and deploy: Yes
# - Scope: tu-cuenta
# - Link to existing project: No (primera vez)
# - Project name: portfolio-cms
# - Directory: ./
# - Override settings: No
```

### Paso 3: Configurar Variables de Entorno en Vercel

**Opción A: Por CLI**

```bash
vercel env add POSTGRES_URL production
vercel env add PAYLOAD_SECRET production
vercel env add PAYLOAD_PUBLIC_SERVER_URL production
vercel env add FRONTEND_URL production
vercel env add BLOB_READ_WRITE_TOKEN production
```

**Opción B: Por Dashboard**

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com)
2. Settings > Environment Variables
3. Añade cada variable para **Production, Preview y Development**:

```
POSTGRES_URL=postgresql://...
PAYLOAD_SECRET=tu-secret-seguro
PAYLOAD_PUBLIC_SERVER_URL=https://tu-cms.vercel.app
FRONTEND_URL=https://port25karen.vercel.app
BLOB_READ_WRITE_TOKEN=vercel_blob_...
NODE_ENV=production
```

### Paso 4: Ejecutar Migraciones en Producción

```bash
# Desde tu repositorio local, conectado al proyecto Vercel
vercel exec -- pnpm payload migrate
```

### Paso 5: Desplegar a Producción

```bash
vercel --prod
```

### Paso 6: Configurar Dominio Personalizado (Opcional)

En Vercel Dashboard:
- Settings > Domains > Add Domain
- Ejemplo: `cms.karenortiz.com`

## 🔗 Conectar con el Portfolio Astro

### 1. En el portfolio, crea un archivo de utilidad

Crea `src/lib/payload.ts` en tu proyecto Astro principal siguiendo la guía completa.

### 2. Usa en páginas Astro

```astro
---
import { payloadClient } from '@/lib/payload'

// Obtener proyectos destacados
const { docs: projects } = await payloadClient.getProjects({
  featured: true,
  limit: 6
})
---

<div class="projects-grid">
  {projects.map(project => (
    <ProjectCard {...project} />
  ))}
</div>
```

## 🔐 Seguridad

Este proyecto incluye:

- **Rate Limiting**: 100 peticiones por ventana de 15 minutos
- **CORS configurado**: Solo permite peticiones desde dominios autorizados
- **CSRF Protection**: Protección contra ataques de falsificación de peticiones
- **Versioning**: Historial de cambios para todas las colecciones
- **Auth integrada**: Sistema de autenticación con usuarios y roles

## 📝 Siguientes Pasos

### Desarrollo Local

1. ✅ Instalar dependencias
2. ✅ Configurar base de datos
3. ✅ Ejecutar migraciones
4. ✅ Crear usuario admin
5. ⏳ Agregar contenido de prueba en `/admin`
6. ⏳ Probar API en `/api/projects`
7. ⏳ Integrar con portfolio Astro

### Despliegue

1. ⏳ Crear base de datos en Neon/Vercel
2. ⏳ Crear Vercel Blob Storage
3. ⏳ Configurar variables de entorno en Vercel
4. ⏳ Hacer push al repositorio GitHub
5. ⏳ Conectar proyecto en Vercel Dashboard
6. ⏳ Ejecutar migraciones en producción
7. ⏳ Desplegar a producción
8. ⏳ Configurar dominio personalizado (opcional)

## 🛠️ Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia servidor de desarrollo
pnpm devsafe          # Limpia .next y inicia dev

# Build y Deploy
pnpm build            # Construye para producción
pnpm start            # Inicia servidor de producción
pnpm ci               # Ejecuta migraciones y build (para CI/CD)

# Payload CLI
pnpm payload migrate:create  # Crea nueva migración
pnpm payload migrate         # Ejecuta migraciones pendientes
pnpm generate:types          # Genera tipos de TypeScript
pnpm generate:importmap      # Genera import map

# Testing
pnpm test             # Ejecuta todos los tests
pnpm test:int         # Tests de integración
pnpm test:e2e         # Tests end-to-end

# Code Quality
pnpm lint             # Ejecuta ESLint
```

## 📚 Recursos

- [Payload CMS Docs](https://payloadcms.com/docs)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob)
- [Guía Completa de Implementación](../../../../../../Guía%20Completa_%20Implementar%20Payload%20CMS%20y%20Desplegar.md)

## 🐛 Troubleshooting

### Error: "Cannot connect to database"
- Verifica que `POSTGRES_URL` está correctamente configurada
- Asegúrate de que tu IP está en la whitelist (Neon/Supabase)
- Verifica que la base de datos existe

### Error: "BLOB_READ_WRITE_TOKEN is not set"
- Crea un Vercel Blob Storage en el dashboard
- Copia el token a `.env.local`

### Error de CORS en el frontend
- Verifica que `FRONTEND_URL` está en la configuración de CORS
- Verifica que `PAYLOAD_PUBLIC_SERVER_URL` es correcta
- En desarrollo, usa `http://localhost:4321` exactamente

### Las imágenes no se muestran
- Verifica que `BLOB_READ_WRITE_TOKEN` está configurado
- En producción, asegúrate de usar el token de producción
- Verifica que el storage está conectado al proyecto Vercel

## 📦 Estructura del Proyecto

```
CMS/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (frontend)/        # Frontend público (opcional)
│   │   └── (payload)/         # Admin panel y API
│   ├── collections/           # Colecciones de Payload
│   │   ├── Users.ts
│   │   ├── Projects.ts
│   │   └── Media.ts
│   ├── migrations/            # Migraciones de base de datos
│   ├── payload.config.ts      # Configuración principal
│   └── payload-types.ts       # Tipos auto-generados
├── tests/                     # Tests E2E e integración
├── .env.local                 # Variables de entorno (no commitear)
├── .env.example              # Template de variables
├── package.json
├── tsconfig.json
└── vercel.json               # Configuración de Vercel (si necesario)
```

---

**🚀 Generado con Claude Code**

Para más información o soporte, consulta la [guía completa de implementación](../../../../../../Guía%20Completa_%20Implementar%20Payload%20CMS%20y%20Desplegar.md).
