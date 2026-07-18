import type { ReactNode } from "react";

import composeClassNames from "@utils";
import { forwardRef } from "react";

import type { AbstractedButtonProps } from "../_abstractions/abstracted-button/button.types";

import AbstractedButton from "../_abstractions/abstracted-button";

type ButtonVariant = "secondary" | "primary" | "danger" | "ghost" | "naked";
type LoadingPosition = "center" | "start" | "end";
type ButtonSize = "medium" | "small" | "large";

const loadingPositionToPlacement: Record<
  LoadingPosition,
  AbstractedButtonProps["loadingPlacement"]
> = {
  center: "overlay",
  start: "prepend",
  end: "append",
};

type BaseButtonProps = {
  loadingPosition?: LoadingPosition;
  trailingElement?: ReactNode;
  leadingElement?: ReactNode;
  submitLoading?: boolean;
  variant?: ButtonVariant;
  rootClassName?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  size?: ButtonSize;
  loading?: boolean;
} & Omit<AbstractedButtonProps, "loadingPlacement" | "isDisabled" | "isLoading" | "children">;

type ButtonProps =
  | ({
      children: ReactNode;
      shape: "circle";
      label?: never;
    } & BaseButtonProps)
  | ({
      children?: never;
      label: ReactNode;
      shape: "circle";
    } & BaseButtonProps)
  | ({
      children: ReactNode;
      shape?: "pill";
      label?: never;
    } & BaseButtonProps)
  | ({
      children?: never;
      label: ReactNode;
      shape?: "pill";
    } & BaseButtonProps);

const variantClassMapper: Record<ButtonVariant, string> = {
  secondary:
    "border border-surface-200 bg-white text-surface-700 hover:bg-surface-50 active:bg-surface-100 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700",
  ghost:
    "bg-transparent text-surface-600 hover:bg-surface-100 active:bg-surface-200 dark:text-surface-400 dark:hover:bg-surface-800",
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-sm shadow-primary-500/20",
  naked:
    "bg-transparent text-primary-500 hover:bg-primary-50 active:bg-primary-100 dark:hover:bg-primary-950",
  danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-sm shadow-red-500/20",
};

const disabledClassMapper: Record<ButtonVariant, string> = {
  secondary:
    "border border-surface-200 bg-white text-surface-400 opacity-50 dark:border-surface-700 dark:bg-surface-800",
  ghost: "bg-transparent text-surface-400 opacity-50",
  naked: "bg-transparent text-primary-500 opacity-50",
  primary: "bg-primary-500 text-white opacity-50",
  danger: "bg-red-500 text-white opacity-50",
};

const pillSizeMapper: Record<ButtonSize, string> = {
  large: "h-12 min-w-[130px] rounded-xl px-5 text-[14px] font-semibold",
  medium: "h-10 min-w-[96px] rounded-xl px-4 text-[13px] font-medium",
  small: "h-8 min-w-[88px] rounded-lg px-3 text-[12px] font-medium",
};

const circleSizeMapper: Record<ButtonSize, string> = {
  medium: "h-10 w-10 rounded-full",
  large: "h-12 w-12 rounded-full",
  small: "h-8 w-8 rounded-full",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loadingPosition = "start",
      submitLoading = false,
      variant = "primary",
      fullWidth = false,
      trailingElement,
      size = "medium",
      leadingElement,
      shape = "pill",
      rootClassName,
      disabled,
      children,
      loading,
      label,
      ...rest
    },
    ref,
  ) => {
    const isLoading = loading || submitLoading;

    const variantClassName = disabled ? disabledClassMapper[variant] : variantClassMapper[variant];

    const shapeClassName = shape === "circle" ? circleSizeMapper[size] : pillSizeMapper[size];

    const mainClassName = composeClassNames([
      shapeClassName,
      variantClassName,
      shape === "pill" && "inline-flex items-center justify-center gap-2",
      shape === "circle" && "inline-flex items-center justify-center",
      fullWidth && "w-full",
      rootClassName,
    ]);

    return (
      <AbstractedButton
        loadingPlacement={loadingPositionToPlacement[loadingPosition]}
        slots={{ root: mainClassName }}
        isLoading={isLoading}
        isDisabled={disabled}
        ref={ref}
        {...rest}
      >
        {leadingElement}
        {label ?? children}
        {trailingElement}
      </AbstractedButton>
    );
  },
);

Button.displayName = "Button";

export type { LoadingPosition, ButtonVariant, ButtonProps, ButtonSize };
export default Button;
