#!/usr/bin/env node
/**
 * Generate specific tool pages for major AI tools (DALL-E, Midjourney, etc.)
 * These are individual tool pages, not general categories
 */

const STRAPI_URL = 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_API_TOKEN = '8d9fa930b45fcfd8a4981ead1a503eb875a26001729d1ada9af94e0d511675e8066090a8a584b199416110cc6c52defd4918c968bebf795fb476d6ec17afec990f6ddb4a33e7b2eda80422cb8bd53112dd4721d2bd4b65e8b12bafc1964e3f97965b8af6e58517e9178e1aeaebf9fa7bd525edb121135e4cbd07899bfaa09fe9';

const specificTools = [
  // Image Generation Tools
  {
    title: "DALL-E 3: OpenAI's Image Generator (2026)",
    slug: "dall-e-3",
    category: "image",
    primaryKeyword: "dall-e 3",
    metaTitle: "DALL-E 3 - OpenAI's AI Image Generator (2026)",
    metaDescription: "DALL-E 3 by OpenAI creates stunning images from text. Best prompt understanding & photorealistic results. $20/month with ChatGPT Plus.",
    introduction: "DALL-E 3 is OpenAI's latest AI image generator, offering unprecedented prompt understanding and photorealistic image quality. Integrated with ChatGPT Plus, it represents the cutting edge of text-to-image AI technology.",
    whatIsIt: "## What is DALL-E 3?\n\nDALL-E 3 is OpenAI's third-generation AI image generator that creates highly detailed, accurate images from text descriptions. Built on advanced diffusion models, it excels at understanding complex prompts and generating images that precisely match user intent.\n\nKey innovations include improved safety systems, better handling of text in images, and seamless integration with ChatGPT for conversational image generation.",
    howItWorks: "## How DALL-E 3 Works\n\n**Prompt Understanding**: Uses ChatGPT to help refine and expand your prompts for better results.\n\n**Diffusion Model**: Generates images through a controlled process that transforms random noise into coherent images.\n\n**Safety Measures**: Includes content policy enforcement and watermarking to prevent misuse.\n\n**Iterative Refinement**: Work conversationally with ChatGPT to adjust and improve generated images.",
    features: ["Best-in-class prompt understanding", "Photorealistic image quality", "ChatGPT integration", "1024x1024, 1024x1792, or 1792x1024 resolution", "Content safety systems", "Commercial use allowed with Plus"],
    topTools: [{name: "DALL-E 3", description: "OpenAI's flagship image generator", pricing: "$20/month (ChatGPT Plus)", bestFor: "Highest accuracy"}],
    useCases: "## DALL-E 3 Use Cases\n\n**Marketing Materials**: Create unique product images, ads, and promotional content\n\n**Concept Art**: Visualize ideas for games, films, and creative projects\n\n**Social Media**: Generate eye-catching graphics for posts and campaigns\n\n**Product Mockups**: Design product variations and prototypes\n\n**Educational Content**: Create illustrations for teaching materials",
    prosAndCons: {
      pros: ["Exceptional prompt understanding", "High-quality photorealistic output", "ChatGPT integration for refinement", "Commercial use rights included", "Strong safety features"],
      cons: ["Requires ChatGPT Plus subscription ($20/month)", "Limited to 50 prompts per 3 hours", "Cannot generate public figures", "No API access for general public", "Slower than some competitors"]
    },
    faq: [
      {question: "How much does DALL-E 3 cost?", answer: "DALL-E 3 is included with ChatGPT Plus at $20/month, or through the OpenAI API with usage-based pricing."},
      {question: "Can I use DALL-E 3 images commercially?", answer: "Yes, ChatGPT Plus subscribers have full rights to commercialize images they create, including for sale and licensing."},
      {question: "What's the difference between DALL-E 2 and DALL-E 3?", answer: "DALL-E 3 has dramatically improved prompt understanding, better image quality, and ChatGPT integration for conversational generation."},
      {question: "How do I access DALL-E 3?", answer: "Subscribe to ChatGPT Plus ($20/month) and use the image generation feature directly in ChatGPT conversations."}
    ],
    conclusion: "DALL-E 3 sets the standard for AI image generation with its exceptional prompt understanding and photorealistic results. While it requires a ChatGPT Plus subscription, the quality and commercial rights make it worthwhile for serious creators.",
    isFree: false,
    difficulty: "beginner",
    lastUpdated: "2026-01-22"
  },
  {
    title: "Midjourney: AI Art Generator (2026)",
    slug: "midjourney",
    category: "image",
    primaryKeyword: "midjourney",
    metaTitle: "Midjourney - Best AI Art Generator (2026)",
    metaDescription: "Midjourney creates stunning AI art and images. Best for artistic & stylized visuals. From $10/month. V6 model available.",
    introduction: "Midjourney is renowned for producing some of the most aesthetically pleasing AI-generated art. With its Discord-based interface and active creative community, it's the go-to choice for artists seeking stylized, high-quality imagery.",
    whatIsIt: "## What is Midjourney?\n\nMidjourney is an AI art generator accessed through Discord that specializes in creating artistic, stylized images. Known for its distinctive aesthetic quality and strong artistic coherence, Midjourney has become the preferred choice for digital artists, concept artists, and creative professionals.\n\nThe platform uses a proprietary AI model that excels at producing images with strong artistic direction, vibrant colors, and compelling compositions.",
    howItWorks: "## How Midjourney Works\n\n**Discord Commands**: Generate images using /imagine commands in Discord channels.\n\n**Prompt Engineering**: Craft detailed prompts with style references, parameters, and aspect ratios.\n\n**Upscaling & Variations**: Choose from generated options and create variations or upscale favorites.\n\n**Community Learning**: Learn from thousands of public creations in community galleries.",
    features: ["Exceptional artistic quality", "Version 6 model available", "Community gallery for inspiration", "Style references and blending", "Multiple aspect ratios", "Fast and Relax generation modes", "Commercial use (with paid plan)"],
    topTools: [{name: "Midjourney", description: "Leading AI art platform", pricing: "From $10/month", bestFor: "Artistic images"}],
    useCases: "## Midjourney Use Cases\n\n**Digital Art**: Create gallery-quality artwork and illustrations\n\n**Concept Design**: Visualize characters, environments, and props for games and films\n\n**Book Covers**: Design compelling cover art for novels and publications\n\n**Brand Identity**: Generate unique visual styles for brands\n\n**NFT Art**: Create distinctive digital art for NFT collections",
    prosAndCons: {
      pros: ["Best-in-class artistic quality", "Active creative community", "Regular model updates", "Flexible pricing tiers", "Strong stylistic coherence"],
      cons: ["Requires Discord", "Learning curve for parameters", "Public generations on Basic plan", "No refunds on subscriptions", "Can be slower during peak times"]
    },
    faq: [
      {question: "How much does Midjourney cost?", answer: "Plans start at $10/month (Basic), $30/month (Standard), and $60/month (Pro). Annual subscriptions offer 20% savings."},
      {question: "Can I use Midjourney for commercial projects?", answer: "Yes, all paid subscription tiers include commercial use rights for generated images."},
      {question: "Do I need Discord to use Midjourney?", answer: "Yes, Midjourney currently operates exclusively through Discord servers."},
      {question: "What's the difference between Fast and Relax mode?", answer: "Fast mode generates immediately, while Relax mode queues requests during busy times. Standard and Pro plans include both."}
    ],
    conclusion: "Midjourney remains the top choice for artists and creatives seeking high-quality, stylized AI art. While it requires Discord and has a learning curve, the exceptional artistic output justifies the investment.",
    isFree: false,
    difficulty: "intermediate",
    lastUpdated: "2026-01-22"
  },
  {
    title: "ChatGPT: AI Text Generator by OpenAI (2026)",
    slug: "chatgpt",
    category: "text",
    primaryKeyword: "chatgpt",
    metaTitle: "ChatGPT - Best AI Text Generator (2026)",
    metaDescription: "ChatGPT by OpenAI is the leading AI text generator. Create content, code, and more. Free & $20/month plans. GPT-4 available.",
    introduction: "ChatGPT has revolutionized AI-powered text generation, offering versatile content creation capabilities from casual conversation to professional writing. With access to GPT-4, it's the most widely-used AI assistant in the world.",
    whatIsIt: "## What is ChatGPT?\n\nChatGPT is OpenAI's conversational AI that generates human-like text responses. Powered by GPT-4 for Plus subscribers, it can write, code, analyze, and create across virtually any text-based task.\n\nFrom creative writing to technical documentation, ChatGPT understands context and maintains coherent conversations while producing high-quality output.",
    howItWorks: "## How ChatGPT Works\n\n**Conversational Interface**: Simply chat with ChatGPT like a human assistant.\n\n**Context Awareness**: Maintains conversation history for coherent, contextual responses.\n\n**GPT-4 Model**: Plus subscribers access the most advanced language model.\n\n**Custom Instructions**: Set preferences for consistent output style.",
    features: ["GPT-4 access (Plus)", "Web browsing capability", "Image generation (DALL-E 3)", "Code interpreter", "Custom GPTs", "Mobile apps", "Voice conversations"],
    topTools: [{name: "ChatGPT", description: "OpenAI's flagship AI assistant", pricing: "Free + $20/month (Plus)", bestFor: "Versatile text generation"}],
    useCases: "## ChatGPT Use Cases\n\n**Content Writing**: Blog posts, articles, social media, and marketing copy\n\n**Coding Assistance**: Write, debug, and explain code across languages\n\n**Research & Analysis**: Summarize documents and analyze information\n\n**Creative Writing**: Stories, scripts, and creative content\n\n**Learning & Education**: Explanations, tutoring, and study assistance",
    prosAndCons: {
      pros: ["Most versatile AI assistant", "Free tier available", "GPT-4 with Plus", "Regular updates", "Large context window", "Mobile apps"],
      cons: ["Free tier uses GPT-3.5 (less capable)", "Message limits on Plus", "Knowledge cutoff date", "Can generate incorrect information", "No internet access (free tier)"]
    },
    faq: [
      {question: "Is ChatGPT free?", answer: "Yes, ChatGPT offers a free tier with GPT-3.5. ChatGPT Plus ($20/month) provides GPT-4 access, faster responses, and priority access."},
      {question: "What's the difference between GPT-3.5 and GPT-4?", answer: "GPT-4 is significantly more capable, with better reasoning, longer context, and more accurate responses. It's available to Plus subscribers."},
      {question: "Can ChatGPT browse the internet?", answer: "Yes, ChatGPT Plus subscribers can enable web browsing for real-time information access."},
      {question: "Can I use ChatGPT for commercial purposes?", answer: "Yes, you can use ChatGPT output for commercial purposes, but review OpenAI's usage policies for specific restrictions."}
    ],
    conclusion: "ChatGPT is the most versatile AI text generator available, suitable for everything from casual questions to professional content creation. The Plus subscription unlocks GPT-4's full potential.",
    isFree: true,
    difficulty: "beginner",
    lastUpdated: "2026-01-22"
  }
];

async function importTool(toolData) {
  const response = await fetch(`${STRAPI_URL}/api/tool-pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ data: toolData }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP ${response.status}: ${error}`);
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return { success: true };
  }

  return response.json();
}

async function main() {
  console.log('🔧 Generating specific tool pages...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const tool of specificTools) {
    try {
      console.log(`📝 Creating: ${tool.title}`);
      const result = await importTool(tool);
      console.log(`   ✅ Success: ${tool.slug}\n`);
      successCount++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
      errorCount++;
    }
  }

  console.log('='.repeat(50));
  console.log('📊 SUMMARY:');
  console.log('='.repeat(50));
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log('='.repeat(50));
}

main().catch(console.error);
