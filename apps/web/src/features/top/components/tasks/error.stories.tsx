import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { faker } from "@faker-js/faker";
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
    error: new SystemError(faker.lorem.sentence()),
    onResetDatabase: fn(),
  },
};
export default meta;
