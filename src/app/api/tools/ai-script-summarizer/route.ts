import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { script, maxLength } = body

    if (!script || typeof script !== 'string') {
      return Response.json({ error: 'Script is required' }, { status: 400 })
    }

    const maxLen = maxLength || 200
    const zai = await ZAI.create()

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a script summarization expert. Summarize the given script in approximately ${maxLen} words or less. Capture the key points, main message, and important details. Return only the summary text, no other content.`,
        },
        {
          role: 'user',
          content: `Summarize this script in ${maxLen} words or less:\n\n${script}`,
        },
      ],
    })

    const summary = completion.choices[0]?.message?.content || ''

    return Response.json({ summary: summary.trim() })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to summarize script'
    return Response.json({ error: message }, { status: 500 })
  }
}
