import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TasksError } from "./error";
import { SystemError } from "@/core/result";

type Story = StoryObj<typeof TasksError>;

export const Default: Story = {};

export const UnexpectedError: Story = {
  args: {
    error: new Error("Unexpected error"),
  },
};

const meta: Meta<typeof TasksError> = {
  title: "Features/top/TasksError",
  component: TasksError,
  args: {
    error: new SystemError("Test error"),
    onResetDatabase: fn(),
  },
};
export default meta;
