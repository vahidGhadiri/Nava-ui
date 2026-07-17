"use client";
import { Button } from "nava-ui/button";
import { useState } from "react";

export default function Playground() {
  const [variant, setVariant] = useState<"secondary" | "primary" | "danger" | "ghost">("primary");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [disabled, setDisabled] = useState(false);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Playground</h1>
      <p>Interactive component playground for testing.</p>

      <div style={{ marginTop: "2rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            Variant:{" "}
            <select onChange={(e) => setVariant(e.target.value as typeof variant)} value={variant}>
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
              <option value="ghost">Ghost</option>
              <option value="danger">Danger</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            Size:{" "}
            <select onChange={(e) => setSize(e.target.value as typeof size)} value={size}>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>
            <input
              onChange={(e) => setDisabled(e.target.checked)}
              checked={disabled}
              type="checkbox"
            />{" "}
            Disabled
          </label>
        </div>

        <div
          style={{
            borderRadius: "0.5rem",
            background: "#f5f5f5",
            marginTop: "2rem",
            padding: "2rem",
          }}
        >
          <Button disabled={disabled} variant={variant} size={size}>
            Preview Button
          </Button>
        </div>
      </div>
    </main>
  );
}
