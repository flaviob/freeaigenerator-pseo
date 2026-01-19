#!/usr/bin/env node
const STRAPI_URL = 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_API_TOKEN = '8d9fa930b45fcfd8a4981ead1a503eb875a26001729d1ada9af94e0d511675e8066090a8a584b199416110cc6c52defd4918c968bebf795fb476d6ec17afec990f6ddb4a33e7b2eda80422cb8bd53112dd4721d2bd4b65e8b12bafc1964e3f97965b8af6e58517e9178e1aeaebf9fa7bd525edb121135e4cbd07899bfaa09fe9';

const categoryPage = {
  title: "Best AI Image Generators",
  slug: "best-ai-image-generators",
  category: "image",
  listType: "best",
  primaryKeyword: "best ai image generator",
  metaTitle: "10 Best AI Image Generators in 2026 (Free & Paid)",
  metaDescription: "Discover the best AI image generators in 2026. Compare Midjourney, DALL-E, Stable Diffusion, and more. Find the perfect tool for your creative projects.",
  introduction: "AI image generators have transformed how we create visual content. Whether you're a designer, marketer, or hobbyist, choosing the right AI image generator can significantly impact your workflow and results. This comprehensive guide reviews the top 10 AI image generators available in 2026.",
  selectionCriteria: "We evaluated each AI image generator based on:\n\n- **Image Quality**: Resolution, detail, and artistic coherence\n- **Ease of Use**: Learning curve and user interface\n- **Features**: Available styles, editing tools, and customization\n- **Pricing**: Free tiers, subscription costs, and value for money\n- **Speed**: Generation time and processing efficiency\n- **Commercial Use**: Licensing and copyright terms",
  toolsList: [
    {
      name: "Midjourney",
      description: "The industry leader in AI-generated art, Midjourney creates stunning, artistic images with exceptional quality and detail.",
      pros: ["Exceptional image quality", "Strong artistic style", "Active community", "Regular updates"],
      cons: ["No free tier", "Discord-only interface", "Steep learning curve"],
      rating: 4.8,
      pricing: "From $10/month",
      isFree: false,
      category: "image",
      ctaText: "Try Midjourney",
      ctaUrl: "https://midjourney.com"
    },
    {
      name: "DALL-E 3",
      description: "OpenAI's latest image generator integrated with ChatGPT, offering photorealistic results and excellent text rendering.",
      pros: ["Integrated with ChatGPT", "Excellent text rendering", "Safe content filters", "User-friendly"],
      cons: ["Limited free credits", "Less artistic than Midjourney", "Slower generation"],
      rating: 4.6,
      pricing: "Free with limits, ChatGPT Plus $20/month",
      isFree: true,
      category: "image",
      ctaText: "Try DALL-E 3",
      ctaUrl: "https://openai.com/dall-e-3"
    },
    {
      name: "Stable Diffusion",
      description: "Open-source AI image generator you can run locally or through free online interfaces. Unlimited generation potential.",
      pros: ["Completely free", "Run locally", "Highly customizable", "Active development"],
      cons: ["Technical setup required", "Inconsistent quality", "Needs powerful hardware"],
      rating: 4.5,
      pricing: "Free (open source)",
      isFree: true,
      category: "image",
      ctaText: "Get Stable Diffusion",
      ctaUrl: "https://stability.ai"
    },
    {
      name: "Leonardo.AI",
      description: "User-friendly AI image generator with generous free tier and professional features for game assets and illustrations.",
      pros: ["150 daily free credits", "Game-focused models", "Easy to use", "High quality"],
      cons: ["Limited free generations", "Slower than competitors", "Fewer styles"],
      rating: 4.4,
      pricing: "Free tier + paid plans from $10/month",
      isFree: true,
      category: "image",
      ctaText: "Try Leonardo.AI",
      ctaUrl: "https://leonardo.ai"
    },
    {
      name: "Adobe Firefly",
      description: "Adobe's AI image generator integrated into Creative Cloud, designed for commercial safety and professional workflows.",
      pros: ["Commercial-safe training", "Adobe integration", "High quality", "Professional features"],
      cons: ["Requires Adobe account", "Limited free tier", "Less creative than others"],
      rating: 4.3,
      pricing: "Free tier + Creative Cloud subscription",
      isFree: true,
      category: "image",
      ctaText: "Try Adobe Firefly",
      ctaUrl: "https://firefly.adobe.com"
    },
    {
      name: "Bing Image Creator",
      description: "Microsoft's free AI image generator powered by DALL-E 3, accessible through Bing and Microsoft Edge.",
      pros: ["Completely free", "DALL-E 3 quality", "No account required", "Fast generation"],
      cons: ["Basic features", "Microsoft ecosystem", "Limited control"],
      rating: 4.2,
      pricing: "Free",
      isFree: true,
      category: "image",
      ctaText: "Try Bing Image Creator",
      ctaUrl: "https://bing.com/create"
    }
  ],
  comparisonTable: {
    headers: ["Midjourney", "DALL-E 3", "Stable Diffusion", "Leonardo.AI"],
    rows: [
      { feature: "Free Tier", values: ["✗", "Limited", "✓", "✓"] },
      { feature: "Quality", values: ["Excellent", "Very Good", "Good", "Very Good"] },
      { feature: "Ease of Use", values: ["Medium", "Easy", "Hard", "Easy"] },
      { feature: "Commercial Use", values: ["✓", "✓", "✓", "✓"] },
      { feature: "Local Install", values: ["✗", "✗", "✓", "✗"] },
      { feature: "Generation Speed", values: ["Fast", "Medium", "Varies", "Medium"] }
    ]
  },
  detailedReviews: "## 1. Midjourney - Best Overall\n\nMidjourney continues to lead the AI image generation space with its exceptional artistic quality. The latest v6 model produces images with stunning detail and coherent compositions that rival professional photography and digital art.\n\n**Best for**: Professional artists, marketers, content creators who need top-tier quality\n\n**Pricing**: Plans start at $10/month for 200 generations\n\n## 2. DALL-E 3 - Best for Beginners\n\nOpenAI's DALL-E 3 integration with ChatGPT makes it the most accessible AI image generator. The conversational interface lets you refine prompts naturally, and the text rendering capabilities are unmatched.\n\n**Best for**: Beginners, ChatGPT users, those who need accurate text in images\n\n**Pricing**: Free limited access, or $20/month with ChatGPT Plus\n\n## 3. Stable Diffusion - Best Free Option\n\nAs the leading open-source option, Stable Diffusion offers unlimited generation potential if you're willing to handle the technical setup. The community has created thousands of custom models for specific use cases.\n\n**Best for**: Developers, hobbyists, those needing unlimited generations\n\n**Pricing**: Free (requires technical setup or use online interfaces)",
  buyingGuide: "## How to Choose the Right AI Image Generator\n\n### Consider Your Budget\n- **$0**: Stable Diffusion, Bing Image Creator, Leonardo.AI (limited)\n- **$10-20/month**: Midjourney, DALL-E 3, Leonardo.AI Pro\n- **$30+/month**: Professional plans with higher limits\n\n### Evaluate Your Technical Skills\n- **Beginner**: DALL-E 3, Bing Image Creator, Leonardo.AI\n- **Intermediate**: Midjourney, Adobe Firefly\n- **Advanced**: Stable Diffusion with custom models\n\n### Determine Your Use Case\n- **Marketing/Ads**: Midjourney, DALL-E 3\n- **Game Assets**: Leonardo.AI, Stable Diffusion\n- **Professional Design**: Adobe Firefly, Midjourney\n- **Quick mockups**: Bing Image Creator, DALL-E 3\n- **Experimentation**: Stable Diffusion, Leonardo.AI",
  faq: [
    {
      question: "Which AI image generator is completely free?",
      answer: "Stable Diffusion is completely free and open-source. You can run it locally or use free online interfaces. Bing Image Creator is also free with no account required. Leonardo.AI offers 150 free daily credits."
    },
    {
      question: "Can I use AI-generated images commercially?",
      answer: "Most AI image generators allow commercial use, but terms vary. Midjourney, DALL-E 3, and Stable Diffusion all permit commercial use with paid plans. Adobe Firefly is specifically trained on commercially-safe content. Always review the specific terms of service."
    },
    {
      question: "Which AI creates the best quality images?",
      answer: "Midjourney is widely considered to produce the highest quality artistic images. DALL-E 3 excels at photorealism and text rendering. Quality also depends on your prompt engineering skills."
    },
    {
      question: "Do I need a powerful computer for AI image generation?",
      answer: "Only if you're running Stable Diffusion locally. Cloud-based services like Midjourney, DALL-E 3, and Leonardo.AI work on any device with an internet connection."
    }
  ],
  conclusion: "The best AI image generator for you depends on your specific needs, budget, and technical comfort level. Midjourney leads in quality, DALL-E 3 in ease of use, and Stable Diffusion in flexibility and cost.\n\nFor most users, we recommend starting with DALL-E 3 or Leonardo.AI's free tier to understand your needs, then upgrading to Midjourney if you need professional quality. Hobbyists and developers should explore Stable Diffusion for unlimited creative freedom.\n\nWhichever tool you choose, the key to great results is mastering prompt engineering and understanding each tool's strengths.",
  isFreeOnly: false,
  year: 2026,
  estimatedReadTime: 12,
  lastUpdated: new Date().toISOString().split('T')[0]
};

async function createCategoryPage() {
  const response = await fetch(`${STRAPI_URL}/api/category-pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    },
    body: JSON.stringify({
      data: {
        ...categoryPage,
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
  console.log('Creating test category page...\n');

  try {
    const result = await createCategoryPage();
    console.log('✅ Published: Best AI Image Generators');
    console.log(`   URL: https://pacific-abundance-production-4fff.up.railway.app/category/${categoryPage.slug}`);
    console.log(`   ID: ${result.data.id}`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main().catch(console.error);
