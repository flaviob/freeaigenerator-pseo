#!/usr/bin/env node
const STRAPI_URL = 'https://freeaigenerator-pseo-production.up.railway.app';
const STRAPI_API_TOKEN = '8d9fa930b45fcfd8a4981ead1a503eb875a26001729d1ada9af94e0d511675e8066090a8a584b199416110cc6c52defd4918c968bebf795fb476d6ec17afec990f6ddb4a33e7b2eda80422cb8bd53112dd4721d2bd4b65e8b12bafc1964e3f97965b8af6e58517e9178e1aeaebf9fa7bd525edb121135e4cbd07899bfaa09fe9';

// IDs to delete (from the API response earlier)
const articlesToDelete = [
  { id: 5, documentId: 'lxgjuyfghyejn3or99pbgwab', title: 'AI Video Generator' },
  { id: 7, documentId: 'v8gzn4wtezqflpzyckcdp2we', title: 'Free AI Generator' }
];

const newArticles = [
  {
    title: "AI Video Generator",
    slug: "ai-video-generator",
    category: "video",
    primaryKeyword: "ai video generator",
    metaTitle: "AI Video Generator - Create Videos with AI",
    metaDescription: "Discover the best AI video generators to create stunning videos from text. Compare free and paid tools, features, and get started today.",
    introduction: "<p>AI video generators have revolutionized content creation, allowing anyone to create professional-quality videos from simple text descriptions. Whether you're a content creator, marketer, or business owner, AI video tools can save you time and money while producing engaging visual content.</p>",
    whatIsIt: "<p>An AI video generator is a tool that uses artificial intelligence to create videos from text prompts, images, or other videos. These tools leverage advanced machine learning models to generate realistic video content without requiring traditional video editing skills or expensive equipment.</p>\n\n<p>The technology works by analyzing vast datasets of videos to understand motion, composition, and visual storytelling, then applying this knowledge to create new video content based on your specifications.</p>",
    howItWorks: "<p>AI video generators use diffusion models and neural networks trained on millions of videos to understand motion, composition, and visual storytelling:</p>\n\n<ol>\n<li>You provide a text prompt or starting image</li>\n<li>The AI processes your input and references its training data</li>\n<li>The model generates video frames that match your vision</li>\n<li>Post-processing adds coherence and quality enhancements</li>\n</ol>",
    features: ["Text-to-video generation", "Image-to-video transformation", "Multiple style options", "HD and 4K output", "Scene transitions", "Camera movements"],
    useCases: "<ul>\n<li><strong>Marketing & Advertising:</strong> Create product demos, explainer videos, and social media ads</li>\n<li><strong>Content Creation:</strong> Generate YouTube videos, TikToks, and Instagram Reels</li>\n<li><strong>Education:</strong> Produce instructional videos and course content</li>\n<li><strong>Business:</strong> Transform presentations into dynamic video content</li>\n<li><strong>Entertainment:</strong> Create short films, animations, and creative projects</li>\n</ul>",
    topTools: [
      {
        name: "Runway ML",
        features: ["Text to video", "Image to video", "Professional quality", "Real-time collaboration"],
        description: "Industry-leading AI video platform with powerful generation and editing tools"
      },
      {
        name: "Pika Labs",
        features: ["Free to use", "Discord-based", "Quick generation", "Community support"],
        description: "Free AI video generator accessible through Discord with impressive results"
      },
      {
        name: "Synthesia",
        features: ["AI avatars", "120+ languages", "Custom avatars", "Screen recording"],
        description: "Specialized in AI avatar videos for training and presentations"
      }
    ],
    prosAndCons: {
      pros: [
        "Create videos without filming",
        "Save time and production costs",
        "No technical skills required",
        "Quick iterations and revisions",
        "Consistent quality output"
      ],
      cons: [
        "Limited video length on most tools",
        "Can be expensive for high volume",
        "Less control than traditional editing",
        "Watermarks on free plans",
        "Quality varies between tools"
      ]
    },
    faq: [
      {
        question: "Are AI video generators free?",
        answer: "Many AI video generators offer free tiers with limited features or watermarks. Tools like Pika Labs are free to use, while premium options like Runway ML require paid subscriptions for full access."
      },
      {
        question: "How long does it take to generate a video?",
        answer: "Generation time varies by tool and video length, typically ranging from 30 seconds to several minutes. Shorter clips generate faster, while longer or more complex videos take more time."
      },
      {
        question: "Can I use AI-generated videos commercially?",
        answer: "Most AI video generators allow commercial use, but it's important to review each tool's terms of service. Some free tiers may restrict commercial usage, while paid plans typically include commercial rights."
      }
    ],
    conclusion: "<p>AI video generation technology is advancing rapidly, making professional video creation accessible to everyone. Whether you're a marketer, educator, or content creator, AI video tools can save time and money while producing engaging visual content.</p>\n\n<p>Start with free options like Pika Labs to understand the technology, then invest in premium tools like Runway ML for professional projects. With practice, you'll unlock amazing creative potential.</p>",
    isFree: false,
    difficulty: "beginner",
    estimatedReadTime: 8,
    lastUpdated: new Date().toISOString().split('T')[0]
  },
  {
    title: "Free AI Generator",
    slug: "free-ai-generator",
    category: "other",
    primaryKeyword: "free ai generator",
    metaTitle: "Free AI Generator - Best Free AI Tools 2026",
    metaDescription: "Discover the best free AI generators for images, videos, text, and more. Compare features, quality, and find the perfect free AI tool for your needs.",
    introduction: "<p>Free AI generators have democratized artificial intelligence, making powerful creative tools accessible to everyone. Whether you need to generate images, videos, text, or music, there are excellent free options available that rival paid alternatives.</p>",
    whatIsIt: "<p>A free AI generator is an artificial intelligence tool that creates content without requiring payment. These tools use machine learning models to generate images, text, videos, audio, and other content from user inputs.</p>\n\n<p>While some have limitations compared to paid versions, many free AI generators offer impressive capabilities and are perfect for learning, personal projects, and even professional work.</p>",
    howItWorks: "<p>Free AI generators use the same core technology as paid alternatives - neural networks trained on vast datasets:</p>\n\n<ol>\n<li>Free access is typically offered through freemium models</li>\n<li>Daily or monthly usage credits limit generation volume</li>\n<li>Open-source models can be run locally for unlimited use</li>\n<li>Community-supported platforms rely on donations and contributions</li>\n</ol>",
    features: ["No cost to start", "Try different AI models", "Learn AI capabilities", "Create without budget", "Community support", "Regular updates"],
    useCases: "<ul>\n<li><strong>Learning & Education:</strong> Experiment with AI without financial commitment</li>\n<li><strong>Personal Projects:</strong> Create content for hobbies and passion projects</li>\n<li><strong>Portfolio Building:</strong> Generate samples for professional portfolios</li>\n<li><strong>Small Business:</strong> Test AI capabilities before investing in paid tools</li>\n<li><strong>Content Creation:</strong> Produce images, videos, and text for blogs and social media</li>\n</ul>",
    topTools: [
      {
        name: "Stable Diffusion",
        features: ["Completely free", "Open source", "Run locally", "Customizable"],
        description: "Leading open-source AI image generator with unlimited free use"
      },
      {
        name: "ChatGPT Free",
        features: ["Conversational AI", "Text generation", "Problem solving", "Large knowledge base"],
        description: "OpenAI's powerful chatbot with generous free tier"
      },
      {
        name: "Leonardo.AI",
        features: ["150 daily credits", "Multiple models", "User-friendly", "High quality"],
        description: "Free AI image generator with daily credits and professional results"
      }
    ],
    prosAndCons: {
      pros: [
        "Zero cost to get started",
        "Try before committing to paid plans",
        "Great for learning and experimentation",
        "Often open source and customizable",
        "Active communities and support"
      ],
      cons: [
        "Usage limitations and caps",
        "Potential watermarks",
        "Slower processing times",
        "Fewer advanced features",
        "Less customer support"
      ]
    },
    faq: [
      {
        question: "Are free AI generators really free?",
        answer: "Yes, many AI generators offer genuinely free tiers, though they may have limitations like daily usage caps, watermarks, or restricted features. Some are completely free and open source like Stable Diffusion."
      },
      {
        question: "Can I use free AI generators for commercial projects?",
        answer: "It depends on the specific tool and its terms of service. Many free AI generators allow commercial use, but some restrict it to paid plans. Always review the licensing terms before using AI-generated content commercially."
      },
      {
        question: "Is the quality of free AI generators good enough?",
        answer: "Modern free AI generators can produce excellent quality results, often comparable to paid alternatives. Tools like Stable Diffusion, ChatGPT's free tier, and Leonardo.AI offer impressive capabilities without cost."
      }
    ],
    conclusion: "<p>The trend toward free AI access continues as open-source models improve and competition drives generous free offerings. Modern free AI generators often produce quality comparable to paid alternatives, making powerful AI tools accessible to everyone regardless of budget.</p>\n\n<p>Start exploring free AI tools today to discover which ones work best for your needs, then scale up to paid options only when necessary.</p>",
    isFree: true,
    difficulty: "beginner",
    estimatedReadTime: 10,
    lastUpdated: new Date().toISOString().split('T')[0]
  }
];

