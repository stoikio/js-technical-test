export interface ShortenRequest {
  url: string;
  frontendOrigin?: string;
}

export interface ShortenResponse {
  success: boolean;
  shortUrl: string;
  shortCode: string;
  originalUrl: string;
  id: number;
}

export interface ApiError {
  error: string;
}

export interface UrlItem {
  id: number;
  short_code: string;
  full_url: string;
  created_at: string;
}

export interface UrlListResponse {
  success: boolean;
  urls: UrlItem[];
}

export interface HealthCheckResponse {
  status: string;
  timestamp: string;
}
