import { promises as fs } from "node:fs";
import { join } from "node:path";
import { PGlite } from "@electric-sql/pglite";

export const db = new PGlite();

/**
 * Initialize the database by applying migrations and, if empty, seeding sample data.
 * This file is kept small and explicit so candidates can easily see init flow.
 */
export async function initializeDatabase(): Promise<void> {
  await runMigrations();
  await seedIfEmpty();
}

/**
 * Run the migrations file to apply any changes to the database schema.
 */
async function runMigrations(): Promise<void> {
  const migrationFile = await fs.readFile(
    join(process.cwd(), "api", "database", "migration.sql"),
    "utf8"
  );
  await db.exec(migrationFile);
}

/**
 * Seed the database if it is empty by running the seeds.sql file.
 * This is a simple way to ensure the database is initialized with some data.
 *
 * @returns The number of rows in the database.
 */
async function seedIfEmpty(): Promise<void> {
  const existingCount = await db.query("SELECT COUNT(*) FROM urls");
  const countRow = existingCount.rows[0] as { count: string };
  const count = parseInt(countRow.count, 10);
  if (count === 0) {
    const seedFile = await fs.readFile(
      join(process.cwd(), "api", "database", "seeds.sql"),
      "utf8"
    );
    await db.exec(seedFile);
    console.log("✅ Database initialized with example data");
    return;
  }
  console.log("✅ Database initialized");
}
