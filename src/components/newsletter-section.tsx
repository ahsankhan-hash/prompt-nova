"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Sparkles, ArrowRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollReveal } from "@/components/scroll-reveal"

export function NewsletterSection() {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-2xl gradient-bg p-8 sm:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <motion.div
              className="absolute top-6 right-12"
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="size-8 text-white/20" />
            </motion.div>
            <motion.div
              className="absolute bottom-8 left-16"
              animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mail className="size-6 text-white/15" />
            </motion.div>

            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  Stay Ahead with AI Updates
                </h2>
                <p className="text-white/80 text-sm sm:text-base max-w-xl">
                  Get weekly AI tips, trending prompts, and new tool announcements
                  delivered straight to your inbox. Join 100K+ AI enthusiasts.
                </p>
              </div>

              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/15 border-white/25 text-white placeholder:text-white/60 backdrop-blur-sm focus-visible:ring-white/30 h-11"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-white text-purple-700 hover:bg-white/90 font-semibold gap-2 shrink-0 h-11"
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                  {!subscribed && <ArrowRight className="size-4" />}
                </Button>
              </form>

              {subscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white/90 text-sm font-medium"
                >
                  🎉 Welcome aboard! Check your inbox for a confirmation email.
                </motion.p>
              )}

              <p className="text-white/50 text-xs">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
