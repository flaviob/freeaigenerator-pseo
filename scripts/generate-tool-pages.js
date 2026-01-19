#!/usr/bin/env node
/**
 * Generate tool landing pages for "ai X generator" keywords
 * These are primary landing pages explaining what each generator type is
 */

import { keywords } from '../data/keywords.js';

const STRAPI_URL = 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_API_TOKEN = '8d9fa930b45fcfd8a4981ead1a503eb875a26001729d1ada9af94e0d511675e8066090a8a584b199416110cc6c52defd4918c968bebf795fb476d6ec17afec990f6ddb4a33e7b2eda80422cb8bd53112dd4721d2bd4b65e8b12bafc1964e3f97965b8af6e58517e9178e1aeaebf9fa7bd525edb121135e4cbd07899bfaa09fe9';

// Filter keywords for tool landing pages
// Pattern: "ai X generator" but NOT "best", "free", or branded
function getToolPageKeywords() {
  return keywords.filter(kw => {
    const lower = kw.toLowerCase();
    return (
      lower.includes('generator') &&
      !lower.includes('best') &&
      !lower.includes('free') &&
      !lower.includes('bing') &&
      !lower.includes('microsoft') &&
      !lower.includes('google') &&
      !lower.includes('checker') &&
      // Avoid duplicates - prefer "ai X generator" over "X generator ai"
      (lower.startsWith('ai ') || !lower.includes(' ai'))
    );
  });
}

// Map keyword to category
function getCategory(keyword) {
  const kw = keyword.toLowerCase();
  if (kw.includes('image') || kw.includes('picture') || kw.includes('photo') || kw.includes('art') || kw.includes('drawing') || kw.includes('tattoo') || kw.includes('headshot')) return 'image';
  if (kw.includes('video')) return 'video';
  if (kw.includes('text') || kw.includes('paragraph') || kw.includes('sentence') || kw.includes('story') || kw.includes('email') || kw.includes('cover letter')) return 'text';
  if (kw.includes('voice') || kw.includes('music') || kw.includes('song')) return 'audio';
  if (kw.includes('logo') || kw.includes('design')) return 'design';
  if (kw.includes('character') || kw.includes('name')) return 'character';
  return 'other';
}

