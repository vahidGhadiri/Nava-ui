import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    button: "src/components/_abstractions/abstracted-button/index.tsx",
    index: "src/components/_abstractions/index.ts",
  },
  external: ["react", "react-dom", "nava-icon"],
  format: ["esm", "cjs"],
  minify: false,
  clean: true,
  dts: true,
});
