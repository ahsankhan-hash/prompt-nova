export const dynamic = "force-dynamic"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { PromptDetailClient } from "@/components/prompt-detail-client"
import { PromptCard } from "@/components/prompt-card"
import { SectionHeading } from "@/components/section-heading"
import { ScrollReveal } from "@/components/scroll-reveal"
import Link from "next/link"
import { ChevronRight, Sparkles } from "lucide-react"

interface PromptPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PromptPageProps): Promise<Metadata> {
  const { slug } = await params
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${title} | PromptNova AI`,
    description: `Discover best optimized ${title} prompts and templates to boost your productivity.`,
  }
}

export default async function PromptDetailPage({ params }: PromptPageProps) {
  const { slug } = await params

  const prompt = await db.prompt.findUnique({ where: { slug } })

  if (!prompt) {
    notFound()
  }

  // Increment views
  await db.prompt.update({
    where: { slug },
    data: { views: { increment: 1 } },
  })

  // Fetch related prompts (same category, excluding current)
  const relatedPrompts = await db.prompt.findMany({
    where: {
      category: prompt.category,
      slug: { not: slug },
    },
    orderBy: { likes: "desc" },
    take: 4,
  })

  const promptViews = prompt.views + 1

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/prompts" className="hover:text-foreground transition-colors">
            Prompts
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground font-medium truncate">{prompt.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <PromptDetailClient
              slug={prompt.slug}
              title={prompt.title}
              content={prompt.content}
              category={prompt.category}
              tags={prompt.tags.split(",")}
              difficulty={prompt.difficulty}
              views={promptViews}
              likes={prompt.likes}
              copies={prompt.copies}
              authorName={prompt.authorName}
              createdAt={prompt.createdAt.toISOString()}
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Stats Card */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Views</span>
                  <span className="text-sm font-medium">{promptViews.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Likes</span>
                  <span className="text-sm font-medium">{prompt.likes.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Copies</span>
                  <span className="text-sm font-medium">{prompt.copies.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Category</span>
                  <span className="text-sm font-medium">{prompt.category.replace(/-prompts$/, "")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Difficulty</span>
                  <span className="text-sm font-medium capitalize">{prompt.difficulty}</span>
                </div>
              </div>
            </div>

            {/* Related Prompts */}
            {relatedPrompts.length > 0 && (
              <div>
                <SectionHeading
                  title="Related Prompts"
                  gradient
                  className="mb-4"
                />
                <div className="space-y-4">
                  {relatedPrompts.map((related, index) => (
                    <ScrollReveal key={related.id} delay={0.1 * index}>
                      <PromptCard
                        id={related.id}
                        title={related.title}
                        slug={related.slug}
                        description={related.description}
                        category={related.category}
                        tags={related.tags.split(",")}
                        difficulty={related.difficulty}
                        views={related.views}
                        likes={related.likes}
                        content={related.content}
                        isFeatured={related.isFeatured}
                        isTrending={related.isTrending}
                      />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
