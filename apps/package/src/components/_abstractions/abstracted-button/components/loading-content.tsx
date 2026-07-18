import type { ReactNode } from "react";

import type { LoadingPlacement } from "../button.types";

interface LoadingContentProps {
  placement: LoadingPlacement;
  contentClassName?: string;
  indicator: ReactNode;
  children: ReactNode;
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

const placementRenderers: Record<
  LoadingPlacement,
  (indicator: ReactNode, children: ReactNode, className?: string) => ReactNode
> = {
  overlay: (indicator, children, className) => (
    <>
      <span className={className}>{children}</span>
      <span className="absolute inset-0 flex items-center justify-center">{indicator}</span>
    </>
  ),
  replace: (indicator, children, className) => (
    <span className={className}>
      {indicator}
      <span style={visuallyHiddenStyle}>{children}</span>
    </span>
  ),
  prepend: (indicator, children, className) => (
    <span className={className}>
      {indicator}
      {children}
    </span>
  ),
  append: (indicator, children, className) => (
    <span className={className}>
      {children}
      {indicator}
    </span>
  ),
};

const LoadingContent = ({
  contentClassName,
  placement,
  indicator,
  children,
}: LoadingContentProps): ReactNode => {
  return placementRenderers[placement](indicator, children, contentClassName);
};

export { LoadingContent };
export type { LoadingContentProps };
