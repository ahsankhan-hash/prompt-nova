import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { topic, videoDescription } = body

    if (!topic || typeof topic !== 'string') {
      return Response.json({ error: 'Topic is required' }, { status: 400 })
    }

    const zai = await ZAI.create()

    const descContext = videoDescription
      ? `The video description is: "${videoDescription}"`
      : ''

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a YouTube SEO expert who generates optimized tags for maximum discoverability. Generate 30 YouTube tags for the given topic. ${descContext} Include a mix of broad, specific, and long-tail tags. Return only the tags as a JSON array of strings, no other text.`,
        },
        {
          role: 'user',
          content: `Generate YouTube tags for the topic: "${topic}"`,
        },
      ],
    })

    const result = completion.choices[0]?.message?.content || '[]'

    let tags: string[]
    try {
      tags = JSON.parse(result)
      if (!Array.isArray(tags)) {
        tags = result.split(',').map((t: string) => t.trim().replace(/[""]/g, '')).filter(Boolean)
      }
    } catch {
      tags = result.split(',').map((t: string) => t.trim().replace(/[""]/g, '')).filter(Boolean)
    }

    return Response.json({ tags: tags.slice(0, 30) })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate tags'
    return Response.json({ error: message }, { status: 500 })
  }
}
