"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Copy, Check, Sparkles, ImageIcon } from "lucide-react"
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
import { toast } from "sonner"

export function ThumbnailPromptGenerator() {
  const [videoTitle, setVideoTitle] = React.useState("")
  const [style, setStyle] = React.useState("Cinematic")
  const [prompt, setPrompt] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const handleGenerate = async () => {
    if (!videoTitle.trim()) {
      toast.error("Please enter a video title")
      return
    }
    setLoading(true)
    setPrompt("")
    try {
      const res = await fetch("/api/tools/thumbnail-prompt-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoTitle, style }),
      })
      const data = await res.json()
      if (data.error) {
        toast.error(data.error)
      } else {
        setPrompt(data.prompt || "")
      }
    } catch {
      toast.error("Failed to generate thumbnail prompt")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopied(true)
    toast.success("Prompt copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <ImageIcon className="size-5 text-primary" />
            Generate Thumbnail Prompt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="videoTitle">Video Title</Label>
            <Input
              id="videoTitle"
              placeholder="e.g., 10 AI Tools That Will Change Your Life"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="style">Thumbnail Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger id="style">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cinematic">Cinematic</SelectItem>
                <SelectItem value="Bold & Colorful">Bold & Colorful</SelectItem>
                <SelectItem value="Minimalist">Minimalist</SelectItem>
                <SelectItem value="Clickbait">Clickbait</SelectItem>
                <SelectItem value="3D Render">3D Render</SelectItem>
                <SelectItem value="Photorealistic">Photorealistic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={loading || !videoTitle.trim()}
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
                Generate Prompt
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Midjourney Prompt</CardTitle>
            {prompt && (
              <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1 text-xs">
                {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                {copied ? "Copied!" : "Copy Prompt"}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!prompt && !loading && (
            <div className="text-center py-10 text-muted-foreground text-sm">
              Enter a video title and click generate to create a thumbnail prompt
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Creating thumbnail prompt...</p>
            </div>
          )}
          <AnimatePresence>
            {prompt && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-lg p-4"
              >
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {prompt}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
