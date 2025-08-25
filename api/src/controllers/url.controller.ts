import type { Request, Response } from "express";
import { getBaseUrl } from "../../config";
import {
  createShortUrlService,
  getFullUrlFromShortCode,
  listRecentUrls,
  incrementClickCountFromShortCode,
} from "../services/url.service";

// POST /api/shorten - Create a short URL
export async function shorten(req: Request, res: Response) {
  try {
    const result = await createShortUrlService(req, req.body);
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Bad Request";
    res.status(400).json({ error: message });
  }
}

// GET /:shortCode - Redirect to original URL (and count click)
export async function redirect(req: Request, res: Response) {
  try {
    const { shortCode } = req.params as { shortCode: string };
    const fullUrl = await getFullUrlFromShortCode(shortCode);
    if (!fullUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    incrementClickCountFromShortCode(shortCode).catch(() => {});
    res.redirect(302, fullUrl);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET /api/urls - List recent URLs
export async function list(req: Request, res: Response) {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const urls = await listRecentUrls(limit);
    res.json({ success: true, urls });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

// GET /api/health - Health check endpoint
export async function health(req: Request, res: Response) {
  const frontendOrigin =
    typeof req.query.frontendOrigin === "string"
      ? (req.query.frontendOrigin as string)
      : undefined;
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    baseUrl: getBaseUrl(req, frontendOrigin),
  });
}
