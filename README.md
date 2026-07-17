# Nava UI

A modern React component library built for scale.

[![CI/CD](https://github.com/whydrf/nava-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/whydrf/nava-ui/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Engineering Principles

| Principle                 | Implementation                                                  |
| ------------------------- | --------------------------------------------------------------- |
| **ESM First**             | `"type": "module"` with dual ESM/CJS output via tsdown          |
| **Tree-Shakable**         | Subpath exports + `sideEffects` flag — import only what you use |
| **SSR Compatible**        | Zero client-only assumptions, works in RSC and traditional SSR  |
| **TypeScript Native**     | Source written in TypeScript, `.d.ts` generated per entry point |
| **Monorepo Architecture** | pnpm workspaces + Turborepo for parallel task orchestration     |
| **Automated Releases**    | Changesets for versioning, CI publishes to npm on merge to main |

## Quick Start

```bash
pnpm install nava-ui
```

```tsx
import { Button } from "nava-ui/button";
import "nava-ui/style.css";

function App() {
  return <Button variant="primary">Hello</Button>;
}
```

## Package Structure

```
nava-ui-monorepo/
├── apps/
│   ├── package/          # nava-ui (publishable library)
│   │   └── src/
│   │       ├── components/
│   │       │   ├── button/
│   │       │   └── index.ts
│   │       └── styles/       # Design tokens
│   └── documentary/      # Next.js documentation site
├── docs/                 # Architecture & decision docs
├── turbo.json
├── eslint.config.mjs
└── pnpm-workspace.yaml
```

## Contributing

See [docs/contributing.md](docs/contributing.md).

## Documentation

- [Architecture](docs/architecture.md) — why things are the way they are
- [Tree Shaking](docs/tree-shaking.md) — how imports are optimized
- [Release Process](docs/release.md) — versioning and publishing
- [Contributing](docs/contributing.md) — how to add components

## License

MIT
