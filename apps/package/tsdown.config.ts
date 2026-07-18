import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    button: "src/components/button/index.tsx",
    index: "src/components/index.ts",
  },
  external: ["react", "react-dom", "nava-icon"],
  format: ["esm", "cjs"],
  minify: false,
  clean: true,
  dts: true,
});
