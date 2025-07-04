// API Configuration
export const getApiBaseUrl = (): string => {
  // For local development
  if (window.location.hostname === "localhost") {
    return "http://localhost:3001";
  }

  // For CodeSandbox - replace 3000 with 3001 in hostname
  if (
    window.location.hostname.includes("csb.app") ||
    window.location.hostname.includes("codesandbox.io")
  ) {
    return `${window.location.protocol}//${window.location.hostname.replace(/^3000-/, "3001-")}`;
  }

  // For production or other environments
  return process.env.VITE_API_URL || window.location.origin;
};

export const API_BASE_URL = getApiBaseUrl();
