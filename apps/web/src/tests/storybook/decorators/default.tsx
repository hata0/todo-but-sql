import type { Decorator } from "@storybook/react";
import { useEffect } from "react";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/shadcn-ui/sonner";
import { QueryProvider } from "@/providers/query-provider";

export const DefaultDecorator: Decorator = (Story) => {
  // フォントを追加
  useEffect(() => {
    // const fontVariableArray = fontVariables.split(" ");

    // document.documentElement.classList.add(...fontVariableArray, "list-none");
    document.documentElement.classList.add("list-none");
    return () => {
      // document.documentElement.classList.remove(
      //   ...fontVariableArray,
      //   "list-none",
      // );
      document.documentElement.classList.remove("list-none");
    };
  }, []);

  return (
    <QueryProvider>
      <ThemeProvider>
        <Story />
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  );
};
