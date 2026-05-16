"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Download, Sparkles, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export function QrCodeGenerator() {
  const [data, setData] = React.useState("")
  const [qrUrl, setQrUrl] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const handleGenerate = () => {
    if (!data.trim()) {
      toast.error("Please enter a URL or text")
      return
    }
    setLoading(true)
    // Use the free QR code API
    const encodedData = encodeURIComponent(data.trim())
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedData}&bgcolor=FFFFFF&color=8B5CF6&format=png`
    setQrUrl(url)
    // Small delay to simulate loading
    setTimeout(() => setLoading(false), 500)
  }

  const handleDownload = async () => {
    if (!qrUrl) return
    try {
      const response = await fetch(qrUrl)
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `qrcode-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success("QR code downloaded!")
    } catch {
      toast.error("Failed to download QR code")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input */}
      <Card className="glass border-0">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <QrCode className="size-5 text-primary" />
            Generate QR Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="data">URL or Text</Label>
            <Input
              id="data"
              placeholder="e.g., https://example.com"
              value={data}
              onChange={(e) => setData(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={loading || !data.trim()}
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
                Generate QR Code
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Output */}
      <Card className="glass border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">QR Code</CardTitle>
            {qrUrl && (
              <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1 text-xs">
                <Download className="size-3" /> Download
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {!qrUrl && !loading && (
            <div className="text-center py-10 text-muted-foreground text-sm">
              Enter a URL or text and click generate to create a QR code
            </div>
          )}
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Loader2 className="size-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Generating QR code...</p>
            </div>
          )}
          <AnimatePresence>
            {qrUrl && !loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="bg-white p-4 rounded-xl shadow-lg">
                  <img
                    src={qrUrl}
                    alt="Generated QR Code"
                    width={250}
                    height={250}
                    className="rounded"
                  />
                </div>
                <p className="text-xs text-muted-foreground text-center max-w-xs truncate">
                  {data}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
