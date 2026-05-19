import { PromptsClient } from "./prompts-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Prompt Library",
  description:
    "Browse our curated collection of AI prompts for ChatGPT, Midjourney, YouTube, Coding, Business, and more.",
  openGraph: {
    title: "AI Prompt Library | PromptNova AI",
    description:
      "Browse our curated collection of AI prompts for ChatGPT, Midjourney, YouTube, Coding, Business, and more.",
  },
  alternates: { canonical: "/prompts" },
}

export default function PromptsPage() {
  return (
    <div className="pt-24 pb-16">
      <PromptsClient />
    </div>
  )
}
