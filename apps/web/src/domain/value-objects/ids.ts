import { z } from "zod";
import { TaskId } from "../types";
import { err, ok, Result, ValidationError } from "@/core/result";

const taskIdSchema = z.number().int().positive();

export const validateTaskId = (
  id: unknown,
): Result<TaskId, ValidationError> => {
  if (!id) {
    return err(new ValidationError("Task ID is required"));
  }

  const result = taskIdSchema.safeParse(id);

  if (!result.success) {
    return err(new ValidationError("Task ID is invalid"));
  }

  return ok(result.data as TaskId);
};
