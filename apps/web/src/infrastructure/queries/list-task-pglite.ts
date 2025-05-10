import { eq } from "drizzle-orm";
import { match, P } from "ts-pattern";
import { PgliteDatabaseWithQueryInput } from "../types";
import { mapToTask } from "../utils";
import {
  err,
  fromPromise,
  ok,
  Result,
  sequence,
  SystemError,
  toSystemError,
  ValidationError,
} from "@/core/result";
import { Task } from "@/domain/entities/task";
import { tasks as tasksTable } from "@/infrastructure/database/pglite/schema";

export type ListTaskInput =
  | {
      isCompleted?: boolean;
    }
  | undefined;

export type ListTaskDto = {
  tasks: Task[];
};

export const listTaskPglite = async ({
  input,
  db,
}: PgliteDatabaseWithQueryInput<ListTaskInput>): Promise<
  Result<ListTaskDto, ValidationError | SystemError>
> => {
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
