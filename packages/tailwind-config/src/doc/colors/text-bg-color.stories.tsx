import { Meta, StoryObj } from "@storybook/react";
import { BackgroundColor, bgList, TextColor, textList } from "./category-list";

type Props = {
  bgColorClassname: BackgroundColor;
  textColorClassname: TextColor;
};

const TextBgColorComponent = ({
  bgColorClassname,
  textColorClassname,
}: Props) => {
  if (textColorClassname === "foreground") {
    return (
      <div className={`text-${textColorClassname} bg-${bgColorClassname}`}>
        Sample Text
      </div>
    );
  }

  return (
    <div
      className={`text-${textColorClassname}-foreground bg-${bgColorClassname}`}
    >
      Sample Text
    </div>
  );
};

type Story = StoryObj<typeof TextBgColorComponent>;

export const TextBgColor: Story = {};

export default {
  title: "Colors",
  component: TextBgColorComponent,
  argTypes: {
    bgColorClassname: {
      options: bgList,
      control: { type: "select" },
    },
    textColorClassname: {
      options: textList,
      control: { type: "select" },
    },
  },
} satisfies Meta<typeof TextBgColorComponent>;
