import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { taskMock } from "../../tests/task-mock";
import { Top } from "./top";

type Story = StoryObj<typeof Top>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    tasks: [],
  },
};

export default {
  title: "features/top/top",
  component: Top,
  args: {
    isLoading: false,
    tasks: Array.from({ length: 10 }).map(() => taskMock()),
    onTaskCompletedChange: fn(),
  },
} satisfies Meta<typeof Top>;
