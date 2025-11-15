# Streaming Dashboard Clone

A simplified streaming service dashboard inspired by Netflix, built using **Next.js 14**, **TypeScript**, and **Tailwind CSS**, with data fetched from **TMDB (The Movie Database)** API.

This project was created as a Frontend Developer technical task and includes full documentation of AI-assisted development.

---

# 🚀 Features

- Next.js 14 App Router
- Server Components for API fetching
- Client Components for UI interactions
- Dynamic routes (`/movie/[id]`)
- TMDB integration with server-only environment variables
- Tailwind CSS responsive design
- Optimized Next/Image loading
- Reusable movie rows with horizontal scroll
- Deployed on Vercel

---

# 📦 Tech Stack

- **Next.js 14**
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **TMDB API**
- **Vercel (Hosting)**

---

# 🔧 Installation & Setup

1. **Clone the repository**

```bash
git clone <your-github-repo-url>
cd <your-project-folder>
```

2. **Install packages**

```bash
npm install
```

3. **Environment variables**

Create a `.env.local` file in the project root:

```ini
TMDB_API_KEY=your_tmdb_v3_key
TMDB_BEARER_TOKEN=your_tmdb_v4_bearer_token
```

⚠️ Do **not** commit `.env.local` to GitHub.

4. **Start development server**

```bash
npm run dev
```

Visit: http://localhost:3000

---

# 📁 Folder Structure

```
app/
 ├─ page.tsx
 ├─ movie/[id]/page.tsx

components/
 ├─ Header.tsx
 ├─ MovieRow.tsx

lib/
 ├─ tmdb.server.ts
 ├─ image.ts

types/
 ├─ movie.ts

public/
 ├─ favicon.ico
```

---

# 🛠 Build for Production

```bash
npm run build
npm start
```
