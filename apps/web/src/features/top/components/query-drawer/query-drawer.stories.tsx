import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { Props, QueryDrawer } from "./query-drawer";

const Example = ({ onQueryExecute }: Omit<Props, "isOpen" | "setIsOpen">) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <QueryDrawer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onQueryExecute={onQueryExecute}
    />
  );
};

type Story = StoryObj<typeof Example>;

export const Default: Story = {};

export default {
  title: "Features/top/QueryDrawer",
  component: Example,
  args: {
    onQueryExecute: fn(),
  },
} satisfies Meta<typeof Example>;
