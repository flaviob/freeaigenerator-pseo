import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Free AI Generator - Best AI Tools & Generators 2026',
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
        <header className="bg-[#1a1a1a] text-white py-4 shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
          <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between">
            <a href="/" className="text-2xl font-bold">
              FreeAIGenerator
            </a>
            <nav className="flex gap-8">
              <a href="/" className="opacity-90 hover:opacity-100 transition-opacity">Home</a>
              <a href="/tools" className="opacity-90 hover:opacity-100 transition-opacity">Tools</a>
              <a href="/blog" className="opacity-90 hover:opacity-100 transition-opacity">Blog</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-[#1f2937] text-[#9ca3af] py-8 mt-16 text-center">
          <p>&copy; 2026 FreeAIGenerator. All rights reserved.</p>
        </footer>
      </body>
    </html>
  )
}
