"use client";

import { useState } from "react";

function DemoBlock({
  description,
  children,
  title,
  code,
}: {
  children: React.ReactNode;
  description: string;
  title: string;
  code: string;
}) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section>
      <h3 className="mb-1 text-[17px] font-semibold text-surface-900 dark:text-white">{title}</h3>
      <p className="mb-4 text-[14px] text-surface-500 dark:text-surface-400">{description}</p>

      <div className="overflow-hidden rounded-2xl border border-surface-200/50 dark:border-surface-800/50">
        <div className="flex flex-wrap items-center gap-3 bg-white/80 p-6 dark:bg-surface-900/80">
          {children}
        </div>

        <div className="flex items-center justify-end border-t border-surface-200/50 px-4 py-2 dark:border-surface-800/50">
          <button
            className="flex items-center gap-1.5 text-[12px] font-medium text-surface-400 transition-colors hover:text-surface-600 dark:hover:text-surface-300"
            onClick={() => setShowCode((prev) => !prev)}
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
              <path d="M16 18l6-6-6-6" />
              <path d="M8 6l-6 6 6 6" />
            </svg>
            {showCode ? "Hide Code" : "Show Code"}
          </button>
        </div>

        {showCode && (
          <div className="relative border-t border-surface-200/50 dark:border-surface-800/50">
            <button
              className="absolute right-3 top-3 rounded-md bg-surface-700 px-2 py-1 text-[11px] font-medium text-surface-200 transition-colors hover:bg-surface-600"
              onClick={handleCopy}
            >
              {copied ? "Copied" : "Copy"}
            </button>
            <pre className="overflow-x-auto bg-surface-900 p-4 text-[13px] leading-relaxed text-surface-100 dark:bg-surface-950">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}

export { DemoBlock };
