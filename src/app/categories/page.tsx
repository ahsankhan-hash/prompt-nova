import { db } from "@/lib/db"
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

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Categories",
  description:
    "Explore AI prompt categories including ChatGPT, Midjourney, Coding, YouTube, Business, Marketing, and more.",
  openGraph: {
    title: "Browse Categories | PromptNova AI",
    description:
      "Explore AI prompt categories including ChatGPT, Midjourney, Coding, YouTube, Business, Marketing, and more.",
  },
  alternates: { canonical: "/categories" },
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

export default async function CategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { promptCount: "desc" },
  })

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="size-6 text-primary" />
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
    </div>
  )
}
