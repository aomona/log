// Select the glob before building the map. Filtering a shared eager raw import
// at runtime hides the page but leaves development-only text in production JS.
const markdownFiles = import.meta.env.DEV
  ? import.meta.glob<string>(["/pages/**/*.md", "!/pages/**/*.prod.md"], {
      query: "?raw",
      import: "default",
      eager: true,
    })
  : import.meta.glob<string>(["/pages/**/*.md", "!/pages/**/*.dev.md"], {
      query: "?raw",
      import: "default",
      eager: true,
    });

const markdownByPath = new Map<string, string>();
for (const [file, source] of Object.entries(markdownFiles)) {
  const path =
    file
      .replace(/^\/pages\//, "/")
      .replace(/(?:\.(?:dev|prod))?\.md$/, "")
      .replace(/\/index$/, "") || "/";
  markdownByPath.set(path, source);
}

export function getMarkdownSource(path: string): string {
  return markdownByPath.get(path) ?? "";
}
