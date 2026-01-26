// lib/processInternalLinks.ts

// Define natural anchor text variations for common internal link targets
const linkVariations: Record<string, string[]> = {
  'ai-image-generator': [
    'AI image generation tools',
    'text-to-image AI',
    'create images with AI',
    'AI art creation',
    'image generation guide',
    'AI-powered image tools',
    'generating images with AI',
    'AI image creation',
  ],
  'ai-video-generator': [
    'AI video creation tools',
    'text-to-video AI',
    'create videos with AI',
    'AI video maker',
    'video generation guide',
    'AI-powered video tools',
  ],
  'ai-voice-generator': [
    'AI voice tools',
    'text-to-speech AI',
    'voice synthesis',
    'AI voice creation',
    'voice generation guide',
  ],
  'ai-art-generator': [
    'AI art tools',
    'digital art creation',
    'AI artwork generator',
    'creating art with AI',
    'AI art guide',
  ],
  'ai-text-generator': [
    'AI writing tools',
    'text generation AI',
    'AI content creation',
    'AI copywriting',
    'text generation guide',
  ],
  'ai-logo-generator': [
    'AI logo design',
    'logo creation tools',
    'AI branding tools',
    'logo maker guide',
  ],
  'ai-music-generator': [
    'AI music creation',
    'music generation tools',
    'AI composition',
    'AI audio tools',
  ],
};

// Generic variations for any internal link
const genericVariations = [
  'learn more',
  'explore this tool',
  'read our guide',
  'discover more',
  'see our review',
  'get started',
  'find out more',
];

/**
 * Process HTML content to limit and vary internal links
 * @param html - The HTML content to process
 * @param maxLinks - Maximum number of internal links to keep (default: 7)
 * @param baseUrl - Base URL for internal links (default: '')
 * @returns Processed HTML with limited and varied links
 */
export function processInternalLinks(
  html: string,
  maxLinks: number = 7,
  baseUrl: string = ''
): string {
  if (!html) return html;

  // First, remove all links inside headings (h1-h6)
  let processedHtml = html.replace(
    /<h([1-6])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level, attrs, content) => {
      // Remove anchor tags but keep the text inside headings
      const cleanedContent = content.replace(/<a[^>]*>([^<]*)<\/a>/gi, '$1');
      return `<h${level}${attrs}>${cleanedContent}</h${level}>`;
    }
  );

  // Track links we've already processed
  const usedSlugs = new Map<string, number>();
  let totalLinksKept = 0;
  let variationIndex = 0;

  // Regular expression to match anchor tags with href
  const linkRegex = /<a\s+([^>]*href=["']([^"']+)["'][^>]*)>([^<]+)<\/a>/gi;

  // Collect all internal links
  interface LinkInfo {
    fullMatch: string;
    href: string;
    text: string;
    slug: string;
    index: number;
  }

  const internalLinks: LinkInfo[] = [];
  let match;
  let searchIndex = 0;

  // Reset regex
  linkRegex.lastIndex = 0;

  while ((match = linkRegex.exec(processedHtml)) !== null) {
    const [fullMatch, , href, text] = match;

    // Check if it's an internal link (relative or same domain)
    const isInternal =
      href.startsWith('/') ||
      href.startsWith(baseUrl) ||
      (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#'));

    if (isInternal) {
      // Extract slug from href
      const slug = href
        .replace(baseUrl, '')
        .replace(/^\//, '')
        .split('/')[0]
        .split('?')[0]
        .split('#')[0];

      internalLinks.push({
        fullMatch,
        href,
        text,
        slug,
        index: match.index,
      });
    }
  }

  // If we have fewer links than max, no need to process
  if (internalLinks.length <= maxLinks) {
    return processedHtml;
  }

  // Group links by their target slug
  const linksBySlug = new Map<string, LinkInfo[]>();
  for (const link of internalLinks) {
    const existing = linksBySlug.get(link.slug);
    if (existing) {
      existing.push(link);
    } else {
      linksBySlug.set(link.slug, [link]);
    }
  }

  // Calculate how many links to keep per unique target
  const uniqueTargets = linksBySlug.size;
  const maxPerTarget = Math.max(1, Math.ceil(maxLinks / uniqueTargets));

  // Track which links to keep (by their original match string)
  const linksToRemove = new Set<string>();
  const linksToVary = new Map<string, string>(); // original -> new anchor text

  // Process each unique target
  const slugEntries = Array.from(linksBySlug.entries());
  for (const [slug, links] of slugEntries) {
    let keptForThisTarget = 0;

    for (let i = 0; i < links.length; i++) {
      const link = links[i];

      if (keptForThisTarget >= maxPerTarget || totalLinksKept >= maxLinks) {
        // Mark for removal (keep just the text)
        linksToRemove.add(link.fullMatch);
      } else {
        // Keep the link
        if (keptForThisTarget > 0) {
          // This is a duplicate link to the same target - vary the anchor text
          const variations = linkVariations[slug] || genericVariations;
          const newText = variations[variationIndex % variations.length];
          variationIndex++;
          linksToVary.set(link.fullMatch, newText);
        }
        // First occurrence keeps original text

        keptForThisTarget++;
        totalLinksKept++;
      }
    }
  }

  // Apply removals and variations
  const linksToRemoveArray = Array.from(linksToRemove);
  for (const linkMatch of linksToRemoveArray) {
    // Extract just the text from the link
    const textMatch = linkMatch.match(/>([^<]+)</);
    const text = textMatch ? textMatch[1] : '';
    processedHtml = processedHtml.replace(linkMatch, text);
  }

  // Use Array.from to iterate over Map entries
  const variationEntries = Array.from(linksToVary.entries());
  for (const [originalMatch, newText] of variationEntries) {
    // Extract href from original
    const hrefMatch = originalMatch.match(/href=["']([^"']+)["']/);
    if (hrefMatch) {
      const newLink = `<a href="${hrefMatch[1]}">${newText}</a>`;
      processedHtml = processedHtml.replace(originalMatch, newLink);
    }
  }

  return processedHtml;
}

export default processInternalLinks;
