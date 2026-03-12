CREATE TABLE IF NOT EXISTS "about" (
	"id" serial PRIMARY KEY NOT NULL,
	"bio" varchar(300) DEFAULT '',
	"highlight" varchar(300) DEFAULT '',
	"icon" varchar(300) DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admins_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "contact_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(200) NOT NULL,
	"email" varchar(255) NOT NULL,
	"subject" varchar(300) DEFAULT '' NOT NULL,
	"message" text NOT NULL,
	"read" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "current_project" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(300) DEFAULT '',
	"description" varchar(300) DEFAULT '',
	"tech" varchar(300) DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "experience" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" varchar(200) NOT NULL,
	"company" varchar(200) NOT NULL,
	"location" varchar(200) NOT NULL,
	"duration" varchar(100) NOT NULL,
	"type" varchar(50) DEFAULT 'Full-time' NOT NULL,
	"accent_color" varchar(20) DEFAULT '#06b6d4' NOT NULL,
	"highlights" text NOT NULL,
	"stack" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"subtitle" varchar(200) NOT NULL,
	"description" text NOT NULL,
	"stack" text NOT NULL,
	"github" varchar(500) DEFAULT '#' NOT NULL,
	"live" varchar(500) DEFAULT '#' NOT NULL,
	"accent" varchar(20) DEFAULT '#06b6d4' NOT NULL,
	"accent_b" varchar(20) DEFAULT '#6366f1' NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"stars" integer DEFAULT 0 NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skill_sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"color" varchar(20) DEFAULT '#06b6d4' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"section_id" integer NOT NULL,
	"name" varchar(100) NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stats" (
	"id" serial PRIMARY KEY NOT NULL,
	"shipped" varchar(300) DEFAULT '',
	"experience" varchar(300) DEFAULT '',
	"aiProjects" varchar(300) DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "skills" ADD CONSTRAINT "skills_section_id_skill_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."skill_sections"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
