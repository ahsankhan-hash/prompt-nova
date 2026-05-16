import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { topic, platform, count } = body

    if (!topic || typeof topic !== 'string') {
      return Response.json({ error: 'Topic is required' }, { status: 400 })
    }

    if (!platform || typeof platform !== 'string') {
      return Response.json({ error: 'Platform is required' }, { status: 400 })
    }

    const hashtagCount = count || 20
    const zai = await ZAI.create()

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a social media hashtag expert. Generate ${hashtagCount} trending and relevant hashtags for the given topic on ${platform}. Include a mix of popular, medium, and niche hashtags for optimal reach. Return only the hashtags as a JSON array of strings (with the # symbol), no other text.`,
        },
        {
          role: 'user',
          content: `Generate ${hashtagCount} hashtags for the topic: "${topic}" on ${platform}`,
        },
      ],
    })

    const result = completion.choices[0]?.message?.content || '[]'

    let hashtags: string[]
    try {
      hashtags = JSON.parse(result)
      if (!Array.isArray(hashtags)) {
        hashtags = result.split(/[\s,]+/).filter((t: string) => t.trim().startsWith('#') || t.trim()).map((t: string) => t.startsWith('#') ? t : `#${t}`).filter(Boolean)
      }
    } catch {
      hashtags = result.split(/[\s,]+/).filter((t: string) => t.trim()).map((t: string) => t.startsWith('#') ? t : `#${t}`).filter(Boolean)
    }

    return Response.json({ hashtags: hashtags.slice(0, hashtagCount) })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate hashtags'
    return Response.json({ error: message }, { status: 500 })
  }
}
