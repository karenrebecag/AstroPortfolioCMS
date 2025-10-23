# Troubleshooting - Payload CMS en Vercel

## 🐛 Error: "Server Components render error" en /admin

### Síntomas:
- Error en consola: `Uncaught Error: An error occurred in the Server Components render`
- El admin panel no carga
- No se puede crear contenido (projects, etc.)

### Causas Comunes:

#### 1. Variables de Entorno No Aplicadas
**Problema**: Las variables de entorno se configuraron pero no se hizo redeploy

**Solución**:
```bash
# Opción A: Desde Vercel Dashboard
1. Ve a Deployments
2. Clic en "..." del último deployment
3. Clic en "Redeploy"
4. ⚠️ Desmarca "Use existing Build Cache"

# Opción B: Desde CLI
vercel --prod --force
```

#### 2. Migraciones No Ejecutadas
**Problema**: La base de datos no tiene las tablas necesarias

**Solución**:
```bash
cd src/components/modules/CMS
vercel link --yes
pnpm install
POSTGRES_URL="tu-connection-string" PAYLOAD_SECRET="tu-secret" pnpm payload migrate
```

#### 3. PAYLOAD_SECRET Faltante o Incorrecto
**Problema**: La variable `PAYLOAD_SECRET` no está configurada

**Solución**:
```bash
# Genera un nuevo secret
openssl rand -base64 32

# Añádelo en Vercel Dashboard:
# Settings > Environment Variables > Add New
# Name: PAYLOAD_SECRET
# Value: [resultado del comando]
# Environments: Production, Preview, Development
```

#### 4. PAYLOAD_PUBLIC_SERVER_URL Sin https://
**Problema**: La URL no incluye el protocolo

**Correcto**: `https://astro-portfolio-cms-delta.vercel.app`
**Incorrecto**: `astro-portfolio-cms-delta.vercel.app`

**Solución**:
```bash
# Edita la variable en Vercel Dashboard
# Asegúrate de incluir https://
```

#### 5. POSTGRES_URL No Configurada
**Problema**: La base de datos no está conectada

**Solución**:
```bash
# Verifica que exista en Vercel Dashboard
vercel env ls | grep POSTGRES_URL

# Si no existe, crea Neon database o conecta Vercel Postgres
```

---

## 🔍 Diagnóstico Paso a Paso

### Paso 1: Verificar Variables de Entorno

```bash
cd src/components/modules/CMS
vercel link --yes
vercel env ls
```

**Deberías ver**:
- ✅ POSTGRES_URL
- ✅ PAYLOAD_SECRET
- ✅ PAYLOAD_PUBLIC_SERVER_URL
- ✅ BLOB_READ_WRITE_TOKEN
- ✅ FRONTEND_URL

### Paso 2: Verificar Valores de Variables

```bash
vercel env pull .env.check --yes
cat .env.check | grep -E "POSTGRES_URL|PAYLOAD_SECRET|PAYLOAD_PUBLIC_SERVER_URL"
```

**Verifica**:
- POSTGRES_URL debe empezar con `postgresql://`
- PAYLOAD_SECRET debe tener 43+ caracteres
- PAYLOAD_PUBLIC_SERVER_URL debe empezar con `https://`

### Paso 3: Verificar Conexión a Base de Datos

```bash
# Descarga variables de producción
vercel env pull .env.production --yes

# Intenta conectar
POSTGRES_URL="$(grep POSTGRES_URL .env.production | cut -d'=' -f2-)" \
pnpm exec pg --command "SELECT 1;"
```

Si falla = problema de conexión a base de datos

### Paso 4: Verificar Migraciones

```bash
# Conecta a la BD y lista tablas
POSTGRES_URL="tu-url" pnpm exec pg --command "\dt"
```

**Deberías ver**:
- payload_migrations
- users
- projects
- media
- payload_preferences

Si no existen = ejecutar migraciones

### Paso 5: Verificar Logs de Vercel

```bash
vercel logs https://astro-portfolio-cms-delta.vercel.app --follow
```

Busca errores como:
- `ECONNREFUSED` = problema de conexión a BD
- `Invalid secret` = PAYLOAD_SECRET incorrecto
- `CORS error` = FRONTEND_URL mal configurada

