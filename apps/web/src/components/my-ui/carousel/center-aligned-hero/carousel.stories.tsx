import { cn } from "@/lib/utils";
import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { CenterAlignedHeroCarousel } from "./carousel";

type Story = StoryObj<typeof CenterAlignedHeroCarousel>;

export const Default: Story = {};

export default {
  title: "my-ui/carousel/center-aligned-hero-carousel",
  component: CenterAlignedHeroCarousel,
  args: {
    items: Array.from({ length: 10 }).map((_, i) =>
      i % 3 === 0 || i % 5 === 0
        ? { src: "/placeholder/square.png", alt: "mock" }
        : { src: "/placeholder/banner.png", alt: "mock" },
    ),
    className: "h-[200px] w-[360px]",
    children: ({ item, className }) => (
      // object-coverではみ出す場合はトリミング。
      // 画像のアスペクト比が異なる場合、一部の画像が拡大されて表示されるため、別のレイアウトにすることを検討するべき
      <Image
        width={500}
        height={300}
        className={cn(className, "h-full w-full object-cover")}
        {...item}
      />
    ),
  },
} satisfies Meta<
  typeof CenterAlignedHeroCarousel<{ src: string; alt: string }>
>;
