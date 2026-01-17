import OpenAI from 'openai';
import { keywords, toolCategories, aiTools } from '../data/keywords.js';
import fs from 'fs/promises';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generate SEO-optimized article using GPT-4
async function generateArticle(keyword, category, pageType = 'tool') {
  const prompts = {
    tool: `Write a comprehensive SEO article about "${keyword}". 

Structure:
- Title: Include the exact keyword
- Meta Description (max 160 chars): Compelling description with keyword
- Introduction (150-200 words): What is ${keyword}, why it matters, what readers will learn
- What is ${keyword}? (300 words): Define it, explain the technology, who uses it
- How ${keyword} Works (250 words): Step-by-step process, technical overview (simple language)
- Key Features (bullet points): 5-7 main features
- Use Cases (300 words): Real-world applications, examples, industries
- Top 5 ${keyword} Tools (300 words): Brief overview of popular tools (don't go deep)
- Pros and Cons (bullet points): 5 pros, 5 cons
- FAQ (5 questions with answers): Common questions people ask
- Conclusion (150 words): Summary, recommendation, call to action

Requirements:
- Natural, conversational tone
- Include keyword in H1, first paragraph, and naturally throughout (don't over-optimize)
- Focus on user intent and value
- Be factually accurate about AI technology
- Don't make specific tool recommendations without disclaimers
- Add "as of 2025" where relevant
- NO fluff or filler - every sentence should add value
- Write for humans, not search engines`,

    comparison: `Write a detailed comparison article: "${keyword}"

Structure:
- Title: "${keyword} - Which is Better in 2025?"
- Meta Description (max 160 chars)
- Introduction (150 words): Setup the comparison, why it matters
- Tool 1 Overview (200 words): Features, pricing, target users
- Tool 2 Overview (200 words): Features, pricing, target users
- Feature Comparison (400 words): Side-by-side analysis of key features
- Pricing Comparison (200 words): Value for money analysis
- Pros & Cons for each tool
- Winner/Verdict (200 words): Which one to choose and why
- FAQ (5 questions)
- Conclusion (150 words)

Requirements:
- Be objective and balanced
- Base comparisons on factual differences
- Acknowledge that "best" depends on use case
- Include real feature differences
- Natural keyword usage`,

    category: `Write a comprehensive roundup article: "${keyword}"

Structure:
- Title: "${keyword} - [Number] Best Options in 2025"
- Meta Description (max 160 chars)
- Introduction (200 words): What we're comparing, methodology
- Selection Criteria (150 words): How we chose these tools
- Top [5-10] Tools (each tool gets 150-200 words):
  * Tool name and brief intro
  * Key features
  * Best for
  * Pricing overview
  * Our verdict
- Comparison Table: Quick reference table
- Buying Guide (300 words): How to choose the right tool
- FAQ (5 questions)
- Conclusion (150 words)

Requirements:
- List 5-10 actual AI tools
- Be specific about features
- Include mix of free and paid if relevant
- Natural, helpful tone`
  };

  const prompt = prompts[pageType] || prompts.tool;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an expert SEO content writer specializing in AI tools and technology. Write comprehensive, accurate, helpful content that ranks well while genuinely helping users. Avoid fluff and focus on value.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(`Error generating article for ${keyword}:`, error);
    return null;
  }
}

// Parse AI-generated content into structured format
function parseArticleContent(content, keyword, category) {
  const lines = content.split('\n');
  
  // Extract sections (this is simplified - you'd want more robust parsing)
  const sections = {
    title: keyword,
    slug: keyword.toLowerCase().replace(/\s+/g, '-'),
    metaTitle: `${keyword.charAt(0).toUpperCase() + keyword.slice(1)} - Free AI Tool Guide`,
    metaDescription: `Discover the best ${keyword} tools in 2025. Free options, comparisons, and expert recommendations.`,
    category: category,
    primaryKeyword: keyword,
    introduction: '',
    whatIsIt: '',
    howItWorks: '',
    features: [],
    useCases: '',
    topTools: [],
    prosAndCons: { pros: [], cons: [] },
    faq: [],
    conclusion: '',
    lastUpdated: new Date().toISOString().split('T')[0]
  };

  // Simple content extraction (you'd improve this with better parsing)
  sections.introduction = content.substring(0, 500);
  sections.whatIsIt = content;
  sections.conclusion = content.substring(content.length - 300);

  return sections;
}

