CREATE TABLE IF NOT EXISTS "cv" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(300) DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL
);
