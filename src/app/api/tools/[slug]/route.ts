import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const tool = await db.tool.findUnique({
      where: { slug },
    })

    if (!tool) {
      return Response.json({ error: 'Tool not found' }, { status: 404 })
    }

    // Increment usage count
    await db.tool.update({
      where: { slug },
      data: { usageCount: { increment: 1 } },
    })

    return Response.json({ tool: { ...tool, usageCount: tool.usageCount + 1 } })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch tool'
    return Response.json({ error: message }, { status: 500 })
  }
}
