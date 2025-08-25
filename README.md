## Stoïk JS Technical Test – URL Shortener

Tiny full‑stack URL shortener.

### Tech

- Client: React + Vite + Tailwind (`client/`)
- API: Express (`api/`)
- DB: PGlite (in‑memory, PostgreSQL compatible)

### Important folders

- `sdk/`
  - `types.ts` – shared TypeScript types (client + API)
- `api/`
  - `index.ts` – API entrypoint
  - `app.ts` – Express app factory
  - `routes.ts` – route wiring
  - `config/index.ts` – ports and helpers
  - `config/database.ts` – PGlite client + init
  - `database/migration.sql` – schema for `urls`
  - `database/seeds.sql` – initial data
  - `src/controllers/url.controller.ts` – HTTP handlers
  - `src/services/url.service.ts` – core logic
  - `src/repositories/url.repository.ts` – DB access
- `client/`
  - `App.tsx`, `main.tsx`, `index.css`
  - `utils.ts` – helpers (e.g., `getShortUrl`)
  - `components/` – UI components
  - `hooks/` – app hooks/providers
  - `routes/UrlInfo.tsx`

### Shared Types (SDK)

- Import shared contracts from `sdk/types` in both API and client, e.g.:

```ts
import type { UrlRow, ShortenRequest, ShortenResponse } from "sdk/types";
```

### API Endpoints

- `GET /api/health` – health check. Accepts `frontendOrigin` query to compute base URL.
- `POST /api/shorten` – create a short URL. Body: `{ url: string, frontendOrigin?: string }`
- `GET /api/urls` – list recent URLs. Query: `?limit=10`
- `GET /:shortCode` – redirects to the original URL and increments click counter.

### Run the app

- Run the `npm run dev` command to start both the API and the client.

### Notes for Candidates

- Code is split by responsibility (controllers/services/repositories) to clarify where to add logic.
- Keep types in `sdk/` to avoid drift between client and server.
- Database schema and seed are plain SQL for readability.
