import type { Preview } from "@storybook/react";

import { withThemeByClassName } from "@storybook/addon-themes";

import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  decorators: [
    withThemeByClassName({
      themes: {
        Dark: "dark",
        Light: "",
      },
      defaultTheme: "Light",
    }),
  ],
};

export default preview;
