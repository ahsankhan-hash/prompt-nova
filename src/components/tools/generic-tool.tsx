"use client"

import * as React from "react"
import { Sparkles, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

interface GenericToolProps {
  toolName: string
  toolDescription: string
}

export function GenericTool({ toolName, toolDescription }: GenericToolProps) {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      toast.success("You'll be notified when this tool is ready!")
      setEmail("")
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="glass border-0 text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="flex size-16 items-center justify-center rounded-xl gradient-bg text-white">
              <Sparkles className="size-8" />
            </div>
          </div>
          <CardTitle className="text-2xl">{toolName}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{toolDescription}</p>

          <div className="glass rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This tool is currently under development. Sign up to be notified when it launches!
            </p>

            {!subscribed ? (
              <form onSubmit={handleNotify} className="flex gap-2 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit" className="gradient-bg border-0 text-white shrink-0 gap-1">
                  <Mail className="size-4" />
                  Notify Me
                </Button>
              </form>
            ) : (
              <div className="text-emerald-500 font-medium flex items-center justify-center gap-2">
                <Sparkles className="size-4" />
                You&apos;re on the list! We&apos;ll notify you when it&apos;s ready.
              </div>
            )}
          </div>

          <div className="pt-4">
            <p className="text-xs text-muted-foreground">
              In the meantime, explore our other AI-powered tools available now.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
