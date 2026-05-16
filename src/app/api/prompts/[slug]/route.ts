import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const prompt = await db.prompt.findUnique({
      where: { slug },
    })

    if (!prompt) {
      return Response.json({ error: 'Prompt not found' }, { status: 404 })
    }

    // Increment views
    await db.prompt.update({
      where: { slug },
      data: { views: { increment: 1 } },
    })

    return Response.json({ prompt: { ...prompt, views: prompt.views + 1 } })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch prompt'
    return Response.json({ error: message }, { status: 500 })
  }
}
