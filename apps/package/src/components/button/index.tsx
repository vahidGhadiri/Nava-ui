import type { ButtonHTMLAttributes } from "react";

import { forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "secondary" | "primary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500",
      ghost: "bg-transparent text-gray-900 hover:bg-gray-100 focus:ring-gray-500",
      primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
      danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    };

    const sizes = {
      lg: "h-12 px-6 text-base",
      md: "h-10 px-4 text-sm",
      sm: "h-8 px-3 text-sm",
    };

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className ?? ""}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
