import { Meta, StoryObj } from "@storybook/react";
import { PropsWithChildren } from "react";
import { cn } from "../../lib/utils";
import { textList } from "./category-list";

const ColorBox = ({
  className,
  children,
}: PropsWithChildren<{ className: string }>) => {
  return (
    <div>
      <span>{children}</span>
      <div className="grid grid-cols-2">
        <div
          className={cn("border-border h-40 w-full border bg-white", className)}
        >
          Sample Text
        </div>
        <div
          className={cn("border-border h-40 w-full border bg-black", className)}
        >
          Sample Text
        </div>
      </div>
    </div>
  );
};

const TextColorsComponent = () => {
  return (
    <div className="flex flex-col gap-y-24">
      {textList.map((text) =>
        text === "foreground" ? (
          <ColorBox key={text} className={`text-${text}`}>
            {text}
          </ColorBox>
        ) : (
          <ColorBox key={text} className={`text-${text}-foreground`}>
            {text}
          </ColorBox>
        ),
      )}
    </div>
  );
};

type Story = StoryObj<typeof TextColorsComponent>;

export const TextColors: Story = {};

export default {
  title: "Colors",
  component: TextColorsComponent,
} satisfies Meta<typeof TextColorsComponent>;