async function deleteArticle(documentId, title) {
  const response = await fetch(`${STRAPI_URL}/api/tool-pages/${documentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    }
  });

  if (!response.ok) {
    throw new Error(`${response.status} - ${await response.text()}`);
  }

  console.log(`✅ Deleted: ${title}`);
}

async function createArticle(articleData) {
  const response = await fetch(`${STRAPI_URL}/api/tool-pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_API_TOKEN}`
    },
    body: JSON.stringify({
      data: {
        ...articleData,
        publishedAt: new Date().toISOString()
      }
    })
  });

  if (!response.ok) {
    throw new Error(`${response.status} - ${await response.text()}`);
  }

  return response.json();
}

async function main() {
  console.log('Step 1: Deleting incomplete articles...\n');

  for (const article of articlesToDelete) {
    try {
      await deleteArticle(article.documentId, article.title);
    } catch (error) {
      console.error(`❌ Error deleting ${article.title}:`, error.message);
    }
  }

  console.log('\nStep 2: Creating new articles with full template...\n');

  for (const article of newArticles) {
    try {
      console.log(`Creating: ${article.title}`);
      const result = await createArticle(article);
      console.log(`✅ Published: ${article.title}`);
      console.log(`   URL: https://pacific-abundance-production-4fff.up.railway.app/${article.slug}\n`);
    } catch (error) {
      console.error(`❌ Error creating ${article.title}:`, error.message, '\n');
    }
  }

  console.log('Done! All articles recreated with full template.');
}

main().catch(console.error);
