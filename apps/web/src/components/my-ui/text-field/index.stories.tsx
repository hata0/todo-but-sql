import { Meta, StoryObj } from "@storybook/react";
import { TextField } from ".";

type Story = StoryObj<typeof TextField>;

export const Default: Story = {};

export default {
  title: "my-ui/text-field",
  component: TextField,
} satisfies Meta<typeof TextField>;
