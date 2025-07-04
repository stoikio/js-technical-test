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
    origin: function (origin, callback) {
      console.log("CORS check - Origin:", origin);
      console.log("CORS check - NODE_ENV:", process.env.NODE_ENV);

      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) {
        console.log("CORS: Allowing request with no origin");
        return callback(null, true);
      }

      // Allow CodeSandbox domains (both .csb.app and .codesandbox.io)
      if (
        origin.includes(".csb.app") ||
        origin.includes(".codesandbox.io") ||
        origin.includes("localhost") ||
        origin.includes("127.0.0.1")
      ) {
        console.log("CORS: Allowing CodeSandbox/localhost origin:", origin);
        return callback(null, true);
      }

      // Log the rejected origin for debugging
      console.log("CORS: BLOCKED origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
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
