"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Search, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AnimatedCounter } from "@/components/animated-counter"
import { cn } from "@/lib/utils"

const stats = [
  { target: 10000, suffix: "+", label: "AI Prompts" },
  { target: 50, suffix: "+", label: "Free Tools" },
  { target: 100000, suffix: "+", label: "Users" },
  { target: 4.9, suffix: "", label: "Rating", prefix: "" },
]

const floatingElements = [
  { icon: Sparkles, x: "10%", y: "20%", delay: 0, size: 16, opacity: 0.2 },
  { icon: Zap, x: "85%", y: "15%", delay: 1, size: 14, opacity: 0.15 },
  { icon: Sparkles, x: "75%", y: "70%", delay: 2, size: 12, opacity: 0.18 },
  { icon: Sparkles, x: "15%", y: "75%", delay: 0.5, size: 10, opacity: 0.12 },
  { icon: Zap, x: "50%", y: "10%", delay: 1.5, size: 18, opacity: 0.1 },
  { icon: Sparkles, x: "90%", y: "45%", delay: 2.5, size: 14, opacity: 0.15 },
]

export function HeroSection() {
  const [searchQuery, setSearchQuery] = React.useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/prompts?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-background to-blue-50 dark:from-violet-950/20 dark:via-background dark:to-blue-950/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-400/20 dark:bg-violet-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-300/10 dark:bg-purple-800/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Decorative Elements */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-primary"
          style={{
            left: el.x,
            top: el.y,
            opacity: el.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            ease: "linear",
            delay: el.delay,
          }}
        >
          <el.icon className="size-4" style={{ width: el.size, height: el.size }} />
        </motion.div>
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-8">
          {/* Headline */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 backdrop-blur px-4 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="size-3.5 text-primary" />
              Powered by AI — Free forever
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
              Discover{" "}
              <span className="gradient-text">Viral AI Prompts</span>
              <br />
              &{" "}
              <span className="gradient-text">Free Creator Tools</span>
            </h1>
          </motion.div>

          {/* Subheading */}
          <motion.p
            className="text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Unlock the power of AI with curated prompts, free tools, and creator
            utilities — all in one platform.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/prompts">
              <Button size="lg" className="gradient-bg border-0 text-white font-semibold gap-2 px-6 h-12 text-base">
                Explore Prompts
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <Link href="/tools">
              <Button size="lg" variant="outline" className="gap-2 px-6 h-12 text-base font-semibold">
                <Zap className="size-4" />
                Free Tools
              </Button>
            </Link>
          </motion.div>

          {/* Floating Search Bar */}
          <motion.div
            className="w-full max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSearch} className="relative">
              <div className="glass rounded-xl p-1.5 glow">
                <div className="flex items-center gap-2 bg-background rounded-lg px-4 py-2">
                  <Search className="size-5 text-muted-foreground shrink-0" />
                  <Input
                    type="text"
                    placeholder="Search prompts, tools, categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 bg-transparent h-9 px-0 text-sm"
                  />
                  <kbd className="pointer-events-none hidden sm:inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    ⌘K
                  </kbd>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Stats Counters */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <div className="text-2xl sm:text-3xl font-bold text-primary">
                  {stat.label === "Rating" ? (
                    <span>{stat.prefix ?? ""}{stat.target}{stat.suffix}</span>
                  ) : (
                    <AnimatedCounter
                      target={stat.target}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      duration={2}
                    />
                  )}
                </div>
                <span className="text-muted-foreground text-xs sm:text-sm">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
