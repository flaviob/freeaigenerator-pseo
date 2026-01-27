import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - FreeAIGenerator.co',
  description: 'Learn about FreeAIGenerator.co, your trusted source for discovering and comparing the best free AI tools and generators.',
};

// Organization Schema
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FreeAIGenerator',
  url: 'https://freeaigenerator.com',
  logo: 'https://freeaigenerator.com/logo.png',
  description: 'Your trusted source for discovering and comparing the best free AI tools and generators.',
  sameAs: [],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="max-w-[800px] mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold mb-8 text-white">About FreeAIGenerator.co</h1>

      <div className="bg-[#1a1a1a] p-8 rounded-xl mb-8 border border-[#2a2a2a]">
        <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
        <p className="text-[#d1d5db] mb-4">
          FreeAIGenerator.co is dedicated to helping creators, businesses, and individuals discover the best AI-powered tools and generators available today. We believe that powerful AI technology should be accessible to everyone, regardless of budget or technical expertise.
        </p>
        <p className="text-[#d1d5db]">
          Our platform provides comprehensive, unbiased reviews and comparisons of AI tools across multiple categories including image generation, video creation, text writing, audio production, and more.
        </p>
      </div>

      <div className="bg-[#1a1a1a] p-8 rounded-xl mb-8 border border-[#2a2a2a]">
        <h2 className="text-2xl font-bold text-white mb-4">What We Do</h2>
        <ul className="space-y-3 text-[#d1d5db]">
          <li className="flex items-start">
            <span className="text-[#ef4444] mr-2">✓</span>
            <span><strong>Curate Top AI Tools:</strong> We research and test hundreds of AI generators to bring you the best options</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ef4444] mr-2">✓</span>
            <span><strong>Provide Honest Reviews:</strong> Our reviews are unbiased and based on real testing and user feedback</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ef4444] mr-2">✓</span>
            <span><strong>Compare Features:</strong> We make it easy to compare tools side-by-side to find the perfect fit</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ef4444] mr-2">✓</span>
            <span><strong>Stay Updated:</strong> We continuously update our content as new tools emerge and existing ones evolve</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ef4444] mr-2">✓</span>
            <span><strong>Build Free Generators:</strong> We create our own free AI generators that you can use directly on our site</span>
          </li>
        </ul>
      </div>

      <div className="bg-[#1a1a1a] p-8 rounded-xl mb-8 border border-[#2a2a2a]">
        <h2 className="text-2xl font-bold text-white mb-4">Why Trust Us</h2>
        <p className="text-[#d1d5db] mb-4">
          Our team consists of AI enthusiasts, content creators, and technical experts who personally test and evaluate every tool we recommend. We prioritize:
        </p>
        <ul className="space-y-2 text-[#d1d5db]">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Accuracy:</strong> All information is verified and regularly updated</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Transparency:</strong> We clearly distinguish between free and paid options</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>User Experience:</strong> We focus on tools that are actually useful and easy to use</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span><strong>Community:</strong> We listen to user feedback and continuously improve our recommendations</span>
          </li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] p-8 rounded-xl text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Have a Tool to Suggest?</h2>
        <p className="text-white mb-6">
          Know an amazing AI generator we should feature? We'd love to hear from you!
        </p>
        <a
          href="/submit"
          className="inline-block bg-white text-[#ef4444] font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Submit a Tool
        </a>
      </div>
      </div>
    </>
  );
}
