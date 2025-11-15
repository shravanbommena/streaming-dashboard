"use client";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <Link href="/" className="text-2xl font-bold">
          MyStream
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/browse">Browse</Link>
          <Link href="/my-list">My List</Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="px-3 py-1 border rounded text-sm">Sign In</button>
        </div>
      </div>
    </header>
  );
}
