# 🔗 URL Shortener - TypeScript Boilerplate

A full-stack TypeScript boilerplate for a URL shortener application with Express API, React frontend, and PostgreSQL database.

## 🚀 Quick Start with Gitpod

**One-click setup in the cloud:**

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/your-username/your-repo)

The Gitpod workspace will automatically:

- ✅ Set up PostgreSQL database with schema
- ✅ Install all dependencies (API + Frontend)
- ✅ Start the API server on port 3001
- ✅ Start the frontend server on port 3000
- ✅ Open the application in your browser

**Ready to code in ~2 minutes!**

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Express.js + TypeScript + PostgreSQL
- **Database**: PostgreSQL with connection pooling
- **Development**: Hot reload, ESLint, Prettier
- **Deployment**: Docker ready

## 📋 Features

- 🔗 **URL Shortening**: Convert long URLs to short, memorable links
- 🎯 **Clean UI**: Modern, responsive design with Tailwind CSS
- 🔄 **Real-time**: Instant URL generation and validation
- 📊 **Database**: PostgreSQL with proper indexing
- 🚀 **Fast**: Optimized for performance
- 🔒 **Secure**: Input validation and sanitization

## 🏗️ Project Structure

```
├── api/                 # Express API server
│   ├── src/
│   │   ├── config/     # Database configuration
│   │   ├── routes/     # API routes
│   │   ├── utils/      # Utility functions
│   │   └── index.ts    # API entry point
│   └── package.json
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── types/      # TypeScript types
│   │   └── App.tsx     # Main application
│   └── package.json
├── database/           # Database initialization
│   └── init.sql        # Database schema
├── docker-compose.yml  # PostgreSQL container
└── .gitpod.yml         # Gitpod configuration
```

## 🔧 Local Development

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd url-shortener
   ```

2. **Install dependencies**

   ```bash
   npm install
   cd api && npm install
   cd ../frontend && npm install
   ```

3. **Start PostgreSQL**

   ```bash
   docker-compose up -d
   ```

4. **Start development servers**

   ```bash
   # Terminal 1 - API
   cd api && npm run dev

   # Terminal 2 - Frontend
   cd frontend && npm run dev
   ```

5. **Open the application**
   - Frontend: http://localhost:3000
   - API: http://localhost:3001

## 📡 API Endpoints

### `POST /api/shorten`

Create a shortened URL

**Request:**

```json
{
  "url": "https://example.com/very-long-url"
}
```

**Response:**

```json
{
  "original_url": "https://example.com/very-long-url",
  "short_url": "http://localhost:3001/aY2Pv8",
  "slug": "aY2Pv8"
}
```

### `GET /:slug`

Redirect to original URL

**Example:** `GET /aY2Pv8` → 301 redirect to original URL

## 🗄️ Database Schema

```sql
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  original_url TEXT NOT NULL,
  slug VARCHAR(10) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Development Scripts

```bash
# Root level
npm run dev          # Start both API and frontend
npm run build        # Build both projects
npm run clean        # Clean all node_modules

# API (api/)
npm run dev          # Start API with hot reload
npm run build        # Build API
npm start            # Start built API

# Frontend (frontend/)
npm run dev          # Start frontend with hot reload
npm run build        # Build frontend
npm run preview      # Preview built frontend
```

## 🔧 Environment Variables

Create `.env` files in the API directory:

```env
DATABASE_URL=postgresql://url_user:url_password@localhost:5432/url_shortener
PORT=3001
NODE_ENV=development
```

## 📦 Deployment

The project is Docker-ready and can be deployed to:

- Heroku
- Vercel (Frontend) + Railway (API)
- AWS/Google Cloud
- Any VPS with Docker

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this boilerplate for your projects!

---

**Happy coding! 🚀**
