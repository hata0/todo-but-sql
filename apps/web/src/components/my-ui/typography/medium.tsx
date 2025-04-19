import { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

type Props<T extends ElementType> = {
  as?: ElementType;
  className?: string;
} & Omit<ComponentProps<T>, "as" | "className">;
export const TypographyMedium = <T extends ElementType = "div">({
  as: Component = "div",
  className,
  ...props
}: Props<T>) => {
  return (
    <Component
      className={cn(
        "text-base font-normal leading-7 md:text-lg md:leading-8",
        className,
      )}
      {...props}
    />
  );
};
