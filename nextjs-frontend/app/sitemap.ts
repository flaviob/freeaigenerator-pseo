// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getToolPages, getCategoryPages } from '@/lib/strapi';

// Force dynamic generation so sitemap is always fresh
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeaigenerator.co';

  try {
    // Fetch all content
    const [toolPages, categoryPages] = await Promise.all([
      getToolPages(1000), // Get all tool pages
      getCategoryPages(1000) // Get all category pages
    ]);

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/tools`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/categories`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
    ];

    // Tool pages
    const toolPagesSitemap: MetadataRoute.Sitemap = toolPages.map((page: any) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.lastUpdated ? new Date(page.lastUpdated) : new Date(page.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // Category pages
    const categoryPagesSitemap: MetadataRoute.Sitemap = categoryPages.map((page: any) => ({
      url: `${baseUrl}/category/${page.slug}`,
      lastModified: page.lastUpdated ? new Date(page.lastUpdated) : new Date(page.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...toolPagesSitemap, ...categoryPagesSitemap];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    // Return at least static pages if there's an error
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1.0,
      },
    ];
  }
}
