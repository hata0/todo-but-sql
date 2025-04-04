import { faker } from "@faker-js/faker";

export const taskMock = () => ({
  id: faker.number.int(),
  title: faker.word.noun(),
  isCompleted: faker.datatype.boolean(),
  createdAt: faker.date.anytime(),
  updatedAt: faker.date.anytime(),
});
