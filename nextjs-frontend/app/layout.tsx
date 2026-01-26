import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '✨ FreeAIGenerator.co - Best AI Tools & Generators 2026',
  description: 'Discover the best free AI generators for images, videos, text, and more. Compare tools, read reviews, and find the perfect AI solution for your needs.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'FreeAIGenerator.co - Best AI Tools & Generators',
    description: 'Discover the best free AI generators for images, videos, text, and more.',
    url: 'https://freeaigenerator.co',
    siteName: 'FreeAIGenerator.co',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreeAIGenerator.co - Best AI Tools',
    description: 'Discover the best free AI generators for images, videos, text, and more.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-[#1a1a1a] text-white py-4 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
          <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold flex items-center gap-2">
              <span>✨</span>
              <span>FreeAIGenerator.co</span>
            </a>
            <nav className="flex gap-8">
              <a href="/" className="opacity-90 hover:opacity-100 transition-opacity">Home</a>
              <a href="/tools" className="opacity-90 hover:opacity-100 transition-opacity">Tools</a>
              <a href="/categories" className="opacity-90 hover:opacity-100 transition-opacity">Categories</a>
              <a href="/about" className="opacity-90 hover:opacity-100 transition-opacity">About</a>
              <a href="/submit" className="opacity-90 hover:opacity-100 transition-opacity">Submit</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-[#1f2937] text-[#9ca3af] py-12 mt-16">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div>
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <span>✨</span>
                  <span>FreeAIGenerator.co</span>
                </h3>
                <p className="text-sm">
                  Discover the best free AI generators for images, videos, text, and more.
                </p>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-white font-semibold mb-4">Categories</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/category/best-ai-image-generators" className="hover:text-white transition-colors">Image Generators</a></li>
                  <li><a href="/category/best-ai-video-generators" className="hover:text-white transition-colors">Video Generators</a></li>
                  <li><a href="/category/best-ai-text-generators" className="hover:text-white transition-colors">Text Generators</a></li>
                  <li><a href="/category/best-ai-audio-generators" className="hover:text-white transition-colors">Audio Generators</a></li>
                  <li><a href="/category/best-ai-design-generators" className="hover:text-white transition-colors">Design Generators</a></li>
                </ul>
              </div>

              {/* Popular Tools */}
              <div>
                <h4 className="text-white font-semibold mb-4">Popular Tools</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/ai-twitter-post-generator" className="hover:text-white transition-colors">Twitter Post Generator</a></li>
                  <li><a href="/ai-image-generator" className="hover:text-white transition-colors">AI Image Generator</a></li>
                  <li><a href="/ai-video-generator" className="hover:text-white transition-colors">AI Video Generator</a></li>
                  <li><a href="/ai-text-generator" className="hover:text-white transition-colors">AI Text Generator</a></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="/submit" className="hover:text-white transition-colors">Submit a Tool</a></li>
                  <li><a href="/tools" className="hover:text-white transition-colors">All Tools</a></li>
                  <li><a href="/categories" className="hover:text-white transition-colors">All Categories</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-[#374151] pt-8 text-center text-sm">
              <p>&copy; 2026 FreeAIGenerator.co. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
