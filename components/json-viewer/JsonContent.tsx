import React from "react";
import { CardContent } from "@/components/ui/card";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface JsonContentProps {
  json: string;
}

const customStyle = {
  backgroundColor: "transparent",
};

const MySyntaxHighlighter = ({ json }: JsonContentProps) => {
  return (
    <SyntaxHighlighter
      language="json"
      style={atomOneDark}
      wrapLongLines
      customStyle={customStyle}
    >
      {json}
    </SyntaxHighlighter>
  );
};

const JsonContent: React.FC<JsonContentProps> = ({ json }) => {
  return (
    <CardContent className="p-2 flex-1 overflow-auto custom-scrollbar transition-all duration-300 ease-in-out font-mono selection:bg-slate-700/50 text-sm xl:text-base">
      <MySyntaxHighlighter json={json} />
    </CardContent>
  );
};

export default JsonContent;
