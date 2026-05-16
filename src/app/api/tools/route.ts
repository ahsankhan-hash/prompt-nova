import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')
    const popular = searchParams.get('popular')

    const where: Record<string, unknown> = {}

    if (category) {
      where.category = category
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ]
    }

    if (featured === 'true') {
      where.isFeatured = true
    }

    if (popular === 'true') {
      where.isPopular = true
    }

    const tools = await db.tool.findMany({
      where,
      orderBy: { usageCount: 'desc' },
    })

    return Response.json({ tools })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch tools'
    return Response.json({ error: message }, { status: 500 })
  }
}
