import { Mail, MapPin, Twitter, Github, Youtube, Sparkles } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionHeading } from "@/components/section-heading"
import { FaqSection } from "@/components/faq-section"
import { ContactForm } from "@/components/contact-form"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the PromptNova AI team. We'd love to hear from you about partnerships, feedback, or any questions.",
  openGraph: {
    title: "Contact Us | PromptNova AI",
    description:
      "Get in touch with the PromptNova AI team. We'd love to hear from you about partnerships, feedback, or any questions.",
  },
  alternates: { canonical: "/contact" },
}

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@promptnova.ai",
    href: "mailto:hello@promptnova.ai",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "San Francisco, CA",
    href: null,
  },
  {
    icon: Twitter,
    label: "Twitter",
    value: "@PromptNovaAI",
    href: "https://twitter.com/promptnovaai",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "PromptNova",
    href: "https://github.com/promptnova",
  },
]

export default function ContactPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="size-6 text-primary" />
              <Badge variant="secondary" className="text-xs">
                Contact
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
              <span className="gradient-text">Get in Touch</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Have a question, suggestion, or partnership idea? We would love to hear from you.
              Our team typically responds within 24 hours.
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 mb-20">
          {/* Contact Form */}
          <ScrollReveal>
            <div className="glass rounded-xl p-6 sm:p-8">
              <h2 className="text-xl font-semibold mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              {/* Info Cards */}
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  {contactInfo.map((item) => {
                    const Icon = item.icon
                    const content = (
                      <div className="flex items-center gap-3 group" key={item.label}>
                        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{item.label}</p>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    )
                    return item.href ? (
                      <Link
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {content}
                      </Link>
                    ) : (
                      <div key={item.label}>{content}</div>
                    )
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Stay updated with the latest AI tips, prompts, and tool releases by following
                  us on social media.
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href="https://twitter.com/promptnovaai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="size-4" />
                  </Link>
                  <Link
                    href="https://github.com/promptnova"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="size-4" />
                  </Link>
                  <Link
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="size-4" />
                  </Link>
                </div>
              </div>

              {/* Response Time */}
              <div className="glass rounded-xl p-6">
                <h3 className="font-semibold mb-2">Response Time</h3>
                <p className="text-muted-foreground text-sm">
                  We aim to respond to all inquiries within 24 hours during business days. For
                  urgent matters, please reach out via Twitter DM for faster assistance.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* FAQ Section */}
        <FaqSection />
      </div>
    </div>
  )
}
