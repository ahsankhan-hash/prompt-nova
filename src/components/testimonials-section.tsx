"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionHeading } from "@/components/section-heading"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Content Creator",
    avatar: "",
    initials: "SC",
    quote:
      "PromptNova AI has completely transformed my content creation workflow. The ChatGPT prompts are incredibly well-crafted and save me hours every week. The YouTube Title Generator alone boosted my click-through rates by 40%!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Digital Marketing Manager",
    avatar: "",
    initials: "MJ",
    quote:
      "As a marketing professional, I need tools that deliver results. The prompt library is a goldmine — especially the marketing and business categories. The SEO tools have become essential for our team's daily operations.",
    rating: 5,
  },
  {
    name: "Elena Rodriguez",
    role: "Freelance Designer",
    avatar: "",
    initials: "ER",
    quote:
      "The Midjourney prompts on PromptNova are next level. I've created some of my best client work using prompts from this library. The fact that everything is free is just amazing. Highly recommend to any creative professional!",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)

  // Auto-scroll
  React.useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isPaused])

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeading
            title="Loved by Creators Worldwide"
            subtitle="See what our community has to say about PromptNova AI"
            gradient
            className="text-center mb-12 [&]:flex-col [&]:items-center"
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div
            className="relative max-w-3xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Testimonial Cards */}
            <div className="overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${current * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="w-full shrink-0 px-1"
                  >
                    <div className="glass rounded-xl p-6 sm:p-8 flex flex-col gap-4">
                      {/* Quote Icon */}
                      <Quote className="size-8 text-primary/30" />

                      {/* Rating */}
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "size-4",
                              i < testimonial.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-muted-foreground/30"
                            )}
                          />
                        ))}
                      </div>

                      {/* Quote Text */}
                      <p className="text-foreground text-sm sm:text-base leading-relaxed">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                        <Avatar className="size-10 border-2 border-primary/20">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback className="gradient-bg text-white text-xs font-semibold">
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm">{testimonial.name}</p>
                          <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={goToPrev}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-4" />
              </Button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300",
                      current === index
                        ? "w-6 bg-primary"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={goToNext}
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
