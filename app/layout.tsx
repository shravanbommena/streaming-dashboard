// app/layout.tsx
import "./globals.css";
import React from "react";
import Header from "../components/Header";

export const metadata = {
  title: "Streaming Dashboard",
  description: "A simplified streaming dashboard clone",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="px-6 md:px-12 lg:px-24 py-6">{children}</main>
      </body>
    </html>
  );
}
