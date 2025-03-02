import { font } from "@/config/font";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type Props = {
  type: "email" | "password" | "tel" | "text";
} & ComponentProps<"input">;
export const TextField = ({ type, className, ...props }: Props) => {
  return (
    <input
      type={type}
      className={cn(
        font.body,
        "bg-surface-container-highest rounded-t-radius-xs text-on-surface border-b-[1px] border-on-surface-variant caret-primary h-[56px] py-padding-8 px-padding-16 hover:border-on-surface hover:brightness-hover-focus focus:border-primary focus:border-b-[2px] outline-none",
        className,
      )}
      {...props}
    />
  );
};
