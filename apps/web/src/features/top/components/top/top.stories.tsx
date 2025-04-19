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
  title: "Features/top/Top",
  component: Top,
  args: {
    isLoading: false,
    tasks: Array.from({ length: 10 }).map(() => taskMock()),
  },
} satisfies Meta<typeof Top>;
