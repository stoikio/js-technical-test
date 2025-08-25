import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { UrlItem } from "sdk/types";

interface UrlsContextValue {
  /** List of all URLs returned by the API */
  urls: UrlItem[];
  /** State of the loading of the URLs */
  isLoading: boolean;
  /** Error message if the URLs failed to load */
  error: string;
  /** Function to manually refresh the URLs */
  refresh: () => Promise<void>;
}

const UrlsContext = createContext<UrlsContextValue | undefined>(undefined);

export const UrlsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUrls = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/urls");
      const data: {
        success: boolean;
        urls: UrlItem[];
      } = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch URLs");
      }

      setUrls(data.urls);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const value = useMemo<UrlsContextValue>(
    () => ({
      urls,
      isLoading,
      error,
      refresh: fetchUrls,
    }),
    [urls, isLoading, error, fetchUrls]
  );

  return <UrlsContext.Provider value={value}>{children}</UrlsContext.Provider>;
};

export function useUrls(): UrlsContextValue {
  const ctx = useContext(UrlsContext);
  if (!ctx) {
    throw new Error("useUrls must be used within a UrlsProvider");
  }
  return ctx;
}
