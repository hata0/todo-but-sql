import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import { withThemeByClassName } from "@storybook/addon-themes";
import { DefaultDecorator } from "../src/tests/storybook/decorators/default";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
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
