import type { ReactNode } from "react";

interface LoadingIndicatorProps {
  loadingElement?: ReactNode;
  loadingText?: string;
  className?: string;
}

const visuallyHiddenStyle: React.CSSProperties = {
  clip: "rect(0, 0, 0, 0)",
  position: "absolute",
  whiteSpace: "nowrap",
  overflow: "hidden",
  margin: "-1px",
  borderWidth: 0,
  height: "1px",
  width: "1px",
  padding: 0,
};

function LoadingIndicator({
  loadingElement,
  loadingText,
  className,
}: LoadingIndicatorProps): ReactNode {
  return (
    <span className={className} aria-live="polite" role="status">
      {loadingElement ? <span aria-hidden="true">{loadingElement}</span> : null}
      <span style={visuallyHiddenStyle}>{loadingText ?? "Loading…"}</span>
    </span>
  );
}

export { LoadingIndicator };
export type { LoadingIndicatorProps };
