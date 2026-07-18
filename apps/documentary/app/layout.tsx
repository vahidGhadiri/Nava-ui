import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { Header } from "../components/header";

export const metadata: Metadata = {
  description: "A modern React component library built with headless architecture",
  title: "Nava UI - Design System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-surface-50 font-sans text-surface-900 dark:bg-surface-950 dark:text-surface-100">
        <ThemeProvider defaultTheme="system" attribute="class" enableColorScheme>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
