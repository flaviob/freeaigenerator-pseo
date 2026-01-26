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

// Test free queries
async function testAhrefsAPI() {
  console.log('🧪 Testing Ahrefs API with free test queries\n');
  console.log('='.repeat(60));

  // Test 1: Keywords Explorer Overview (free test keyword)
  console.log('\n📊 Test 1: Keywords Explorer Overview');
  console.log('Testing with "ahrefs" keyword (free)...');

  try {
    const url = `${AHREFS_API_BASE}/keywords-explorer/overview?` + new URLSearchParams({
      token: AHREFS_API_KEY,
      country: 'us',
      keywords: 'ahrefs',
      select: 'keyword,volume,traffic_potential,difficulty,cpc,parent_topic',
    });

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && data.keywords) {
      console.log('✅ SUCCESS!');
      console.log('Keyword:', data.keywords[0].keyword);
      console.log('Volume:', data.keywords[0].volume);
      console.log('Difficulty:', data.keywords[0].difficulty);
      console.log('CPC:', data.keywords[0].cpc);
      console.log('Traffic Potential:', data.keywords[0].traffic_potential);
    } else {
      console.log('❌ FAILED');
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }

  // Test 2: Site Explorer (free test domain)
  console.log('\n📊 Test 2: Site Explorer - Domain Rating');
  console.log('Testing with "ahrefs.com" domain (free)...');

  try {
    const url = `${AHREFS_API_BASE}/site-explorer/domain-rating?` + new URLSearchParams({
      token: AHREFS_API_KEY,
      target: 'ahrefs.com',
      select: 'domain_rating,ahrefs_rank,backlinks,referring_domains',
    });

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && data.metrics) {
      console.log('✅ SUCCESS!');
      console.log('Domain Rating:', data.metrics[0].domain_rating);
      console.log('Ahrefs Rank:', data.metrics[0].ahrefs_rank);
      console.log('Backlinks:', data.metrics[0].backlinks);
      console.log('Referring Domains:', data.metrics[0].referring_domains);
    } else {
      console.log('❌ FAILED');
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }

  // Test 3: SERP Overview (free test keyword)
  console.log('\n📊 Test 3: SERP Overview');
  console.log('Testing with "wordcount" keyword (free)...');

  try {
    const url = `${AHREFS_API_BASE}/serp-overview/serp-overview?` + new URLSearchParams({
      token: AHREFS_API_KEY,
      country: 'us',
      keyword: 'wordcount',
      select: 'url,position,url_rating,backlinks,traffic',
      top_positions: '10',
    });

    const response = await fetch(url);
    const data = await response.json();

    if (response.ok && data.serp) {
      console.log('✅ SUCCESS!');
      console.log(`Found ${data.serp.length} SERP results`);
      data.serp.slice(0, 3).forEach((result, i) => {
        console.log(`  ${i + 1}. ${result.url} (Position: ${result.position}, Traffic: ${result.traffic})`);
      });
    } else {
      console.log('❌ FAILED');
      console.log('Response:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ API Testing Complete!');
  console.log('\nNote: Free test queries only work with "ahrefs" or "wordcount" keywords.');
  console.log('To research real keywords like "ai image generator", you\'ll need to consume API units.');
}

testAhrefsAPI();
