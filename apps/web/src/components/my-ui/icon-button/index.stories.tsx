import type { Meta, StoryObj } from "@storybook/react";
import { Heart } from "lucide-react";
import { IconButton } from ".";

type Story = StoryObj<typeof IconButton>;

export const Default: Story = {};

export default {
  title: "my-ui/icon-button",
  component: IconButton,
  args: {
    children: (props) => <Heart {...props} />,
  },
} satisfies Meta<typeof IconButton>;
