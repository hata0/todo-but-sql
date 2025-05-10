import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  isCompleted: boolean("is_completed").notNull(),
});
