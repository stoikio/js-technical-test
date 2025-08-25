import { FC, useCallback, useState } from "react";
import { useToast } from "../hooks/toastContext";
import type { ShortenResponse } from "sdk/types";
import { Check } from "lucide-react";
import { copyToClipboard } from "../utils";

interface UrlResultProps {
  result: ShortenResponse;
  onCreateAnother: () => void;
}

export const UrlResult: FC<UrlResultProps> = ({ result, onCreateAnother }) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = useCallback(() => {
    copyToClipboard(result.shortUrl, () => {
      setCopied(true);
      showToast("Short URL copied to clipboard");
    });
  }, [result.shortUrl, showToast]);

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center mb-2">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <h3 className="text-lg font-medium text-green-800">
            URL Shortened Successfully!
          </h3>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Short URL
            </label>
            <div className="flex">
              <input
                type="text"
                value={result.shortUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-l-lg text-sm"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors text-sm"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original URL
            </label>
            <p className="text-sm text-gray-600 break-all bg-gray-50 p-2 rounded border">
              {result.originalUrl}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onCreateAnother}
        className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
      >
        Shorten Another URL
      </button>
    </div>
  );
};
