"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Wrench,
  Star,
  TrendingUp,
  MessageSquare,
  Palette,
  Code2,
  Youtube,
  Briefcase,
  Megaphone,
  PenTool,
  Hash,
  FileText,
  Globe,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ToolCardProps {
  id: string
  name: string
  slug: string
  description: string
  category: string
  icon: string
  usageCount: number
  isFeatured?: boolean
  isPopular?: boolean
}

function ToolIcon({ name, className }: { name: string; className?: string }) {
  switch (name.toLowerCase()) {
    case "message":
      return <MessageSquare className={className} />
    case "palette":
      return <Palette className={className} />
    case "code":
      return <Code2 className={className} />
    case "youtube":
      return <Youtube className={className} />
    case "briefcase":
      return <Briefcase className={className} />
    case "megaphone":
      return <Megaphone className={className} />
    case "pen":
      return <PenTool className={className} />
    case "hash":
      return <Hash className={className} />
    case "file":
      return <FileText className={className} />
    case "globe":
      return <Globe className={className} />
    default:
      return <Wrench className={className} />
  }
}

function formatUsageCount(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`
  if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`
  return count.toString()
}

export function ToolCard({
  id,
  name,
  slug,
  description,
  category,
  icon,
  usageCount,
  isFeatured = false,
  isPopular = false,
}: ToolCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <div className="glass rounded-xl p-5 h-full flex flex-col gap-4 transition-all duration-300 group-hover:shadow-lg group-hover:glow">
        {/* Top Row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg gradient-bg text-white">
              <ToolIcon name={icon} className="size-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-semibold text-sm leading-snug">
                {name}
              </h3>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 font-normal">
                {category}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {isPopular && (
              <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400 border-0 text-[10px] gap-0.5 px-1.5 py-0 h-5">
                <TrendingUp className="size-2.5" />
                Popular
              </Badge>
            )}
            {isFeatured && (
              <Badge className="bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400 border-0 text-[10px] gap-0.5 px-1.5 py-0 h-5">
                <Star className="size-2.5" />
                Featured
              </Badge>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
          {description}
        </p>

        {/* Bottom Row */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-muted-foreground text-xs">
            {formatUsageCount(usageCount)} uses
          </span>
          <Link href={`/tools/${slug}`}>
            <Button size="sm" className="gradient-bg border-0 text-white h-7 text-xs font-medium">
              Try Now
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
