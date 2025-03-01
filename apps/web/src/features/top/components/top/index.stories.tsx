import { Meta, StoryObj } from "@storybook/react";
import { Top } from ".";

type Story = StoryObj<typeof Top>;

export const Default: Story = {};

export default {
  title: "features/top/top",
  component: Top,
} satisfies Meta<typeof Top>;
