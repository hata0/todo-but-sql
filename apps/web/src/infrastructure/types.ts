import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

export type PgliteDatabase<
  T extends Record<string, unknown> = Record<string, never>,
  U extends PGlite = PGlite,
> = ReturnType<typeof drizzle<T, U>>;

export type PgliteDatabaseWithQueryInput<TInput> = {
  input: TInput;
  db: PgliteDatabase;
};
