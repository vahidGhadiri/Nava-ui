import fs from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const IMPORTABLE_EXTENSIONS = new Set([
  ".jsx",
  ".tsx",
  ".mjs",
  ".cjs",
  ".js",
  ".ts",
]);
const MAX_INLINE_IMPORT_LENGTH = 180;
const MULTILINE_IMPORT_INDENT = " ".repeat(4);
const IGNORED_DIRECTORIES = new Set([
  "node_modules",
  "coverage",
  "report",
  "build",
  ".git",
  "dist",
  "out",
]);
const LOCAL_ALIAS_PREFIXES = [
  "@assets/illustrations",
  "@shared",
  "@adapters",
  "@features",
  "@infrastructure",
  "@components",
  "@services",
  "@configs",
  "@domain",
  "@assets",
  "@utils",
  "@hooks",
];

const args = process.argv.slice(2);
const shouldWrite = args.includes("--write");
const shouldCheck = args.includes("--check") || !shouldWrite;
const inputPaths = args.filter((argument) => !argument.startsWith("--"));
const rootPath = process.cwd();

const getScriptKind = (filePath) => {
  const extension = path.extname(filePath);

  switch (extension) {
    case ".jsx":
      return ts.ScriptKind.JSX;
    case ".tsx":
      return ts.ScriptKind.TSX;
    case ".mjs":
    case ".cjs":
    case ".js":
      return ts.ScriptKind.JS;
    default:
      return ts.ScriptKind.TS;
  }
};

const isDirectiveStatement = (statement) =>
  ts.isExpressionStatement(statement) &&
  ts.isStringLiteral(statement.expression);

const isLocalAlias = (source) =>
  LOCAL_ALIAS_PREFIXES.some(
    (prefix) => source === prefix || source.startsWith(`${prefix}/`),
  );

const getImportGroup = (source) => {
  if (source.startsWith(".")) {
    return "relative";
  }

  if (isLocalAlias(source)) {
    return "alias";
  }

  return "third-party";
};

const createNamedSpecifier = (element) => ({
  importedName: element.propertyName?.text ?? element.name.text,
  localName: element.name.text,
});

const dedupeNamedSpecifiers = (specifiers) => {
  const uniqueSpecifiers = [];
  const seenSpecifiers = new Set();

  for (const specifier of specifiers) {
    const key = `${specifier.importedName}:${specifier.localName}`;

    if (seenSpecifiers.has(key)) {
      continue;
    }

    seenSpecifiers.add(key);
    uniqueSpecifiers.push(specifier);
  }

  return uniqueSpecifiers;
};

const splitImportDeclaration = (statement) => {
  const source = statement.moduleSpecifier.text;
  const importClause = statement.importClause;
  const sharedData = { group: getImportGroup(source), source };

  if (!importClause) {
    return [{ ...sharedData, sideEffectOnly: true, kind: "value" }];
  }

  const entries = [];
  const defaultImportName = importClause.name?.text;

  if (importClause.isTypeOnly) {
    const typeEntry = {
      ...sharedData,
      namespaceImportName: null,
      sideEffectOnly: false,
      defaultImportName,
      namedImports: [],
      kind: "type",
    };

    if (
      importClause.namedBindings &&
      ts.isNamespaceImport(importClause.namedBindings)
    ) {
      typeEntry.namespaceImportName = importClause.namedBindings.name.text;
    }

    if (
      importClause.namedBindings &&
      ts.isNamedImports(importClause.namedBindings)
    ) {
      typeEntry.namedImports =
        importClause.namedBindings.elements.map(createNamedSpecifier);
    }

    return [typeEntry];
  }

  const valueEntry = {
    ...sharedData,
    namespaceImportName: null,
    sideEffectOnly: false,
    defaultImportName,
    namedImports: [],
    kind: "value",
  };
  const typeEntry = {
    ...sharedData,
    namespaceImportName: null,
    defaultImportName: null,
    sideEffectOnly: false,
    namedImports: [],
    kind: "type",
  };

  if (
    importClause.namedBindings &&
    ts.isNamespaceImport(importClause.namedBindings)
  ) {
    valueEntry.namespaceImportName = importClause.namedBindings.name.text;
  }

  if (
    importClause.namedBindings &&
    ts.isNamedImports(importClause.namedBindings)
  ) {
    for (const element of importClause.namedBindings.elements) {
      if (element.isTypeOnly) {
        typeEntry.namedImports.push(createNamedSpecifier(element));
        continue;
      }

      valueEntry.namedImports.push(createNamedSpecifier(element));
    }
  }

  if (
    valueEntry.defaultImportName ||
    valueEntry.namespaceImportName ||
    valueEntry.namedImports.length > 0
  ) {
    entries.push(valueEntry);
  }

  if (typeEntry.namedImports.length > 0) {
    entries.push(typeEntry);
  }

  return entries;
};

