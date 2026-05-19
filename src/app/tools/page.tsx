import { ToolsClient } from "./tools-client"
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

export default function ToolsPage() {
  return (
    <div className="pt-24 pb-16">
      <ToolsClient />
    </div>
  )
}
