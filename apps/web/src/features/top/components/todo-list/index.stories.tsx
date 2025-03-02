import { Meta, StoryObj } from "@storybook/react";
import { faker } from "@faker-js/faker";
import { TodoList } from ".";

type Story = StoryObj<typeof TodoList>;

export const Default: Story = {};

export default {
  title: "features/top/todo-list",
  component: TodoList,
  args: {
    tasks: Array.from({ length: 10 }).map(() => ({
      id: faker.string.uuid(),
      title: faker.word.noun(),
      isCompleted: faker.datatype.boolean(),
      createdAt: faker.date.anytime().toISOString(),
      updatedAt: faker.date.anytime().toISOString(),
    })),
  },
} satisfies Meta<typeof TodoList>;
