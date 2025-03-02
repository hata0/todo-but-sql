import {
  AnimatePresence,
  type HTMLMotionProps,
  motion,
  usePresenceData,
} from "motion/react";
import { type PropsWithChildren, type ReactNode, useState } from "react";
import { useRingBufferIndex } from "@/hooks/use-ring-buffer-index";
import { cn } from "@/lib/utils";

type Props<T> = {
  items: T[];
  className: string;
  children: (props: { item: T; className: string }) => ReactNode;
};
/**
 * 一つの画像を大きく表示するカルーセル
 * @param props.items - アイテムの内容を指定
 * @param props.className - カルーセルのheight,widthを画面幅に応じて指定
 */
export const CenterAlignedHeroCarousel = <T,>({
  items,
  className,
  children,
}: Props<T>) => {
  const [getSelectedIndex, controlSelectedIndex] = useRingBufferIndex(
    items.length,
  );
  // スライドする方向
  const [direction, setDirection] = useState<"left" | "right">("left");

  return (
    <section
      className={cn(
        "grid grid-cols-[40px_1fr_40px] grid-rows-1 gap-padding-8 px-padding-16 py-padding-8 sm:grid-cols-[minmax(40px,56px)_1fr_minmax(40px,56px)]",
        className,
      )}
    >
      <AnimatePresence custom={direction} initial={false} mode="wait">
        <SmallItem
          key={getSelectedIndex(-1)}
          type="button"
          onClick={() => {
            controlSelectedIndex.setPrev();
            setDirection("right");
          }}
          position="left"
        >
          {children({
            item: items[getSelectedIndex(-1)],
            className: "rounded-radius-xl",
          })}
        </SmallItem>
      </AnimatePresence>
      <AnimatePresence custom={direction} initial={false} mode="wait">
        <LargeItem key={getSelectedIndex()}>
          {children({
            item: items[getSelectedIndex()],
            className: "rounded-radius-xl",
          })}
        </LargeItem>
      </AnimatePresence>
      <AnimatePresence custom={direction} initial={false} mode="wait">
        <SmallItem
          key={getSelectedIndex(1)}
          type="button"
          onClick={() => {
            controlSelectedIndex.setNext();
            setDirection("left");
          }}
          position="right"
        >
          {children({
            item: items[getSelectedIndex(1)],
            className: "rounded-radius-xl",
          })}
        </SmallItem>
      </AnimatePresence>
    </section>
  );
};

const LargeItem = ({ children }: PropsWithChildren) => {
  const direction: "left" | "right" = usePresenceData();
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          delay: 0.1,
          visualDuration: 0.1,
          bounce: 0.1,
        },
      }}
      exit={{ opacity: 0, x: direction === "right" ? 50 : -50 }}
      className="h-full rounded-radius-xl border-[1px] border-outline bg-surface shadow-flat hover:brightness-hover-focus focus:brightness-hover-focus active:brightness-press"
    >
      {children}
    </motion.div>
  );
};

const SmallItem = ({
  position,
  className,
  children,
  ...props
}: {
  // どの位置にあるボタンか
  position: "left" | "right";
} & HTMLMotionProps<"button">) => {
  const direction: "left" | "right" = usePresenceData();
  return (
    <motion.button
      initial={{ opacity: 0, x: direction === "left" ? 50 : -50 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          delay: position === direction ? 0.1 : 0.2,
          visualDuration: position === direction ? 0.1 : 0.2,
          bounce: 0.1,
        },
      }}
      exit={{ opacity: 0, x: direction === "left" ? -50 : 50 }}
      className={cn(
        "h-full rounded-radius-xl border-[1px] border-outline bg-surface shadow-flat hover:brightness-hover-focus focus:brightness-hover-focus active:brightness-press",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};
