#!/usr/bin/env node
/**
 * Generate category/listicle pages for "best X" and "free X" keywords
 * These are roundup pages comparing multiple tools
 */

import { keywords } from '../data/keywords.js';

const STRAPI_URL = 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_API_TOKEN = '8d9fa930b45fcfd8a4981ead1a503eb875a26001729d1ada9af94e0d511675e8066090a8a584b199416110cc6c52defd4918c968bebf795fb476d6ec17afec990f6ddb4a33e7b2eda80422cb8bd53112dd4721d2bd4b65e8b12bafc1964e3f97965b8af6e58517e9178e1aeaebf9fa7bd525edb121135e4cbd07899bfaa09fe9';

// Filter keywords for category/listicle pages
// Pattern: "best", "free", or both
function getCategoryPageKeywords() {
  return keywords.filter(kw => {
    const lower = kw.toLowerCase();
    return (
      (lower.includes('best') || lower.includes('free')) &&
      lower.includes('generator') &&
      !lower.includes('bing') &&
      !lower.includes('microsoft') &&
      !lower.includes('google')
    );
  });
}

// Map keyword to category
function getCategory(keyword) {
  const kw = keyword.toLowerCase();
  if (kw.includes('image') || kw.includes('picture') || kw.includes('photo') || kw.includes('art')) return 'image';
  if (kw.includes('video')) return 'video';
  if (kw.includes('text')) return 'text';
  if (kw.includes('voice') || kw.includes('music')) return 'audio';
  if (kw.includes('logo')) return 'design';
  if (kw.includes('headshot')) return 'photo';
  return 'other';
}

// Determine list type
function getListType(keyword) {
  const lower = keyword.toLowerCase();
  if (lower.includes('best') && lower.includes('free')) return 'best';
  if (lower.includes('best')) return 'best';
  if (lower.includes('free')) return 'free';
  return 'top';
}

// Generate sample tools list
function generateToolsList(keyword, category, isFree) {
  const tools = [
    {
      name: 'Premium Tool Pro',
      description: `Professional-grade ${keyword} with advanced features and exceptional quality.`,
      pros: ['Highest quality output', 'Professional features', 'Excellent support', 'Regular updates'],
      cons: ['Premium pricing', 'Steeper learning curve', 'Requires subscription'],
      rating: 4.8,
      pricing: 'From $20/month',
      isFree: false,
      category,
      ctaText: 'Try Premium Tool',
      ctaUrl: '#'
    },
    {
      name: 'Free Tool Plus',
      description: `Popular free ${keyword} with generous limits and great community support.`,
      pros: ['Generous free tier', 'Easy to use', 'Active community', 'Good quality'],
      cons: ['Usage limits', 'Watermarks on free tier', 'Slower processing'],
      rating: 4.5,
      pricing: 'Free with limits',
      isFree: true,
      category,
      ctaText: 'Try Free Tool',
      ctaUrl: '#'
    },
    {
      name: 'OpenSource Generator',
      description: `Fully open-source ${keyword} you can run locally with unlimited generation.`,
      pros: ['Completely free', 'No usage limits', 'Highly customizable', 'Privacy-focused'],
      cons: ['Technical setup required', 'Needs powerful hardware', 'Less user-friendly'],
      rating: 4.3,
      pricing: 'Free (open source)',
      isFree: true,
      category,
      ctaText: 'Get OpenSource',
      ctaUrl: '#'
    }
  ];

  // Filter by free if needed
  return isFree ? tools.filter(t => t.isFree) : tools;
}

