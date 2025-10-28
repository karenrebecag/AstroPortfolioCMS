-- =====================================================
-- MIGRACIÓN I18N PARA PAYLOAD CMS
-- =====================================================
-- Este script migra datos existentes al formato i18n de Payload
-- Ejecutar en el SQL Editor de Neon Database
--
-- IMPORTANTE: Hacer backup antes de ejecutar
-- =====================================================

-- =====================================================
-- 1. SERVICES COLLECTION
-- =====================================================

-- Migrar title1, title2, description, exampleProject
UPDATE services
SET
  title1 = jsonb_build_object('en', title1),
  title2 = jsonb_build_object('en', title2),
  description = jsonb_build_object('en', description),
  "exampleProject" = CASE
    WHEN "exampleProject" IS NOT NULL
    THEN jsonb_build_object('en', "exampleProject")
    ELSE NULL
  END
WHERE pg_typeof(title1)::text != 'jsonb'
   OR (pg_typeof(title1)::text = 'jsonb' AND jsonb_typeof(title1::jsonb) != 'object');

-- Migrar serviceTags.tag (dentro de arrays)
UPDATE services
SET "serviceTags" = (
  SELECT jsonb_agg(
    jsonb_set(
      tag_item,
      '{tag}',
      jsonb_build_object('en', tag_item->>'tag')
    )
  )
  FROM jsonb_array_elements("serviceTags"::jsonb) AS tag_item
)
WHERE "serviceTags" IS NOT NULL
  AND (
    pg_typeof("serviceTags")::text != 'jsonb'
    OR (pg_typeof("serviceTags")::text = 'jsonb' AND jsonb_typeof("serviceTags"::jsonb->0->'tag') != 'object')
  );

-- Migrar techTags.tech (dentro de arrays)
UPDATE services
SET "techTags" = (
  SELECT jsonb_agg(
    jsonb_set(
      tech_item,
      '{tech}',
      jsonb_build_object('en', tech_item->>'tech')
    )
  )
  FROM jsonb_array_elements("techTags"::jsonb) AS tech_item
)
WHERE "techTags" IS NOT NULL
  AND (
    pg_typeof("techTags")::text != 'jsonb'
    OR (pg_typeof("techTags")::text = 'jsonb' AND jsonb_typeof("techTags"::jsonb->0->'tech') != 'object')
  );

-- =====================================================
-- 2. PROJECTS COLLECTION
-- =====================================================

-- Migrar campos simples de texto
UPDATE projects
SET
  title = jsonb_build_object('en', title),
  "briefDescription" = jsonb_build_object('en', "briefDescription"),
  "mainTag" = jsonb_build_object('en', "mainTag"),
  "authorName" = jsonb_build_object('en', "authorName"),
  "finalTitle" = jsonb_build_object('en', "finalTitle")
WHERE pg_typeof(title)::text != 'jsonb'
   OR (pg_typeof(title)::text = 'jsonb' AND jsonb_typeof(title::jsonb) != 'object');

-- Migrar articleSections (heading + paragraphs)
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
WHERE "articleSections" IS NOT NULL
  AND (
    pg_typeof("articleSections")::text != 'jsonb'
    OR (pg_typeof("articleSections")::text = 'jsonb' AND jsonb_typeof("articleSections"::jsonb->0->'heading') != 'object')
  );

-- Migrar quote (text + author)
UPDATE projects
SET quote = jsonb_build_object(
  'text', jsonb_build_object('en', quote->>'text'),
  'author', jsonb_build_object('en', quote->>'author')
)
WHERE quote IS NOT NULL
  AND jsonb_typeof(quote->'text') != 'object';

-- Migrar techStack (heading + description)
UPDATE projects
SET "techStack" = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', tech->>'id',
      'heading', jsonb_build_object('en', tech->>'heading'),
      'description', jsonb_build_object('en', tech->>'description')
    )
  )
  FROM jsonb_array_elements("techStack") AS tech
)
WHERE "techStack" IS NOT NULL
  AND jsonb_typeof("techStack"->0->'heading') != 'object';

-- Migrar workflowSteps (title + description)
UPDATE projects
SET "workflowSteps" = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', step->>'id',
      'title', jsonb_build_object('en', step->>'title'),
      'description', jsonb_build_object('en', step->>'description')
    )
  )
  FROM jsonb_array_elements("workflowSteps") AS step
)
WHERE "workflowSteps" IS NOT NULL
  AND jsonb_typeof("workflowSteps"->0->'title') != 'object';

