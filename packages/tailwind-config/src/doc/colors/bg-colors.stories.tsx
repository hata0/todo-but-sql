import { Meta, StoryObj } from "@storybook/react";
import { bgList } from "./category-list";
import { cn } from "../../lib/utils";

const ColorBox = ({ className }: { className: string }) => {
  return <div className={className}>{className}</div>;
};

const BgColorsComponent = () => {
  return (
    <div>
      {bgList.map((bg) => (
        <ColorBox className={cn(`bg-${bg}`)}></ColorBox>
      ))}
    </div>
  );
};

type Story = StoryObj<typeof BgColorsComponent>;

export const BgColors: Story = {};

export default {
  title: "Colors",
  component: BgColorsComponent,
} satisfies Meta<typeof BgColorsComponent>;
