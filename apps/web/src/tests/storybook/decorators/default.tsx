import type { Decorator } from "@storybook/react";
import { useEffect } from "react";
import { fontVariables } from "@/app/font";
import { ThemeProvider } from "@/providers/theme-provider";

export const DefaultDecorator: Decorator = (Story) => {
  // フォントを追加
  useEffect(() => {
    const fontVariableArray = fontVariables.split(" ");

    document.documentElement.classList.add(...fontVariableArray, "list-none");
    return () => {
      document.documentElement.classList.remove(
        ...fontVariableArray,
        "list-none",
      );
    };
  }, []);

  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
};
