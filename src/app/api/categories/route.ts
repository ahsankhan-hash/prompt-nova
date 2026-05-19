import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { promptCount: 'desc' },
    })

    return Response.json({ categories })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch categories'
    return Response.json({ error: message }, { status: 500 })
  }
}
