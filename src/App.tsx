import { useState } from "react";
import { UrlForm } from "./components/UrlForm";
import { UrlResult } from "./components/UrlResult";
import { UrlList } from "./components/UrlList";
import { LoadingScreen } from "./components/LoadingScreen";
import { useApiHealth } from "./hooks/useApiHealth";
import type { ShortenResponse } from "./types";

export default function App() {
  const [result, setResult] = useState<ShortenResponse | null>(null);
  const { isApiReady } = useApiHealth();

  const handleUrlShortened = (shortenResult: ShortenResponse) => {
    setResult(shortenResult);
  };

  const handleCreateAnother = () => {
    setResult(null);
  };

  if (!isApiReady) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🔗 URL Shortener
          </h1>
          <p className="text-lg text-gray-600">
            Transform long URLs into short, shareable links
          </p>
        </div>

        <div className="flex justify-center">
          {result ? (
            <UrlResult result={result} onCreateAnother={handleCreateAnother} />
          ) : (
            <UrlForm onUrlShortened={handleUrlShortened} />
          )}
        </div>

        <div className="mt-16">
          <UrlList />
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Stoïk Technical Test – JS FullStack Engineer</p>
        </div>
      </div>
    </div>
  );
}
