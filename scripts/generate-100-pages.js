#!/usr/bin/env node
/**
 * Generate 100 top AI generator tool pages
 * Focus on high-volume, commercially viable AI generator keywords
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRAPI_URL = 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_API_TOKEN = '8d9fa930b45fcfd8a4981ead1a503eb875a26001729d1ada9af94e0d511675e8066090a8a584b199416110cc6c52defd4918c968bebf795fb476d6ec17afec990f6ddb4a33e7b2eda80422cb8bd53112dd4721d2bd4b65e8b12bafc1964e3f97965b8af6e58517e9178e1aeaebf9fa7bd525edb121135e4cbd07899bfaa09fe9';

// Top 100 AI generator keywords organized by category
const toolTemplates = [
  // Image Generators (30 keywords)
  { keyword: "ai art generator", category: "image", volume: "high" },
  { keyword: "ai portrait generator", category: "image", volume: "high" },
  { keyword: "ai anime generator", category: "image", volume: "high" },
  { keyword: "ai photo generator", category: "image", volume: "high" },
  { keyword: "ai drawing generator", category: "image", volume: "medium" },
  { keyword: "ai character generator", category: "character", volume: "high" },
  { keyword: "ai headshot generator", category: "image", volume: "medium" },
  { keyword: "ai avatar generator", category: "image", volume: "medium" },
  { keyword: "ai background generator", category: "image", volume: "medium" },
  { keyword: "ai tattoo generator", category: "image", volume: "medium" },
  { keyword: "ai sticker generator", category: "design", volume: "medium" },
  { keyword: "ai product photo generator", category: "image", volume: "medium" },
  { keyword: "ai thumbnail generator", category: "design", volume: "medium" },
  { keyword: "ai profile picture generator", category: "image", volume: "medium" },
  { keyword: "ai realistic image generator", category: "image", volume: "medium" },
  { keyword: "ai fantasy art generator", category: "image", volume: "medium" },
  { keyword: "ai illustration generator", category: "design", volume: "medium" },
  { keyword: "ai poster generator", category: "design", volume: "medium" },
  { keyword: "ai wallpaper generator", category: "design", volume: "medium" },
  { keyword: "ai meme generator", category: "image", volume: "medium" },

  // Logo & Design (15 keywords)
  { keyword: "ai graphic design generator", category: "design", volume: "medium" },
  { keyword: "ai banner generator", category: "design", volume: "medium" },
  { keyword: "ai infographic generator", category: "design", volume: "medium" },
  { keyword: "ai icon generator", category: "design", volume: "medium" },
  { keyword: "ai business card generator", category: "design", volume: "medium" },
  { keyword: "ai flyer generator", category: "design", volume: "medium" },
  { keyword: "ai brand name generator", category: "text", volume: "medium" },
  { keyword: "ai color palette generator", category: "design", volume: "medium" },
  { keyword: "ai pattern generator", category: "design", volume: "low" },
  { keyword: "ai mockup generator", category: "design", volume: "low" },
  { keyword: "ai font generator", category: "design", volume: "low" },
  { keyword: "ai presentation generator", category: "design", volume: "medium" },
  { keyword: "ai slide deck generator", category: "design", volume: "low" },
  { keyword: "ai diagram generator", category: "design", volume: "low" },
  { keyword: "ai chart generator", category: "design", volume: "low" },

  // Video Generators (12 keywords)
  { keyword: "ai avatar video generator", category: "video", volume: "medium" },
  { keyword: "ai animation generator", category: "video", volume: "medium" },
  { keyword: "ai video editor", category: "video", volume: "high" },
  { keyword: "ai short video generator", category: "video", volume: "medium" },
  { keyword: "ai youtube video generator", category: "video", volume: "medium" },
  { keyword: "ai reel generator", category: "video", volume: "medium" },
  { keyword: "ai tiktok video generator", category: "video", volume: "medium" },
  { keyword: "ai talking head generator", category: "video", volume: "low" },
  { keyword: "ai explainer video generator", category: "video", volume: "low" },
  { keyword: "ai video script generator", category: "text", volume: "medium" },
  { keyword: "ai video thumbnail generator", category: "design", volume: "low" },
  { keyword: "ai video subtitle generator", category: "video", volume: "medium" },

  // Text Generators (18 keywords)
  { keyword: "ai content generator", category: "text", volume: "high" },
  { keyword: "ai blog generator", category: "text", volume: "high" },
  { keyword: "ai article generator", category: "text", volume: "high" },
  { keyword: "ai copywriting generator", category: "text", volume: "medium" },
  { keyword: "ai essay generator", category: "text", volume: "high" },
  { keyword: "ai story generator", category: "text", volume: "high" },
  { keyword: "ai paragraph generator", category: "text", volume: "medium" },
  { keyword: "ai email generator", category: "text", volume: "medium" },
  { keyword: "ai caption generator", category: "text", volume: "medium" },
  { keyword: "ai description generator", category: "text", volume: "medium" },
  { keyword: "ai product description generator", category: "text", volume: "medium" },
  { keyword: "ai seo content generator", category: "text", volume: "medium" },
  { keyword: "ai social media post generator", category: "text", volume: "medium" },
  { keyword: "ai headline generator", category: "text", volume: "medium" },
  { keyword: "ai summary generator", category: "text", volume: "medium" },
  { keyword: "ai poem generator", category: "text", volume: "medium" },
  { keyword: "ai lyrics generator", category: "text", volume: "medium" },
  { keyword: "ai slogan generator", category: "text", volume: "medium" },

  // Audio & Voice (10 keywords)
  { keyword: "ai voice generator", category: "audio", volume: "high" },
  { keyword: "ai music generator", category: "audio", volume: "high" },
  { keyword: "ai song generator", category: "audio", volume: "high" },
  { keyword: "ai text to speech generator", category: "audio", volume: "high" },
  { keyword: "ai voice changer", category: "audio", volume: "high" },
  { keyword: "ai voice cloning generator", category: "audio", volume: "medium" },
  { keyword: "ai podcast generator", category: "audio", volume: "medium" },
  { keyword: "ai sound effect generator", category: "audio", volume: "low" },
  { keyword: "ai beat generator", category: "audio", volume: "medium" },
  { keyword: "ai rap generator", category: "audio", volume: "medium" },

  // Character & Name Generators (10 keywords)
  { keyword: "ai name generator", category: "character", volume: "high" },
  { keyword: "ai username generator", category: "character", volume: "medium" },
  { keyword: "ai business name generator", category: "text", volume: "high" },
  { keyword: "ai domain name generator", category: "text", volume: "medium" },
  { keyword: "ai fantasy name generator", category: "character", volume: "medium" },
  { keyword: "ai dnd character generator", category: "character", volume: "medium" },
  { keyword: "ai oc generator", category: "character", volume: "low" },
  { keyword: "ai backstory generator", category: "character", volume: "low" },
  { keyword: "ai character design generator", category: "character", volume: "low" },
  { keyword: "ai npc generator", category: "character", volume: "low" },

  // Miscellaneous High-Value (5 keywords)
  { keyword: "ai qr code generator", category: "other", volume: "medium" },
  { keyword: "ai resume generator", category: "text", volume: "high" },
  { keyword: "ai cv generator", category: "text", volume: "medium" },
  { keyword: "ai code generator", category: "text", volume: "high" },
  { keyword: "ai website generator", category: "design", volume: "high" },
];

function generateToolContent(keyword, category) {
  const titleCase = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const slug = keyword.replace(/ /g, '-');

  // Extract the main type (e.g., "art" from "ai art generator")
  const type = keyword.replace('ai ', '').replace(' generator', '').replace(' changer', '').replace(' editor', '');
  const typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);

  return {
    title: `${titleCase}: Create ${typeCapitalized} with AI (2026)`,
    slug: slug,
    category: category,
    primaryKeyword: keyword,
    secondaryKeywords: [
      `${type} generator ai`,
      `ai ${type} maker`,
      `${type} ai generator`,
      `free ${keyword}`
    ],
    metaTitle: `${titleCase} - Best AI Tools (2026)`,
    metaDescription: `Create ${type} with AI. Best free & paid ${category} generators for ${type} in 2026. Fast, easy, professional results.`,
    introduction: `${typeCapitalized} generation has been transformed by artificial intelligence, making it possible for anyone to create professional-quality ${type} without specialized skills. AI ${type} generators use advanced machine learning models to understand your requirements and produce high-quality results in seconds.`,
    whatIsIt: `## What is an ${titleCase}?\n\nAn AI ${type} generator is a tool that uses artificial intelligence to automatically create ${type} based on your input. These generators leverage deep learning models trained on vast datasets to understand patterns, styles, and requirements, enabling them to produce original ${type} that match your specifications.\n\nWhether you're a professional ${category === 'design' ? 'designer' : category === 'text' ? 'writer' : category === 'video' ? 'video creator' : category === 'audio' ? 'musician' : 'creator'}, marketer, or hobbyist, AI ${type} generators democratize the creation process by eliminating technical barriers and dramatically reducing production time.`,
    howItWorks: `## How AI ${typeCapitalized} Generators Work\n\nAI ${type} generators employ sophisticated machine learning techniques:\n\n**Input Processing**: The AI analyzes your ${category === 'text' ? 'prompt, keywords, or requirements' : category === 'image' || category === 'design' ? 'text description or visual references' : category === 'video' ? 'script, style preferences, or source footage' : 'input parameters and style preferences'} to understand what you want to create.\n\n**AI Model Processing**: Advanced ${category === 'image' || category === 'design' ? 'diffusion models or GANs' : category === 'text' ? 'large language models (LLMs)' : category === 'video' ? 'video generation models' : 'generative models'} process your request, drawing from their training on millions of examples.\n\n**Generation & Refinement**: The AI creates ${type} based on learned patterns, applying ${category === 'image' ? 'artistic techniques' : category === 'text' ? 'natural language understanding' : category === 'video' ? 'motion and timing' : category === 'audio' ? 'audio synthesis' : 'generative techniques'} to produce high-quality output.\n\n**Iteration**: Most tools allow you to refine results through additional prompts or parameter adjustments, giving you control over the final output.`,
    features: [
      `${category === 'text' ? 'Multiple content styles and tones' : category === 'image' || category === 'design' ? 'Various artistic styles and formats' : category === 'video' ? 'Multiple video formats and styles' : 'Customizable output options'}`,
      `${category === 'text' ? 'SEO optimization capabilities' : 'High-quality output'}`,
      `Fast generation (seconds to minutes)`,
      `${category === 'image' || category === 'design' ? 'Resolution customization' : category === 'text' ? 'Length and tone control' : 'Format flexibility'}`,
      `Iteration and refinement tools`,
      `${category === 'text' ? 'Plagiarism-free content' : 'Original, unique results'}`
    ],
    topTools: generateTopTools(type, category),
    useCases: `## Real-World Use Cases\n\n**${category === 'text' ? 'Content Marketing' : category === 'image' || category === 'design' ? 'Marketing & Advertising' : category === 'video' ? 'Video Marketing' : 'Creative Projects'}**: ${category === 'text' ? `Generate blog posts, articles, and marketing copy at scale` : category === 'image' || category === 'design' ? `Create unique visuals for campaigns and promotional materials` : category === 'video' ? `Produce engaging video content for social media and ads` : `Create audio content for various media`}\n\n**${category === 'design' ? 'Business Branding' : category === 'text' ? 'Business Communications' : 'Social Media Content'}**: ${category === 'design' ? `Develop consistent brand assets and marketing materials` : category === 'text' ? `Draft emails, reports, and professional documents` : `Generate engaging content for platforms like Instagram, TikTok, and YouTube`}\n\n**${category === 'text' ? 'Education & Learning' : category === 'video' ? 'Training & Education' : 'Creative Expression'}**: ${category === 'text' ? `Create study materials, summaries, and educational content` : category === 'video' ? `Produce training videos and educational content` : `Explore creative ideas and artistic concepts`}\n\n**${category === 'image' || category === 'design' ? 'E-commerce' : category === 'text' ? 'SEO & Content Strategy' : 'Professional Production'}**: ${category === 'image' || category === 'design' ? `Generate product images and marketing visuals` : category === 'text' ? `Create optimized content for search engines` : `Produce professional-quality output without expensive equipment`}`,
    prosAndCons: {
      pros: [
        `Create ${type} in seconds instead of hours`,
        `${category === 'text' ? 'No writing expertise required' : category === 'image' || category === 'design' ? 'No design skills needed' : category === 'video' ? 'No video editing experience necessary' : 'No technical skills required'}`,
        `Cost-effective compared to hiring ${category === 'text' ? 'writers' : category === 'image' || category === 'design' ? 'designers' : category === 'video' ? 'videographers' : 'professionals'}`,
        `Unlimited creative possibilities`,
        `Rapidly iterate and experiment with ideas`,
        `Consistent quality output`
      ],
      cons: [
        `Learning curve for effective ${category === 'text' ? 'prompting' : 'input'}`,
        `${category === 'image' || category === 'design' ? 'May require multiple attempts for perfect results' : 'Results may need human editing'}`,
        `Premium features often require paid subscriptions`,
        `${category === 'text' ? 'May lack human nuance and emotion' : category === 'video' ? 'Generated clips are typically short' : 'Limitations in very specific or complex requests'}`,
        `${category === 'image' ? 'Ethical considerations around AI-generated art' : 'Quality varies between tools'}`
      ]
    },
    faq: generateFAQ(keyword, type, category),
    conclusion: `AI ${type} generators represent a significant advancement in ${category === 'text' ? 'content creation' : category === 'image' || category === 'design' ? 'creative design' : category === 'video' ? 'video production' : 'digital creation'}. These tools democratize ${type} creation, making professional-quality output accessible to everyone regardless of technical expertise. As AI technology continues to evolve, ${type} generators will become even more powerful, offering greater control, better quality, and more creative possibilities.`,
    isFree: false,
    difficulty: "beginner",
    estimatedReadTime: Math.floor(Math.random() * 3) + 6, // 6-8 minutes
    lastUpdated: "2026-01-21"
  };
}

function generateTopTools(type, category) {
  // Category-specific tool recommendations
  const tools = {
    image: [
      {
        name: "DALL-E 3",
        description: `OpenAI's leading image generator with exceptional prompt understanding and photorealistic ${type} generation.`,
        features: ["Best prompt following", "Photorealistic output", "ChatGPT integration", "High resolution"],
        pricing: "$20/month (ChatGPT Plus)",
        bestFor: "Users wanting highest quality and accuracy"
      },
      {
        name: "Midjourney",
        description: `Top artistic image generator known for stunning, stylized ${type} creation.`,
        features: ["Artistic quality", "Active community", "Regular updates", "Version 6 model"],
        pricing: "From $10/month",
        bestFor: "Artists and creatives seeking unique styles"
      },
      {
        name: "Leonardo.ai",
        description: `Versatile AI generator with fine-tuned models and generous free tier for ${type} creation.`,
        features: ["150 daily credits", "Multiple models", "Canvas editor", "High quality"],
        pricing: "Free tier available",
        bestFor: "High-quality free generation"
      }
    ],
    video: [
      {
        name: "Runway ML",
        description: `Leading AI video platform with Gen-2 model for professional ${type} generation.`,
        features: ["Gen-2 model", "Text-to-video", "Image-to-video", "Professional editing"],
        pricing: "Free tier + from $12/month",
        bestFor: "Professional video creators"
      },
      {
        name: "Pika",
        description: `User-friendly AI video generator with consistent quality for ${type} creation.`,
        features: ["Easy interface", "Consistent results", "Camera controls", "Multiple styles"],
        pricing: "Free tier available",
        bestFor: "Beginners and content creators"
      },
      {
        name: "Synthesia",
        description: `AI avatar video platform for creating professional ${type} presentations.`,
        features: ["140+ avatars", "120+ languages", "Professional templates", "Custom avatars"],
        pricing: "From $30/month",
        bestFor: "Corporate and educational content"
      }
    ],
    text: [
      {
        name: "ChatGPT",
        description: `OpenAI's powerful language model for versatile ${type} generation.`,
        features: ["Natural conversation", "Multiple formats", "Web browsing", "GPT-4 access"],
        pricing: "Free + $20/month (Plus)",
        bestFor: "Versatile text generation"
      },
      {
        name: "Claude",
        description: `Anthropic's AI with strong analytical capabilities for ${type} creation.`,
        features: ["Long context", "Accurate output", "Ethical AI", "Citation support"],
        pricing: "Free + $20/month (Pro)",
        bestFor: "Long-form and analytical content"
      },
      {
        name: "Jasper AI",
        description: `Marketing-focused AI writer optimized for ${type} creation.`,
        features: ["Marketing templates", "Brand voice", "SEO tools", "Team collaboration"],
        pricing: "From $49/month",
        bestFor: "Marketing and business content"
      }
    ],
    audio: [
      {
        name: "ElevenLabs",
        description: `Leading AI voice generator for realistic ${type} synthesis.`,
        features: ["Natural voices", "Voice cloning", "29 languages", "High quality"],
        pricing: "Free tier + from $5/month",
        bestFor: "Realistic voice generation"
      },
      {
        name: "Murf AI",
        description: `Professional AI voice platform for ${type} creation.`,
        features: ["120+ voices", "Voice editing", "Multiple formats", "Commercial use"],
        pricing: "From $19/month",
        bestFor: "Professional voiceovers"
      },
      {
        name: "Suno",
        description: `AI music generator for complete ${type} creation from text.`,
        features: ["Full songs", "Multiple genres", "Lyrics generation", "Commercial use"],
        pricing: "Free tier + from $10/month",
        bestFor: "Music and song creation"
      }
    ],
    design: [
      {
        name: "Canva AI",
        description: `All-in-one design platform with AI-powered ${type} generation.`,
        features: ["Magic Design", "Templates", "Brand kit", "Easy interface"],
        pricing: "Free + from $15/month",
        bestFor: "General design and marketing materials"
      },
      {
        name: "Looka",
        description: `AI-powered design tool specializing in ${type} creation.`,
        features: ["Quick generation", "Multiple options", "Brand kits", "High resolution"],
        pricing: "From $20 one-time",
        bestFor: "Fast, professional design creation"
      },
      {
        name: "Adobe Firefly",
        description: `Adobe's AI design tool integrated with Creative Cloud for ${type}.`,
        features: ["Creative Cloud integration", "Commercial safe", "Multiple tools", "High quality"],
        pricing: "From $4.99/month",
        bestFor: "Professional designers"
      }
    ],
    character: [
      {
        name: "Character.AI",
        description: `Interactive AI for ${type} development and conversation.`,
        features: ["Character creation", "Interactive chat", "Personality design", "Free to use"],
        pricing: "Free",
        bestFor: "Interactive character development"
      },
      {
        name: "Artbreeder",
        description: `Collaborative AI for visual ${type} creation.`,
        features: ["Character portraits", "Blending", "Community", "High customization"],
        pricing: "Free + from $8.99/month",
        bestFor: "Visual character design"
      },
      {
        name: "ChatGPT",
        description: `Versatile AI for ${type} backstories and details.`,
        features: ["Detailed narratives", "Multiple aspects", "Interactive", "Context aware"],
        pricing: "Free + $20/month (Plus)",
        bestFor: "Character narratives and details"
      }
    ],
    other: [
      {
        name: "Various AI Tools",
        description: `Multiple specialized tools available for ${type} generation.`,
        features: ["Specialized features", "Various pricing", "Different approaches", "Multiple options"],
        pricing: "Varies",
        bestFor: "Specific use cases"
      }
    ]
  };

  return tools[category] || tools.other;
}

function generateFAQ(keyword, type, category) {
  const faqs = [
    {
      question: `What is the best ${keyword}?`,
      answer: `The best ${keyword} depends on your needs. For ${category === 'image' || category === 'design' ? 'highest quality, DALL-E 3 leads, while Midjourney excels at artistic styles' : category === 'text' ? 'versatile writing, ChatGPT and Claude are top choices' : category === 'video' ? 'professional work, Runway ML offers the most features, while Pika is best for beginners' : 'most applications, specialized tools like ElevenLabs (voice) or industry-specific platforms work best'}. Consider your budget, skill level, and specific requirements.`
    },
    {
      question: `Are ${keyword}s free?`,
      answer: `Many AI ${type} generators offer free tiers with limitations. ${category === 'image' ? 'Leonardo.ai offers 150 daily credits free, while Craiyon provides unlimited generations' : category === 'text' ? 'ChatGPT and Claude have free versions with good capabilities' : category === 'video' ? 'Runway ML and Pika offer free trials with limited credits' : 'Several tools offer free tiers with usage limits'}. Paid plans typically provide better quality, more features, and higher usage limits.`
    },
    {
      question: `Can I use AI-generated ${type} commercially?`,
      answer: `Commercial use rights vary by tool. ${category === 'image' ? 'DALL-E 3 and Midjourney allow commercial use with paid plans' : category === 'text' ? 'Most AI writing tools allow commercial use of generated content' : category === 'video' ? 'Professional tools like Synthesia include commercial rights' : 'Most paid plans include commercial use rights'}. Always check the specific terms of service for your chosen tool.`
    },
    {
      question: `How do I create good ${type} with AI?`,
      answer: `${category === 'text' ? 'Be specific about tone, style, and audience. Provide clear context and examples of what you want' : category === 'image' || category === 'design' ? 'Write detailed prompts describing subject, style, lighting, and composition. Include artistic references and use descriptive adjectives' : category === 'video' ? 'Start with a clear script or concept. Use specific style references and be patient with iterating' : 'Provide clear, detailed inputs and be prepared to iterate. Study examples and refine your approach'}. Most tools improve with practice as you learn effective ${category === 'text' ? 'prompting' : 'input'} techniques.`
    },
    {
      question: `What are the limitations of AI ${type} generators?`,
      answer: `Current limitations include ${category === 'text' ? 'occasional factual errors, lack of true understanding, and potential for generic output' : category === 'image' || category === 'design' ? 'difficulty with specific details like hands or text, inconsistency in styles, and ethical concerns' : category === 'video' ? 'short clip lengths (typically 4-8 seconds), inconsistencies between clips, and uncanny valley effects' : 'quality variations, usage costs, and specific detail control'}. However, the technology improves rapidly with new model releases.`
    }
  ];

  return faqs;
}

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
  console.log('🚀 Generating 100 AI tool pages...\n');
  console.log(`Total keywords to process: ${toolTemplates.length}\n`);

  const results = [];
  let successCount = 0;
  let errorCount = 0;

  for (const template of toolTemplates) {
    try {
      const toolData = generateToolContent(template.keyword, template.category);
      console.log(`📝 [${successCount + errorCount + 1}/${toolTemplates.length}] Importing: ${toolData.title}`);

      const result = await importTool(toolData);
      results.push({
        slug: toolData.slug,
        keyword: template.keyword,
        category: template.category,
        status: 'success',
        documentId: result.data?.documentId
      });
      successCount++;
      console.log(`   ✅ Success: ${toolData.slug}\n`);

      // Rate limiting - wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}\n`);
      errorCount++;
      results.push({
        slug: template.keyword.replace(/ /g, '-'),
        keyword: template.keyword,
        category: template.category,
        status: 'error',
        error: error.message
      });

      // Continue on error instead of stopping
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Save detailed results log
  const logPath = path.join(__dirname, '../data/100-pages-log.json');
  fs.writeFileSync(logPath, JSON.stringify(results, null, 2));

  console.log('\n' + '='.repeat(50));
  console.log('📊 FINAL SUMMARY:');
  console.log('='.repeat(50));
  console.log(`   ✅ Successful imports: ${successCount}`);
  console.log(`   ❌ Failed imports: ${errorCount}`);
  console.log(`   📄 Log saved to: ${logPath}`);
  console.log('='.repeat(50) + '\n');

  // Breakdown by category
  const categoryBreakdown = results.reduce((acc, r) => {
    if (r.status === 'success') {
      acc[r.category] = (acc[r.category] || 0) + 1;
    }
    return acc;
  }, {});

  console.log('📈 Success breakdown by category:');
  Object.entries(categoryBreakdown).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} pages`);
  });
}

main().catch(console.error);
