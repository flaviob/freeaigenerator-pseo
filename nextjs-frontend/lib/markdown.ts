import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // Convert \n to <br>
});

/**
 * Convert markdown string to HTML
 */
export function parseMarkdown(markdown: string): string {
  if (!markdown) return '';
  return marked.parse(markdown) as string;
}
