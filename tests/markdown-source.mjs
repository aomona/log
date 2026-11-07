import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { build, createServer } from "vite";

const common = "COMMON_MARKDOWN_BODY_7dcf3d";
const development = "DEVELOPMENT_ONLY_MARKDOWN_BODY_a81f46";
const production = "PRODUCTION_ONLY_MARKDOWN_BODY_d259e8";

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), "log-markdown-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "src/lib"), { recursive: true });
  await mkdir(path.join(root, "pages/guides"), { recursive: true });
  await writeFile(
    path.join(root, "src/lib/markdown.ts"),
    await readFile(new URL("../src/lib/markdown.ts", import.meta.url), "utf8"),
  );
  await Promise.all([
    writeFile(path.join(root, "pages/index.md"), common),
    writeFile(path.join(root, "pages/guides/index.dev.md"), development),
    writeFile(path.join(root, "pages/release.prod.md"), production),
  ]);
  return root;
}

function useNodeEnvironment(t, value) {
  const previous = process.env.NODE_ENV;
  process.env.NODE_ENV = value;
  t.after(() => {
    if (previous === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previous;
  });
}

test("development keeps .dev.md sources and excludes .prod.md sources", async (t) => {
  useNodeEnvironment(t, "development");
  const root = await fixture(t);
  const server = await createServer({
    configFile: false,
    root,
    logLevel: "silent",
    server: { middlewareMode: true },
    appType: "custom",
  });
  t.after(() => server.close());
  const { getMarkdownSource } = await server.ssrLoadModule("/src/lib/markdown.ts");
  assert.equal(getMarkdownSource("/"), common);
  assert.equal(getMarkdownSource("/guides"), development);
  assert.equal(getMarkdownSource("/release"), "");
  assert.equal(getMarkdownSource("/missing"), "");
});

test("production excludes .dev.md bodies from emitted code and source maps", async (t) => {
  useNodeEnvironment(t, "production");
  const root = await fixture(t);
  const result = await build({
    configFile: false,
    root,
    logLevel: "silent",
    build: {
      write: false,
      minify: false,
      sourcemap: true,
      lib: {
        entry: path.join(root, "src/lib/markdown.ts"),
        formats: ["es"],
        fileName: "markdown",
      },
    },
  });
  const outputs = (Array.isArray(result) ? result : [result]).flatMap((r) => r.output);
  const emitted = outputs
    .map((output) => (output.type === "chunk" ? output.code : String(output.source)))
    .join("\n");
  assert.ok(emitted.includes(common));
  assert.ok(emitted.includes(production));
  assert.ok(!emitted.includes(development), "development body leaked into a production asset");
  const entry = outputs.find((output) => output.type === "chunk" && output.isEntry);
  assert.ok(entry, "expected a production entry chunk");
  const { getMarkdownSource } = await import(
    `data:text/javascript;base64,${Buffer.from(entry.code).toString("base64")}`
  );
  assert.equal(getMarkdownSource("/"), common);
  assert.equal(getMarkdownSource("/release"), production);
  assert.equal(getMarkdownSource("/guides"), "");
});
