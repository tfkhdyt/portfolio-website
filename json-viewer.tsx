"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, Maximize2, Minimize2 } from "lucide-react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
          start_at: "2023-12-18T00:00:00Z",
          end_at: "2025-04-01T00:00:00Z",
          responsibilities: [
            "Developed a ticketing application for an ISP in Bekasi using Golang and Fiber framework. Optimized system performance, resulting in 20% faster query processing and improved system scalability to handle 2x previous user load.",
            "Build a backend billing system using Node.js and Adonis.js for the same ISP to manage complex financial transaction.",
            "Created a responsive landing page for a cloud service provider in Jakarta using TypeScript and Astro.js. Achieved 98-100% performance score on Google Lighthouse and reduced page load times to under 2 seconds, improving user engagement.",
            "Develop a full-featured online manga reading application using SvelteKit and Pocketbase.",
          ],
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

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-in-out ${isMaximized ? "inset-4" : "inset-[5%] md:inset-[10%] lg:inset-[25%] mt-44 md:mt-0 lg:-mt-24"}`}
    >
      <Card
        className={`border border-white/10 shadow-xl bg-slate-700/25 backdrop-blur-md relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out ${isMaximized ? "h-full" : "h-[50vh] md:h-[80vh] lg:h-[70vh]"}`}
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center  px-4 py-2 border-b border-white/10 relative">
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
              onClick={toggleMaximize}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded absolute left-4"
              aria-label={isMaximized ? "Minimize" : "Maximize"}
            >
              {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <span className="text-sm text-gray-400 font-medium mx-auto">
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

          <CardContent className="p-2 flex-1 overflow-auto custom-scrollbar transition-all duration-300 ease-in-out font-mono selection:bg-slate-800">
            <SyntaxHighlighter
              language="json"
              style={tomorrowNight}
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
