"use client"

import * as React from "react"
import Link from "next/link"
import { Sparkles, Twitter, Github, Youtube, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Prompts", href: "/prompts" },
  { name: "Tools", href: "/tools" },
  { name: "Blog", href: "/blog" },
]

const categories = [
  { name: "ChatGPT", href: "/prompts/chatgpt" },
  { name: "Midjourney", href: "/prompts/midjourney" },
  { name: "Coding", href: "/prompts/coding" },
  { name: "YouTube", href: "/prompts/youtube" },
  { name: "Business", href: "/prompts/business" },
  { name: "Marketing", href: "/prompts/marketing" },
]

const tools = [
  { name: "YouTube Title Generator", href: "/tools/youtube-title-generator" },
  { name: "AI Bio Generator", href: "/tools/ai-bio-generator" },
  { name: "SEO Meta Generator", href: "/tools/seo-meta-generator" },
  { name: "Hashtag Generator", href: "/tools/hashtag-generator" },
  { name: "Content Rewriter", href: "/tools/content-rewriter" },
]

const legal = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
]

export function Footer() {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-muted/30 border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-10 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Stay Ahead with AI Updates</h3>
              <p className="text-muted-foreground text-sm">
                Get weekly AI tips, new prompts, and tool updates delivered to your inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="md:w-64"
                required
              />
              <Button type="submit" className="gradient-bg border-0 text-white shrink-0">
                {subscribed ? "Subscribed!" : "Subscribe"}
                {!subscribed && <ArrowRight className="size-4 ml-1" />}
              </Button>
            </form>
          </div>
        </div>

        {/* Links Grid */}
        <div className="py-10 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              <span className="text-lg font-bold">
                <span className="gradient-text">PromptNova</span>
                <span className="text-muted-foreground font-normal ml-0.5">AI</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Discover viral AI prompts and free creator tools to boost your content, SEO, and productivity.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="size-4" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github className="size-4" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="size-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Categories</h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Tools</h4>
            <ul className="space-y-2">
              {tools.map((tool) => (
                <li key={tool.name}>
                  <Link
                    href={tool.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2">
              {legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <Separator />
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} PromptNova AI. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Built with ❤️ for the AI community
          </p>
        </div>
      </div>
    </footer>
  )
}
