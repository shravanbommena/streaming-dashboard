// lib/image.ts
export function getPosterUrl(path: string | null | undefined, size = "w500") {
  if (!path) return "/placeholder_poster.png";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
