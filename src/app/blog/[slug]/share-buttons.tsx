"use client"

import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, LinkIcon, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface BlogPostShareButtonsProps {
  title: string
  slug: string
}

export function BlogPostShareButtons({ title, slug }: BlogPostShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== "undefined" ? window.location.href : `https://promptnova.ai/blog/${slug}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Failed to copy link")
    }
  }

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  return (
    <div className="flex items-center gap-2">
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm" className="gap-1.5">
          <Twitter className="size-3.5" />
          Twitter
        </Button>
      </a>
      <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
        <Button variant="outline" size="sm" className="gap-1.5">
          <Linkedin className="size-3.5" />
          LinkedIn
        </Button>
      </a>
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5"
        onClick={handleCopyLink}
      >
        {copied ? (
          <>
            <Check className="size-3.5" />
            Copied!
          </>
        ) : (
          <>
            <LinkIcon className="size-3.5" />
            Copy Link
          </>
        )}
      </Button>
    </div>
  )
}
