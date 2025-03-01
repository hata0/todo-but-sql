import { cn } from "@/lib/utils";
import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { UncontainedCarouselItem } from "./carousel-item";

type Story = StoryObj<typeof UncontainedCarouselItem>;

export const Default: Story = {};

export default {
  title: "my-ui/carousel/uncontained-carousel-item",
  component: UncontainedCarouselItem,
  args: {
    children: ({ className }) => (
      <Image
        width={500}
        height={300}
        src="/placeholder/banner.png"
        alt="mock"
        className={cn("h-full w-auto", className)}
      />
    ),
  },
} satisfies Meta<typeof UncontainedCarouselItem>;
