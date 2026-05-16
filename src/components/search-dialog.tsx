"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Home,
  Sparkles,
  Wrench,
  BookOpen,
  Search,
  MessageSquare,
  Palette,
  Code2,
  Youtube,
  Briefcase,
  Megaphone,
  Clock,
} from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

const quickLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Explore Prompts", href: "/prompts", icon: Sparkles },
  { name: "Free Tools", href: "/tools", icon: Wrench },
  { name: "Blog", href: "/blog", icon: BookOpen },
]

const categories = [
  { name: "ChatGPT Prompts", href: "/prompts/chatgpt", icon: MessageSquare },
  { name: "Midjourney Prompts", href: "/prompts/midjourney", icon: Palette },
  { name: "Coding Prompts", href: "/prompts/coding", icon: Code2 },
  { name: "YouTube Prompts", href: "/prompts/youtube", icon: Youtube },
  { name: "Business Prompts", href: "/prompts/business", icon: Briefcase },
  { name: "Marketing Prompts", href: "/prompts/marketing", icon: Megaphone },
]

const recentSearches = [
  "ChatGPT writing prompts",
  "Midjourney landscape",
  "YouTube thumbnail ideas",
]

export function SearchDialog() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback(
    (command: () => void) => {
      setOpen(false)
      command()
    },
    []
  )

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Search PromptNova AI"
      description="Search for prompts, tools, and categories..."
    >
      <CommandInput placeholder="Search prompts, tools, categories..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Quick Links">
          {quickLinks.map((link) => (
            <CommandItem
              key={link.name}
              onSelect={() => runCommand(() => router.push(link.href))}
            >
              <link.icon className="size-4" />
              {link.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Categories">
          {categories.map((cat) => (
            <CommandItem
              key={cat.name}
              onSelect={() => runCommand(() => router.push(cat.href))}
            >
              <cat.icon className="size-4" />
              {cat.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Recent Searches">
          {recentSearches.map((search) => (
            <CommandItem
              key={search}
              onSelect={() => runCommand(() => router.push(`/prompts?q=${encodeURIComponent(search)}`))}
            >
              <Clock className="size-4" />
              {search}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
      <div className="border-t px-4 py-2.5 flex items-center justify-between text-xs text-muted-foreground">
        <span>Navigate with ↑↓</span>
        <span>Press ↵ to select</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">esc</span>
        </kbd>
      </div>
    </CommandDialog>
  )
}
