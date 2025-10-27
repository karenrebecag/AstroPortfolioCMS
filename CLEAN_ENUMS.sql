-- ============================================
-- SQL para limpiar ENUMs en Neon Database
-- ============================================
-- Ejecuta esto en Neon SQL Editor ANTES de hacer redeploy
-- https://console.neon.tech

-- 1. Eliminar todos los ENUMs existentes
DROP TYPE IF EXISTS "public"."enum_projects_status" CASCADE;
DROP TYPE IF EXISTS "public"."enum__projects_v_version_status" CASCADE;
DROP TYPE IF EXISTS "public"."enum_quick_projects_status" CASCADE;
DROP TYPE IF EXISTS "public"."enum_services_status" CASCADE;
DROP TYPE IF EXISTS "public"."enum_home_faqs_status" CASCADE;

-- 2. Verificar que se eliminaron (debería devolver 0 rows)
SELECT typname FROM pg_type WHERE typname LIKE 'enum_%';

-- Si aún ves ENUMs listados, elimínalos manualmente:
-- DROP TYPE IF EXISTS "public"."nombre_del_enum" CASCADE;

-- 3. Una vez que no haya ENUMs, el próximo deploy creará todo desde cero
