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
  isCompleted: boolean().notNull(),
  createdAt: timestamp({ precision: 3 }).notNull(),
  updatedAt: timestamp({ precision: 3 }).notNull(),
});
