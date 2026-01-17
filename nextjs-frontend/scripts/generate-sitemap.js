// scripts/generate-sitemap.js
import { getAllSlugs, STRAPI_URL } from '../lib/strapi';
import fs from 'fs/promises';

const SITE_URL = 'https://freeaigenerator.com';

async function generateSitemap() {
  console.log('Generating sitemap...');

  const slugs = await getAllSlugs();

  const urls = [
    // Homepage
    {
      loc: SITE_URL,
      changefreq: 'daily',
      priority: 1.0,
      lastmod: new Date().toISOString().split('T')[0],
    },
    
    // Tool pages
    ...slugs.tools.map(slug => ({
      loc: `${SITE_URL}/${slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString().split('T')[0],
    })),

    // Comparison pages
    ...slugs.comparisons.map(slug => ({
      loc: `${SITE_URL}/compare/${slug}`,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString().split('T')[0],
    })),

    // Category pages
    ...slugs.categories.map(slug => ({
      loc: `${SITE_URL}/best/${slug}`,
      changefreq: 'weekly',
      priority: 0.9,
      lastmod: new Date().toISOString().split('T')[0],
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  await fs.writeFile('./public/sitemap.xml', sitemap);

  console.log(`✅ Sitemap generated with ${urls.length} URLs`);
  console.log('📍 Location: public/sitemap.xml');
  
  // Also generate robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin areas
Disallow: /admin
Disallow: /api
`;

  await fs.writeFile('./public/robots.txt', robots);
  console.log('✅ robots.txt generated');
}

generateSitemap().catch(console.error);
