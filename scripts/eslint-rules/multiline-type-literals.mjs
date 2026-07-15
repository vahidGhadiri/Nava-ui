const INDENT_SIZE = 4;

const getLineIndent = (sourceCode, node) => {
  const lineText = sourceCode.lines[node.loc.start.line - 1] ?? "";
  const leadingWhitespace = lineText.match(/^\s*/)?.[0] ?? "";

  return leadingWhitespace;
};

const formatObjectLikeNode = (sourceCode, members, node) => {
  if (members.length === 0) {
    return "{}";
  }

  const currentIndent = getLineIndent(sourceCode, node);
  const innerIndent = `${currentIndent}${" ".repeat(INDENT_SIZE)}`;
  const formattedMembers = members.map(
    (member) => `${innerIndent}${sourceCode.getText(member).trim()}`,
  );

  return `{\n${formattedMembers.join("\n")}\n${currentIndent}}`;
};

const createRule = (selector, getMembers) => ({
  create(context) {
    const sourceCode = context.sourceCode;

    return {
      [selector](node) {
        const members = getMembers(node);

        if (members.length === 0) {
          return;
        }

        if (node.loc.start.line !== node.loc.end.line) {
          return;
        }

        context.report({
          fix: (fixer) =>
            fixer.replaceText(
              node,
              formatObjectLikeNode(sourceCode, members, node),
            ),
          message: "Inline object type literals must be multiline.",
          node,
        });
      },
    };
  },
  meta: {
    docs: {
      description:
        "Enforce multiline formatting for inline TypeScript object type literals.",
    },
    fixable: "code",
    type: "layout",
    schema: [],
  },
});

const multilineTypeLiteralsRule = {
  ...createRule("TSTypeLiteral", (node) => node.members),
  create(context) {
    return {
      ...createRule("TSTypeLiteral", (node) => node.members).create(context),
      ...createRule("TSInterfaceBody", (node) => node.body).create(context),
    };
  },
};

export default multilineTypeLiteralsRule;
