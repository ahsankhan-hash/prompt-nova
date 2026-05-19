"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  MessageSquare,
  Image,
  Code2,
  Youtube,
  Briefcase,
  Megaphone,
  Zap,
  Share2,
  ArrowRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/scroll-reveal"

interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  promptCount: number
}

const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  Image,
  Code: Code2,
  Code2,
  Youtube,
  Briefcase,
  Megaphone,
  Zap,
  Share2,
}

const defaultIcon = Sparkles

export function CategoriesClient() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("/api/categories")
        if (!response.ok) {
          throw new Error("Failed to fetch categories")
        }
        const data = await response.json()
        setCategories(data.categories || [])
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-pulse">
          <div className="h-6 w-32 bg-muted rounded mx-auto mb-3"></div>
          <div className="h-10 w-64 bg-muted rounded mx-auto mb-3"></div>
          <div className="h-5 w-96 bg-muted rounded mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="glass rounded-xl p-6 h-48 animate-pulse flex flex-col justify-between">
              <div>
                <div className="size-12 rounded-lg bg-muted mb-4"></div>
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
          <h3 className="text-lg font-semibold mb-2">Unable to load categories</h3>
          <p className="text-muted-foreground text-sm mb-6">{error}</p>
          <button
            onClick={() => {
              setLoading(true)
              setError(null)
              fetch("/api/categories")
                .then((res) => res.json())
                .then((data) => setCategories(data.categories || []))
                .catch((err) => setError(err.message))
                .finally(() => setLoading(false))
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
      <ScrollReveal>
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="size-6 text-primary animate-pulse" />
            <Badge variant="secondary" className="text-xs">
              {categories.length} Categories
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
            <span className="gradient-text">Browse Categories</span>
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Find the perfect AI prompts organized by category. From creative writing to coding,
            we have you covered.
          </p>
        </div>
      </ScrollReveal>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => {
          const IconComponent = iconMap[category.icon] || defaultIcon
          return (
            <ScrollReveal key={category.id} delay={0.05 * (index % 4)}>
              <Link
                href={`/prompts?category=${category.slug}`}
                className="group block"
              >
                <div className="glass rounded-xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/30">
                  <div className="size-12 rounded-lg gradient-bg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="size-6" />
                  </div>

                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {category.promptCount} prompt{category.promptCount !== 1 ? "s" : ""}
                    </Badge>
                    <span className="flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          )
        })}
      </div>
    </div>
  )
}
