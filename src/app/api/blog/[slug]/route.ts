import { db } from '@/lib/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const post = await db.blogPost.findUnique({
      where: { slug },
    })

    if (!post || !post.isPublished) {
      return Response.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Increment views
    await db.blogPost.update({
      where: { slug },
      data: { views: { increment: 1 } },
    })

    return Response.json({ post: { ...post, views: post.views + 1 } })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch blog post'
    return Response.json({ error: message }, { status: 500 })
  }
}
