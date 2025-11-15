// app/movie/[id]/page.tsx
import React from "react";
import Image from "next/image";
import { fetchMovieById } from "../../../lib/tmdb.server"; // server-only fetch
import { getPosterUrl } from "../../../lib/image"; // client-safe helper
import type { Movie } from "../../../types/movie";

interface Props {
  params: { id: string };
}

export default async function MoviePage({ params }: Props) {
  const movie: Movie = await fetchMovieById(params.id);

  return (
    <div className="pt-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative w-full h-[450px] md:col-span-1 rounded overflow-hidden">
          <Image
            src={getPosterUrl(movie.poster_path, "w500")}
            alt={movie.title ?? movie.name ?? "Movie poster"}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{movie.title ?? movie.name}</h1>
          <p className="mt-3 text-sm text-neutral-300">{movie.release_date}</p>
          <div className="mt-4">
            <p>{movie.overview}</p>
          </div>

          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 bg-white text-black rounded">
              Play
            </button>
            <button className="px-4 py-2 border rounded">Add to list</button>
          </div>
        </div>
      </div>
    </div>
  );
}
