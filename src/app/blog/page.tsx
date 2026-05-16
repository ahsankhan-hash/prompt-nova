import { db } from "@/lib/db"
import Link from "next/link"
import { Sparkles, Eye, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { CategoryBadge } from "@/components/category-badge"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Insights & Guides",
  description:
    "Explore the latest AI insights, guides, tutorials, and tips for ChatGPT, YouTube, SEO, AI Prompts, and more.",
  openGraph: {
    title: "AI Insights & Guides | PromptNova AI Blog",
    description:
      "Explore the latest AI insights, guides, tutorials, and tips for ChatGPT, YouTube, SEO, AI Prompts, and more.",
  },
  alternates: { canonical: "/blog" },
}

const blogCategories = [
  { name: "All", slug: "" },
  { name: "AI Tools", slug: "AI Tools" },
  { name: "YouTube", slug: "YouTube" },
  { name: "SEO", slug: "SEO" },
  { name: "AI Prompts", slug: "AI Prompts" },
  { name: "Business", slug: "Business" },
]

const gradientColors = [
  "from-violet-500/20 to-purple-600/20",
  "from-blue-500/20 to-cyan-600/20",
  "from-rose-500/20 to-pink-600/20",
  "from-amber-500/20 to-orange-600/20",
  "from-emerald-500/20 to-teal-600/20",
  "from-indigo-500/20 to-violet-600/20",
]

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const params = await searchParams
  const category = params.category || ""
  const page = parseInt(params.page || "1")
  const limit = 9

  const where: Record<string, unknown> = {
    isPublished: true,
  }

  if (category) {
    where.category = category
  }

  const [posts, total] = await Promise.all([
    db.blogPost.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.blogPost.count({ where }),
  ])

  const totalPages = Math.ceil(total / limit)

  const buildPageUrl = (pageNum: number) => {
    const searchParamsObj = new URLSearchParams()
    if (category) searchParamsObj.set("category", category)
    searchParamsObj.set("page", pageNum.toString())
    return `/blog?${searchParamsObj.toString()}`
  }

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="size-6 text-primary" />
              <Badge variant="secondary" className="text-xs">
                {total} Articles
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              <span className="gradient-text">AI Insights &amp; Guides</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Stay ahead with expert guides, tutorials, and insights on AI prompts, tools, and
              creator strategies.
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar">
            {blogCategories.map((cat) => {
              const isActive = category === cat.slug
              return (
                <Link
                  key={cat.slug || "all"}
                  href={cat.slug ? `/blog?category=${cat.slug}` : "/blog"}
                  className="shrink-0"
                >
                  <Badge
                    variant={isActive ? "default" : "secondary"}
                    className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all hover:scale-105 ${
                      isActive ? "gradient-bg border-0 text-white" : ""
                    }`}
                  >
                    {cat.name}
                  </Badge>
                </Link>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Results Info */}
        {category && (
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Showing {posts.length} of {total} article{total !== 1 ? "s" : ""} in{" "}
              <span className="font-medium text-foreground">{category}</span>
            </span>
          </div>
        )}

        {/* Blog Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <ScrollReveal key={post.id} delay={0.05 * (index % 3)}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="rounded-xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-primary/5">
                    {/* Gradient placeholder image */}
                    <div
                      className={`relative h-48 bg-gradient-to-br ${
                        gradientColors[index % gradientColors.length]
                      } flex items-center justify-center`}
                    >
                      <div className="absolute top-3 left-3">
                        <CategoryBadge
                          name={post.category}
                          slug={post.category.toLowerCase().replace(/\s+/g, "-")}
                        />
                      </div>
                      <Sparkles className="size-12 text-primary/20" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Author & Meta */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="size-7 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-medium">
                            {getInitials(post.authorName)}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {post.authorName}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{formatDate(post.createdAt)}</span>
                          <span className="flex items-center gap-1">
                            <Eye className="size-3" />
                            {post.views > 999
                              ? `${(post.views / 1000).toFixed(1)}k`
                              : post.views}
                          </span>
                        </div>
                      </div>

                      {/* Read More */}
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                        Read More
                        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Sparkles className="size-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Try adjusting your category filter
            </p>
            <Link href="/blog">
              <Button variant="outline">View All Articles</Button>
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <Link
              href={page > 1 ? buildPageUrl(page - 1) : "#"}
              aria-disabled={page <= 1}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            >
              <Button variant="outline" size="sm" disabled={page <= 1}>
                <ChevronLeft className="size-4 mr-1" />
                Previous
              </Button>
            </Link>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                .map((p, idx, arr) => {
                  const showEllipsis = idx > 0 && arr[idx - 1] !== p - 1
                  return (
                    <span key={p} className="flex items-center gap-1">
                      {showEllipsis && (
                        <span className="px-2 text-muted-foreground text-sm">...</span>
                      )}
                      <Link href={buildPageUrl(p)}>
                        <Button
                          variant={p === page ? "default" : "outline"}
                          size="sm"
                          className={
                            p === page ? "gradient-bg border-0 text-white" : ""
                          }
                        >
                          {p}
                        </Button>
                      </Link>
                    </span>
                  )
                })}
            </div>

            <Link
              href={page < totalPages ? buildPageUrl(page + 1) : "#"}
              aria-disabled={page >= totalPages}
              className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
            >
              <Button variant="outline" size="sm" disabled={page >= totalPages}>
                Next
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
