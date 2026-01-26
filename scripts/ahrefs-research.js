import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load API key from .env.ahrefs
const envPath = path.join(__dirname, '.env.ahrefs');
const envContent = fs.readFileSync(envPath, 'utf8');
const AHREFS_API_KEY = envContent.match(/AHREFS_API_KEY=(.+)/)[1];

const AHREFS_API_BASE = 'https://api.ahrefs.com/v3';

// Ahrefs API client
async function ahrefsRequest(endpoint, params = {}) {
  const url = new URL(`${AHREFS_API_BASE}${endpoint}`);

  // Add API token
  params.token = AHREFS_API_KEY;

  // Add params to URL
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });

  console.log(`Fetching: ${endpoint}...`);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Ahrefs API error (${response.status}): ${error}`);
  }

  return response.json();
}

// Get keyword metrics
async function getKeywordMetrics(keywords, country = 'us') {
  const results = [];

  for (const keyword of keywords) {
    try {
      const data = await ahrefsRequest('/keywords-explorer/v3/overview', {
        select: 'keyword,volume,difficulty,cpc,clicks,parent_topic',
        keyword: keyword,
        country: country,
      });

      if (data.keywords && data.keywords.length > 0) {
        results.push(data.keywords[0]);
        console.log(`✓ ${keyword}: Volume=${data.keywords[0].volume}, Difficulty=${data.keywords[0].difficulty}`);
      }

      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`✗ Error fetching ${keyword}:`, error.message);
      results.push({
        keyword: keyword,
        error: error.message,
      });
    }
  }

  return results;
}

// Get related keywords
async function getRelatedKeywords(keyword, country = 'us', limit = 100) {
  try {
    const data = await ahrefsRequest('/keywords-explorer/v3/related', {
      select: 'keyword,volume,difficulty,cpc,parent_topic',
      keyword: keyword,
      country: country,
      limit: limit,
    });

    return data.keywords || [];
  } catch (error) {
    console.error(`Error fetching related keywords for ${keyword}:`, error.message);
    return [];
  }
}

// Get keyword suggestions (questions, have/be/etc)
async function getKeywordSuggestions(keyword, country = 'us', limit = 50) {
  try {
    const data = await ahrefsRequest('/keywords-explorer/v3/all-keyword-ideas', {
      select: 'keyword,volume,difficulty,cpc',
      keyword: keyword,
      country: country,
      limit: limit,
    });

    return data.keywords || [];
  } catch (error) {
    console.error(`Error fetching keyword suggestions for ${keyword}:`, error.message);
    return [];
  }
}

// Analyze competitor domain
async function analyzeCompetitor(domain) {
  try {
    console.log(`\n📊 Analyzing competitor: ${domain}`);

    // Get domain metrics
    const metrics = await ahrefsRequest('/site-explorer/v1/metrics', {
      select: 'domain_rating,ahrefs_rank,organic_keywords,organic_traffic',
      target: domain,
      mode: 'domain',
    });

    // Get top organic keywords
    const keywords = await ahrefsRequest('/site-explorer/v1/organic-keywords', {
      select: 'keyword,position,volume,traffic,url',
      target: domain,
      mode: 'domain',
      limit: 50,
      order_by: 'traffic:desc',
    });

    return {
      domain: domain,
      metrics: metrics.metrics?.[0] || {},
      topKeywords: keywords.keywords || [],
    };
  } catch (error) {
    console.error(`Error analyzing ${domain}:`, error.message);
    return {
      domain: domain,
      error: error.message,
    };
  }
}

// Main research function
async function runResearch() {
  console.log('🔍 Starting Ahrefs Research\n');
  console.log('='.repeat(60));

  // Base keywords to research
  const baseKeywords = [
    'ai image generator',
    'ai video generator',
    'ai text generator',
    'ai art generator',
    'ai logo generator',
    'free ai image generator',
    'ai generator',
    'ai voice generator',
  ];

  // Competitors to analyze
  const competitors = [
    'midjourney.com',
    'openai.com',
    'canva.com',
  ];

  const research = {
    timestamp: new Date().toISOString(),
    keywords: {},
    competitors: {},
    recommendations: [],
  };

  // 1. Get metrics for base keywords
  console.log('\n📈 PHASE 1: Base Keyword Metrics');
  console.log('='.repeat(60));
  const keywordMetrics = await getKeywordMetrics(baseKeywords);
  research.keywords.base = keywordMetrics;

  // 2. Get related keywords for top term
  console.log('\n🔗 PHASE 2: Related Keywords');
  console.log('='.repeat(60));
  const relatedKeywords = await getRelatedKeywords('ai image generator', 'us', 50);
  research.keywords.related = relatedKeywords;
  console.log(`Found ${relatedKeywords.length} related keywords`);

  // 3. Get keyword suggestions
  console.log('\n💡 PHASE 3: Keyword Suggestions');
  console.log('='.repeat(60));
  const suggestions = await getKeywordSuggestions('ai generator', 'us', 30);
  research.keywords.suggestions = suggestions;
  console.log(`Found ${suggestions.length} keyword suggestions`);

  // 4. Analyze competitors
  console.log('\n🎯 PHASE 4: Competitor Analysis');
  console.log('='.repeat(60));
  for (const competitor of competitors) {
    const analysis = await analyzeCompetitor(competitor);
    research.competitors[competitor] = analysis;

    if (analysis.metrics) {
      console.log(`  Domain Rating: ${analysis.metrics.domain_rating}`);
      console.log(`  Organic Keywords: ${analysis.metrics.organic_keywords}`);
      console.log(`  Organic Traffic: ${analysis.metrics.organic_traffic}`);
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  // 5. Generate recommendations
  console.log('\n📋 PHASE 5: Generating Recommendations');
  console.log('='.repeat(60));

  // Find low-competition keywords
  const lowCompKeywords = keywordMetrics.filter(k => k.difficulty && k.difficulty < 40 && k.volume > 1000);
  if (lowCompKeywords.length > 0) {
    research.recommendations.push({
      type: 'Low Competition Opportunities',
      keywords: lowCompKeywords.map(k => k.keyword),
      reason: 'High volume with manageable difficulty (KD < 40)',
    });
  }

  // Find high-volume opportunities
  const highVolKeywords = relatedKeywords
    .filter(k => k.volume > 5000 && k.difficulty < 50)
    .slice(0, 10);
  if (highVolKeywords.length > 0) {
    research.recommendations.push({
      type: 'High Volume Targets',
      keywords: highVolKeywords.map(k => ({
        keyword: k.keyword,
        volume: k.volume,
        difficulty: k.difficulty,
      })),
      reason: 'High search volume (>5k) with reasonable difficulty',
    });
  }

  // Save results
  const outputPath = path.join(__dirname, '../data/ahrefs-research.json');
  fs.writeFileSync(outputPath, JSON.stringify(research, null, 2));
  console.log(`\n✅ Research saved to: ${outputPath}`);

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESEARCH SUMMARY');
  console.log('='.repeat(60));
  console.log(`Base Keywords Analyzed: ${keywordMetrics.length}`);
  console.log(`Related Keywords Found: ${relatedKeywords.length}`);
  console.log(`Keyword Suggestions: ${suggestions.length}`);
  console.log(`Competitors Analyzed: ${Object.keys(research.competitors).length}`);
  console.log(`Recommendations: ${research.recommendations.length}`);
  console.log('='.repeat(60));

  return research;
}

// Run the research
runResearch()
  .then(() => {
    console.log('\n✅ Research completed successfully!');
  })
  .catch(error => {
    console.error('\n❌ Research failed:', error);
    process.exit(1);
  });
