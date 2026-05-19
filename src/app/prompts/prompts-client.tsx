"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { PromptCard } from "@/components/prompt-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { PromptsFilter } from "@/components/prompts-filter"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

interface Prompt {
  id: string
  title: string
  slug: string
  description: string
  content: string
  category: string
  tags: string
  difficulty: string
  views: number
  likes: number
  isFeatured: boolean
  isTrending: boolean
}

export function PromptsClient() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || ""
  const sort = searchParams.get("sort") || "trending"
  const search = searchParams.get("search") || ""
  const pageStr = searchParams.get("page") || "1"
  const page = parseInt(pageStr)

  const [prompts, setPrompts] = useState<Prompt[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPrompts() {
      setLoading(true)
      try {
        const queryParams = new URLSearchParams()
        if (category) queryParams.set("category", category)
        if (sort) queryParams.set("sort", sort)
        if (search) queryParams.set("search", search)
        queryParams.set("page", pageStr)
        queryParams.set("limit", "12")

        const response = await fetch(`/api/prompts?${queryParams.toString()}`)
        if (!response.ok) {
          throw new Error("Failed to fetch prompts")
        }
        const data = await response.json()
        setPrompts(data.prompts || [])
        setTotal(data.total || 0)
        setTotalPages(data.totalPages || 0)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchPrompts()
  }, [category, sort, search, pageStr])

  // Build pagination links
  const buildPageUrl = (pageNum: number) => {
    const searchParamsObj = new URLSearchParams()
    if (category) searchParamsObj.set("category", category)
    if (sort) searchParamsObj.set("sort", sort)
    if (search) searchParamsObj.set("search", search)
    searchParamsObj.set("page", pageNum.toString())
    return `/prompts?${searchParamsObj.toString()}`
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-pulse">
          <div className="h-6 w-32 bg-muted rounded mx-auto mb-3"></div>
          <div className="h-10 w-64 bg-muted rounded mx-auto mb-3"></div>
          <div className="h-5 w-96 bg-muted rounded mx-auto"></div>
        </div>
        <div className="mb-8">
          <PromptsFilter />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="glass rounded-xl p-6 h-64 animate-pulse flex flex-col justify-between">
              <div>
                <div className="h-6 w-3/4 bg-muted rounded mb-4"></div>
                <div className="h-4 w-full bg-muted rounded mb-2"></div>
                <div className="h-4 w-5/6 bg-muted rounded"></div>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="h-6 w-16 bg-muted rounded"></div>
                <div className="h-6 w-16 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="glass rounded-xl p-8 max-w-md mx-auto border-destructive/20">
          <Sparkles className="size-12 text-destructive mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Unable to load prompts</h3>
          <p className="text-muted-foreground text-sm mb-6">{error}</p>
          <button
            onClick={() => {
              setLoading(true)
              setError(null)
              window.location.reload()
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
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
  )
}
