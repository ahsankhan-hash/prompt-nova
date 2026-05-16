"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Copy,
  Heart,
  Share2,
  Eye,
  Check,
  Download,
  Bookmark,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CategoryBadge } from "@/components/category-badge"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface PromptDetailClientProps {
  slug: string
  title: string
  content: string
  category: string
  tags: string[]
  difficulty: string
  views: number
  likes: number
  copies: number
  authorName: string
  createdAt: string
}

const difficultyConfig: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  beginner: {
    label: "Beginner",
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-950/50",
  },
  intermediate: {
    label: "Intermediate",
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-950/50",
  },
  advanced: {
    label: "Advanced",
    color: "text-red-700 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-950/50",
  },
}

function formatCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return count.toString()
}

export function PromptDetailClient({
  slug,
  title,
  content,
  category,
  tags,
  difficulty,
  views,
  likes,
  copies,
  authorName,
  createdAt,
}: PromptDetailClientProps) {
  const [liked, setLiked] = React.useState(false)
  const [likeCount, setLikeCount] = React.useState(likes)
  const [copied, setCopied] = React.useState(false)
  const [saved, setSaved] = React.useState(false)

  const diffConfig = difficultyConfig[difficulty.toLowerCase()] ?? difficultyConfig.beginner

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      toast.success("Prompt copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      const textArea = document.createElement("textarea")
      textArea.value = content
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      toast.success("Prompt copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleLike = async () => {
    try {
      const res = await fetch(`/api/prompts/${slug}/like`, { method: "POST" })
      if (res.ok) {
        const data = await res.json()
        setLiked(true)
        setLikeCount(data.likes)
        toast.success("Thanks for liking this prompt!")
      }
    } catch {
      toast.error("Failed to like prompt")
    }
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/prompts/${slug}`
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(url)
      toast.success("Link copied to clipboard!")
    }
  }

  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${slug}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("Prompt downloaded!")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge name={category.replace(/-prompts$/, "")} slug={category} />
        <Badge
          variant="secondary"
          className={cn("border-0 text-xs font-medium", diffConfig.bgColor, diffConfig.color)}
        >
          {diffConfig.label}
        </Badge>
      </div>

      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
        {title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span>By {authorName}</span>
        <span>•</span>
        <span>{new Date(createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Eye className="size-4" />
          {formatCount(views)} views
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Heart className="size-4" />
          {formatCount(likeCount)} likes
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Copy className="size-4" />
          {formatCount(copies)} copies
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={handleCopy}
          className="gradient-bg border-0 text-white font-medium gap-2"
        >
          {copied ? (
            <>
              <Check className="size-4" /> Copied!
            </>
          ) : (
            <>
              <Copy className="size-4" /> Copy Prompt
            </>
          )}
        </Button>

        <Button
          variant="outline"
          onClick={handleLike}
          className={cn("gap-2", liked && "text-red-500 border-red-200 dark:border-red-800")}
        >
          <motion.div
            whileTap={{ scale: 1.3 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Heart className={cn("size-4", liked && "fill-current")} />
          </motion.div>
          {liked ? "Liked" : "Like"}
        </Button>

        <Button variant="outline" onClick={handleShare} className="gap-2">
          <Share2 className="size-4" /> Share
        </Button>

        <Button variant="outline" onClick={handleDownload} className="gap-2">
          <Download className="size-4" /> Download
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            setSaved((prev) => !prev)
            toast.success(saved ? "Removed from saved" : "Saved for later")
          }}
          className={cn("gap-2", saved && "text-primary")}
        >
          <Bookmark className={cn("size-4", saved && "fill-current")} />
          {saved ? "Saved" : "Save"}
        </Button>
      </div>

      {/* Prompt Content Card */}
      <div className="glass rounded-xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Prompt Content
          </h2>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed bg-transparent p-0 m-0 overflow-visible">
            {content}
          </pre>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-muted-foreground">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag.trim()}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
