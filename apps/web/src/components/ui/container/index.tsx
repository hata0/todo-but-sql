import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Container = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "bg-surface text-on-surface transition duration-500 ease-in-out",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
