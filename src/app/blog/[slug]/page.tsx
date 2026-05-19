export const dynamic = "force-dynamic"
import { db } from "@/lib/db"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import type { Metadata } from "next"
import { Eye, Clock, ArrowLeft } from "lucide-react"
import { CategoryBadge } from "@/components/category-badge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BlogPostShareButtons } from "./share-buttons"
import { SchemaMarkup } from "@/components/schema-markup"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function estimateReadingTime(content: string) {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return {
    title: `${title} | PromptNova AI Blog`,
    description: `Read about ${title} and explore expert guides, tutorials, and insights on PromptNova AI.`,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  const post = await db.blogPost.findUnique({
    where: { slug },
  })

  if (!post || !post.isPublished) {
    notFound()
  }

  // Increment views
  await db.blogPost.update({
    where: { slug },
    data: { views: { increment: 1 } },
  })

  const readingTime = estimateReadingTime(post.content)

  // Fetch related posts from same category
  const relatedPosts = await db.blogPost.findMany({
    where: {
      category: post.category,
      isPublished: true,
      slug: { not: post.slug },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  })

  // Extract headings for table of contents
  const headings = post.content
    .split("\n")
    .filter((line) => /^#{2,3}\s/.test(line))
    .map((line) => {
      const level = line.match(/^(#+)/)?.[1].length || 2
      const text = line.replace(/^#+\s+/, "")
      const id = text.toLowerCase().replace(/[^\w]+/g, "-")
      return { level, text, id }
    })

  return (
    <div className="pt-24 pb-16">
      <SchemaMarkup
        type="article"
        data={{
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          author: {
            "@type": "Person",
            name: post.authorName,
          },
          datePublished: post.createdAt.toISOString(),
          dateModified: post.updatedAt.toISOString(),
          publisher: {
            "@type": "Organization",
            name: "PromptNova AI",
            url: "https://promptnova.ai",
          },
        }}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {post.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12">
          {/* Main Content */}
          <article>
            {/* Article Header */}
            <header className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <CategoryBadge
                  name={post.category}
                  slug={post.category.toLowerCase().replace(/\s+/g, "-")}
                />
                <Badge variant="secondary" className="text-xs">
                  {readingTime} min read
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full gradient-bg flex items-center justify-center text-white text-sm font-semibold">
                    {getInitials(post.authorName)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{post.authorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(post.createdAt)}
                    </p>
                  </div>
                </div>
                <Separator orientation="vertical" className="h-8 hidden sm:block" />
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="size-4" />
                    {post.views + 1} views
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-4" />
                    {readingTime} min read
                  </span>
                </div>
              </div>
            </header>

            <Separator className="mb-8" />

            {/* Article Content */}
            <div className="prose-custom max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold mt-10 mb-4 scroll-mt-24" id={String(children).toLowerCase().replace(/[^\w]+/g, "-")}>
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold mt-8 mb-3 scroll-mt-24" id={String(children).toLowerCase().replace(/[^\w]+/g, "-")}>
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mb-4 leading-relaxed text-foreground/90">{children}</p>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-disc pl-6 mb-4 space-y-1 text-foreground/90">{children}</ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal pl-6 mb-4 space-y-1 text-foreground/90">{children}</ol>
                  ),
                  li: ({ children }) => (
                    <li className="leading-relaxed">{children}</li>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary/30 pl-4 italic my-6 text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  code: ({ className, children }) => {
                    const isInline = !className
                    if (isInline) {
                      return (
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-primary">
                          {children}
                        </code>
                      )
                    }
                    return (
                      <code className="block bg-muted p-4 rounded-lg text-sm font-mono overflow-x-auto">
                        {children}
                      </code>
                    )
                  },
                  pre: ({ children }) => (
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6">
                      {children}
                    </pre>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">{children}</strong>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Tags */}
            {post.tags && (
              <div className="mt-8 pt-6 border-t">
                <h4 className="text-sm font-medium mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(",").map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag.trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="mt-8 pt-6 border-t">
              <h4 className="text-sm font-medium mb-3">Share this article</h4>
              <BlogPostShareButtons title={post.title} slug={post.slug} />
            </div>
          </article>

          {/* Sidebar - Desktop Only */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="rounded-xl border bg-card p-5">
                  <h3 className="font-semibold text-sm mb-3">Table of Contents</h3>
                  <nav className="space-y-1">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`block text-sm text-muted-foreground hover:text-primary transition-colors py-1 ${
                          heading.level === 3 ? "pl-4" : ""
                        }`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Share Buttons */}
              <div className="rounded-xl border bg-card p-5">
                <h3 className="font-semibold text-sm mb-3">Share</h3>
                <BlogPostShareButtons title={post.title} slug={post.slug} />
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="rounded-xl border bg-card p-5">
                  <h3 className="font-semibold text-sm mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="block group"
                      >
                        <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatDate(relatedPost.createdAt)}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Back to Blog */}
        <div className="mt-12 pt-8 border-t">
          <Link href="/blog">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="size-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
