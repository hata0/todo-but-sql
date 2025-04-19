import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { QueryDrawer } from "./query-drawer";

type Story = StoryObj<typeof QueryDrawer>;

export const Default: Story = {};

export default {
  title: "Features/top/QueryDrawer",
  component: QueryDrawer,
  args: {
    onQueryExecute: fn(),
  },
} satisfies Meta<typeof QueryDrawer>;
