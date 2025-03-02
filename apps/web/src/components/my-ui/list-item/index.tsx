import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { font } from "@/config/font";

type Props = {
  headline: (props: { className: string }) => ReactNode;
  trailingIcon?: (props: {
    containerProps: { className: string };
    iconProps: { className: string };
  }) => ReactNode;
} & Omit<ComponentProps<"li">, "children">;
export const ListItem = ({
  headline,
  trailingIcon,
  className,
  ...props
}: Props) => {
  return (
    <li
      className={cn(
        font.body,
        "px-padding-16 py-padding-8 h-[56px] flex items-center bg-surface text-on-surface gap-padding-16",
        className,
      )}
      {...props}
    >
      {headline({ className: "w-full" })}
      {trailingIcon?.({
        containerProps: {
          className: "flex items-center justify-center ml-auto size-[40px]",
        },
        iconProps: { className: "text-on-surface-variant size-[24px]" },
      })}
    </li>
  );
};
