"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const categories = [
  { name: "All", slug: "" },
  { name: "ChatGPT", slug: "chatgpt-prompts" },
  { name: "Midjourney", slug: "midjourney-prompts" },
  { name: "Coding", slug: "coding-prompts" },
  { name: "YouTube", slug: "youtube-prompts" },
  { name: "Business", slug: "business-prompts" },
  { name: "Marketing", slug: "marketing-prompts" },
  { name: "Productivity", slug: "productivity-prompts" },
  { name: "Social Media", slug: "social-media-prompts" },
]

const sortOptions = [
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
]

export function PromptsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchValue, setSearchValue] = React.useState(searchParams.get("search") || "")

  const currentCategory = searchParams.get("category") || ""
  const currentSort = searchParams.get("sort") || "trending"

  const updateParams = React.useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })
      // Reset page when filters change
      params.delete("page")
      router.push(`/prompts?${params.toString()}`)
    },
    [router, searchParams]
  )

  const handleSearch = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      updateParams({ search: searchValue })
    },
    [searchValue, updateParams]
  )

  const clearSearch = React.useCallback(() => {
    setSearchValue("")
    updateParams({ search: "" })
  }, [updateParams])

  const activeFilterCount =
    (currentCategory ? 1 : 0) + (searchParams.get("search") ? 1 : 0) + (currentSort !== "trending" ? 1 : 0)

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search prompts by title or description..."
          className="pl-10 pr-10 h-11 rounded-xl glass border-purple-200 dark:border-purple-800 focus-visible:ring-primary/30"
        />
        {searchValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 size-8"
            onClick={clearSearch}
          >
            <X className="size-3.5" />
          </Button>
        )}
      </form>

      {/* Category Tabs + Sort */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateParams({ category: cat.slug })}
              className={cn(
                "shrink-0 px-3 py-1.5 text-sm font-medium rounded-lg transition-all",
                currentCategory === cat.slug
                  ? "gradient-bg text-white shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Sort + Filter Count */}
        <div className="flex items-center gap-2 shrink-0">
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="gap-1 text-xs">
              <SlidersHorizontal className="size-3" />
              {activeFilterCount} filter{activeFilterCount > 1 ? "s" : ""}
              <button
                onClick={() => {
                  setSearchValue("")
                  router.push("/prompts")
                }}
                className="ml-1 hover:text-destructive"
              >
                <X className="size-3" />
              </button>
            </Badge>
          )}
          <Select value={currentSort} onValueChange={(value) => updateParams({ sort: value })}>
            <SelectTrigger className="w-[140px] h-9 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
