import { eq } from "drizzle-orm";
import { match, P } from "ts-pattern";
import { ClientWithQueryInput } from "../types";
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
import { tasks as tasksTable } from "@/infrastructure/database/schema";

export type GetTasksQueryInput =
  | {
      isCompleted?: boolean;
    }
  | undefined;

export type GetTasksQueryDto = {
  tasks: Task[];
};

export const getTasksPglite = async ({
  input,
  client,
}: ClientWithQueryInput<GetTasksQueryInput>): Promise<
  Result<GetTasksQueryDto, ValidationError | SystemError>
> => {
  const selectQuery = match(input)
    .with({ isCompleted: P.boolean }, ({ isCompleted }) => {
      return client
        .select()
        .from(tasksTable)
        .where(eq(tasksTable.isCompleted, isCompleted));
    })
    .otherwise(() => client.select().from(tasksTable));

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
