import { getCategoryPages } from '@/lib/strapi';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Tool Categories - Browse by Type | Free AI Generator',
  description: 'Explore AI tools organized by category: Image, Video, Text, Audio, Design and more. Find the best AI generators for your specific needs.',
};

export default async function CategoriesPage() {
  const allCategories = await getCategoryPages(100);

  // Group categories by their main category type
  const categoryGroups = {
    image: allCategories.filter(c => c.category === 'image'),
    video: allCategories.filter(c => c.category === 'video'),
    text: allCategories.filter(c => c.category === 'text'),
    audio: allCategories.filter(c => c.category === 'audio'),
    design: allCategories.filter(c => c.category === 'design'),
    character: allCategories.filter(c => c.category === 'character'),
    photo: allCategories.filter(c => c.category === 'photo'),
    other: allCategories.filter(c => c.category === 'other'),
  };

  const categoryConfig = [
    { key: 'image', label: 'Image Generators', emoji: '🎨', description: 'AI-powered image creation and editing tools' },
    { key: 'video', label: 'Video Generators', emoji: '🎬', description: 'Create and edit videos with AI assistance' },
    { key: 'text', label: 'Text Generators', emoji: '✍️', description: 'AI writing assistants and content generators' },
    { key: 'audio', label: 'Audio Generators', emoji: '🎵', description: 'AI voice, music, and sound generation' },
    { key: 'design', label: 'Design Tools', emoji: '🎨', description: 'AI-powered design and creative tools' },
    { key: 'character', label: 'Character & Name Generators', emoji: '👤', description: 'Create characters, names, and personas' },
    { key: 'photo', label: 'Photo Tools', emoji: '📸', description: 'AI photo enhancement and editing' },
    { key: 'other', label: 'Other Generators', emoji: '⚡', description: 'Specialized AI tools and utilities' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-white">
            Browse AI Tools by Category
          </h1>
          <p className="text-xl text-[#d1d5db] max-w-3xl mx-auto">
            Discover the best AI generators organized by type. From image creation to video editing,
            find the perfect AI tool for your creative needs.
          </p>
        </section>

        {/* Category Sections */}
        {categoryConfig.map((config) => {
          const categories = categoryGroups[config.key as keyof typeof categoryGroups];

          if (!categories || categories.length === 0) return null;

          return (
            <section key={config.key} className="mb-16">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-5xl">{config.emoji}</span>
                <div>
                  <h2 className="text-3xl font-bold text-white">{config.label}</h2>
                  <p className="text-[#9ca3af] mt-1">{config.description}</p>
                </div>
              </div>

              {/* Category Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((page: any) => (
                  <a
                    key={page.id}
                    href={`/category/${page.slug}`}
                    className="group p-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:shadow-lg hover:border-[#ef4444] transition-all"
                  >
                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-3 py-1 bg-[#fbbf24] text-[#0a0a0a] rounded-full text-xs font-semibold capitalize">
                        {page.listType}
                      </span>
                      {page.isFreeOnly && (
                        <span className="px-3 py-1 bg-[#10b981] text-white rounded-full text-xs">
                          Free
                        </span>
                      )}
                      {page.year && (
                        <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-[#9ca3af] rounded-full text-xs">
                          {page.year}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#ef4444] transition">
                      {page.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#9ca3af] text-sm mb-4 line-clamp-2">
                      {page.metaDescription}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-[#6b7280]">
                      <span>{page.estimatedReadTime} min read</span>
                      {page.lastUpdated && (
                        <span>{new Date(page.lastUpdated).toLocaleDateString()}</span>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </section>
          );
        })}

        {/* Empty State */}
        {allCategories.length === 0 && (
          <div className="bg-[#1a1a1a] p-12 rounded-lg text-center border border-[#2a2a2a]">
            <p className="text-[#9ca3af] text-lg">No categories available yet. Check back soon!</p>
          </div>
        )}

        {/* CTA Section */}
        <section className="bg-[#ef4444] text-white p-12 rounded-lg text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Explore all our AI tools or search for specific generators to find the perfect match for your project.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/"
              className="bg-white text-[#ef4444] px-8 py-3 rounded-lg font-semibold hover:bg-[#1a1a1a] hover:text-white transition inline-block"
            >
              Browse All Tools
            </a>
            <a
              href="/tools"
              className="bg-[#1a1a1a] border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#ef4444] transition inline-block"
            >
              View Tool Guides
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
