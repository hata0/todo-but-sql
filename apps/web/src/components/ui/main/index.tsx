import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Main = ({
  className,
  children,
  ...props
}: ComponentProps<"main">) => {
  return (
    <main
      className={cn(
        "flex h-full w-screen flex-col items-center justify-center gap-spacer-normal px-spacer-small sm:px-spacer-normal",
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
};
