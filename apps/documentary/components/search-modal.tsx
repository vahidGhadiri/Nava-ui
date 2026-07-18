"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Link from "next/link";

const searchItems = [
  { href: "/components", title: "Components", category: "Pages" },
  { href: "/components/button", title: "AbstractedButton", category: "Components" },
  { title: "Headless Architecture", category: "Getting Started", href: "/docs" },
  { category: "Getting Started", title: "SSR Ready", href: "/docs" },
  { category: "Getting Started", title: "Tree Shaking", href: "/docs" },
  { category: "Getting Started", title: "TypeScript", href: "/docs" },
];

function SearchModal({ onClose, open }: { onClose: () => void; open: boolean }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = searchItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => (s + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => (s - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter" && filtered[selected]) {
        window.location.href = filtered[selected].href;
      } else if (e.key === "Escape") {
        onClose();
      }
    },
    [filtered, selected, onClose],
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="glass-card relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-surface-200/50 shadow-2xl dark:border-surface-800/50">
        <div className="flex items-center gap-3 border-b border-surface-200/50 px-4 dark:border-surface-800/50">
          <svg
            className="h-4 w-4 shrink-0 text-surface-400"
            strokeLinejoin="round"
            stroke="currentColor"
            strokeLinecap="round"
            viewBox="0 0 24 24"
            strokeWidth="2"
            fill="none"
            height="24"
            width="24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            className="h-12 flex-1 bg-transparent text-[14px] text-surface-900 outline-none placeholder:text-surface-400 dark:text-white"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components, docs..."
            onKeyDown={handleKeyDown}
            ref={inputRef}
            value={query}
          />
          <kbd className="rounded border border-surface-200 bg-surface-100 px-1.5 py-0.5 font-mono text-[10px] text-surface-400 dark:border-surface-700 dark:bg-surface-800">
            ESC
          </kbd>
        </div>

        <div className="max-h-72 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-[13px] text-surface-400">
              No results found.
            </div>
          ) : (
            filtered.map((item, index) => (
              <Link
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-[13px] transition-colors ${
                  index === selected
                    ? "bg-primary-500/10 text-primary-600 dark:text-primary-400"
                    : "text-surface-600 hover:bg-surface-100 dark:text-surface-300 dark:hover:bg-surface-800"
                }`}
                onClick={onClose}
                key={item.title}
                href={item.href}
              >
                <span className="font-medium">{item.title}</span>
                <span className="text-[11px] text-surface-400">{item.category}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export { SearchModal };
