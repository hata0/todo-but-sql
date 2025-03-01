"use client";

import { useListItem } from "@floating-ui/react";
import type {
  ComponentProps,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import { match } from "ts-pattern";
import { Slot } from "../core/slot";
import { DropdownMenuItem as Presenter } from "./menu-item";
import { useDropdownMenuContext } from "./provider";

export type DropdownMenuItemRole =
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "option";

type Props = {
  leadingIcon?: (props: { className: string; selected: boolean }) => ReactNode;
  label: string;
  trailingIcon?: (props: { className: string; selected: boolean }) => ReactNode;
  disabled?: boolean;
  element?: ReactNode;
} & Omit<ComponentProps<"li">, "children" | "role" | "className" | "tabIndex">;
/**
 * DropdownMenuItemはDropdownMenuとあわせて使う
 * @param props.leadingIcon - クラス名を引数に取る関数で、先頭に表示するアイコンをレンダリングします（オプション）
 * @param props.label - メニューアイテムのラベルテキスト
 * @param props.trailingIcon - クラス名を引数に取る関数で、末尾に表示するアイコンをレンダリングします（オプション）
 * @param props.disabled - メニューアイテムが無効かどうかを示すブール値（オプション）
 * @param props.element - 別のタグにしたい時指定
 */
export const DropdownMenuItem = ({
  leadingIcon,
  label,
  trailingIcon,
  disabled,
  element,
  ...props
}: Props) => {
  const menu = useDropdownMenuContext();
  const item = useListItem({ label: disabled ? null : label });

  // TODO: ここのテストがしにくいので切り分ける
  const role = match(menu.role)
    .returnType<DropdownMenuItemRole>()
    .with("menu", () => "menuitem")
    .with("menucheckbox", () => "menuitemcheckbox")
    .with("menuradio", () => "menuitemradio")
    .otherwise(() => "option");
  const selected = disabled ? false : item.index === menu.selectedIndex;
  // ホバーやキーボード操作に応じてフォーカス
  const tabIndex = item.index === menu.activeIndex ? 0 : -1;

  // リンク等の用途の場合
  if (element) {
    return (
      <Presenter
        {...props}
        leadingIcon={leadingIcon}
        label={label}
        trailingIcon={trailingIcon}
        disabled={disabled}
        element={
          <Slot
            element={element}
            {...menu.getItemPropsFactory(item.index)({
              ...(
                element as unknown as ReactElement<HTMLAttributes<HTMLElement>>
              ).props,
              ref: item.ref,
            })}
          />
        }
        role={role}
        selected={selected}
        tabIndex={tabIndex}
      />
    );
  }

  // リストとして使う場合
  return (
    <Presenter
      {...menu.getItemPropsFactory(item.index)({
        ...props,
        ref: item.ref,
      })}
      leadingIcon={leadingIcon}
      label={label}
      trailingIcon={trailingIcon}
      disabled={disabled}
      role={role}
      selected={selected}
      tabIndex={tabIndex}
    />
  );
};
