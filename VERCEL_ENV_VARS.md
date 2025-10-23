# Variables de Entorno para Vercel

## 📋 Variables Requeridas

Configura estas variables en **Vercel Dashboard > Settings > Environment Variables**

### 1. POSTGRES_URL (REQUERIDO)
**Descripción**: Connection string de tu base de datos PostgreSQL

**Cómo obtenerla:**

#### Opción A: Vercel Postgres (Recomendado para empezar rápido)
1. Ve a tu proyecto en Vercel Dashboard
2. Clic en "Storage" > "Create Database" > "Postgres"
3. Vercel creará automáticamente la variable `POSTGRES_URL`
4. ✅ **Ya está configurada automáticamente**

#### Opción B: Neon (Recomendado para producción)
1. Ve a https://neon.tech
2. Crea una cuenta gratuita
3. Crea un nuevo proyecto
4. Ve a "Dashboard" > Copia el "Connection String"
5. Formato: `postgresql://user:password@host.neon.tech/dbname?sslmode=require`

#### Opción C: Supabase
1. Ve a https://supabase.com
2. Crea una cuenta
3. Crea un nuevo proyecto
4. Ve a "Settings" > "Database" > "Connection String" > "URI"
5. Formato: `postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres`

**Valor ejemplo:**
```
postgresql://myuser:mypassword@ep-cool-darkness-123456.us-east-2.aws.neon.tech/mydb?sslmode=require
```

**Environments**: ✅ Production, ✅ Preview, ✅ Development

---

### 2. PAYLOAD_SECRET (REQUERIDO)
**Descripción**: Secret key para encriptación de Payload CMS

**Cómo generarla:**
```bash
openssl rand -base64 32
```

**Valor ejemplo:**
```
OvlO3b1a+Z/MizrXr9v5swqT81jhhQZhW9NzaPNN47Y=
```

⚠️ **IMPORTANTE**:
- Usa un valor diferente para producción
- NUNCA compartas este valor
- Genera uno nuevo para cada environment

**Environments**: ✅ Production, ✅ Preview, ✅ Development

---

### 3. BLOB_READ_WRITE_TOKEN (REQUERIDO)
**Descripción**: Token para Vercel Blob Storage (almacenamiento de imágenes/archivos)

**Cómo obtenerlo:**
1. Ve a Vercel Dashboard
2. Clic en tu proyecto
3. "Storage" > "Create Database" > "Blob"
4. Copia el token que aparece después de crear
5. O ve a "Settings" > "Environment Variables" y busca `BLOB_READ_WRITE_TOKEN`

**Valor ejemplo:**
```
vercel_blob_rw_abc123def456_xyz789
```

⚠️ **IMPORTANTE**: Sin este token, no podrás subir imágenes

**Environments**: ✅ Production, ✅ Preview, ✅ Development

---

### 4. PAYLOAD_PUBLIC_SERVER_URL (REQUERIDO)
**Descripción**: URL pública donde estará desplegado tu CMS

**Para Production:**
```
https://tu-cms.vercel.app
```

**Para Preview:**
```
https://git-branch-name-tu-cms.vercel.app
```

**Para Development:**
```
http://localhost:3000
```

⚠️ **IMPORTANTE**:
- Usa la URL de tu proyecto de Vercel
- Sin trailing slash al final
- Actualiza después del primer deploy si usas dominio personalizado

**Environments**: ✅ Production, ✅ Preview, ✅ Development

---

### 5. FRONTEND_URL (REQUERIDO)
**Descripción**: URL de tu portfolio Astro (para configuración de CORS)

**Para Production:**
```
https://port25karen.vercel.app
```

**Para Preview:**
```
https://port25karen-git-branch-name.vercel.app
```

**Para Development:**
```
http://localhost:4321
```

**Environments**: ✅ Production, ✅ Preview, ✅ Development

---

### 6. NODE_ENV (Automático)
**Descripción**: Environment de Node.js

Vercel configura esto automáticamente:
- Production: `production`
- Preview: `production`
- Development: `development`

⚠️ **NO necesitas configurar esto manualmente**

---

## 🚀 Configuración Paso a Paso en Vercel

### Método 1: Desde Vercel Dashboard (Recomendado)

1. **Accede a tu proyecto en Vercel**
   - Ve a https://vercel.com/dashboard
   - Selecciona el proyecto del CMS

2. **Ve a Settings > Environment Variables**

3. **Añade cada variable:**
   - Haz clic en "Add New"
   - Nombre: `POSTGRES_URL`
   - Value: tu connection string
   - Selecciona los environments: Production, Preview, Development
   - Clic en "Save"

4. **Repite para cada variable:**
   - `POSTGRES_URL`
   - `PAYLOAD_SECRET`
   - `BLOB_READ_WRITE_TOKEN`
   - `PAYLOAD_PUBLIC_SERVER_URL`
   - `FRONTEND_URL`

5. **Redeploy tu proyecto:**
   ```bash
   vercel --prod
   ```

