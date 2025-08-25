import { useState, useEffect } from "react";

// Module-level cache so API health is resolved only once for the whole app lifecycle
let apiHealthCache: {
  isReady: boolean;
  apiBaseUrl: string | null;
  initialized: boolean;
} = {
  isReady: false,
  apiBaseUrl: null,
  initialized: false,
};

export const useApiHealth = () => {
  const [isApiReady, setIsApiReady] = useState(apiHealthCache.isReady);
  const [apiBaseUrl, setApiBaseUrl] = useState<string | null>(
    apiHealthCache.apiBaseUrl
  );
  const [healthCheckAttempts, setHealthCheckAttempts] = useState(0);

  const checkApiHealth = async (): Promise<boolean> => {
    try {
      const response = await fetch(
        `/api/health?frontendOrigin=${encodeURIComponent(
          window.location.origin
        )}`
      );
      if (response.ok) {
        const data: {
          status: string;
          timestamp: string;
          baseUrl?: string;
        } = await response.json();
        if (data.status === "ok") {
          setIsApiReady(true);
          apiHealthCache.isReady = true;
          if ((data as any).baseUrl) {
            setApiBaseUrl((data as any).baseUrl);
            apiHealthCache.apiBaseUrl = (data as any).baseUrl;
          }
          return true;
        }
      }
    } catch (error) {
      // API not ready yet
    }
    return false;
  };

  useEffect(() => {
    // If already known ready, do nothing (prevents loader on subsequent navigations)
    if (apiHealthCache.isReady) {
      setIsApiReady(true);
      setApiBaseUrl(apiHealthCache.apiBaseUrl);
      return;
    }

    // Ensure we only start one polling loop for the whole app lifecycle
    if (apiHealthCache.initialized) return;
    apiHealthCache.initialized = true;

    const waitForApi = async () => {
      const maxAttempts = 30; // 30 seconds max wait
      let attempts = 0;

      const interval = setInterval(async () => {
        attempts++;
        setHealthCheckAttempts(attempts);

        const isReady = await checkApiHealth();
        if (isReady || attempts >= maxAttempts) {
          clearInterval(interval);
          if (!isReady) {
            console.warn("API health check timeout - proceeding anyway");
            setIsApiReady(true);
            apiHealthCache.isReady = true;
          }
        }
      }, 1000);
    };

    waitForApi();
  }, []);

  return {
    isApiReady,
    apiBaseUrl,
    healthCheckAttempts,
  };
};
