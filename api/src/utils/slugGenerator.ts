import { nanoid } from "nanoid";

/**
 * Generates a unique slug for URL shortening
 * @param checkSlugExists - Function that checks if a slug already exists
 * @returns Promise<string> - A unique slug
 */
export async function generateUniqueSlug(
  checkSlugExists: (slug: string) => Promise<boolean>
): Promise<string> {
  // Generate initial slug
  let slug = nanoid(6);

  // Check if slug exists
  const exists = await checkSlugExists(slug);

  if (exists) {
    // Generate another one if collision occurs
    slug = nanoid(6);
  }

  return slug;
}
