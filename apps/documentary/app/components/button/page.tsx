"use client";

import { useState } from "react";
import Link from "next/link";

import { DemoBlock } from "../../../components/demo-block";

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

export default function ButtonDocs() {
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

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
              {'import { AbstractedButton } from "nava-ui"'}
            </code>
            <CopyButton code={'import { AbstractedButton } from "nava-ui"'} />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 text-[12px]">
          <a
            className="flex items-center gap-1 text-surface-400 transition-colors hover:text-surface-600 dark:hover:text-surface-300"
            href="https://github.com/whydrf/nava-ui"
            rel="noreferrer"
            target="_blank"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" height="14" width="14">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>

      {/* When To Use */}
      <section>
        <h2 className="mb-3 text-xl font-bold tracking-[-0.01em]">When To Use</h2>
        <p className="mb-4 text-[14px] leading-relaxed text-surface-500 dark:text-surface-400">
          A button means an operation (or a series of operations). Clicking a button will trigger
          its corresponding business logic.
        </p>
        <p className="mb-2 text-[14px] font-medium text-surface-700 dark:text-surface-300">
          In Nava UI we provide 4 loading placements:
        </p>
        <ul className="flex flex-col gap-2 text-[14px] text-surface-500 dark:text-surface-400">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            <span>
              <strong className="font-medium text-surface-700 dark:text-surface-200">
                prepend
              </strong>
              {" — Loading indicator appears before the button text."}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            <span>
              <strong className="font-medium text-surface-700 dark:text-surface-200">append</strong>
              {" — Loading indicator appears after the button text."}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            <span>
              <strong className="font-medium text-surface-700 dark:text-surface-200">
                overlay
              </strong>
              {" — Loading indicator overlays on top of the button content."}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500" />
            <span>
              <strong className="font-medium text-surface-700 dark:text-surface-200">
                replace
              </strong>
              {
                " — Button text is replaced with loading text, fully accessible via visually hidden content."
              }
            </span>
          </li>
        </ul>
      </section>

      {/* Examples */}
      <section>
        <h2 className="mb-8 text-xl font-bold tracking-[-0.01em]">Examples</h2>

        <div className="flex flex-col gap-12">
          {/* Basic */}
          <DemoBlock
            code={`import AbstractedButton from "nava-ui/button";

<AbstractedButton>Default</AbstractedButton>
<AbstractedButton isDisabled>Disabled</AbstractedButton>`}
            description="The most basic button with default styling."
            title="Basic"
          >
            <button className="rounded-xl bg-primary-500 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20 transition-all hover:bg-primary-600">
              Default
            </button>
            <button className="rounded-xl border border-surface-200 bg-white px-4 py-2 text-[13px] font-medium text-surface-700 transition-all hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700">
              Secondary
            </button>
            <button className="rounded-xl bg-surface-900 px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-surface-800 dark:bg-surface-100 dark:text-surface-900 dark:hover:bg-surface-200">
              Dark
            </button>
          </DemoBlock>

          {/* Loading */}
          <DemoBlock
            code={`import AbstractedButton from "nava-ui/button";

<AbstractedButton isLoading>Click me</AbstractedButton>

<AbstractedButton isLoading loadingDelay={300}>
  Delayed Loading
</AbstractedButton>`}
            description="A loading indicator can be added to a button by setting the isLoading property. Use loadingDelay to avoid flash for fast requests."
            title="Loading"
          >
            <button
              className="relative flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20 transition-all hover:bg-primary-600"
              onClick={() => simulateLoading(setLoading1)}
            >
              {loading1 && <Spinner />}
              {loading1 ? "Saving..." : "Click to Load"}
            </button>
            <button
              className="relative flex items-center gap-2 rounded-xl border border-surface-200 bg-white px-4 py-2 text-[13px] font-medium text-surface-700 transition-all hover:bg-surface-50 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300 dark:hover:bg-surface-700"
              onClick={() => simulateLoading(setLoading2)}
            >
              {loading2 && <Spinner />}
              {loading2 ? "Processing..." : "Click to Load"}
            </button>
          </DemoBlock>

          {/* Loading Placement */}
          <DemoBlock
            code={`import AbstractedButton from "nava-ui/button";

<AbstractedButton isLoading loadingPlacement="prepend">
  Prepend
</AbstractedButton>

<AbstractedButton isLoading loadingPlacement="append">
  Append
</AbstractedButton>

<AbstractedButton isLoading loadingPlacement="overlay">
  Overlay
</AbstractedButton>

<AbstractedButton
  isLoading
  loadingPlacement="replace"
  loadingText="Saving..."
>
  Save Changes
</AbstractedButton>`}
            description="Control where the loading indicator appears using loadingPlacement."
            title="Loading Placement"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-surface-400">prepend</span>
              <button className="relative flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20">
                <Spinner />
                Prepend
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-surface-400">append</span>
              <button className="relative flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20">
                Append
                <Spinner />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-surface-400">overlay</span>
              <button className="relative overflow-hidden rounded-xl bg-primary-500 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20">
                <span className="opacity-40">Overlay</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <Spinner />
                </span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-surface-400">replace</span>
              <button className="relative flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20">
                <Spinner />
                Saving...
              </button>
            </div>
          </DemoBlock>

          {/* Disabled */}
          <DemoBlock
            code={`import AbstractedButton from "nava-ui/button";

<AbstractedButton isDisabled>Disabled</AbstractedButton>

<AbstractedButton isDisabled isLoading>
  Disabled Loading
</AbstractedButton>`}
            description="To mark a button as disabled, add the isDisabled property. The button will also be disabled during loading unless disableWhenLoading is set to false."
            title="Disabled"
          >
            <button
              className="cursor-not-allowed rounded-xl bg-primary-500 px-4 py-2 text-[13px] font-medium text-white opacity-50"
              disabled
            >
              Disabled
            </button>
            <button
              className="relative flex cursor-not-allowed items-center gap-2 rounded-xl border border-surface-200 bg-white px-4 py-2 text-[13px] font-medium text-surface-400 opacity-50 dark:border-surface-700 dark:bg-surface-800"
              disabled
            >
              <Spinner />
              Disabled Loading
            </button>
          </DemoBlock>

          {/* Sizes */}
          <DemoBlock
            code={`import AbstractedButton from "nava-ui/button";

<AbstractedButton size="small">Small</AbstractedButton>
<AbstractedButton>Medium</AbstractedButton>
<AbstractedButton size="large">Large</AbstractedButton>`}
            description="Buttons come in 3 sizes: small, medium (default), and large."
            title="Sizes"
          >
            <button className="rounded-lg bg-primary-500 px-3 py-1.5 text-[12px] font-medium text-white shadow-sm shadow-primary-500/20">
              Small
            </button>
            <button className="rounded-xl bg-primary-500 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20">
              Medium
            </button>
            <button className="rounded-xl bg-primary-500 px-5 py-2.5 text-[14px] font-medium text-white shadow-sm shadow-primary-500/20">
              Large
            </button>
          </DemoBlock>

          {/* Loading Delay */}
          <DemoBlock
            code={`import AbstractedButton from "nava-ui/button";

<AbstractedButton isLoading loadingDelay={300}>
  Fast Request
</AbstractedButton>

<AbstractedButton isLoading loadingDelay={500}>
  Slow Request
</AbstractedButton>`}
            description="Use loadingDelay to prevent a loading spinner from flashing for fast operations (e.g. 300ms)."
            title="Loading Delay"
          >
            <button
              className="relative flex items-center gap-2 rounded-xl bg-primary-500 px-4 py-2 text-[13px] font-medium text-white shadow-sm shadow-primary-500/20 transition-all hover:bg-primary-600"
              onClick={() => simulateLoading(setLoading3)}
            >
              {loading3 ? <Spinner /> : null}
              {loading3 ? "Done!" : "Click me (300ms delay)"}
            </button>
            <span className="text-[12px] text-surface-400">Spinner appears only after 300ms</span>
          </DemoBlock>

          {/* Slots */}
          <DemoBlock
            code={`import AbstractedButton from "nava-ui/button";

<AbstractedButton
  slots={{
    root: "my-custom-root",
    content: "my-custom-content",
    loading: "my-custom-loading",
  }}
>
  Custom Styled
</AbstractedButton>`}
            description="Use the slots prop to apply custom class names to different parts of the button."
            title="Custom Slots"
          >
            <button className="rounded-xl border-2 border-dashed border-primary-300 bg-primary-50 px-4 py-2 text-[13px] font-medium text-primary-700 transition-all hover:bg-primary-100 dark:border-primary-700 dark:bg-primary-950 dark:text-primary-300">
              Custom Styled
            </button>
          </DemoBlock>
        </div>
      </section>

      {/* API */}
      <section>
        <h2 className="mb-3 text-xl font-bold tracking-[-0.01em]">API</h2>
        <p className="mb-6 text-[14px] text-surface-500 dark:text-surface-400">
          Different button styles can be generated by setting Button properties. The recommended
          order is: <code className="text-[13px]">isLoading</code>
          {" → "}
          <code className="text-[13px]">loadingPlacement</code>
          {" → "}
          <code className="text-[13px]">isDisabled</code>.
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
                    isLoading
                  </td>
                  <td className="px-4 py-3">Show loading state</td>
                  <td className="px-4 py-3">boolean</td>
                  <td className="px-4 py-3">false</td>
                </tr>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    isDisabled
                  </td>
                  <td className="px-4 py-3">Disable the button</td>
                  <td className="px-4 py-3">boolean</td>
                  <td className="px-4 py-3">false</td>
                </tr>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    loadingPlacement
                  </td>
                  <td className="px-4 py-3">Where to show the loading indicator</td>
                  <td className="px-4 py-3">
                    &quot;prepend&quot; | &quot;append&quot; | &quot;overlay&quot; |
                    &quot;replace&quot;
                  </td>
                  <td className="px-4 py-3">&quot;prepend&quot;</td>
                </tr>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    loadingDelay
                  </td>
                  <td className="px-4 py-3">Delay in ms before showing loading state</td>
                  <td className="px-4 py-3">number</td>
                  <td className="px-4 py-3">0</td>
                </tr>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    loadingText
                  </td>
                  <td className="px-4 py-3">
                    Text shown during loading with &quot;replace&quot; placement
                  </td>
                  <td className="px-4 py-3">string</td>
                  <td className="px-4 py-3">-</td>
                </tr>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    loadingElement
                  </td>
                  <td className="px-4 py-3">Custom loading indicator element</td>
                  <td className="px-4 py-3">ReactNode</td>
                  <td className="px-4 py-3">-</td>
                </tr>
                <tr className="border-b border-surface-100 dark:border-surface-800">
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    disableWhenLoading
                  </td>
                  <td className="px-4 py-3">Disable button while loading</td>
                  <td className="px-4 py-3">boolean</td>
                  <td className="px-4 py-3">true</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium text-surface-700 dark:text-surface-200">
                    slots
                  </td>
                  <td className="px-4 py-3">Custom class names for root, content, and loading</td>
                  <td className="px-4 py-3">{"{ root?, content?, loading? }"}</td>
                  <td className="px-4 py-3">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-4 text-[13px] text-surface-400">
          It accepts all props which native buttons support.
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
                shouldShowLoading = isLoading &amp;&amp; (loadingDelay &lt;= 0 || delayElapsed)
              </code>
              . During SSR, <code className="text-[13px]">delayElapsed</code> is always false, so
              the spinner will never render on the server. This ensures identical first renders
              between server and client with zero hydration mismatch.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-[15px] font-semibold text-surface-900 dark:text-white">
              What does disableWhenLoading do?
            </h3>
            <p className="text-[14px] leading-relaxed text-surface-500 dark:text-surface-400">
              By default, the button is automatically disabled while loading to prevent multiple
              submissions. Set <code className="text-[13px]">disableWhenLoading=false</code> if you
              want the button to remain clickable during loading.
            </p>
          </div>

          <div>
            <h3 className="mb-2 text-[15px] font-semibold text-surface-900 dark:text-white">
              Can I use my own loading icon?
            </h3>
            <p className="text-[14px] leading-relaxed text-surface-500 dark:text-surface-400">
              Yes. Pass a custom ReactNode to <code className="text-[13px]">loadingElement</code> to
              replace the default spinner.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
