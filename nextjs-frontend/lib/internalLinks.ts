/**
 * Internal linking utility
 * Automatically converts tool mentions to internal links
 * Limits total links and varies anchor text for SEO best practices
 */

// Map of tool/category names to their slugs
// ONLY link when the anchor text matches the destination page topic
const toolLinks: { [key: string]: string } = {
  // Category pages - only exact category name matches
  'AI Image Generator': '/ai-image-generator',
  'AI image generator': '/ai-image-generator',
  'AI Video Generator': '/ai-video-generator',
  'AI video generator': '/ai-video-generator',
  'AI Text Generator': '/ai-text-generator',
  'AI text generator': '/ai-text-generator',
  'AI Voice Generator': '/ai-voice-generator',
  'AI voice generator': '/ai-voice-generator',
  'AI Music Generator': '/ai-music-generator',
  'AI music generator': '/ai-music-generator',
  'AI Logo Generator': '/ai-logo-generator',
  'AI logo generator': '/ai-logo-generator',
  'AI Character Generator': '/ai-character-generator',
  'AI character generator': '/ai-character-generator',

  // Specific tool pages (only if we have dedicated pages for them)
  'DALL-E 3': '/dall-e-3',
  'DALL·E 3': '/dall-e-3',
  'DALL-E': '/dall-e-3',
  'Bing AI Image Generator': '/bing-ai-image-generator',
  'Bing Image Creator': '/bing-ai-image-generator',
};

// Anchor text variations for category links (to avoid repetitive exact-match anchors)
const anchorVariations: { [slug: string]: string[] } = {
  '/ai-image-generator': [
    'AI image generation tools',
    'text-to-image AI',
    'AI art creation',
    'image generation guide',
    'AI-powered image tools',
  ],
  '/ai-video-generator': [
    'AI video creation tools',
    'text-to-video AI',
    'AI video maker',
    'video generation guide',
  ],
  '/ai-voice-generator': [
    'AI voice tools',
    'text-to-speech AI',
    'voice synthesis',
    'voice generation guide',
  ],
  '/ai-text-generator': [
    'AI writing tools',
    'text generation AI',
    'AI content creation',
    'AI copywriting',
  ],
  '/ai-music-generator': [
    'AI music creation',
    'music generation tools',
    'AI composition',
  ],
  '/ai-logo-generator': [
    'AI logo design',
    'logo creation tools',
    'AI branding tools',
  ],
  '/ai-character-generator': [
    'AI character creation',
    'character design tools',
    'AI persona generator',
  ],
};

/**
 * Add internal links to content with limits
 * - Maximum of maxLinks total internal links
 * - No links inside headings
 * - Varied anchor text for duplicate slugs
 */
export function addInternalLinks(html: string, maxLinks: number = 2): string {
  if (!html) return html;

  // First, protect headings by marking them
  let processedHtml = html;

  // Track links added per slug and total
  const linksPerSlug: { [slug: string]: number } = {};
  let totalLinksAdded = 0;
  const variationIndex: { [slug: string]: number } = {};

  // Sort by length (longest first) to match more specific names first
  const sortedTools = Object.keys(toolLinks).sort((a, b) => b.length - a.length);

  sortedTools.forEach(toolName => {
    if (totalLinksAdded >= maxLinks) return;

    const slug = toolLinks[toolName];

    // Initialize counters
    if (linksPerSlug[slug] === undefined) {
      linksPerSlug[slug] = 0;
      variationIndex[slug] = 0;
    }

    // Skip if we already have 1 link to this slug per section
    if (linksPerSlug[slug] >= 1) return;

    // Create regex that:
    // 1. Matches the tool name
    // 2. Not already in a link
    // 3. Not inside a heading tag
    const regex = new RegExp(
      `(?<!href="|>|<h[1-6][^>]*>[^<]*)\\b(${escapeRegex(toolName)})\\b(?![^<]*</h[1-6]>)(?!</a>)(?!\\s*</strong>\\s*</a>)`,
      'gi'
    );

    processedHtml = processedHtml.replace(regex, (match) => {
      // Check limits
      if (totalLinksAdded >= maxLinks || linksPerSlug[slug] >= 1) {
        return match;
      }

      // Check if this match is inside an existing link
      const matchIndex = processedHtml.indexOf(match);
      const beforeMatch = processedHtml.substring(0, matchIndex);
      const openLinks = (beforeMatch.match(/<a\s/g) || []).length;
      const closeLinks = (beforeMatch.match(/<\/a>/g) || []).length;

      // If we're inside a link, don't add another one
      if (openLinks > closeLinks) {
        return match;
      }

      // Check if inside a heading
      const lastHeadingOpen = Math.max(
        beforeMatch.lastIndexOf('<h1'),
        beforeMatch.lastIndexOf('<h2'),
        beforeMatch.lastIndexOf('<h3'),
        beforeMatch.lastIndexOf('<h4'),
        beforeMatch.lastIndexOf('<h5'),
        beforeMatch.lastIndexOf('<h6')
      );
      const lastHeadingClose = Math.max(
        beforeMatch.lastIndexOf('</h1>'),
        beforeMatch.lastIndexOf('</h2>'),
        beforeMatch.lastIndexOf('</h3>'),
        beforeMatch.lastIndexOf('</h4>'),
        beforeMatch.lastIndexOf('</h5>'),
        beforeMatch.lastIndexOf('</h6>')
      );

      // If inside a heading, don't add link
      if (lastHeadingOpen > lastHeadingClose) {
        return match;
      }

      // Determine anchor text
      let anchorText = match;

      // For duplicate links to same slug, use varied anchor text
      if (linksPerSlug[slug] > 0 && anchorVariations[slug]) {
        const variations = anchorVariations[slug];
        anchorText = variations[variationIndex[slug] % variations.length];
        variationIndex[slug]++;
      }

      // Update counters
      linksPerSlug[slug]++;
      totalLinksAdded++;

      return `<a href="${slug}" class="text-[#ef4444] hover:underline font-semibold">${anchorText}</a>`;
    });
  });

  return processedHtml;
}

/**
 * Escape special regex characters
 */
function escapeRegex(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Add internal links specifically for markdown content
 * This works on plain text before HTML conversion
 */
export function addLinksToMarkdown(markdown: string): string {
  let linkedMarkdown = markdown;

  // Sort by length (longest first)
  const sortedTools = Object.keys(toolLinks).sort((a, b) => b.length - a.length);

  sortedTools.forEach(toolName => {
    const slug = toolLinks[toolName];

    // Match tool name that's not already in a link or bold
    const regex = new RegExp(
      `(?<!\\[|\\*\\*)\\b(${escapeRegex(toolName)})\\b(?!\\]|\\*\\*)`,
      'g'
    );

    linkedMarkdown = linkedMarkdown.replace(regex, `[**$1**](${slug})`);
  });

  return linkedMarkdown;
}
