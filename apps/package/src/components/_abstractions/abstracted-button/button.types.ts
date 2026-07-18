import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type LoadingPlacement = "overlay" | "replace" | "prepend" | "append";

export interface ButtonSlots {
  content?: string;
  loading?: string;
  root?: string;
}

export interface UseButtonOptions extends ComponentPropsWithoutRef<"button"> {
  disableWhenLoading?: boolean;
  loadingDelay?: number;
  isDisabled?: boolean;
  isLoading?: boolean;
}

export interface UseButtonResult {
  buttonProps: ComponentPropsWithoutRef<"button">;
  isEffectivelyDisabled: boolean;
  shouldShowLoading: boolean;
}

export interface AbstractedButtonProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "disabled"
> {
  loadingPlacement?: LoadingPlacement;
  disableWhenLoading?: boolean;
  loadingElement?: ReactNode;
  loadingDelay?: number;
  children?: ReactNode;
  isDisabled?: boolean;
  loadingText?: string;
  slots?: ButtonSlots;
  isLoading?: boolean;
}