const mergeImportEntries = (entries) => {
  const mergedEntries = [];
  const mergedEntryIndexByKey = new Map();

  for (const entry of entries) {
    if (entry.sideEffectOnly) {
      mergedEntries.push(entry);
      continue;
    }

    const mergeKey = `${entry.group}:${entry.kind}:${entry.source}`;
    const existingEntryIndex = mergedEntryIndexByKey.get(mergeKey);

    if (existingEntryIndex === undefined) {
      mergedEntryIndexByKey.set(mergeKey, mergedEntries.length);
      mergedEntries.push({
        ...entry,
        namedImports: [...entry.namedImports],
      });
      continue;
    }

    const existingEntry = mergedEntries[existingEntryIndex];

    if (!existingEntry.defaultImportName && entry.defaultImportName) {
      existingEntry.defaultImportName = entry.defaultImportName;
    }

    if (!existingEntry.namespaceImportName && entry.namespaceImportName) {
      existingEntry.namespaceImportName = entry.namespaceImportName;
    }

    existingEntry.namedImports = dedupeNamedSpecifiers([
      ...existingEntry.namedImports,
      ...entry.namedImports,
    ]);
  }

  return mergedEntries;
};

const renderNamedSpecifier = (specifier) =>
  specifier.importedName === specifier.localName
    ? specifier.importedName
    : `${specifier.importedName} as ${specifier.localName}`;

const renderNamedImports = (namedImports, multiline) => {
  if (!multiline) {
    return `{ ${namedImports.map(renderNamedSpecifier).join(", ")} }`;
  }

  return `{\n${namedImports.map((specifier) => `${MULTILINE_IMPORT_INDENT}${renderNamedSpecifier(specifier)},`).join("\n")}\n}`;
};

const detectImportStyle = (content, importStatements) => {
  let singleQuoteCount = 0;
  let doubleQuoteCount = 0;
  let semicolonCount = 0;

  for (const statement of importStatements) {
    const statementText = content.slice(
      statement.getStart(),
      statement.getEnd(),
    );

    if (statementText.includes('"')) {
      doubleQuoteCount += 1;
    } else if (statementText.includes("'")) {
      singleQuoteCount += 1;
    }

    if (statementText.trimEnd().endsWith(";")) {
      semicolonCount += 1;
    }
  }

  return {
    trailingCharacter:
      semicolonCount >= Math.ceil(importStatements.length / 2) ? ";" : "",
    quote: doubleQuoteCount >= singleQuoteCount ? '"' : "'",
  };
};

const renderImportEntry = (entry, style) => {
  const quotedSource = `${style.quote}${entry.source}${style.quote}`;
  const importKeyword = entry.kind === "type" ? "import type" : "import";

  if (entry.sideEffectOnly) {
    return `import ${quotedSource}${style.trailingCharacter}`;
  }

  const parts = [];

  if (entry.defaultImportName) {
    parts.push(entry.defaultImportName);
  }

  if (entry.namespaceImportName) {
    parts.push(`* as ${entry.namespaceImportName}`);
  }

  if (entry.namedImports.length > 0) {
    const inlineParts = [
      ...parts,
      renderNamedImports(entry.namedImports, false),
    ];
    const inlineStatement = `${importKeyword} ${inlineParts.join(", ")} from ${quotedSource}${style.trailingCharacter}`;
    const shouldUseMultilineNamedImports =
      inlineStatement.length > MAX_INLINE_IMPORT_LENGTH &&
      entry.namedImports.length > 1;

    parts.push(
      renderNamedImports(entry.namedImports, shouldUseMultilineNamedImports),
    );
  }

  return `${importKeyword} ${parts.join(", ")} from ${quotedSource}${style.trailingCharacter}`;
};

