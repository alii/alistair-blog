export function useReadingTime<T extends HTMLElement>(
  content: string,
  wordsPerMinute = 260
) {
  const match = content.match(/\w+/g) ?? [];
  return Math.ceil(match.length / wordsPerMinute);
}
