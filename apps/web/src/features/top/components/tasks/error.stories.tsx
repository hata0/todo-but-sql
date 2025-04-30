import { Meta, StoryObj } from "@storybook/react";
import { fn, Mock } from "@storybook/test";
import { faker } from "@faker-js/faker";
import { TasksError } from "./error";
import { DatabaseNotInitializedError, SystemError } from "@/core/result";

type Story = StoryObj<typeof TasksError>;

export const Default: Story = {};

export const UnexpectedError: Story = {
  args: {
    error: new Error(faker.lorem.sentence()),
  },
};

export const ResetDatabaseError: Story = {
  beforeEach: () => {
    (meta.args?.onResetDatabase as Mock).mockResolvedValue("error");
  },
};

export const ResetDatabaseBlocked: Story = {
  beforeEach: () => {
    (meta.args?.onResetDatabase as Mock).mockResolvedValue("blocked");
  },
};

export const ResetDatabaseNotInitialized: Story = {
  beforeEach: () => {
    (meta.args?.onResetDatabase as Mock).mockResolvedValue(
      new DatabaseNotInitializedError(),
    );
  },
};

const meta: Meta<typeof TasksError> = {
  title: "Features/top/TasksError",
  component: TasksError,
  args: {
    error: new SystemError(faker.lorem.sentence()),
    onResetDatabase: fn(),
  },
  beforeEach: () => {
    (meta.args?.onResetDatabase as Mock).mockResolvedValue("success");
  },
};
export default meta;
