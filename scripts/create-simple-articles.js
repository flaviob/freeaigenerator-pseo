#!/usr/bin/env node
const STRAPI_URL = 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_API_TOKEN = '8d9fa930b45fcfd8a4981ead1a503eb875a26001729d1ada9af94e0d511675e8066090a8a584b199416110cc6c52defd4918c968bebf795fb476d6ec17afec990f6ddb4a33e7b2eda80422cb8bd53112dd4721d2bd4b65e8b12bafc1964e3f97965b8af6e58517e9178e1aeaebf9fa7bd525edb121135e4cbd07899bfaa09fe9';

const articles = [
  {
    title: "AI Video Generator",
    slug: "ai-video-generator",
    category: "video",
    primaryKeyword: "ai video generator",
    metaTitle: "AI Video Generator - Create Videos with AI",
    metaDescription: "Discover the best AI video generators to create stunning videos from text. Compare free and paid tools, features, and get started today.",
    introduction: "AI video generators have revolutionized content creation, allowing anyone to create professional-quality videos from simple text descriptions.",
    whatIsIt: "An AI video generator is a tool that uses artificial intelligence to create videos from text prompts, images, or other videos. These tools leverage advanced machine learning models to generate realistic video content without requiring traditional video editing skills or expensive equipment.",
    howItWorks: "AI video generators use diffusion models and neural networks trained on millions of videos to understand motion, composition, and visual storytelling. When you provide a text prompt, the AI analyzes your description and generates corresponding video frames that match your vision.",
    useCases: "Marketing professionals use AI video generators for product demos and social media ads. Educators create instructional videos and course content. Content creators generate videos for YouTube, TikTok, and Instagram. Businesses transform presentations into dynamic video content.",
    conclusion: "AI video generation technology is advancing rapidly, making professional video creation accessible to everyone. Whether you're a marketer, educator, or content creator, AI video tools can save time and money while producing engaging visual content.",
    isFree: false,
    difficulty: "beginner",
    estimatedReadTime: 8,
    lastUpdated: new Date().toISOString().split('T')[0]
  },
  {
    title: "Free AI Generator",
    slug: "free-ai-generator",
    category: "other",
    primaryKeyword: "free ai generator",
    metaTitle: "Free AI Generator - Best Free AI Tools 2026",
    metaDescription: "Discover the best free AI generators for images, videos, text, and more. Compare features, quality, and find the perfect free AI tool for your needs.",
    introduction: "Free AI generators have democratized artificial intelligence, making powerful creative tools accessible to everyone. Whether you need to generate images, videos, text, or music, there are excellent free options available.",
    whatIsIt: "A free AI generator is an artificial intelligence tool that creates content without requiring payment. These tools use machine learning models to generate images, text, videos, audio, and other content from user inputs. While some have limitations compared to paid versions, many free AI generators offer impressive capabilities.",
    howItWorks: "Free AI generators use the same core technology as paid alternatives - neural networks trained on vast datasets. They typically offer free access through freemium models (basic features free, advanced paid), credit systems (limited free credits), or are fully open source and community-supported.",
    useCases: "Personal projects and learning benefit from free AI tools. Students and hobbyists create content without budget constraints. Small businesses test AI capabilities before investing in paid solutions. Developers experiment with different models and techniques. Artists explore new creative possibilities.",
    conclusion: "The trend toward free AI access continues as open-source models improve and competition drives generous free offerings. Modern free AI generators often produce quality comparable to paid alternatives, making powerful AI tools accessible to everyone regardless of budget.",
    isFree: true,
    difficulty: "beginner",
    estimatedReadTime: 10,
    lastUpdated: new Date().toISOString().split('T')[0]
  }
];

async function createArticle(articleData) {
  const response = await fetch(`${STRAPI_URL}/api/tool-pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    },
    body: JSON.stringify({
      data: {
        ...articleData,
        publishedAt: new Date().toISOString()
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`${response.status} - ${error}`);
  }

  return response.json();
}

async function main() {
  console.log('Creating and publishing articles...\n');

  for (const article of articles) {
    try {
      console.log(`Creating: ${article.title}`);
      const result = await createArticle(article);
      console.log(`✅ Published: ${article.title}`);
      console.log(`   URL: ${STRAPI_URL.replace('freeaigenerator-pseo-production.up.railway.app', 'YOUR-FRONTEND-URL')}/${article.slug}\n`);
    } catch (error) {
      console.error(`❌ Error: ${article.title}`, error.message, '\n');
    }
  }
}

main().catch(console.error);
