# 🚀 CodeSandbox Setup Guide

This project is configured to work smoothly in CodeSandbox for code interviews and quick demos.

## ⚡ Quick Start

1. **Fork this sandbox** to your own account
2. **Install dependencies**: The project will automatically run `npm run setup:codesandbox` on first load
3. **Start development**: Run `npm run dev` to start both frontend and API servers

## 🌐 Available Services

- **Frontend**: http://localhost:3000 (React + Vite + Tailwind)
- **API**: http://localhost:3001 (Express + TypeScript)

## 🗄️ Database Setup

You'll need a PostgreSQL database to run this project. Get a free one from:

- [Supabase](https://supabase.com) (recommended)
- [Neon](https://neon.tech)
- [Railway](https://railway.app)

Copy your database URL and paste it in the terminal:

```bash
echo "DATABASE_URL=your_database_url_here" > api/.env
```

Then restart the servers: `npm run dev`

## 🎯 Interview Tips

### For Interviewers:

- **Share the sandbox URL** with candidates
- **Pre-configure the database** if needed
- **Test the setup** before the interview

### For Candidates:

- **Fork the sandbox** to make your own changes
- **Read the project structure** in the main README.md
- **Focus on the task** - everything is already set up!

## 🔧 Development Commands

```bash
# Start both servers
npm run dev

# Install dependencies
npm run install:all

# Build for production
npm run build:api && npm run build:frontend

# Lint code
npm run lint

# Format code
npm run format
```

## 📁 Project Structure

```
├── api/           # Express API server
├── frontend/      # React frontend
├── database/      # PostgreSQL schema
└── README.md      # Full project documentation
```

## 🐛 Troubleshooting

### Database Connection Issues

1. Check your `DATABASE_URL` in `api/.env`
2. Verify the external database is accessible
3. Check the API logs in the terminal

### Port Issues

- Frontend: Port 3000 should auto-open
- API: Port 3001 runs in background
- Check the "Preview" tab for multiple ports

### Slow Loading

- CodeSandbox containers need a moment to start
- Check the "Tasks" tab for startup progress
- Try refreshing if services don't respond

## 📞 Need Help?

Check the main [README.md](./README.md) for complete project documentation and setup instructions.
