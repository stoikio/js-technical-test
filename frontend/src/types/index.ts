export interface ShortenResponse {
  original_url: string;
  short_url: string;
  slug: string;
  created_at?: string;
  message?: string;
}
