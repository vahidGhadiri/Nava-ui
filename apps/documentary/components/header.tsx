"use client";

import { useCallback, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";

import { SearchModal } from "./search-modal";

const navLinks = [
  { label: "Docs", href: "/docs" },
  { label: "Components", href: "/components" },
];

function Header() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <header className="sticky top-0 z-50 h-14 border-b border-surface-200/50 bg-white/40 backdrop-blur-2xl backdrop-saturate-150 dark:border-surface-800/50 dark:bg-surface-950/40">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link className="flex items-center gap-2.5" href="/">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/20">
              <svg viewBox="0 0 16 16" height="16" fill="none" width="16">
                <path
                  d="M8 1L14.5 4.5V11.5L8 15L1.5 11.5V4.5L8 1Z"
                  fillOpacity="0.9"
                  fill="white"
                />
              </svg>
            </div>
            <span className="text-[15px] font-bold text-surface-900 dark:text-white">Nava UI</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                className="rounded-lg px-3 py-1.5 text-[13px] font-medium text-surface-500 transition-colors hover:bg-black/5 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-white/5 dark:hover:text-white"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="glass-card flex h-8 items-center gap-2 rounded-lg px-3 text-[13px] text-surface-400 transition-colors hover:text-surface-600 dark:hover:text-surface-300"
              onClick={() => setSearchOpen(true)}
            >
              <svg
                strokeLinejoin="round"
                stroke="currentColor"
                strokeLinecap="round"
                viewBox="0 0 24 24"
                strokeWidth="2"
                fill="none"
                height="14"
                width="14"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
              <span className="hidden sm:inline">Search...</span>
              <kbd className="ml-1 hidden rounded border border-surface-200 bg-surface-100 px-1.5 py-0.5 font-mono text-[10px] text-surface-400 sm:inline dark:border-surface-700 dark:bg-surface-800">
                ⌘K
              </kbd>
            </button>

            <a
              className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-400 transition-colors hover:bg-black/5 hover:text-surface-900 dark:hover:bg-white/5 dark:hover:text-white"
              href="https://github.com/whydrf/nava-ui"
              rel="noreferrer"
              target="_blank"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" height="17" width="17">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            {mounted ? (
              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg text-surface-400 transition-colors hover:bg-black/5 hover:text-surface-900 dark:hover:bg-white/5 dark:hover:text-white"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <svg
                    strokeLinejoin="round"
                    stroke="currentColor"
                    strokeLinecap="round"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    height="16"
                    fill="none"
                    width="16"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  <svg
                    strokeLinejoin="round"
                    stroke="currentColor"
                    strokeLinecap="round"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    height="16"
                    fill="none"
                    width="16"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                )}
              </button>
            ) : null}

            <div className="mx-1 hidden h-5 w-px bg-surface-200 dark:bg-surface-800 sm:block" />

            <Link
              className="hidden rounded-lg bg-primary-500 px-3.5 py-1.5 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20 transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-md hover:shadow-primary-500/25 sm:block"
              href="/docs"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <SearchModal onClose={() => setSearchOpen(false)} open={searchOpen} />
    </>
  );
}

export { Header };
