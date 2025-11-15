"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Movie } from "../types/movie";
// old: import { getPosterUrl } from '../lib/tmdb';
import { getPosterUrl } from "../lib/image";

interface Props {
  movies: Movie[];
  categoryTitle: string;
}

export default function MovieRow({ movies, categoryTitle }: Props) {
  return (
    <section className="my-6">
      <h2 className="text-xl font-semibold mb-3">{categoryTitle}</h2>
      <div className="relative">
        <div className="flex gap-3 overflow-x-auto py-2 scrollbar-hide">
          {movies.map((m) => (
            <Link
              key={m.id}
              href={`/movie/${m.id}`}
              className="min-w-[150px] hover:scale-105 transition-transform"
            >
              <div className="relative w-[150px] h-[225px]">
                <Image
                  src={getPosterUrl(m.poster_path, "w342")}
                  alt={m.title || m.name || "poster"}
                  fill
                  sizes="(max-width: 640px) 150px, 200px"
                  style={{ objectFit: "cover" }}
                  priority={false}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
