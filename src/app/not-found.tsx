import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Sparkles } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-8 sm:p-12 max-w-lg w-full text-center">
        <div className="size-16 rounded-full gradient-bg flex items-center justify-center text-white mx-auto mb-6">
          <Sparkles className="size-8" />
        </div>

        <h1 className="text-6xl sm:text-7xl font-extrabold mb-2">
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold mb-3">Page Not Found</h2>

        <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Don&apos;t worry, our AI prompts and tools are still here for you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/">
            <Button className="gradient-bg border-0 text-white font-medium gap-2">
              <Home className="size-4" />
              Go Homepage
            </Button>
          </Link>
          <Link href="/prompts">
            <Button variant="outline" className="gap-2">
              <Sparkles className="size-4" />
              Browse Prompts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
