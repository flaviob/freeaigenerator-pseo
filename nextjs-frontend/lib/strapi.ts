// lib/strapi.ts
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Fetch from Strapi API
async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<StrapiResponse<T>> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
  };

  const url = `${STRAPI_URL}/api${path}`;
  
  const response = await fetch(url, {
    headers,
    next: { revalidate: 3600 }, // Revalidate every hour
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Get all tool pages
export async function getToolPages(limit = 100) {
  const response = await fetchAPI<any[]>(
    `/tool-pages?pagination[limit]=${limit}&populate=*`
  );
  return response.data;
}

// Get single tool page by slug
export async function getToolPageBySlug(slug: string) {
  const response = await fetchAPI<any[]>(
    `/tool-pages?filters[slug][$eq]=${slug}&populate=*`
  );
  return response.data[0] || null;
}

// Get all comparison pages
export async function getComparisonPages(limit = 100) {
  const response = await fetchAPI<any[]>(
    `/comparison-pages?pagination[limit]=${limit}&populate=*`
  );
  return response.data;
}

// Get single comparison page by slug
export async function getComparisonPageBySlug(slug: string) {
  const response = await fetchAPI<any[]>(
    `/comparison-pages?filters[slug][$eq]=${slug}&populate=*`
  );
  return response.data[0] || null;
}

// Get all category pages
export async function getCategoryPages(limit = 100) {
  const response = await fetchAPI<any[]>(
    `/category-pages?pagination[limit]=${limit}&populate=*`
  );
  return response.data;
}

// Get single category page by slug
export async function getCategoryPageBySlug(slug: string) {
  const response = await fetchAPI<any[]>(
    `/category-pages?filters[slug][$eq]=${slug}&populate=*`
  );
  return response.data[0] || null;
}

// Get all slugs for static generation
export async function getAllSlugs() {
  const [toolPages, comparisonPages, categoryPages] = await Promise.all([
    getToolPages(1000),
    getComparisonPages(1000),
    getCategoryPages(1000),
  ]);

  return {
    tools: toolPages.map(page => page.slug),
    comparisons: comparisonPages.map(page => page.slug),
    categories: categoryPages.map(page => page.slug),
  };
}

// Search functionality
export async function searchPages(query: string, limit = 20) {
  const [toolPages, comparisonPages, categoryPages] = await Promise.all([
    fetchAPI<any[]>(
      `/tool-pages?filters[$or][0][title][$containsi]=${query}&filters[$or][1][primaryKeyword][$containsi]=${query}&pagination[limit]=${limit}`
    ),
    fetchAPI<any[]>(
      `/comparison-pages?filters[title][$containsi]=${query}&pagination[limit]=${limit}`
    ),
    fetchAPI<any[]>(
      `/category-pages?filters[title][$containsi]=${query}&pagination[limit]=${limit}`
    ),
  ]);

  return {
    tools: toolPages.data,
    comparisons: comparisonPages.data,
    categories: categoryPages.data,
  };
}

// Get homepage single type
export async function getHomepage() {
  try {
    const response = await fetchAPI<any>('/homepage');
    return response.data;
  } catch {
    return null;
  }
}

export { STRAPI_URL };
