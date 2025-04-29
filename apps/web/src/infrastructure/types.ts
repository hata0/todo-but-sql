import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";

export type Client<
  T extends Record<string, unknown> = Record<string, never>,
  U extends PGlite = PGlite,
> = ReturnType<typeof drizzle<T, U>>;

export type ClientWithQueryInput<TInput> = {
  input: TInput;
  client: Client;
};
