import React from "react";
import { Maximize2, Minimize2 } from "lucide-react";

interface ToggleButtonProps {
  isMaximized: boolean;
  onToggle: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isMaximized,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className="text-gray-400 hover:text-white transition-colors p-1 rounded absolute right-4 cursor-pointer"
      aria-label={isMaximized ? "Minimize" : "Maximize"}
    >
      {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
    </button>
  );
};

export default ToggleButton;
