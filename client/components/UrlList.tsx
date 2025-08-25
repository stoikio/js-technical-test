import { FC, useCallback } from "react";
import { useUrls } from "../hooks/urlsContext";
import { useApiHealth } from "../hooks/useApiHealth";
import { copyToClipboard, getShortUrl } from "../utils";
import { Copy, ExternalLink, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "../hooks/toastContext";
import type { UrlItem } from "sdk/types";

export const UrlList: FC = () => {
  const { urls, isLoading, error, refresh } = useUrls();
  const { apiBaseUrl } = useApiHealth();
  const { showToast } = useToast();

  const buildShortUrl = useCallback(
    (shortCode: string) => getShortUrl(shortCode, apiBaseUrl ?? undefined),
    [apiBaseUrl]
  );

  const handleCopy = useCallback(
    (url: UrlItem) => {
      copyToClipboard(buildShortUrl(url.short_code), () => {
        showToast("Short URL copied to clipboard");
      });
    },
    [showToast]
  );

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
                  <Link
                    to={`/u/${url.id}`}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Info"
                  >
                    <Info className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleCopy(url)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy short URL"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <a
                    href={buildShortUrl(url.short_code)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Visit URL"
                    onClick={() => {
                      // Quick hack to give the server a brief moment to increment, then refresh the list
                      setTimeout(() => {
                        refresh();
                      }, 300);
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
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
