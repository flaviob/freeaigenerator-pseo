import { getCategoryPageBySlug, getAllSlugs } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import ToolCard from '@/components/ToolCard';
import ComparisonTable from '@/components/ComparisonTable';
import { generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema, generateComparisonSchema } from '@/lib/seo';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.categories.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await getCategoryPageBySlug(params.slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const page = await getCategoryPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  const {
    title,
    metaDescription,
    category,
    listType,
    introduction,
    selectionCriteria,
    toolsList,
    detailedReviews,
    comparisonTable,
    buyingGuide,
    faq,
    conclusion,
    isFreeOnly,
    year,
    lastUpdated,
    createdAt,
  } = page;

  // Generate schema markup
  const articleSchema = generateArticleSchema({
    title,
    description: metaDescription,
    slug: params.slug,
    publishedTime: createdAt || lastUpdated,
    modifiedTime: lastUpdated,
  });

  const faqSchema = faq ? generateFAQSchema(faq) : null;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://freeaigenerator.co' },
    { name: 'Categories', url: 'https://freeaigenerator.co/categories' },
    { name: title, url: `https://freeaigenerator.co/category/${params.slug}` },
  ]);

  const comparisonSchema = toolsList ? generateComparisonSchema({
    name: title,
    items: toolsList.map((tool: any) => ({
      name: tool.name,
      url: tool.url,
    })),
  }) : null;

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {comparisonSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonSchema) }}
        />
      )}

    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-[#9ca3af]">
            <li><a href="/" className="hover:text-[#ef4444] transition">Home</a></li>
            <li>/</li>
            <li><a href="/categories" className="hover:text-[#ef4444] transition">Categories</a></li>
            <li>/</li>
            <li className="text-white">{title}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 mb-4">
            <span className="px-4 py-1 bg-[#ef4444] text-white rounded-full text-sm font-semibold capitalize">
              {listType}
            </span>
            {isFreeOnly && (
              <span className="px-4 py-1 bg-[#10b981] text-white rounded-full text-sm font-semibold">
                Free Only
              </span>
            )}
            {year && (
              <span className="px-4 py-1 bg-[#1a1a1a] text-[#9ca3af] rounded-full text-sm">
                {year}
              </span>
            )}
          </div>

          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-xl text-[#d1d5db] leading-relaxed max-w-4xl">
            {metaDescription}
          </p>

          {lastUpdated && (
            <p className="text-sm text-[#6b7280] mt-4">
              Last updated: {new Date(lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Introduction */}
        {introduction && (
          <section className="mb-12">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(introduction) }}
            />
          </section>
        )}

        {/* Selection Criteria */}
        {selectionCriteria && (
          <section className="mb-12 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              How We Selected These Tools
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(selectionCriteria) }}
            />
          </section>
        )}

        {/* Tools List Grid */}
        {toolsList && toolsList.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">
              Top {toolsList.length} {listType === 'best' ? 'Best' : listType === 'free' ? 'Free' : ''} Tools
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolsList.map((tool: any, idx: number) => (
                <div key={idx} className="relative">
                  {idx < 3 && (
                    <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#ef4444] text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
                      {idx + 1}
                    </div>
                  )}
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Comparison Table */}
        {comparisonTable && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">
              Quick Comparison
            </h2>
            <ComparisonTable data={comparisonTable} />
          </section>
        )}

        {/* Detailed Reviews */}
        {detailedReviews && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">
              Detailed Reviews
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(detailedReviews) }}
            />
          </section>
        )}

        {/* Buying Guide */}
        {buyingGuide && (
          <section className="mb-12 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">
              Buying Guide
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(buyingGuide) }}
            />
          </section>
        )}

        {/* FAQ Section */}
        {faq && faq.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faq.map((item: any, idx: number) => (
                <details
                  key={idx}
                  className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 group"
                >
                  <summary className="text-xl font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                    {item.question}
                    <span className="text-[#ef4444] text-2xl group-open:rotate-180 transition-transform">
                      ↓
                    </span>
                  </summary>
                  <div className="mt-4 text-[#d1d5db] leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Conclusion */}
        {conclusion && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">
              Conclusion
            </h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(conclusion) }}
            />
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-[#ef4444] text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Try These Tools?
          </h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Start exploring the best {category} tools today and find the perfect solution for your needs.
          </p>
          <a
            href="/"
            className="bg-white text-[#ef4444] px-8 py-3 rounded-lg font-semibold hover:bg-[#1a1a1a] hover:text-white transition inline-block"
          >
            Explore More Tools
          </a>
        </section>
      </div>
    </div>
    </>
  );
}
