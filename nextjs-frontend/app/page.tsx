import { getToolPages } from '@/lib/strapi';

export default async function Home() {
  const toolPages = await getToolPages();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">
          Discover the Best Free AI Generators
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Explore hundreds of AI tools for image generation, video creation, text writing, and more.
          Find the perfect AI solution for your creative projects.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="#tools"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Browse All Tools
          </a>
          <a
            href="/categories"
            className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
          >
            View Categories
          </a>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {['Image', 'Video', 'Text', 'Audio'].map((category) => (
            <a
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="p-6 bg-white border rounded-lg hover:shadow-lg transition text-center"
            >
              <div className="text-4xl mb-3">
                {category === 'Image' && '🎨'}
                {category === 'Video' && '🎬'}
                {category === 'Text' && '✍️'}
                {category === 'Audio' && '🎵'}
              </div>
              <h3 className="text-xl font-semibold mb-2">{category} AI</h3>
              <p className="text-gray-600 text-sm">Explore {category.toLowerCase()} generators</p>
            </a>
          ))}
        </div>
      </section>

      {/* Latest Tools */}
      <section id="tools" className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Latest AI Tools</h2>
        {toolPages && toolPages.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {toolPages.slice(0, 6).map((tool: any) => (
              <a
                key={tool.id}
                href={`/${tool.slug}`}
                className="p-6 bg-white border rounded-lg hover:shadow-lg transition"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm capitalize">
                    {tool.category}
                  </span>
                  {tool.isFree && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      Free
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {tool.metaDescription}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>⏱️ {tool.estimatedReadTime} min read</span>
                  <span>📅 {new Date(tool.lastUpdated).toLocaleDateString()}</span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-12 rounded-lg text-center">
            <p className="text-gray-600 text-lg">No tools available yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Explore AI Tools?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Join thousands of creators discovering the best AI generators for their projects.
        </p>
        <a
          href="#tools"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
        >
          Get Started Free
        </a>
      </section>
    </div>
  );
}
