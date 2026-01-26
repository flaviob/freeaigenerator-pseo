#!/usr/bin/env node
/**
 * Create category landing pages
 */

const STRAPI_URL = 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_API_TOKEN = '8d9fa930b45fcfd8a4981ead1a503eb875a26001729d1ada9af94e0d511675e8066090a8a584b199416110cc6c52defd4918c968bebf795fb476d6ec17afec990f6ddb4a33e7b2eda80422cb8bd53112dd4721d2bd4b65e8b12bafc1964e3f97965b8af6e58517e9178e1aeaebf9fa7bd525edb121135e4cbd07899bfaa09fe9';

const categories = [
  {
    title: "Best AI Image Generators",
    slug: "best-ai-image-generators",
    category: "image",
    listType: "best",
    primaryKeyword: "best ai image generators",
    metaTitle: "Best AI Image Generators - Top Tools (2026)",
    metaDescription: "Compare the best AI image generators. DALL-E 3, Midjourney, Stable Diffusion & more. Create stunning visuals with AI.",
    introduction: "AI image generators have revolutionized digital art and content creation. Compare the best tools for creating images with AI.",
    toolsList: [
      { name: "DALL-E 3", rating: 4.8, pricing: "$20/month", bestFor: "Highest quality and accuracy" },
      { name: "Midjourney", rating: 4.9, pricing: "From $10/month", bestFor: "Artistic styles" },
      { name: "Stable Diffusion", rating: 4.7, pricing: "Free", bestFor: "Open source flexibility" },
      { name: "Leonardo.ai", rating: 4.6, pricing: "Free tier", bestFor: "Free high-quality generation" }
    ],
    detailedReviews: "**DALL-E 3** leads in prompt understanding and photorealistic output. **Midjourney** excels at artistic and stylized images. **Stable Diffusion** offers complete control for technical users. **Leonardo.ai** provides the best free tier with 150 daily credits.",
    conclusion: "Whether you're a designer, marketer, or creative professional, these AI image generators offer powerful solutions for visual content creation.",
    year: 2026,
    lastUpdated: "2026-01-22",
    estimatedReadTime: 10
  },
  {
    title: "Best AI Video Generators",
    slug: "best-ai-video-generators",
    category: "video",
    listType: "best",
    primaryKeyword: "best ai video generators",
    metaTitle: "Best AI Video Generators - Top Tools (2026)",
    metaDescription: "Top AI video generators: Runway ML, Pika, Synthesia & more. Create professional videos from text. Compare features & pricing.",
    introduction: "AI video generators are transforming video production. Create professional videos from text, images, or scripts with these powerful tools.",
    toolsList: [
      { name: "Runway ML", rating: 4.7, pricing: "From $12/month", bestFor: "Professional creators" },
      { name: "Pika", rating: 4.6, pricing: "Free tier", bestFor: "Beginners" },
      { name: "Synthesia", rating: 4.8, pricing: "From $30/month", bestFor: "AI avatar videos" },
      { name: "HeyGen", rating: 4.5, pricing: "From $29/month", bestFor: "Business presentations" }
    ],
    detailedReviews: "**Runway ML** offers Gen-2 model for professional-grade videos. **Pika** makes video generation accessible with an easy interface. **Synthesia** specializes in AI avatar presentations. **HeyGen** focuses on business and marketing videos.",
    conclusion: "From social media clips to corporate presentations, these AI video generators make professional video creation accessible to everyone.",
    year: 2026,
    lastUpdated: "2026-01-22",
    estimatedReadTime: 10
  },
  {
    title: "Best AI Text Generators",
    slug: "best-ai-text-generators",
    category: "text",
    listType: "best",
    primaryKeyword: "best ai text generators",
    metaTitle: "Best AI Text Generators - Top Writing Tools (2026)",
    metaDescription: "Best AI text generators: ChatGPT, Claude, Jasper & more. Create blogs, emails, social posts & content. Compare features.",
    introduction: "AI text generators have become essential for content creation. Compare the best AI writing tools for blogs, marketing, and more.",
    toolsList: [
      { name: "ChatGPT", rating: 4.8, pricing: "Free + $20/month", bestFor: "Versatile writing" },
      { name: "Claude", rating: 4.8, pricing: "Free + $20/month", bestFor: "Long-form content" },
      { name: "Jasper AI", rating: 4.6, pricing: "From $49/month", bestFor: "Marketing content" },
      { name: "Copy.ai", rating: 4.5, pricing: "Free + $49/month", bestFor: "Marketing copy" }
    ],
    detailedReviews: "**ChatGPT** excels at versatile content generation. **Claude** handles long-form analytical content. **Jasper AI** specializes in marketing and business writing. **Copy.ai** focuses on conversion-optimized copy.",
    conclusion: "Whether you're writing blogs, marketing copy, or creative content, these AI text generators can dramatically improve your productivity.",
    year: 2026,
    lastUpdated: "2026-01-22",
    estimatedReadTime: 10
  },
  {
    title: "Best AI Audio Generators",
    slug: "best-ai-audio-generators",
    category: "audio",
    listType: "best",
    primaryKeyword: "best ai audio generators",
    metaTitle: "Best AI Audio Generators - Music & Voice (2026)",
    metaDescription: "Top AI audio generators: ElevenLabs, Suno, Murf AI & more. Create music, voices & sound. Text-to-speech & music generation.",
    introduction: "AI audio generators are revolutionizing music and voice production. Create professional audio content from text with these powerful tools.",
    toolsList: [
      { name: "ElevenLabs", rating: 4.9, pricing: "Free + from $5/month", bestFor: "Realistic voices" },
      { name: "Suno", rating: 4.7, pricing: "Free + from $10/month", bestFor: "Music generation" },
      { name: "Murf AI", rating: 4.6, pricing: "From $19/month", bestFor: "Professional voiceovers" },
      { name: "Speechify", rating: 4.5, pricing: "Free + $29/month", bestFor: "Text-to-speech" }
    ],
    detailedReviews: "**ElevenLabs** leads in voice quality and cloning. **Suno** creates complete songs from text. **Murf AI** provides professional voiceover solutions. **Speechify** excels at natural text-to-speech.",
    conclusion: "From podcasts to music production, these AI audio generators make professional audio creation accessible to everyone.",
    year: 2026,
    lastUpdated: "2026-01-22",
    estimatedReadTime: 10
  },
  {
    title: "Best AI Design Generators",
    slug: "best-ai-design-generators",
    category: "design",
    listType: "best",
    primaryKeyword: "best ai design generators",
    metaTitle: "Best AI Design Generators - Graphics & Logos (2026)",
    metaDescription: "Top AI design generators: Canva AI, Looka, Adobe Firefly & more. Create logos, graphics & presentations with AI.",
    introduction: "AI design generators democratize graphic design. Create professional logos, graphics, and marketing materials with these powerful tools.",
    toolsList: [
      { name: "Canva AI", rating: 4.7, pricing: "Free + $15/month", bestFor: "All-in-one design" },
      { name: "Looka", rating: 4.6, pricing: "From $20", bestFor: "Logo design" },
      { name: "Adobe Firefly", rating: 4.8, pricing: "From $4.99/month", bestFor: "Professional designers" },
      { name: "Designs.ai", rating: 4.5, pricing: "From $29/month", bestFor: "Brand kits" }
    ],
    detailedReviews: "**Canva AI** offers comprehensive design tools with AI assistance. **Looka** specializes in logo and brand identity. **Adobe Firefly** integrates AI into professional workflows. **Designs.ai** creates complete brand packages.",
    conclusion: "Whether you need logos, social media graphics, or presentations, these AI design generators make professional design accessible.",
    year: 2026,
    lastUpdated: "2026-01-22",
    estimatedReadTime: 10
  }
];

async function importCategory(categoryData) {
  const response = await fetch(`${STRAPI_URL}/api/category-pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ data: categoryData }),
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
  console.log('📁 Creating category pages...\n');

  let successCount = 0;
  let errorCount = 0;

  for (const category of categories) {
    try {
      console.log(`📝 Creating: ${category.title}`);
      const result = await importCategory(category);
      console.log(`   ✅ Success: ${category.slug}\n`);
      successCount++;
      await new Promise(resolve => setTimeout(resolve, 500));
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
