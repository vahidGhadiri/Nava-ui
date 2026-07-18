"use client";

import type { ComponentProps } from "react";

import { ThemeProvider as NextThemeProvider } from "next-themes";

function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemeProvider>) {
  return <NextThemeProvider {...props}>{children}</NextThemeProvider>;
}

export { ThemeProvider };
