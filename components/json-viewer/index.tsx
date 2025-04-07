"use client";

import { Card } from "@/components/ui/card";
import { useCallback, useState } from "react";
import jsonData from "../../public/resume.json"; // Adjust path as needed
import { formatJson } from "@/lib/formatJson";
import JsonContent from "./JsonContent";
import CardHeader from "./CardHeader";

export default function JsonViewer() {
  const [copied, setCopied] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const formattedJson = formatJson(jsonData);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [formattedJson]);

  const toggleMaximize = useCallback(() => {
    setIsMaximized((prev) => !prev);
  }, []);

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-in-out ${
        isMaximized
          ? "inset-4 md:inset-8"
          : "inset-[5%] md:inset-[20%] xl:inset-[25%] mt-44 md:mt-8 xl:-mt-24"
      }`}
    >
      <Card
        className={`border border-white/10 shadow-xl bg-slate-600/25 backdrop-blur-md relative overflow-hidden rounded-xl transition-all duration-300 ease-in-out ${
          isMaximized ? "h-full" : "h-[50vh] md:h-[50vh] xl:h-[70vh]"
        }`}
      >
        <div className="relative z-10 flex flex-col h-full">
          <CardHeader
            filename="resume.json"
            copied={copied}
            isMaximized={isMaximized}
            onCopy={copyToClipboard}
            onToggleMaximize={toggleMaximize}
          />
          <JsonContent json={formattedJson} />
        </div>
      </Card>
    </div>
  );
}
