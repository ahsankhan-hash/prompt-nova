"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Copy, Check, Sparkles, Search } from "lucide-react"
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

export function MetaDescriptionGenerator() {
  const [pageTitle, setPageTitle] = React.useState("")
  const [keywords, setKeywords] = React.useState("")
  const [style, setStyle] = React.useState("Informative")
  const [description, setDescription] = React.useState("")
  const [alternatives, setAlternatives] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const handleGenerate = async () => {
    if (!pageTitle.trim()) {
      toast.error("Please enter a page title")
      return
    }
    setLoading(true)
    setDescription("")
    setAlternatives([])
    try {
      const res = await fetch("/api/tools/meta-description-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageTitle, keywords, style }),
      })
      const data = await res.json()
      if (data.error) {
        toast.error(data.error)
      } else {
        setDescription(data.description || "")
        setAlternatives(data.alternatives || [])
      }
    } catch {
      toast.error("Failed to generate meta description")
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success("Meta description copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  const charCount = (text: string) => text.length
  const isOptimal = (text: string) => text.length >= 120 && text.length <= 155

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="size-5 text-primary" />
            Generate Meta Description
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pageTitle">Page Title</Label>
            <Input
              id="pageTitle"
              placeholder="e.g., Best AI Tools for Content Creators 2024"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="keywords">Target Keywords (optional)</Label>
            <Input
              id="keywords"
              placeholder="e.g., AI tools, content creation, productivity"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Style</Label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Informative">Informative</SelectItem>
                <SelectItem value="Persuasive">Persuasive</SelectItem>
                <SelectItem value="Concise">Concise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleGenerate}
            disabled={loading || !pageTitle.trim()}
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
                Generate Description
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-lg">Generated Descriptions</CardTitle>
        </CardHeader>
        <CardContent>
          {!description && !loading && (
            <div className="text-center py-10 text-muted-foreground text-sm">
              Enter a page title and click generate to create meta descriptions
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Generating SEO-optimized descriptions...</p>
            </div>
          )}
          <AnimatePresence>
            <div className="space-y-4">
              {description && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">Primary</Badge>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${isOptimal(description) ? "text-emerald-500" : "text-amber-500"}`}>
                        {charCount(description)} chars
                      </span>
                      <Button variant="ghost" size="icon" className="size-7" onClick={() => handleCopy(description)}>
                        {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{description}</p>
                  {isOptimal(description) && (
                    <p className="text-[10px] text-emerald-500 mt-2">✓ Optimal length (120-155 characters)</p>
                  )}
                </motion.div>
              )}
              {alternatives.map((alt, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  className="glass rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">Alternative {index + 1}</Badge>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${isOptimal(alt) ? "text-emerald-500" : "text-amber-500"}`}>
                        {charCount(alt)} chars
                      </span>
                      <Button variant="ghost" size="icon" className="size-7" onClick={() => handleCopy(alt)}>
                        <Copy className="size-3.5" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{alt}</p>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
