import { eq } from "drizzle-orm";
import { match, P } from "ts-pattern";
import { PgliteQuery } from "../types";
import { mapToTask } from "../utils";
import { err, fromPromise, ok, sequence, toSystemError } from "@/core/result";
import { tasks as tasksTable } from "@/infrastructure/database/pglite/schema";
import { ListTask } from "@/application/queries/list-task";

export const listTaskPglite: PgliteQuery<ListTask> = (db) => async (input) => {
  const selectQuery = match(input)
    .with({ isCompleted: P.boolean }, ({ isCompleted }) => {
      return db
        .select()
        .from(tasksTable)
        .where(eq(tasksTable.isCompleted, isCompleted));
    })
    .otherwise(() => db.select().from(tasksTable));

  const result = await fromPromise(selectQuery, toSystemError);
  if (result.isErr()) {
    return err(result.error);
  }

  const tasksOrError = sequence(result.value.map((t) => mapToTask(t)));
  if (tasksOrError.isErr()) {
    return err(tasksOrError.error);
  }

  return ok({ tasks: tasksOrError.value });
};
