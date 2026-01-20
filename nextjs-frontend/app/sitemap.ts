// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/strapi';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeaigenerator.com';

  // Fetch all slugs from Strapi
  const slugs = await getAllSlugs();

  // Homepage
  const homepage = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  };

  // Tool pages
  const toolPages = slugs.tools.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Comparison pages
  const comparisonPages = slugs.comparisons.map((slug) => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Category pages
  const categoryPages = slugs.categories.map((slug) => ({
    url: `${baseUrl}/best/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [
    homepage,
    ...toolPages,
    ...comparisonPages,
    ...categoryPages,
  ];
}
