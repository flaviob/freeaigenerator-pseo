// app/compare/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getComparisonPageBySlug, getAllSlugs } from '@/lib/strapi';
import { generateMetadata as genMeta, generateArticleSchema, generateFAQSchema } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

// Generate static params for all comparison pages
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.comparisons.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getComparisonPageBySlug(params.slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const { metaTitle, metaDescription, slug, lastUpdated } = page.attributes;

  return genMeta({
    title: metaTitle,
    description: metaDescription,
    slug: `compare/${slug}`,
    publishedTime: page.attributes.createdAt,
    modifiedTime: lastUpdated,
  });
}

export default async function ComparisonPage({ params }: Props) {
  const page = await getComparisonPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  const {
    title,
    tool1Name,
    tool2Name,
    introduction,
    tool1Overview,
    tool2Overview,
    comparisonTable,
    featureComparison,
    pricingComparison,
    prosConsTool1,
    prosConsTool2,
    winner,
    verdict,
    faq,
    conclusion,
    category,
    lastUpdated,
  } = page.attributes;

  // Generate schema markup
  const articleSchema = generateArticleSchema({
    title,
    description: page.attributes.metaDescription,
    slug: `compare/${params.slug}`,
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
          <div className="flex items-center gap-3 mb-4 text-sm text-gray-600">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full capitalize">
              {category}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
              Comparison
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
            <li><a href="#tool1-overview" className="text-blue-600 hover:underline">{tool1Name} Overview</a></li>
            <li><a href="#tool2-overview" className="text-blue-600 hover:underline">{tool2Name} Overview</a></li>
            <li><a href="#comparison-table" className="text-blue-600 hover:underline">Quick Comparison</a></li>
            <li><a href="#feature-comparison" className="text-blue-600 hover:underline">Feature Comparison</a></li>
            <li><a href="#pricing-comparison" className="text-blue-600 hover:underline">Pricing Comparison</a></li>
            <li><a href="#pros-cons" className="text-blue-600 hover:underline">Pros & Cons</a></li>
            {winner && <li><a href="#verdict" className="text-blue-600 hover:underline">Verdict</a></li>}
            {faq && <li><a href="#faq" className="text-blue-600 hover:underline">FAQ</a></li>}
          </ul>
        </nav>

        {/* Tool 1 Overview */}
        <section id="tool1-overview" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">{tool1Name} Overview</h2>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: tool1Overview }}
          />
        </section>

        {/* Tool 2 Overview */}
        <section id="tool2-overview" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">{tool2Name} Overview</h2>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: tool2Overview }}
          />
        </section>

        {/* Comparison Table */}
        {comparisonTable && (
          <section id="comparison-table" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Quick Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-4 text-left">Feature</th>
                    <th className="border p-4 text-left">{tool1Name}</th>
                    <th className="border p-4 text-left">{tool2Name}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTable.map((row: any, index: number) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border p-4 font-semibold">{row.feature}</td>
                      <td className="border p-4">{row.tool1}</td>
                      <td className="border p-4">{row.tool2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Feature Comparison */}
        <section id="feature-comparison" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Feature Comparison</h2>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: featureComparison }}
          />
        </section>

        {/* Pricing Comparison */}
        <section id="pricing-comparison" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">Pricing Comparison</h2>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: pricingComparison }}
          />
        </section>

        {/* Pros & Cons */}
        <section id="pros-cons" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Pros and Cons</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Tool 1 Pros & Cons */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">{tool1Name}</h3>
              {prosConsTool1.pros && (
                <div className="bg-green-50 p-6 rounded-lg mb-4">
                  <h4 className="text-lg font-semibold mb-3 text-green-800">Pros</h4>
                  <ul className="space-y-2">
                    {prosConsTool1.pros.map((pro: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {prosConsTool1.cons && (
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 text-red-800">Cons</h4>
                  <ul className="space-y-2">
                    {prosConsTool1.cons.map((con: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tool 2 Pros & Cons */}
            <div>
              <h3 className="text-2xl font-semibold mb-4">{tool2Name}</h3>
              {prosConsTool2.pros && (
                <div className="bg-green-50 p-6 rounded-lg mb-4">
                  <h4 className="text-lg font-semibold mb-3 text-green-800">Pros</h4>
                  <ul className="space-y-2">
                    {prosConsTool2.pros.map((pro: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {prosConsTool2.cons && (
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3 text-red-800">Cons</h4>
                  <ul className="space-y-2">
                    {prosConsTool2.cons.map((con: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Verdict */}
        {verdict && (
          <section id="verdict" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {winner ? `Winner: ${winner}` : 'Our Verdict'}
            </h2>
            {winner && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-4">
                <p className="text-xl font-semibold text-yellow-900">
                  🏆 {winner} is the winner
                </p>
              </div>
            )}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: verdict }}
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
          <h2 className="text-3xl font-bold mb-4">Conclusion</h2>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: conclusion }}
          />
        </section>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Choose?</h3>
          <p className="mb-6">Explore more AI tool comparisons and find the perfect fit for your needs.</p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Browse All Comparisons
          </button>
        </div>
      </article>
    </>
  );
}
