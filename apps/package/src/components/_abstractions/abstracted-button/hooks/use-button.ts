import { useEffect, useState } from "react";

import type { UseButtonOptions, UseButtonResult } from "../button.types";

export function useButton({
  disableWhenLoading = false,
  isDisabled = false,
  isLoading = false,
  loadingDelay = 0,
  ...rest
}: UseButtonOptions): UseButtonResult {
  const [delayElapsed, setDelayElapsed] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setDelayElapsed(false);
      return;
    }

    if (loadingDelay <= 0) {
      setDelayElapsed(true);
      return;
    }

    setDelayElapsed(false);

    const id = setTimeout(() => {
      setDelayElapsed(true);
    }, loadingDelay);

    return () => {
      clearTimeout(id);
    };
  }, [isLoading, loadingDelay]);

  const isEffectivelyDisabled = isDisabled || (disableWhenLoading && isLoading);
  const shouldShowLoading = isLoading && (loadingDelay <= 0 || delayElapsed);

  return {
    buttonProps: {
      ...rest,
      "aria-disabled": isEffectivelyDisabled || undefined,
      "aria-busy": shouldShowLoading || undefined,
      disabled: isEffectivelyDisabled,
      type: rest.type ?? "button",
    },
    isEffectivelyDisabled,
    shouldShowLoading,
  };
}

export type { UseButtonOptions, UseButtonResult };
