import { useState } from "react";
import type { ShortenResponse } from "../types";
import ErrorMessage from "./ErrorMessage";
import SuccessResult from "./SuccessResult";

const API_BASE_URL = "http://localhost:3001";

export default function UrlForm() {
  const [url, setUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShortenedUrl("");

    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data: ShortenResponse = await response.json();

      if (response.ok) {
        setShortenedUrl(data.short_url);
        setUrl("");
      } else {
        setError(data.message || "Failed to shorten URL");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortenedUrl);
      alert("Copied to clipboard!");
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Enter your long URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very-long-url-that-needs-shortening"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
      </form>

      <ErrorMessage message={error} />
      <SuccessResult shortenedUrl={shortenedUrl} onCopy={copyToClipboard} />
    </div>
  );
}
