import { db } from "@/lib/db"
import { ToolCard } from "@/components/tool-card"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ToolsFilter } from "@/components/tools-filter"
import { Badge } from "@/components/ui/badge"
import { Wrench, Sparkles } from "lucide-react"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Free AI Tools",
  description:
    "Powerful AI-powered tools to boost your content creation and productivity. YouTube title generator, bio generator, hashtag generator, and more.",
  openGraph: {
    title: "Free AI Tools | PromptNova AI",
    description:
      "Powerful AI-powered tools to boost your content creation and productivity.",
  },
  alternates: { canonical: "/tools" },
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const category = params.category

  const where: Record<string, unknown> = {}
  if (category) where.category = category

  const tools = await db.tool.findMany({
    where,
    orderBy: { usageCount: "desc" },
  })

  const totalTools = await db.tool.count()

  return (
    <div className="pt-24 pb-16">
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
    </div>
  )
}
