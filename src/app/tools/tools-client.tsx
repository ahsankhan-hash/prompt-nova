"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ToolCard } from "@/components/tool-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ToolsFilter } from "@/components/tools-filter"
import { Badge } from "@/components/ui/badge"
import { Wrench, Sparkles } from "lucide-react"

interface Tool {
  id: string
  name: string
  slug: string
  description: string
  category: string
  icon: string
  usageCount: number
  isFeatured: boolean
  isPopular: boolean
}

export function ToolsClient() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category") || ""

  const [tools, setTools] = useState<Tool[]>([])
  const [totalTools, setTotalTools] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTools() {
      setLoading(true)
      try {
        const queryParams = new URLSearchParams()
        if (category) queryParams.set("category", category)

        const response = await fetch(`/api/tools?${queryParams.toString()}`)
        if (!response.ok) {
          throw new Error("Failed to fetch tools")
        }
        const data = await response.json()
        setTools(data.tools || [])
        // Use tools length or query all count
        setTotalTools(data.tools?.length || 0)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchTools()
  }, [category])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 animate-pulse">
          <div className="h-6 w-32 bg-muted rounded mx-auto mb-3"></div>
          <div className="h-10 w-64 bg-muted rounded mx-auto mb-3"></div>
          <div className="h-5 w-96 bg-muted rounded mx-auto"></div>
        </div>
        <div className="mb-8 flex justify-center">
          <ToolsFilter />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="glass rounded-xl p-6 h-48 animate-pulse flex flex-col justify-between">
              <div>
                <div className="h-6 w-3/4 bg-muted rounded mb-2"></div>
                <div className="h-4 w-full bg-muted rounded mb-1"></div>
                <div className="h-4 w-5/6 bg-muted rounded"></div>
              </div>
              <div className="h-6 w-20 bg-muted rounded mt-4"></div>
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
          <h3 className="text-lg font-semibold mb-2">Unable to load tools</h3>
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
          <Wrench className="size-6 text-primary" />
          <Badge variant="secondary" className="text-xs">
            {totalTools} Free Tools
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
          <span className="gradient-text">Free AI Tools</span>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
          Powerful AI-powered tools to boost your content creation and productivity
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex justify-center">
        <ToolsFilter />
      </div>

      {/* Results Info */}
      {category && (
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {tools.length} tool{tools.length !== 1 ? "s" : ""} in{" "}
          <span className="font-medium text-foreground">{category}</span>
        </div>
      )}

      {/* Tools Grid */}
      {tools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <ScrollReveal key={tool.id} delay={0.05 * (index % 3)}>
              <ToolCard
                id={tool.id}
                name={tool.name}
                slug={tool.slug}
                description={tool.description}
                category={tool.category}
                icon={tool.icon}
                usageCount={tool.usageCount}
                isFeatured={tool.isFeatured}
                isPopular={tool.isPopular}
              />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Sparkles className="size-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No tools found</h3>
          <p className="text-muted-foreground text-sm">
            Try selecting a different category
          </p>
        </div>
      )}
    </div>
  )
}
