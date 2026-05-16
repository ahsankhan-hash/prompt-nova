import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { pageTitle, keywords, style } = body

    if (!pageTitle || typeof pageTitle !== 'string') {
      return Response.json({ error: 'Page title is required' }, { status: 400 })
    }

    const zai = await ZAI.create()

    const keywordsContext = keywords
      ? `Target these keywords: "${keywords}"`
      : ''

    const styleInstruction = style
      ? `The description should have a ${style} style.`
      : ''

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an SEO meta description expert. Generate 3 optimized meta descriptions for the given page title. ${keywordsContext} ${styleInstruction} Each description must be between 120-155 characters, include a call-to-action, and be optimized for search engines and click-through rates. Return only the descriptions as a JSON array of strings, no other text.`,
        },
        {
          role: 'user',
          content: `Generate meta descriptions for the page title: "${pageTitle}"`,
        },
      ],
    })

    const result = completion.choices[0]?.message?.content || '[]'

    let descriptions: string[]
    try {
      descriptions = JSON.parse(result)
      if (!Array.isArray(descriptions)) {
        descriptions = result.split('\n').filter((line: string) => line.trim()).map((line: string) => line.replace(/^\d+[\.\)]\s*/, '').replace(/[""]/g, '').trim())
      }
    } catch {
      descriptions = result.split('\n').filter((line: string) => line.trim()).map((line: string) => line.replace(/^\d+[\.\)]\s*/, '').replace(/[""]/g, '').trim())
    }

    return Response.json({ description: descriptions[0] || '', alternatives: descriptions.slice(1, 3) })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate description'
    return Response.json({ error: message }, { status: 500 })
  }
}
