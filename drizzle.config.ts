export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  driver: "aws-data-api",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};
