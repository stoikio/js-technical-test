import { FC, useState } from "react";
import { useUrls } from "../hooks/urlsContext";
import { useApiHealth } from "../hooks/useApiHealth";
import { useToast } from "../hooks/toastContext";

export const UrlList: FC = () => {
  const { urls, isLoading, error, refresh } = useUrls();
  const { apiBaseUrl } = useApiHealth();
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const { showToast } = useToast();

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };

  const getShortUrl = (shortCode: string) => {
    // Prefer server-provided base; otherwise derive from frontend origin
    if (apiBaseUrl) return `${apiBaseUrl}/${shortCode}`;
    const origin = window.location.origin;
    if (origin.includes("--3000--")) {
      return `${origin.replace("--3000--", "--3001--")}/${shortCode}`;
    }
    return `${origin.replace(":3000", ":3001")}/${shortCode}`;
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center text-gray-600">Loading URLs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent URLs</h2>
      </div>

      {urls.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No URLs found. Create your first short URL above!
        </div>
      ) : (
        <div className="space-y-4">
          {urls.map((url) => (
            <div
              key={url.id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div
                    className="text-sm text-gray-900 truncate"
                    title={url.full_url}
                  >
                    {url.full_url}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      await copyToClipboard(getShortUrl(url.short_code));
                      showToast("Short URL copied to clipboard");
                      setCopiedId(url.id);
                      setTimeout(() => setCopiedId(null), 1200);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy short URL"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </button>
                  <a
                    href={getShortUrl(url.short_code)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Visit URL"
                    onClick={() => {
                      // Give the server a brief moment to increment, then refresh the list
                      setTimeout(() => {
                        refresh();
                      }, 300);
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
