"use client";

import { useState } from "react";
import Link from "next/link";

import { DemoBlock } from "../../../components/demo-block";

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" stroke="currentColor" strokeWidth="4" cx="12" cy="12" r="10" />
      <path
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        className="opacity-75"
        fill="currentColor"
      />
    </svg>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      className="rounded-md bg-surface-100 px-2 py-1 text-[11px] font-medium text-surface-500 transition-colors hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700"
      onClick={handleCopy}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function SaveIcon() {
  return (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      strokeWidth="2"
      fill="none"
    >
      <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
      <polyline points="17,21 17,13 7,13 7,21" />
      <polyline points="7,3 7,8 15,8" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      strokeWidth="2"
      fill="none"
    >
      <circle cx="11" cy="11" r="8" />
      <line x2="16.65" y2="16.65" x1="21" y1="21" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      strokeWidth="2"
      fill="none"
    >
      <line x1="12" x2="12" y2="19" y1="5" />
      <line y1="12" x2="19" y2="12" x1="5" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      strokeLinejoin="round"
      stroke="currentColor"
      strokeLinecap="round"
      viewBox="0 0 24 24"
      className="h-4 w-4"
      strokeWidth="2"
      fill="none"
    >
      <polyline points="3,6 5,6 21,6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
    </svg>
  );
}

const importCode = 'import { Button } from "nava-ui"';

