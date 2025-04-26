import { Entity, TaskId } from "../types";

export interface Task extends Entity<TaskId> {
  readonly id: TaskId;
  readonly title: string;
  readonly isCompleted: boolean;
}
