import { pgTable, serial, text, boolean, integer, timestamp, varchar } from "drizzle-orm/pg-core";

// ── Admin users ──────────────────────────────────────────────────────────────
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Skill sections (e.g. "Frontend", "Backend") ──────────────────────────────
export const skillSections = pgTable("skill_sections", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  color: varchar("color", { length: 20 }).notNull().default("#06b6d4"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Individual skills within a section ───────────────────────────────────────
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  sectionId: integer("section_id").notNull().references(() => skillSections.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Projects ──────────────────────────────────────────────────────────────────
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  subtitle: varchar("subtitle", { length: 200 }).notNull(),
  description: text("description").notNull(),
  stack: text("stack").notNull(), // JSON array string
  github: varchar("github", { length: 500 }).notNull().default("#"),
  live: varchar("live", { length: 500 }).notNull().default("#"),
  accent: varchar("accent", { length: 20 }).notNull().default("#06b6d4"),
  accentB: varchar("accent_b", { length: 20 }).notNull().default("#6366f1"),
  featured: boolean("featured").notNull().default(false),
  stars: integer("stars").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Experience ────────────────────────────────────────────────────────────────
export const experience = pgTable("experience", {
  id: serial("id").primaryKey(),
  role: varchar("role", { length: 200 }).notNull(),
  company: varchar("company", { length: 200 }).notNull(),
  location: varchar("location", { length: 200 }).notNull(),
  duration: varchar("duration", { length: 100 }).notNull(),
  type: varchar("type", { length: 50 }).notNull().default("Full-time"),
  accentColor: varchar("accent_color", { length: 20 }).notNull().default("#06b6d4"),
  highlights: text("highlights").notNull(), // JSON array string
  stack: text("stack").notNull(), // JSON array string
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ── Contact messages ──────────────────────────────────────────────────────────
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 300 }).notNull().default(""),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
