import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ToolPageClient } from "@/components/tool-page-client"
import { ToolCard } from "@/components/tool-card"
import { SectionHeading } from "@/components/section-heading"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SchemaMarkup } from "@/components/schema-markup"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface ToolPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params
  const tool = await db.tool.findUnique({ where: { slug } })

  if (!tool) {
    return {
      title: "Tool Not Found | PromptNova AI",
    }
  }

  return {
    title: `${tool.name} - Free AI Tool | PromptNova AI`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} - Free AI Tool | PromptNova AI`,
      description: tool.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description: tool.description,
    },
  }
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params

  const tool = await db.tool.findUnique({ where: { slug } })

  if (!tool) {
    notFound()
  }

  // Increment usage count
  await db.tool.update({
    where: { slug },
    data: { usageCount: { increment: 1 } },
  })

  // Fetch related tools (same category, excluding current)
  const relatedTools = await db.tool.findMany({
    where: {
      category: tool.category,
      slug: { not: slug },
    },
    orderBy: { usageCount: "desc" },
    take: 3,
  })

  return (
    <div className="pt-24 pb-16">
      <SchemaMarkup
        type="softwareApplication"
        data={{
          "@type": "SoftwareApplication",
          name: tool.name,
          description: tool.description,
          applicationCategory: "UtilityApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/tools" className="hover:text-foreground transition-colors">
            Tools
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground font-medium truncate">{tool.name}</span>
        </nav>

        {/* Tool Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-2">
            <span className="gradient-text">{tool.name}</span>
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            {tool.description}
          </p>
        </div>

        {/* Tool Interface */}
        <div className="mb-16">
          <ToolPageClient slug={tool.slug} name={tool.name} description={tool.description} />
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div>
            <ScrollReveal>
              <SectionHeading
                title="Related Tools"
                gradient
                viewAllHref="/tools"
                viewAllText="View All Tools"
                className="mb-6"
              />
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTools.map((related, index) => (
                <ScrollReveal key={related.id} delay={0.1 * index}>
                  <ToolCard
                    id={related.id}
                    name={related.name}
                    slug={related.slug}
                    description={related.description}
                    category={related.category}
                    icon={related.icon}
                    usageCount={related.usageCount}
                    isFeatured={related.isFeatured}
                    isPopular={related.isPopular}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
