import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";
import { Props, QueryOverlay } from "./query-overlay";

const Example = ({ onQueryExecute }: Omit<Props, "isOpen" | "setIsOpen">) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <QueryOverlay
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      onQueryExecute={onQueryExecute}
    />
  );
};

type Story = StoryObj<typeof Example>;

export const Default: Story = {};

const meta: Meta<typeof Example> = {
  title: "Features/top/QueryOverlay",
  component: Example,
  args: {
    onQueryExecute: fn(),
  },
};
export default meta;
