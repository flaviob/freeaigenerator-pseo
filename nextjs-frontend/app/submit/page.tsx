'use client';

import { useState } from 'react';
import { Metadata } from 'next';

export default function SubmitPage() {
  const [formData, setFormData] = useState({
    toolName: '',
    toolUrl: '',
    category: '',
    description: '',
    yourName: '',
    yourEmail: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // For now, just show success message
    // In production, you'd send this to your backend/email
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        toolName: '',
        toolUrl: '',
        category: '',
        description: '',
        yourName: '',
        yourEmail: '',
      });
    }, 3000);
  };

  return (
    <div className="max-w-[800px] mx-auto px-8 py-12">
      <h1 className="text-4xl font-bold mb-4 text-white">Submit an AI Tool</h1>
      <p className="text-[#9ca3af] mb-8">
        Know an amazing AI generator that should be featured on FreeAIGenerator.co? Let us know! We review all submissions and add the best tools to our platform.
      </p>

      <div className="bg-[#1a1a1a] p-8 rounded-xl border border-[#2a2a2a]">
        {submitted ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
            <p className="text-[#9ca3af]">
              We've received your submission and will review it soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tool Name */}
            <div>
              <label className="block text-sm font-medium text-[#d1d5db] mb-2">
                Tool Name *
              </label>
              <input
                type="text"
                required
                value={formData.toolName}
                onChange={(e) => setFormData({...formData, toolName: e.target.value})}
                placeholder="e.g., DALL-E 3"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ef4444] focus:ring-1 focus:ring-[#ef4444]"
              />
            </div>

            {/* Tool URL */}
            <div>
              <label className="block text-sm font-medium text-[#d1d5db] mb-2">
                Tool Website URL *
              </label>
              <input
                type="url"
                required
                value={formData.toolUrl}
                onChange={(e) => setFormData({...formData, toolUrl: e.target.value})}
                placeholder="https://example.com"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ef4444] focus:ring-1 focus:ring-[#ef4444]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-[#d1d5db] mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#ef4444] focus:ring-1 focus:ring-[#ef4444]"
              >
                <option value="">Select a category</option>
                <option value="image">Image Generator</option>
                <option value="video">Video Generator</option>
                <option value="text">Text Generator</option>
                <option value="audio">Audio Generator</option>
                <option value="design">Design Generator</option>
                <option value="character">Character Generator</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#d1d5db] mb-2">
                Description *
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Tell us about this tool. What makes it special? What can it do?"
                rows={5}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ef4444] focus:ring-1 focus:ring-[#ef4444] resize-none"
              />
            </div>

            {/* Your Name */}
            <div>
              <label className="block text-sm font-medium text-[#d1d5db] mb-2">
                Your Name (optional)
              </label>
              <input
                type="text"
                value={formData.yourName}
                onChange={(e) => setFormData({...formData, yourName: e.target.value})}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ef4444] focus:ring-1 focus:ring-[#ef4444]"
              />
            </div>

            {/* Your Email */}
            <div>
              <label className="block text-sm font-medium text-[#d1d5db] mb-2">
                Your Email (optional)
              </label>
              <input
                type="email"
                value={formData.yourEmail}
                onChange={(e) => setFormData({...formData, yourEmail: e.target.value})}
                placeholder="john@example.com"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ef4444] focus:ring-1 focus:ring-[#ef4444]"
              />
              <p className="text-xs text-[#6b7280] mt-1">
                We'll only use this to follow up if we have questions about your submission.
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#ef4444] hover:bg-[#dc2626] text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Submit Tool for Review
            </button>

            <p className="text-xs text-[#6b7280] text-center">
              By submitting, you agree that we may feature this tool on FreeAIGenerator.co
            </p>
          </form>
        )}
      </div>

      <div className="mt-8 bg-[#1a1a1a] p-6 rounded-xl border border-[#2a2a2a]">
        <h2 className="text-lg font-semibold text-white mb-3">What Happens Next?</h2>
        <ol className="space-y-2 text-[#9ca3af] text-sm">
          <li className="flex items-start">
            <span className="text-[#ef4444] font-bold mr-2">1.</span>
            <span>We review your submission within 2-3 business days</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ef4444] font-bold mr-2">2.</span>
            <span>If approved, we test the tool thoroughly</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ef4444] font-bold mr-2">3.</span>
            <span>We create a comprehensive review and comparison</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#ef4444] font-bold mr-2">4.</span>
            <span>The tool gets featured on FreeAIGenerator.co</span>
          </li>
        </ol>
      </div>
    </div>
  );
}
