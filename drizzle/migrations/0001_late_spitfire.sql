ALTER TABLE "about" ALTER COLUMN "bio" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "about" ADD COLUMN "highlights" json DEFAULT '[]'::json;--> statement-breakpoint
ALTER TABLE "about" DROP COLUMN IF EXISTS "highlight";--> statement-breakpoint
ALTER TABLE "about" DROP COLUMN IF EXISTS "icon";