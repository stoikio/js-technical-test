## Stoïk JS Technical Test – URL Shortener

This is a tiny full‑stack URL shortener used for the technical test. It includes:

- A React + Vite frontend (`client/`)
- A minimal Express API (`api/`)
- An in‑memory PostgreSQL‑compatible database via PGlite

### Important folders

- `client/` – React app
  - `components/` – UI components
  - `hooks/` – client hooks and providers (`useApiHealth`, `urlsContext`, `toastContext`)
  - `types/` – shared TypeScript types between client/api
- `api/` – Express API
  - `config/` – ports and helpers (`getBaseUrl`, `generateShortCode`)
  - `database/` – PGlite setup, schema and repository functions

### API routes (api/routes.ts)

- `GET /api/health` – health check. Accepts `frontendOrigin` query to compute base URL.
- `POST /api/shorten` – create a short URL. Body: `{ url: string, frontendOrigin?: string }`
- `GET /api/urls` – list recent URLs. Query: `?limit=10`
- `GET /:shortCode` – redirects to the original URL and increments click counter.

### Repository helpers (api/database/urlRepository.ts)

- `createShortUrl(shortCode, fullUrl)` – insert a record
- `getFullUrl(shortCode)` – fetch original URL
- `getAllUrls(limit)` – list URLs with `click_count`
- `incrementClickCount(shortCode)` – bump click counter
