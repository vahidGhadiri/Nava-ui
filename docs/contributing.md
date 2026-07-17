# Contributing

How to add a new component to Nava UI.

## Prerequisites

- Node.js >= 18
- pnpm 9.x

```bash
pnpm install
```

## Adding a Component

### 1. Create the Component

```
apps/package/src/components/input/
├── index.tsx        # component implementation
```

Follow existing patterns (see `components/button/` for reference):

```tsx
import { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // component-specific props
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return <input ref={ref} className={className} {...props} />;
});

Input.displayName = "Input";
```

### 2. Export from the Barrel

Add to `apps/package/src/components/index.ts`:

```ts
export type { InputProps } from "./input";
export { Input } from "./input";
```

### 3. Register the Build Entry

Add to `apps/package/tsdown.config.ts`:

```ts
entry: {
  button: "src/components/button/index.tsx",
  input: "src/components/input/index.tsx",   // ← add
  index: "src/components/index.ts",
},
```

### 4. Add the Subpath Export

Add to `apps/package/package.json` exports:

```json
"./input": {
  "types": "./dist/input.d.ts",
  "import": "./dist/input.js",
  "require": "./dist/input.cjs"
}
```

### 5. Verify

```bash
pnpm build          # builds the library
pnpm lint:check     # runs eslint + prettier
```

### 6. Add a Changeset

```bash
pnpm changeset
```

Select the package (`nava-ui`), the bump type, and write a summary.

## Design Tokens

If your component needs new CSS tokens, add them to the appropriate file in `apps/package/src/styles/`:

| File                | Purpose                  |
| ------------------- | ------------------------ |
| `colors.css`        | Color palette            |
| `spacing.css`       | Spacing scale            |
| `border-radius.css` | Radius values            |
| `typography.css`    | Font sizes, line heights |
| `shadows.css`       | Box shadows              |

Use `--nava-*` prefix for all custom properties.

## Code Style

- ESLint flat config at root (`eslint.config.mjs`)
- Prettier for formatting
- Husky pre-commit runs: lint fix, lint check, format, and checks for `console.log` / `@ts-ignore`
- Conventional commits enforced via commit-msg hook: `feat:`, `fix:`, `chore:`, etc.

## Project Structure

| Directory           | Purpose                               |
| ------------------- | ------------------------------------- |
| `apps/package/`     | Publishable library — ships to npm    |
| `apps/documentary/` | Next.js documentation site (internal) |
| `docs/`             | Architecture decision records         |
