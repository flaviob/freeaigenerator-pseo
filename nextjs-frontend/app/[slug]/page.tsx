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

  const { metaTitle, metaDescription, slug, lastUpdated, createdAt } = page;

  return genMeta({
    title: metaTitle,
    description: metaDescription,
    slug,
    publishedTime: createdAt,
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
    metaDescription,
    createdAt,
  } = page;

  // Generate schema markup
  const articleSchema = generateArticleSchema({
    title,
    description: metaDescription,
    slug: params.slug,
    publishedTime: createdAt,
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

      {/* Breadcrumbs */}
      <div className="max-w-[1200px] mx-auto px-8 py-4 text-sm">
        <a href="/" className="text-[#ef4444] hover:underline">Home</a>
        <span className="text-[#6b7280] mx-2">›</span>
        <a href="/tools" className="text-[#ef4444] hover:underline">Tools</a>
        <span className="text-[#6b7280] mx-2">›</span>
        <span className="text-[#9ca3af] capitalize">{category}</span>
        <span className="text-[#6b7280] mx-2">›</span>
        <span className="text-[#9ca3af]">{title}</span>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 py-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
          {/* Main Content */}
          <article className="bg-[#1a1a1a] p-12 rounded-xl shadow-[0_4px_6px_rgba(0,0,0,0.3)] border border-[#2a2a2a]">
            {/* Article Meta Badges */}
            <div className="flex gap-4 mb-6 flex-wrap">
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#ef4444] text-white capitalize">
                {category}
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#2a2a2a] text-[#9ca3af] border border-[#3a3a3a]">
                {estimatedReadTime} min read
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#2a2a2a] text-[#9ca3af] border border-[#3a3a3a]">
                Updated: {new Date(lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>

            <h1 className="text-4xl font-bold mb-8 text-white leading-tight">{title}</h1>

            {/* Featured Image */}
            <div className="mb-8">
              <div className="featured-image">
                <div className="featured-image-text">{title}</div>
              </div>
            </div>

            {/* Mobile TOC */}
            <div className="lg:hidden bg-[#1a1a1a] p-6 rounded-lg mb-8 border-2 border-[#2a2a2a]">
              <h3 className="text-xs font-semibold uppercase tracking-[1.5px] text-[#6b7280] mb-4">Covered Topics</h3>
              <ol className="space-y-3 list-none counter-reset-[toc-counter]">
                <li className="text-sm font-medium">
                  <a href="#what-is-it" className="text-[#e5e7eb] hover:text-[#ef4444] transition-colors">
                    <span className="text-[#ef4444] font-semibold mr-1">1.</span> What is {title}?
                  </a>
                </li>
                {howItWorks && (
                  <li className="text-sm font-medium">
                    <a href="#how-it-works" className="text-[#e5e7eb] hover:text-[#ef4444] transition-colors">
                      <span className="text-[#ef4444] font-semibold mr-1">2.</span> How It Works
                    </a>
                  </li>
                )}
                {features && (
                  <li className="text-sm font-medium">
                    <a href="#features" className="text-[#e5e7eb] hover:text-[#ef4444] transition-colors">
                      <span className="text-[#ef4444] font-semibold mr-1">3.</span> Key Features
                    </a>
                  </li>
                )}
                {topTools && (
                  <li className="text-sm font-medium">
                    <a href="#top-tools" className="text-[#e5e7eb] hover:text-[#ef4444] transition-colors">
                      <span className="text-[#ef4444] font-semibold mr-1">4.</span> Best Tools
                    </a>
                  </li>
                )}
                {prosAndCons && (
                  <li className="text-sm font-medium">
                    <a href="#pros-cons" className="text-[#e5e7eb] hover:text-[#ef4444] transition-colors">
                      <span className="text-[#ef4444] font-semibold mr-1">5.</span> Pros & Cons
                    </a>
                  </li>
                )}
                {faq && (
                  <li className="text-sm font-medium">
                    <a href="#faq" className="text-[#e5e7eb] hover:text-[#ef4444] transition-colors">
                      <span className="text-[#ef4444] font-semibold mr-1">6.</span> FAQ
                    </a>
                  </li>
                )}
              </ol>
            </div>

            {/* Introduction */}
            <div
              className="prose prose-lg max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: introduction }}
            />

            {/* What Is It */}
            <section id="what-is-it" className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white pb-2 border-b-2 border-[#2a2a2a]">What is {title}?</h2>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: whatIsIt }}
              />
            </section>

            {/* How It Works */}
            {howItWorks && (
              <section id="how-it-works" className="mb-12">
                <h2 className="text-3xl font-bold mb-4 text-white pb-2 border-b-2 border-[#2a2a2a]">How It Works</h2>
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: howItWorks }}
                />
              </section>
            )}

            {/* Features */}
            {features && features.length > 0 && (
              <section id="features" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-white pb-2 border-b-2 border-[#2a2a2a]">Key Features</h2>
                <ul className="list-disc ml-8 space-y-2 text-[#d1d5db]">
                  {features.map((feature: string, index: number) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Use Cases */}
            {useCases && (
              <section id="use-cases" className="mb-12">
                <h2 className="text-3xl font-bold mb-4 text-white pb-2 border-b-2 border-[#2a2a2a]">Use Cases</h2>
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: useCases }}
                />
              </section>
            )}

            {/* Top Tools */}
            {topTools && topTools.length > 0 && (
              <section id="top-tools" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-white pb-2 border-b-2 border-[#2a2a2a]">Best Tools</h2>
                <div className="space-y-6">
                  {topTools.map((tool: any, index: number) => (
                    <div key={index} className="pb-6 border-b border-[#2a2a2a] last:border-b-0 last:pb-0">
                      <h4 className="text-xl font-semibold mb-2 text-white">{tool.name}</h4>
                      <p className="text-[#d1d5db] mb-0">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Pros & Cons */}
            {prosAndCons && (
              <section id="pros-cons" className="mb-12">
                <h2 className="text-3xl font-bold mb-6 text-white pb-2 border-b-2 border-[#2a2a2a]">Pros and Cons</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {prosAndCons.pros && (
                    <div className="bg-[#2a2a2a] p-6 rounded-lg border-l-4 border-[#10b981]">
                      <h3 className="text-lg font-semibold mb-4 text-white">Pros</h3>
                      <ul className="space-y-2 list-none ml-0">
                        {prosAndCons.pros.map((pro: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-[#d1d5db]">
                            <span className="text-[#10b981] font-bold">✓</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {prosAndCons.cons && (
                    <div className="bg-[#2a2a2a] p-6 rounded-lg border-l-4 border-[#ef4444]">
                      <h3 className="text-lg font-semibold mb-4 text-white">Cons</h3>
                      <ul className="space-y-2 list-none ml-0">
                        {prosAndCons.cons.map((con: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-[#d1d5db]">
                            <span className="text-[#ef4444] font-bold">✕</span>
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
                <h2 className="text-3xl font-bold mb-6 text-white pb-2 border-b-2 border-[#2a2a2a]">FAQ</h2>
                <div className="space-y-6">
                  {faq.map((item: any, index: number) => (
                    <div key={index} className="bg-[#2a2a2a] p-6 rounded-lg">
                      <div className="font-semibold text-white mb-2">{item.question}</div>
                      <p className="text-[#d1d5db] mb-0">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Conclusion */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-4 text-white pb-2 border-b-2 border-[#2a2a2a]">Conclusion</h2>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: conclusion }}
              />
            </section>

            {/* Related Articles */}
            <div className="bg-[#2a2a2a] p-8 rounded-lg mb-12 border-l-4 border-[#ef4444]">
              <h3 className="text-xl font-bold mb-4 text-white mt-0">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href={`/${category.toLowerCase()}-generator-free`} className="block p-4 bg-[#1a1a1a] rounded-md border border-[#3a3a3a] text-[#e5e7eb] font-medium hover:-translate-y-0.5 hover:shadow-md hover:border-[#ef4444] hover:text-[#ef4444] transition-all">
                  <div className="text-xs text-[#6b7280] uppercase tracking-wider mb-1">Free Tools</div>
                  Free {title}
                </a>
                <a href={`/best-${category.toLowerCase()}-generators`} className="block p-4 bg-[#1a1a1a] rounded-md border border-[#3a3a3a] text-[#e5e7eb] font-medium hover:-translate-y-0.5 hover:shadow-md hover:border-[#ef4444] hover:text-[#ef4444] transition-all">
                  <div className="text-xs text-[#6b7280] uppercase tracking-wider mb-1">Comparison</div>
                  Best {title} Tools
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#ef4444] text-white p-8 rounded-xl text-center">
              <h3 className="text-2xl font-bold mb-4 text-white mt-0">Ready to Try {title}?</h3>
              <p className="mb-6 text-white">Explore the best AI tools and start creating amazing content today.</p>
              <button className="bg-white text-[#ef4444] px-8 py-3 rounded-lg font-semibold hover:bg-[#1a1a1a] hover:text-white transition-all hover:-translate-y-0.5">
                Browse All Tools
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 hidden lg:block">
            {/* Table of Contents */}
            <div className="bg-[#1a1a1a] p-6 rounded-lg mb-6 border-2 border-[#2a2a2a]">
              <h3 className="text-xs font-semibold uppercase tracking-[1.5px] text-[#6b7280] mb-4 mt-0">Covered Topics</h3>
              <ol className="space-y-3 list-none ml-0">
                <li className="text-sm font-medium">
                  <a href="#what-is-it" className="text-[#e5e7eb] hover:text-[#ef4444] transition-colors">
                    <span className="text-[#ef4444] font-semibold mr-1">1.</span> What is {title}?
                  </a>
                </li>
                {howItWorks && (
                  <li className="text-sm font-medium">
                    <a href="#how-it-works" className="text-[#e5e7eb] hover:text-[#ef4444] transition-colors">
                      <span className="text-[#ef4444] font-semibold mr-1">2.</span> How It Works
                    </a>
                  </li>
                )}
                {features && (
                  <li className="text-sm font-medium">
                    <a href="#features" className="text-[#e5e7eb] hover:text-[#ef4444] transition-colors">
                      <span className="text-[#ef4444] font-semibold mr-1">3.</span> Key Features
                    </a>
                  </li>
                )}
                {topTools && (
                  <li className="text-sm font-medium">
                    <a href="#top-tools" className="text-[#e5e7eb] hover:text-[#ef4444] transition-colors">
                      <span className="text-[#ef4444] font-semibold mr-1">4.</span> Best Tools
                    </a>
                  </li>
                )}
                {prosAndCons && (
                  <li className="text-sm font-medium">
                    <a href="#pros-cons" className="text-[#e5e7eb] hover:text-[#ef4444] transition-colors">
                      <span className="text-[#ef4444] font-semibold mr-1">5.</span> Pros & Cons
                    </a>
                  </li>
                )}
                {faq && (
                  <li className="text-sm font-medium">
                    <a href="#faq" className="text-[#e5e7eb] hover:text-[#ef4444] transition-colors">
                      <span className="text-[#ef4444] font-semibold mr-1">6.</span> FAQ
                    </a>
                  </li>
                )}
              </ol>
            </div>

            {/* Social Share */}
            <div className="bg-[#1a1a1a] p-6 rounded-lg border-2 border-[#2a2a2a]">
              <span className="text-xs font-semibold uppercase tracking-[1.5px] text-[#6b7280] mb-4 block">Share Article</span>
              <div className="grid grid-cols-2 gap-3">
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://freeaigenerator.com/${params.slug}`)}&text=${encodeURIComponent(title)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center h-11 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] text-[#9ca3af] hover:bg-[#ef4444] hover:border-[#ef4444] hover:text-white hover:-translate-y-0.5 transition-all"
                   aria-label="Share on X (Twitter)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://freeaigenerator.com/${params.slug}`)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center h-11 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] text-[#9ca3af] hover:bg-[#ef4444] hover:border-[#ef4444] hover:text-white hover:-translate-y-0.5 transition-all"
                   aria-label="Share on LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://freeaigenerator.com/${params.slug}`)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center h-11 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] text-[#9ca3af] hover:bg-[#ef4444] hover:border-[#ef4444] hover:text-white hover:-translate-y-0.5 transition-all"
                   aria-label="Share on Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href={`https://reddit.com/submit?url=${encodeURIComponent(`https://freeaigenerator.com/${params.slug}`)}&title=${encodeURIComponent(title)}`}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center justify-center h-11 rounded-lg bg-[#2a2a2a] border border-[#3a3a3a] text-[#9ca3af] hover:bg-[#ef4444] hover:border-[#ef4444] hover:text-white hover:-translate-y-0.5 transition-all"
                   aria-label="Share on Reddit">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                  </svg>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
