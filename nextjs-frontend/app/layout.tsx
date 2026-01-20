// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Free AI Generator - Best AI Tools & Generators 2026',
  description: 'Discover the best free AI generators for images, videos, text, music, and more. Compare tools, read expert reviews, and find the perfect AI solution.',
  keywords: 'ai generator, free ai tools, ai image generator, ai video generator, ai text generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold hover:opacity-90 transition">
                🤖 FreeAIGenerator
              </a>
              <nav className="hidden md:flex gap-6">
                <a href="/" className="hover:opacity-80 transition">Home</a>
                <a href="/best/best-ai-image-generators" className="hover:opacity-80 transition">Best Tools</a>
                <a href="/compare/midjourney-vs-dalle" className="hover:opacity-80 transition">Comparisons</a>
              </nav>
            </div>
          </div>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-gray-900 text-gray-300 mt-16">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-white font-bold text-lg mb-4">FreeAIGenerator</h3>
                <p className="text-sm">Your guide to the best AI tools and generators in 2026.</p>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/ai-image-generator" className="hover:text-white transition">Image Generators</a></li>
                  <li><a href="/ai-video-generator" className="hover:text-white transition">Video Generators</a></li>
                  <li><a href="/ai-text-generator" className="hover:text-white transition">Text Generators</a></li>
                  <li><a href="/ai-voice-generator" className="hover:text-white transition">Voice Generators</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/best/best-ai-image-generators" className="hover:text-white transition">Best AI Tools</a></li>
                  <li><a href="/best/best-free-ai-image-generators" className="hover:text-white transition">Free AI Tools</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/privacy" className="hover:text-white transition">Privacy Policy</a></li>
                  <li><a href="/terms" className="hover:text-white transition">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
              <p>&copy; 2026 FreeAIGenerator.com - All rights reserved</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
