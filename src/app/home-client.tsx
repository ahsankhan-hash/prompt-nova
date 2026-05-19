"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { PromptCard } from "@/components/prompt-card"
import { ToolCard } from "@/components/tool-card"
import { SectionHeading } from "@/components/section-heading"
import { NewsletterSection } from "@/components/newsletter-section"
import { FaqSection } from "@/components/faq-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ScrollReveal } from "@/components/scroll-reveal"
import { DailyFeaturedPrompt } from "@/components/daily-featured-prompt"
import { SchemaMarkup } from "@/components/schema-markup"
import {
  Sparkles,
  Star,
  ArrowRight,
  Calendar,
  BookOpen,
  Eye,
  Code2,
  Youtube,
  Briefcase,
  Megaphone,
  Zap,
  Share2,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// ─── Interfaces ──────────────────────────────────────────
interface Prompt {
  id: string
  title: string
  slug: string
  description: string
  content: string
  category: string
  tags: string
  difficulty: string
  views: number
  likes: number
  isFeatured: boolean
  isTrending: boolean
}

interface Tool {
  id: string
  name: string
  slug: string
  description: string
  category: string
  icon: string
  isFeatured: boolean
  isPopular: boolean
  usageCount: number
}

interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  promptCount: number
}

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string
  createdAt: string
  views: number
}

interface HomeData {
  trendingPrompts: Prompt[]
  popularTools: Tool[]
  categories: Category[]
  featuredTools: Tool[]
  dailyFeaturedPrompt: Prompt | null
  latestUploads: Prompt[]
  latestBlogPosts: BlogPost[]
}

// ─── Category Icon Mapping ──────────────────────────────
const categoryIconMap: Record<string, LucideIcon> = {
  MessageSquare: Sparkles, // fallback or specific if needed
  Image: Sparkles,
  Code: Code2,
  Youtube,
  Briefcase,
  Megaphone,
  Zap,
  Share2,
}

// ─── Top Creators (static) ──────────────────────────────
const topCreators = [
  { name: "Alex Chen", initials: "AC", role: "AI Prompt Engineer" },
  { name: "Sarah K.", initials: "SK", role: "Content Strategist" },
  { name: "Mike R.", initials: "MR", role: "YouTube Creator" },
  { name: "Emma W.", initials: "EW", role: "SEO Specialist" },
  { name: "David L.", initials: "DL", role: "Full-Stack Dev" },
]

