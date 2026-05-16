"use client"

import * as React from "react"
import { LetterText, Type, Hash, Pilcrow, Clock } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function WordCounter() {
  const [text, setText] = React.useState("")

  const words = text.trim().split(/\s+/).filter(Boolean).length
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, "").length
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim().length > 0).length || (text.trim() ? 1 : 0)
  const readingTime = Math.max(1, Math.ceil(words / 200))

  const stats = [
    { label: "Words", value: words, icon: Type },
    { label: "Characters", value: characters, icon: LetterText },
    { label: "Characters (no spaces)", value: charactersNoSpaces, icon: Hash },
    { label: "Sentences", value: sentences, icon: Pilcrow },
    { label: "Paragraphs", value: paragraphs, icon: Hash },
    { label: "Reading Time", value: `${readingTime} min`, icon: Clock },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-lg">Enter Your Text</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">Text to Analyze</Label>
            <Textarea
              id="text"
              placeholder="Type or paste your text here to see real-time word count and statistics..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={16}
              className="min-h-[300px] resize-y"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-lg">Text Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-lg p-4 text-center"
              >
                <stat.icon className="size-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Character density */}
          {text.length > 0 && (
            <div className="mt-6 space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground">Top Characters</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(
                  text
                    .toLowerCase()
                    .split("")
                    .filter((c) => c.match(/[a-z]/))
                    .reduce<Record<string, number>>((acc, char) => {
                      acc[char] = (acc[char] || 0) + 1
                      return acc
                    }, {})
                )
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 10)
                  .map(([char, count]) => (
                    <span
                      key={char}
                      className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary rounded px-2 py-1 font-mono"
                    >
                      {char}: {count}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
