import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')

    if (!q || q.trim().length === 0) {
      return Response.json({ prompts: [], tools: [], posts: [] })
    }

    const [prompts, tools, posts] = await Promise.all([
      db.prompt.findMany({
        where: {
          OR: [
            { title: { contains: q } },
            { description: { contains: q } },
          ],
        },
        take: 10,
        orderBy: { views: 'desc' },
      }),
      db.tool.findMany({
        where: {
          OR: [
            { name: { contains: q } },
            { description: { contains: q } },
          ],
        },
        take: 10,
        orderBy: { usageCount: 'desc' },
      }),
      db.blogPost.findMany({
        where: {
          isPublished: true,
          OR: [
            { title: { contains: q } },
            { excerpt: { contains: q } },
          ],
        },
        take: 10,
        orderBy: { views: 'desc' },
      }),
    ])

    return Response.json({ prompts, tools, posts })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Search failed'
    return Response.json({ error: message }, { status: 500 })
  }
}
