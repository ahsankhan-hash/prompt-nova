"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionHeading } from "@/components/section-heading"
import { createFAQSchema } from "@/components/schema-markup"

const faqItems = [
  {
    question: "What is PromptNova AI?",
    answer:
      "PromptNova AI is a comprehensive platform that offers thousands of curated AI prompts for tools like ChatGPT, Midjourney, and more, along with free creator tools for YouTube, SEO, social media, and content creation. Our goal is to help creators and professionals leverage AI effectively.",
  },
  {
    question: "Are the prompts and tools really free?",
    answer:
      "Yes! All our prompts and tools are completely free to use. We believe in making AI accessible to everyone. Some advanced features may be available in a premium tier in the future, but the core library and tools will always remain free.",
  },
  {
    question: "How do I use the AI prompts?",
    answer:
      "Simply browse our prompt library, find a prompt that fits your needs, and click the copy button. Then paste it into your preferred AI tool like ChatGPT, Claude, or Midjourney. Each prompt is optimized for specific use cases and includes tips for customization.",
  },
  {
    question: "Can I submit my own prompts?",
    answer:
      "Absolutely! We encourage community contributions. You can submit your own AI prompts through our submission form. Our team reviews each prompt for quality and relevance before adding it to the library. Top contributors get featured on our leaderboard.",
  },
  {
    question: "What types of free tools are available?",
    answer:
      "We offer a growing collection of free AI-powered tools including YouTube Title Generator, AI Bio Generator, SEO Meta Description Generator, Hashtag Generator, Content Rewriter, and many more. All tools are powered by advanced AI models and are free to use.",
  },
  {
    question: "How often is new content added?",
    answer:
      "We add new prompts daily and new tools weekly. Our team of AI experts constantly curates and tests new prompts to ensure they deliver the best results. Subscribe to our newsletter to get notified about new additions and trending prompts.",
  },
]

export function FaqSection() {
  const faqSchema = createFAQSchema(faqItems)

  return (
    <section className="py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about PromptNova AI"
            gradient
            className="text-center mb-8 [&]:flex-col [&]:items-center"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-sm sm:text-base font-medium hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  )
}