// Generate all tool pages
async function generateToolPages() {
  console.log('Generating tool pages...');
  const toolPages = [];

  for (const category of toolCategories) {
    for (const keyword of category.keywords.slice(0, 2)) { // Limit for testing
      console.log(`Generating: ${keyword}`);
      
      const content = await generateArticle(keyword, category.slug, 'tool');
      if (content) {
        const structured = parseArticleContent(content, keyword, category.slug);
        toolPages.push(structured);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return toolPages;
}

// Generate comparison pages
async function generateComparisonPages() {
  console.log('Generating comparison pages...');
  const comparisonPages = [];

  const tools = [
    'Midjourney', 'DALL-E', 'Stable Diffusion', 'Leonardo.AI',
    'Runway', 'Pika', 'ChatGPT', 'Claude', 'ElevenLabs'
  ];

  // Generate tool vs tool comparisons
  for (let i = 0; i < tools.length - 1; i++) {
    for (let j = i + 1; j < Math.min(i + 3, tools.length); j++) {
      const keyword = `${tools[i]} vs ${tools[j]}`;
      console.log(`Generating: ${keyword}`);
      
      const content = await generateArticle(keyword, 'image', 'comparison');
      if (content) {
        const structured = {
          title: keyword,
          slug: keyword.toLowerCase().replace(/\s+/g, '-'),
          metaTitle: `${keyword} - Complete Comparison 2025`,
          metaDescription: `Compare ${tools[i]} vs ${tools[j]}. Features, pricing, and which AI tool is best for you.`,
          tool1Name: tools[i],
          tool2Name: tools[j],
          category: 'image',
          content: content,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
        comparisonPages.push(structured);
      }

      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  return comparisonPages;
}

// Generate category pages (Best of lists)
async function generateCategoryPages() {
  console.log('Generating category pages...');
  const categoryPages = [];

  const listTypes = [
    'Best AI Image Generators',
    'Best Free AI Image Generators',
    'Top AI Video Generators',
    'Best AI Voice Generators',
    'Free AI Logo Generators'
  ];

  for (const listTitle of listTypes) {
    console.log(`Generating: ${listTitle}`);
    
    const content = await generateArticle(listTitle, 'image', 'category');
    if (content) {
      const structured = {
        title: listTitle,
        slug: listTitle.toLowerCase().replace(/\s+/g, '-'),
        metaTitle: `${listTitle} - 2025 Guide`,
        metaDescription: `Discover the ${listTitle.toLowerCase()} in 2025. Expert reviews and recommendations.`,
        category: 'image',
        listType: 'best',
        content: content,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      categoryPages.push(structured);
    }

    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  return categoryPages;
}

// Main execution
async function main() {
  console.log('Starting content generation...');
  console.log('This will take a while - generating 1000+ articles');

  // Create output directory
  await fs.mkdir('./output', { recursive: true });

  // Generate all content types
  const toolPages = await generateToolPages();
  const comparisonPages = await generateComparisonPages();
  const categoryPages = await generateCategoryPages();

  // Save to files
  await fs.writeFile(
    './output/tool-pages.json',
    JSON.stringify(toolPages, null, 2)
  );
  await fs.writeFile(
    './output/comparison-pages.json',
    JSON.stringify(comparisonPages, null, 2)
  );
  await fs.writeFile(
    './output/category-pages.json',
    JSON.stringify(categoryPages, null, 2)
  );

  console.log(`
✅ Content generation complete!
   
   Tool Pages: ${toolPages.length}
   Comparison Pages: ${comparisonPages.length}
   Category Pages: ${categoryPages.length}
   Total: ${toolPages.length + comparisonPages.length + categoryPages.length}

   Files saved in ./output/
  `);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { generateArticle, generateToolPages, generateComparisonPages, generateCategoryPages };