export function HomeClient() {
  const [data, setData] = useState<HomeData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const response = await fetch("/api/home")
        if (!response.ok) {
          throw new Error("Failed to fetch home page data")
        }
        const resData = await response.json()
        setData(resData)
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }
    fetchHomeData()
  }, [])

  if (loading) {
    return (
      <>
        <HeroSection />
        <div className="py-20 text-center">
          <div className="inline-block size-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          <p className="mt-4 text-muted-foreground">Loading premium content...</p>
        </div>
      </>
    )
  }

  if (error || !data) {
    return (
      <>
        <HeroSection />
        <div className="py-20 text-center">
          <div className="glass rounded-xl p-8 max-w-md mx-auto border-destructive/20">
            <Sparkles className="size-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Unable to load content</h3>
            <p className="text-muted-foreground text-sm mb-6">{error || "Data failed to load"}</p>
            <button
              onClick={() => {
                setLoading(true)
                setError(null)
                fetch("/api/home")
                  .then((res) => res.json())
                  .then((d) => setData(d))
                  .catch((err) => setError(err.message))
                  .finally(() => setLoading(false))
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </>
    )
  }

  const {
    trendingPrompts,
    popularTools,
    categories,
    featuredTools,
    dailyFeaturedPrompt,
    latestUploads,
    latestBlogPosts,
  } = data

  return (
    <>
      <SchemaMarkup type="website" />
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Trending Prompts Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Trending Prompts"
              subtitle="The most popular AI prompts our community is using right now"
              gradient
              viewAllHref="/prompts"
              viewAllText="View All Prompts"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {trendingPrompts.map((prompt, index) => (
              <ScrollReveal key={prompt.id} delay={0.1 * (index % 3)}>
                <PromptCard
                  id={prompt.id}
                  title={prompt.title}
                  slug={prompt.slug}
                  description={prompt.description}
                  category={prompt.category}
                  tags={prompt.tags.split(",")}
                  difficulty={prompt.difficulty}
                  views={prompt.views}
                  likes={prompt.likes}
                  content={prompt.content}
                  isFeatured={prompt.isFeatured}
                  isTrending={prompt.isTrending}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Popular AI Tools Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Popular AI Tools"
              subtitle="Powerful AI-powered tools to boost your content and productivity"
              gradient
              viewAllHref="/tools"
              viewAllText="View All Tools"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {popularTools.map((tool, index) => (
              <ScrollReveal key={tool.id} delay={0.1 * (index % 3)}>
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
        </div>
      </section>

      {/* 4. Categories Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Browse by Category"
              subtitle="Find the perfect prompt for your AI tool of choice"
              gradient
              viewAllHref="/categories"
              viewAllText="All Categories"
            />
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
            {categories.map((cat, index) => {
              const IconComponent = categoryIconMap[cat.icon] || Sparkles
              return (
                <ScrollReveal key={cat.id} delay={0.05 * (index % 4)}>
                  <Link
                    href={`/prompts?category=${cat.slug}`}
                    className="group block"
                  >
                    <div className="glass rounded-xl p-5 flex flex-col items-center gap-3 text-center transition-all duration-300 hover:shadow-lg hover:glow hover:-translate-y-1">
                      <div className="flex size-12 items-center justify-center rounded-lg gradient-bg text-white transition-transform duration-300 group-hover:scale-110">
                        <IconComponent className="size-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm leading-snug group-hover:gradient-text transition-all">
                          {cat.name}
                        </h3>
                        <p className="text-muted-foreground text-xs mt-1">
                          {cat.promptCount} prompts
                        </p>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* 5. Featured Generators Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Featured Generators"
              subtitle="AI-powered generators to supercharge your content creation"
              gradient
              viewAllHref="/tools"
              viewAllText="All Generators"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {featuredTools.map((tool, index) => (
              <ScrollReveal key={tool.id} delay={0.1 * (index % 4)}>
                <Link href={`/tools/${tool.slug}`} className="group block">
                  <div className="relative glass rounded-xl p-6 h-full flex flex-col gap-3 transition-all duration-300 hover:shadow-lg hover:glow hover:-translate-y-1">
                    <Badge className="absolute top-3 right-3 bg-violet-100 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400 border-0 text-[10px] gap-0.5 px-1.5 py-0 h-5">
                      <Star className="size-2.5" />
                      Featured
                    </Badge>
                    <div className="flex size-12 items-center justify-center rounded-lg gradient-bg text-white">
                      <Wrench className="size-6" />
                    </div>
                    <h3 className="font-semibold text-base leading-snug group-hover:gradient-text transition-all">
                      {tool.name}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <span className="text-muted-foreground text-xs">
                        {tool.usageCount >= 1000
                          ? `${(tool.usageCount / 1000).toFixed(1)}K`
                          : tool.usageCount}{" "}
                        uses
                      </span>
                      <span className="inline-flex items-center gap-1 text-primary text-xs font-medium group-hover:translate-x-1 transition-transform">
                        Try Now
                        <ArrowRight className="size-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Daily Featured Prompt Section */}
      {dailyFeaturedPrompt && (
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <SectionHeading
                title="Daily Featured Prompt"
                subtitle="Our top pick of the day — a prompt you don't want to miss"
                gradient
              />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="mt-8">
                <DailyFeaturedPrompt prompt={dailyFeaturedPrompt} />
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 7. Top Creators Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Top Creators"
              subtitle="Meet the prompt engineers behind our best content"
              gradient
            />
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {topCreators.map((creator, index) => (
              <ScrollReveal key={creator.name} delay={0.1 * index}>
                <div className="glass rounded-xl p-5 flex flex-col items-center gap-3 text-center w-36 transition-all duration-300 hover:shadow-lg hover:glow hover:-translate-y-1">
                  <Avatar className="size-14 border-2 border-primary/30">
                    <AvatarFallback className="gradient-bg text-white text-sm font-bold">
                      {creator.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{creator.name}</p>
                    <p className="text-muted-foreground text-[11px] mt-0.5">{creator.role}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Latest Uploads Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="Latest Uploads"
              subtitle="Fresh prompts just added to our library"
              gradient
              viewAllHref="/prompts"
              viewAllText="View All"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {latestUploads.map((prompt, index) => (
              <ScrollReveal key={prompt.id} delay={0.1 * (index % 3)}>
                <PromptCard
                  id={prompt.id}
                  title={prompt.title}
                  slug={prompt.slug}
                  description={prompt.description}
                  category={prompt.category}
                  tags={prompt.tags.split(",")}
                  difficulty={prompt.difficulty}
                  views={prompt.views}
                  likes={prompt.likes}
                  content={prompt.content}
                  isFeatured={prompt.isFeatured}
                  isTrending={prompt.isTrending}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. AI News / Blog Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeading
              title="AI News & Insights"
              subtitle="Stay updated with the latest in AI, prompts, and creator tools"
              gradient
              viewAllHref="/blog"
              viewAllText="View All Posts"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {latestBlogPosts.map((post, index) => (
              <ScrollReveal key={post.id} delay={0.1 * (index % 3)}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <article className="glass rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:glow hover:-translate-y-1">
                    {/* Image Placeholder */}
                    <div className="relative h-44 gradient-bg flex items-center justify-center">
                      <BookOpen className="size-10 text-white/40" />
                      <Badge className="absolute top-3 left-3 bg-white/20 backdrop-blur text-white border-0 text-[10px]">
                        {post.category}
                      </Badge>
                    </div>
                    <div className="p-5 flex flex-col gap-3 flex-1">
                      <h3 className="font-semibold text-base leading-snug line-clamp-2 group-hover:gradient-text transition-all">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Calendar className="size-3" />
                          {new Date(post.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <Eye className="size-3" />
                          {post.views.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <TestimonialsSection />

      {/* 11. Newsletter */}
      <NewsletterSection />

      {/* 12. FAQ */}
      <FaqSection />
    </>
  )
}
