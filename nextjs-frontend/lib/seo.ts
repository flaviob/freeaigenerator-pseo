// lib/seo.ts
import type { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  slug: string;
  type?: 'article' | 'website';
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  noindex?: boolean;
}

export function generateMetadata({
  title,
  description,
  slug,
  type = 'article',
  publishedTime,
  modifiedTime,
  image,
  noindex = false,
}: SEOProps): Metadata {
  const url = `https://freeaigenerator.com/${slug}`;
  const defaultImage = 'https://freeaigenerator.com/og-image.jpg';

  return {
    title,
    description,
    ...(noindex && { robots: { index: false, follow: false } }),
    openGraph: {
      title,
      description,
      url,
      siteName: 'FreeAIGenerator',
      type,
      images: [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || defaultImage],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Generate Article Schema
export function generateArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  modifiedTime: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: `https://freeaigenerator.com/${article.slug}`,
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime,
    author: {
      '@type': 'Organization',
      name: article.author || 'FreeAIGenerator',
      url: 'https://freeaigenerator.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'FreeAIGenerator',
      logo: {
        '@type': 'ImageObject',
        url: 'https://freeaigenerator.com/logo.png',
      },
    },
    ...(article.image && {
      image: {
        '@type': 'ImageObject',
        url: article.image,
      },
    }),
  };
}

// Generate FAQ Schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Generate Breadcrumb Schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Generate HowTo Schema
export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  steps: Array<{ text: string; image?: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      text: step.text,
      ...(step.image && { image: step.image }),
    })),
  };
}

// Generate Product Comparison Schema
export function generateComparisonSchema(comparison: {
  name: string;
  items: Array<{
    name: string;
    url?: string;
    rating?: number;
    price?: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: comparison.name,
    itemListElement: comparison.items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: item.name,
        ...(item.url && { url: item.url }),
        ...(item.rating && {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: item.rating,
            bestRating: 5,
          },
        }),
        ...(item.price && {
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: 'USD',
          },
        }),
      },
    })),
  };
}
