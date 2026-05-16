import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort') || 'trending'
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const skip = (page - 1) * limit

    const where: Record<string, unknown> = {}

    if (category) {
      where.category = category
    }

    if (search) {
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
      ]
    }

    let orderBy: Record<string, string> = {}
    switch (sort) {
      case 'newest':
        orderBy = { createdAt: 'desc' }
        break
      case 'popular':
        orderBy = { views: 'desc' }
        break
      case 'trending':
      default:
        orderBy = { likes: 'desc' }
        break
    }

    const [prompts, total] = await Promise.all([
      db.prompt.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
      db.prompt.count({ where }),
    ])

    return Response.json({
      prompts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch prompts'
    return Response.json({ error: message }, { status: 500 })
  }
}
