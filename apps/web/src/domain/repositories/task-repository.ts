import { Task } from "../entities/task";
import { Result, SystemError, ValidationError } from "@/core/result";

export interface TaskRepository {
  findAll(): Promise<Result<Task[], ValidationError | SystemError>>;

  findAllCompleted(): Promise<Result<Task[], ValidationError | SystemError>>;

  findAllUncompleted(): Promise<Result<Task[], ValidationError | SystemError>>;
}
