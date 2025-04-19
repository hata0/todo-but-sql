import { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  icon: ReactNode;
} & ComponentProps<"button">;
export const TextRevealButton = ({
  children,
  icon,
  className,
  ...props
}: Props) => {
  return (
    <button
      className={cn(
        "group/button bg-primary text-primary-foreground relative inline-flex h-7 w-7 cursor-pointer items-center justify-center overflow-hidden rounded-full font-medium transition-all duration-300 hover:w-24",
        className,
      )}
      {...props}
    >
      <p className="inline-flex whitespace-nowrap text-xs opacity-0 transition-all duration-200 group-hover/button:-translate-x-2.5 group-hover/button:opacity-100">
        {children}
      </p>
      <div className="absolute right-1.5">{icon}</div>
    </button>
  );
};
