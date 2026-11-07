import path from "node:path";
import { babelParse, MagicString, parse, walkIdentifiers } from "vue/compiler-sfc";
import { normalizePath, type Plugin } from "vite";
import { articleTitleTransitionName } from "../src/lib/articleTitleTransition";

export function embedArticleTitleTransition(code: string, file: string): string {
  const route = `/${file.replace(/(?:\.(?:dev|prod))?\.md$/, "").replace(/(?:^|\/)index$/, "")}`;
  const name = articleTitleTransitionName(route);
  const output = new MagicString(code);
  let found = false;

  // shortcut: Void 1.5 emits Markdown HTML in createStaticVNode; replace with its HTML hook when available.
  walkIdentifiers(babelParse(code, { sourceType: "module" }), (identifier, parent) => {
    if (found || identifier.name !== "createStaticVNode" || parent?.type !== "CallExpression")
      return;
    const html = parent.arguments[0];
    if (html?.type !== "StringLiteral") return;

    const { descriptor, errors } = parse(`<template>${html.value}</template>`, {
      templateParseOptions: { delimiters: ["\u0000", "\u0000"] },
    });
    if (errors.length)
      throw new Error(`Cannot parse Markdown HTML for ${file}: ${errors.join(", ")}`);
    const nodes = [...(descriptor.template?.ast?.children ?? [])].reverse();
    while (nodes.length) {
      const node = nodes.pop()!;
      if (node.type !== 1) continue;
      if (node.tag !== "h1") {
        nodes.push(...[...node.children].reverse());
        continue;
      }

      const style = node.props.find((prop) => prop.type === 6 && prop.name === "style");
      const value = `${style?.type === 6 ? (style.value?.content ?? "") : ""};view-transition-name:${name}`;
      const attribute = ` style="${value.replaceAll("&", "&amp;").replaceAll('"', "&quot;")}"`;
      const start = (style?.loc.start.offset ?? node.loc.start.offset + 3) - "<template>".length;
      const end = (style?.loc.end.offset ?? node.loc.start.offset + 3) - "<template>".length;
      const updated = html.value.slice(0, start) + attribute + html.value.slice(end);
      output.overwrite(html.start!, html.end!, JSON.stringify(updated));
      found = true;
      break;
    }
  });
  return output.toString();
}

export function articleTitleTransitions(): Plugin {
  let pagesDirectory: string;
  return {
    name: "article-title-transitions",
    enforce: "pre",
    configResolved(config) {
      pagesDirectory = `${normalizePath(path.resolve(config.root, "pages"))}/`;
    },
    transform: {
      filter: { id: /\.md$/ },
      handler(code, id) {
        if (!id.startsWith(pagesDirectory)) return;
        return {
          code: embedArticleTitleTransition(code, id.slice(pagesDirectory.length)),
          map: null,
        };
      },
    },
  };
}
