import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TodoForm } from ".";

type Story = StoryObj<typeof TodoForm>;

export const Default: Story = {};

export default {
  title: "features/top/todo-form",
  component: TodoForm,
  args: {
    onSubmit: fn(),
  },
} satisfies Meta<typeof TodoForm>;
