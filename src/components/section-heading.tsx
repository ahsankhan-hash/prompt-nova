"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  gradient?: boolean
  viewAllHref?: string
  viewAllText?: string
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  gradient = false,
  viewAllHref,
  viewAllText = "View All",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="space-y-1">
        <h2
          className={cn(
            "text-2xl font-bold tracking-tight sm:text-3xl",
            gradient && "gradient-text"
          )}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl">
            {subtitle}
          </p>
        )}
        {gradient && (
          <motion.div
            className="h-1 w-16 rounded-full gradient-bg mt-2"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors shrink-0"
        >
          {viewAllText}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  )
}