// Generate content template for a tool page
function generateToolPageContent(keyword) {
  const title = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const category = getCategory(keyword);
  const slug = keyword.toLowerCase().replace(/\s+/g, '-');

  const typeMap = {
    'image': 'image',
    'video': 'video',
    'text': 'text',
    'audio': 'audio',
    'design': 'design',
    'character': 'character and name',
    'other': 'AI'
  };

  const type = typeMap[category];

  return {
    title,
    slug,
    category,
    primaryKeyword: keyword,
    metaTitle: `${title} - AI Tools Guide 2026`,
    metaDescription: `Discover how ${keyword}s work, explore top tools, and learn to create ${type} content with AI. Compare free and paid options.`,
    introduction: `<p>${title}s have transformed how we create ${type} content. Whether you're a professional, hobbyist, or business owner, understanding and using ${keyword} tools can significantly enhance your creative workflow and output quality.</p>`,
    whatIsIt: `<p>An ${keyword} is an AI-powered tool that creates ${type} content from text prompts or other inputs. Using advanced machine learning models, these generators can produce high-quality ${type} content without requiring traditional skills or expensive equipment.</p>\n\n<p>The technology works by training on vast datasets to understand patterns and relationships, then applying this knowledge to generate new, original content based on your specifications.</p>`,
    howItWorks: `<p>${title}s use neural networks and machine learning to create content:</p>\n\n<ol>\n<li>You provide a text prompt or input describing what you want</li>\n<li>The AI processes your input using its trained model</li>\n<li>The generator creates ${type} content matching your description</li>\n<li>You can refine results by adjusting prompts or settings</li>\n</ol>`,
    features: [
      `${type.charAt(0).toUpperCase() + type.slice(1)} generation from text`,
      'Multiple styles and options',
      'High-quality output',
      'Customization controls',
      'Fast generation speed',
      'User-friendly interface'
    ],
    useCases: `<ul>\n<li><strong>Content Creation:</strong> Generate ${type} content for blogs, social media, and marketing</li>\n<li><strong>Professional Work:</strong> Create materials for clients and projects</li>\n<li><strong>Personal Projects:</strong> Explore creativity and bring ideas to life</li>\n<li><strong>Education:</strong> Develop learning materials and visual aids</li>\n<li><strong>Business:</strong> Produce content for presentations and communications</li>\n</ul>`,
    topTools: [
      {
        name: 'Top Tool 1',
        description: `Leading ${keyword} with professional features and quality`,
        features: ['High quality output', 'Easy to use', 'Regular updates', 'Good support']
      },
      {
        name: 'Top Tool 2',
        description: `Popular ${keyword} with great free tier`,
        features: ['Free tier available', 'Fast generation', 'Multiple options', 'Active community']
      },
      {
        name: 'Top Tool 3',
        description: `Powerful ${keyword} for advanced users`,
        features: ['Advanced features', 'Customizable', 'Professional quality', 'API access']
      }
    ],
    prosAndCons: {
      pros: [
        'Create content quickly and easily',
        'No specialized skills required',
        'Cost-effective compared to alternatives',
        'Consistent quality output',
        'Constantly improving technology'
      ],
      cons: [
        'May require prompt engineering practice',
        'Some tools have usage limits',
        'Quality varies between generators',
        'Licensing considerations for commercial use',
        'Learning curve for advanced features'
      ]
    },
    faq: [
      {
        question: `What is the best ${keyword}?`,
        answer: `The best ${keyword} depends on your needs. Professional users often prefer premium tools with advanced features, while hobbyists may find free options sufficient. Consider factors like quality, ease of use, pricing, and features when choosing.`
      },
      {
        question: `Are ${keyword}s free?`,
        answer: `Many ${keyword}s offer free tiers with limitations, while others require paid subscriptions for full access. Some open-source options are completely free to use.`
      },
      {
        question: `Can I use ${keyword} content commercially?`,
        answer: `Commercial use policies vary by tool. Many allow commercial use with paid plans, but always review the specific terms of service before using generated content for business purposes.`
      }
    ],
    conclusion: `<p>${title}s represent a powerful technology for creating ${type} content efficiently. Whether you're a professional or hobbyist, these tools can enhance your creative capabilities and streamline your workflow.</p>\n\n<p>Start by exploring free options to understand the technology, then consider premium tools as your needs grow. With practice and experimentation, you'll discover the full potential of ${keyword}s.</p>`,
    isFree: true,
    difficulty: 'beginner',
    estimatedReadTime: 7,
    lastUpdated: new Date().toISOString().split('T')[0]
  };
}

async function createToolPage(pageData) {
  const response = await fetch(`${STRAPI_URL}/api/tool-pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    },
    body: JSON.stringify({
      data: {
        ...pageData,
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
  const toolKeywords = getToolPageKeywords();

  console.log(`Found ${toolKeywords.length} tool page keywords to generate:\n`);
  toolKeywords.forEach((kw, idx) => console.log(`${idx + 1}. ${kw}`));

  console.log('\n⚠️  This will create pages in Strapi. Continue? (Ctrl+C to cancel)\n');

  // Wait 3 seconds before proceeding
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('Starting generation...\n');

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const keyword of toolKeywords) {
    try {
      const pageData = generateToolPageContent(keyword);
      await createToolPage(pageData);
      console.log(`✅ Created: ${pageData.title}`);
      created++;

      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      if (error.message.includes('already exists') || error.message.includes('unique')) {
        console.log(`⏭️  Skipped (exists): ${keyword}`);
        skipped++;
      } else {
        console.error(`❌ Error (${keyword}):`, error.message);
        errors++;
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${toolKeywords.length}`);
}

main().catch(console.error);
