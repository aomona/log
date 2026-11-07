import { expect, test } from "vite-plus/test";
import { embedArticleTitleTransition } from "./article-title-transitions";
import { articleTitleTransitionName } from "../src/lib/articleTitleTransition";

function moduleWithHtml(html: string): string {
  return `import { createStaticVNode } from "vue"; export const render = () => createStaticVNode(${JSON.stringify(html)}, 1);`;
}

test("matches the card name and annotates only the first real heading", () => {
  const name = articleTitleTransitionName("/articles/example");
  const html =
    '<!-- <h1>comment</h1> --><pre>&lt;h1&gt;code&lt;/h1&gt; {{</pre><div><h1 id="title">Title</h1><h1>Other</h1></div>';
  const result = embedArticleTitleTransition(moduleWithHtml(html), "articles/example.dev.md");
  expect(result).toBe(
    moduleWithHtml(
      html.replace('<h1 id="title">', `<h1 style=";view-transition-name:${name}" id="title">`),
    ),
  );
});

test("preserves existing heading styles, attributes, and module metadata", () => {
  const html = '<h1 style="color:red;font-family:&quot;A&amp;B&quot;" id="title">Title</h1>';
  const code = `${moduleWithHtml(html)} export const frontmatter = { title: "<h1>metadata</h1>" };`;
  const name = articleTitleTransitionName("/articles/example");
  const expected = html
    .replace('style="color:red;', ' style="color:red;')
    .replace('&quot;" id=', `&quot;;view-transition-name:${name}" id=`);
  expect(embedArticleTitleTransition(code, "articles/example.md")).toBe(
    code.replace(JSON.stringify(html), JSON.stringify(expected)),
  );
});

test.each([
  ["articles/example.dev.md", "/articles/example"],
  ["articles/example.prod.md", "/articles/example"],
  ["articles/nested/index.md", "/articles/nested"],
  ["index.md", "/"],
  ["articles/日本語.md", "/articles/日本語"],
])("uses the same route identity for %s", (file, route) => {
  expect(embedArticleTitleTransition(moduleWithHtml("<h1>Title</h1>"), file)).toContain(
    articleTitleTransitionName(route),
  );
});

test("does not modify heading-free content or unrelated strings", () => {
  const code = `${moduleWithHtml("<p>Text</p>")} export const title = "<h1>Title</h1>";`;
  expect(embedArticleTitleTransition(code, "articles/example.md")).toBe(code);
});

test("keeps route names distinct even with punctuation and non-ASCII paths", () => {
  const paths = [
    "/articles/a-b",
    "/articles/a/b",
    "/articles/_2F",
    "/articles/%2F",
    "/articles/日本語",
  ];
  const names = paths.map(articleTitleTransitionName);
  expect(new Set(names).size).toBe(paths.length);
  expect(names.every((name) => /^article-title-[a-f0-9-]+$/.test(name))).toBe(true);
});
