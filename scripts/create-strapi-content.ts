#!/usr/bin/env tsx
/**
 * Script to create content directly in Strapi via API
 * Usage: tsx scripts/create-strapi-content.ts
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

interface ToolPageData {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  category: 'image' | 'video' | 'text' | 'audio' | 'design' | 'character' | 'photo' | 'other';
  primaryKeyword: string;
  introduction: string;
  whatIsIt: string;
  howItWorks?: string;
  features?: string[];
  useCases?: string;
  topTools?: Array<{
    name: string;
    description: string;
    features: string[];
  }>;
  prosAndCons?: {
    pros: string[];
    cons: string[];
  };
  faq?: Array<{
    question: string;
    answer: string;
  }>;
  conclusion: string;
  isFree: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedReadTime: number;
  lastUpdated: string;
}

async function createToolPage(data: ToolPageData) {
  if (!STRAPI_API_TOKEN) {
    console.error('❌ Error: STRAPI_API_TOKEN environment variable is required');
    console.log('Please get your API token from Strapi Admin: Settings → API Tokens');
    process.exit(1);
  }

  const response = await fetch(`${STRAPI_URL}/api/tool-pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create content: ${response.status} - ${error}`);
  }

  const result = await response.json();
  return result;
}

// Sample content for AI Image Generator
const aiImageGeneratorData: ToolPageData = {
  title: 'AI Image Generator',
  slug: 'ai-image-generator',
  metaTitle: 'AI Image Generator - Create Stunning Images with AI',
  metaDescription: 'Discover how AI image generators work, explore top tools, and learn to create stunning visuals with artificial intelligence. Free and paid options reviewed.',
  category: 'image',
  primaryKeyword: 'ai image generator',
  introduction: '<p>AI image generators have revolutionized digital content creation, allowing anyone to create stunning visuals from simple text descriptions. Whether you\'re a designer, marketer, or content creator, these tools can help you bring your creative visions to life in seconds.</p>',
  whatIsIt: '<p>An AI image generator is a powerful tool that uses artificial intelligence and machine learning to create images from text descriptions (called prompts). Using advanced models like DALL-E, Midjourney, and Stable Diffusion, these tools can generate artwork, photos, illustrations, and designs in various styles.</p><p>The technology works by training on millions of images to understand the relationship between visual elements and text descriptions, enabling it to create entirely new images that match your specifications.</p>',
  howItWorks: '<p>AI image generators use a process called diffusion or generative adversarial networks (GANs) to create images:</p><ol><li>You enter a text prompt describing what you want to see</li><li>The AI processes your prompt and references its training data</li><li>The model generates an image that matches your description</li><li>You can refine the result by adjusting your prompt or using editing tools</li></ol>',
  features: [
    'Text-to-image generation',
    'Multiple art styles and aesthetics',
    'High-resolution output options',
    'Image editing and refinement tools',
    'Batch generation capabilities',
    'Custom model training'
  ],
  useCases: '<ul><li><strong>Marketing & Advertising:</strong> Create unique visuals for campaigns and social media</li><li><strong>Content Creation:</strong> Generate blog images, thumbnails, and illustrations</li><li><strong>Product Design:</strong> Visualize concepts and prototypes quickly</li><li><strong>Art & Creative Projects:</strong> Explore new artistic styles and inspiration</li><li><strong>Education:</strong> Create custom diagrams and educational materials</li></ul>',
  topTools: [
    {
      name: 'Midjourney',
      description: 'Industry-leading AI image generator known for artistic, high-quality results',
      features: ['Exceptional image quality', 'Active community', 'Regular updates', 'Commercial use allowed']
    },
    {
      name: 'DALL-E 3',
      description: 'OpenAI\'s powerful image generator with excellent prompt understanding',
      features: ['Integrated with ChatGPT', 'Strong text rendering', 'Safe and filtered output', 'Easy to use']
    },
    {
      name: 'Stable Diffusion',
      description: 'Open-source model you can run locally with full control',
      features: ['Free and open-source', 'Run on your own hardware', 'Extensive customization', 'Active development community']
    }
  ],
  prosAndCons: {
    pros: [
      'Create unique images in seconds',
      'No design skills required',
      'Cost-effective compared to hiring designers',
      'Unlimited creative possibilities',
      'Constantly improving quality'
    ],
    cons: [
      'Learning curve for effective prompting',
      'Quality varies based on prompt',
      'Some tools require subscription',
      'Copyright and licensing considerations',
      'May struggle with specific details'
    ]
  },
  faq: [
    {
      question: 'Are AI-generated images free to use commercially?',
      answer: 'It depends on the tool. Services like Midjourney and DALL-E offer commercial licenses with paid plans, while Stable Diffusion is open-source and allows commercial use. Always check the specific terms of service.'
    },
    {
      question: 'How can I improve my AI image generation results?',
      answer: 'Focus on detailed, descriptive prompts. Include information about style, lighting, composition, and mood. Experiment with different phrasings and use example images as references when available.'
    },
    {
      question: 'Can AI image generators replace human designers?',
      answer: 'AI generators are powerful tools but work best as assistants to human creativity. They excel at exploration and iteration but may need human guidance for brand consistency, specific requirements, and final refinement.'
    }
  ],
  conclusion: '<p>AI image generators represent a transformative technology for visual content creation. Whether you\'re exploring creative ideas, producing marketing materials, or developing artwork, these tools offer unprecedented speed and possibilities.</p><p>Start with free trials of tools like DALL-E or Stable Diffusion to understand the technology, then invest in premium options like Midjourney for professional projects. With practice and experimentation, you\'ll unlock amazing creative potential.</p>',
  isFree: true,
  difficulty: 'beginner',
  estimatedReadTime: 8,
  lastUpdated: new Date().toISOString()
};

// Main execution
async function main() {
  try {
    console.log('🚀 Creating AI Image Generator content in Strapi...\n');

    const result = await createToolPage(aiImageGeneratorData);

    console.log('✅ Successfully created content!');
    console.log(`📄 Title: ${result.data.attributes.title}`);
    console.log(`🔗 Slug: ${result.data.attributes.slug}`);
    console.log(`🆔 ID: ${result.data.id}`);
    console.log(`\n🌐 View at: ${STRAPI_URL}/admin/content-manager/collection-types/api::tool-page.tool-page/${result.data.id}`);

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();
