import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  description: "Nava Design System documentation and component playground",
  title: "Nava UI - Documentation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
