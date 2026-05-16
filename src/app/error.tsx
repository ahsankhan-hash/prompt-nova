"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, RefreshCw, AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-8 sm:p-12 max-w-lg w-full text-center">
        <div className="size-16 rounded-full bg-destructive/10 flex items-center justify-center text-destructive mx-auto mb-6">
          <AlertTriangle className="size-8" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Something Went Wrong
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed">
          An unexpected error occurred. This might be a temporary issue — please
          try again. If the problem persists, feel free to contact our support team.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={reset}
            className="gradient-bg border-0 text-white font-medium gap-2"
          >
            <RefreshCw className="size-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="size-4" />
              Go Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
