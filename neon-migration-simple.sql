-- =====================================================
-- MIGRACIÓN I18N SIMPLIFICADA PARA PAYLOAD CMS
-- =====================================================
-- Ejecutar paso por paso en SQL Editor de Neon
-- =====================================================

-- PASO 1: SERVICES - Campos simples
UPDATE services
SET
  title1 = jsonb_build_object('en', title1),
  title2 = jsonb_build_object('en', title2),
  description = jsonb_build_object('en', description);

-- PASO 2: SERVICES - exampleProject (puede ser NULL)
UPDATE services
SET "exampleProject" = jsonb_build_object('en', "exampleProject")
WHERE "exampleProject" IS NOT NULL;

-- PASO 3: SERVICES - serviceTags
UPDATE services
SET "serviceTags" = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', tag_item->>'id',
      'tag', jsonb_build_object('en', tag_item->>'tag')
    )
  )
  FROM jsonb_array_elements("serviceTags"::jsonb) AS tag_item
)
WHERE "serviceTags" IS NOT NULL;

-- PASO 4: SERVICES - techTags
UPDATE services
SET "techTags" = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', tech_item->>'id',
      'tech', jsonb_build_object('en', tech_item->>'tech')
    )
  )
  FROM jsonb_array_elements("techTags"::jsonb) AS tech_item
)
WHERE "techTags" IS NOT NULL;

-- PASO 5: PROJECTS - Campos simples principales
UPDATE projects
SET
  title = jsonb_build_object('en', title),
  "briefDescription" = jsonb_build_object('en', "briefDescription"),
  "mainTag" = jsonb_build_object('en', "mainTag"),
  "authorName" = jsonb_build_object('en', "authorName");

-- PASO 6: PROJECTS - finalTitle (puede ser NULL)
UPDATE projects
SET "finalTitle" = jsonb_build_object('en', "finalTitle")
WHERE "finalTitle" IS NOT NULL;

-- PASO 7: PROJECTS - articleSections
UPDATE projects
SET "articleSections" = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', section->>'id',
      'heading', jsonb_build_object('en', section->>'heading'),
      'paragraphs', jsonb_build_object('en', section->'paragraphs')
    )
  )
  FROM jsonb_array_elements("articleSections"::jsonb) AS section
)
WHERE "articleSections" IS NOT NULL;

-- PASO 8: PROJECTS - quote
UPDATE projects
SET quote = jsonb_build_object(
  'text', jsonb_build_object('en', quote::jsonb->>'text'),
  'author', jsonb_build_object('en', quote::jsonb->>'author')
)
WHERE quote IS NOT NULL;

-- PASO 9: PROJECTS - techStack
UPDATE projects
SET "techStack" = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', tech->>'id',
      'heading', jsonb_build_object('en', tech->>'heading'),
      'description', jsonb_build_object('en', tech->>'description')
    )
  )
  FROM jsonb_array_elements("techStack"::jsonb) AS tech
)
WHERE "techStack" IS NOT NULL;

-- PASO 10: PROJECTS - workflowSteps
UPDATE projects
SET "workflowSteps" = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', step->>'id',
      'title', jsonb_build_object('en', step->>'title'),
      'description', jsonb_build_object('en', step->>'description')
    )
  )
  FROM jsonb_array_elements("workflowSteps"::jsonb) AS step
)
WHERE "workflowSteps" IS NOT NULL;

-- PASO 11: PROJECTS - achievements
UPDATE projects
SET achievements = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', achievement->>'id',
      'title', jsonb_build_object('en', achievement->>'title'),
      'description', jsonb_build_object('en', achievement->>'description')
    )
  )
  FROM jsonb_array_elements(achievements::jsonb) AS achievement
)
WHERE achievements IS NOT NULL;

-- PASO 12: PROJECTS - finalTags
UPDATE projects
SET "finalTags" = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', tag_item->>'id',
      'tag', jsonb_build_object('en', tag_item->>'tag')
    )
  )
  FROM jsonb_array_elements("finalTags"::jsonb) AS tag_item
)
WHERE "finalTags" IS NOT NULL;

-- PASO 13: PROJECTS - templateFAQs
UPDATE projects
SET "templateFAQs" = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', faq->>'id',
      'question', jsonb_build_object('en', faq->>'question'),
      'answer', jsonb_build_object('en', faq->>'answer')
    )
  )
  FROM jsonb_array_elements("templateFAQs"::jsonb) AS faq
)
WHERE "templateFAQs" IS NOT NULL;

-- PASO 14: PROJECTS - SEO metaTitle
UPDATE projects
SET seo = jsonb_set(
  COALESCE(seo::jsonb, '{}'::jsonb),
  '{metaTitle}',
  jsonb_build_object('en', seo::jsonb->>'metaTitle')
)
WHERE seo IS NOT NULL AND seo::jsonb->>'metaTitle' IS NOT NULL;

-- PASO 15: PROJECTS - SEO metaDescription
UPDATE projects
SET seo = jsonb_set(
  seo::jsonb,
  '{metaDescription}',
  jsonb_build_object('en', seo::jsonb->>'metaDescription')
)
WHERE seo IS NOT NULL AND seo::jsonb->>'metaDescription' IS NOT NULL;

-- PASO 16: PROJECTS - SEO keywords
UPDATE projects
SET seo = jsonb_set(
  seo::jsonb,
  '{keywords}',
  (
    SELECT jsonb_agg(
      jsonb_build_object(
        'id', keyword->>'id',
        'keyword', jsonb_build_object('en', keyword->>'keyword')
      )
    )
    FROM jsonb_array_elements(seo::jsonb->'keywords') AS keyword
  )
)
WHERE seo IS NOT NULL AND seo::jsonb->'keywords' IS NOT NULL;

-- PASO 17: PROJECTS - metrics
UPDATE projects
SET metrics = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', metric->>'id',
      'label', jsonb_build_object('en', metric->>'label'),
      'value', jsonb_build_object('en', metric->>'value'),
      'description', CASE
        WHEN metric->>'description' IS NOT NULL
        THEN jsonb_build_object('en', metric->>'description')
        ELSE NULL
      END
    )
  )
  FROM jsonb_array_elements(metrics::jsonb) AS metric
)
WHERE metrics IS NOT NULL;

-- PASO 18: QUICK PROJECTS
UPDATE "quickProjects"
SET
  title = jsonb_build_object('en', title),
  description = jsonb_build_object('en', description);

-- PASO 19: HOME FAQS
UPDATE "homeFAQs"
SET
  question = jsonb_build_object('en', question),
  answer = jsonb_build_object('en', answer);

-- PASO 20: EXPERIENCES (si existen datos)
UPDATE experiences
SET
  title = jsonb_build_object('en', title),
  company = jsonb_build_object('en', company),
  period = jsonb_build_object('en', period)
WHERE title IS NOT NULL;

-- PASO 21: TOP MARQUEE SERVICES (si existen datos)
UPDATE "topMarqueeServices"
SET title = jsonb_build_object('en', title)
WHERE title IS NOT NULL;

-- =====================================================
-- VERIFICACIÓN
-- =====================================================

SELECT 'Services migrados:' as status, COUNT(*) as total FROM services;
SELECT 'Projects migrados:' as status, COUNT(*) as total FROM projects;
SELECT 'QuickProjects migrados:' as status, COUNT(*) as total FROM "quickProjects";
SELECT 'HomeFAQs migrados:' as status, COUNT(*) as total FROM "homeFAQs";

-- Ver muestra de datos
SELECT id, title1, title2 FROM services LIMIT 2;
SELECT id, title, "briefDescription" FROM projects LIMIT 2;
