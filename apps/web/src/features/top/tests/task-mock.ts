import { faker } from "@faker-js/faker";
import { Task } from "../types/task";

export const taskMock = (): Task => ({
  id: faker.number.int(),
  title: faker.word.noun(),
  isCompleted: faker.datatype.boolean(),
});