### Método 2: Desde Vercel CLI

```bash
# Configurar para Production
vercel env add POSTGRES_URL production
vercel env add PAYLOAD_SECRET production
vercel env add BLOB_READ_WRITE_TOKEN production
vercel env add PAYLOAD_PUBLIC_SERVER_URL production
vercel env add FRONTEND_URL production

# Configurar para Preview
vercel env add POSTGRES_URL preview
vercel env add PAYLOAD_SECRET preview
vercel env add BLOB_READ_WRITE_TOKEN preview
vercel env add PAYLOAD_PUBLIC_SERVER_URL preview
vercel env add FRONTEND_URL preview

# Configurar para Development
vercel env add POSTGRES_URL development
vercel env add PAYLOAD_SECRET development
vercel env add BLOB_READ_WRITE_TOKEN development
vercel env add PAYLOAD_PUBLIC_SERVER_URL development
vercel env add FRONTEND_URL development
```

---

## ✅ Checklist de Configuración

### Antes del Primer Deploy:

- [ ] Base de datos PostgreSQL creada (Neon/Vercel/Supabase)
- [ ] `POSTGRES_URL` configurada en Vercel
- [ ] `PAYLOAD_SECRET` generado y configurado
- [ ] Vercel Blob Storage creado
- [ ] `BLOB_READ_WRITE_TOKEN` configurado
- [ ] `PAYLOAD_PUBLIC_SERVER_URL` configurada
- [ ] `FRONTEND_URL` configurada
- [ ] Todas las variables configuradas para Production, Preview, Development

### Después del Primer Deploy:

- [ ] Acceder a `/admin` en tu URL de Vercel
- [ ] Crear primer usuario administrador
- [ ] Probar subida de imágenes
- [ ] Crear un proyecto de prueba
- [ ] Verificar que la API responde: `/api/projects`

---

## 🔍 Verificar Configuración

### Local (Development)

```bash
# Ver variables locales
cat .env.local

# Debería contener:
# POSTGRES_URL=postgresql://...
# PAYLOAD_SECRET=...
# BLOB_READ_WRITE_TOKEN=...
# PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
# FRONTEND_URL=http://localhost:4321
```

### Vercel (Production)

1. Ve a Vercel Dashboard
2. Settings > Environment Variables
3. Deberías ver las 5 variables configuradas para cada environment

---

## ⚠️ Troubleshooting

### Error: "Cannot connect to database"
**Solución:**
- Verifica que `POSTGRES_URL` esté correctamente configurada
- Asegúrate de incluir `?sslmode=require` al final (para Neon)
- Verifica que tu IP esté en whitelist (Neon/Supabase)

### Error: "BLOB_READ_WRITE_TOKEN is not set"
**Solución:**
- Crea un Vercel Blob Storage en el dashboard
- Copia el token a las variables de entorno
- Redeploy el proyecto

### Error: "CORS error" desde el frontend
**Solución:**
- Verifica que `FRONTEND_URL` esté correctamente configurada
- Verifica que coincida exactamente con la URL de tu portfolio
- No incluir trailing slash

### Error: "Invalid secret"
**Solución:**
- Genera un nuevo secret con `openssl rand -base64 32`
- Actualiza `PAYLOAD_SECRET` en Vercel
- Redeploy

---

## 📝 Valores de Ejemplo Completos

### Development (.env.local)
```bash
POSTGRES_URL=postgresql://user:pass@localhost:5432/portfolio_cms
PAYLOAD_SECRET=OvlO3b1a+Z/MizrXr9v5swqT81jhhQZhW9NzaPNN47Y=
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx_yyy
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000
FRONTEND_URL=http://localhost:4321
NODE_ENV=development
```

### Production (Vercel Environment Variables)
```bash
POSTGRES_URL=postgresql://user:pass@ep-xxx.neon.tech/portfolio_cms?sslmode=require
PAYLOAD_SECRET=[GENERA UNO NUEVO CON openssl rand -base64 32]
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxx_yyy
PAYLOAD_PUBLIC_SERVER_URL=https://astro-portfolio-cms.vercel.app
FRONTEND_URL=https://port25karen.vercel.app
# NODE_ENV se configura automáticamente
```

---

## 🎯 Próximos Pasos

Después de configurar las variables:

1. **Hacer push al repositorio:**
   ```bash
   git add .
   git commit -m "Fix TypeScript error in payload.config.ts"
   git push
   ```

2. **Vercel desplegará automáticamente**

3. **Ejecutar migraciones en producción:**
   ```bash
   vercel exec -- pnpm payload migrate
   ```

4. **Acceder al admin panel:**
   - Ve a: `https://tu-cms.vercel.app/admin`
   - Crea tu primer usuario administrador

5. **Probar la API:**
   - `https://tu-cms.vercel.app/api/projects`

---

**🚀 Generado con Claude Code**

¿Necesitas ayuda? Consulta [SETUP.md](./SETUP.md) para más información.
