# Quickstart: Setup GRATUITO con Vercel

## 🆓 Stack Completamente Gratuito

- **Base de Datos**: Vercel Postgres (Hobby - FREE)
- **Almacenamiento**: Vercel Blob (Hobby - FREE)
- **Hosting**: Vercel (Hobby - FREE)

✅ **Sin tarjeta de crédito requerida**
✅ **Todo en el mismo dashboard**
✅ **Configuración automática**

## 📋 Setup en 5 Minutos

### Paso 1: Deploy a Vercel (sin configurar nada todavía)

```bash
# Desde el directorio CMS
cd /Users/karenortiz/CascadeProjects/Port25Karen/src/components/modules/CMS

# Login a Vercel
vercel login

# Deploy inicial
vercel
```

Sigue el wizard:
- Setup and deploy: **Yes**
- Scope: tu-cuenta
- Link to existing project: **No**
- Project name: **portfolio-cms** (o el nombre que quieras)
- Directory: `./`
- Override settings: **No**

⚠️ **El primer deploy fallará** - ¡Es normal! Falta configurar la base de datos.

### Paso 2: Crear Vercel Postgres (GRATIS)

1. Ve a tu proyecto en Vercel Dashboard: https://vercel.com/dashboard
2. Clic en tu proyecto **portfolio-cms**
3. Clic en la pestaña **"Storage"**
4. Clic en **"Create Database"**
5. Selecciona **"Postgres"**
6. Clic en **"Continue"**
7. Nombre: `portfolio-db` (o el que prefieras)
8. Region: Selecciona la más cercana (ej: **US East** para mejor latencia)
9. Clic en **"Create"**

✅ Vercel creará automáticamente las variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- Y otras más

✅ **Estas variables ya están conectadas a tu proyecto automáticamente**

### Paso 3: Crear Vercel Blob Storage (GRATIS)

1. En el mismo proyecto, ve a **"Storage"**
2. Clic en **"Create Database"** nuevamente
3. Selecciona **"Blob"**
4. Clic en **"Continue"**
5. Nombre: `portfolio-media`
6. Clic en **"Create"**

✅ Vercel creará automáticamente:
- `BLOB_READ_WRITE_TOKEN`

### Paso 4: Configurar Variables Faltantes

Solo necesitas añadir 2 variables más manualmente:

1. Ve a **Settings** > **Environment Variables**
2. Añade las siguientes:

#### A. PAYLOAD_SECRET

```bash
# Genera uno en tu terminal:
openssl rand -base64 32

# Copia el resultado
```

En Vercel:
- Name: `PAYLOAD_SECRET`
- Value: `[pega el resultado del comando]`
- Environments: ✅ Production, ✅ Preview, ✅ Development
- Clic en **"Save"**

#### B. PAYLOAD_PUBLIC_SERVER_URL

Después del primer deploy, verás la URL de tu proyecto.

En Vercel:
- Name: `PAYLOAD_PUBLIC_SERVER_URL`
- Value para Production: `https://portfolio-cms.vercel.app` (tu URL real)
- Value para Preview: `https://portfolio-cms-git-[branch].vercel.app`
- Value para Development: `http://localhost:3000`
- Environments: ✅ Production, ✅ Preview, ✅ Development
- Clic en **"Save"**

#### C. FRONTEND_URL (Opcional - para CORS)

En Vercel:
- Name: `FRONTEND_URL`
- Value para Production: `https://port25karen.vercel.app`
- Value para Preview: `https://port25karen-git-[branch].vercel.app`
- Value para Development: `http://localhost:4321`
- Environments: ✅ Production, ✅ Preview, ✅ Development
- Clic en **"Save"**

### Paso 5: Redeploy

```bash
vercel --prod
```

O simplemente haz push a tu repo:
```bash
git push
```

Vercel detectará los cambios y hará deploy automáticamente.

### Paso 6: Ejecutar Migraciones

Una vez que el deploy esté completado:

```bash
vercel exec -- pnpm payload migrate
```

### Paso 7: Crear Usuario Admin

