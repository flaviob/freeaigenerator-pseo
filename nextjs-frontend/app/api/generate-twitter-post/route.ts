import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { topic, tone, format } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Anthropic Claude API call
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

    if (!anthropicApiKey) {
      console.error('ANTHROPIC_API_KEY not configured');
      return NextResponse.json(
        { error: 'API not configured' },
        { status: 500 }
      );
    }

    const toneInstructions = {
      professional: 'Use a professional, authoritative tone suitable for business and thought leadership.',
      casual: 'Use a casual, friendly tone like talking to a friend.',
      funny: 'Use humor and wit. Be clever and entertaining.',
      inspirational: 'Use an inspirational, motivational tone that uplifts readers.',
      educational: 'Use a clear, teaching tone that explains concepts well.'
    };

    const systemPrompt = format === 'thread'
      ? `You are an expert Twitter thread writer. Create engaging Twitter threads that hook readers and provide value. Each tweet in the thread should be under 280 characters.`
      : `You are an expert tweet writer. Create engaging, viral-worthy tweets that drive engagement. Keep each tweet under 280 characters.`;

    const userPrompt = format === 'thread'
      ? `Create a Twitter thread (3-5 tweets) about: ${topic}\n\nTone: ${toneInstructions[tone as keyof typeof toneInstructions]}\n\nFormat: Return ONLY the tweets, one per line, numbered (1/, 2/, etc). Each tweet must be under 280 characters. Start with a strong hook in the first tweet.`
      : `Create 3 different tweet variations about: ${topic}\n\nTone: ${toneInstructions[tone as keyof typeof toneInstructions]}\n\nFormat: Return ONLY the tweets, one per line. Each tweet must be under 280 characters. Make them engaging and varied.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022', // Using Haiku for speed and cost efficiency
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.8,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      return NextResponse.json(
        { error: 'Failed to generate posts' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const generatedText = data.content[0]?.text || '';

    // Parse the response into individual tweets
    let posts: string[];

    if (format === 'thread') {
      // Split thread tweets (numbered format like "1/ tweet text")
      posts = generatedText
        .split('\n')
        .filter((line: string) => line.trim())
        .map((line: string) => line.replace(/^\d+\/?\s*/, '').trim())
        .filter((tweet: string) => tweet.length > 0);
    } else {
      // Split individual tweets
      posts = generatedText
        .split('\n')
        .filter((line: string) => line.trim())
        .filter((tweet: string) => tweet.length > 0 && tweet.length <= 280);
    }

    return NextResponse.json({ posts });

  } catch (error) {
    console.error('Error generating Twitter posts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
