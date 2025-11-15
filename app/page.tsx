// app/page.tsx (server)
import React from "react";
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlaying,
} from "../lib/tmdb.server";
import MovieRow from "../components/MovieRow";
import Image from "next/image";
import { getPosterUrl } from "../lib/image";
import type { Movie } from "../types/movie";

export default async function HomePage() {
  // Run requests in parallel but `allSettled` so a single failure doesn't reject the whole render stream
  const [popularSettled, topSettled, nowSettled] = await Promise.allSettled([
    fetchPopularMovies(),
    fetchTopRatedMovies(),
    fetchNowPlaying(),
  ]);

  const popular =
    popularSettled.status === "fulfilled"
      ? (popularSettled.value.results as Movie[])
      : [];
  if (popularSettled.status === "rejected")
    console.error("popular fetch error", popularSettled.reason);

  const top =
    topSettled.status === "fulfilled"
      ? (topSettled.value.results as Movie[])
      : [];
  if (topSettled.status === "rejected")
    console.error("top fetch error", topSettled.reason);

  const now =
    nowSettled.status === "fulfilled"
      ? (nowSettled.value.results as Movie[])
      : [];
  if (nowSettled.status === "rejected")
    console.error("now fetch error", nowSettled.reason);

  const hero = popular[0];

  // If all arrays are empty, show a clear offline/fallback message so page finishes rendering.
  const allEmpty = popular.length === 0 && top.length === 0 && now.length === 0;

  return (
    <div className="pt-20">
      {allEmpty ? (
        <div className="max-w-3xl mx-auto p-8 text-center">
          <h2 className="text-2xl font-bold">Content currently unavailable</h2>
          <p className="mt-2 text-neutral-300">
            {
              "We're having trouble fetching movie data right now. Check your network or API credentials. Errors are logged on the server console."
            }
          </p>
        </div>
      ) : (
        <>
          {hero && (
            <section className="relative h-[60vh] rounded overflow-hidden mb-6">
              <Image
                src={getPosterUrl(
                  hero.backdrop_path ?? hero.poster_path,
                  "w1280"
                )}
                alt={hero.title ?? hero.name ?? "Movie banner"}
                fill
                priority
                style={{ objectFit: "cover" }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 max-w-xl">
                <h1 className="text-4xl font-extrabold">
                  {hero.title || hero.name}
                </h1>
                <p className="mt-2 line-clamp-3 max-w-md">{hero.overview}</p>
              </div>
            </section>
          )}

          <MovieRow movies={popular} categoryTitle="Popular Now" />
          <MovieRow movies={top.slice(0, 20)} categoryTitle="Top Rated" />
          <MovieRow movies={now} categoryTitle="Now Playing" />
        </>
      )}
    </div>
  );
}
