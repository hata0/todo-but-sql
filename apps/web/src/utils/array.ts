import { faker } from "@faker-js/faker";

export const generateRandomArray = <T>(
  generatorFn: () => T,
  { min, max }: { min: number; max: number } = { min: 1, max: 10 },
) => {
  const length = faker.number.int({ min, max });
  return Array.from({ length }, generatorFn);
};
