# AI Report

**Project:** Streaming Dashboard Clone (Next.js 14 + App Router + TypeScript)

---

## 1. AI Tools Used

### **ChatGPT**

- Used extensively for:
  - Breaking down the assignment into implementable steps.
  - Creating boilerplate code for components (MovieRow, Hero Banner, Server Fetch Helpers).
  - Debugging Next.js server-side rendering issues.
  - Fixing fetch failures, ECONNRESET errors, and separating server/client logic.
  - Designing TypeScript interfaces and improving API integration.
  - Writing Tailwind class patterns for layout and responsive design.
  - Generating helper utilities (image URL builder, fetch retry logic).
  - Producing final submission documentation (this file).

### **GitHub Copilot**

- Used for:
  - Inline code suggestions while building components.
  - Autocomplete for TypeScript definitions.
  - Auto-generating Tailwind utility refinements.
  - Faster refactoring and file creation.

### **VS Code IntelliSense**

- Not AI but provided static suggestions that complimented Copilot and ChatGPT-generated code.

---

## 2. Code Areas That Heavily Relied on AI Assistance

### **a. TailwindCSS Styling**

AI provided:

- Complete class-based styles for grid layouts, hero section, and responsive design.
- Hover animation suggestions and scrollbar hiding for horizontal lists.

Examples:

- Hero Banner gradient overlay design.
- Horizontal poster scrolling with flex + overflow-x-auto.
- Layout spacing, typography scale, and mobile responsiveness.

---

### **b. Complex Utility Functions**

AI created or assisted in:

- `fetchWithRetry()` function with:
  - exponential backoff
  - abort controller timeout
  - robust error handling for ECONNRESET
- `getPosterUrl()` helper used across app
- Construction of TMDB API helper functions in `lib/tmdb.server.ts`.

---

### **c. Next.js Configuration & Setup**

AI directly generated:

- Correct `next.config.js` using `images.remotePatterns` (to replace deprecated domains).
- .env variable usage patterns (server-only credentials).
- Separation of server-only modules into `.server.ts` to prevent bundling issues.
- Fixing import problems between client and server components.
- Correct SSR patterns using `Promise.allSettled`.

---

### **d. Component Code Generation**

Components influenced or fully drafted via ChatGPT:

- **Header** (Client Component)
- **MovieRow** (Client Component with horizontal scrolling)
- **Hero Banner** section logic + layout
- **Movie Detail Page** under `app/movie/[id]/page.tsx`
- **Homepage Server Component** (`app/page.tsx`) with multiple data sources
- Error fallback UI and improved streaming stability

---

### **e. Debugging & Problem Solving**

AI helped resolve:

- ECONNRESET issues with TMDB API
- Hanging favicon / streaming errors
- Next.js “server-only code leaked to client” errors
- Deprecation warnings (`images.domains`)
- Configuration for environment variable loading

---

## 3. Deployment Links

### **🔗 Live Production App (Vercel)**

**URL:** _<replace-with-your-vercel-url>_

### **🔗 GitHub Repository**

**URL:** _<replace-with-your-github-url>_

---

## 4. Summary

AI tools significantly accelerated the development process, especially in:

- building boilerplate Next.js App Router code,
- handling complex API fetch reliability,
- generating Tailwind layouts quickly,
- solving tricky server/client boundary issues,
- producing documentation and code explanations.

The final application matches all functional requirements and demonstrates effective use of AI to speed up real-world frontend engineering workflows.
