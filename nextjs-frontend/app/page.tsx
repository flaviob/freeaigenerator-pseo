import { getToolPages, getCategoryPages } from '@/lib/strapi';

export default async function Home() {
  const [toolPages, categoryPages] = await Promise.all([
    getToolPages(6),
    getCategoryPages(3)
  ]);

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 text-white">
          Discover the Best Free AI Generators
        </h1>
        <p className="text-xl text-[#d1d5db] max-w-3xl mx-auto mb-8">
          Explore hundreds of AI tools for image generation, video creation, text writing, and more.
          Find the perfect AI solution for your creative projects.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#tools"
            className="bg-[#ef4444] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#dc2626] transition"
          >
            Browse All Tools
          </a>
          <a
            href="/categories"
            className="bg-[#1a1a1a] border-2 border-[#ef4444] text-[#ef4444] px-8 py-3 rounded-lg font-semibold hover:bg-[#2a2a2a] transition"
          >
            View Categories
          </a>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-white">Popular Categories</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {['Image', 'Video', 'Text', 'Audio'].map((category) => (
            <a
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="p-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:shadow-lg hover:border-[#ef4444] transition text-center"
            >
              <div className="text-4xl mb-3">
                {category === 'Image' && '🎨'}
                {category === 'Video' && '🎬'}
                {category === 'Text' && '✍️'}
                {category === 'Audio' && '🎵'}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{category} AI</h3>
              <p className="text-[#9ca3af] text-sm">Explore {category.toLowerCase()} generators</p>
            </a>
          ))}
        </div>
      </section>

      {/* Top Lists & Guides */}
      {categoryPages && categoryPages.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Top Lists & Comparisons</h2>
            <a href="/categories" className="text-[#ef4444] hover:text-[#dc2626] font-semibold">
              View All →
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {categoryPages.map((page: any) => (
              <a
                key={page.id}
                href={`/category/${page.slug}`}
                className="p-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:shadow-lg hover:border-[#ef4444] transition"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#fbbf24] text-[#0a0a0a] rounded-full text-sm font-semibold capitalize">
                    {page.listType}
                  </span>
                  {page.isFreeOnly && (
                    <span className="px-3 py-1 bg-[#10b981] text-white rounded-full text-sm">
                      Free Only
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{page.title}</h3>
                <p className="text-[#9ca3af] text-sm mb-3 line-clamp-2">
                  {page.metaDescription}
                </p>
                <div className="flex items-center gap-3 text-xs text-[#6b7280]">
                  <span>{page.estimatedReadTime} min read</span>
                  {page.year && <span>{page.year}</span>}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Latest Tools */}
      <section id="tools" className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">AI Tool Guides</h2>
          <a href="/tools" className="text-[#ef4444] hover:text-[#dc2626] font-semibold">
            View All →
          </a>
        </div>
        {toolPages && toolPages.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {toolPages.map((tool: any) => (
              <a
                key={tool.id}
                href={`/${tool.slug}`}
                className="p-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:shadow-lg hover:border-[#ef4444] transition"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#ef4444] text-white rounded-full text-sm capitalize">
                    {tool.category}
                  </span>
                  {tool.isFree && (
                    <span className="px-3 py-1 bg-[#10b981] text-white rounded-full text-sm">
                      Free
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{tool.title}</h3>
                <p className="text-[#9ca3af] text-sm mb-3 line-clamp-2">
                  {tool.metaDescription}
                </p>
                <div className="flex items-center gap-3 text-xs text-[#6b7280]">
                  <span>{tool.estimatedReadTime} min read</span>
                  <span>{new Date(tool.lastUpdated).toLocaleDateString()}</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-[#1a1a1a] p-12 rounded-lg text-center border border-[#2a2a2a]">
            <p className="text-[#9ca3af] text-lg">No tools available yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-[#ef4444] text-white p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore AI Tools?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Join thousands of creators discovering the best AI generators for their projects.
        </p>
        <a
          href="#tools"
          className="bg-white text-[#ef4444] px-8 py-3 rounded-lg font-semibold hover:bg-[#1a1a1a] hover:text-white transition inline-block"
        >
          Get Started Free
        </a>
      </section>
    </div>
  );
}
