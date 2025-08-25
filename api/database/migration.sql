-- Migration: create urls table
CREATE TABLE IF NOT EXISTS urls (
  id SERIAL PRIMARY KEY,
  short_code VARCHAR(12) UNIQUE NOT NULL,
  full_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  click_count INTEGER NOT NULL DEFAULT 0
);
