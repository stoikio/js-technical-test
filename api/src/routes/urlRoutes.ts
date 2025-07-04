import { Router, Request, Response } from "express";
import { getClient } from "../config/database.js";
import { generateUniqueSlug } from "../utils/slugGenerator.js";

const router = Router();

/**
 * POST /api/shorten
 * Create a shortened URL
 */
router.post("/api/shorten", async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    // Validate input
    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    // Simple URL validation
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    const client = await getClient();

    try {
      // Check if URL already exists
      const existing = await client.query(
        "SELECT slug FROM urls WHERE original_url = $1",
        [url]
      );

      if (existing.rows.length > 0) {
        const slug = existing.rows[0].slug;
        return res.json({
          short_url: `http://localhost:3001/${slug}`,
        });
      }

      // Generate unique slug
      const checkSlugExists = async (slug: string): Promise<boolean> => {
        const result = await client.query(
          "SELECT id FROM urls WHERE slug = $1",
          [slug]
        );
        return result.rows.length > 0;
      };

      const slug = await generateUniqueSlug(checkSlugExists);

      // Insert new URL
      await client.query(
        "INSERT INTO urls (original_url, slug) VALUES ($1, $2)",
        [url, slug]
      );

      res.status(201).json({
        short_url: `http://localhost:3001/${slug}`,
      });
    } finally {
      if (client.release) {
        client.release();
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * GET /:slug
 * Redirect to original URL
 */
router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const client = await getClient();

    try {
      // Get original URL
      const result = await client.query(
        "SELECT original_url FROM urls WHERE slug = $1",
        [slug]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "URL not found" });
      }

      // Redirect
      res.redirect(301, result.rows[0].original_url);
    } finally {
      if (client.release) {
        client.release();
      }
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
