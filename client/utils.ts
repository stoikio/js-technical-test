/**
 * Utilities for the frontend app.
 * Keep helpers here to make their location obvious for candidates.
 */

/**
 * Build the short URL given a short code and the detected API base URL.
 * Falls back to heuristics for local/StackBlitz ports when base is missing.
 */
export function getShortUrl(shortCode: string, apiBaseUrl?: string): string {
  if (apiBaseUrl) return `${apiBaseUrl}/${shortCode}`;
  const origin = window.location.origin;
  if (origin.includes("--3000--")) {
    return `${origin.replace("--3000--", "--3001--")}/${shortCode}`;
  }
  return `${origin.replace(":3000", ":3001")}/${shortCode}`;
}

/**
 * Copy text to clipboard.
 * @param text - The text to copy.
 * @param callback - A callback to call after the text is copied.
 */
export async function copyToClipboard(text: string, callback?: () => void) {
  try {
    await navigator.clipboard.writeText(text);
    callback?.();
  } catch (err) {
    console.error(err);
  }
}
