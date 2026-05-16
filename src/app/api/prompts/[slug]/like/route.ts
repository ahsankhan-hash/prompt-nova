import { db } from '@/lib/db'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const prompt = await db.prompt.findUnique({ where: { slug } })

    if (!prompt) {
      return Response.json({ error: 'Prompt not found' }, { status: 404 })
    }

    const updated = await db.prompt.update({
      where: { slug },
      data: { likes: { increment: 1 } },
    })

    return Response.json({ likes: updated.likes })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to like prompt'
    return Response.json({ error: message }, { status: 500 })
  }
}
