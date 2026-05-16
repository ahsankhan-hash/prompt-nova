"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Copy, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function YoutubeTitleGenerator() {
  const [topic, setTopic] = React.useState("")
  const [style, setStyle] = React.useState("How-to")
  const [titles, setTitles] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false)
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null)

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic")
      return
    }
    setLoading(true)
    setTitles([])
    try {
      const res = await fetch("/api/tools/youtube-title-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, style }),
      })
      const data = await res.json()
      if (data.error) {
        toast.error(data.error)
      } else {
        setTitles(data.titles || [])
      }
    } catch {
      toast.error("Failed to generate titles")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    toast.success("Title copied!")
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(titles.join("\n"))
    toast.success("All titles copied!")
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Generate YouTube Titles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Video Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., How to start a YouTube channel in 2024"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="style">Title Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger id="style">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="How-to">How-to</SelectItem>
                <SelectItem value="Listicle">Listicle</SelectItem>
                <SelectItem value="Tutorial">Tutorial</SelectItem>
                <SelectItem value="Review">Review</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={loading || !topic.trim()}
            className="w-full gradient-bg border-0 text-white font-medium"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="size-4 mr-2" />
                Generate 10 Titles
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Generated Titles</CardTitle>
            {titles.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleCopyAll} className="gap-1 text-xs">
                <Copy className="size-3" /> Copy All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {titles.length === 0 && !loading && (
            <div className="text-center py-10 text-muted-foreground text-sm">
              Enter a topic and click generate to see YouTube title ideas
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Generating viral titles...</p>
            </div>
          )}
          <AnimatePresence>
            <div className="space-y-3">
              {titles.map((title, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3 group p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <Badge variant="outline" className="shrink-0 mt-0.5 size-6 flex items-center justify-center p-0 text-[10px]">
                    {index + 1}
                  </Badge>
                  <p className="text-sm flex-1 leading-relaxed">{title}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleCopy(title, index)}
                  >
                    {copiedIndex === index ? (
                      <Check className="size-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="size-3.5" />
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