// Generate category page content
function generateCategoryPageContent(keyword) {
  const title = keyword.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const category = getCategory(keyword);
  const listType = getListType(keyword);
  const isFreeOnly = keyword.toLowerCase().includes('free') && !keyword.toLowerCase().includes('best');
  const slug = keyword.toLowerCase().replace(/\s+/g, '-');

  const toolsList = generateToolsList(keyword, category, isFreeOnly);

  return {
    title: `${title}s in 2026`,
    slug,
    category,
    listType,
    primaryKeyword: keyword,
    metaTitle: `${toolsList.length} ${title}s in 2026 (Tested & Ranked)`,
    metaDescription: `Discover the ${listType} ${keyword}s in 2026. Compare features, pricing, and quality to find the perfect tool for your needs.`,
    introduction: `Finding the right ${keyword} can significantly impact your creative workflow. This comprehensive guide reviews and ranks the ${listType} ${keyword}s available in 2026, helping you make an informed decision.`,
    selectionCriteria: `We evaluated each ${keyword} based on:\n\n- **Quality**: Output quality and consistency\n- **Features**: Available tools and capabilities\n- **Pricing**: Value for money and free tier availability\n- **Ease of Use**: User interface and learning curve\n- **Performance**: Speed and reliability\n- **Support**: Documentation and customer service`,
    toolsList,
    comparisonTable: {
      headers: toolsList.map(t => t.name),
      rows: [
        { feature: 'Free Tier', values: toolsList.map(t => t.isFree ? '✓' : '✗') },
        { feature: 'Quality', values: toolsList.map(t => t.rating >= 4.5 ? 'Excellent' : 'Very Good') },
        { feature: 'Ease of Use', values: toolsList.map((_, idx) => ['Medium', 'Easy', 'Hard'][idx] || 'Medium') },
        { feature: 'Commercial Use', values: toolsList.map(() => '✓') }
      ]
    },
    detailedReviews: toolsList.map((tool, idx) =>
      `## ${idx + 1}. ${tool.name}\n\n${tool.description}\n\n**Rating**: ${tool.rating}/5\n\n**Pricing**: ${tool.pricing}\n\n**Best for**: ${tool.pros[0]}`
    ).join('\n\n'),
    buyingGuide: `## How to Choose the Right ${keyword.charAt(0).toUpperCase() + keyword.slice(1)}\n\n### Consider Your Budget\n${isFreeOnly ? '- All options listed are free to use\n- Check for usage limits and restrictions' : '- Free tiers for testing and learning\n- Paid plans for professional use\n- Open-source options for unlimited use'}\n\n### Evaluate Your Needs\n- Personal projects vs professional work\n- Quality requirements\n- Volume of generation needed\n- Technical expertise level`,
    faq: [
      {
        question: `What is the best ${keyword}?`,
        answer: `The best ${keyword} depends on your specific needs. ${toolsList[0].name} offers the highest quality, while ${toolsList[1].name} provides the best free option.`
      },
      {
        question: isFreeOnly ? `Are these ${keyword}s really free?` : `Which ${keyword}s are free?`,
        answer: isFreeOnly
          ? `Yes, all ${keyword}s listed offer free access, though some may have usage limits or require account creation.`
          : `${toolsList.filter(t => t.isFree).map(t => t.name).join(', ')} offer free tiers. Premium tools typically have trial periods.`
      },
      {
        question: `Can I use ${keyword}s for commercial projects?`,
        answer: `Most ${keyword}s allow commercial use, but terms vary. Always review the specific licensing terms before using generated content commercially.`
      }
    ],
    conclusion: `Choosing the right ${keyword} can transform your creative workflow. ${toolsList[0].name} leads in quality${toolsList[1] ? ', ' + toolsList[1].name + ' offers the best free experience' : ''}${toolsList[2] ? ', and ' + toolsList[2].name + ' provides unlimited flexibility' : ''}.\n\nStart by testing free options to understand your needs, then upgrade to premium tools if necessary. The best tool is the one that fits your specific requirements and workflow.`,
    isFreeOnly,
    year: 2026,
    estimatedReadTime: 10,
    lastUpdated: new Date().toISOString().split('T')[0]
  };
}

async function createCategoryPage(pageData) {
  const response = await fetch(`${STRAPI_URL}/api/category-pages`, {
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
  const categoryKeywords = getCategoryPageKeywords();

  console.log(`Found ${categoryKeywords.length} category page keywords to generate:\n`);
  categoryKeywords.forEach((kw, idx) => console.log(`${idx + 1}. ${kw}`));

  console.log('\n⚠️  This will create pages in Strapi. Continue? (Ctrl+C to cancel)\n');

  // Wait 3 seconds before proceeding
  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('Starting generation...\n');

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const keyword of categoryKeywords) {
    try {
      const pageData = generateCategoryPageContent(keyword);
      await createCategoryPage(pageData);
      console.log(`✅ Created: ${pageData.title}`);
      created++;

      // Small delay to avoid overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      if (error.message && (error.message.includes('already exists') || error.message.includes('unique'))) {
        console.log(`⏭️  Skipped (exists): ${keyword}`);
        skipped++;
      } else {
        console.error(`❌ Error (${keyword}):`, error.message || error);
        if (error.stack) {
          console.error('Stack trace:', error.stack.split('\n').slice(0, 3).join('\n'));
        }
        errors++;
      }
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total: ${categoryKeywords.length}`);
}

main().catch(console.error);