export default function ButtonDocs() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const simulateLoading = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Header */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Link
            className="text-[12px] text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
            href="/components"
          >
            Components
          </Link>
          <svg
            className="text-surface-300"
            strokeLinejoin="round"
            stroke="currentColor"
            strokeLinecap="round"
            viewBox="0 0 24 24"
            strokeWidth="2"
            fill="none"
            height="12"
            width="12"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
          <span className="text-[12px] text-surface-500">Button</span>
        </div>

        <h1 className="text-3xl font-bold tracking-[-0.02em]">Button</h1>
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-surface-500 dark:text-surface-400">
          To trigger an operation.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <div className="glass-card flex items-center gap-2 rounded-lg px-3 py-1.5">
            <span className="text-[12px] text-surface-400">Import:</span>
            <code className="font-mono text-[13px] font-medium text-surface-700 dark:text-surface-200">
              {importCode}
            </code>
            <CopyButton code={importCode} />
          </div>
        </div>
      </div>

      {/* When To Use */}
      <section>
        <h2 className="mb-3 text-xl font-bold tracking-[-0.01em]">When To Use</h2>
        <p className="mb-4 text-[14px] leading-relaxed text-surface-500 dark:text-surface-400">
          A button means an operation (or a series of operations). Clicking a button will trigger
          its corresponding business logic. Use React composition for icons and rich content.
        </p>
      </section>

      {/* Examples */}
      <section>
        <h2 className="mb-8 text-xl font-bold tracking-[-0.01em]">Examples</h2>

        <div className="flex flex-col gap-12">
          {/* Basic */}
          <DemoBlock
            code={`import { Button } from "nava-ui";

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="naked">Naked</Button>`}
            description="5 visual variants for different emphasis levels."
            title="Basic"
          >
            <button className="inline-flex h-10 min-w-[96px] items-center justify-center rounded-xl bg-primary-500 px-4 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20 transition-all hover:bg-primary-600">
              Primary
            </button>
            <button className="inline-flex h-10 min-w-[96px] items-center justify-center rounded-xl border border-surface-200 bg-white px-4 text-[13px] font-medium text-surface-700 transition-all hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700">
              Secondary
            </button>
            <button className="inline-flex h-10 min-w-[96px] items-center justify-center rounded-xl bg-transparent px-4 text-[13px] font-medium text-surface-600 transition-all hover:bg-surface-100 dark:text-surface-400 dark:hover:bg-surface-800">
              Ghost
            </button>
            <button className="inline-flex h-10 min-w-[96px] items-center justify-center rounded-xl bg-red-500 px-4 text-[13px] font-medium text-white shadow-sm shadow-red-500/20 transition-all hover:bg-red-600">
              Danger
            </button>
            <button className="inline-flex h-10 min-w-[96px] items-center justify-center rounded-xl bg-transparent px-4 text-[13px] font-medium text-primary-500 transition-all hover:bg-primary-50 dark:hover:bg-primary-950">
              Naked
            </button>
          </DemoBlock>

          {/* With Icons */}
          <DemoBlock
            code={`import { Button } from "nava-ui";

<Button>
  <SaveIcon />
  Save
</Button>

<Button variant="secondary">
  <SearchIcon />
  Search
</Button>

<Button variant="danger">
  <TrashIcon />
  Delete
</Button>`}
            description="Use React composition to add icons alongside text."
            title="With Icons"
          >
            <button className="inline-flex h-10 min-w-[96px] items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20 transition-all hover:bg-primary-600">
              <SaveIcon />
              Save
            </button>
            <button className="inline-flex h-10 min-w-[96px] items-center justify-center gap-2 rounded-xl border border-surface-200 bg-white px-4 text-[13px] font-medium text-surface-700 transition-all hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700">
              <SearchIcon />
              Search
            </button>
            <button className="inline-flex h-10 min-w-[96px] items-center justify-center gap-2 rounded-xl bg-red-500 px-4 text-[13px] font-medium text-white shadow-sm shadow-red-500/20 transition-all hover:bg-red-600">
              <TrashIcon />
              Delete
            </button>
          </DemoBlock>

          {/* Loading */}
          <DemoBlock
            code={`import { Button } from "nava-ui";

<Button loading={loading1} onClick={() => setLoading1(true)}>
  {loading1 ? "Saving..." : "Save"}
</Button>

<Button loading={loading2} loadingPosition="center" onClick={() => setLoading2(true)}>
  {loading2 ? "Processing..." : "Process"}
</Button>`}
            description="Set loading to show a spinner. Use loadingPosition to control placement: start (default), end, or center (overlay)."
            title="Loading"
          >
            <button
              className="relative inline-flex h-10 min-w-[96px] items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20 transition-all hover:bg-primary-600"
              onClick={() => simulateLoading(setLoading1)}
            >
              {loading1 && <Spinner />}
              {loading1 ? "Saving..." : "Save"}
            </button>
            <button
              className="relative inline-flex h-10 min-w-[96px] items-center justify-center gap-2 rounded-xl border border-surface-200 bg-white px-4 text-[13px] font-medium text-surface-700 transition-all hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700"
              onClick={() => simulateLoading(setLoading2)}
            >
              {loading2 && <Spinner />}
              {loading2 ? "Processing..." : "Process"}
            </button>
          </DemoBlock>

          {/* Loading Position */}
          <DemoBlock
            code={`import { Button } from "nava-ui";

<Button loading loadingPosition="start">
  Saving...
</Button>

<Button loading loadingPosition="end">
  Saving...
</Button>

<Button loading loadingPosition="center">
  Saving...
</Button>`}
            description="Control where the loading indicator appears with loadingPosition."
            title="Loading Position"
          >
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-surface-400">start</span>
              <button className="inline-flex h-10 min-w-[96px] items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20">
                <Spinner />
                Saving...
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-surface-400">end</span>
              <button className="inline-flex h-10 min-w-[96px] items-center justify-center gap-2 rounded-xl bg-primary-500 px-4 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20">
                Saving...
                <Spinner />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-surface-400">center</span>
              <button className="relative inline-flex h-10 min-w-[96px] items-center justify-center overflow-hidden rounded-xl bg-primary-500 px-4 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20">
                <span className="opacity-40">Saving...</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <Spinner />
                </span>
              </button>
            </div>
          </DemoBlock>

          {/* Disabled */}
          <DemoBlock
            code={`import { Button } from "nava-ui";

<Button disabled>Disabled</Button>

<Button disabled loading>
  Disabled Loading
</Button>`}
            description="Standard disabled state. Also automatically disabled while loading unless disableWhenLoading is false."
            title="Disabled"
          >
            <button
              className="inline-flex h-10 min-w-[96px] cursor-not-allowed items-center justify-center rounded-xl bg-primary-500 px-4 text-[13px] font-medium text-white opacity-50"
              disabled
            >
              Disabled
            </button>
            <button
              className="inline-flex h-10 min-w-[96px] cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-surface-200 bg-white px-4 text-[13px] font-medium text-surface-400 opacity-50 dark:border-surface-700 dark:bg-surface-800"
              disabled
            >
              <Spinner />
              Disabled Loading
            </button>
          </DemoBlock>

          {/* Sizes */}
          <DemoBlock
            code={`import { Button } from "nava-ui";

<Button size="small">Small</Button>
<Button>Medium</Button>
<Button size="large">Large</Button>`}
            description="3 sizes: small, medium (default), and large."
            title="Sizes"
          >
            <button className="inline-flex h-8 min-w-[88px] items-center justify-center rounded-lg bg-primary-500 px-3 text-[12px] font-medium text-white shadow-sm shadow-primary-500/20">
              Small
            </button>
            <button className="inline-flex h-10 min-w-[96px] items-center justify-center rounded-xl bg-primary-500 px-4 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20">
              Medium
            </button>
            <button className="inline-flex h-12 min-w-[130px] items-center justify-center rounded-xl bg-primary-500 px-5 text-[14px] font-semibold text-white shadow-sm shadow-primary-500/20">
              Large
            </button>
          </DemoBlock>

          {/* Circle */}
          <DemoBlock
            code={`import { Button } from "nava-ui";

<Button shape="circle">
  <SearchIcon />
</Button>

<Button shape="circle" size="large">
  <PlusIcon />
</Button>`}
            description="Circle buttons for icon-only actions."
            title="Circle"
          >
            <button className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-500 text-white shadow-sm shadow-primary-500/20 transition-all hover:bg-primary-600">
              <SearchIcon />
            </button>
            <button className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-sm shadow-primary-500/20 transition-all hover:bg-primary-600">
              <PlusIcon />
            </button>
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-sm shadow-red-500/20 transition-all hover:bg-red-600">
              <TrashIcon />
            </button>
          </DemoBlock>

          {/* Full Width */}
          <DemoBlock
            code={`import { Button } from "nava-ui";

<Button fullWidth>
  Full Width Button
</Button>`}
            description="Use fullWidth to make the button span the full width of its container."
            title="Full Width"
          >
            <button className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-primary-500 px-4 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20 transition-all hover:bg-primary-600">
              Full Width Button
            </button>
          </DemoBlock>
        </div>
      </section>

      {/* API */}
      <section>
        <h2 className="mb-3 text-xl font-bold tracking-[-0.01em]">API</h2>
        <p className="mb-6 text-[14px] text-surface-500 dark:text-surface-400">
          Button accepts all native HTML button attributes plus the following:
        </p>

        <div className="glass-card overflow-hidden rounded-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-surface-200/50 bg-surface-50/50 dark:border-surface-800/50 dark:bg-surface-900/50">
                  <th className="px-4 py-3 font-semibold text-surface-600 dark:text-surface-300">
                    Property
                  </th>
                  <th className="px-4 py-3 font-semibold text-surface-600 dark:text-surface-300">
                    Description
                  </th>
                  <th className="px-4 py-3 font-semibold text-surface-600 dark:text-surface-300">
                    Type
                  </th>
                  <th className="px-4 py-3 font-semibold text-surface-600 dark:text-surface-300">
                    Default
                  </th>
                </tr>
              </thead>
              <tbody className="text-surface-600 dark:text-surface-300">
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    variant
                  </td>
                  <td className="px-4 py-3">Visual style</td>
                  <td className="px-4 py-3">
                    &quot;primary&quot; | &quot;secondary&quot; | &quot;ghost&quot; |
                    &quot;danger&quot; | &quot;naked&quot;
                  </td>
                  <td className="px-4 py-3">&quot;primary&quot;</td>
                </tr>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    size
                  </td>
                  <td className="px-4 py-3">Button size</td>
                  <td className="px-4 py-3">
                    &quot;small&quot; | &quot;medium&quot; | &quot;large&quot;
                  </td>
                  <td className="px-4 py-3">&quot;medium&quot;</td>
                </tr>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    shape
                  </td>
                  <td className="px-4 py-3">Button shape</td>
                  <td className="px-4 py-3">&quot;pill&quot; | &quot;circle&quot;</td>
                  <td className="px-4 py-3">&quot;pill&quot;</td>
                </tr>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    disabled
                  </td>
                  <td className="px-4 py-3">Disable the button</td>
                  <td className="px-4 py-3">boolean</td>
                  <td className="px-4 py-3">false</td>
                </tr>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    loading
                  </td>
                  <td className="px-4 py-3">Show loading state</td>
                  <td className="px-4 py-3">boolean</td>
                  <td className="px-4 py-3">false</td>
                </tr>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    loadingPosition
                  </td>
                  <td className="px-4 py-3">Where to show the loading indicator</td>
                  <td className="px-4 py-3">
                    &quot;start&quot; | &quot;end&quot; | &quot;center&quot;
                  </td>
                  <td className="px-4 py-3">&quot;start&quot;</td>
                </tr>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    fullWidth
                  </td>
                  <td className="px-4 py-3">Make button span full width</td>
                  <td className="px-4 py-3">boolean</td>
                  <td className="px-4 py-3">false</td>
                </tr>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    rootClassName
                  </td>
                  <td className="px-4 py-3">Custom class for the root element</td>
                  <td className="px-4 py-3">string</td>
                  <td className="px-4 py-3">-</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    children
                  </td>
                  <td className="px-4 py-3">Button content (text, icons, etc.)</td>
                  <td className="px-4 py-3">ReactNode</td>
                  <td className="px-4 py-3">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-[13px] text-surface-400">
          Also accepts all native HTML button attributes (onClick, type, aria-*, etc.).
        </p>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="mb-6 text-xl font-bold tracking-[-0.01em]">FAQ</h2>

        <div className="flex flex-col gap-6">
          <div>
            <h3 className="mb-2 text-[15px] font-semibold text-surface-900 dark:text-white">
              How does loading work with SSR?
            </h3>
            <p className="text-[14px] leading-relaxed text-surface-500 dark:text-surface-400">
              The loading state is computed as{" "}
              <code className="text-[13px]">
                shouldShowLoading = loading &amp;&amp; (loadingDelay &lt;= 0 || delayElapsed)
              </code>
              . During SSR, <code className="text-[13px]">delayElapsed</code> is always false, so
              the spinner never renders on the server. This ensures zero hydration mismatch.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-[15px] font-semibold text-surface-900 dark:text-white">
              Can I use custom loading indicators?
            </h3>
            <p className="text-[14px] leading-relaxed text-surface-500 dark:text-surface-400">
              Yes. Pass a custom element via the <code className="text-[13px]">loadingElement</code>{" "}
              prop to override the default spinner.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-[15px] font-semibold text-surface-900 dark:text-white">
              How do I add icons to a pill button?
            </h3>
            <p className="text-[14px] leading-relaxed text-surface-500 dark:text-surface-400">
              Use React composition. Place icon elements directly inside the Button as children —
              the built-in gap utility handles spacing automatically.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
