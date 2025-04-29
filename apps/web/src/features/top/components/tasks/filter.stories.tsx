import { Meta, StoryObj } from "@storybook/react";
import { TasksFilter } from "./filter";

type Story = StoryObj<typeof TasksFilter>;

export const Default: Story = {};

const meta: Meta<typeof TasksFilter> = {
  title: "Features/top/TasksFilter",
  component: TasksFilter,
};
export default meta;
