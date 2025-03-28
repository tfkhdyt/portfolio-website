"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";

export default function JsonViewer() {
  const [copied, setCopied] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const jsonData = {
    success: true,
    data: {
      id: "f290f1e9-6ba6-4243-8cf3-3f4b1fd78f9c",
      name: "Taufik Hidayat",
      email: "taufik@hidayat.dev",
      phone: "+6285156002842",
      url: {
        linkedin: "https://linkedin.com/in/tfkhdyt142",
        github: "https://github.com/tfkhdyt",
      },
      introduction:
        "Software Developer with proven track record in crafting modern web solutions using TypeScript and Golang. At Netovas Eterna Teknologi, built high-impact applications including an optimized ticketing system with 20% improved performance and a comprehensive billing platform. Distinguished Informatics Engineering graduate with multiple academic awards and a portfolio of successful open-source projects ranging from developer tools to web applications. Seeking challenging opportunities to create innovative, scalable software solutions that deliver measurable business value.",
      work_experience: [
        {
          id: 1,
          company: "Netovas Eterna Teknologi",
          role: "Full Stack Developer",
          location: "Bekasi, Indonesia",
          status: "Full Time",
          work_model: "Remote",
          start_date: "2023-12-01T00:00:00Z",
        },
      ],
      created_at: "2002-04-01T23:00:00Z",
    },
  };

  const formattedJson = JSON.stringify(jsonData, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Function to add syntax highlighting
  const highlightJson = (json: string) => {
    return json
      .replace(/"([^"]+)":/g, '<span class="text-cyan-400">"$1"</span>:')
      .replace(/: "([^"]+)"/g, ': <span class="text-amber-300">"$1"</span>')
      .replace(/: (\d+\.?\d*)/g, ': <span class="text-green-400">$1</span>')
      .replace(/: (true|false)/g, ': <span class="text-purple-400">$1</span>')
      .replace(/: (null)/g, ': <span class="text-gray-400">$1</span>');
  };

  return (
    <div
      className={`transition-all duration-300 ease-in-out ${isMaximized ? "fixed inset-4 z-50" : "w-full max-w-3xl mx-auto"}`}
    >
      <Card
        className={`border border-white/10 shadow-xl bg-slate-700/25 backdrop-blur-md relative overflow-hidden rounded-xl ${isMaximized ? "h-full" : ""}`}
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center  px-4 py-2 border-b border-white/10 relative">
            <div className="flex space-x-2 absolute left-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <button
                className="w-3 h-3 rounded-full bg-yellow-500/80"
                onClick={toggleMaximize}
                aria-label="maximize"
              ></button>
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-sm text-gray-300 font-medium mx-auto">
              resume.json
            </span>
            <button
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded absolute right-4"
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

          <CardContent className="p-0 flex-1 overflow-hidden">
            <pre
              className={`text-white font-mono text-sm p-4 overflow-auto custom-scrollbar whitespace-pre-wrap break-words ${isMaximized ? "h-full" : "max-h-[500px]"}`}
            >
              <code
                dangerouslySetInnerHTML={{
                  __html: highlightJson(formattedJson),
                }}
              />
            </pre>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
