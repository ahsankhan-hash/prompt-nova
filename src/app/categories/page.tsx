import { CategoriesClient } from "./categories-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Browse Categories",
  description:
    "Explore AI prompt categories including ChatGPT, Midjourney, Coding, YouTube, Business, Marketing, and more.",
  openGraph: {
    title: "Browse Categories | PromptNova AI",
    description:
      "Explore AI prompt categories including ChatGPT, Midjourney, Coding, YouTube, Business, Marketing, and more.",
  },
  alternates: { canonical: "/categories" },
}

export default function CategoriesPage() {
  return (
    <div className="pt-24 pb-16">
      <CategoriesClient />
    </div>
  )
}
