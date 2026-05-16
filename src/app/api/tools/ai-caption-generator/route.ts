import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { topic, platform, tone } = body

    if (!topic || typeof topic !== 'string') {
      return Response.json({ error: 'Topic is required' }, { status: 400 })
    }

    if (!platform || typeof platform !== 'string') {
      return Response.json({ error: 'Platform is required' }, { status: 400 })
    }

    const zai = await ZAI.create()

    const toneInstruction = tone
      ? `The caption should have a ${tone} tone.`
      : ''

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a social media caption expert who creates engaging, platform-optimized captions. Create a compelling caption for ${platform} about the given topic. ${toneInstruction} Include a hook, engaging body content, a call-to-action, and suggest 3-5 relevant emojis. Return only the caption text, no other content.`,
        },
        {
          role: 'user',
          content: `Create a ${tone || 'engaging'} caption for ${platform} about: "${topic}"`,
        },
      ],
    })

    const caption = completion.choices[0]?.message?.content || ''

    return Response.json({ caption: caption.trim() })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate caption'
    return Response.json({ error: message }, { status: 500 })
  }
}
