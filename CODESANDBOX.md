# 🚀 CodeSandbox Setup Guide

This project is configured to work smoothly in CodeSandbox for code interviews and quick demos.

## ⚡ Quick Start

1. **Fork this sandbox** to your own account
2. **Setup and start**: The project will automatically run `npm start` which:
   - Cleans and installs all dependencies fresh
   - Starts both frontend (port 3000) and API (port 3001) servers
3. **Ready to code**: Both servers will be running and ready for development

> ⚠️ **First run takes 2-3 minutes** as it installs all dependencies fresh

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
# Setup and start everything (recommended - cleans dependencies)
npm start

# Quick start (if dependencies already installed)
npm run start:quick

# Start both servers (after dependencies are installed)
npm run dev

# Install dependencies only
npm run install:all

# Safe individual server commands (auto-install dependencies)
cd frontend && npm run dev:safe  # Frontend with auto-install
cd api && npm run dev:safe       # API with auto-install

# Build for production (safe - installs dependencies first)
npm run build:safe

# Build (after dependencies installed)
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

### Dependency Issues

1. **If setup fails with module errors**: Run `npm start` to clean install all dependencies
2. **If frontend fails to start**: Use "Frontend Only" task which auto-installs dependencies
3. **For concurrently/yargs errors**: Run `npm start` to fix root dependency issues
4. **Manual installation**: Run `npm run install:all` to ensure all dependencies are installed
5. **Direct frontend setup**: In frontend folder, run `npm run dev:safe` (installs + starts)
6. **Clear cache**: Refresh the CodeSandbox environment if issues persist

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
