import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { subject, tone, recipientType } = body

    if (!subject || typeof subject !== 'string') {
      return Response.json({ error: 'Subject is required' }, { status: 400 })
    }

    if (!tone || typeof tone !== 'string') {
      return Response.json({ error: 'Tone is required' }, { status: 400 })
    }

    if (!recipientType || typeof recipientType !== 'string') {
      return Response.json({ error: 'Recipient type is required' }, { status: 400 })
    }

    const zai = await ZAI.create()

    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are an expert email writer who crafts compelling, professional emails. Write a ${tone} email about the given subject for a ${recipientType} audience. Include: a compelling subject line, professional greeting, well-structured body with clear paragraphs, and an appropriate sign-off. Return only the email text, no other content.`,
        },
        {
          role: 'user',
          content: `Write a ${tone} email about "${subject}" for ${recipientType}`,
        },
      ],
    })

    const email = completion.choices[0]?.message?.content || ''

    return Response.json({ email: email.trim() })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to generate email'
    return Response.json({ error: message }, { status: 500 })
  }
}
