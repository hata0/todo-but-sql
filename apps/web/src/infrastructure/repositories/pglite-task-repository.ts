import { Client } from "../types";
import { TaskRepository } from "@/domain/repositories/task-repository";

export class PgliteTaskRepository implements TaskRepository {
  constructor(private readonly client: Client) {}
}
