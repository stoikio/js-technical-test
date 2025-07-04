# URL Shortener - TypeScript Boilerplate

A complete URL shortener application built with TypeScript, featuring a React frontend, Express API, and PGlite database. Perfect as a boilerplate for full-stack TypeScript projects.

## 🚀 Quick Start

**Ready to run in any environment - no database setup required!**

#### Prerequisites

- Node.js 18+ and npm

#### Setup & Start

```bash
# Clone the repository
git clone <repository-url>
cd js-technical-test

# Install dependencies
npm run setup

# Start development servers (API + Frontend)
npm start
```

**Servers will be running at:**

- 🌐 Frontend: http://localhost:3000
- 🔌 API: http://localhost:3001

#### StackBlitz & Online IDEs

This project works seamlessly in StackBlitz and other online IDEs! The code automatically detects the environment and:

- ✅ **Real PostgreSQL syntax** via PGlite WASM
- ✅ **Dynamic API URLs** that work in any environment
- ✅ **Proper CORS configuration** for online IDE previews
- ✅ **Health check endpoint** at `/api/health` for debugging

Just import the project and run `npm install && npm run dev` - everything works out of the box!

## 🏗️ Architecture

### Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: Express + TypeScript + Node.js
- **Database**: PGlite (PostgreSQL in WASM)
- **Build**: Vite + TypeScript compiler
- **Styling**: Tailwind CSS 4.x

### Project Structure

```
├── api/                   # Express API server
│   ├── src/
│   │   ├── routes/        # API route handlers
│   │   ├── config/        # Database configuration
│   │   └── utils/         # Utility functions
│   └── package.json
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   └── types/         # TypeScript types
│   └── package.json
└── package.json           # Root package management
```

## 🛠️ Available Scripts

### Root Level Commands

```bash
npm start           # Start both API and frontend in development mode
npm run dev         # Same as start
npm run build       # Build both API and frontend for production
npm run setup       # Install dependencies
```

### Individual Services

```bash
npm run dev:api        # Start API only (port 3001)
npm run dev:frontend   # Start frontend only (port 3000)
npm run build:api      # Build API for production
npm run build:frontend # Build frontend for production
```

## 🌐 API Endpoints

### Create Short URL

```http
POST /api/shorten
Content-Type: application/json

{
  "url": "https://example.com/very-long-url"
}
```

**Response:**

```json
{
  "original_url": "https://example.com/very-long-url",
  "short_url": "http://localhost:3001/aY2Pv8",
  "slug": "aY2Pv8",
  "created_at": "2024-01-01T12:00:00.000Z"
}
```

### Redirect Short URL

```http
GET /:slug
```

Returns a 301 redirect to the original URL.

## 🎨 Features

- **🔗 URL Shortening**: Create short, memorable links
- **📱 Responsive Design**: Works on all devices
- **⚡ Fast Performance**: Optimized with Vite and modern tools
- **🎯 Type Safety**: Full TypeScript coverage
- **🔄 Auto-redirect**: 301 redirects to original URLs
- **💾 PGlite Database**: Real PostgreSQL in WASM, works everywhere
- **🏃‍♂️ Zero Setup**: No database installation required

## 🚀 Deployment Ready

This boilerplate is ready for deployment to various platforms:

- **Frontend**: Vercel, Netlify, GitHub Pages
- **API**: Railway, Render, Digital Ocean, Heroku

## 📝 License

MIT License - feel free to use this boilerplate for your projects!

---

**Perfect for**: Learning full-stack TypeScript, building MVPs, hackathons, or as a starting point for larger applications.
