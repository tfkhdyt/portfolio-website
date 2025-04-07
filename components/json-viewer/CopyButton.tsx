import React from "react";
import { Copy } from "lucide-react";

interface CopyButtonProps {
  copied: boolean;
  onCopy: () => void;
}

const CopyButton: React.FC<CopyButtonProps> = ({ copied, onCopy }) => {
  return (
    <button
      onClick={onCopy}
      className="text-gray-400 hover:text-white transition-colors p-1 rounded absolute left-4 cursor-pointer"
      aria-label="Copy JSON"
    >
      <Copy size={16} />
      <span
        className={`absolute left-10 top-1 text-xs ${
          copied ? "opacity-100" : "opacity-0"
        } transition-opacity`}
      >
        {copied ? "Copied!" : ""}
      </span>
    </button>
  );
};

export default CopyButton;
