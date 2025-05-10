import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/infrastructure/database/pglite/migrations",
  schema: "./src/infrastructure/database/pglite/schema.ts",
  dialect: "postgresql",
});
