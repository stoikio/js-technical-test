# URL Shortener - CodeSandbox Setup

This project is configured to work smoothly in CodeSandbox for code interviews and development.

## Quick Start

When you open this project in CodeSandbox:

1. **Automatic Setup**: The project will automatically install dependencies and set up the database
2. **Services**: Both API (port 3001) and Frontend (port 3000) will start automatically
3. **Preview**: The frontend will be available in the preview pane

## Services

### API Server (Port 3001)

- Express.js with TypeScript
- PostgreSQL database
- URL shortening endpoints

### Frontend (Port 3000)

- React with TypeScript
- Vite development server
- Tailwind CSS for styling

## Database

The project uses PostgreSQL via Docker Compose. The database is automatically configured and initialized when the project starts.

## Environment Configuration

The project is pre-configured to work in CodeSandbox:

- API URLs are automatically adjusted for CodeSandbox preview URLs
- CORS is configured to allow requests from CodeSandbox domains
- Database connection is set up for the containerized PostgreSQL

## Interview Usage

This boilerplate is perfect for coding interviews involving:

- Full-stack development
- API design and implementation
- Database schema design
- Frontend component development
- TypeScript usage
- URL shortening algorithms

## Development

To make changes during an interview:

1. Edit files in the left panel
2. Changes will automatically reload the preview
3. Use the terminal for any additional commands

## Architecture

```
├── api/          # Express API server
├── frontend/     # React frontend
├── database/     # PostgreSQL setup
└── docker-compose.yml
```

The project demonstrates modern full-stack development practices with TypeScript, modular architecture, and containerized services.
