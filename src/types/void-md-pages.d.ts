import type { ArticleFrontmatter } from "./frontmatter";

export interface MdPage {
  path: string;
  title: string;
  frontmatter: ArticleFrontmatter;
  headings: ReadonlyArray<{
    depth: number;
    slug: string;
    text: string;
  }>;
}

declare const pages: ReadonlyArray<MdPage>;

export default pages;
