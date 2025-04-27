import { faker } from "@faker-js/faker";
import { Task } from "@/domain/entities/task";
import { TaskId } from "@/domain/types";

export const taskMock = (): Task => ({
  id: faker.number.int({ min: 1 }) satisfies number as TaskId,
  title: faker.word.noun(),
  isCompleted: faker.datatype.boolean(),
});
