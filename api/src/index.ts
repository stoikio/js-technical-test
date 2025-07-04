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

// Debug logging
console.log("Environment variables:");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("BASE_URL:", process.env.BASE_URL);

// Middleware
app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      // In CodeSandbox, allow all csb.app and codesandbox.io domains
      (process.env.NODE_ENV === "development"
        ? ["http://localhost:3000", /\.csb\.app$/, /\.codesandbox\.io$/]
        : "http://localhost:3000"),
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

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
