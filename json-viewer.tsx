"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Copy } from "lucide-react"

export default function JsonViewer() {
  const [copied, setCopied] = useState(false)

  // Example JSON data - replace with your actual data
  const jsonData = {
    id: "f290f1e9-6ba6-4243-8cf3-3f4b1fd78f9c",
    name: "Product Analytics Dashboard",
    version: "1.2.0",
    status: "active",
    created_at: "2023-09-15T08:30:00Z",
    updated_at: "2024-03-22T14:45:12Z",
    config: {
      theme: "dark",
      refresh_rate: 60,
      notifications: true,
      data_sources: ["sales", "marketing", "customer_service"],
    },
    metrics: {
      daily_active_users: 12583,
      conversion_rate: 3.7,
      average_session_time: 342,
      bounce_rate: 28.5,
    },
    permissions: {
      admin: ["read", "write", "delete"],
      editor: ["read", "write"],
      viewer: ["read"],
    },
  }

  const formattedJson = JSON.stringify(jsonData, null, 2)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Function to add syntax highlighting
  const highlightJson = (json: string) => {
    return json
      .replace(/"([^"]+)":/g, '<span class="text-cyan-400">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span class="text-amber-300">"$1"</span>')
      .replace(/: (\d+\.?\d*)/g, ': <span class="text-green-400">$1</span>')
      .replace(/: (true|false)/g, ': <span class="text-purple-400">$1</span>')
      .replace(/: (null)/g, ': <span class="text-gray-400">$1</span>')
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border border-white/10 shadow-xl bg-gray-800/40 backdrop-blur-md relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 pointer-events-none" />
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/15 via-violet-600/15 to-purple-600/15 blur-xl opacity-30 animate-pulse" />

        <div className="relative z-10">
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <button
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded"
              aria-label="Copy JSON"
            >
              <Copy size={16} />
              <span
                className={`absolute right-10 top-2 text-xs ${copied ? "opacity-100" : "opacity-0"} transition-opacity`}
              >
                {copied ? "Copied!" : ""}
              </span>
            </button>
          </div>

          <CardContent className="p-0">
            <pre className="text-white font-mono text-sm p-4 overflow-auto max-h-[500px] custom-scrollbar">
              <code dangerouslySetInnerHTML={{ __html: highlightJson(formattedJson) }} />
            </pre>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

