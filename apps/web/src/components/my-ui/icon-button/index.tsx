import { ComponentProps, ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

type Props = {
  disabled?: boolean;
  children: (props: { className: string }) => ReactNode;
} & Omit<ComponentProps<"button">, "disabled" | "children">;
export const IconButton = ({
  disabled = false,
  type = "button",
  className,
  children,
  ...props
}: Props) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={cn(buttonVariant({ disabled }), className)}
      {...props}
    >
      {children({ className: "size-[24px] text-on-primary" })}
    </button>
  );
};

const buttonVariant = cva(
  "flex items-center justify-center size-[40px] rounded-radius-full bg-primary disabled:opacity-disabled aria-disabled:opacity-disabled",
  {
    variants: {
      disabled: {
        true: "",
        false:
          "hover:brightness-hover-focus focus:brightness-hover-focus active:brightness-press",
      },
    },
  },
);
