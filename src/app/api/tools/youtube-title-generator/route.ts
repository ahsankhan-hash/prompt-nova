import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { topic, style } = body

    if (!topic || typeof topic !== 'string') {
      return Response.json({ error: 'Topic is required' }, { status: 400 })
    }

    const zai = await ZAI.create()

    const styleInstruction = style
      ? `The titles should have a ${style} style.`
      : ''

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a YouTube title expert who creates viral, click-worthy titles optimized for CTR and search visibility. Generate 10 YouTube video titles for the given topic. ${styleInstruction} Return only the titles as a JSON array of strings, no other text.`,
        },
        {
          role: 'user',
          content: `Generate 10 YouTube video titles for the topic: "${topic}"`,
        },
      ],
    })

    const result = completion.choices[0]?.message?.content || '[]'

    let titles: string[]
    try {
      titles = JSON.parse(result)
      if (!Array.isArray(titles)) {
        titles = result.split('\n').filter((line: string) => line.trim()).map((line: string) => line.replace(/^\d+[\.\)]\s*/, '').replace(/[""]/g, '').trim())
      }
    } catch {
      titles = result.split('\n').filter((line: string) => line.trim()).map((line: string) => line.replace(/^\d+[\.\)]\s*/, '').replace(/[""]/g, '').trim())
    }

    return Response.json({ titles: titles.slice(0, 10) })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate titles'
    return Response.json({ error: message }, { status: 500 })
  }
}
