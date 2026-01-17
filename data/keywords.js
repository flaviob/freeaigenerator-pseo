export const keywords = [
  // Primary Tool Keywords
  "ai image generator",
  "ai generator",
  "ai video generator",
  "ai photo generator",
  "ai picture generator",
  "ai art generator",
  "ai voice generator",
  "ai logo generator",
  "ai story generator",
  "ai text generator",
  "ai music generator",
  "ai song generator",
  "ai paragraph generator",
  "ai headshot generator",
  "ai tattoo generator",
  "ai email generator",
  "ai character generator",
  "ai drawing generator",
  "ai cover letter generator",
  "ai nude generator",
  "ai sentence generator",
  "ai name generator",
  "ai business name generator",
  
  // Free Variants
  "free ai image generator",
  "ai image generator free",
  "free ai video generator",
  "ai video generator free",
  "best free ai image generator",
  "ai picture generator free",
  "free ai art generator",
  "ai logo generator free",
  "free ai voice generator",
  "ai art generator free",
  "ai voice generator free",
  "free ai photo generator",
  "ai generator free",
  "free ai headshot generator",
  "free ai generator",
  
  // Best Variants
  "best ai image generator",
  "best ai video generator",
  
  // Branded
  "bing ai image generator",
  "microsoft ai image generator",
  "google ai image generator",
  
  // Specific Features
  "ai image generator from image",
  "image generator ai",
  "image ai generator",
  "logo generator ai",
  
  // Tools/Checkers
  "ai generator text",
  "ai generator checker",
  "ai porn generator"
];

export const toolCategories = [
  {
    name: "Image Generators",
    slug: "image",
    description: "AI-powered tools to create images, photos, and artwork",
    keywords: [
      "ai image generator",
      "free ai image generator",
      "ai image generator free",
      "best ai image generator",
      "ai photo generator",
      "ai picture generator",
      "ai art generator",
      "bing ai image generator",
      "microsoft ai image generator",
      "google ai image generator",
      "ai image generator from image"
    ]
  },
  {
    name: "Video Generators",
    slug: "video",
    description: "Create videos with AI technology",
    keywords: [
      "ai video generator",
      "free ai video generator",
      "ai video generator free",
      "best ai video generator"
    ]
  },
  {
    name: "Text Generators",
    slug: "text",
    description: "Generate text content with AI",
    keywords: [
      "ai text generator",
      "ai generator text",
      "ai paragraph generator",
      "ai sentence generator",
      "ai story generator",
      "ai email generator",
      "ai cover letter generator"
    ]
  },
  {
    name: "Audio Generators",
    slug: "audio",
    description: "AI voice and music generation",
    keywords: [
      "ai voice generator",
      "free ai voice generator",
      "ai voice generator free",
      "ai music generator",
      "ai song generator"
    ]
  },
  {
    name: "Design Generators",
    slug: "design",
    description: "AI-powered design tools",
    keywords: [
      "ai logo generator",
      "ai logo generator free",
      "logo generator ai",
      "ai drawing generator",
      "ai tattoo generator"
    ]
  },
  {
    name: "Character & Name Generators",
    slug: "character",
    description: "Generate characters, names, and personas",
    keywords: [
      "ai character generator",
      "ai name generator",
      "ai business name generator"
    ]
  },
  {
    name: "Photo Tools",
    slug: "photo",
    description: "AI photo enhancement and generation",
    keywords: [
      "ai headshot generator",
      "free ai headshot generator"
    ]
  },
  {
    name: "Other Generators",
    slug: "other",
    description: "Miscellaneous AI generation tools",
    keywords: [
      "ai generator",
      "free ai generator",
      "ai generator free",
      "ai generator checker"
    ]
  }
];

// Popular AI Tools Database
export const aiTools = [
  {
    name: "Midjourney",
    category: "image",
    isPaid: true,
    description: "Premium AI art generator",
    features: ["High quality", "Discord-based", "Multiple styles"]
  },
  {
    name: "DALL-E 3",
    category: "image",
    isPaid: true,
    description: "OpenAI's image generator",
    features: ["Photorealistic", "Text integration", "Safe content"]
  },
  {
    name: "Stable Diffusion",
    category: "image",
    isPaid: false,
    description: "Open-source AI image generator",
    features: ["Free", "Customizable", "Local hosting"]
  },
  {
    name: "Leonardo.AI",
    category: "image",
    isPaid: false,
    description: "Free AI art generator with daily credits",
    features: ["Free tier", "Multiple models", "Easy to use"]
  },
  {
    name: "Runway ML",
    category: "video",
    isPaid: true,
    description: "AI video generation platform",
    features: ["Text to video", "Image to video", "Professional quality"]
  },
  {
    name: "Pika Labs",
    category: "video",
    isPaid: false,
    description: "Free AI video generator",
    features: ["Discord-based", "Quick generation", "Community"]
  },
  {
    name: "ElevenLabs",
    category: "audio",
    isPaid: true,
    description: "AI voice cloning and generation",
    features: ["Realistic voices", "Voice cloning", "Multiple languages"]
  },
  {
    name: "ChatGPT",
    category: "text",
    isPaid: false,
    description: "AI text generation",
    features: ["Conversational", "Free tier", "Multiple use cases"]
  },
  {
    name: "Looka",
    category: "design",
    isPaid: true,
    description: "AI logo generator",
    features: ["Brand kit", "Professional logos", "Multiple formats"]
  },
  {
    name: "Copy.ai",
    category: "text",
    isPaid: false,
    description: "AI copywriting tool",
    features: ["Marketing copy", "Free tier", "Multiple templates"]
  }
];

export default { keywords, toolCategories, aiTools };
