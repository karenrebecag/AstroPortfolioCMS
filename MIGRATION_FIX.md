# Fix: Marcar migración inicial como ejecutada

## Problema
La base de datos de producción tiene tablas creadas con `push: true` pero no tiene registradas las migraciones en la tabla `payload_migrations`.

## Solución: Insertar registro manual en la base de datos

Conecta a tu base de datos de producción y ejecuta:

```sql
-- 1. Crear la tabla de migraciones si no existe
CREATE TABLE IF NOT EXISTS payload_migrations (
  id serial PRIMARY KEY NOT NULL,
  name varchar NOT NULL,
  batch integer NOT NULL,
  created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
  updated_at timestamp(3) with time zone DEFAULT now() NOT NULL
);

-- 2. Marcar la migración inicial como ejecutada
INSERT INTO payload_migrations (name, batch, created_at, updated_at)
VALUES ('20251009_155439_initial', 1, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- 3. Verificar que se insertó correctamente
SELECT * FROM payload_migrations;
```

## Después de ejecutar esto:

El próximo deploy:
- No intentará ejecutar la migración inicial (ya está marcada)
- Solo ejecutará la nueva migración `20251027_155814`
- Esta migración creará las nuevas tablas y columnas para SEO y métricas

## Cómo conectar a tu base de datos:

**Si usas Vercel Postgres:**
```bash
vercel env pull .env.production
# Luego conecta con psql o el cliente que prefieras
```

**Si usas Neon:**
1. Ve a https://console.neon.tech
2. Selecciona tu proyecto
3. Abre SQL Editor
4. Pega y ejecuta el SQL de arriba
