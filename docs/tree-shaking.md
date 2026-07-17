# Tree Shaking

How Nava UI ensures consumers only ship code they actually use.

## The Setup

Three things work together to make the library tree-shakable:

### 1. Subpath Exports

```json
{
  "exports": {
    ".": { "import": "./dist/index.js" },
    "./button": { "import": "./dist/button.js" }
  }
}
```

Each component has its own entry point. When a consumer writes:

```ts
import { Button } from "nava-ui/button";
```

The bundler resolves to exactly `dist/button.js` (1.1 kB) + its shared chunk `dist/button-Ba36Yjbs.js`. It never touches `index.js` or any other component's code.

Without subpath exports, the only option is:

```ts
import { Button } from "nava-ui";
```

This resolves to `dist/index.js`, which re-exports everything. The bundler then needs to analyze and tree-shake the barrel — adding build time and occasionally failing with less aggressive tree-shaking configurations.

### 2. The `sideEffects` Flag

```json
"sideEffects": ["**/*.css"]
```

This is a contract with the bundler:

> "My JS files are pure — they export functions and components with no module-level side effects. If none of these exports are used, you can safely eliminate the entire module. Only CSS files register side effects (custom properties on `:root`)."

**Without this flag**, bundlers like webpack conservatively assume every module might have side effects. They keep all imported modules even if nothing is used, because they can't prove it's safe to remove them.

**With this flag**, webpack/esbuild/Rollup can:

- Detect unused exports in JS files
- Eliminate entire modules that are imported but never referenced
- Keep CSS imports (because they're flagged as having side effects)

### 3. ESM Format

```json
"type": "module"
```

ESM uses static `import`/`export` syntax, which bundlers can statically analyze. CommonJS uses `require()` and `module.exports`, which are dynamic — a `require()` call inside an `if` block can't be analyzed at build time.

The library ships both formats:

```json
{
  "import": "./dist/button.js", // ESM
  "require": "./dist/button.cjs" // CJS
}
```

Modern bundlers (Vite, webpack 5, esbuild) resolve the `import` condition and get tree-shakable ESM. Older tools or Node.js `require()` get CJS.

## Build Output

```
dist/
├── button.js                    → re-export entry (66B)
├── button-Ba36Yjbs.js          → actual implementation (1.1 kB)
├── index.js                     → barrel entry (66B)
└── index-Cq5b03-k.d.ts         → shared type declarations
```

tsdown automatically code-splits shared code into chunks. Both `button.js` and `index.js` import from the same chunk file, so there's zero duplication.

## Consumer Impact

```ts
// ✅ Only Button code is bundled (~1.1 kB)
import { Button } from "nava-ui/button";

// ✅ Only Button code is bundled (tree-shakes index.js)
import { Button } from "nava-ui";

// ✅ Only CSS tokens are loaded, no JS
import "nava-ui/style.css";

// ❌ Don't do this — defeats tree-shaking
import * as Nava from "nava-ui";
```

The first two patterns result in the same bundle size. The subpath export (`nava-ui/button`) is more explicit and works without tree-shaking analysis.

## What Happens When You Add a New Component

1. Create the component in `src/components/input/`
2. Add an entry point in `tsdown.config.ts`
3. Add a subpath export in `package.json`:

```json
"./input": {
  "types": "./dist/input.d.ts",
  "import": "./dist/input.js",
  "require": "./dist/input.cjs"
}
```

4. Consumers can now `import { Input } from "nava-ui/input"` — only Input code ships.
