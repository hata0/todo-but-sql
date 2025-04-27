import { eq } from "drizzle-orm";
import { ClientWithQuery } from "../types";
import { mapToTask } from "../utils";
import {
  err,
  fromPromise,
  Result,
  sequence,
  SystemError,
  toSystemError,
  ValidationError,
} from "@/core/result";
import { Task } from "@/domain/entities/task";
import { tasksTable } from "@/db/schema";

export const listPgliteUncompletedTasks = async ({
  client,
}: ClientWithQuery): Promise<Result<Task[], ValidationError | SystemError>> => {
  const result = await fromPromise(
    client.select().from(tasksTable).where(eq(tasksTable.isCompleted, false)),
    toSystemError,
  );
  if (result.isErr()) {
    return err(result.error);
  }
  return sequence(result.value.map((t) => mapToTask(t)));
};
