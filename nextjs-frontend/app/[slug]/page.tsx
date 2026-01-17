// app/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getToolPageBySlug, getAllSlugs } from '@/lib/strapi';
import { generateMetadata as genMeta, generateArticleSchema, generateFAQSchema } from '@/lib/seo';

interface Props {
  params: { slug: string };
}

// Generate static params for all tool pages
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.tools.map((slug) => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getToolPageBySlug(params.slug);
  
  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const { metaTitle, metaDescription, slug, lastUpdated } = page.attributes;

  return genMeta({
    title: metaTitle,
    description: metaDescription,
    slug,
    publishedTime: page.attributes.createdAt,
    modifiedTime: lastUpdated,
  });
}

export default async function ToolPage({ params }: Props) {
  const page = await getToolPageBySlug(params.slug);

  if (!page) {
    notFound();
  }

  const {
    title,
    introduction,
    whatIsIt,
    howItWorks,
    features,
    useCases,
    topTools,
    prosAndCons,
    faq,
    conclusion,
    category,
    isFree,
    estimatedReadTime,
    lastUpdated,
  } = page.attributes;

  // Generate schema markup
  const articleSchema = generateArticleSchema({
    title,
    description: page.attributes.metaDescription,
    slug: params.slug,
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
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full capitalize">
              {category}
            </span>
            {isFree && (
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
                Free
              </span>
            )}
            <span>{estimatedReadTime} min read</span>
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
            <li><a href="#what-is-it" className="text-blue-600 hover:underline">What is {title}?</a></li>
            {howItWorks && <li><a href="#how-it-works" className="text-blue-600 hover:underline">How It Works</a></li>}
            {features && <li><a href="#features" className="text-blue-600 hover:underline">Key Features</a></li>}
            {useCases && <li><a href="#use-cases" className="text-blue-600 hover:underline">Use Cases</a></li>}
            {topTools && <li><a href="#top-tools" className="text-blue-600 hover:underline">Top Tools</a></li>}
            {prosAndCons && <li><a href="#pros-cons" className="text-blue-600 hover:underline">Pros & Cons</a></li>}
            {faq && <li><a href="#faq" className="text-blue-600 hover:underline">FAQ</a></li>}
          </ul>
        </nav>

        {/* What Is It */}
        <section id="what-is-it" className="mb-12">
          <h2 className="text-3xl font-bold mb-4">What is {title}?</h2>
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: whatIsIt }}
          />
        </section>

        {/* How It Works */}
        {howItWorks && (
          <section id="how-it-works" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">How {title} Works</h2>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: howItWorks }}
            />
          </section>
        )}

        {/* Features */}
        {features && features.length > 0 && (
          <section id="features" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature: string, index: number) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white border rounded-lg">
                  <span className="text-2xl">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Use Cases */}
        {useCases && (
          <section id="use-cases" className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Use Cases</h2>
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: useCases }}
            />
          </section>
        )}

        {/* Top Tools */}
        {topTools && topTools.length > 0 && (
          <section id="top-tools" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Top {title} Tools</h2>
            <div className="space-y-6">
              {topTools.map((tool: any, index: number) => (
                <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold mb-2">{tool.name}</h3>
                  <p className="text-gray-600 mb-3">{tool.description}</p>
                  {tool.features && (
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {tool.features.map((feat: string, i: number) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Pros & Cons */}
        {prosAndCons && (
          <section id="pros-cons" className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Pros and Cons</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {prosAndCons.pros && (
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-green-800">Pros</h3>
                  <ul className="space-y-2">
                    {prosAndCons.pros.map((pro: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {prosAndCons.cons && (
                <div className="bg-red-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-red-800">Cons</h3>
                  <ul className="space-y-2">
                    {prosAndCons.cons.map((con: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
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
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Try {title}?</h3>
          <p className="mb-6">Explore the best AI tools and start creating amazing content today.</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Browse All Tools
          </button>
        </div>
      </article>
    </>
  );
}
