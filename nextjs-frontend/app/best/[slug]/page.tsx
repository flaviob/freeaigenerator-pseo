// app/best/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryPageBySlug, getAllSlugs } from '@/lib/strapi';
import { generateMetadata as genMeta, generateArticleSchema, generateFAQSchema } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

// Generate static params for all category pages
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.categories.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getCategoryPageBySlug(params.slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const { metaTitle, metaDescription, slug, lastUpdated } = page.attributes;

  return genMeta({
    title: metaTitle,
    description: metaDescription,
    slug: `best/${slug}`,
    publishedTime: page.attributes.createdAt,
    modifiedTime: lastUpdated,
  });
}

export default async function CategoryPage({ params }: Props) {
  const page = await getCategoryPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  const {
    title,
    introduction,
    selectionCriteria,
    toolsList,
    detailedReviews,
    comparisonTable,
    buyingGuide,
    faq,
    conclusion,
    category,
    listType,
    isFreeOnly,
    year,
    lastUpdated,
  } = page.attributes;

  // Generate schema markup
  const articleSchema = generateArticleSchema({
    title,
    description: page.attributes.metaDescription,
    slug: `best/${params.slug}`,
    publishedTime: page.attributes.createdAt,
    modifiedTime: lastUpdated,
  });

  const faqSchema = faq ? generateFAQSchema(faq) : null;

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

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4 text-sm text-gray-600 flex-wrap">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full capitalize">
              {category}
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full capitalize">
              {listType}
            </span>
            {isFreeOnly && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                Free Only
              </span>
            )}
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
              {year}
            </span>
            <span>Updated: {new Date(lastUpdated).toLocaleDateString()}</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{title}</h1>
        </header>

        {/* Introduction */}
        <div
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: introduction }}
        />

        {/* Table of Contents */}
        <nav className="bg-gray-50 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Table of Contents</h2>
          <ul className="space-y-2">
            {selectionCriteria && <li><a href="#criteria" className="text-blue-600 hover:underline">Selection Criteria</a></li>}
            <li><a href="#top-tools" className="text-blue-600 hover:underline">Top Tools</a></li>
            {comparisonTable && <li><a href="#comparison-table" className="text-blue-600 hover:underline">Quick Comparison</a></li>}
            <li><a href="#detailed-reviews" className="text-blue-600 hover:underline">Detailed Reviews</a></li>
            {buyingGuide && <li><a href="#buying-guide" className="text-blue-600 hover:underline">Buying Guide</a></li>}
            {faq && <li><a href="#faq" className="text-blue-600 hover:underline">FAQ</a></li>}
          </ul>
        </nav>

        {/* Selection Criteria */}
        {selectionCriteria && (
          <section id="criteria" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">How We Selected These Tools</h2>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: selectionCriteria }}
            />
          </section>
        )}

        {/* Top Tools List */}
        {toolsList && toolsList.length > 0 && (
          <section id="top-tools" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Top {toolsList.length} Tools</h2>
            <div className="space-y-4">
              {toolsList.map((tool: any, index: number) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">{tool.name}</h3>
                    <p className="text-gray-600">{tool.tagline || tool.description}</p>
                  </div>
                  {tool.badge && (
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                      {tool.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Comparison Table */}
        {comparisonTable && comparisonTable.length > 0 && (
          <section id="comparison-table" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Quick Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-4 text-left">Tool</th>
                    <th className="border p-4 text-left">Pricing</th>
                    <th className="border p-4 text-left">Best For</th>
                    <th className="border p-4 text-left">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border p-4 font-semibold">{row.tool}</td>
                      <td className="border p-4">{row.pricing}</td>
                      <td className="border p-4">{row.bestFor}</td>
                      <td className="border p-4">
                        <span className="text-yellow-500">{row.rating || '⭐⭐⭐⭐⭐'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Detailed Reviews */}
        <section id="detailed-reviews" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Detailed Reviews</h2>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: detailedReviews }}
          />
        </section>

        {/* Buying Guide */}
        {buyingGuide && (
          <section id="buying-guide" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">How to Choose the Right Tool</h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Buying Guide</p>
              <p className="text-gray-700">Use this guide to find the perfect tool for your specific needs.</p>
            </div>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: buyingGuide }}
            />
          </section>
        )}

        {/* FAQ */}
        {faq && faq.length > 0 && (
          <section id="faq" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faq.map((item: any, index: number) => (
                <div key={index} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">{item.question}</h3>
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Final Thoughts</h2>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: conclusion }}
          />
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-blue-500 to-green-600 text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="mb-6">Explore more curated lists and find the best AI tools for every use case.</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Browse All Lists
          </button>
        </div>
      </article>
    </>
  );
}
