import { db } from "./connection";
import type { UrlRow } from "./types";

/**
 * Create a new short URL record in the database
 */
export async function createShortUrl(
  shortCode: string,
  fullUrl: string
): Promise<UrlRow> {
  const result = await db.query(
    "INSERT INTO urls (short_code, full_url) VALUES ($1, $2) RETURNING *",
    [shortCode, fullUrl]
  );
  return result.rows[0] as UrlRow;
}

/**
 * Retrieve the full URL by short code
 */
export async function getFullUrl(
  shortCode: string
): Promise<string | undefined> {
  const result = await db.query(
    "SELECT full_url FROM urls WHERE short_code = $1",
    [shortCode]
  );
  const row = result.rows[0] as Pick<UrlRow, "full_url"> | undefined;
  return row?.full_url;
}

/**
 * Get all URLs ordered by creation date (most recent first)
 */
export async function getAllUrls(limit: number = 10): Promise<UrlRow[]> {
  const result = await db.query(
    "SELECT id, short_code, full_url, created_at FROM urls ORDER BY created_at DESC LIMIT $1",
    [limit]
  );
  return result.rows as UrlRow[];
}

/**
 * Increment click counter for a short URL
 */
export async function incrementClickCount(shortCode: string): Promise<void> {
  await db.query(
    "UPDATE urls SET click_count = click_count + 1 WHERE short_code = $1",
    [shortCode]
  );
}
