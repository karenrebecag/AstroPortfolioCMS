import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'es', 'fr', 'hi', 'ja', 'zh', 'zh-TW');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('en', 'es', 'fr', 'hi', 'ja', 'zh', 'zh-TW');
  CREATE TYPE "public"."enum_quick_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_services_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_home_faqs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_experiences_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_top_marquee_services_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "projects_article_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_article_sections_locales" (
  	"heading" varchar,
  	"paragraphs" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer
  );
  
  CREATE TABLE "projects_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_tech_stack_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_workflow_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_workflow_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_achievements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_achievements_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_final_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_final_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_template_f_a_qs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_template_f_a_qs_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_seo_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_seo_keywords_locales" (
  	"keyword" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_metrics_locales" (
  	"label" varchar,
  	"value" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"status" "enum_projects_status" DEFAULT 'draft',
  	"featured" boolean DEFAULT false,
  	"main_image_id" integer,
  	"upload_date" timestamp(3) with time zone,
  	"author_image_id" integer,
  	"seo_og_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar,
  	"brief_description" varchar,
  	"main_tag" varchar DEFAULT 'Web Development',
  	"author_name" varchar,
  	"quote_text" varchar,
  	"quote_author" varchar,
  	"final_title" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_article_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_article_sections_locales" (
  	"heading" varchar,
  	"paragraphs" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_tech_stack" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_tech_stack_locales" (
  	"heading" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_workflow_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_workflow_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_achievements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_achievements_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_final_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_final_tags_locales" (
  	"tag" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_template_f_a_qs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_template_f_a_qs_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_seo_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_seo_keywords_locales" (
  	"keyword" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_metrics_locales" (
  	"label" varchar,
  	"value" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"version_featured" boolean DEFAULT false,
  	"version_main_image_id" integer,
  	"version_upload_date" timestamp(3) with time zone,
  	"version_author_image_id" integer,
  	"version_seo_og_image_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_title" varchar,
  	"version_brief_description" varchar,
  	"version_main_tag" varchar DEFAULT 'Web Development',
  	"version_author_name" varchar,
  	"version_quote_text" varchar,
  	"version_quote_author" varchar,
  	"version_final_title" varchar,
  	"version_seo_meta_title" varchar,
  	"version_seo_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "quick_projects_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "quick_projects_tags_locales" (
  	"tag" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "quick_projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"card_image_id" integer NOT NULL,
  	"visit_url" varchar NOT NULL,
  	"status" "enum_quick_projects_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "quick_projects_locales" (
  	"title" varchar NOT NULL,
  	"brief_description" varchar NOT NULL,
  	"project_type" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "services_service_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_service_tags_locales" (
  	"tag" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_tech_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "services_tech_tags_locales" (
  	"tech" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "services_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_services_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "services_locales" (
  	"title1" varchar NOT NULL,
  	"title2" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"example_project" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "home_faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 1 NOT NULL,
  	"status" "enum_home_faqs_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "home_faqs_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "experiences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"main_company_image_id" integer NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"status" "enum_experiences_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "experiences_locales" (
  	"title" varchar NOT NULL,
  	"company" varchar NOT NULL,
  	"description_normal" varchar NOT NULL,
  	"description_highlight" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "top_marquee_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"status" "enum_top_marquee_services_status" DEFAULT 'draft' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "top_marquee_services_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"projects_id" integer,
  	"quick_projects_id" integer,
  	"services_id" integer,
  	"home_faqs_id" integer,
  	"experiences_id" integer,
  	"top_marquee_services_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_article_sections" ADD CONSTRAINT "projects_article_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_article_sections_locales" ADD CONSTRAINT "projects_article_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_article_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_gallery_images" ADD CONSTRAINT "projects_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_gallery_images" ADD CONSTRAINT "projects_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_tech_stack" ADD CONSTRAINT "projects_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_tech_stack_locales" ADD CONSTRAINT "projects_tech_stack_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_workflow_steps" ADD CONSTRAINT "projects_workflow_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_workflow_steps_locales" ADD CONSTRAINT "projects_workflow_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_workflow_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_achievements" ADD CONSTRAINT "projects_achievements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_achievements_locales" ADD CONSTRAINT "projects_achievements_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_final_tags" ADD CONSTRAINT "projects_final_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_final_tags_locales" ADD CONSTRAINT "projects_final_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_final_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_template_f_a_qs" ADD CONSTRAINT "projects_template_f_a_qs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_template_f_a_qs_locales" ADD CONSTRAINT "projects_template_f_a_qs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_template_f_a_qs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_seo_keywords" ADD CONSTRAINT "projects_seo_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_seo_keywords_locales" ADD CONSTRAINT "projects_seo_keywords_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_seo_keywords"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_metrics" ADD CONSTRAINT "projects_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_metrics_locales" ADD CONSTRAINT "projects_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_main_image_id_media_id_fk" FOREIGN KEY ("main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_author_image_id_media_id_fk" FOREIGN KEY ("author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_article_sections" ADD CONSTRAINT "_projects_v_version_article_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_article_sections_locales" ADD CONSTRAINT "_projects_v_version_article_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_article_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery_images" ADD CONSTRAINT "_projects_v_version_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_version_gallery_images" ADD CONSTRAINT "_projects_v_version_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_tech_stack" ADD CONSTRAINT "_projects_v_version_tech_stack_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_tech_stack_locales" ADD CONSTRAINT "_projects_v_version_tech_stack_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_tech_stack"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_workflow_steps" ADD CONSTRAINT "_projects_v_version_workflow_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_workflow_steps_locales" ADD CONSTRAINT "_projects_v_version_workflow_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_workflow_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_achievements" ADD CONSTRAINT "_projects_v_version_achievements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_achievements_locales" ADD CONSTRAINT "_projects_v_version_achievements_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_final_tags" ADD CONSTRAINT "_projects_v_version_final_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_final_tags_locales" ADD CONSTRAINT "_projects_v_version_final_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_final_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_template_f_a_qs" ADD CONSTRAINT "_projects_v_version_template_f_a_qs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_template_f_a_qs_locales" ADD CONSTRAINT "_projects_v_version_template_f_a_qs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_template_f_a_qs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_seo_keywords" ADD CONSTRAINT "_projects_v_version_seo_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_seo_keywords_locales" ADD CONSTRAINT "_projects_v_version_seo_keywords_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_seo_keywords"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_metrics" ADD CONSTRAINT "_projects_v_version_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_metrics_locales" ADD CONSTRAINT "_projects_v_version_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_main_image_id_media_id_fk" FOREIGN KEY ("version_main_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_author_image_id_media_id_fk" FOREIGN KEY ("version_author_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_seo_og_image_id_media_id_fk" FOREIGN KEY ("version_seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quick_projects_tags" ADD CONSTRAINT "quick_projects_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quick_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quick_projects_tags_locales" ADD CONSTRAINT "quick_projects_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quick_projects_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "quick_projects" ADD CONSTRAINT "quick_projects_card_image_id_media_id_fk" FOREIGN KEY ("card_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "quick_projects_locales" ADD CONSTRAINT "quick_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."quick_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_service_tags" ADD CONSTRAINT "services_service_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_service_tags_locales" ADD CONSTRAINT "services_service_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_service_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_tech_tags" ADD CONSTRAINT "services_tech_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_tech_tags_locales" ADD CONSTRAINT "services_tech_tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services_tech_tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_images" ADD CONSTRAINT "services_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "services_images" ADD CONSTRAINT "services_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "services_locales" ADD CONSTRAINT "services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_faqs_locales" ADD CONSTRAINT "home_faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "experiences" ADD CONSTRAINT "experiences_main_company_image_id_media_id_fk" FOREIGN KEY ("main_company_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "experiences_locales" ADD CONSTRAINT "experiences_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "top_marquee_services_locales" ADD CONSTRAINT "top_marquee_services_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."top_marquee_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_quick_projects_fk" FOREIGN KEY ("quick_projects_id") REFERENCES "public"."quick_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_services_fk" FOREIGN KEY ("services_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_home_faqs_fk" FOREIGN KEY ("home_faqs_id") REFERENCES "public"."home_faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_experiences_fk" FOREIGN KEY ("experiences_id") REFERENCES "public"."experiences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_top_marquee_services_fk" FOREIGN KEY ("top_marquee_services_id") REFERENCES "public"."top_marquee_services"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "projects_article_sections_order_idx" ON "projects_article_sections" USING btree ("_order");
  CREATE INDEX "projects_article_sections_parent_id_idx" ON "projects_article_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_article_sections_locales_locale_parent_id_unique" ON "projects_article_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_gallery_images_order_idx" ON "projects_gallery_images" USING btree ("_order");
  CREATE INDEX "projects_gallery_images_parent_id_idx" ON "projects_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "projects_gallery_images_image_idx" ON "projects_gallery_images" USING btree ("image_id");
  CREATE INDEX "projects_tech_stack_order_idx" ON "projects_tech_stack" USING btree ("_order");
  CREATE INDEX "projects_tech_stack_parent_id_idx" ON "projects_tech_stack" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_tech_stack_locales_locale_parent_id_unique" ON "projects_tech_stack_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_workflow_steps_order_idx" ON "projects_workflow_steps" USING btree ("_order");
  CREATE INDEX "projects_workflow_steps_parent_id_idx" ON "projects_workflow_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_workflow_steps_locales_locale_parent_id_unique" ON "projects_workflow_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_achievements_order_idx" ON "projects_achievements" USING btree ("_order");
  CREATE INDEX "projects_achievements_parent_id_idx" ON "projects_achievements" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_achievements_locales_locale_parent_id_unique" ON "projects_achievements_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_final_tags_order_idx" ON "projects_final_tags" USING btree ("_order");
  CREATE INDEX "projects_final_tags_parent_id_idx" ON "projects_final_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_final_tags_locales_locale_parent_id_unique" ON "projects_final_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_template_f_a_qs_order_idx" ON "projects_template_f_a_qs" USING btree ("_order");
  CREATE INDEX "projects_template_f_a_qs_parent_id_idx" ON "projects_template_f_a_qs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_template_f_a_qs_locales_locale_parent_id_unique" ON "projects_template_f_a_qs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_seo_keywords_order_idx" ON "projects_seo_keywords" USING btree ("_order");
  CREATE INDEX "projects_seo_keywords_parent_id_idx" ON "projects_seo_keywords" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_seo_keywords_locales_locale_parent_id_unique" ON "projects_seo_keywords_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_metrics_order_idx" ON "projects_metrics" USING btree ("_order");
  CREATE INDEX "projects_metrics_parent_id_idx" ON "projects_metrics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_metrics_locales_locale_parent_id_unique" ON "projects_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_main_image_idx" ON "projects" USING btree ("main_image_id");
  CREATE INDEX "projects_author_image_idx" ON "projects" USING btree ("author_image_id");
  CREATE INDEX "projects_seo_seo_og_image_idx" ON "projects" USING btree ("seo_og_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_article_sections_order_idx" ON "_projects_v_version_article_sections" USING btree ("_order");
  CREATE INDEX "_projects_v_version_article_sections_parent_id_idx" ON "_projects_v_version_article_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_article_sections_locales_locale_parent_id_unique" ON "_projects_v_version_article_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_gallery_images_order_idx" ON "_projects_v_version_gallery_images" USING btree ("_order");
  CREATE INDEX "_projects_v_version_gallery_images_parent_id_idx" ON "_projects_v_version_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_gallery_images_image_idx" ON "_projects_v_version_gallery_images" USING btree ("image_id");
  CREATE INDEX "_projects_v_version_tech_stack_order_idx" ON "_projects_v_version_tech_stack" USING btree ("_order");
  CREATE INDEX "_projects_v_version_tech_stack_parent_id_idx" ON "_projects_v_version_tech_stack" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_tech_stack_locales_locale_parent_id_unique" ON "_projects_v_version_tech_stack_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_workflow_steps_order_idx" ON "_projects_v_version_workflow_steps" USING btree ("_order");
  CREATE INDEX "_projects_v_version_workflow_steps_parent_id_idx" ON "_projects_v_version_workflow_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_workflow_steps_locales_locale_parent_id_unique" ON "_projects_v_version_workflow_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_achievements_order_idx" ON "_projects_v_version_achievements" USING btree ("_order");
  CREATE INDEX "_projects_v_version_achievements_parent_id_idx" ON "_projects_v_version_achievements" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_achievements_locales_locale_parent_id_unique" ON "_projects_v_version_achievements_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_final_tags_order_idx" ON "_projects_v_version_final_tags" USING btree ("_order");
  CREATE INDEX "_projects_v_version_final_tags_parent_id_idx" ON "_projects_v_version_final_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_final_tags_locales_locale_parent_id_unique" ON "_projects_v_version_final_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_template_f_a_qs_order_idx" ON "_projects_v_version_template_f_a_qs" USING btree ("_order");
  CREATE INDEX "_projects_v_version_template_f_a_qs_parent_id_idx" ON "_projects_v_version_template_f_a_qs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_template_f_a_qs_locales_locale_parent_id_unique" ON "_projects_v_version_template_f_a_qs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_seo_keywords_order_idx" ON "_projects_v_version_seo_keywords" USING btree ("_order");
  CREATE INDEX "_projects_v_version_seo_keywords_parent_id_idx" ON "_projects_v_version_seo_keywords" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_seo_keywords_locales_locale_parent_id_unique" ON "_projects_v_version_seo_keywords_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_metrics_order_idx" ON "_projects_v_version_metrics" USING btree ("_order");
  CREATE INDEX "_projects_v_version_metrics_parent_id_idx" ON "_projects_v_version_metrics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_metrics_locales_locale_parent_id_unique" ON "_projects_v_version_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_main_image_idx" ON "_projects_v" USING btree ("version_main_image_id");
  CREATE INDEX "_projects_v_version_version_author_image_idx" ON "_projects_v" USING btree ("version_author_image_id");
  CREATE INDEX "_projects_v_version_seo_version_seo_og_image_idx" ON "_projects_v" USING btree ("version_seo_og_image_id");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "quick_projects_tags_order_idx" ON "quick_projects_tags" USING btree ("_order");
  CREATE INDEX "quick_projects_tags_parent_id_idx" ON "quick_projects_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "quick_projects_tags_locales_locale_parent_id_unique" ON "quick_projects_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "quick_projects_card_image_idx" ON "quick_projects" USING btree ("card_image_id");
  CREATE INDEX "quick_projects_updated_at_idx" ON "quick_projects" USING btree ("updated_at");
  CREATE INDEX "quick_projects_created_at_idx" ON "quick_projects" USING btree ("created_at");
  CREATE UNIQUE INDEX "quick_projects_locales_locale_parent_id_unique" ON "quick_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_service_tags_order_idx" ON "services_service_tags" USING btree ("_order");
  CREATE INDEX "services_service_tags_parent_id_idx" ON "services_service_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_service_tags_locales_locale_parent_id_unique" ON "services_service_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_tech_tags_order_idx" ON "services_tech_tags" USING btree ("_order");
  CREATE INDEX "services_tech_tags_parent_id_idx" ON "services_tech_tags" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "services_tech_tags_locales_locale_parent_id_unique" ON "services_tech_tags_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "services_images_order_idx" ON "services_images" USING btree ("_order");
  CREATE INDEX "services_images_parent_id_idx" ON "services_images" USING btree ("_parent_id");
  CREATE INDEX "services_images_image_idx" ON "services_images" USING btree ("image_id");
  CREATE INDEX "services_updated_at_idx" ON "services" USING btree ("updated_at");
  CREATE INDEX "services_created_at_idx" ON "services" USING btree ("created_at");
  CREATE UNIQUE INDEX "services_locales_locale_parent_id_unique" ON "services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "home_faqs_updated_at_idx" ON "home_faqs" USING btree ("updated_at");
  CREATE INDEX "home_faqs_created_at_idx" ON "home_faqs" USING btree ("created_at");
  CREATE UNIQUE INDEX "home_faqs_locales_locale_parent_id_unique" ON "home_faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "experiences_main_company_image_idx" ON "experiences" USING btree ("main_company_image_id");
  CREATE INDEX "experiences_updated_at_idx" ON "experiences" USING btree ("updated_at");
  CREATE INDEX "experiences_created_at_idx" ON "experiences" USING btree ("created_at");
  CREATE UNIQUE INDEX "experiences_locales_locale_parent_id_unique" ON "experiences_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "top_marquee_services_updated_at_idx" ON "top_marquee_services" USING btree ("updated_at");
  CREATE INDEX "top_marquee_services_created_at_idx" ON "top_marquee_services" USING btree ("created_at");
  CREATE UNIQUE INDEX "top_marquee_services_locales_locale_parent_id_unique" ON "top_marquee_services_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_quick_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("quick_projects_id");
  CREATE INDEX "payload_locked_documents_rels_services_id_idx" ON "payload_locked_documents_rels" USING btree ("services_id");
  CREATE INDEX "payload_locked_documents_rels_home_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("home_faqs_id");
  CREATE INDEX "payload_locked_documents_rels_experiences_id_idx" ON "payload_locked_documents_rels" USING btree ("experiences_id");
  CREATE INDEX "payload_locked_documents_rels_top_marquee_services_id_idx" ON "payload_locked_documents_rels" USING btree ("top_marquee_services_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "projects_article_sections" CASCADE;
  DROP TABLE "projects_article_sections_locales" CASCADE;
  DROP TABLE "projects_gallery_images" CASCADE;
  DROP TABLE "projects_tech_stack" CASCADE;
  DROP TABLE "projects_tech_stack_locales" CASCADE;
  DROP TABLE "projects_workflow_steps" CASCADE;
  DROP TABLE "projects_workflow_steps_locales" CASCADE;
  DROP TABLE "projects_achievements" CASCADE;
  DROP TABLE "projects_achievements_locales" CASCADE;
  DROP TABLE "projects_final_tags" CASCADE;
  DROP TABLE "projects_final_tags_locales" CASCADE;
  DROP TABLE "projects_template_f_a_qs" CASCADE;
  DROP TABLE "projects_template_f_a_qs_locales" CASCADE;
  DROP TABLE "projects_seo_keywords" CASCADE;
  DROP TABLE "projects_seo_keywords_locales" CASCADE;
  DROP TABLE "projects_metrics" CASCADE;
  DROP TABLE "projects_metrics_locales" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "_projects_v_version_article_sections" CASCADE;
  DROP TABLE "_projects_v_version_article_sections_locales" CASCADE;
  DROP TABLE "_projects_v_version_gallery_images" CASCADE;
  DROP TABLE "_projects_v_version_tech_stack" CASCADE;
  DROP TABLE "_projects_v_version_tech_stack_locales" CASCADE;
  DROP TABLE "_projects_v_version_workflow_steps" CASCADE;
  DROP TABLE "_projects_v_version_workflow_steps_locales" CASCADE;
  DROP TABLE "_projects_v_version_achievements" CASCADE;
  DROP TABLE "_projects_v_version_achievements_locales" CASCADE;
  DROP TABLE "_projects_v_version_final_tags" CASCADE;
  DROP TABLE "_projects_v_version_final_tags_locales" CASCADE;
  DROP TABLE "_projects_v_version_template_f_a_qs" CASCADE;
  DROP TABLE "_projects_v_version_template_f_a_qs_locales" CASCADE;
  DROP TABLE "_projects_v_version_seo_keywords" CASCADE;
  DROP TABLE "_projects_v_version_seo_keywords_locales" CASCADE;
  DROP TABLE "_projects_v_version_metrics" CASCADE;
  DROP TABLE "_projects_v_version_metrics_locales" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "quick_projects_tags" CASCADE;
  DROP TABLE "quick_projects_tags_locales" CASCADE;
  DROP TABLE "quick_projects" CASCADE;
  DROP TABLE "quick_projects_locales" CASCADE;
  DROP TABLE "services_service_tags" CASCADE;
  DROP TABLE "services_service_tags_locales" CASCADE;
  DROP TABLE "services_tech_tags" CASCADE;
  DROP TABLE "services_tech_tags_locales" CASCADE;
  DROP TABLE "services_images" CASCADE;
  DROP TABLE "services" CASCADE;
  DROP TABLE "services_locales" CASCADE;
  DROP TABLE "home_faqs" CASCADE;
  DROP TABLE "home_faqs_locales" CASCADE;
  DROP TABLE "experiences" CASCADE;
  DROP TABLE "experiences_locales" CASCADE;
  DROP TABLE "top_marquee_services" CASCADE;
  DROP TABLE "top_marquee_services_locales" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_quick_projects_status";
  DROP TYPE "public"."enum_services_status";
  DROP TYPE "public"."enum_home_faqs_status";
  DROP TYPE "public"."enum_experiences_status";
  DROP TYPE "public"."enum_top_marquee_services_status";`)
}
