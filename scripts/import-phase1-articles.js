import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRAPI_URL = 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_TOKEN = '8d9fa930b45fcfd8a4981ead1a503eb875a26001729d1ada9af94e0d511675e8066090a8a584b199416110cc6c52defd4918c968bebf795fb476d6ec17afec990f6ddb4a33e7b2eda80422cb8bd53112dd4721d2bd4b65e8b12bafc1964e3f97965b8af6e58517e9178e1aeaebf9fa7bd525edb121135e4cbd07899bfaa09fe9';

// Import article to Strapi
async function importArticle(articleData) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/tool-pages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
      body: JSON.stringify({ data: articleData }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Main import function
async function importPhase1Articles() {
  console.log('📤 Starting Phase 1 Article Import to Strapi\n');
  console.log('='.repeat(60));

  const articlesDir = path.join(__dirname, '../data/articles');
  const articleFiles = [
    'bing-ai-image-generator.json',
    'ai-text-generator.json',
    'ai-logo-generator.json',
  ];

  let successCount = 0;
  let failCount = 0;
  const results = [];

  for (const filename of articleFiles) {
    const filePath = path.join(articlesDir, filename);

    console.log(`\n📝 Importing: ${filename}`);

    try {
      const articleData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      console.log(`   Title: ${articleData.title}`);
      console.log(`   Keyword: ${articleData.primaryKeyword}`);
      console.log(`   Category: ${articleData.category}`);
      console.log(`   Word count: ~${(articleData.introduction + articleData.whatIsIt + articleData.howItWorks + articleData.useCases + articleData.conclusion).split(' ').length}`);

      const result = await importArticle(articleData);

      if (result.success) {
        successCount++;
        console.log(`   ✅ Imported successfully`);
        console.log(`   Document ID: ${result.data.data.documentId}`);
        results.push({
          filename,
          status: 'success',
          documentId: result.data.data.documentId,
        });
      } else {
        failCount++;
        console.log(`   ❌ Failed: ${result.error}`);
        results.push({
          filename,
          status: 'failed',
          error: result.error,
        });
      }

      // Rate limiting - wait between requests
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      failCount++;
      console.log(`   ❌ Error: ${error.message}`);
      results.push({
        filename,
        status: 'error',
        error: error.message,
      });
    }
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 IMPORT SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully imported: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log('='.repeat(60));

  // Save import log
  const logPath = path.join(__dirname, '../data/import-log.json');
  fs.writeFileSync(logPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    results,
    summary: { success: successCount, failed: failCount },
  }, null, 2));

  console.log(`\n📁 Import log saved to: ${logPath}`);

  if (successCount > 0) {
    console.log(`\n✅ ${successCount} articles are now live on your site!`);
    console.log(`Visit: ${STRAPI_URL.replace('freeaigenerator-pseo-production', 'pacific-abundance-production-4fff')}`);
  }

  return results;
}

// Run import
importPhase1Articles()
  .then(() => {
    console.log('\n✅ Import process complete!');
  })
  .catch(error => {
    console.error('\n❌ Import failed:', error);
    process.exit(1);
  });
