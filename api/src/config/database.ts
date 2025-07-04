import { Pool } from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "stoik_test",
  password: process.env.DB_PASSWORD || "password",
  port: parseInt(process.env.DB_PORT || "5432"),
};

// Create and export database pool
export const pool = new Pool(dbConfig);

// Graceful shutdown function
export const closeDatabaseConnection = async (): Promise<void> => {
  await pool.end();
};
