// Shared SDK types between API and Frontend
// Centralize all DTOs and database row shapes here to ensure consistency.

// Database row for a URL entry
export interface UrlItem {
  id: number;
  short_code: string;
  full_url: string;
  click_count: number;
  created_at: string;
}

export interface ShortenResponse {
  success: boolean;
  shortUrl: string;
  shortCode: string;
  originalUrl: string;
  id: number;
}
