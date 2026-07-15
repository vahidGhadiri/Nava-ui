const MODULE_MEMBER_ORDER = ["enum", "type", "interface", "const"];
const MODULE_MEMBER_RANK = new Map(
  MODULE_MEMBER_ORDER.map((kind, index) => [kind, index]),
);

const getSortableNode = (statement) => {
  if (statement.type === "ExportNamedDeclaration" && statement.declaration) {
    return statement.declaration;
  }

  if (
    statement.type === "ImportDeclaration" ||
    statement.type === "ExportAllDeclaration" ||
    statement.type === "ExportDefaultDeclaration"
  ) {
    return null;
  }

  return statement;
};

const getMemberKind = (statement) => {
  const node = getSortableNode(statement);

  if (!node) {
    return null;
  }

  if (node.type === "TSEnumDeclaration") {
    return "enum";
  }

  if (node.type === "TSTypeAliasDeclaration") {
    return "type";
  }

  if (node.type === "TSInterfaceDeclaration") {
    return "interface";
  }

  if (node.type === "VariableDeclaration" && node.kind === "const") {
    return "const";
  }

  return null;
};

const getImportBlockEndIndex = (statements) => {
  let index = 0;

  while (
    index < statements.length &&
    statements[index].type === "ImportDeclaration"
  ) {
    index += 1;
  }

  return index;
};

const buildHeaderSegment = (statements) => {
  const segment = [];
  const startIndex = getImportBlockEndIndex(statements);

  for (let index = startIndex; index < statements.length; index += 1) {
    const kind = getMemberKind(statements[index]);

    if (!kind) {
      break;
    }

    segment.push({ statement: statements[index], kind });
  }

  return segment;
};

const hasCommentsInSegment = (sourceCode, segment) => {
  return segment.some(
    ({ statement }) =>
      sourceCode.getCommentsBefore(statement).length > 0 ||
      sourceCode.getCommentsAfter(statement).length > 0,
  );
};

const isSegmentOrdered = (segment) => {
  let highestSeenRank = -1;

  for (const { kind } of segment) {
    const rank = MODULE_MEMBER_RANK.get(kind) ?? Number.MAX_SAFE_INTEGER;

    if (rank < highestSeenRank) {
      return false;
    }

    highestSeenRank = rank;
  }

  return true;
};

const sortSegment = (segment) => {
  return [...segment]
    .map((item, index) => ({ ...item, index }))
    .sort((left, right) => {
      const leftRank =
        MODULE_MEMBER_RANK.get(left.kind) ?? Number.MAX_SAFE_INTEGER;
      const rightRank =
        MODULE_MEMBER_RANK.get(right.kind) ?? Number.MAX_SAFE_INTEGER;
      const rankDifference = leftRank - rightRank;

      if (rankDifference !== 0) {
        return rankDifference;
      }

      return left.index - right.index;
    });
};

const createFix = (sourceCode, segment) => {
  if (hasCommentsInSegment(sourceCode, segment)) {
    return null;
  }

  const sortedSegment = sortSegment(segment);
  const replacement = sortedSegment
    .map(({ statement }) => sourceCode.getText(statement))
    .join("\n\n");
  const firstStatement = segment[0].statement;
  const lastStatement = segment.at(-1).statement;

  return (fixer) =>
    fixer.replaceTextRange(
      [firstStatement.range[0], lastStatement.range[1]],
      replacement,
    );
};

const moduleMemberOrderRule = {
  create(context) {
    const sourceCode = context.sourceCode;

    return {
      Program(program) {
        const segment = buildHeaderSegment(program.body);

        if (segment.length < 2 || isSegmentOrdered(segment)) {
          return;
        }

        const firstOutOfOrderNode = segment.find(({ kind }, index) => {
          const currentRank =
            MODULE_MEMBER_RANK.get(kind) ?? Number.MAX_SAFE_INTEGER;
          const previousRanks = segment
            .slice(0, index)
            .map(
              (item) =>
                MODULE_MEMBER_RANK.get(item.kind) ?? Number.MAX_SAFE_INTEGER,
            );

          return previousRanks.some(
            (previousRank) => previousRank > currentRank,
          );
        });

        context.report({
          message: `Top-level declarations must be ordered as imports -> ${MODULE_MEMBER_ORDER.join(" -> ")}.`,
          node: firstOutOfOrderNode?.statement ?? segment[0].statement,
          fix: createFix(sourceCode, segment) ?? undefined,
        });
      },
    };
  },
  meta: {
    docs: {
      description:
        "Enforce top-level declarations as imports -> enum -> type -> interface -> const.",
    },
    fixable: "code",
    type: "layout",
    schema: [],
  },
};

export default moduleMemberOrderRule;
