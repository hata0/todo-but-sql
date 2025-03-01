"use client";

import {
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  type Ref,
  cloneElement,
  isValidElement,
} from "react";

type Props<T, U> = {
  element: ReactNode;
  ref?: Ref<U>;
  children?: ReactNode;
} & T;

/**
 * `element`を基に、異なる`props`と`children`を持ったReact要素を作成するコンポーネント
 * - `element.props`が引数`props`と被った場合`element.props`は上書きされる
 * - `element.props.children`が引数`children` と被った場合`element.props.children`は上書きされる
 * @param props.element - React要素
 * @param props.children - 上書きしたい`children`
 * @param props.props - 上書きしたい`props`
 */
export const Slot = <
  T extends HTMLAttributes<HTMLElement>,
  U extends HTMLElement = HTMLElement,
>({
  element,
  children,
  ...props
}: Props<T, U>) => {
  // elementがJSXタグか判定し、cloneElementを実行
  return cloneElement(
    getElementOrThrow<Omit<Props<T, U>, "element" | "children">>(element),
    props,
    children ?? (element as unknown as ReactElement<T>).props.children,
  );
};

/** elementがJSXタグなら値を返し、そうでなければエラーを投げる */
const getElementOrThrow = <T,>(element: ReactNode) => {
  // isValidElementでelementがJSXタグか判定
  if (isValidElement<T>(element)) {
    return element;
  }
  throw new Error("children must be a JSX tag");
};