1. Ve a tu URL de Vercel: `https://portfolio-cms.vercel.app/admin`
2. Verás un formulario para crear el primer usuario
3. Completa:
   - Email: tu-email@ejemplo.com
   - Password: [contraseña segura]
   - Name: Tu Nombre
4. Clic en **"Create"**

✅ **¡Listo! Ya tienes tu CMS funcionando GRATIS**

---

## 📊 Límites del Plan Gratuito

### Vercel Postgres (Hobby - FREE)
- ✅ 256 MB almacenamiento
- ✅ 1 base de datos
- ✅ 60 horas compute/mes
- ✅ Backups diarios
- **Suficiente para**: Cientos de proyectos con texto

### Vercel Blob (Hobby - FREE)
- ✅ 1 GB almacenamiento
- ✅ 100 GB bandwidth/mes
- **Suficiente para**: 200-400 imágenes optimizadas

### Vercel Hosting (Hobby - FREE)
- ✅ 100 GB bandwidth/mes
- ✅ Despliegues ilimitados
- ✅ SSL automático
- ✅ Preview deployments

---

## 💰 Comparación: ¿Cuánto pagarías con estos límites?

Si usaras servicios pagos equivalentes:
- AWS RDS PostgreSQL: ~$15-20/mes
- AWS S3 + CloudFront: ~$5-10/mes
- Hosting: ~$5-10/mes

**Total con Vercel FREE**: $0/mes 🎉

---

## 🔍 Verificar que Todo Funciona

### 1. Base de Datos Conectada

Ve a: `https://portfolio-cms.vercel.app/admin`

Si ves la pantalla de login/crear usuario = ✅ DB funciona

### 2. Blob Storage Funcionando

1. En el admin, ve a **Media**
2. Clic en **"Create New"**
3. Sube una imagen de prueba
4. Si se sube correctamente = ✅ Blob funciona

### 3. API Funcionando

Ve a: `https://portfolio-cms.vercel.app/api/projects`

Deberías ver:
```json
{
  "docs": [],
  "totalDocs": 0,
  "limit": 10,
  ...
}
```

✅ Si ves esto, la API funciona

---

## 🎯 Próximos Pasos

Ahora que tu CMS está funcionando:

1. **Crear 2-3 proyectos de prueba** en el admin
2. **Probar la API** desde tu portfolio Astro
3. **Integrar en tu homepage** para mostrar proyectos

---

## 🆘 Troubleshooting

### Error: "Cannot connect to database"
**Causa**: Variables de entorno no configuradas

**Solución**:
1. Ve a Vercel Dashboard > Settings > Environment Variables
2. Verifica que `POSTGRES_URL` existe
3. Si no existe, vuelve a Storage > Postgres > Connect

### Error: "BLOB_READ_WRITE_TOKEN is not set"
**Causa**: Blob Storage no creado

**Solución**:
1. Ve a Vercel Dashboard > Storage
2. Create Database > Blob
3. El token se añadirá automáticamente

### El admin panel no carga
**Causa**: Migraciones no ejecutadas

**Solución**:
```bash
vercel exec -- pnpm payload migrate
```

### "Rate limit exceeded"
**Causa**: Demasiadas peticiones en desarrollo

**Solución**: Es temporal, espera 15 minutos o cambia la configuración en `payload.config.ts`

---

## ✅ Checklist Final

- [ ] Vercel Postgres creado (FREE)
- [ ] Vercel Blob creado (FREE)
- [ ] Variables de entorno configuradas
- [ ] Deploy exitoso
- [ ] Migraciones ejecutadas
- [ ] Usuario admin creado
- [ ] Subida de imagen de prueba funciona
- [ ] API responde correctamente
- [ ] Proyecto de prueba creado

---

**🚀 Todo GRATIS con Vercel Hobby Plan**

Sin tarjeta de crédito. Sin costos ocultos. Sin sorpresas.

¿Preguntas? Consulta [VERCEL_ENV_VARS.md](./VERCEL_ENV_VARS.md) para más detalles.
