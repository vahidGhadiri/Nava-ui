import composeClassNames from "@utils";
import { forwardRef } from "react";

import type { AbstractedButtonProps } from "./button.types";

import { LoadingIndicator } from "./components/loading-indicator";
import { LoadingContent } from "./components/loading-content";
import { useButton } from "./hooks/use-button";

const AbstractedButton = forwardRef<HTMLButtonElement, AbstractedButtonProps>(
  (
    {
      loadingPlacement = "prepend",
      disableWhenLoading = false,
      isDisabled = false,
      isLoading = false,
      loadingDelay = 0,
      loadingElement,
      loadingText,
      children,
      slots,
      ...rest
    },
    ref,
  ) => {
    const { shouldShowLoading, buttonProps } = useButton({
      disableWhenLoading,
      loadingDelay,
      isDisabled,
      isLoading,
      ...rest,
    });

    const indicator = shouldShowLoading ? (
      <LoadingIndicator
        loadingElement={loadingElement}
        className={slots?.loading}
        loadingText={loadingText}
      />
    ) : null;

    const content = shouldShowLoading ? (
      <LoadingContent
        contentClassName={slots?.content}
        placement={loadingPlacement}
        indicator={indicator}
      >
        {children}
      </LoadingContent>
    ) : (
      <span className={slots?.content}>{children}</span>
    );

    return (
      <button
        style={loadingPlacement === "overlay" ? { position: "relative" } : undefined}
        className={composeClassNames([slots?.root])}
        ref={ref}
        {...buttonProps}
      >
        {content}
      </button>
    );
  },
);

AbstractedButton.displayName = "AbstractedButton";

export default AbstractedButton;
