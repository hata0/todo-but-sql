import { Meta, StoryObj } from "@storybook/react";
import { MdCheckBox } from "react-icons/md";
import { ListItem } from ".";

type Story = StoryObj<typeof ListItem>;

export const Default: Story = {};

export default {
  title: "my-ui/list-item",
  component: ListItem,
  args: {
    headline: (props) => <div {...props}>ListItem</div>,
    trailingIcon: ({ containerProps, iconProps }) => (
      <div {...containerProps}>
        <MdCheckBox {...iconProps} />
      </div>
    ),
  },
} satisfies Meta<typeof ListItem>;
