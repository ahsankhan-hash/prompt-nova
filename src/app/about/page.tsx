import Link from "next/link"
import {
  Sparkles,
  BookOpen,
  Wrench,
  Users,
  Search,
  ArrowRight,
  Star,
  Zap,
  Target,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/scroll-reveal"
import { SectionHeading } from "@/components/section-heading"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about PromptNova AI — your ultimate destination for AI prompts, free creator tools, and resources to boost your productivity.",
  openGraph: {
    title: "About PromptNova AI",
    description:
      "Learn about PromptNova AI — your ultimate destination for AI prompts, free creator tools, and resources to boost your productivity.",
  },
  alternates: { canonical: "/about" },
}

const features = [
  {
    icon: BookOpen,
    title: "AI Prompt Library",
    description:
      "Access thousands of carefully curated and tested AI prompts for ChatGPT, Midjourney, Claude, and other leading AI models. Our library covers everything from creative writing to technical coding, business strategy to social media content. Each prompt is optimized for maximum effectiveness and includes customization tips.",
  },
  {
    icon: Wrench,
    title: "Free AI Tools",
    description:
      "Use our growing collection of free AI-powered tools designed for content creators, marketers, and professionals. From YouTube title generators to SEO meta description writers, our tools leverage advanced AI to save you hours of work. All tools are completely free with no sign-up required.",
  },
  {
    icon: Users,
    title: "Creator Resources",
    description:
      "Join a thriving community of AI enthusiasts and content creators. Access guides, tutorials, and best practices for leveraging AI in your workflow. Whether you are a beginner just starting with AI or an experienced prompt engineer, our resources help you stay ahead of the curve.",
  },
  {
    icon: Search,
    title: "SEO Utilities",
    description:
      "Boost your online visibility with our specialized SEO tools. Generate optimized meta descriptions, research keywords, analyze competitor content, and create SEO-friendly copy that ranks. Our tools combine AI intelligence with proven SEO strategies to maximize your content's reach.",
  },
]

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & CEO",
    initials: "AR",
  },
  {
    name: "Sam Chen",
    role: "Head of AI Research",
    initials: "SC",
  },
  {
    name: "Jordan Patel",
    role: "Lead Developer",
    initials: "JP",
  },
  {
    name: "Taylor Kim",
    role: "Content Director",
    initials: "TK",
  },
]

const stats = [
  { value: "10K+", label: "Prompts", icon: BookOpen },
  { value: "50+", label: "Tools", icon: Wrench },
  { value: "100K+", label: "Users", icon: Users },
  { value: "4.9", label: "Rating", icon: Star },
]

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="size-6 text-primary" />
              <Badge variant="secondary" className="text-xs">
                About Us
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              <span className="gradient-text">About PromptNova AI</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              We are on a mission to democratize AI by making powerful prompts and tools accessible
              to everyone. Whether you are a content creator, developer, entrepreneur, or student,
              PromptNova AI is your gateway to unlocking the full potential of artificial intelligence.
            </p>
          </div>
        </ScrollReveal>

        {/* Mission Section */}
        <ScrollReveal>
          <section className="mb-20">
            <div className="glass rounded-2xl p-8 sm:p-12 text-center">
              <div className="size-16 rounded-full gradient-bg flex items-center justify-center text-white mx-auto mb-6">
                <Target className="size-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                At PromptNova AI, we believe that artificial intelligence should be accessible to
                everyone, not just tech experts. Our mission is to bridge the gap between powerful
                AI capabilities and everyday users by providing curated prompts, intuitive tools,
                and comprehensive resources. We are committed to helping individuals and businesses
                harness AI to work smarter, create better content, and achieve their goals faster
                than ever before. Every prompt in our library has been tested and refined to deliver
                exceptional results, ensuring that you get the most out of every AI interaction.
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* What We Offer */}
        <section className="mb-20">
          <ScrollReveal>
            <SectionHeading
              title="What We Offer"
              subtitle="Everything you need to leverage AI effectively"
              gradient
              className="mb-10"
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <ScrollReveal key={feature.title} delay={0.1 * (index % 2)}>
                  <div className="glass rounded-xl p-6 h-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                    <div className="size-12 rounded-lg gradient-bg flex items-center justify-center text-white mb-4">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="font-semibold text-lg mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </section>

        {/* Our Story */}
        <ScrollReveal>
          <section className="mb-20 bg-muted/30 rounded-2xl p-8 sm:p-12">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-12 rounded-lg gradient-bg flex items-center justify-center text-white">
                  <Heart className="size-6" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Our Story</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  PromptNova AI was born from a simple frustration: finding high-quality AI prompts
                  was like searching for a needle in a haystack. Our founder, Alex Rivera, spent
                  countless hours crafting and testing prompts for various AI models, only to realize
                  that millions of others were facing the same challenge.
                </p>
                <p>
                  In early 2025, we set out to build the most comprehensive, well-organized library
                  of AI prompts on the internet. But we did not stop there. We realized that people
                  needed more than just prompts — they needed tools that made AI accessible and
                  actionable. So we built a suite of free AI-powered tools that anyone could use,
                  regardless of their technical expertise.
                </p>
                <p>
                  Today, PromptNova AI serves over 100,000 users worldwide, from solo content
                  creators to enterprise teams. Our library continues to grow daily, our tools
                  become more powerful with each update, and our community remains at the heart
                  of everything we do. We are just getting started, and we are excited to have
                  you along for the journey.
                </p>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Team Section */}
        <section className="mb-20">
          <ScrollReveal>
            <SectionHeading
              title="Meet Our Team"
              subtitle="The people behind PromptNova AI"
              gradient
              className="mb-10"
            />
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <ScrollReveal key={member.name} delay={0.1 * index}>
                <div className="glass rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                  <div className="size-16 rounded-full gradient-bg flex items-center justify-center text-white text-lg font-bold mx-auto mb-4">
                    {member.initials}
                  </div>
                  <h3 className="font-semibold text-base mb-1">{member.name}</h3>
                  <p className="text-muted-foreground text-sm">{member.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <ScrollReveal>
          <section className="mb-20">
            <div className="glass rounded-2xl p-8 sm:p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="text-center">
                      <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                        <Icon className="size-5" />
                      </div>
                      <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                        {stat.value}
                      </div>
                      <p className="text-muted-foreground text-sm">{stat.label}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal>
          <section className="text-center">
            <div className="glass rounded-2xl p-8 sm:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to Supercharge Your Workflow?
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto mb-8">
                Explore our prompt library and free tools to discover how AI can transform the way
                you work, create, and grow.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/prompts">
                  <Button size="lg" className="gradient-bg border-0 text-white font-medium gap-2">
                    <Sparkles className="size-4" />
                    Explore Prompts
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button size="lg" variant="outline" className="gap-2">
                    <Wrench className="size-4" />
                    Free Tools
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </div>
  )
}
