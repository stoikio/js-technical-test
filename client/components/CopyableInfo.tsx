import { FC, useCallback } from "react";
import { useToast } from "../hooks/toastContext";
import { copyToClipboard } from "../utils";

interface CopyableInfoProps {
  label: string;
  value: string;
}

export const CopyableInfo: FC<CopyableInfoProps> = ({ label, value }) => {
  const { showToast } = useToast();

  const handleCopy = useCallback(() => {
    copyToClipboard(value, () => {
      showToast(`${label} copied to clipboard`);
    });
  }, [value, label, showToast]);

  return (
    <div className="w-full">
      <div className="flex items-stretch bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="px-3 py-2 text-sm text-gray-800 whitespace-nowrap bg-gray-50 border-r border-gray-200 flex items-center">
          {label}
        </div>
        <div className="flex-1 px-3 py-2 text-sm text-gray-700 break-all select-all">
          {value}
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          aria-label="Copy"
        >
          Copy
        </button>
      </div>
    </div>
  );
};
