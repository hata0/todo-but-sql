import {
  boolean,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const tasksTable = pgTable("tasks", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  isCompleted: boolean("is_completed").notNull(),
  createdAt: timestamp("created_at", { precision: 3 }).notNull(),
  updatedAt: timestamp("updated_at", { precision: 3 }).notNull(),
});
