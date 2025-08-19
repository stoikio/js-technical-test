import { Router } from "express";
import { generateShortCode, isValidUrl, getBaseUrl } from "./config/index";
import {
  createShortUrl,
  getFullUrl,
  getAllUrls,
  incrementClickCount,
} from "./database/urlRepository";

const router = Router();

// GET /api/health - Health check endpoint
router.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    baseUrl: getBaseUrl(req),
  });
});

// POST /api/shorten - Create a short URL
router.post("/api/shorten", async (req, res) => {
  try {
    const { url, frontendOrigin } = req.body;

    // Validate input
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "URL is required" });
    }

    if (!isValidUrl(url)) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // Generate unique short code
    const shortCode = generateShortCode();

    // Save to database
    const urlRecord = await createShortUrl(shortCode, url);

    // Generate final short URL
    const apiBaseUrl = getBaseUrl(req, frontendOrigin);
    const shortUrl = `${apiBaseUrl}/${shortCode}`;

    res.json({
      success: true,
      shortUrl,
      shortCode,
      originalUrl: url,
      id: urlRecord.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /:shortCode - Redirect to original URL (and count click)
router.get("/:shortCode", async (req, res) => {
  try {
    const { shortCode } = req.params;

    // Get original URL from database
    const fullUrl = await getFullUrl(shortCode);

    if (!fullUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // Increment click counter (fire and forget)
    incrementClickCount(shortCode).catch(() => {});

    // Redirect to original URL
    res.redirect(302, fullUrl);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/urls - List recent URLs
router.get("/api/urls", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const urls = await getAllUrls(limit);

    res.json({
      success: true,
      urls,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
