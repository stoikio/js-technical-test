-- Seed: insert example url rows when empty
INSERT INTO urls (short_code, full_url, created_at, click_count) VALUES
  ('F98KKD', 'https://stoik.com/', NOW() - INTERVAL '2 hours', 23),
  ('Q0S9D8', 'https://linkedin.com/', NOW() - INTERVAL '1 hour', 0),
  ('09FSD7', 'https://nodejs.org/en/docs/', NOW() - INTERVAL '30 minutes', 10),
  ('QMLSD9', 'https://www.typescriptlang.org/docs/', NOW() - INTERVAL '15 minutes', 5);


