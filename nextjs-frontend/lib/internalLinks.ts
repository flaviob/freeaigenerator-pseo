/**
 * Internal linking utility
 * Automatically converts tool mentions to internal links
 */

// Map of tool names to their slugs
const toolLinks: { [key: string]: string } = {
  // Major tools
  'DALL-E 3': '/dall-e-3',
  'DALL·E 3': '/dall-e-3',
  'DALL-E': '/dall-e-3',
  'Midjourney': '/midjourney',
  'ChatGPT': '/chatgpt',
  'Stable Diffusion': '/ai-image-generator',
  'Leonardo.ai': '/ai-image-generator',

  // Video tools
  'Runway ML': '/ai-video-generator',
  'Pika': '/ai-video-generator',
  'Synthesia': '/ai-video-generator',
  'HeyGen': '/ai-video-generator',

  // Text tools
  'Claude': '/ai-text-generator',
  'Jasper AI': '/ai-text-generator',
  'Copy.ai': '/ai-text-generator',
  'Jasper': '/ai-text-generator',

  // Audio tools
  'ElevenLabs': '/ai-voice-generator',
  'Suno': '/ai-music-generator',
  'Murf AI': '/ai-voice-generator',
  'Speechify': '/ai-voice-generator',

  // Design tools
  'Canva AI': '/ai-graphic-design-generator',
  'Canva': '/ai-graphic-design-generator',
  'Looka': '/ai-logo-generator',
  'Adobe Firefly': '/ai-graphic-design-generator',
  'Designs.ai': '/ai-graphic-design-generator',

  // Character tools
  'Character.AI': '/ai-character-generator',
  'Artbreeder': '/ai-character-generator',

  // Categories
  'AI Image Generator': '/ai-image-generator',
  'AI Video Generator': '/ai-video-generator',
  'AI Text Generator': '/ai-text-generator',
  'AI Voice Generator': '/ai-voice-generator',
  'AI Music Generator': '/ai-music-generator',
  'AI Logo Generator': '/ai-logo-generator',
  'AI Character Generator': '/ai-character-generator',
};

/**
 * Add internal links to content
 * Converts tool mentions to clickable links
 */
export function addInternalLinks(html: string): string {
  let linkedHtml = html;

  // Sort by length (longest first) to match more specific names first
  const sortedTools = Object.keys(toolLinks).sort((a, b) => b.length - a.length);

  sortedTools.forEach(toolName => {
    const slug = toolLinks[toolName];

    // Create regex that matches the tool name but not if it's already in a link
    // Negative lookbehind: not preceded by href=" or >
    // Negative lookahead: not followed by <
    const regex = new RegExp(
      `(?<!href="|>)\\b(${escapeRegex(toolName)})\\b(?!</a>)(?!\\s*</strong>\\s*</a>)`,
      'gi'
    );

    // Replace with linked version, but only if not already inside an <a> tag
    linkedHtml = linkedHtml.replace(regex, (match) => {
      // Check if this match is inside an existing link
      const beforeMatch = linkedHtml.substring(0, linkedHtml.indexOf(match));
      const openLinks = (beforeMatch.match(/<a\s/g) || []).length;
      const closeLinks = (beforeMatch.match(/<\/a>/g) || []).length;

      // If we're inside a link, don't add another one
      if (openLinks > closeLinks) {
        return match;
      }

      return `<a href="${slug}" class="text-[#ef4444] hover:underline font-semibold">${match}</a>`;
    });
  });

  return linkedHtml;
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
