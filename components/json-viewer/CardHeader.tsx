import React from "react";
import CopyButton from "./CopyButton";
import ToggleButton from "./ToggleButton";

interface CardHeaderProps {
  filename: string;
  copied: boolean;
  isMaximized: boolean;
  onCopy: () => void;
  onToggleMaximize: () => void;
}

const CardHeader: React.FC<CardHeaderProps> = ({
  filename,
  copied,
  isMaximized,
  onCopy,
  onToggleMaximize,
}) => {
  return (
    <div className="flex items-center px-4 py-2 border-b border-white/10 relative">
      <CopyButton copied={copied} onCopy={onCopy} />
      <span className="text-sm text-gray-400 font-medium mx-auto">
        {filename}
      </span>
      <ToggleButton isMaximized={isMaximized} onToggle={onToggleMaximize} />
    </div>
  );
};

export default CardHeader;
