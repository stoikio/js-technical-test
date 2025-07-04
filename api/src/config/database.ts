// Simple in-memory database with SQL-like interface
// Perfect for development, testing, and lightweight applications

import Database from "better-sqlite3";
import path from "path";

// SQLite database setup
const dbPath =
  process.env.NODE_ENV === "production"
    ? path.join(process.cwd(), "data.db")
    : ":memory:"; // In-memory for development

const db = new Database(dbPath);

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_url TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Database client interface that mimics PostgreSQL client API
export interface DatabaseClient {
  query(
    text: string,
    params?: any[]
  ): Promise<{ rows: any[]; rowCount: number }>;
  release?(): void;
}

// SQLite client implementation with PostgreSQL-compatible interface
class SQLiteClient implements DatabaseClient {
  async query(
    text: string,
    params: any[] = []
  ): Promise<{ rows: any[]; rowCount: number }> {
    try {
      // Convert PostgreSQL-style $1, $2 parameters to SQLite-style ?
      const sqliteQuery = text.replace(/\$(\d+)/g, "?");

      if (sqliteQuery.toLowerCase().trim().startsWith("select")) {
        // Handle SELECT queries
        const stmt = db.prepare(sqliteQuery);
        const rows = stmt.all(params);
        return { rows, rowCount: rows.length };
      } else {
        // Handle INSERT, UPDATE, DELETE queries
        const stmt = db.prepare(sqliteQuery);
        const result = stmt.run(params);

        // For INSERT with RETURNING, get the inserted row
        if (sqliteQuery.toLowerCase().includes("returning")) {
          const selectStmt = db.prepare("SELECT * FROM urls WHERE id = ?");
          const insertedRow = selectStmt.get(result.lastInsertRowid);
          return { rows: [insertedRow], rowCount: 1 };
        }

        return { rows: [], rowCount: result.changes };
      }
    } catch (error) {
      console.error("Database query error:", error);
      throw error;
    }
  }
}

// Get database client (always returns SQLite implementation)
export const getClient = async (): Promise<DatabaseClient> => {
  return new SQLiteClient();
};

// Graceful shutdown function
export const closeDatabaseConnection = async (): Promise<void> => {
  db.close();
};
