const markdownFiles = import.meta.glob<string>('/pages/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

const markdownByPath = new Map<string, string>();
for (const [file, source] of Object.entries(markdownFiles)) {
  const environment = file.match(/\.(dev|prod)\.md$/)?.[1];
  if (environment && environment !== (import.meta.env.DEV ? 'dev' : 'prod')) continue;

  const path = file
    .replace(/^\/pages\//, '/')
    .replace(/(?:\.(?:dev|prod))?\.md$/, '')
    .replace(/\/index$/, '') || '/';
  markdownByPath.set(path, source);
}

export function getMarkdownSource(path: string): string {
  return markdownByPath.get(path) ?? '';
}
