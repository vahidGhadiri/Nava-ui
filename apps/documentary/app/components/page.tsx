"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

import { componentCategories, icons } from "../../lib/components-data";

export default function ComponentsPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return componentCategories;

    const q = query.toLowerCase();
    return componentCategories
      .map((category) => ({
        ...category,
        items: category.items.filter(
          (item) =>
            item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q),
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [query]);

  const totalCount = componentCategories.reduce((sum, c) => sum + c.items.length, 0);

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-[-0.02em]">Components Overview</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-surface-500 dark:text-surface-400">
          Nava UI provides a collection of reusable React components for building digital products.
          Components are headless by design — bring your own styles.
        </p>

        <div className="mt-5 flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400"
              strokeLinejoin="round"
              stroke="currentColor"
              strokeLinecap="round"
              viewBox="0 0 24 24"
              strokeWidth="2"
              fill="none"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              className="h-9 w-full rounded-lg border border-surface-200 bg-white pl-9 pr-3 text-[13px] text-surface-700 outline-none transition-colors placeholder:text-surface-400 focus:border-primary-400 focus:ring-1 focus:ring-primary-400/20 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-200 dark:placeholder:text-surface-500 dark:focus:border-primary-500"
              placeholder={`Search ${totalCount} components...`}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </div>
          <span className="text-[12px] text-surface-400">{totalCount} components</span>
        </div>
      </div>

      {/* Categories */}
      {filtered.map((category) => (
        <section key={category.title}>
          <div className="mb-4 flex items-baseline gap-2">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
              {category.title}
            </h2>
            <span className="text-[13px] text-surface-400">{category.items.length}</span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.items.map((item) => {
              const icon = icons[item.name];
              const isReady = item.status === "ready";

              return (
                <Link
                  className={`group flex items-center justify-between rounded-xl border border-surface-200/60 bg-white/60 p-4 backdrop-blur-sm transition-all dark:border-surface-800/60 dark:bg-surface-900/60 ${
                    isReady
                      ? "hover:border-primary-300 hover:shadow-md hover:shadow-primary-500/5 hover:-translate-y-0.5 dark:hover:border-primary-700"
                      : "pointer-events-none opacity-40"
                  }`}
                  href={item.href}
                  key={item.name}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[14px] font-semibold text-surface-800 group-hover:text-primary-600 dark:text-surface-200 dark:group-hover:text-primary-400">
                        {item.name}
                      </h3>
                      {!isReady && (
                        <span className="shrink-0 rounded-full bg-surface-100 px-1.5 py-0.5 text-[9px] font-medium text-surface-400 dark:bg-surface-800">
                          Soon
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-surface-400">
                      {item.description}
                    </p>
                  </div>

                  {icon && (
                    <div className="ml-3 shrink-0 text-surface-300 transition-colors group-hover:text-primary-400 dark:text-surface-600 dark:group-hover:text-primary-500">
                      {icon}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <svg
            className="mb-4 h-12 w-12 text-surface-300 dark:text-surface-600"
            strokeLinejoin="round"
            stroke="currentColor"
            strokeLinecap="round"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <p className="text-[15px] font-medium text-surface-500 dark:text-surface-400">
            No components found
          </p>
          <p className="mt-1 text-[13px] text-surface-400">Try a different search term</p>
        </div>
      )}
    </div>
  );
}
