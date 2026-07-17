import { Button } from "nava-ui/button";

export default function ButtonDocs() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Button Component</h1>
      <p>A versatile button component with multiple variants and sizes.</p>

      <section style={{ marginTop: "2rem" }}>
        <h2>Variants</h2>
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Sizes</h2>
        <div style={{ alignItems: "center", marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Disabled</h2>
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Usage</h2>
        <pre style={{ borderRadius: "0.5rem", background: "#f5f5f5", padding: "1rem" }}>
          {`import { Button } from "nava-ui/button";

<Button variant="primary" size="md">
  Click me
</Button>`}
        </pre>
      </section>
    </main>
  );
}
