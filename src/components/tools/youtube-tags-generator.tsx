"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Copy, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function YoutubeTagsGenerator() {
  const [topic, setTopic] = React.useState("")
  const [videoDescription, setVideoDescription] = React.useState("")
  const [tags, setTags] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error("Please enter a topic")
      return
    }
    setLoading(true)
    setTags([])
    try {
      const res = await fetch("/api/tools/youtube-tags-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, videoDescription }),
      })
      const data = await res.json()
      if (data.error) {
        toast.error(data.error)
      } else {
        setTags(data.tags || [])
      }
    } catch {
      toast.error("Failed to generate tags")
    } finally {
      setLoading(false)
    }
  }

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(tags.join(", "))
    setCopied(true)
    toast.success("All tags copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Generate YouTube Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Video Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., Python programming tutorial for beginners"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Video Description (optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your video content..."
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              rows={4}
            />
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
                Generate Tags
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Generated Tags</CardTitle>
            {tags.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleCopyAll} className="gap-1 text-xs">
                {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                {copied ? "Copied!" : "Copy All"}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {tags.length === 0 && !loading && (
            <div className="text-center py-10 text-muted-foreground text-sm">
              Enter a topic and click generate to see YouTube tag suggestions
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Generating optimized tags...</p>
            </div>
          )}
          <AnimatePresence>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                >
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1"
                    onClick={async () => {
                      await navigator.clipboard.writeText(tag)
                      toast.success(`Copied: ${tag}`)
                    }}
                  >
                    {tag}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
