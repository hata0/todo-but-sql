import { AppError, Result } from "@/core/result";
import { Task } from "@/domain/entities/task";

export type ListTaskInput =
  | {
      isCompleted?: boolean;
    }
  | undefined;

export type ListTaskDto = {
  tasks: Task[];
};

export type ListTask = (
  input: ListTaskInput,
) => Promise<Result<ListTaskDto, AppError>>;
