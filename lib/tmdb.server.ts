// lib/tmdb.ts
import { TMDBListResponse, Movie } from "../types/movie";

const API_KEY = process.env.TMDB_API_KEY;
const BEARER = process.env.TMDB_BEARER_TOKEN; // v4 token, optional

if (!API_KEY && !BEARER) {
  throw new Error(
    "Missing TMDB credentials. Set TMDB_API_KEY or TMDB_BEARER_TOKEN in .env.local / Vercel env."
  );
}

const BASE = "https://api.themoviedb.org/3";

function buildUrl(path: string, params?: Record<string, string | number>) {
  const url = new URL(`${BASE}${path}`);
  if (!BEARER) {
    // only add api_key when bearer token is NOT used
    if (!API_KEY) throw new Error("TMDB_API_KEY missing in environment.");
    url.searchParams.set("api_key", API_KEY);
  }
  url.searchParams.set("language", "en-US");
  if (params) {
    Object.entries(params).forEach(([k, v]) =>
      url.searchParams.set(k, String(v))
    );
  }
  return url.toString();
}

function buildHeaders() {
  const headers: Record<string, string> = {};
  if (BEARER) {
    // ensure correct form
    const token = BEARER.trim();
    const prefix = token.toLowerCase().startsWith("bearer ") ? "" : "Bearer ";
    headers["Authorization"] = `${prefix}${token}`;
  }
  return headers;
}

async function fetchWithRetry<T>(
  url: string,
  retries = 3,
  timeoutMs = 8000
): Promise<T> {
  let attempt = 0;
  const backoff = (n: number) => 250 * Math.pow(2, n); // 250 → 500 → 1000

  while (attempt < retries) {
    attempt++;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const headers = buildHeaders();
      const res = await fetch(url, {
        signal: controller.signal,
        headers,
        next: { revalidate: 60 },
      });
      clearTimeout(id);

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status} ${res.statusText} - ${text}`);
      }

      return (await res.json()) as T;
    } catch (err: any) {
      clearTimeout(id);

      const delay = backoff(attempt - 1);

      console.warn(
        `tmdb fetch failed (attempt ${attempt}) for ${url}: ${String(
          err
        )}. retrying after ${delay}ms`
      );

      if (attempt >= retries) {
        const e = new Error(
          `Failed to fetch ${url} after ${attempt} attempts. Last error: ${
            err?.message || err
          }`
        );
        (e as any).cause = err;
        throw e;
      }

      await new Promise((r) => setTimeout(r, delay));
      continue;
    }
  }

  throw new Error("Unexpected fetchWithRetry flow");
}

// Public helpers
export async function fetchPopularMovies(): Promise<TMDBListResponse> {
  const url = buildUrl("/movie/popular", { page: 1 });
  return fetchWithRetry<TMDBListResponse>(url);
}

export async function fetchTopRatedMovies(): Promise<TMDBListResponse> {
  const url = buildUrl("/movie/top_rated", { page: 1 });
  return fetchWithRetry<TMDBListResponse>(url);
}

export async function fetchNowPlaying(): Promise<TMDBListResponse> {
  const url = buildUrl("/movie/now_playing", { page: 1 });
  return fetchWithRetry<TMDBListResponse>(url);
}

export async function fetchMovieById(id: string): Promise<Movie> {
  const url = buildUrl(`/movie/${id}`);
  return fetchWithRetry<Movie>(url);
}

export function getPosterUrl(path: string | null | undefined, size = "w500") {
  if (!path) return "/placeholder_poster.png";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
