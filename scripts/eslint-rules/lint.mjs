import { spawnSync } from "node:child_process";
import path from "node:path";

const LINTABLE_EXTENSIONS = new Set([
  ".jsx",
  ".tsx",
  ".mjs",
  ".cjs",
  ".js",
  ".ts",
]);
const ESLINT_EXTENSIONS = ".js,.jsx,.ts,.tsx,.mjs,.cjs";

const args = process.argv.slice(2);
const shouldFix = args.includes("--fix");
const mode = shouldFix ? "--write" : "--check";
const targetPaths = args.filter((argument) => !argument.startsWith("--"));

const isLintableTarget = (targetPath) => {
  const extension = path.extname(targetPath);

  if (!extension) {
    return true;
  }

  return LINTABLE_EXTENSIONS.has(extension);
};

const lintableTargets = targetPaths.filter(isLintableTarget);

if (targetPaths.length > 0 && lintableTargets.length === 0) {
  process.exit(0);
}

const resolvedTargets = lintableTargets.length > 0 ? lintableTargets : ["."];

const run = (command, commandArgs) => {
  const result = spawnSync(command, commandArgs, {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: false,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
};

run(process.execPath, ["scripts/sort-imports.mjs", mode, ...resolvedTargets]);
run("./node_modules/.bin/eslint", [
  ...resolvedTargets,
  "--ext",
  ESLINT_EXTENSIONS,
  ...(shouldFix ? ["--fix"] : []),
]);
