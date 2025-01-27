import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./config/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_pZVNB6Fw9bUA@ep-ancient-rain-a4pgqd9v-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require",
  },
});
