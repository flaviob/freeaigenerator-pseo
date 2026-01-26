const STRAPI_URL = 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_TOKEN = '8d9fa930b45fcfd8a4981ead1a503eb875a26001729d1ada9af94e0d511675e8066090a8a584b199416110cc6c52defd4918c968bebf795fb476d6ec17afec990f6ddb4a33e7b2eda80422cb8bd53112dd4721d2bd4b65e8b12bafc1964e3f97965b8af6e58517e9178e1aeaebf9fa7bd525edb121135e4cbd07899bfaa09fe9';

async function checkContent() {
  const contentTypes = ['tool-pages', 'category-pages', 'comparison-pages'];

  console.log('📊 Checking Strapi content...\n');

  for (const type of contentTypes) {
    const url = `${STRAPI_URL}/api/${type}?pagination[limit]=1`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${STRAPI_TOKEN}`,
      },
    });

    const data = await response.json();
    const count = data.meta?.pagination?.total || 0;

    console.log(`${type}: ${count} entries`);
  }
}

checkContent();
