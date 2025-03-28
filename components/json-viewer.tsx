"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Maximize2, Minimize2 } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import jsonData from "../public/resume.json";

export default function JsonViewer() {
  const [copied, setCopied] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const formattedJson = JSON.stringify(jsonData, null, 2);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-in-out ${isMaximized ? "inset-8" : "inset-[5%] md:inset-[10%] lg:inset-[25%] mt-44 md:mt-0 lg:-mt-24"}`}
    >
      <Card
        className={`border border-white/10 shadow-xl bg-slate-600/25 backdrop-blur-md relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out ${isMaximized ? "h-full" : "h-[50vh] md:h-[80vh] lg:h-[70vh]"}`}
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center px-4 py-2 border-b border-white/10 relative">
            {/* <div className="flex space-x-2 absolute left-4"> */}
            {/*   <button */}
            {/*     className="w-3 h-3 rounded-full bg-red-500/80" */}
            {/*     onClick={closeWindow} */}
            {/*     aria-label="Close window" */}
            {/*   ></button> */}
            {/*   <button */}
            {/*     className="w-3 h-3 rounded-full bg-yellow-500/80" */}
            {/*     onClick={toggleMaximize} */}
            {/*     aria-label="maximize" */}
            {/*   ></button> */}
            {/*   <div className="w-3 h-3 rounded-full bg-green-500/80" /> */}
            {/* </div> */}
            <button
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded absolute left-4"
              aria-label="Copy JSON"
            >
              <Copy size={16} />
              <span
                className={`absolute left-10 top-1 text-xs ${copied ? "opacity-100" : "opacity-0"} transition-opacity`}
              >
                {copied ? "Copied!" : ""}
              </span>
            </button>
            <span className="text-sm text-gray-400 font-medium mx-auto">
              resume.json
            </span>
            <button
              onClick={toggleMaximize}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded absolute right-4"
              aria-label={isMaximized ? "Minimize" : "Maximize"}
            >
              {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>

          <CardContent className="p-2 flex-1 overflow-auto custom-scrollbar transition-all duration-300 ease-in-out font-mono selection:bg-slate-800">
            <SyntaxHighlighter
              language="json"
              style={atomOneDark}
              wrapLongLines
              customStyle={{
                backgroundColor: "transparent",
              }}
            >
              {formattedJson}
            </SyntaxHighlighter>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
