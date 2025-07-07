import { PGlite } from "@electric-sql/pglite";
import type { CountRow } from "./types";

// PostgreSQL wrapper for in-memory database
export const db = new PGlite();

export async function initializeDatabase() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS urls (
      id SERIAL PRIMARY KEY,
      short_code VARCHAR(12) UNIQUE NOT NULL,
      full_url TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  // Add some example data if table is empty
  const existingCount = await db.query("SELECT COUNT(*) FROM urls");
  const countRow = existingCount.rows[0] as CountRow;
  const count = parseInt(countRow.count, 10);

  if (count == 0) {
    await db.exec(`
      INSERT INTO urls (short_code, full_url, created_at) VALUES
      ('F98KKD', 'https://stoik.com/', NOW() - INTERVAL '2 hours'),
      ('Q0S9D8', 'https://linkedin.com/', NOW() - INTERVAL '1 hour'),
      ('09FSD7', 'https://nodejs.org/en/docs/', NOW() - INTERVAL '30 minutes'),
      ('QMLSD9', 'https://www.typescriptlang.org/docs/', NOW() - INTERVAL '15 minutes');
    `);
    console.log("✅ Database initialized with example data");
  } else {
    console.log("✅ Database initialized");
  }
}
