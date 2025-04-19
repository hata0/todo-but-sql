import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Props = ComponentProps<"ul">;
export const TypographyUl = ({ className, ...props }: Props) => {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  );
};
