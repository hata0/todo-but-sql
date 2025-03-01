"use client";

import { cn } from "@/lib/utils";
import AutoScroll, {
  type AutoScrollOptionsType,
} from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import type { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { Slot } from "../../core/slot";

type Props = {
  className: string;
  loop?: boolean;
  autoScrollOptions?: AutoScrollOptionsType;
  element?: ReactNode;
} & Omit<ComponentProps<"section">, "children">;
/**
 * 画像の幅に合わせてカルーセルを表示するコンポーネント
 * @param props.className - これでheight, widthを画面サイズに応じて指定する必要がある
 * @param props.loop - ループするかどうか
 * @param props.autoScrollOptions - オートスクロールの設定
 * @param props.element - 別の要素にしたいときに設定
 * @param props.children - UncontainedCarouselItemを渡す
 */
export const UncontainedCarousel = ({
  className,
  loop,
  autoScrollOptions,
  element,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const [emblaRef] = useEmblaCarousel(
    {
      align: "start",
      dragFree: true,
      loop,
    },
    [AutoScroll({ playOnInit: false, ...autoScrollOptions })],
  );

  return (
    <Slot element={element ? element : <section />} {...props}>
      {/* カルーセルの表示領域。ここにheight, widthを適用 */}
      <div ref={emblaRef} className={cn("overflow-hidden", className)}>
        {/* コンテナ。ここにrefでtransformが当たることでスクロールして移動する */}
        {/* gapで指定するとうまくいかないためこちらに-mlを指定 */}
        <ul className="-ml-padding-8 flex h-full">{children}</ul>
      </div>
    </Slot>
  );
};
