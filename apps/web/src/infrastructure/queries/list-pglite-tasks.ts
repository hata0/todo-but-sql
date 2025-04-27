import { eq } from "drizzle-orm";
import { match, P } from "ts-pattern";
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
import { tasks } from "@/db/schema";

type Query = {
  isCompleted?: boolean;
};

export const listPgliteTasks = async ({
  query,
  client,
}: ClientWithQuery<Query>): Promise<
  Result<Task[], ValidationError | SystemError>
> => {
  const selectQuery = match(query)
    .with({ isCompleted: P.boolean }, ({ isCompleted }) => {
      return client
        .select()
        .from(tasks)
        .where(eq(tasks.isCompleted, isCompleted));
    })
    .otherwise(() => client.select().from(tasks));

  const result = await fromPromise(selectQuery, toSystemError);
  if (result.isErr()) {
    return err(result.error);
  }
  return sequence(result.value.map((t) => mapToTask(t)));
};
