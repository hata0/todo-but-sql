import { Meta, StoryObj } from "@storybook/react";
import { cn } from "../../lib/utils";
import { bgList } from "./category-list";

const ColorBox = ({ className }: { className: string }) => {
  return <div className={className}>{className}</div>;
};

const BgColorsComponent = () => {
  return (
    <div>
      {bgList.map((bg) => (
        <ColorBox key={bg} className={cn(`bg-${bg}`)}></ColorBox>
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