const compareImportEntries = (leftEntry, rightEntry, style) => {
  const groupOrder = ["third-party", "alias", "relative"];
  const groupDifference =
    groupOrder.indexOf(leftEntry.group) - groupOrder.indexOf(rightEntry.group);

  if (groupDifference !== 0) {
    return groupDifference;
  }

  const leftText = renderImportEntry(leftEntry, style);
  const rightText = renderImportEntry(rightEntry, style);
  const lengthDifference = rightText.length - leftText.length;

  if (lengthDifference !== 0) {
    return lengthDifference;
  }

  const sourceDifference = leftEntry.source.localeCompare(rightEntry.source);

  if (sourceDifference !== 0) {
    return sourceDifference;
  }

  if (leftEntry.kind !== rightEntry.kind) {
    return leftEntry.kind.localeCompare(rightEntry.kind);
  }

  return leftText.localeCompare(rightText);
};

const sortImportBlock = (content, filePath) => {
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    getScriptKind(filePath),
  );
  const topStatements = [];
  let firstImportStatement = null;

  for (const statement of sourceFile.statements) {
    if (!firstImportStatement && isDirectiveStatement(statement)) {
      continue;
    }

    if (ts.isImportDeclaration(statement)) {
      firstImportStatement ??= statement;
      topStatements.push(statement);
      continue;
    }

    break;
  }

  if (!firstImportStatement || topStatements.length === 0) {
    return content;
  }

  const lastImportStatement = topStatements.at(-1);
  const beforeImports = content.slice(0, firstImportStatement.getFullStart());
  const afterImports = content.slice(lastImportStatement.getEnd());
  const importStyle = detectImportStyle(content, topStatements);
  const sortedEntries = mergeImportEntries(
    topStatements.flatMap(splitImportDeclaration),
  ).sort((leftEntry, rightEntry) =>
    compareImportEntries(leftEntry, rightEntry, importStyle),
  );
  const groupedEntries = ["third-party", "alias", "relative"]
    .map((group) => sortedEntries.filter((entry) => entry.group === group))
    .filter((entries) => entries.length > 0)
    .map((entries) =>
      entries.map((entry) => renderImportEntry(entry, importStyle)).join("\n"),
    );
  const rebuiltImportBlock = groupedEntries.join("\n\n");

  return `${beforeImports}${rebuiltImportBlock}${afterImports}`;
};

const collectFiles = async (entryPath) => {
  const resolvedPath = path.resolve(rootPath, entryPath);
  const pathStats = await fs.stat(resolvedPath);

  if (pathStats.isDirectory()) {
    const directoryEntries = await fs.readdir(resolvedPath, {
      withFileTypes: true,
    });
    const nestedFiles = await Promise.all(
      directoryEntries
        .filter(
          (directoryEntry) => !IGNORED_DIRECTORIES.has(directoryEntry.name),
        )
        .map((directoryEntry) =>
          collectFiles(path.join(resolvedPath, directoryEntry.name)),
        ),
    );

    return nestedFiles.flat();
  }

  return IMPORTABLE_EXTENSIONS.has(path.extname(resolvedPath))
    ? [resolvedPath]
    : [];
};

const getTargetFiles = async () => {
  const pathsToScan = inputPaths.length > 0 ? inputPaths : ["."];
  const collectedFiles = await Promise.all(pathsToScan.map(collectFiles));

  return [...new Set(collectedFiles.flat())];
};

const main = async () => {
  const targetFiles = await getTargetFiles();
  const changedFiles = [];

  for (const filePath of targetFiles) {
    const originalContent = await fs.readFile(filePath, "utf8");
    const sortedContent = sortImportBlock(originalContent, filePath);

    if (sortedContent === originalContent) {
      continue;
    }

    changedFiles.push(path.relative(rootPath, filePath));

    if (shouldWrite) {
      await fs.writeFile(filePath, sortedContent);
    }
  }

  if (changedFiles.length === 0) {
    return;
  }

  if (shouldWrite) {
    console.log(`sorted imports in ${changedFiles.length} file(s)`);
    return;
  }

  if (shouldCheck) {
    console.error("import order violations found in:");

    for (const changedFile of changedFiles) {
      console.error(`- ${changedFile}`);
    }

    process.exitCode = 1;
  }
};

await main();
