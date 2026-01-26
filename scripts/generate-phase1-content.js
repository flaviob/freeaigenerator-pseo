import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// OpenAI API configuration (you'll need to add your key)
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'your-openai-key-here';

// Phase 1 target keywords (Quick wins - low KD)
const PHASE_1_KEYWORDS = [
  {
    keyword: 'bing ai image generator',
    category: 'image',
    volume: 39000,
    difficulty: 24,
    type: 'tool-page',
    priority: 1,
  },
  {
    keyword: 'ai text generator',
    category: 'text',
    volume: 62000,
    difficulty: 56,
    type: 'tool-page',
    priority: 2,
  },
  {
    keyword: 'ai logo generator',
    category: 'design',
    volume: 84000,
    difficulty: 64,
    type: 'tool-page',
    priority: 3,
  },
];

// Generate content using OpenAI
async function generateArticle(keyword, category, metadata) {
  const prompt = `Write a comprehensive, SEO-optimized article about "${keyword}".

TARGET AUDIENCE: People looking for AI generators for ${category} creation.
SEARCH INTENT: Informational + navigational (they want to understand and find the best tools)
TONE: Professional but accessible, helpful, unbiased

ARTICLE STRUCTURE (2000-2500 words):

1. INTRODUCTION (200 words)
   - Hook: Start with a compelling stat or problem
   - What the article covers
   - Why it matters
   - Target keyword naturally in first paragraph

2. WHAT IS ${keyword.toUpperCase()}? (300 words)
   - Clear definition
   - How it works (technical but simple)
   - Who uses it and why
   - Key benefits

3. HOW ${keyword.toUpperCase()} WORKS (250 words)
   - Step-by-step explanation
   - Technology behind it (AI models, neural networks)
   - Input/output process
   - Quality factors

4. KEY FEATURES (Bullet list)
   - 7-10 key features
   - Each with brief explanation
   - Focus on user benefits

5. TOP ${keyword.toUpperCase()} TOOLS (400 words)
   List and describe 5 top tools:
   - Tool name
   - Brief description (50-75 words each)
   - Key features (3-4 per tool)
   - Pricing (free/paid)
   - Best for (use case)

6. USE CASES (300 words)
   Describe 5-7 real-world use cases:
   - Marketing & Advertising
   - Content Creation
   - Business Applications
   - Education
   - Personal Projects
   - etc.

7. PROS AND CONS (Lists)
   PROS (5 points):
   - Clear benefits

   CONS (5 points):
   - Honest limitations

8. BEST PRACTICES (200 words)
   - Tips for getting best results
   - Common mistakes to avoid
   - Optimization strategies

9. FAQ (5 questions)
   - Common questions with detailed answers
   - Each answer 50-100 words

10. CONCLUSION (150 words)
    - Summarize key points
    - Call to action
    - Future outlook

IMPORTANT REQUIREMENTS:
- Use the target keyword "${keyword}" naturally 8-12 times
- Use related keywords (semantic variations)
- Write in markdown format
- Be factually accurate
- Include specific tools and technologies
- No fluff - every sentence adds value
- Use transition words for readability
- Include comparison elements
- Be objective and balanced

Return the content in this JSON structure:
{
  "title": "SEO-optimized title (60 chars max, include keyword)",
  "metaDescription": "Compelling meta description (160 chars max, include keyword)",
  "introduction": "Introduction section content (markdown)",
  "whatIsIt": "What is X section content (markdown)",
  "howItWorks": "How it works section content (markdown)",
  "features": ["feature 1", "feature 2", ...],
  "topTools": [
    {
      "name": "Tool name",
      "description": "Tool description",
      "features": ["feature 1", "feature 2", "feature 3"],
      "pricing": "free/paid/freemium",
      "bestFor": "Target use case"
    }
  ],
  "useCases": "Use cases section content (markdown)",
  "prosAndCons": {
    "pros": ["pro 1", "pro 2", ...],
    "cons": ["con 1", "con 2", ...]
  },
  "bestPractices": "Best practices section content (markdown)",
  "faq": [
    {"question": "Q1", "answer": "A1"},
    {"question": "Q2", "answer": "A2"}
  ],
  "conclusion": "Conclusion section content (markdown)"
}`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert SEO content writer specializing in AI technology. You create comprehensive, accurate, and engaging content that ranks well in search engines.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Parse JSON from response (handle markdown code blocks)
    let jsonContent = content;
    if (content.includes('```json')) {
      jsonContent = content.split('```json')[1].split('```')[0].trim();
    } else if (content.includes('```')) {
      jsonContent = content.split('```')[1].split('```')[0].trim();
    }

    return JSON.parse(jsonContent);
  } catch (error) {
    console.error(`Error generating article for "${keyword}":`, error.message);
    return null;
  }
}

// Convert article to Strapi format
function convertToStrapiFormat(article, keyword, category, metadata) {
  return {
    title: article.title,
    slug: keyword.toLowerCase().replace(/\s+/g, '-'),
    metaTitle: article.title,
    metaDescription: article.metaDescription,
    category: category,
    primaryKeyword: keyword,
    secondaryKeywords: [], // Can add later
    introduction: article.introduction,
    whatIsIt: article.whatIsIt,
    howItWorks: article.howItWorks,
    features: article.features,
    useCases: article.useCases,
    topTools: article.topTools,
    prosAndCons: article.prosAndCons,
    faq: article.faq,
    conclusion: article.conclusion,
    isFree: true, // Most AI generators have free tiers
    difficulty: 'beginner',
    estimatedReadTime: 8, // ~2000 words = 8 min read
    lastUpdated: new Date().toISOString().split('T')[0],
  };
}

// Main generation function
async function generatePhase1Content() {
  console.log('🚀 Starting Phase 1 Content Generation\n');
  console.log('='.repeat(60));
  console.log(`Target: ${PHASE_1_KEYWORDS.length} articles`);
  console.log(`Total potential traffic: ${PHASE_1_KEYWORDS.reduce((sum, k) => sum + k.volume, 0).toLocaleString()}/month`);
  console.log('='.repeat(60));

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (const keywordData of PHASE_1_KEYWORDS) {
    console.log(`\n📝 Generating: "${keywordData.keyword}"`);
    console.log(`   Volume: ${keywordData.volume.toLocaleString()}`);
    console.log(`   Difficulty: ${keywordData.difficulty} (KD)`);
    console.log(`   Priority: ${keywordData.priority}`);

    const article = await generateArticle(
      keywordData.keyword,
      keywordData.category,
      keywordData
    );

    if (article) {
      const strapiFormat = convertToStrapiFormat(
        article,
        keywordData.keyword,
        keywordData.category,
        keywordData
      );

      results.push({
        keyword: keywordData.keyword,
        data: strapiFormat,
        metadata: keywordData,
      });

      successCount++;
      console.log(`   ✅ Generated successfully`);
    } else {
      failCount++;
      console.log(`   ❌ Failed to generate`);
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // Save results
  const outputDir = path.join(__dirname, '../data');
  const outputPath = path.join(outputDir, 'phase1-content.json');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log('\n' + '='.repeat(60));
  console.log('📊 GENERATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Success: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📁 Saved to: ${outputPath}`);
  console.log('='.repeat(60));

  return results;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generatePhase1Content()
    .then(() => {
      console.log('\n✅ Phase 1 content generation complete!');
      console.log('Next step: Run import-to-strapi.js to publish content');
    })
    .catch(error => {
      console.error('\n❌ Generation failed:', error);
      process.exit(1);
    });
}

export { generatePhase1Content, generateArticle };
