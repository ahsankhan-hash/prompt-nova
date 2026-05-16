import { db } from "@/lib/db"
import { PromptCard } from "@/components/prompt-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { PromptsFilter } from "@/components/prompts-filter"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Prompt Library",
  description:
    "Browse our curated collection of AI prompts for ChatGPT, Midjourney, YouTube, Coding, Business, and more.",
  openGraph: {
    title: "AI Prompt Library | PromptNova AI",
    description:
      "Browse our curated collection of AI prompts for ChatGPT, Midjourney, YouTube, Coding, Business, and more.",
  },
  alternates: { canonical: "/prompts" },
}

export default async function PromptsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; search?: string; page?: string }>
}) {
  const params = await searchParams
  const category = params.category
  const sort = params.sort || "trending"
  const search = params.search
  const page = parseInt(params.page || "1")
  const limit = 12

  const where: Record<string, unknown> = {}
  if (category) where.category = category
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ]
  }

  let orderBy: Record<string, string> = {}
  switch (sort) {
    case "newest":
      orderBy = { createdAt: "desc" }
      break
    case "popular":
      orderBy = { views: "desc" }
      break
    case "trending":
    default:
      orderBy = { likes: "desc" }
      break
  }

  const [prompts, total] = await Promise.all([
    db.prompt.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    db.prompt.count({ where }),
  ])

  const totalPages = Math.ceil(total / limit)

  // Build pagination links
  const buildPageUrl = (pageNum: number) => {
    const searchParamsObj = new URLSearchParams()
    if (category) searchParamsObj.set("category", category)
    if (sort) searchParamsObj.set("sort", sort)
    if (search) searchParamsObj.set("search", search)
    searchParamsObj.set("page", pageNum.toString())
    return `/prompts?${searchParamsObj.toString()}`
  }

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="size-6 text-primary" />
            <Badge variant="secondary" className="text-xs">
              {total} Prompts
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
            <span className="gradient-text">AI Prompt Library</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Browse our curated collection of AI prompts for every use case
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <PromptsFilter />
        </div>

        {/* Results Info */}
        {(category || search) && (
          <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Showing {prompts.length} of {total} prompt{total !== 1 ? "s" : ""}
              {category && (
                <>
                  {" "}
                  in <span className="font-medium text-foreground">{category.replace(/-prompts$/, "")}</span>
                </>
              )}
              {search && (
                <>
                  {" "}
                  matching &quot;<span className="font-medium text-foreground">{search}</span>&quot;
                </>
              )}
            </span>
          </div>
        )}

        {/* Prompt Grid */}
        {prompts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.map((prompt, index) => (
              <ScrollReveal key={prompt.id} delay={0.05 * (index % 3)}>
                <PromptCard
                  id={prompt.id}
                  title={prompt.title}
                  slug={prompt.slug}
                  description={prompt.description}
                  category={prompt.category}
                  tags={prompt.tags.split(",")}
                  difficulty={prompt.difficulty}
                  views={prompt.views}
                  likes={prompt.likes}
                  content={prompt.content}
                  isFeatured={prompt.isFeatured}
                  isTrending={prompt.isTrending}
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Sparkles className="size-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No prompts found</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Try adjusting your filters or search query
            </p>
            <Link href="/prompts">
              <Button variant="outline">Clear Filters</Button>
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
                .filter((p) => {
                  // Show first, last, and pages around current
                  return p === 1 || p === totalPages || Math.abs(p - page) <= 1
                })
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
                            p === page
                              ? "gradient-bg border-0 text-white"
                              : ""
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
