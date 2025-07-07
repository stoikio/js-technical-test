import { useState, useEffect } from "react";
import type { HealthCheckResponse } from "../types";

export const useApiHealth = () => {
  const [isApiReady, setIsApiReady] = useState(false);
  const [healthCheckAttempts, setHealthCheckAttempts] = useState(0);

  const checkApiHealth = async (): Promise<boolean> => {
    try {
      const response = await fetch("/api/health");
      if (response.ok) {
        const data: HealthCheckResponse = await response.json();
        if (data.status === "ok") {
          setIsApiReady(true);
          return true;
        }
      }
    } catch (error) {
      // API not ready yet
    }
    return false;
  };

  useEffect(() => {
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
          }
        }
      }, 1000);
    };

    waitForApi();
  }, []);

  return {
    isApiReady,
    healthCheckAttempts,
  };
};
