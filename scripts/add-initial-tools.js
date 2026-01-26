#!/usr/bin/env node
/**
 * Add initial curated AI tools to populate the site
 * These are simpler tool reference pages that complement our comprehensive guides
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRAPI_URL = 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_API_TOKEN = '8d9fa930b45fcfd8a4981ead1a503eb875a26001729d1ada9af94e0d511675e8066090a8a584b199416110cc6c52defd4918c968bebf795fb476d6ec17afec990f6ddb4a33e7b2eda80422cb8bd53112dd4721d2bd4b65e8b12bafc1964e3f97965b8af6e58517e9178e1aeaebf9fa7bd525edb121135e4cbd07899bfaa09fe9';

// Top AI tools from keyword research - prioritizing high volume, lower difficulty
const initialTools = [
  {
    title: "AI Image Generator: Create Stunning Visuals with AI (2026)",
    slug: "ai-image-generator",
    category: "image",
    primaryKeyword: "ai image generator",
    secondaryKeywords: ["image generator ai", "ai picture generator", "ai art generator"],
    metaTitle: "AI Image Generator: Best Tools to Create Images (2026)",
    metaDescription: "Generate stunning images with AI. Explore DALL-E, Midjourney, Stable Diffusion and more. Free and paid options for creating AI art in 2026.",
    introduction: "AI image generators have revolutionized digital art creation, enabling anyone to create professional-quality visuals from simple text descriptions. These tools use advanced machine learning models like DALL-E, Midjourney, and Stable Diffusion to transform your ideas into stunning images in seconds.",
    whatIsIt: "## What is an AI Image Generator?\n\nAn AI image generator is a tool that creates original images from text descriptions using artificial intelligence. These generators use deep learning models trained on millions of images to understand visual concepts and artistic styles, allowing them to generate entirely new images based on your prompts.",
    howItWorks: "## How AI Image Generators Work\n\nAI image generators use diffusion models or GANs (Generative Adversarial Networks) to create images:\n\n1. **Text Processing**: The AI analyzes your text prompt to understand what you want\n2. **Latent Space Generation**: The model generates a compressed representation\n3. **Image Synthesis**: The AI gradually refines noise into a coherent image\n4. **Style Application**: Artistic styles and details are applied based on your prompt",
    features: [
      "Text-to-image generation",
      "Multiple art styles (realistic, anime, oil painting, etc.)",
      "High-resolution output",
      "Image editing and variations",
      "Inpainting and outpainting",
      "Style transfer capabilities"
    ],
    topTools: [
      {
        name: "DALL-E 3",
        description: "OpenAI's latest image generator with exceptional prompt understanding and photorealistic results. Available through ChatGPT Plus.",
        features: ["Best prompt understanding", "Photorealistic output", "Text rendering in images", "ChatGPT integration"],
        pricing: "$20/month (ChatGPT Plus)",
        bestFor: "Users wanting the highest quality and best prompt following"
      },
      {
        name: "Midjourney",
        description: "Leading AI art generator known for artistic and stylized images. Accessed through Discord with a vibrant community.",
        features: ["Artistic quality", "Active community", "Regular updates", "High resolution"],
        pricing: "From $10/month",
        bestFor: "Artists and creatives seeking unique, stylized results"
      },
      {
        name: "Stable Diffusion",
        description: "Open-source image generator that can run locally. Highly customizable with extensive community models and tools.",
        features: ["Open source", "Run locally", "Extensive customization", "Free to use"],
        pricing: "Free (open source)",
        bestFor: "Technical users wanting full control and customization"
      }
    ],
    useCases: "## Real-World Use Cases\n\n**Marketing & Advertising**: Create unique visuals for campaigns, social media, and promotional materials\n\n**Content Creation**: Generate illustrations, thumbnails, and featured images for blogs and videos\n\n**Product Design**: Visualize product concepts and packaging before production\n\n**Art & Creativity**: Explore artistic ideas and create digital artwork\n\n**Education**: Generate visual aids and educational illustrations",
    prosAndCons: {
      pros: [
        "Create unique images in seconds",
        "No artistic skills required",
        "Cost-effective compared to hiring designers",
        "Unlimited creative possibilities",
        "Constantly improving quality"
      ],
      cons: [
        "Learning curve for effective prompts",
        "Inconsistent results require iteration",
        "Some tools have commercial use restrictions",
        "May struggle with specific details",
        "Ethical concerns about AI-generated art"
      ]
    },
    faq: [
      {
        question: "What is the best AI image generator?",
        answer: "DALL-E 3 currently leads in prompt understanding and photorealism, Midjourney excels at artistic styles, and Stable Diffusion offers the most customization. The best choice depends on your specific needs and budget."
      },
      {
        question: "Are AI-generated images free to use commercially?",
        answer: "It depends on the tool. Midjourney and DALL-E allow commercial use with paid plans, while Stable Diffusion is completely open. Always check the specific terms of service."
      },
      {
        question: "How do I write good AI image prompts?",
        answer: "Be specific about subject, style, lighting, and composition. Include artistic references (like \"oil painting\" or \"photorealistic\"). Use descriptive adjectives and mention what you don't want with negative prompts."
      }
    ],
    conclusion: "AI image generators represent a paradigm shift in visual content creation. Whether you choose DALL-E 3's quality, Midjourney's artistry, or Stable Diffusion's flexibility, these tools democratize image creation and unlock creative possibilities previously impossible without years of artistic training.",
    isFree: false,
    difficulty: "beginner",
    estimatedReadTime: 8,
    lastUpdated: "2026-01-21"
  },
  {
    title: "Free AI Image Generator: Best No-Cost Tools (2026)",
    slug: "free-ai-image-generator",
    category: "image",
    primaryKeyword: "free ai image generator",
    secondaryKeywords: ["free image generator", "ai image generator free", "free ai art generator"],
    metaTitle: "Free AI Image Generator: Top Free Tools (2026)",
    metaDescription: "Discover the best free AI image generators. Create stunning visuals at zero cost with Craiyon, Leonardo.ai, and more. No credit card required.",
    introduction: "Creating AI-generated images doesn't require a paid subscription. Numerous high-quality free AI image generators offer impressive capabilities without costing a penny. From Craiyon's unlimited generations to Leonardo.ai's daily credits, these tools make AI art accessible to everyone.",
    whatIsIt: "## What Are Free AI Image Generators?\n\nFree AI image generators are tools that create images from text prompts without requiring payment. While some offer limited features compared to paid versions, many provide surprisingly high-quality results suitable for personal projects, social media, and creative exploration.",
    howItWorks: "## How Free AI Image Generators Work\n\nFree tools use the same underlying AI technology as paid versions but typically include:\n\n- **Daily credit limits** instead of unlimited generation\n- **Lower priority** processing during high-traffic periods\n- **Reduced resolution** or fewer customization options\n- **Watermarks** on generated images (some tools)",
    features: [
      "No payment or credit card required",
      "Text-to-image generation",
      "Multiple styles available",
      "Varying daily limits",
      "Good quality output",
      "Easy to use interfaces"
    ],
    topTools: [
      {
        name: "Craiyon (formerly DALL-E mini)",
        description: "Completely free with unlimited generations. Lower quality than premium tools but great for experimentation and fun projects.",
        features: ["Truly unlimited", "No signup required", "Fast generation", "Multiple variations"],
        pricing: "Free (ads supported)",
        bestFor: "Unlimited free generation and experimentation"
      },
      {
        name: "Leonardo.ai",
        description: "Generous free tier with 150 daily credits. High-quality results rivaling paid tools, with fine-tuned models for different styles.",
        features: ["150 daily credits", "High quality", "Multiple models", "Canvas editor"],
        pricing: "Free tier available",
        bestFor: "High-quality free generations with good daily limits"
      },
      {
        name: "Playground AI",
        description: "500 free images daily with commercial use rights. User-friendly interface with various AI models and styles.",
        features: ["500 daily images", "Commercial use", "Multiple models", "Edit tools"],
        pricing: "Free tier with 500/day",
        bestFor: "High volume free generation with commercial rights"
      }
    ],
    useCases: "## When to Use Free AI Image Generators\n\n**Learning & Experimentation**: Perfect for understanding prompt engineering\n\n**Personal Projects**: Blog headers, social media posts, personal artwork\n\n**Rapid Prototyping**: Testing visual concepts before commissioning custom work\n\n**Small Businesses**: Creating visuals on a tight budget\n\n**Students**: Educational projects and assignments",
    prosAndCons: {
      pros: [
        "Zero cost to use",
        "No financial commitment",
        "Great for learning and experimentation",
        "Some offer commercial use rights",
        "Perfect for personal projects"
      ],
      cons: [
        "Daily generation limits",
        "Lower resolution than paid tools",
        "Slower processing times",
        "Fewer features and customization",
        "Some include watermarks"
      ]
    },
    faq: [
      {
        question: "Can I use free AI-generated images commercially?",
        answer: "It depends on the specific tool. Playground AI and Leonardo.ai allow commercial use on free tiers, while others like Craiyon have restrictions. Always check the terms of service."
      },
      {
        question: "Are free AI image generators as good as paid ones?",
        answer: "Free tools offer impressive quality but usually with limitations. Paid tools like DALL-E 3 and Midjourney provide better prompt understanding, higher resolution, and more consistent results."
      },
      {
        question: "What's the best completely free AI image generator?",
        answer: "Craiyon offers truly unlimited free generation, while Leonardo.ai and Playground AI provide better quality with generous daily limits. Choose based on whether you prioritize quantity or quality."
      }
    ],
    conclusion: "Free AI image generators make this transformative technology accessible to everyone. Whether you're learning prompt engineering, working on personal projects, or exploring creative ideas, these no-cost tools provide genuine value without requiring a subscription.",
    isFree: true,
    difficulty: "beginner",
    estimatedReadTime: 7,
    lastUpdated: "2026-01-21"
  },
  {
    title: "AI Video Generator: Create Videos with AI (2026)",
    slug: "ai-video-generator",
    category: "video",
    primaryKeyword: "ai video generator",
    secondaryKeywords: ["video generator ai", "ai video maker", "ai generated video"],
    metaTitle: "AI Video Generator: Best Tools to Create AI Videos (2026)",
    metaDescription: "Create professional videos with AI. Explore Runway ML, Pika, Synthesia and more. Transform text and images into engaging video content.",
    introduction: "AI video generators are revolutionizing content creation by transforming text, images, and simple inputs into professional-quality videos. From text-to-video tools like Runway ML to AI avatar platforms like Synthesia, these generators enable anyone to create engaging video content without traditional filming or editing expertise.",
    whatIsIt: "## What is an AI Video Generator?\n\nAn AI video generator creates video content using artificial intelligence. These tools can generate videos from text scripts, animate still images, create AI avatars, or transform short clips into longer content. The technology uses generative AI models trained on vast video datasets.",
    howItWorks: "## How AI Video Generators Work\n\nAI video generation involves several approaches:\n\n**Text-to-Video**: Generates video clips from text descriptions using diffusion models\n\n**AI Avatars**: Creates realistic digital presenters from scripts\n\n**Video-to-Video**: Transforms existing footage with different styles or effects\n\n**Image-to-Video**: Animates still images into moving video",
    features: [
      "Text-to-video generation",
      "AI avatar creation",
      "Video style transfer",
      "Automatic editing",
      "Multiple aspect ratios",
      "Voiceover integration"
    ],
    topTools: [
      {
        name: "Runway ML",
        description: "Leading AI video platform with Gen-2 model for text-to-video, image-to-video, and professional editing tools.",
        features: ["Gen-2 video model", "Professional editing", "Multiple generation modes", "High quality output"],
        pricing: "Free tier + from $12/month",
        bestFor: "Professional video creators and editors"
      },
      {
        name: "Pika",
        description: "User-friendly AI video generator with text-to-video and image-to-video capabilities. Known for consistent quality.",
        features: ["Easy to use", "Consistent results", "Multiple styles", "Camera controls"],
        pricing: "Free tier available",
        bestFor: "Beginners and content creators seeking ease of use"
      },
      {
        name: "Synthesia",
        description: "AI avatar video generator for creating professional presentations. 140+ AI avatars and 120+ languages supported.",
        features: ["AI avatars", "140+ avatar options", "120+ languages", "Professional templates"],
        pricing: "From $30/month",
        bestFor: "Corporate training, presentations, and educational content"
      }
    ],
    useCases: "## Real-World Use Cases\n\n**Marketing**: Create product demos, ads, and promotional videos\n\n**Education**: Generate training videos and course content\n\n**Social Media**: Produce engaging content for TikTok, Instagram, YouTube\n\n**Corporate**: Create presentations, announcements, and training materials\n\n**Content Creation**: Enhance blog posts and articles with video",
    prosAndCons: {
      pros: [
        "Create videos without filming equipment",
        "No video editing skills required",
        "Cost-effective compared to traditional production",
        "Fast turnaround times",
        "Consistent quality"
      ],
      cons: [
        "Generated clips are typically short (4-8 seconds)",
        "Quality varies between tools",
        "Limited control over specific details",
        "Can look artificial or uncanny",
        "Usage costs can add up"
      ]
    },
    faq: [
      {
        question: "Can AI generate full-length videos?",
        answer: "Current AI video generators typically create 4-8 second clips. For longer videos, you'll need to generate multiple clips and edit them together, or use AI avatar tools like Synthesia for presentation-style videos."
      },
      {
        question: "Are AI-generated videos copyright-free?",
        answer: "Most paid AI video tools grant commercial rights to generated content. However, always review the specific platform's terms. Content generated on free tiers may have restrictions."
      },
      {
        question: "What's the best AI video generator?",
        answer: "Runway ML offers the most advanced generation capabilities, Pika provides the best ease of use, and Synthesia excels for AI avatar presentations. Choose based on your specific video creation needs."
      }
    ],
    conclusion: "AI video generators democratize video creation, enabling anyone to produce professional content without expensive equipment or technical skills. As the technology rapidly evolves, these tools are becoming essential for marketers, educators, and content creators.",
    isFree: false,
    difficulty: "intermediate",
    estimatedReadTime: 8,
    lastUpdated: "2026-01-21"
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

  // Handle 204 No Content responses
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return { success: true };
  }

  return response.json();
}

async function main() {
  console.log('🚀 Adding initial AI tools to Strapi...\n');

  const results = [];

  for (const tool of initialTools) {
    try {
      console.log(`📝 Importing: ${tool.title}`);
      const result = await importTool(tool);
      results.push({
        slug: tool.slug,
        status: 'success',
        documentId: result.data?.documentId
      });
      console.log(`   ✅ Success: ${tool.slug}\n`);

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
      results.push({
        slug: tool.slug,
        status: 'error',
        error: error.message
      });
    }
  }

  // Save results log
  const logPath = path.join(__dirname, '../data/initial-tools-log.json');
  fs.writeFileSync(logPath, JSON.stringify(results, null, 2));

  console.log('📊 Summary:');
  console.log(`   ✅ Successful: ${results.filter(r => r.status === 'success').length}`);
  console.log(`   ❌ Failed: ${results.filter(r => r.status === 'error').length}`);
  console.log(`   📄 Log saved to: ${logPath}`);
}

main().catch(console.error);
