# Stoïk Technical Test - URL Shortener

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io/s/github/YOUR_USERNAME/YOUR_REPO_NAME)

A full-stack TypeScript application for shortening URLs, built with React, Express, and PostgreSQL.

## 🚀 Quick Start with CodeSandbox

1. Click the "Open in CodeSandbox" badge above
2. Wait for the environment to initialize (~30 seconds)
3. The full stack will start automatically:
   - PostgreSQL database
   - Express API (port 3001)
   - React frontend (port 3000)
4. Open the frontend preview to start using the URL shortener

## 📋 Features

- **URL Shortening**: Generate short URLs from long URLs
- **Redirect Service**: Automatic 301 redirects from short URLs to original URLs
- **Duplicate Detection**: Reuses existing short URLs for the same long URL
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Full TypeScript**: Type-safe throughout the entire stack

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, TypeScript, Node.js 18
- **Database**: PostgreSQL 15
- **Development**: Docker, Docker Compose

## 📡 API Endpoints

- `POST /api/shorten` - Create a shortened URL
- `GET /:slug` - Redirect to original URL
- `GET /health` - Health check endpoint

## 🔧 Local Development

```bash
# Install dependencies
npm run install:all

# Start the database
npm run db:up

# Start both services
npm run dev

# Frontend: http://localhost:3000
# API: http://localhost:3001
```
