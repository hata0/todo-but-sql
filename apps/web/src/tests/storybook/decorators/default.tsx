import type { Decorator } from "@storybook/react";
import { useEffect } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { NextIntlClientProvider } from "next-intl";
import en from "../../../../messages/en.json";
import ja from "../../../../messages/ja.json";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/shadcn-ui/sonner";
import { LocalDbProviderMock } from "@/components/providers/local-db-provider";

const messagesByLocale = new Map([
  ["en", en],
  ["ja", ja],
]);

export const DefaultDecorator: Decorator = (Story, c) => {
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

  const currentLocale = c.globals.locale as string;
  const currentMessages = messagesByLocale.get(currentLocale);

  return (
    <NextIntlClientProvider locale={currentLocale} messages={currentMessages}>
      <NuqsAdapter>
        <LocalDbProviderMock>
          <ThemeProvider>
            <Story />
            <Toaster />
          </ThemeProvider>
        </LocalDbProviderMock>
      </NuqsAdapter>
    </NextIntlClientProvider>
  );
};
