export function articleTitleTransitionName(path: string): string {
  return `article-title-${Array.from(path, (character) => character.codePointAt(0)!.toString(16)).join("-")}`;
}
