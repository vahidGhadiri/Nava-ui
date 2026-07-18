import type { StorybookConfig } from "@storybook/react-vite";

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function getAbsolutePath(value: string): string {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

const rootDir = resolve(import.meta.dirname, "..");

const config: StorybookConfig = {
  viteFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      "@utils": resolve(rootDir, "src/utils/compose-class-names/index.ts"),
      "@utils/*": resolve(rootDir, "src/utils/*"),
    };
    return config;
  },
  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-themes"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite") as "@storybook/react-vite",
    options: {},
  },
  stories: ["../src/**/*.stories.@(ts|tsx)"],
};

export default config;
