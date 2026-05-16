import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { videoTitle, style } = body

    if (!videoTitle || typeof videoTitle !== 'string') {
      return Response.json({ error: 'Video title is required' }, { status: 400 })
    }

    const zai = await ZAI.create()

    const styleInstruction = style
      ? `The thumbnail should have a ${style} style.`
      : ''

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a YouTube thumbnail design expert who creates Midjourney prompts for stunning video thumbnails. Generate a detailed Midjourney prompt for a YouTube thumbnail based on the given video title. ${styleInstruction} The prompt should include: vivid visual description, color scheme, composition, text overlay suggestions, and Midjourney parameters (--ar 16:9, --v 6, --s 750). Return only the prompt text, no other content.`,
        },
        {
          role: 'user',
          content: `Generate a YouTube thumbnail Midjourney prompt for the video: "${videoTitle}"`,
        },
      ],
    })

    const prompt = completion.choices[0]?.message?.content || ''

    return Response.json({ prompt: prompt.trim() })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate thumbnail prompt'
    return Response.json({ error: message }, { status: 500 })
  }
}
