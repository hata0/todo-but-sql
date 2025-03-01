import { cn } from "@/lib/utils";
import type { Meta, StoryObj } from "@storybook/react";
import Image from "next/image";
import { Fragment } from "react";
import { UncontainedCarousel } from "./carousel";
import { UncontainedCarouselItem } from "./carousel-item";

type Story = StoryObj<typeof UncontainedCarousel>;

export const Default: Story = {};

export default {
  title: "my-ui/carousel/uncontained-carousel",
  component: UncontainedCarousel,
  args: {
    className: "w-[800px] h-[200px]",
    children: Array.from({ length: 10 }, (_, i) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
      <Fragment key={i}>
        <UncontainedCarouselItem>
          {/* next/imageではintrinsicなレイアウトはこのように表現する。heightはカルーセルの幅に合わせれば良いだけだが、widthは大まかに設定 */}
          {/* fillだとwidthの指定が必須になり、basisによる制御ができないためこちらを使うしかない */}
          {({ className }) => (
            <Image
              width={500}
              height={300}
              src="/placeholder/square.png"
              alt="mock"
              className={cn("h-full w-auto", className)}
            />
          )}
        </UncontainedCarouselItem>
        <UncontainedCarouselItem>
          {({ className }) => (
            <Image
              width={500}
              height={300}
              src="/placeholder/banner.png"
              alt="mock"
              className={cn("h-full w-auto", className)}
            />
          )}
        </UncontainedCarouselItem>
      </Fragment>
    )),
  },
} satisfies Meta<typeof UncontainedCarousel>;
