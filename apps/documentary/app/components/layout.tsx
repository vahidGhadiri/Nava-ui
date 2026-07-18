"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { componentCategories } from "../../lib/components-data";

function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-56 shrink-0 overflow-y-auto border-r border-surface-200/50 py-6 pr-4 dark:border-surface-800/50">
      <nav className="flex flex-col gap-5">
        {componentCategories.map((category) => (
          <div key={category.title}>
            <h4 className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-surface-400">
              {category.title}
            </h4>
            <ul className="flex flex-col gap-0.5">
              {category.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      className={`flex items-center justify-between rounded-lg px-3 py-1.5 text-[13px] transition-colors ${
                        isActive
                          ? "bg-primary-500/10 font-medium text-primary-600 dark:text-primary-400"
                          : "text-surface-500 hover:bg-surface-100 hover:text-surface-700 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-200"
                      }`}
                      href={item.href}
                    >
                      <span>{item.name}</span>
                      {item.status === "soon" && (
                        <span className="rounded-full bg-surface-100 px-1.5 py-0.5 text-[9px] font-medium text-surface-400 dark:bg-surface-800">
                          Soon
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-6xl gap-6 px-4 sm:px-6">
      <Sidebar />
      <div className="min-w-0 flex-1 py-6">{children}</div>
    </div>
  );
}
