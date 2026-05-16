"use client"

import * as React from "react"
import Link from "next/link"
import {
  MessageSquare,
  Palette,
  Code2,
  Youtube,
  Briefcase,
  Megaphone,
  PenTool,
  GraduationCap,
  Gamepad2,
  Music,
  Camera,
  Globe,
  type LucideIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CategoryBadgeProps {
  name: string
  slug: string
  icon?: string
  count?: number
  className?: string
}

const categoryConfig: Record<
  string,
  { color: string; bgColor: string; icon: LucideIcon }
> = {
  chatgpt: {
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-100 dark:bg-emerald-950/50",
    icon: MessageSquare,
  },
  midjourney: {
    color: "text-violet-700 dark:text-violet-400",
    bgColor: "bg-violet-100 dark:bg-violet-950/50",
    icon: Palette,
  },
  coding: {
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-950/50",
    icon: Code2,
  },
  youtube: {
    color: "text-red-700 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-950/50",
    icon: Youtube,
  },
  business: {
    color: "text-amber-700 dark:text-amber-400",
    bgColor: "bg-amber-100 dark:bg-amber-950/50",
    icon: Briefcase,
  },
  marketing: {
    color: "text-pink-700 dark:text-pink-400",
    bgColor: "bg-pink-100 dark:bg-pink-950/50",
    icon: Megaphone,
  },
  writing: {
    color: "text-teal-700 dark:text-teal-400",
    bgColor: "bg-teal-100 dark:bg-teal-950/50",
    icon: PenTool,
  },
  education: {
    color: "text-indigo-700 dark:text-indigo-400",
    bgColor: "bg-indigo-100 dark:bg-indigo-950/50",
    icon: GraduationCap,
  },
  gaming: {
    color: "text-orange-700 dark:text-orange-400",
    bgColor: "bg-orange-100 dark:bg-orange-950/50",
    icon: Gamepad2,
  },
  music: {
    color: "text-fuchsia-700 dark:text-fuchsia-400",
    bgColor: "bg-fuchsia-100 dark:bg-fuchsia-950/50",
    icon: Music,
  },
  photography: {
    color: "text-cyan-700 dark:text-cyan-400",
    bgColor: "bg-cyan-100 dark:bg-cyan-950/50",
    icon: Camera,
  },
  seo: {
    color: "text-lime-700 dark:text-lime-400",
    bgColor: "bg-lime-100 dark:bg-lime-950/50",
    icon: Globe,
  },
}

const defaultConfig = {
  color: "text-purple-700 dark:text-purple-400",
  bgColor: "bg-purple-100 dark:bg-purple-950/50",
  icon: MessageSquare,
}

function getCategoryConfig(slug: string) {
  return categoryConfig[slug.toLowerCase()] ?? defaultConfig
}

export function CategoryBadge({
  name,
  slug,
  icon,
  count,
  className,
}: CategoryBadgeProps) {
  const config = getCategoryConfig(slug)
  const IconComponent = icon ? config.icon : config.icon

  return (
    <Link href={`/prompts/${slug}`}>
      <Badge
        variant="secondary"
        className={cn(
          "cursor-pointer gap-1.5 border-0 px-3 py-1 text-xs font-medium transition-all hover:scale-105",
          config.bgColor,
          config.color,
          className
        )}
      >
        <IconComponent className="size-3.5" />
        {name}
        {count !== undefined && (
          <span className="ml-0.5 opacity-70">({count})</span>
        )}
      </Badge>
    </Link>
  )
}
