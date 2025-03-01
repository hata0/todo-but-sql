import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { Slot } from "../core/slot";

type IconProps = {
  className: string;
};

type Props = {
  size: "sm" | "md" | "lg";
  shape: "default" | "circle";
  color: "surface" | "primary" | "secondary" | "tertiary";
  children: (props: IconProps) => ReactNode;
  className?: string;
} & (
  | { element: () => ReactNode }
  | ({ element?: undefined } & Omit<ComponentProps<"button">, "children">)
);
/**
 * 画面上で最も一般的または重要なアクションにはFABを使用する
 * - FABはコンテンツがスクロールしている間も画面上に残るようにする必要がある
 * @param props.size - ボタンのサイズ ("sm" | "md" | "lg")
 * @param props.shape - ボタンの形状 ("default" | "circle")
 * @param props.color - ボタンの色 ("surface" | "primary" | "secondary" | "tertiary")
 * @param props.children - ボタンのアイコン
 * @param props.className - ボタンの位置やマージンなどを制御する必要があるときに使う
 * @param props.element - 別のタグにしたい時に指定。
 */
export const FloatingActionButton = ({
  size,
  shape,
  color,
  className,
  // icon
  children,
  ...props
}: Props) => {
  // disabledは状態として不要なため設定しない

  // ボタンとして扱う時
  if (!props.element) {
    const type = props.type ? props.type : "button";
    return (
      <button
        type={type}
        className={cn(buttonVariants({ color, size, shape }), className)}
        {...props}
      >
        {children({ className: cn(iconVariants({ size })) })}
      </button>
    );
  }

  // elementとして扱う時
  return (
    <Slot
      element={props.element()}
      className={cn(buttonVariants({ color, size, shape }), className)}
    >
      {children({ className: cn(iconVariants({ size })) })}
    </Slot>
  );
};

const buttonVariants = cva(
  "flex items-center justify-center outline-outline transition cursor-pointer z-level1 shadow-flat active:brightness-press hover:brightness-hover-focus focus:brightness-hover-focus",
  {
    variants: {
      color: {
        surface: "bg-surface-container-low text-primary",
        primary: "bg-primary-container text-on-primary-container",
        secondary: "bg-secondary-container text-on-secondary-container",
        tertiary: "bg-tertiary-container text-on-tertiary-container",
      },
      size: {
        sm: "size-[40px] rounded-radius-md",
        md: "size-[56px] rounded-radius-lg",
        lg: "size-[96px] rounded-radius-xl",
      },
      shape: {
        default: "",
        circle: "rounded-radius-full",
      },
    },
  },
);

const iconVariants = cva("", {
  variants: {
    size: {
      sm: "size-[24px]",
      md: "size-[24px]",
      lg: "size-[36px]",
    },
  },
});
