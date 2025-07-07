import { nanoid } from "nanoid";

export const config = {
  clientPort: 3000,
  apiPort: 3001,
  shortCodeLength: 6,
} as const;

/**
 * Get the base URL for the API. When running in StackBlitz, the frontend and API are running on different ports.
 * This function will return the correct base URL for the API.
 */
export function getBaseUrl(req: any, frontendOrigin?: string): string {
  // If frontend origin is provided and we're in StackBlitz, convert it to API URL
  if (
    frontendOrigin &&
    process.env.STACKBLITZ_ENV === "true" &&
    frontendOrigin.includes(`--${config.clientPort}--`)
  ) {
    return frontendOrigin.replace(
      `--${config.clientPort}--`,
      `--${config.apiPort}--`
    );
  }

  // Fallback: use request headers or localhost
  const protocol = req.secure ? "https" : "http";
  const host = req.headers.host || `localhost:${config.apiPort}`;
  return `${protocol}://${host}`;
}

export function generateShortCode(): string {
  return nanoid(config.shortCodeLength);
}

export function isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
}
