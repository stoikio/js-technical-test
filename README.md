## Stoïk JS Technical Test – URL Shortener

Tiny full‑stack URL shortener used for the technical test.

### Tech

- Client: React + Vite + Tailwind (`client/`)
- API: Express (`api/`)
- DB: PGlite (in‑memory, PostgreSQL compatible)

### Repository Structure

```
.
├─ sdk/                       # Shared types between API and Client
│  └─ types.ts
├─ api/                       # Express API
│  ├─ app.ts                  # Express app factory
│  ├─ index.ts                # API entrypoint (starts server)
│  ├─ routes.ts               # Route wiring
│  ├─ config/
│  │  ├─ index.ts             # ports, helpers (getBaseUrl, generateShortCode)
│  │  └─ database.ts          # PGlite client + init (runs migration + seed)
│  ├─ database/
│  │  ├─ migration.sql        # Schema for urls table
│  │  └─ seeds.sql            # Seed rows if table empty
│  └─ src/
│     ├─ controllers/         # HTTP controllers (request/response)
│     │  └─ url.controller.ts
│     ├─ services/            # Core logic/use‑cases
│     │  └─ url.service.ts
│     └─ repositories/        # DB access
│        └─ url.repository.ts
├─ client/                    # React app
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ index.css
│  ├─ utils.ts                # Frontend helpers (e.g., getShortUrl)
│  ├─ components/
│  │  ├─ CopyableInfo.tsx
│  │  ├─ LoadingScreen.tsx
│  │  ├─ UrlForm.tsx
│  │  ├─ UrlList.tsx          # Uses lucide-react icons
│  │  └─ UrlResult.tsx
│  ├─ hooks/
│  │  ├─ useApiHealth.ts      # Detect API base URL
│  │  ├─ urlsContext.tsx
│  │  └─ toastContext.tsx
│  └─ routes/
│     └─ UrlInfo.tsx
└─ ... root configs (tsconfig.json, vite.config.ts, package.json)
```

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

### Local Development

- Install deps: `npm i`
- Dev (API + Client): `npm run dev`
- Client only: `npm run client`
- API only (watch): `npm run api:dev`

### Notes for Candidates

- Code is split by responsibility (controllers/services/repositories) to clarify where to add logic.
- Keep types in `sdk/` to avoid drift between client and server.
- Database schema and seed are plain SQL for readability.
