import { Router } from "express";
import {
  health,
  shorten,
  redirect,
  list,
} from "./src/controllers/url.controller";

const router = Router();

// POST /api/shorten - Create a short URL
router.post("/api/shorten", shorten);

// GET /:shortCode - Redirect to original URL (and count click)
router.get("/:shortCode", redirect);

// GET /api/urls - List recent URLs
router.get("/api/urls", list);

// GET /api/health - Health check endpoint
router.get("/api/health", health);

export default router;
