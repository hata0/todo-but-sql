import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { withThemeByClassName } from "@storybook/addon-themes";
import { DefaultDecorator } from "../src/tests/storybook/decorators/default";

const preview: Preview = {
  initialGlobals: {
    locale: "en",
  },
  globalTypes: {
    locale: {
      description: "Global locale for components",
      toolbar: {
        title: "Locale",
        icon: "globe",
        items: [
          { value: "en", icon: "🇺🇸", title: "English", right: "EN" },
          { value: "ja", icon: "🇯🇵", title: "日本語", right: "JP" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    enableTheme: {
      control: "boolean",
    },
  },
  args: {
    enableTheme: true,
  },
  decorators: [
    (Story, c) => {
      if (c.args.enableTheme) {
        return withThemeByClassName({
          themes: {
            light: "light",
            dark: "dark",
            system: "system",
          },
          defaultTheme: "system",
        })(Story, c);
      }
      return Story();
    },
    DefaultDecorator,
  ],
};

export default preview;
