import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Free AI Generator - Best AI Tools & Generators',
  description: 'Discover the best free AI generators for images, videos, text, and more. Compare tools, read reviews, and find the perfect AI solution for your needs.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <nav className="flex items-center justify-between">
              <a href="/" className="text-2xl font-bold text-blue-600">
                Free AI Generator
              </a>
              <div className="flex gap-6">
                <a href="/" className="hover:text-blue-600">Home</a>
                <a href="/best-ai-tools" className="hover:text-blue-600">Tools</a>
                <a href="/blog" className="hover:text-blue-600">Blog</a>
              </div>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-900 text-white mt-20">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Free AI Generator</h3>
                <p className="text-gray-400">Your ultimate guide to AI tools and generators</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Popular Categories</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/category/image" className="hover:text-white">Image Generators</a></li>
                  <li><a href="/category/video" className="hover:text-white">Video Generators</a></li>
                  <li><a href="/category/text" className="hover:text-white">Text Generators</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/about" className="hover:text-white">About</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                  <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2025 Free AI Generator. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
