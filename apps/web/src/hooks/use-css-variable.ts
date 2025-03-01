"use client";

import { useEffect, useState } from "react";
import { useIsClient } from "./use-is-client";

/**
 * 指定された CSS 変数の値を取得し、リアクティブに更新するカスタムフック。テーマで変化する色を取得するときにのみ使用するべき
 * @param variableName - 取得したい CSS 変数名（例: "--primary-color"）
 * @param fn - 取得した値を変換する関数（デフォルトはそのまま返す）
 * @returns 変換後の CSS 変数の値
 */
export const useCssVariable = <T>(
  variableName: string,
  transformFn: (value: string) => T = (v) => v as T,
): T | null => {
  const isClient = useIsClient();
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    if (isClient) {
      const observer = new MutationObserver(() => {
        setValue(transformFn(getCssVariable(variableName)));
      });

      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["style"],
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, [variableName, transformFn, isClient]);

  return value;
};

/**
 * 指定された CSS 変数の値を取得する関数。
 * @param variableName - 取得したい CSS 変数名（例: "--primary"）
 * @returns CSS 変数の値（文字列）
 */
export const getCssVariable = (variableName: string): string => {
  // ルート要素のスタイルを取得
  const root = document.documentElement;
  const computedStyle = getComputedStyle(root);
  return computedStyle.getPropertyValue(variableName).trim();
};
