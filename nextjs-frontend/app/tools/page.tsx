import { getToolPages } from '@/lib/strapi';
import { Metadata } from 'next';
import { generateBreadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'AI Tool Guides & Reviews | Free AI Generator',
  description: 'Comprehensive guides and reviews for AI generators. Learn how to use image, video, text, audio, and design AI tools effectively.',
};

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Collection page schema
const collectionSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'AI Tool Guides & Reviews',
  description: 'Comprehensive guides and reviews for AI generators.',
  url: 'https://freeaigenerator.co/tools',
};

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://freeaigenerator.co' },
  { name: 'Tools', url: 'https://freeaigenerator.co/tools' },
]);

export default async function ToolsPage() {
  const allTools = await getToolPages(100);

  // Group tools by category
  const toolGroups = {
    image: allTools.filter(t => t.category === 'image'),
    video: allTools.filter(t => t.category === 'video'),
    text: allTools.filter(t => t.category === 'text'),
    audio: allTools.filter(t => t.category === 'audio'),
    design: allTools.filter(t => t.category === 'design'),
    character: allTools.filter(t => t.category === 'character'),
    photo: allTools.filter(t => t.category === 'photo'),
    other: allTools.filter(t => t.category === 'other'),
  };

  const categoryConfig = [
    { key: 'image', label: 'Image Generators', emoji: '🎨' },
    { key: 'video', label: 'Video Generators', emoji: '🎬' },
    { key: 'text', label: 'Text Generators', emoji: '✍️' },
    { key: 'audio', label: 'Audio Generators', emoji: '🎵' },
    { key: 'design', label: 'Design Tools', emoji: '🎨' },
    { key: 'character', label: 'Character Generators', emoji: '👤' },
    { key: 'photo', label: 'Photo Tools', emoji: '📸' },
    { key: 'other', label: 'Other Tools', emoji: '⚡' },
  ];

  // Stats
  const freeTools = allTools.filter(t => t.isFree);
  const categories = Object.keys(toolGroups).filter(
    key => toolGroups[key as keyof typeof toolGroups].length > 0
  );

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 text-white">
            AI Tool Guides & Reviews
          </h1>
          <p className="text-xl text-[#d1d5db] max-w-3xl mx-auto mb-8">
            In-depth guides and reviews for the best AI generators. Learn how each tool works,
            what it's best for, and how to get started.
          </p>

          {/* Stats Bar */}
          <div className="flex justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#ef4444]">{allTools.length}</div>
              <div className="text-sm text-[#9ca3af] mt-1">Total Guides</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#10b981]">{freeTools.length}</div>
              <div className="text-sm text-[#9ca3af] mt-1">Free Tools</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#fbbf24]">{categories.length}</div>
              <div className="text-sm text-[#9ca3af] mt-1">Categories</div>
            </div>
          </div>
        </section>

        {/* Filter/Sort Bar */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div className="flex gap-2 flex-wrap">
            <button className="px-4 py-2 bg-[#ef4444] text-white rounded-lg text-sm font-semibold">
              All Tools
            </button>
            <button className="px-4 py-2 bg-[#1a1a1a] border border-[#2a2a2a] text-[#9ca3af] rounded-lg text-sm hover:border-[#ef4444] hover:text-white transition">
              Free Only
            </button>
          </div>
        </div>

        {/* Tool Sections by Category */}
        {categoryConfig.map((config) => {
          const tools = toolGroups[config.key as keyof typeof toolGroups];

          if (!tools || tools.length === 0) return null;

          return (
            <section key={config.key} className="mb-16">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{config.emoji}</span>
                <h2 className="text-3xl font-bold text-white">{config.label}</h2>
                <span className="px-3 py-1 bg-[#1a1a1a] text-[#9ca3af] rounded-full text-sm">
                  {tools.length} {tools.length === 1 ? 'guide' : 'guides'}
                </span>
              </div>

              {/* Tool Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool: any) => (
                  <a
                    key={tool.id}
                    href={`/${tool.slug}`}
                    className="group p-6 bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg hover:shadow-lg hover:border-[#ef4444] transition-all"
                  >
                    {/* Badges */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-3 py-1 bg-[#ef4444] text-white rounded-full text-xs font-semibold capitalize">
                        {tool.category}
                      </span>
                      {tool.isFree && (
                        <span className="px-3 py-1 bg-[#10b981] text-white rounded-full text-xs">
                          Free
                        </span>
                      )}
                      {tool.difficulty && (
                        <span className="px-3 py-1 bg-[#1a1a1a] border border-[#2a2a2a] text-[#9ca3af] rounded-full text-xs capitalize">
                          {tool.difficulty}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#ef4444] transition">
                      {tool.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#9ca3af] text-sm mb-4 line-clamp-2">
                      {tool.metaDescription}
                    </p>

                    {/* Meta Info */}
                    {tool.lastUpdated && (
                      <div className="text-xs text-[#6b7280]">
                        <span>{new Date(tool.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </section>
          );
        })}

        {/* Empty State */}
        {allTools.length === 0 && (
          <div className="bg-[#1a1a1a] p-12 rounded-lg text-center border border-[#2a2a2a]">
            <p className="text-[#9ca3af] text-lg">No tools available yet. Check back soon!</p>
          </div>
        )}

        {/* CTA Section */}
        <section className="bg-[#ef4444] text-white p-12 rounded-lg text-center mt-16">
          <h2 className="text-3xl font-bold mb-4">Looking for Comparisons?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Check out our category pages for curated lists and detailed comparisons of the best AI tools.
          </p>
          <a
            href="/categories"
            className="bg-white text-[#ef4444] px-8 py-3 rounded-lg font-semibold hover:bg-[#1a1a1a] hover:text-white transition inline-block"
          >
            Browse Categories
          </a>
        </section>
      </div>
    </div>
    </>
  );
}
