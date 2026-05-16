import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { platform, tone, keywords } = body

    if (!platform || typeof platform !== 'string') {
      return Response.json({ error: 'Platform is required' }, { status: 400 })
    }

    if (!tone || typeof tone !== 'string') {
      return Response.json({ error: 'Tone is required' }, { status: 400 })
    }

    const zai = await ZAI.create()

    const keywordsContext = keywords
      ? `Include these keywords naturally: "${keywords}"`
      : ''

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a social media bio expert who creates compelling, platform-optimized bios. Create a ${tone} bio for ${platform}. ${keywordsContext} Make it fit within the platform's character limits and include a call-to-action if appropriate. Return only the bio text, no other content.`,
        },
        {
          role: 'user',
          content: `Create a ${tone} bio for ${platform}${keywords ? ` with keywords: ${keywords}` : ''}`,
        },
      ],
    })

    const bio = completion.choices[0]?.message?.content || ''

    return Response.json({ bio: bio.trim() })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate bio'
    return Response.json({ error: message }, { status: 500 })
  }
}
