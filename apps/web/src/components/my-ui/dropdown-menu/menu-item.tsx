"use client";

import { font } from "@/config/font";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";
import { Slot } from "../core/slot";
import type { DropdownMenuItemRole } from "./menu-item.container";

type Props = {
  leadingIcon?: (props: { className: string; selected: boolean }) => ReactNode;
  label: string;
  trailingIcon?: (props: { className: string; selected: boolean }) => ReactNode;
  role: DropdownMenuItemRole;
  selected: boolean;
  disabled?: boolean;
  element?: ReactNode;
} & Omit<ComponentProps<"li">, "children" | "role" | "className">;
export const DropdownMenuItem = ({
  leadingIcon,
  label,
  trailingIcon,
  role,
  selected,
  disabled,
  element,
  tabIndex,
  ...props
}: Props) => {
  const Content = () => {
    return (
      <>
        {leadingIcon?.({
          className: "size-[24px] text-on-surface-variant",
          selected,
        })}
        <span className={cn(font.label, "text-on-surface")}>{label}</span>
        {/* 最後のみ右寄せ */}
        {trailingIcon?.({
          className: "size-[24px] ml-auto text-on-surface-variant",
          selected,
        })}
      </>
    );
  };

  // リンク等の用途の場合
  if (element) {
    return (
      <li role="presentation" {...props}>
        <Slot
          element={element}
          className={cn(listVariants({ selected, disabled }))}
          role={role}
          aria-disabled={disabled}
          tabIndex={tabIndex}
        >
          <Content />
        </Slot>
      </li>
    );
  }

  // ただのリストの場合
  return (
    <li
      className={cn(listVariants({ selected, disabled }))}
      role={role}
      aria-disabled={disabled}
      tabIndex={tabIndex}
      {...props}
    >
      <Content />
    </li>
  );
};

const listVariants = cva(
  // TODO: ここのスタイルの指定は綺麗ではないので改善したい
  "flex h-[48px] min-h-[48px] min-w-[112px] max-w-[280px] items-center gap-padding-12 px-padding-12 aria-disabled:opacity-disabled",
  {
    variants: {
      disabled: {
        true: "",
        false:
          "hover:brightness-hover-focus focus:brightness-hover-focus active:brightness-press",
      },
      selected: {
        true: "bg-secondary-container outline-outline-variant",
        false: "bg-surface-container outline-outline",
      },
    },
    defaultVariants: {
      disabled: false,
      selected: false,
    },
  },
);
