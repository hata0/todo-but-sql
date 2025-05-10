import { InferSelectModel } from "drizzle-orm";
import { Result, ValidationError } from "@/core/result";
import { tasks } from "@/infrastructure/database/schema";
import { Task } from "@/domain/entities/task";
import { validateTaskId } from "@/domain/value-objects/ids";

export const mapToTask = (
  t: InferSelectModel<typeof tasks>,
): Result<Task, ValidationError> => {
  const idOrError = validateTaskId(t.id);
  return idOrError.map((id) => ({
    id,
    title: t.title,
    isCompleted: t.isCompleted,
  }));
};
