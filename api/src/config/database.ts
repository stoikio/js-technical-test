// Simple database abstraction that works in all environments
// Uses SQLite locally, falls back to in-memory storage in StackBlitz

import { PGlite } from "@electric-sql/pglite";

// Database client interface that matches PostgreSQL client API
export interface DatabaseClient {
  query(
    text: string,
    params?: any[]
  ): Promise<{ rows: any[]; rowCount: number }>;
  release?(): void;
}

// PGlite database instance (in-memory by default)
const db = new PGlite();

// Initialize database schema
async function initializeDatabase() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS urls (
      id SERIAL PRIMARY KEY,
      original_url TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// PGlite client implementation with PostgreSQL-compatible interface
class PGliteClient implements DatabaseClient {
  async query(
    text: string,
    params: any[] = []
  ): Promise<{ rows: any[]; rowCount: number }> {
    try {
      const result = await db.query(text, params);
      return {
        rows: result.rows,
        rowCount: result.rows.length,
      };
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }
}

// Initialize the database when the module loads
let dbInitialized = false;

// Get database client
export const getClient = async (): Promise<DatabaseClient> => {
  if (!dbInitialized) {
    console.log("🐘 Initializing PGlite (PostgreSQL in WASM)");
    await initializeDatabase();
    dbInitialized = true;
  }
  return new PGliteClient();
};

// Graceful shutdown function
export const closeDatabaseConnection = async (): Promise<void> => {
  await db.close();
};
