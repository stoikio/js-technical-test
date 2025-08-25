import { generateShortCode, getBaseUrl, isValidUrl } from "../../config";
import {
  createShortUrl,
  getFullUrl,
  getAllUrls,
  incrementClickCount,
} from "../repositories/url.repository";
import type { ShortenResponse, UrlItem } from "sdk/types";
import type { Request } from "express";

/**
 * Create a short URL by generating a short code and storing it in the database.
 * The short URL is returned to the client.
 *
 * @param req - The request object
 * @param body - The body of the request
 * @returns The short URL
 */
export async function createShortUrlService(
  req: Request,
  body: {
    url: string;
    frontendOrigin?: string;
  }
): Promise<ShortenResponse> {
  const { url, frontendOrigin } = body;

  if (!url || typeof url !== "string") {
    throw new Error("URL is required");
  }
  if (!isValidUrl(url)) {
    throw new Error("Invalid URL format");
  }

  const shortCode = generateShortCode();
  const urlRecord = await createShortUrl(shortCode, url);
  const apiBaseUrl = getBaseUrl(req, frontendOrigin);
  const shortUrl = `${apiBaseUrl}/${shortCode}`;

  return {
    success: true,
    shortUrl,
    shortCode,
    originalUrl: url,
    id: urlRecord.id,
  };
}

/**
 * Get the full URL from a short code.
 *
 * @param shortCode - The short code to get the full URL for.
 * @returns The full URL.
 */
export async function getFullUrlFromShortCode(
  shortCode: string
): Promise<string | undefined> {
  return getFullUrl(shortCode);
}

/**
 * List recent URLs from the database.
 *
 * @param limit - The number of URLs to list.
 * @returns The URLs.
 */
export async function listRecentUrls(limit: number = 10): Promise<UrlItem[]> {
  return getAllUrls(limit);
}

/**
 * Increment the click count for a short code.
 *
 * @param shortCode - The short code to increment the click count for.
 */
export async function incrementClickCountFromShortCode(
  shortCode: string
): Promise<void> {
  await incrementClickCount(shortCode);
}
