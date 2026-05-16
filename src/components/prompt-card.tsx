"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Copy,
  Heart,
  Bookmark,
  Eye,
  Share2,
  TrendingUp,
  Star,
  Check,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CategoryBadge } from "@/components/category-badge"
import { cn } from "@/lib/utils"

interface PromptCardProps {
  id: string
  title: string
  slug: string
  description: string
  category: string
  tags: string[]
  difficulty: string
  views: number
  likes: number
  content: string
  isFeatured?: boolean
  isTrending?: boolean
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

function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K`
  return views.toString()
}

export function PromptCard({
  id,
  title,
  slug,
  description,
  category,
  tags,
  difficulty,
  views,
  likes,
  content,
  isFeatured = false,
  isTrending = false,
}: PromptCardProps) {
  const [liked, setLiked] = React.useState(false)
  const [saved, setSaved] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const [likeCount, setLikeCount] = React.useState(likes)

  const diffConfig = difficultyConfig[difficulty.toLowerCase()] ?? difficultyConfig.beginner

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = content
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleLike = () => {
    setLiked((prev) => !prev)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  const handleShare = async () => {
    const url = `${window.location.origin}/prompts/${slug}`
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url)
    }
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <div className="glass rounded-xl p-5 h-full flex flex-col gap-3 transition-shadow duration-300 group-hover:shadow-lg group-hover:glow">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <CategoryBadge name={category} slug={category.toLowerCase()} />
            <Badge
              variant="secondary"
              className={cn("border-0 text-xs font-medium", diffConfig.bgColor, diffConfig.color)}
            >
              {diffConfig.label}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            {isTrending && (
              <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400 border-0 text-xs gap-1">
                <TrendingUp className="size-3" />
                Trending
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400 border-0 text-xs gap-1">
                <Star className="size-3" />
                Featured
              </Badge>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5 flex-1">
          <Link href={`/prompts/${slug}`}>
            <h3 className="font-semibold text-base leading-snug line-clamp-2 group-hover:gradient-text transition-all duration-300">
              {title}
            </h3>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] px-2 py-0 h-5 font-normal"
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge
                variant="outline"
                className="text-[10px] px-2 py-0 h-5 font-normal"
              >
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Actions Row */}
        <div className="flex items-center justify-between pt-1 border-t border-border/50">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 gap-1 text-xs"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="size-3.5 text-emerald-500" />
              ) : (
                <Copy className="size-3.5" />
              )}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 px-2 gap-1 text-xs",
                liked && "text-red-500 hover:text-red-600"
              )}
              onClick={handleLike}
            >
              <motion.div
                whileTap={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Heart className={cn("size-3.5", liked && "fill-current")} />
              </motion.div>
              <span>{likeCount}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 gap-1 text-xs"
              onClick={handleShare}
            >
              <Share2 className="size-3.5" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <Eye className="size-3.5" />
              {formatViews(views)}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-7 px-2",
                saved && "text-primary"
              )}
              onClick={() => setSaved((prev) => !prev)}
            >
              <Bookmark className={cn("size-3.5", saved && "fill-current")} />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
