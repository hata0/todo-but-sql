import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TasksList } from "./list";
import { generateRandomArray } from "@/utils/array";
import { taskMock } from "@/tests/mocks";

type Story = StoryObj<typeof TasksList>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    tasks: [],
  },
};

export const Loading: Story = {
  args: {
    tasks: undefined,
    isLoading: true,
  },
};

export const SomeError: Story = {
  args: {
    tasks: undefined,
    error: new Error(),
  },
};

const meta: Meta<typeof TasksList> = {
  title: "Features/top/TasksList",
  component: TasksList,
  args: {
    tasks: generateRandomArray(() => taskMock()),
    error: null,
    isLoading: false,
    onResetDatabase: fn(),
    onOpenQueryOverlay: fn(),
  },
};
export default meta;
