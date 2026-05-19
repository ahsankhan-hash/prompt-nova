import { HomeClient } from "./home-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PromptNova - Premium AI Prompt Library & Generator Tools",
  description:
    "Discover and generate premium AI prompts for ChatGPT, Midjourney, Coding, Marketing, and more. Boost your AI productivity with PromptNova.",
  openGraph: {
    title: "PromptNova - Premium AI Prompt Library & Generator Tools",
    description:
      "Discover and generate premium AI prompts for ChatGPT, Midjourney, Coding, Marketing, and more. Boost your AI productivity with PromptNova.",
  },
  alternates: { canonical: "/" },
}

export default function Home() {
  return <HomeClient />
}
