import express from "express";
import routes from "./routes";
import { initializeDatabase } from "./database/connection";

export async function createApp() {
  const app = express();

  // Middleware
  app.use(express.json());

  // Initialize database
  await initializeDatabase();

  // Routes
  app.use(routes);

  return app;
}
