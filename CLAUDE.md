# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RepairOps documentation site — a static docs site for a multi-tenant repair shop management SaaS platform. Built with **Astro 5 + Starlight** and deployed to **Vercel** as a fully static site.

Live site: https://docs.repairops.app

## Commands

```bash
npm run dev       # Start dev server with hot reload
npm run build     # Production build to /dist
npm run preview   # Preview production build locally
```

There are no test or lint commands configured.

## Architecture

**Stack**: Astro 5, Starlight 0.34, Vercel adapter, TypeScript (strict)

**Content**: All documentation lives in `src/content/docs/` as Markdown (`.md`) and MDX (`.mdx`) files. Content is loaded via Starlight's `docsLoader()` in `src/content.config.ts`. File structure maps directly to URL slugs (e.g., `src/content/docs/admin/billing.md` → `/admin/billing/`).

**Sidebar**: Defined explicitly in `astro.config.mjs` — not auto-generated from file structure. New pages must be added to both the filesystem and the sidebar config.

**Custom Components** (`src/components/`): Six interactive Astro components used in MDX pages via standard imports. These use vanilla JS (no framework) with `<script>` tags for client-side interactivity:
- `InteractiveStateMachine.astro` — clickable state diagram with 13 ticket statuses
- `FeatureCompare.astro` — three-tier pricing comparison table
- `ApiPlayground.astro` — multi-language API code examples with tab switching
- `KeyboardShortcutTable.astro` — keyboard shortcuts with `<kbd>` rendering
- `FeatureCard.astro` / `TierBadge.astro` — reusable display components

**Styling**: Custom CSS in `src/styles/custom.css` extending Starlight's defaults. Uses CSS custom properties prefixed `--ro-` for brand colors and `--tier-` for plan tier colors.

**Deployment**: Vercel SSG with security headers and a `/docs/*` → `/*` redirect configured in `vercel.json`.

## Content Sections

| Section | Path | Pages | Description |
|---------|------|-------|-------------|
| Getting Started | `getting-started/` | 4 | Onboarding and setup |
| User Guide | `user-guide/` | 5 | Role-based workflows |
| Features | `features/` | 8 | Feature documentation |
| Admin Guide | `admin/` | 6 | Administration and security |
| Developer | `developer/` | 4 | API reference and plugin SDK |
| Reference | `reference/` | 5 | State machine, permissions, glossary |
| Legal | `legal/` | 6 | Terms, privacy, cookies, AUP, DPA |
