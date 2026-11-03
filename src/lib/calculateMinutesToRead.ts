export function calculateMinutesToRead(markdown: string): number {
  const text = markdown
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/^\s*---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1');

  const japaneseCharacters = text.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}ー]/gu)?.length ?? 0;
  const englishWords = text.match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0;

  // Mixed-language articles add the reading time for each language.
  return Math.max(1, Math.ceil(japaneseCharacters / 400 + englishWords / 200));
}
