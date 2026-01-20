// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  const categories = [
    { name: 'Image Generators', slug: 'ai-image-generator', icon: '🎨', color: 'from-pink-500 to-rose-500' },
    { name: 'Video Generators', slug: 'ai-video-generator', icon: '🎬', color: 'from-purple-500 to-indigo-500' },
    { name: 'Text Generators', slug: 'ai-text-generator', icon: '✍️', color: 'from-blue-500 to-cyan-500' },
    { name: 'Voice Generators', slug: 'ai-voice-generator', icon: '🎙️', color: 'from-green-500 to-emerald-500' },
    { name: 'Logo Generators', slug: 'ai-logo-generator', icon: '🎯', color: 'from-orange-500 to-red-500' },
    { name: 'Music Generators', slug: 'ai-music-generator', icon: '🎵', color: 'from-violet-500 to-purple-500' },
  ];

  const featuredTools = [
    { name: 'Best AI Image Generators', slug: 'best-ai-image-generators', badge: '⭐ Popular' },
    { name: 'Best Free AI Image Generators', slug: 'best-free-ai-image-generators', badge: '🆓 Free' },
    { name: 'Midjourney vs DALL-E', slug: 'midjourney-vs-dalle', badge: '⚔️ Comparison', type: 'compare' },
    { name: 'Top AI Video Generators', slug: 'top-ai-video-generators', badge: '🎬 Video' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Discover the Best AI Generators
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Compare and find the perfect AI tools for image generation, video creation, text writing, and more.
          Expert reviews, comparisons, and free options.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/best/best-ai-image-generators"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Browse Best Tools
          </a>
          <a
            href="/ai-image-generator"
            className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Explore by Category</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.slug}`}
              className="group"
            >
              <div className={`bg-gradient-to-br ${category.color} p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1`}>
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-white/90 text-sm">Explore top tools →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Lists */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Guides</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {featuredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.type === 'compare' ? `/compare/${tool.slug}` : `/best/${tool.slug}`}
              className="group"
            >
              <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-blue-500 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 transition">
                    {tool.name}
                  </h3>
                  <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {tool.badge}
                  </span>
                </div>
                <p className="text-gray-600">Read our comprehensive guide →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12 text-center">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
            <div className="text-gray-600">AI Tools Reviewed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">Comparison Guides</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Free Information</div>
          </div>
        </div>
      </section>
    </div>
  );
}
