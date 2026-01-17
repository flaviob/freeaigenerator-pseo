import fs from 'fs/promises';
import path from 'path';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_API_TOKEN) {
  console.error('Error: STRAPI_API_TOKEN environment variable is required');
  process.exit(1);
}

// Import single article to Strapi
async function importArticle(article, contentType) {
  const url = `${STRAPI_URL}/api/${contentType}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      },
      body: JSON.stringify({ data: article })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to import: ${error}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(`Error importing article "${article.title}":`, error.message);
    return null;
  }
}

// Batch import with rate limiting
async function batchImport(articles, contentType, batchSize = 10, delayMs = 1000) {
  console.log(`Importing ${articles.length} articles to ${contentType}...`);
  
  const results = {
    success: 0,
    failed: 0,
    errors: []
  };

  for (let i = 0; i < articles.length; i += batchSize) {
    const batch = articles.slice(i, i + batchSize);
    const batchNumber = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(articles.length / batchSize);

    console.log(`Processing batch ${batchNumber}/${totalBatches}...`);

    const promises = batch.map(article => importArticle(article, contentType));
    const batchResults = await Promise.all(promises);

    batchResults.forEach((result, index) => {
      if (result) {
        results.success++;
        console.log(`  ✓ Imported: ${batch[index].title}`);
      } else {
        results.failed++;
        results.errors.push(batch[index].title);
        console.log(`  ✗ Failed: ${batch[index].title}`);
      }
    });

    // Rate limiting between batches
    if (i + batchSize < articles.length) {
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }

  return results;
}

// Import all generated content
async function importAllContent() {
  console.log('Starting bulk import to Strapi...\n');

  const startTime = Date.now();

  try {
    // Load generated content
    const toolPages = JSON.parse(
      await fs.readFile('./output/tool-pages.json', 'utf-8')
    );
    const comparisonPages = JSON.parse(
      await fs.readFile('./output/comparison-pages.json', 'utf-8')
    );
    const categoryPages = JSON.parse(
      await fs.readFile('./output/category-pages.json', 'utf-8')
    );

    console.log(`Loaded content:
    - Tool Pages: ${toolPages.length}
    - Comparison Pages: ${comparisonPages.length}
    - Category Pages: ${categoryPages.length}
    - Total: ${toolPages.length + comparisonPages.length + categoryPages.length}\n`);

    // Import each content type
    const toolResults = await batchImport(toolPages, 'tool-pages');
    const comparisonResults = await batchImport(comparisonPages, 'comparison-pages');
    const categoryResults = await batchImport(categoryPages, 'category-pages');

    // Summary
    const totalSuccess = toolResults.success + comparisonResults.success + categoryResults.success;
    const totalFailed = toolResults.failed + comparisonResults.failed + categoryResults.failed;
    const duration = ((Date.now() - startTime) / 1000 / 60).toFixed(2);

    console.log(`\n${'='.repeat(50)}`);
    console.log('IMPORT COMPLETE');
    console.log('='.repeat(50));
    console.log(`✅ Successfully imported: ${totalSuccess} articles`);
    console.log(`❌ Failed: ${totalFailed} articles`);
    console.log(`⏱️  Duration: ${duration} minutes`);

    if (totalFailed > 0) {
      console.log('\nFailed articles:');
      [...toolResults.errors, ...comparisonResults.errors, ...categoryResults.errors]
        .forEach(title => console.log(`  - ${title}`));
    }

    console.log(`\n🚀 Your content is now live at: ${STRAPI_URL}`);

  } catch (error) {
    console.error('Import failed:', error);
    process.exit(1);
  }
}

// Check Strapi connection
async function checkConnection() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/tool-pages?pagination[limit]=1`, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`Connection failed: ${response.statusText}`);
    }

    console.log('✅ Connected to Strapi successfully\n');
    return true;
  } catch (error) {
    console.error('❌ Cannot connect to Strapi:', error.message);
    console.error('\nMake sure:');
    console.error('1. Strapi is running');
    console.error('2. STRAPI_URL is correct');
    console.error('3. STRAPI_API_TOKEN is valid');
    return false;
  }
}

// Main execution
async function main() {
  console.log('Strapi Bulk Import Tool');
  console.log('='.repeat(50) + '\n');

  // Check connection first
  const connected = await checkConnection();
  if (!connected) {
    process.exit(1);
  }

  // Start import
  await importAllContent();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { importArticle, batchImport, importAllContent };
