import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { topic, platform, style } = body

    if (!topic || typeof topic !== 'string') {
      return Response.json({ error: 'Topic is required' }, { status: 400 })
    }

    if (!platform || typeof platform !== 'string') {
      return Response.json({ error: 'Platform is required' }, { status: 400 })
    }

    const zai = await ZAI.create()

    const styleInstruction = style
      ? `The hooks should have a ${style} style.`
      : ''

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a content hook expert who creates attention-grabbing hooks that stop the scroll. Generate 8 powerful hooks for ${platform} about the given topic. ${styleInstruction} Each hook should be 1-2 sentences that create curiosity, urgency, or emotional resonance. Return only the hooks as a JSON array of strings, no other text.`,
        },
        {
          role: 'user',
          content: `Generate hooks for ${platform} about: "${topic}"`,
        },
      ],
    })

    const result = completion.choices[0]?.message?.content || '[]'

    let hooks: string[]
    try {
      hooks = JSON.parse(result)
      if (!Array.isArray(hooks)) {
        hooks = result.split('\n').filter((line: string) => line.trim()).map((line: string) => line.replace(/^\d+[\.\)]\s*/, '').replace(/[""]/g, '').trim())
      }
    } catch {
      hooks = result.split('\n').filter((line: string) => line.trim()).map((line: string) => line.replace(/^\d+[\.\)]\s*/, '').replace(/[""]/g, '').trim())
    }

    return Response.json({ hooks: hooks.slice(0, 8) })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate hooks'
    return Response.json({ error: message }, { status: 500 })
  }
}
