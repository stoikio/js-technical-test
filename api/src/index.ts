import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Import our modular routes and configurations
import urlRoutes from "./routes/urlRoutes.js";
import { closeDatabaseConnection } from "./config/database.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/", urlRoutes);

// Catch-all for undefined routes
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 URL Shortener API running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down server...");
  await closeDatabaseConnection();
  process.exit(0);
});

export default app;
