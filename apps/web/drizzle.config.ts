import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/infrastructure/database/migrations",
  schema: "./src/infrastructure/database/schema.ts",
  dialect: "postgresql",
});
