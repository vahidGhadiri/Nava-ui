"use client";

import { useState } from "react";
import Link from "next/link";

const features = [
  {
    icon: (
      <svg
        strokeLinejoin="round"
        stroke="currentColor"
        strokeLinecap="round"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        height="20"
        fill="none"
        width="20"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    description: "Zero styling opinions. Full behavioral control with hooks and primitives.",
    title: "Headless Architecture",
  },
  {
    icon: (
      <svg
        strokeLinejoin="round"
        stroke="currentColor"
        strokeLinecap="round"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        height="20"
        fill="none"
        width="20"
      >
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description: "Full TypeScript support with inference. Props, events, and refs are all typed.",
    title: "Type Safe",
  },
  {
    icon: (
      <svg
        strokeLinejoin="round"
        stroke="currentColor"
        strokeLinecap="round"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        height="20"
        fill="none"
        width="20"
      >
        <path d="M12 2v6m0 8v6M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M2 12h6m8 0h6M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24" />
      </svg>
    ),
    description: "Import only what you use. Dead code is eliminated at build time.",
    title: "Tree Shaking",
  },
  {
    icon: (
      <svg
        strokeLinejoin="round"
        stroke="currentColor"
        strokeLinecap="round"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        height="20"
        fill="none"
        width="20"
      >
        <rect height="14" width="20" rx="2" x="2" y="3" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    description: "Server-side rendering out of the box. No hydration mismatches.",
    title: "SSR Ready",
  },
];

const installTabs = [
  {
    icon: (
      <svg className="h-4 w-auto shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z" />
      </svg>
    ),
    command: "npm install nava-ui",
    label: "npm",
  },
  {
    icon: (
      <svg className="h-4 w-auto shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM2 2h3.5v3.5H2zm8.25 0h3.498v3.5H10.25zm8.25 0H22v3.5h-3.5zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zm2 2H22v3.5h-3.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z" />
      </svg>
    ),
    command: "pnpm add nava-ui",
    label: "pnpm",
  },
  {
    icon: (
      <svg className="h-4 w-auto shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm.768 4.105c.183 0 .363.053.525.157.125.083.287.185.755 1.154.31-.088.468-.042.551-.019.204.056.366.19.463.375.477.917.542 2.553.334 3.605-.241 1.232-.755 2.029-1.131 2.576.324.329.778.899 1.117 1.825.278.774.31 1.478.273 2.015a5.51 5.51 0 0 0 .602-.329c.593-.366 1.487-.917 2.553-.931.714-.009 1.269.445 1.353 1.103a1.23 1.23 0 0 1-.945 1.362c-.649.158-.95.278-1.821.843-1.232.797-2.539 1.242-3.012 1.39a1.686 1.686 0 0 1-.704.343c-.737.181-3.266.315-3.466.315h-.046c-.783 0-1.214-.241-1.45-.491-.658.329-1.51.19-2.122-.134a1.078 1.078 0 0 1-.58-1.153 1.243 1.243 0 0 1-.153-.195c-.162-.25-.528-.936-.454-1.946.056-.723.556-1.367.88-1.71a5.522 5.522 0 0 1 .408-2.256c.306-.727.885-1.348 1.32-1.737-.32-.537-.644-1.367-.329-2.21.227-.602.412-.936.82-1.08h-.005c.199-.074.389-.153.486-.259a3.418 3.418 0 0 1 2.298-1.103c.037-.093.079-.185.125-.283.31-.658.639-1.029 1.024-1.168a.94.94 0 0 1 .328-.06zm.006.7c-.507.016-1.001 1.519-1.001 1.519s-1.27-.204-2.266.871c-.199.218-.468.334-.746.44-.079.028-.176.023-.417.672-.371.991.625 2.094.625 2.094s-1.186.839-1.626 1.881c-.486 1.144-.338 2.261-.338 2.261s-.843.732-.899 1.487c-.051.663.139 1.2.343 1.515.227.343.51.176.51.176s-.561.653-.037.931c.477.25 1.283.394 1.71-.037.31-.31.371-1.001.486-1.283.028-.065.12.111.209.199.097.093.264.195.264.195s-.755.324-.445 1.066c.102.246.468.403 1.066.398.222-.005 2.664-.139 3.313-.296.375-.088.505-.283.505-.283s1.566-.431 2.998-1.357c.917-.598 1.293-.76 2.034-.936.612-.148.57-1.098-.241-1.084-.839.009-1.575.44-2.196.825-1.163.718-1.742.672-1.742.672l-.018-.032c-.079-.13.371-1.293-.134-2.678-.547-1.515-1.413-1.881-1.344-1.997.297-.5 1.038-1.297 1.334-2.78.176-.899.13-2.377-.269-3.151-.074-.144-.732.241-.732.241s-.616-1.371-.788-1.483a.271.271 0 0 0-.157-.046z" />
      </svg>
    ),
    command: "yarn add nava-ui",
    label: "yarn",
  },
];

function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden pb-24 pt-28 sm:pb-32 sm:pt-36">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <div className="animate-fade-in stagger-1 glass-card mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
          </span>
          <span className="text-[11px] font-medium text-primary-600 dark:text-primary-400">
            Open Source
          </span>
        </div>

        <h1 className="animate-fade-in stagger-2 text-5xl font-bold leading-[1.05] tracking-[-0.04em] sm:text-7xl">
          A Design System
          <br />
          <span className="gradient-text">Built for Scale</span>
        </h1>

        <p className="animate-fade-in stagger-3 mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-surface-500 dark:text-surface-400">
          Reusable React components, thoughtful patterns, and developer-first APIs
          <br />
          for building exceptional digital products.
        </p>

        <div className="animate-fade-in stagger-4 mt-8 flex items-center justify-center gap-3">
          <Link
            className="rounded-xl bg-primary-500 px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg shadow-primary-500/25 transition-all hover:-translate-y-0.5 hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/30"
            href="/docs"
          >
            Get Started
          </Link>
          <Link
            className="glass-card rounded-xl px-5 py-2.5 text-[13px] font-semibold text-surface-700 transition-all hover:-translate-y-0.5 hover:text-primary-600 dark:text-surface-300 dark:hover:text-primary-400"
            href="/components"
          >
            View Components
          </Link>
        </div>

        <div className="animate-fade-in stagger-5 mt-9 flex items-center justify-center gap-5">
          {["Headless", "TypeScript", "Tree Shaking", "SSR Ready"].map((item) => (
            <div className="flex items-center gap-1.5" key={item}>
              <svg
                className="text-primary-500"
                viewBox="0 0 24 24"
                height="14"
                fill="none"
                width="14"
              >
                <path
                  strokeLinejoin="round"
                  stroke="currentColor"
                  strokeLinecap="round"
                  d="M20 6L9 17l-5-5"
                  strokeWidth="2.5"
                />
              </svg>
              <span className="text-[11px] font-medium text-surface-400">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstallSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(installTabs[activeTab].command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="-mt-4 pb-20 sm:pb-28">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold tracking-[-0.01em] sm:text-3xl">
          Quick Install
        </h2>
        <p className="mt-2 text-center text-[15px] text-surface-500 dark:text-surface-400">
          One command. Ready to go.
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-surface-200/50 bg-white/60 shadow-lg backdrop-blur-xl dark:border-surface-800/50 dark:bg-surface-900/60">
          <div className="flex border-b border-surface-200/50 dark:border-surface-800/50">
            {installTabs.map((tab, index) => (
              <button
                className={`flex-1 px-4 py-2.5 text-[13px] font-medium transition-colors ${
                  activeTab === index
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
                }`}
                onClick={() => setActiveTab(index)}
                key={tab.label}
              >
                <span className="flex items-center justify-center gap-1.5">
                  {tab.icon}
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between px-4 py-3">
            <code className="font-mono text-[13px] text-surface-700 dark:text-surface-300">
              {installTabs[activeTab].command}
            </code>
            <button
              className="glass-card rounded-lg px-3 py-1.5 text-[12px] font-medium text-surface-500 transition-colors hover:text-surface-700 dark:text-surface-400 dark:hover:text-surface-200"
              onClick={handleCopy}
            >
              {copied ? (
                <span className="flex items-center gap-1">
                  <svg
                    strokeLinejoin="round"
                    stroke="currentColor"
                    strokeLinecap="round"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    height="12"
                    fill="none"
                    width="12"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Copied
                </span>
              ) : (
                "Copy"
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold tracking-[-0.01em] sm:text-3xl">
          Why Nava UI?
        </h2>
        <p className="mt-2 text-center text-[15px] text-surface-500 dark:text-surface-400">
          Built for developers who care about quality.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div className="glass-card rounded-xl p-5 transition-all" key={feature.title}>
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500">
                {feature.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-surface-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-surface-500 dark:text-surface-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComponentPreviewSection() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold tracking-[-0.01em] sm:text-3xl">
          Component Preview
        </h2>
        <p className="mt-2 text-center text-[15px] text-surface-500 dark:text-surface-400">
          See the AbstractedButton in action.
        </p>

        <div className="mt-10 glass-card overflow-hidden rounded-2xl">
          <div className="border-b border-surface-200/50 px-5 py-3 dark:border-surface-800/50">
            <span className="text-[13px] font-medium text-surface-500">AbstractedButton</span>
          </div>

          <div className="grid gap-px bg-surface-200/50 dark:bg-surface-800/50 sm:grid-cols-2">
            <div className="flex flex-col items-center justify-center gap-4 bg-white/80 p-8 dark:bg-surface-900/80">
              <span className="text-[11px] font-medium uppercase tracking-widest text-surface-400">
                Default
              </span>
              <div className="flex items-center gap-3">
                <button className="rounded-xl bg-primary-500 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20 transition-all hover:bg-primary-600">
                  Save Changes
                </button>
                <button className="rounded-xl border border-surface-200 bg-white px-4 py-2 text-[13px] font-medium text-surface-700 transition-all hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700">
                  Cancel
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 bg-white/80 p-8 dark:bg-surface-900/80">
              <span className="text-[11px] font-medium uppercase tracking-widest text-surface-400">
                Loading
              </span>
              <div className="flex items-center gap-3">
                <button
                  className="relative flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20 opacity-80"
                  disabled
                >
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      stroke="currentColor"
                      strokeWidth="4"
                      cx="12"
                      cy="12"
                      r="10"
                    />
                    <path
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      className="opacity-75"
                      fill="currentColor"
                    />
                  </svg>
                  Saving...
                </button>
                <button
                  className="flex items-center gap-2 rounded-xl border border-surface-200 bg-white px-4 py-2 text-[13px] font-medium text-surface-400 opacity-60 dark:border-surface-700 dark:bg-surface-800"
                  disabled
                >
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      stroke="currentColor"
                      strokeWidth="4"
                      cx="12"
                      cy="12"
                      r="10"
                    />
                    <path
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      className="opacity-75"
                      fill="currentColor"
                    />
                  </svg>
                  Cancel
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 bg-white/80 p-8 dark:bg-surface-900/80">
              <span className="text-[11px] font-medium uppercase tracking-widest text-surface-400">
                Disabled
              </span>
              <div className="flex items-center gap-3">
                <button
                  className="cursor-not-allowed rounded-xl bg-primary-500 px-4 py-2 text-[13px] font-medium text-white opacity-50"
                  disabled
                >
                  Save Changes
                </button>
                <button
                  className="cursor-not-allowed rounded-xl border border-surface-200 bg-white px-4 py-2 text-[13px] font-medium text-surface-400 opacity-50 dark:border-surface-700 dark:bg-surface-800"
                  disabled
                >
                  Cancel
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 bg-white/80 p-8 dark:bg-surface-900/80">
              <span className="text-[11px] font-medium uppercase tracking-widest text-surface-400">
                Sizes
              </span>
              <div className="flex items-center gap-3">
                <button className="rounded-lg bg-primary-500 px-3 py-1.5 text-[12px] font-medium text-white shadow-sm shadow-primary-500/20">
                  Small
                </button>
                <button className="rounded-xl bg-primary-500 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20">
                  Medium
                </button>
                <button className="rounded-xl bg-primary-500 px-5 py-2.5 text-[14px] font-medium text-white shadow-sm shadow-primary-500/20">
                  Large
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-primary-500 transition-colors hover:text-primary-600"
            href="/components"
          >
            View all components
            <svg
              strokeLinejoin="round"
              stroke="currentColor"
              strokeLinecap="round"
              viewBox="0 0 24 24"
              strokeWidth="2"
              height="14"
              fill="none"
              width="14"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-surface-200/50 py-8 dark:border-surface-800/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <span className="text-[13px] text-surface-400">Nava UI</span>
        <a
          className="text-[13px] text-surface-400 transition-colors hover:text-surface-600 dark:hover:text-surface-300"
          href="https://github.com/whydrf/nava-ui"
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <InstallSection />
      <FeaturesSection />
      <ComponentPreviewSection />
      <Footer />
    </>
  );
}
