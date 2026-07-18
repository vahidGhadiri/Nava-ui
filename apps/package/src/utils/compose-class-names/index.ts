export default function composeClassNames(
  classes: (undefined | boolean | string)[],
  filterWord?: string,
): string {
  return classes
    .filter((cls): cls is string => !!cls && typeof cls === "string")
    .filter((cls) => !filterWord || !cls.includes(filterWord))
    .join(" ");
}
