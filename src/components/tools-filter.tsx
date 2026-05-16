"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"

const toolCategories = [
  { name: "All", slug: "" },
  { name: "YouTube", slug: "YouTube" },
  { name: "Social Media", slug: "Social Media" },
  { name: "Marketing", slug: "Marketing" },
  { name: "SEO", slug: "SEO" },
  { name: "Business", slug: "Business" },
  { name: "Productivity", slug: "Productivity" },
  { name: "Utility", slug: "Utility" },
]

export function ToolsFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentCategory = searchParams.get("category") || ""

  const updateCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set("category", slug)
    } else {
      params.delete("category")
    }
    router.push(`/tools?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {toolCategories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => updateCategory(cat.slug)}
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
  )
}
