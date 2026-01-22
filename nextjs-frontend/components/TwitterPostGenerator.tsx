'use client';

import { useState } from 'react';

export default function TwitterPostGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('professional');
  const [format, setFormat] = useState('single');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState('');

  const generatePosts = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch('/api/generate-twitter-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, tone, format }),
      });

      if (!response.ok) {
        throw new Error('Generation failed');
      }

      const data = await response.json();
      setResults(data.posts);
    } catch (err) {
      setError('Failed to generate posts. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="bg-gradient-to-br from-[#ef4444] to-[#dc2626] p-8 rounded-xl mb-12 shadow-lg">
      <div className="bg-[#1a1a1a] rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          ✨ Try It Free - Generate Twitter Posts Now
        </h2>
        <p className="text-[#9ca3af] mb-6">
          Enter your topic and let AI create engaging tweets instantly. No signup required.
        </p>

        {/* Input Section */}
        <div className="space-y-4 mb-6">
          {/* Topic Input */}
          <div>
            <label className="block text-sm font-medium text-[#d1d5db] mb-2">
              What do you want to tweet about?
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g., The future of AI in healthcare, My new product launch, Tips for productivity..."
              className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white placeholder-[#6b7280] focus:outline-none focus:border-[#ef4444] focus:ring-1 focus:ring-[#ef4444] resize-none"
              rows={3}
            />
          </div>

          {/* Options Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tone Select */}
            <div>
              <label className="block text-sm font-medium text-[#d1d5db] mb-2">
                Tone
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#ef4444] focus:ring-1 focus:ring-[#ef4444]"
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="funny">Funny</option>
                <option value="inspirational">Inspirational</option>
                <option value="educational">Educational</option>
              </select>
            </div>

            {/* Format Select */}
            <div>
              <label className="block text-sm font-medium text-[#d1d5db] mb-2">
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:border-[#ef4444] focus:ring-1 focus:ring-[#ef4444]"
              >
                <option value="single">Single Tweet</option>
                <option value="thread">Thread (3-5 tweets)</option>
              </select>
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generatePosts}
            disabled={loading}
            className="w-full bg-[#ef4444] hover:bg-[#dc2626] disabled:bg-[#6b7280] text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : '🚀 Generate Twitter Posts'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 text-red-200 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">
              Your Generated {format === 'thread' ? 'Thread' : 'Tweets'}:
            </h3>
            {format === 'single' ? (
              results.map((post, index) => (
                <div
                  key={index}
                  className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4 relative group"
                >
                  <div className="text-[#e5e7eb] whitespace-pre-wrap mb-3">
                    {post}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#6b7280]">
                      {post.length} characters
                    </span>
                    <button
                      onClick={() => copyToClipboard(post)}
                      className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#d1d5db] text-sm px-3 py-1 rounded transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg p-4">
                {results.map((tweet, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#ef4444] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <div className="text-[#e5e7eb] whitespace-pre-wrap mb-2">
                          {tweet}
                        </div>
                        <span className="text-xs text-[#6b7280]">
                          {tweet.length} characters
                        </span>
                      </div>
                    </div>
                    {index < results.length - 1 && (
                      <div className="border-t border-[#2a2a2a] my-4"></div>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => copyToClipboard(results.join('\n\n'))}
                  className="w-full bg-[#2a2a2a] hover:bg-[#3a3a3a] text-[#d1d5db] text-sm px-3 py-2 rounded transition-colors mt-4"
                >
                  Copy Entire Thread
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
