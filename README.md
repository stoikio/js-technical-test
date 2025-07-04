# 🔗 URL Shortener - TypeScript Fullstack Boilerplate

A modern, production-ready URL shortener built with TypeScript, React, Express, and PostgreSQL. Perfect for technical interviews and quick prototyping.

## 🚀 Quick Start

### CodeSandbox (Recommended for Interviews)

[![Open in CodeSandbox](https://img.shields.io/badge/Open%20in-CodeSandbox-blue?style=flat-square&logo=codesandbox)](https://codesandbox.io)

1. **Import this repository** into CodeSandbox
2. **Wait for setup** - dependencies will install automatically
3. **Start coding** - everything is configured and ready!

> 📋 **For CodeSandbox setup details, see [CODESANDBOX.md](./CODESANDBOX.md)**

### Local Development

```bash
# 1. Clone the repository
git clone <repository-url>
cd url-shortener

# 2. Install dependencies
npm run install:all

# 3. Start database (requires Docker)
npm run db:up

# 4. Start development servers
npm run dev
```

## 🏗️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, TypeScript, Node.js
- **Database**: PostgreSQL with Docker
- **Dev Tools**: ESLint, Prettier, Concurrently

## 📁 Project Structure

```
├── api/                 # Express API server
│   ├── src/
│   │   ├── config/      # Database configuration
│   │   ├── routes/      # API routes
│   │   ├── utils/       # Utility functions
│   │   └── index.ts     # Main server file
│   └── package.json
├── frontend/            # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── types/       # TypeScript types
│   │   └── App.tsx      # Main App component
│   └── package.json
├── database/            # PostgreSQL setup
│   └── init.sql         # Database schema
├── docker-compose.yml   # Docker configuration
└── package.json         # Root package.json
```

## 🌐 API Endpoints

- `POST /api/shorten` - Create a shortened URL
- `GET /:slug` - Redirect to original URL (301 redirect)

## 🔧 Development Commands

```bash
# Start both frontend and API
npm run dev

# Install all dependencies
npm run install:all

# Individual servers (with auto-install)
cd frontend && npm run dev:safe  # Frontend only
cd api && npm run dev:safe       # API only

# Build for production
npm run build:api && npm run build:frontend

# Database management
npm run db:up          # Start PostgreSQL
npm run db:down        # Stop PostgreSQL
npm run db:reset       # Reset database
npm run db:logs        # View database logs

# Code quality
npm run format         # Format code with Prettier
npm run lint          # Run linting
```

## 🎯 Features

- **URL Shortening**: Create short URLs like `http://localhost:3001/aB3xY7`
- **Automatic Redirects**: 301 redirects to original URLs
- **Duplicate Detection**: Reuses existing short URLs for same original URL
- **Modern UI**: Clean, responsive interface with Tailwind CSS
- **TypeScript**: Full type safety across frontend and backend
- **Component Architecture**: Modular, reusable React components
- **PostgreSQL Integration**: Robust database layer with proper connection pooling

## 🧪 Using in CodeSandbox

The project is fully configured for CodeSandbox environments:

- **Database Setup**: Connect to external PostgreSQL service
- **Auto-start**: Both servers start automatically
- **Live Preview**: Frontend opens immediately

## 📝 Environment Variables

### API (`api/.env`)

```env
DATABASE_URL=postgresql://user:password@localhost:5432/url_shortener
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Database Config

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=stoik_test
DB_USER=postgres
DB_PASSWORD=password
```

## 🔒 Security Features

- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: URL format validation
- **Error Handling**: Graceful error responses
- **Environment Variables**: Secure configuration management

## 🎨 UI/UX Features

- **Responsive Design**: Works on all screen sizes
- **Loading States**: Visual feedback during operations
- **Error Messages**: Clear error communication
- **Copy to Clipboard**: One-click URL copying
- **Modern Styling**: Clean, professional interface

## 📦 Deployment

### Production Build

```bash
npm run build:api
npm run build:frontend
```

### Docker Deployment

```bash
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🆘 Support

- **Issues**: Create a GitHub issue
- **CodeSandbox**: Check [CODESANDBOX.md](./CODESANDBOX.md)
- **Documentation**: This README covers all features

---

**Perfect for**: Technical interviews, coding challenges, learning fullstack development, prototyping URL shorteners.
