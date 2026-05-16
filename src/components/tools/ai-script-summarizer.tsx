"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Copy, Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export function AiScriptSummarizer() {
  const [script, setScript] = React.useState("")
  const [maxLength, setMaxLength] = React.useState(200)
  const [summary, setSummary] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const handleSummarize = async () => {
    if (!script.trim()) {
      toast.error("Please enter a script to summarize")
      return
    }
    setLoading(true)
    setSummary("")
    try {
      const res = await fetch("/api/tools/ai-script-summarizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ script, maxLength }),
      })
      const data = await res.json()
      if (data.error) {
        toast.error(data.error)
      } else {
        setSummary(data.summary || "")
      }
    } catch {
      toast.error("Failed to summarize script")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary)
    setCopied(true)
    toast.success("Summary copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  const wordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            Summarize Script
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="script">Script Text</Label>
              <span className="text-xs text-muted-foreground">
                {wordCount(script)} words
              </span>
            </div>
            <Textarea
              id="script"
              placeholder="Paste your video script, article, or any text here..."
              value={script}
              onChange={(e) => setScript(e.target.value)}
              rows={10}
              className="min-h-[200px]"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Max Summary Length</Label>
              <span className="text-sm font-medium text-primary">{maxLength} words</span>
            </div>
            <Slider
              value={[maxLength]}
              onValueChange={([v]) => setMaxLength(v)}
              min={50}
              max={500}
              step={10}
              className="py-2"
            />
          </div>
          <Button
            onClick={handleSummarize}
            disabled={loading || !script.trim()}
            className="w-full gradient-bg border-0 text-white font-medium"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Summarizing...
              </>
            ) : (
              <>
                <Sparkles className="size-4 mr-2" />
                Summarize Script
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Summary</CardTitle>
            {summary && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  {wordCount(summary)} words
                </span>
                <Button variant="outline" size="sm" onClick={handleCopy} className="gap-1 text-xs">
                  {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!summary && !loading && (
            <div className="text-center py-10 text-muted-foreground text-sm">
              Paste a script and click summarize to see the result
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Summarizing your script...</p>
            </div>
          )}
          <AnimatePresence>
            {summary && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-lg p-4"
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{summary}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