-- Migrar achievements (title + description)
UPDATE projects
SET achievements = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', achievement->>'id',
      'title', jsonb_build_object('en', achievement->>'title'),
      'description', jsonb_build_object('en', achievement->>'description')
    )
  )
  FROM jsonb_array_elements(achievements) AS achievement
)
WHERE achievements IS NOT NULL
  AND jsonb_typeof(achievements->0->'title') != 'object';

-- Migrar finalTags
UPDATE projects
SET "finalTags" = (
  SELECT jsonb_agg(
    jsonb_set(
      tag_item,
      '{tag}',
      jsonb_build_object('en', tag_item->>'tag')
    )
  )
  FROM jsonb_array_elements("finalTags") AS tag_item
)
WHERE "finalTags" IS NOT NULL
  AND jsonb_typeof("finalTags"->0->'tag') != 'object';

-- Migrar templateFAQs (question + answer)
UPDATE projects
SET "templateFAQs" = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', faq->>'id',
      'question', jsonb_build_object('en', faq->>'question'),
      'answer', jsonb_build_object('en', faq->>'answer')
    )
  )
  FROM jsonb_array_elements("templateFAQs") AS faq
)
WHERE "templateFAQs" IS NOT NULL
  AND jsonb_typeof("templateFAQs"->0->'question') != 'object';

-- Migrar SEO (metaTitle, metaDescription, keywords)
UPDATE projects
SET seo = jsonb_build_object(
  'metaTitle', CASE
    WHEN seo->'metaTitle' IS NOT NULL
    THEN jsonb_build_object('en', seo->>'metaTitle')
    ELSE NULL
  END,
  'metaDescription', CASE
    WHEN seo->'metaDescription' IS NOT NULL
    THEN jsonb_build_object('en', seo->>'metaDescription')
    ELSE NULL
  END,
  'ogImage', seo->'ogImage',
  'keywords', (
    SELECT jsonb_agg(
      jsonb_set(
        keyword,
        '{keyword}',
        jsonb_build_object('en', keyword->>'keyword')
      )
    )
    FROM jsonb_array_elements(seo->'keywords') AS keyword
  )
)
WHERE seo IS NOT NULL
  AND (
    jsonb_typeof(seo->'metaTitle') != 'object'
    OR jsonb_typeof(seo->'keywords'->0->'keyword') != 'object'
  );

-- Migrar metrics (label, value, description)
UPDATE projects
SET metrics = (
  SELECT jsonb_agg(
    jsonb_build_object(
      'id', metric->>'id',
      'label', jsonb_build_object('en', metric->>'label'),
      'value', jsonb_build_object('en', metric->>'value'),
      'description', CASE
        WHEN metric->'description' IS NOT NULL
        THEN jsonb_build_object('en', metric->>'description')
        ELSE NULL
      END
    )
  )
  FROM jsonb_array_elements(metrics) AS metric
)
WHERE metrics IS NOT NULL
  AND jsonb_typeof(metrics->0->'label') != 'object';

-- =====================================================
-- 3. QUICK PROJECTS COLLECTION
-- =====================================================

UPDATE "quickProjects"
SET
  title = jsonb_build_object('en', title::text),
  description = jsonb_build_object('en', description::text)
WHERE jsonb_typeof(title) != 'object';

-- =====================================================
-- 4. HOME FAQS COLLECTION
-- =====================================================

UPDATE "homeFAQs"
SET
  question = jsonb_build_object('en', question::text),
  answer = jsonb_build_object('en', answer::text)
WHERE jsonb_typeof(question) != 'object';

-- =====================================================
-- 5. EXPERIENCES COLLECTION (si ya tienes datos)
-- =====================================================

UPDATE experiences
SET
  title = jsonb_build_object('en', title::text),
  company = jsonb_build_object('en', company::text),
  period = jsonb_build_object('en', period::text)
WHERE jsonb_typeof(title) != 'object';

-- =====================================================
-- 6. TOP MARQUEE SERVICES COLLECTION (si ya tienes datos)
-- =====================================================

UPDATE "topMarqueeServices"
SET
  title = jsonb_build_object('en', title::text)
WHERE jsonb_typeof(title) != 'object';

-- =====================================================
-- VERIFICACIÓN: Consultar datos migrados
-- =====================================================

-- Ver Services
SELECT id, title1, title2, description FROM services LIMIT 3;

-- Ver Projects
SELECT id, title, "briefDescription", "mainTag" FROM projects LIMIT 3;

-- Ver QuickProjects
SELECT id, title, description FROM "quickProjects" LIMIT 3;

-- Ver HomeFAQs
SELECT id, question, answer FROM "homeFAQs" LIMIT 3;

-- =====================================================
-- FIN DE MIGRACIÓN
-- =====================================================
