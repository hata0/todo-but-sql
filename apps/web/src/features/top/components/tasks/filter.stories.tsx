import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { TABS_ARRAY } from "../../utils/tab";
import { TasksFilter } from "./filter";

type Story = StoryObj<typeof TasksFilter>;

export const Default: Story = {};

const meta: Meta<typeof TasksFilter> = {
  title: "Features/top/TasksFilter",
  component: TasksFilter,
  args: {
    currentTab: null,
    onTabChange: fn(),
  },
  argTypes: {
    currentTab: {
      control: "select",
      options: [...TABS_ARRAY, null],
    },
  },
};
export default meta;
