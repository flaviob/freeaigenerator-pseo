interface ToolCardProps {
  tool: {
    name: string;
    description: string;
    pros?: string[];
    cons?: string[];
    rating?: number;
    pricing?: string;
    ctaText?: string;
    ctaUrl?: string;
    isFree?: boolean;
    category?: string;
  };
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-6 hover:border-[#ef4444] transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-2xl font-bold text-white">{tool.name}</h3>
        {tool.rating && (
          <div className="flex items-center gap-1 bg-[#2a2a2a] px-3 py-1 rounded-full">
            <span className="text-[#fbbf24] text-lg">★</span>
            <span className="text-white font-semibold">{tool.rating}</span>
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="flex gap-2 mb-4">
        {tool.isFree && (
          <span className="px-3 py-1 bg-[#10b981] text-white rounded-full text-sm font-semibold">
            Free
          </span>
        )}
        {tool.category && (
          <span className="px-3 py-1 bg-[#ef4444] text-white rounded-full text-sm font-semibold capitalize">
            {tool.category}
          </span>
        )}
        {tool.pricing && (
          <span className="px-3 py-1 bg-[#2a2a2a] text-[#9ca3af] rounded-full text-sm">
            {tool.pricing}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-[#d1d5db] mb-4 leading-relaxed">{tool.description}</p>

      {/* Pros & Cons */}
      {(tool.pros || tool.cons) && (
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {tool.pros && tool.pros.length > 0 && (
            <div>
              <h4 className="text-[#10b981] font-semibold mb-2 flex items-center gap-2">
                <span>✓</span> Pros
              </h4>
              <ul className="space-y-1">
                {tool.pros.slice(0, 3).map((pro, idx) => (
                  <li key={idx} className="text-[#9ca3af] text-sm">
                    • {pro}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tool.cons && tool.cons.length > 0 && (
            <div>
              <h4 className="text-[#ef4444] font-semibold mb-2 flex items-center gap-2">
                <span>✗</span> Cons
              </h4>
              <ul className="space-y-1">
                {tool.cons.slice(0, 3).map((con, idx) => (
                  <li key={idx} className="text-[#9ca3af] text-sm">
                    • {con}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* CTA Button */}
      {tool.ctaUrl && (
        <a
          href={tool.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#ef4444] text-white text-center py-3 rounded-lg font-semibold hover:bg-[#dc2626] transition"
        >
          {tool.ctaText || `Try ${tool.name}`}
        </a>
      )}
    </div>
  );
}
