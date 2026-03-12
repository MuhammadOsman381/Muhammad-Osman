export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  driver: "pg",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};
