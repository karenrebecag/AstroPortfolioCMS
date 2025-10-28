-- =====================================================
-- MIGRACIÓN I18N PARA TABLAS RELACIONALES DE PAYLOAD
-- =====================================================
-- Este script migra las tablas relacionales que Payload
-- crea automáticamente para arrays
-- =====================================================

-- PASO 1: Verificar datos actuales
SELECT 'services_service_tags actual:' as info, tag FROM services_service_tags LIMIT 3;
SELECT 'services_tech_tags actual:' as info, tech FROM services_tech_tags LIMIT 3;

-- =====================================================
-- SERVICES - Tablas relacionales
-- =====================================================

-- PASO 2: Migrar services_service_tags
ALTER TABLE services_service_tags
  ALTER COLUMN tag TYPE jsonb
  USING jsonb_build_object('en', tag);

-- PASO 3: Migrar services_tech_tags
ALTER TABLE services_tech_tags
  ALTER COLUMN tech TYPE jsonb
  USING jsonb_build_object('en', tech);

-- =====================================================
-- PROJECTS - Tablas relacionales
-- =====================================================

-- Primero verificar estructura de projects_article_sections
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'projects_article_sections'
ORDER BY ordinal_position;

-- PASO 4: Migrar projects_article_sections
-- (Ejecutar solo si heading y paragraphs son VARCHAR)
ALTER TABLE projects_article_sections
  ALTER COLUMN heading TYPE jsonb
  USING jsonb_build_object('en', heading);

ALTER TABLE projects_article_sections
  ALTER COLUMN paragraphs TYPE jsonb
  USING jsonb_build_object('en', paragraphs);

-- PASO 5: Migrar projects_tech_stack
ALTER TABLE projects_tech_stack
  ALTER COLUMN heading TYPE jsonb
  USING jsonb_build_object('en', heading);

ALTER TABLE projects_tech_stack
  ALTER COLUMN description TYPE jsonb
  USING jsonb_build_object('en', description);

-- PASO 6: Migrar projects_workflow_steps
ALTER TABLE projects_workflow_steps
  ALTER COLUMN title TYPE jsonb
  USING jsonb_build_object('en', title);

ALTER TABLE projects_workflow_steps
  ALTER COLUMN description TYPE jsonb
  USING jsonb_build_object('en', description);

-- PASO 7: Migrar projects_achievements
ALTER TABLE projects_achievements
  ALTER COLUMN title TYPE jsonb
  USING jsonb_build_object('en', title);

ALTER TABLE projects_achievements
  ALTER COLUMN description TYPE jsonb
  USING jsonb_build_object('en', description);

-- PASO 8: Migrar projects_final_tags
ALTER TABLE projects_final_tags
  ALTER COLUMN tag TYPE jsonb
  USING jsonb_build_object('en', tag);

-- PASO 9: Migrar projects_template_f_a_qs
ALTER TABLE projects_template_f_a_qs
  ALTER COLUMN question TYPE jsonb
  USING jsonb_build_object('en', question);

ALTER TABLE projects_template_f_a_qs
  ALTER COLUMN answer TYPE jsonb
  USING jsonb_build_object('en', answer);

-- PASO 10: Migrar projects_seo_keywords
ALTER TABLE projects_seo_keywords
  ALTER COLUMN keyword TYPE jsonb
  USING jsonb_build_object('en', keyword);

-- PASO 11: Migrar projects_metrics (si tiene datos)
-- Verificar primero si existe
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'projects_metrics'
ORDER BY ordinal_position;

ALTER TABLE projects_metrics
  ALTER COLUMN label TYPE jsonb
  USING jsonb_build_object('en', label);

ALTER TABLE projects_metrics
  ALTER COLUMN value TYPE jsonb
  USING jsonb_build_object('en', value);

-- Solo si description no es NULL
ALTER TABLE projects_metrics
  ALTER COLUMN description TYPE jsonb
  USING CASE
    WHEN description IS NOT NULL
    THEN jsonb_build_object('en', description)::jsonb
    ELSE NULL
  END;

-- =====================================================
-- QUICK PROJECTS - Tablas relacionales
-- =====================================================

-- PASO 12: Migrar quick_projects_tags (si existe)
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'quick_projects_tags'
ORDER BY ordinal_position;

ALTER TABLE quick_projects_tags
  ALTER COLUMN tag TYPE jsonb
  USING jsonb_build_object('en', tag);

-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================

SELECT 'services_service_tags migrado:' as info, tag FROM services_service_tags LIMIT 3;
SELECT 'services_tech_tags migrado:' as info, tech FROM services_tech_tags LIMIT 3;
SELECT 'projects_final_tags migrado:' as info, tag FROM projects_final_tags LIMIT 3;
SELECT 'projects_tech_stack migrado:' as info, heading FROM projects_tech_stack LIMIT 3;

SELECT '✅ Migración completada' as status;
