import { Meta, StoryObj } from "@storybook/react";
import { cn } from "../../lib/utils";

const ColorBox = ({ className }: { className: string }) => {
  return (
    <div>
      <span>{className}</span>
      <div className={cn("border-border h-40 w-full border", className)} />
    </div>
  );
};

const BgColorsComponent = () => {
  return (
    <div className="flex flex-col gap-y-24">
      <div className="text-20 grid grid-cols-3 font-bold">
        <div>default</div>
        <div>hover</div>
        <div>focus</div>
      </div>
      <div className="grid grid-cols-3">
        <ColorBox className="bg-background" />
        <ColorBox className="bg-accent" />
        <ColorBox className="bg-background opacity-disabled" />
      </div>
      <div className="grid">
        <ColorBox className="bg-card" />
      </div>
      <div className="grid">
        <ColorBox className="bg-popover" />
      </div>
      <div className="grid grid-cols-3">
        <ColorBox className="bg-primary" />
        <ColorBox className="bg-primary/90" />
        <ColorBox className="bg-primary opacity-disabled" />
      </div>
      <div className="grid grid-cols-3">
        <ColorBox className="bg-secondary" />
        <ColorBox className="bg-secondary/80" />
        <ColorBox className="bg-secondary opacity-disabled" />
      </div>
      <div className="grid">
        <ColorBox className="bg-muted" />
      </div>
      <div className="grid grid-cols-3">
        <ColorBox className="bg-destructive" />
        <ColorBox className="bg-destructive/90" />
        <ColorBox className="bg-destructive opacity-disabled" />
      </div>
    </div>
  );
};

type Story = StoryObj<typeof BgColorsComponent>;

export const BgColors: Story = {};

export default {
  title: "Colors",
  component: BgColorsComponent,
} satisfies Meta<typeof BgColorsComponent>;
