import { cva } from "class-variance-authority";
import type { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { Slot } from "../core/slot";
import { cn } from "@/lib/utils";
import { omit } from "@/utils/object";

type Props = {
  color: "elevated" | "filled" | "outlined";
  className?: string;
  disabled?: boolean;
} & (
  | ({ mode: "button"; element?: ReactNode } & Omit<
      ComponentProps<"button">,
      "color" | "className" | "disabled" | "children"
    >)
  // TODO: draggableは面倒なので必要になったら実装する。
  | ({ mode?: "default" | "draggable"; element?: ReactNode } & Omit<
      ComponentProps<"div">,
      "color" | "className" | "children"
    >)
  // 入れ子のaタグも面倒なので避ける
  | { mode: "link"; element: ReactNode }
);

export const Card = ({
  color,
  className: customClassName,
  // menu-items
  disabled,
  children,
  ...props
}: PropsWithChildren<Props>) => {
  const className = cn(
    cardVariants({ color, mode: props.mode }),
    customClassName,
  );

  // 型ガードの仕様で分割代入して mode === "button" としてpropsを絞り込むことはできないのでこうする
  if (props.mode === "button") {
    return (
      <Slot<ComponentProps<"button">>
        // biome-ignore lint/a11y/useButtonType: <explanation>
        element={<button />}
        type="button"
        {...omit(props, ["mode"])}
        disabled={disabled}
        className={className}
      >
        {children}
      </Slot>
    );
  }

  if (props.mode === "link") {
    if (disabled) {
      return (
        <div aria-disabled className={className}>
          {children}
        </div>
      );
    }
    return (
      <Slot element={props.element} className={className}>
        {children}
      </Slot>
    );
  }

  return (
    <Slot
      element={<div />}
      {...omit(props, ["mode"])}
      aria-disabled={disabled}
      className={className}
    >
      {children}
    </Slot>
  );
};

// TODO: ここにTailwind CSSのクラスを追加する
const cardVariants = cva("", {
  variants: {
    color: {
      elevated: "",
      filled: "",
      outlined: "",
    },
    mode: {
      default: "",
      button: "",
      draggable: "",
      link: "",
    },
    disabled: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    mode: "default",
  },
});
