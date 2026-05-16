"use client"

import * as React from "react"
import { Copy, Heart, Eye, Check } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CategoryBadge } from "@/components/category-badge"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface DailyFeaturedPromptProps {
  prompt: {
    id: string
    title: string
    slug: string
    description: string
    content: string
    category: string
    difficulty: string
    views: number
    likes: number
    copies: number
    isFeatured: boolean
    isTrending: boolean
  }
}

export function DailyFeaturedPrompt({ prompt }: DailyFeaturedPromptProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement("textarea")
      textArea.value = prompt.content
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="relative overflow-hidden rounded-2xl glass glow">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10 p-6 sm:p-8 flex flex-col gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400 border-0 text-xs gap-1">
            <Check className="size-3" />
            Featured
          </Badge>
          <CategoryBadge
            name={prompt.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
            slug={prompt.category}
          />
          <Badge variant="secondary" className="border-0 text-xs bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
            {prompt.difficulty.charAt(0).toUpperCase() + prompt.difficulty.slice(1)}
          </Badge>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold gradient-text">
          {prompt.title}
        </h3>

        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          {prompt.description}
        </p>

        <div className="bg-background/50 rounded-lg p-4 border border-border/50">
          <pre className="text-xs sm:text-sm text-foreground/90 whitespace-pre-wrap font-mono leading-relaxed max-h-48 overflow-y-auto custom-scrollbar">
            {prompt.content}
          </pre>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Eye className="size-4" />
              {prompt.views.toLocaleString()} views
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Heart className="size-4" />
              {prompt.likes.toLocaleString()} likes
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Copy className="size-4" />
              {prompt.copies.toLocaleString()} copies
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="gradient-bg border-0 text-white font-medium gap-2"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="size-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  Copy Prompt
                </>
              )}
            </Button>
            <Link href={`/prompts/${prompt.slug}`}>
              <Button size="sm" variant="outline" className="gap-2">
                View Details
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
