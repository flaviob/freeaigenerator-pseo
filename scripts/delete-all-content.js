const STRAPI_URL = 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_TOKEN = '8d9fa930b45fcfd8a4981ead1a503eb875a26001729d1ada9af94e0d511675e8066090a8a584b199416110cc6c52defd4918c968bebf795fb476d6ec17afec990f6ddb4a33e7b2eda80422cb8bd53112dd4721d2bd4b65e8b12bafc1964e3f97965b8af6e58517e9178e1aeaebf9fa7bd525edb121135e4cbd07899bfaa09fe9';

async function fetchFromStrapi(endpoint, options = {}) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  // DELETE requests might return 204 No Content
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return null;
  }

  return response.json();
}

async function deleteEntry(contentType, documentId) {
  try {
    await fetchFromStrapi(`/${contentType}/${documentId}`, {
      method: 'DELETE',
    });
    return { success: true, documentId };
  } catch (error) {
    return { success: false, documentId, error: error.message };
  }
}

async function deleteAllContent(contentType) {
  console.log(`\n📋 Fetching all ${contentType}...`);

  try {
    const response = await fetchFromStrapi(`/${contentType}?pagination[limit]=1000`);
    const entries = response.data || [];

    console.log(`Found ${entries.length} entries in ${contentType}`);

    if (entries.length === 0) {
      console.log(`✓ No entries to delete in ${contentType}`);
      return { total: 0, deleted: 0, failed: 0 };
    }

    console.log(`🗑️  Deleting ${entries.length} entries from ${contentType}...`);

    let deleted = 0;
    let failed = 0;

    for (const entry of entries) {
      const result = await deleteEntry(contentType, entry.documentId);

      if (result.success) {
        deleted++;
        process.stdout.write(`\r   Deleted: ${deleted}/${entries.length}`);
      } else {
        failed++;
        console.log(`\n   ✗ Failed to delete documentId ${entry.documentId}: ${result.error}`);
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`\n✓ Deleted ${deleted} entries from ${contentType}`);
    if (failed > 0) {
      console.log(`✗ Failed to delete ${failed} entries`);
    }

    return { total: entries.length, deleted, failed };
  } catch (error) {
    console.error(`✗ Error processing ${contentType}:`, error.message);
    return { total: 0, deleted: 0, failed: 0, error: error.message };
  }
}

async function main() {
  console.log('🧹 Starting content deletion from Strapi...\n');
  console.log(`Strapi URL: ${STRAPI_URL}`);

  const contentTypes = [
    'tool-pages',
    'category-pages',
    'comparison-pages',
  ];

  const results = {};

  for (const contentType of contentTypes) {
    results[contentType] = await deleteAllContent(contentType);
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 DELETION SUMMARY');
  console.log('='.repeat(60));

  let totalDeleted = 0;
  let totalFailed = 0;

  for (const [contentType, result] of Object.entries(results)) {
    console.log(`\n${contentType}:`);
    console.log(`  Total found: ${result.total}`);
    console.log(`  Successfully deleted: ${result.deleted}`);
    console.log(`  Failed: ${result.failed}`);

    totalDeleted += result.deleted;
    totalFailed += result.failed;
  }

  console.log('\n' + '='.repeat(60));
  console.log(`Total deleted: ${totalDeleted}`);
  console.log(`Total failed: ${totalFailed}`);
  console.log('='.repeat(60));

  if (totalDeleted > 0) {
    console.log('\n✅ Content deletion completed!');
  } else {
    console.log('\nℹ️  No content was found to delete.');
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
