# RepairOps Docs

Static documentation site for [RepairOps](https://docs.repairops.app) — a multi-tenant repair shop management SaaS platform.

**Live site:** [docs.repairops.app](https://docs.repairops.app)

## Tech Stack

- [Astro 5](https://astro.build)
- [Starlight](https://starlight.astro.build) documentation theme
- TypeScript (strict mode)
- [Vercel](https://vercel.com) (static deployment)

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) for local development with hot reload.

## Commands

| Command        | Description                          |
|----------------|--------------------------------------|
| `npm run dev`  | Start dev server with hot reload     |
| `npm run build`| Production build (output in `/dist`) |
| `npm run preview` | Preview production build locally  |

## Project Structure

| Path              | Description                                   |
|-------------------|-----------------------------------------------|
| `src/content/docs/` | Documentation content (Markdown & MDX)     |
| `src/components/`   | Custom interactive Astro components        |
| `src/styles/`       | Custom CSS (extends Starlight)             |
| `astro.config.mjs`  | Astro + Starlight config, sidebar definition |

## Deployment (Vercel)

This is a **fully static site** — no environment variables or secrets are required. Vercel only needs:

- **Framework:** Astro (auto-detected)
- **Build command:** `npm run build`
- **Output directory:** `dist`

Connect the repo, and deployment works out of the box. No `.env` or API keys needed.

## Contributing

Content lives in `src/content/docs/`. New pages require:

1. Adding the file under `src/content/docs/`
2. Updating the sidebar in `astro.config.mjs`

## License

Private. See repository settings for usage terms.
