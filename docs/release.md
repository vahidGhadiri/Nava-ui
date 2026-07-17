# Release Process

How versions are managed and published to npm.

## Overview

Nava UI uses [Changesets](https://github.com/changesets/changesets) for version management. The flow:

```
Developer adds changeset → PR merged to main → CI creates "Version Packages" PR → merge → npm publish
```

## Step by Step

### 1. Add a Changeset

Before merging a PR, run:

```bash
pnpm changeset
```

This prompts for:

- **Which packages changed** → `nava-ui`
- **Semver bump** → `patch` / `minor` / `major`
- **Summary** → human-readable description of the change

It creates a markdown file in `.changeset/`:

```md
---
"nava-ui": minor
---

Add Input component with password toggle support
```

Commit this file with your PR.

### 2. Merge to Main

When the PR merges, the CI `publish` job runs the `changesets/action`. It does one of two things:

- **If changesets exist**: Opens a PR titled "chore: version packages" that bumps versions and updates the changelog
- **If no changesets exist**: Does nothing

### 3. Merge the Version PR

The "Version Packages" PR:

- Bumps `version` in `apps/package/package.json`
- Generates `CHANGELOG.md` entries from changeset files
- Deletes the consumed changeset files

### 4. Publish

After the version PR merges to main, the CI publish job runs again. This time there are no pending changesets, so it:

- Builds the library
- Runs `pnpm release` (`turbo run build && changeset publish`)
- Publishes to npm

## Configuration

```json
// .changeset/config.json
{
  "access": "public",
  "baseBranch": "develop",
  "updateInternalDependencies": "patch"
}
```

- **`access: "public"`** — publishes as public on npm (not scoped private)
- **`baseBranch: "develop"`** — changesets compare against `develop`, not `main`
- **`updateInternalDependencies: "patch"`** — if workspace packages depend on each other, bump them automatically

## Version Bumps

| Change          | Bump    | Example       |
| --------------- | ------- | ------------- |
| Bug fix         | `patch` | 0.1.0 → 0.1.1 |
| New feature     | `minor` | 0.1.0 → 0.2.0 |
| Breaking change | `major` | 0.1.0 → 1.0.0 |

## CI Environments

The publish job requires two GitHub secrets:

| Secret         | Purpose                                    |
| -------------- | ------------------------------------------ |
| `GITHUB_TOKEN` | Auto-provided — creates the version PR     |
| `NPM_TOKEN`    | Your npm access token — publishes packages |
