import { db } from '@/lib/db'

export async function GET() {
  try {
    const [
      trendingPrompts,
      popularTools,
      categories,
      featuredTools,
      dailyFeaturedPrompt,
      latestUploads,
      latestBlogPosts,
    ] = await Promise.all([
      // Trending prompts
      db.prompt.findMany({
        where: { isTrending: true },
        orderBy: { likes: "desc" },
        take: 6,
      }),
      // Popular tools
      db.tool.findMany({
        where: { isPopular: true },
        orderBy: { usageCount: "desc" },
        take: 6,
      }),
      // Categories
      db.category.findMany({
        orderBy: { promptCount: "desc" },
      }),
      // Featured tools
      db.tool.findMany({
        where: { isFeatured: true },
        orderBy: { usageCount: "desc" },
        take: 4,
      }),
      // Daily featured prompt
      db.prompt.findFirst({
        where: { isFeatured: true },
        orderBy: { likes: "desc" },
      }),
      // Latest uploads
      db.prompt.findMany({
        orderBy: { createdAt: "desc" },
        take: 4,
      }),
      // Latest blog posts
      db.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        take: 3,
      }),
    ])

    return Response.json({
      trendingPrompts,
      popularTools,
      categories,
      featuredTools,
      dailyFeaturedPrompt,
      latestUploads,
      latestBlogPosts,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch homepage data'
    return Response.json({ error: message }, { status: 500 })
  }
}
