// app/sitemap.xml/route.ts
import { getToolPages, getCategoryPages } from '@/lib/strapi';

export async function GET() {
  const baseUrl = 'https://pacific-abundance-production-4fff.up.railway.app';

  try {
    // Fetch all content
    const [toolPages, categoryPages] = await Promise.all([
      getToolPages(1000), // Get all tool pages
      getCategoryPages(1000) // Get all category pages
    ]);

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">

  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Tools Index Page -->
  <url>
    <loc>${baseUrl}/tools</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Categories Index Page -->
  <url>
    <loc>${baseUrl}/categories</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Tool Pages -->
${toolPages.map((page: any) => `  <url>
    <loc>${baseUrl}/${page.slug}</loc>
    <lastmod>${page.lastUpdated ? new Date(page.lastUpdated).toISOString() : new Date(page.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}

  <!-- Category Pages -->
${categoryPages.map((page: any) => `  <url>
    <loc>${baseUrl}/category/${page.slug}</loc>
    <lastmod>${page.lastUpdated ? new Date(page.lastUpdated).toISOString() : new Date(page.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n')}

</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Sitemap generation error:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
