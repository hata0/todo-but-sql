import { ComponentProps } from "react";
import { font } from "@/config/font";
import { cn } from "@/lib/utils";

type Props = {
  type: "email" | "password" | "tel" | "text";
} & ComponentProps<"input">;
export const TextField = ({ type, className, ...props }: Props) => {
  return (
    <input
      type={type}
      className={cn(
        font.bodyLarge,
        "bg-surface-container-highest rounded-t-radius-xs text-on-surface border-on-surface-variant caret-primary py-padding-8 px-padding-16 hover:border-on-surface hover:brightness-hover-focus focus:border-primary h-[56px] border-b-[1px] outline-none focus:border-b-[2px]",
        className,
      )}
      {...props}
    />
  );
};
