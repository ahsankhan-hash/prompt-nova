import { BlogClient } from "./blog-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Insights & Guides",
  description:
    "Explore the latest AI insights, guides, tutorials, and tips for ChatGPT, YouTube, SEO, AI Prompts, and more.",
  openGraph: {
    title: "AI Insights & Guides | PromptNova AI Blog",
    description:
      "Explore the latest AI insights, guides, tutorials, and tips for ChatGPT, YouTube, SEO, AI Prompts, and more.",
  },
  alternates: { canonical: "/blog" },
}

export default function BlogPage() {
  return (
    <div className="pt-24 pb-16">
      <BlogClient />
    </div>
  )
}
