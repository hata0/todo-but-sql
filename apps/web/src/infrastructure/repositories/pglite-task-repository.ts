import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { eq, InferSelectModel } from "drizzle-orm";
import { TaskRepository } from "@/domain/repositories/task-repository";
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
import { validateTaskId } from "@/domain/value-objects/ids";

type Client<T extends Record<string, unknown>, U extends PGlite> = ReturnType<
  typeof drizzle<T, U>
>;

export class PgliteTaskRepository<
  T extends Record<string, unknown> = Record<string, never>,
  U extends PGlite = PGlite,
> implements TaskRepository
{
  constructor(private readonly client: Client<T, U>) {}

  async findAll(): Promise<Result<Task[], ValidationError | SystemError>> {
    const result = await fromPromise(
      this.client.select().from(tasksTable),
      toSystemError,
    );
    if (result.isErr()) {
      return err(result.error);
    }
    return sequence(result.value.map((t) => this.mapToTask(t)));
  }

  async findAllCompleted(): Promise<
    Result<Task[], ValidationError | SystemError>
  > {
    const result = await fromPromise(
      this.client
        .select()
        .from(tasksTable)
        .where(eq(tasksTable.isCompleted, true)),
      toSystemError,
    );
    if (result.isErr()) {
      return err(result.error);
    }
    return sequence(result.value.map((t) => this.mapToTask(t)));
  }

  async findAllUncompleted(): Promise<
    Result<Task[], ValidationError | SystemError>
  > {
    const result = await fromPromise(
      this.client
        .select()
        .from(tasksTable)
        .where(eq(tasksTable.isCompleted, false)),
      toSystemError,
    );
    if (result.isErr()) {
      return err(result.error);
    }
    return sequence(result.value.map((t) => this.mapToTask(t)));
  }

  private mapToTask(
    t: InferSelectModel<typeof tasksTable>,
  ): Result<Task, ValidationError> {
    const idOrError = validateTaskId(t.id);
    return idOrError.map((id) => ({
      id,
      title: t.title,
      isCompleted: t.isCompleted,
    }));
  }
}
