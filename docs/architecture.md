# Architecture

This document explains the architectural decisions behind Nava UI and why each one matters.

## Monorepo Layout

```
nava-ui-monorepo/
├── apps/
│   ├── package/          # publishable library → npm as "nava-ui"
│   └── documentary/      # Next.js docs site
├── turbo.json
├── eslint.config.mjs
└── pnpm-workspace.yaml
```

**Why `apps/` instead of `packages/`?**

Two workspaces with distinct purposes: one ships to npm, one is internal tooling. Using `apps/` makes the distinction obvious — `apps/package` is the product, `apps/documentary` is supporting infrastructure.

## Build: tsdown

```ts
// apps/package/tsdown.config.ts
entry: {
  button: "src/components/button/index.tsx",
  index: "src/components/index.ts",
},
format: ["esm", "cjs"],
dts: true,
```

**Why tsdown?**

- ESM-first with CJS fallback via a single config
- Generates `.d.ts` per entry point (not one monolithic declaration file)
- Shared chunks are automatically code-split — `button.js` and `index.js` both reference `button-Ba36Yjbs.js`, not duplicate code
- Powered by Rolldown under the hood, so build speed scales with the number of components

**Why separate entry per component?**

```json
"./button": {
  "types": "./dist/button.d.ts",
  "import": "./dist/button.js",
  "require": "./dist/button.cjs"
}
```

Each component gets its own export path. When a consumer writes `import { Button } from "nava-ui/button"`, the bundler resolves directly to `dist/button.js` — no barrel file traversal, no dead code analysis needed. The bundler sees exactly one module.

## CSS Architecture

Design tokens live in `apps/package/src/styles/` as plain CSS custom properties:

```
styles/
├── colors.css        # --nava-primary, --nava-danger, ...
├── spacing.css       # --nava-spacing-1 through --nava-spacing-12
├── border-radius.css # --nava-radius-sm, --nava-radius-md, ...
├── typography.css    # --nava-font-heading, --nava-text-display, ...
├── shadows.css       # --nava-shadow-sm, --nava-shadow-md, ...
└── index.css         # @import all of the above
```

**Why CSS files instead of JS constants?**

- CSS custom properties cascade — consumers can override tokens at any DOM level
- Zero runtime cost — tokens resolve at paint time, not render time
- Framework-agnostic — works in React, Vue, Svelte, or plain HTML
- Native dark mode support via `prefers-color-scheme` or class-based toggling

**Why is `"style.css"` a separate export?**

```json
"./style.css": "./dist/style.css"
```

CSS must be imported explicitly. This means:

1. Consumers control when tokens load (important for SSR)
2. If someone only wants the component JS, they don't pay for CSS
3. CSS can be loaded in a `<link>` tag for critical-path optimization

## The `sideEffects` Flag

```json
"sideEffects": ["**/*.css"]
```

This tells bundlers (webpack, esbuild, Rollup): "Only CSS files have side effects. Everything else can be tree-shaken."

**Why only CSS?**

JS component files export pure functions and React components — no module-level mutations. CSS files register custom properties on `:root`, which is a side effect (it modifies the document). Without this flag, an aggressive bundler might strip CSS imports if it doesn't see them used in JS.

See [tree-shaking.md](tree-shaking.md) for the full picture.

## TypeScript Configuration

```json
{
  "module": "ESNext",
  "moduleResolution": "bundler",
  "jsx": "react-jsx",
  "strict": true,
  "isolatedModules": true
}
```

**Why `moduleResolution: "bundler"`?**

The library is consumed by bundlers (Vite, webpack, Next.js), not by Node.js directly. `"bundler"` resolution supports `exports` maps and extensionless imports, which matches how consumers actually resolve the package.

**Why `isolatedModules: true`?**

Forces every file to be independently transpilable. Prevents patterns like `export { type } from "./x"` that break under single-file transpilation tools (esbuild, SWC, tsdown).

## Task Orchestration: Turborepo

```json
{
  "tasks": {
    "build": { "dependsOn": ["^build"] },
    "dev": { "cache": false, "persistent": true },
    "lint": { "outputs": ["node_modules/.cache/.eslintcache"] }
  }
}
```

**Why `^build` with caret?**

`^build` means "build my dependencies first, then me." If `apps/documentary` depends on `nava-ui`, Turborepo builds `nava-ui` first. Without this, `documentary` would try to import from a package that hasn't been built yet.

## Linting: Flat Config

```js
// eslint.config.mjs
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { perfectionist, prettier, "react-hooks": reactHooks },
    rules: {/* ... */},
  },
];
```

ESLint flat config (v9+) instead of legacy `.eslintrc`. One config file at the root, all apps inherit it. No `.eslintignore` — the `ignores` array handles it.
