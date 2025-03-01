import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export const Container = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "bg-surface-container-lowest text-on-surface transition duration-500 ease-in-out",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