---

## 🔧 Soluciones Rápidas

### Solución 1: Reset Completo de Variables

```bash
# 1. Elimina variables problemáticas
vercel env rm PAYLOAD_SECRET production
vercel env rm PAYLOAD_PUBLIC_SERVER_URL production

# 2. Genera nuevo secret
openssl rand -base64 32

# 3. Añade variables correctas
vercel env add PAYLOAD_SECRET production
# (pega el secret generado)

vercel env add PAYLOAD_PUBLIC_SERVER_URL production
# (ingresa: https://tu-cms.vercel.app)

# 4. Redeploy sin cache
vercel --prod --force
```

### Solución 2: Recrear Migraciones

```bash
# 1. Descarga variables
vercel env pull .env.production --yes

# 2. Ejecuta migraciones manualmente
POSTGRES_URL="$(grep POSTGRES_URL .env.production | cut -d'=' -f2- | tr -d '\"')" \
PAYLOAD_SECRET="$(grep PAYLOAD_SECRET .env.production | cut -d'=' -f2- | tr -d '\"')" \
pnpm payload migrate
```

### Solución 3: Verificar Push de Código

```bash
# Asegúrate de que los últimos fixes están en GitHub
git log --oneline -3

# Debería incluir:
# - "Remove invalid rateLimit config"
# - "Fix TypeScript error"

# Si no están, haz push
git push origin main
```

---

## 📊 Checklist de Troubleshooting

Cuando tengas problemas, verifica en orden:

- [ ] ¿Hiciste push de los últimos cambios?
- [ ] ¿Las variables están configuradas en Vercel?
- [ ] ¿Las variables incluyen `https://` donde corresponde?
- [ ] ¿Hiciste redeploy después de configurar variables?
- [ ] ¿El redeploy fue SIN cache?
- [ ] ¿Ejecutaste las migraciones?
- [ ] ¿La base de datos tiene las tablas?
- [ ] ¿Los logs de Vercel muestran errores?

---

## 🆘 Errores Específicos

### Error: "Failed to fetch"
**Causa**: PAYLOAD_PUBLIC_SERVER_URL incorrecta o sin https://

**Solución**:
```bash
# Edita en Vercel Dashboard
PAYLOAD_PUBLIC_SERVER_URL=https://tu-cms.vercel.app
```

### Error: "Invalid secret"
**Causa**: PAYLOAD_SECRET vacío o incorrecto

**Solución**:
```bash
openssl rand -base64 32
# Copia el resultado y actualiza en Vercel
```

### Error: "relation does not exist"
**Causa**: Migraciones no ejecutadas

**Solución**:
```bash
# Ejecuta migraciones
POSTGRES_URL="tu-url" PAYLOAD_SECRET="tu-secret" pnpm payload migrate
```

### Error: "ECONNREFUSED"
**Causa**: No puede conectarse a la base de datos

**Solución**:
1. Verifica que POSTGRES_URL sea correcta
2. Verifica que incluya `?sslmode=require`
3. Verifica whitelist de IPs en Neon

### Error: "CORS policy"
**Causa**: FRONTEND_URL no configurada correctamente

**Solución**:
```bash
# Edita en Vercel Dashboard
FRONTEND_URL=https://tu-portfolio.com
```

---

## 💡 Tips de Prevención

1. **Siempre haz redeploy sin cache después de cambiar variables**
2. **Verifica que las migraciones estén ejecutadas antes de usar el admin**
3. **Usa https:// en todas las URLs de producción**
4. **Genera PAYLOAD_SECRET seguro (mínimo 32 caracteres)**
5. **Mantén las variables sincronizadas en todos los environments**

---

## 📞 ¿Aún tienes problemas?

Si después de seguir estos pasos aún tienes errores:

1. **Captura los logs**:
   ```bash
   vercel logs https://tu-cms.vercel.app > logs.txt
   ```

2. **Verifica el build**:
   - Ve a Vercel Dashboard > Deployments
   - Clic en el deployment
   - Revisa la pestaña "Build Logs"

3. **Consulta la documentación oficial**:
   - https://payloadcms.com/docs/getting-started/installation
   - https://vercel.com/docs/environment-variables

---

**Generado con Claude Code**
