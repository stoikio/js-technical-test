import { useState } from "react";
import { Copy, Database, Terminal } from "lucide-react";
import { useToast } from "../hooks/toastContext";

interface DebugMenuProps {
  apiBaseUrl: string | null;
}

export const DebugMenu: React.FC<DebugMenuProps> = ({ apiBaseUrl }) => {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  const handleCopyApiUrl = async () => {
    if (!apiBaseUrl) {
      showToast("API URL not available yet");
      return;
    }
    try {
      await navigator.clipboard.writeText(apiBaseUrl);
      showToast("API URL copied to clipboard");
    } catch {
      showToast("Failed to copy API URL");
    }
  };

  const handleDump = async () => {
    try {
      await fetch("/api/debug", { method: "POST" });
      showToast("Dump requested in server console");
    } catch {
      showToast("Failed to trigger dump");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {open && (
        <div className="absolute bottom-16 right-0 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden w-56">
          <button
            onClick={handleCopyApiUrl}
            className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-50"
          >
            <Copy className="w-4 h-4" />
            <span className="text-sm">Copy API URL</span>
          </button>
          <button
            onClick={handleDump}
            className="w-full flex items-center gap-2 px-3 py-2 text-left text-gray-700 hover:bg-gray-50 border-t border-gray-100"
          >
            <Database className="w-4 h-4" />
            <span className="text-sm">Dump database</span>
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Actions"
        aria-expanded={open}
        className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg flex items-center justify-center"
      >
        <Terminal className="w-5 h-5" />
      </button>
    </div>
  );
};
