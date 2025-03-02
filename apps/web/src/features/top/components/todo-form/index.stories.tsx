import { Meta, StoryObj } from "@storybook/react";
import { TodoForm } from ".";

type Story = StoryObj<typeof TodoForm>;

export const Default: Story = {};

export default {
  title: "features/top/todo-form",
  component: TodoForm,
} satisfies Meta<typeof TodoForm>;
