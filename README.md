# Competitor Researcher

AI-assisted **competitive research** web app — generate structured competitor reports from a product description and context.

Built with React, Vite, Express, and the Google GenAI SDK.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Features

- Dashboard for new research runs
- Structured report viewer
- Local history sidebar
- Gemini-backed generation with fallback generator for offline demos
- Tailwind UI + Motion transitions

## Prerequisites

- Node.js 20+
- A [Google AI Studio / Gemini API key](https://aistudio.google.com/apikey)

## Setup

```bash
git clone https://github.com/Stijnman/competitor_researcher.git
cd competitor_researcher
npm install
cp .env.example .env.local
# set GEMINI_API_KEY=... in .env.local
npm run dev
```

Open the local URL printed by Vite/tsx (see `server.ts` / console).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server (API + Vite) |
| `npm run build` | Production build |
| `npm start` | Run production server |
| `npm run lint` | Typecheck |

## Environment

```bash
GEMINI_API_KEY=your_key_here
```

See `.env.example`.

## Project layout

```
src/           React UI
server.ts      Express + AI routes
fallbackGenerator.ts
```

## License

MIT © 2026 Stijnman
