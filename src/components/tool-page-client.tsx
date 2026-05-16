"use client"

import dynamic from "next/dynamic"

// Dynamic imports for each tool component
const YoutubeTitleGenerator = dynamic(
  () => import("@/components/tools/youtube-title-generator").then((m) => ({ default: m.YoutubeTitleGenerator })),
  { ssr: false }
)
const YoutubeTagsGenerator = dynamic(
  () => import("@/components/tools/youtube-tags-generator").then((m) => ({ default: m.YoutubeTagsGenerator })),
  { ssr: false }
)
const ThumbnailPromptGenerator = dynamic(
  () => import("@/components/tools/thumbnail-prompt-generator").then((m) => ({ default: m.ThumbnailPromptGenerator })),
  { ssr: false }
)
const AiBioGenerator = dynamic(
  () => import("@/components/tools/ai-bio-generator").then((m) => ({ default: m.AiBioGenerator })),
  { ssr: false }
)
const AiHookGenerator = dynamic(
  () => import("@/components/tools/ai-hook-generator").then((m) => ({ default: m.AiHookGenerator })),
  { ssr: false }
)
const AiHashtagGenerator = dynamic(
  () => import("@/components/tools/ai-hashtag-generator").then((m) => ({ default: m.AiHashtagGenerator })),
  { ssr: false }
)
const AiCaptionGenerator = dynamic(
  () => import("@/components/tools/ai-caption-generator").then((m) => ({ default: m.AiCaptionGenerator })),
  { ssr: false }
)
const AiScriptSummarizer = dynamic(
  () => import("@/components/tools/ai-script-summarizer").then((m) => ({ default: m.AiScriptSummarizer })),
  { ssr: false }
)
const WordCounter = dynamic(
  () => import("@/components/tools/word-counter").then((m) => ({ default: m.WordCounter })),
  { ssr: false }
)
const QrCodeGenerator = dynamic(
  () => import("@/components/tools/qr-code-generator").then((m) => ({ default: m.QrCodeGenerator })),
  { ssr: false }
)
const AiEmailWriter = dynamic(
  () => import("@/components/tools/ai-email-writer").then((m) => ({ default: m.AiEmailWriter })),
  { ssr: false }
)
const MetaDescriptionGenerator = dynamic(
  () => import("@/components/tools/meta-description-generator").then((m) => ({ default: m.MetaDescriptionGenerator })),
  { ssr: false }
)
const GenericTool = dynamic(
  () => import("@/components/tools/generic-tool").then((m) => ({ default: m.GenericTool })),
  { ssr: false }
)

import type { ComponentType } from "react"

interface ToolPageClientProps {
  slug: string
  name: string
  description: string
}

const toolComponentMap: Record<string, ComponentType> = {
  "youtube-title-generator": YoutubeTitleGenerator,
  "youtube-tags-generator": YoutubeTagsGenerator,
  "thumbnail-prompt-generator": ThumbnailPromptGenerator,
  "ai-bio-generator": AiBioGenerator,
  "ai-hook-generator": AiHookGenerator,
  "ai-hashtag-generator": AiHashtagGenerator,
  "ai-caption-generator": AiCaptionGenerator,
  "ai-script-summarizer": AiScriptSummarizer,
  "word-counter": WordCounter,
  "qr-code-generator": QrCodeGenerator,
  "ai-email-writer": AiEmailWriter,
  "meta-description-generator": MetaDescriptionGenerator,
}

export function ToolPageClient({ slug, name, description }: ToolPageClientProps) {
  const ToolComponent = toolComponentMap[slug]

  if (ToolComponent) {
    return <ToolComponent />
  }

  return <GenericTool toolName={name} toolDescription={description} />
}
