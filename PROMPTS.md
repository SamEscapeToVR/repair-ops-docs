# RepairOps Documentation Site — AI Build Prompts

> **Target:** docs.repairops.app
> **Content:** 28 markdown files across 6 sections (~9,150 lines)
> **Created:** 2026-03-09
> **Owner:** Sam

These prompts are designed for Claude Code, Gemini CLI, or Codex. Each prompt is self-contained with full context. Pick the one that matches your preferred tool and paste it in.

---

## Content Inventory (what exists)

```
docs.repairops.app/
├── index.md                          # Homepage / landing
├── getting-started/                  # 4 files (quick-start, first-ticket, team-setup, plans-and-billing)
├── user-guide/                       # 5 files (index, front-desk, technician, manager, customer-portal)
├── features/                         # 8 files (index, knowledge-base, system-builder, ai-gateway, pos-terminal, analytics, plugins, ifixit-guides)
├── admin/                            # 6 files (index, billing, sso, branding, backups, security)
├── developer/                        # 4 files (index, api-reference, plugin-sdk, self-hosted)
└── reference/                        # empty — needs: state-machine, feature-matrix, permissions, glossary, shortcuts
```

**Total:** 28 markdown files, ~9,150 lines of content. All content is written and ready. The `reference/` directory is empty and should be populated during the build.

---

## Prompt 1 — Claude Code (Recommended)

```
# Build the RepairOps Documentation Site (docs.repairops.app)

## Project Overview

Build a modern, interactive documentation website for RepairOps — a multi-tenant repair shop management SaaS. The site will be deployed to docs.repairops.app via Vercel.

**All markdown content already exists** in `docs.repairops.app/`. Your job is to scaffold the site framework, ingest the existing markdown, and make it beautiful, fast, and interactive.

## Tech Stack

Use **Astro 5** with the Starlight docs theme as the foundation. This gives us:
- Static site generation (SSG) for speed
- Built-in search (Pagefind)
- Sidebar navigation
- Dark/light mode
- MDX support
- Mobile responsive

### Dependencies
- astro@5.x
- @astrojs/starlight
- @astrojs/tailwind (for custom styling beyond Starlight defaults)
- @astrojs/vercel (deployment adapter)
- sharp (image optimization)

## Directory Structure

Initialize the Astro project INSIDE `docs.repairops.app/`:

```
docs.repairops.app/
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── tailwind.config.mjs
├── public/
│   ├── favicon.svg              # RepairOps wrench/gear icon
│   └── og-image.png             # Social share image (generate a simple branded one)
├── src/
│   ├── assets/
│   │   └── logo.svg             # RepairOps logo (create a clean SVG: wrench + circuit board motif)
│   ├── content/
│   │   └── docs/                # Move all existing .md files here, preserving directory structure
│   │       ├── index.mdx        # Convert from index.md — add hero component
│   │       ├── getting-started/
│   │       ├── user-guide/
│   │       ├── features/
│   │       ├── admin/
│   │       ├── developer/
│   │       └── reference/       # Generate these files (see below)
│   ├── components/              # Custom Astro/React components
│   │   ├── FeatureCard.astro
│   │   ├── TierBadge.astro
│   │   ├── InteractiveStateMachine.astro
│   │   ├── KeyboardShortcutTable.astro
│   │   └── CopyableCodeBlock.astro
│   └── styles/
│       └── custom.css           # Brand overrides
└── vercel.json
```

## Branding & Design

### Colors (CSS custom properties in custom.css)
```css
:root {
  /* RepairOps brand */
  --ro-primary: #2563eb;        /* Electric blue */
  --ro-primary-dark: #1d4ed8;
  --ro-accent: #06b6d4;         /* Cyan accent */
  --ro-success: #10b981;
  --ro-warning: #f59e0b;
  --ro-danger: #ef4444;
  --ro-surface: #f8fafc;
  --ro-surface-dark: #0f172a;
}
```

### Typography
- Headings: Inter (or system font stack)
- Body: Inter
- Code: JetBrains Mono (or Fira Code)

### Visual Identity
- Clean, techy aesthetic — think Linear docs meets Stripe docs
- Subtle gradient backgrounds on hero sections
- Rounded corners (8px), soft shadows
- Icons from Lucide (already available in Starlight)
- Tier badges: Blue (Starter), Purple (Pro), Gold (Enterprise)

## Site Configuration (astro.config.mjs)

```javascript
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://docs.repairops.app',
  adapter: vercel(),
  integrations: [
    starlight({
      title: 'RepairOps Docs',
      logo: {
        src: './src/assets/logo.svg',
        replacesTitle: false,
      },
      social: {
        github: 'https://github.com/repairops',
      },
      customCss: ['./src/styles/custom.css'],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Quick Start Guide', slug: 'getting-started/quick-start' },
            { label: 'Your First Ticket', slug: 'getting-started/your-first-ticket' },
            { label: 'Team Setup & Roles', slug: 'getting-started/team-setup' },
            { label: 'Plans & Billing', slug: 'getting-started/plans-and-billing' },
          ],
        },
        {
          label: 'User Guide',
          items: [
            { label: 'Overview', slug: 'user-guide' },
            { label: 'Front Desk', slug: 'user-guide/front-desk' },
            { label: 'Technician', slug: 'user-guide/technician' },
            { label: 'Manager', slug: 'user-guide/manager' },
            { label: 'Customer Portal', slug: 'user-guide/customer-portal' },
          ],
        },
        {
          label: 'Features',
          items: [
            { label: 'Overview', slug: 'features' },
            { label: 'Knowledge Base + AI Chat', slug: 'features/knowledge-base' },
            { label: 'System Builder', slug: 'features/system-builder' },
            { label: 'AI Gateway', slug: 'features/ai-gateway' },
            { label: 'POS Terminal', slug: 'features/pos-terminal' },
            { label: 'Analytics & KPIs', slug: 'features/analytics' },
            { label: 'Plugins & Marketplace', slug: 'features/plugins' },
            { label: 'iFixit Repair Guides', slug: 'features/ifixit-guides' },
          ],
        },
        {
          label: 'Admin Guide',
          items: [
            { label: 'Overview', slug: 'admin' },
            { label: 'Billing & Subscriptions', slug: 'admin/billing' },
            { label: 'SSO / SAML', slug: 'admin/sso' },
            { label: 'White-Label Branding', slug: 'admin/branding' },
            { label: 'Backups & Exports', slug: 'admin/backups' },
            { label: 'Security', slug: 'admin/security' },
          ],
        },
        {
          label: 'Developer',
          items: [
            { label: 'Overview', slug: 'developer' },
            { label: 'REST API Reference', slug: 'developer/api-reference' },
            { label: 'Plugin SDK', slug: 'developer/plugin-sdk' },
            { label: 'Self-Hosted Deployment', slug: 'developer/self-hosted' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Ticket State Machine', slug: 'reference/state-machine' },
            { label: 'Feature Matrix', slug: 'reference/feature-matrix' },
            { label: 'Role Permissions', slug: 'reference/permissions' },
            { label: 'Keyboard Shortcuts', slug: 'reference/shortcuts' },
            { label: 'Glossary', slug: 'reference/glossary' },
          ],
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/repairops/docs/edit/main/',
      },
      lastUpdated: true,
      pagination: true,
    }),
    tailwind({ applyBaseStyles: false }),
  ],
});
```

## Content Migration Rules

1. **Move** all existing `.md` files from their current locations into `src/content/docs/`, preserving the directory structure.
2. **Add Starlight frontmatter** to every `.md` file:
   ```yaml
   ---
   title: "Page Title"
   description: "One-line description for SEO and sidebar"
   sidebar:
     order: 1  # Sort order within section
   ---
   ```
3. **Convert `index.md` to `index.mdx`** — use Starlight's `<Card>` and `<CardGrid>` components for the homepage:
   ```mdx
   import { Card, CardGrid } from '@astrojs/starlight/components';

   <CardGrid>
     <Card title="Quick Start" icon="rocket">
       Set up your account and onboard your shop in 15 minutes.
     </Card>
     ...
   </CardGrid>
   ```
4. **Fix all internal links** — change `./getting-started/quick-start.md` to `/getting-started/quick-start/` (Astro slug format).
5. **Add tier badges** where features mention Starter/Pro/Enterprise. Use a custom `<TierBadge tier="pro" />` component that renders a colored pill.

## Reference Pages to Generate

The `reference/` directory is empty. Generate these pages from the existing codebase:

### reference/state-machine.md
Source: `docs/STATE_MACHINE.md` in the RepairOps repo.
Include the Mermaid state diagram (Starlight supports Mermaid via `@astrojs/starlight-mermaid` or a remark plugin). Show the full transition table and permission matrix in clean, styled tables.

### reference/feature-matrix.md
Source: `docs/FEATURE_MATRIX.md` in the RepairOps repo.
Create an interactive comparison table showing Starter vs Pro vs Enterprise. Use checkmarks (✓), dashes (—), and specific limits. Group by category. Include the AI add-on pricing table.

### reference/permissions.md
Generate from the permission matrix in `docs/STATE_MACHINE.md`.
Format as a clear role × action matrix table with ✓/✗ markers.

### reference/shortcuts.md
Generate a keyboard shortcuts reference page. Include common shortcuts for:
- Kanban navigation (arrows, enter, escape)
- Search (Cmd/Ctrl+K)
- New ticket (Cmd/Ctrl+N)
- Quick filters (1-9 for status columns)
- Diagnostics workspace (save, next step, attach photo)

### reference/glossary.md
Generate a glossary of RepairOps-specific terms: ticket statuses (INTAKE through CLOSED), roles (OWNER, MANAGER, TECH, etc.), features (RLS, BYOK, managed credits, etc.), and common abbreviations (QC, POS, KPI, SSO, SAML, etc.).

## Interactive Components

Build these custom Astro components to make the docs feel alive:

### 1. Interactive State Machine (`InteractiveStateMachine.astro`)
- Render the Mermaid state diagram
- On hover/click of a status node, show: description, allowed transitions out, required gate conditions, and permitted roles
- Use CSS transitions for smooth highlighting

### 2. Feature Comparison Table (`FeatureCompare.astro`)
- Three-column layout (Starter / Pro / Enterprise)
- Sticky header row
- Alternating row colors
- Expandable rows for detailed feature descriptions
- "Current Plan" highlight if viewer's tier is known (future: pass via query param)

### 3. API Playground (`ApiPlayground.astro`) — developer section only
- Show example curl commands with copy buttons
- Tabbed view: curl / JavaScript / Python
- Syntax-highlighted code blocks
- Response preview panel

### 4. Tier Badge (`TierBadge.astro`)
- Inline pill component: `<TierBadge tier="pro" />`
- Colors: Starter=blue, Pro=purple, Enterprise=gold
- Used throughout docs to mark feature availability

### 5. Callout Boxes
Use Starlight's built-in `<Aside>` components:
- `<Aside type="tip">` — green, helpful hints
- `<Aside type="caution">` — yellow, watch out
- `<Aside type="danger">` — red, destructive actions
- `<Aside type="note">` — blue, extra info

## Search

Starlight includes Pagefind by default. Configure it to:
- Index all doc pages
- Boost getting-started pages in results
- Show breadcrumb paths in search results
- Open with Cmd/Ctrl+K

## Deployment

### vercel.json
```json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "redirects": [
    { "source": "/docs/(.*)", "destination": "/$1", "permanent": true }
  ]
}
```

## Quality Checklist

After building, verify:
- [ ] `npm run build` completes with zero errors
- [ ] All 28+ pages render correctly
- [ ] Sidebar navigation works with correct hierarchy
- [ ] Search (Pagefind) indexes all pages and returns results
- [ ] Dark mode toggle works and looks good
- [ ] Mobile responsive at 375px, 768px, 1024px breakpoints
- [ ] Internal links all resolve (no 404s)
- [ ] Mermaid diagrams render in state-machine page
- [ ] Code blocks have syntax highlighting and copy buttons
- [ ] Page load time < 1s on Lighthouse
- [ ] Meta tags (title, description, og:image) on every page

## Implementation Order

1. Initialize Astro + Starlight project in `docs.repairops.app/`
2. Configure `astro.config.mjs` with sidebar and branding
3. Move existing markdown into `src/content/docs/`
4. Add frontmatter to all pages
5. Fix internal links
6. Convert homepage to MDX with Card components
7. Generate the 5 reference pages
8. Build custom components (TierBadge, InteractiveStateMachine, etc.)
9. Add custom CSS for branding
10. Create logo SVG and favicon
11. Test build, fix any issues
12. Deploy to Vercel
```

---

## Prompt 2 — Gemini CLI

```
# Build RepairOps Documentation Site

## Context
I need you to build a production-ready documentation website for RepairOps, a multi-tenant repair shop management SaaS. The site will live at docs.repairops.app.

All markdown content (28 files, ~9,150 lines) already exists in `docs.repairops.app/`. Your job is to create the site framework, ingest the content, and deliver a polished, interactive docs experience.

## Tech Decision
Use **Astro 5 + Starlight** (the official Astro docs theme). It gives us static generation, built-in Pagefind search, dark/light mode, sidebar navigation, and MDX support out of the box. Deploy target is Vercel.

## What Exists (Content)
```
docs.repairops.app/
├── index.md                     # Landing page
├── getting-started/             # 4 guides: quick-start, your-first-ticket, team-setup, plans-and-billing
├── user-guide/                  # 5 guides: index, front-desk, technician, manager, customer-portal
├── features/                    # 8 pages: index, knowledge-base, system-builder, ai-gateway, pos-terminal, analytics, plugins, ifixit-guides
├── admin/                       # 6 pages: index, billing, sso, branding, backups, security
├── developer/                   # 4 pages: index, api-reference, plugin-sdk, self-hosted
└── reference/                   # EMPTY — you need to generate 5 pages here
```

## What You Need to Build

### 1. Astro + Starlight Scaffold
Initialize the project inside `docs.repairops.app/`. Install dependencies:
- astro@5, @astrojs/starlight, @astrojs/tailwind, @astrojs/vercel, sharp

### 2. Sidebar Configuration
6 sections matching the directory structure. Each section has ordered child pages. See the directory listing above for the complete page list.

### 3. Content Migration
- Move all `.md` files to `src/content/docs/`, preserving directories
- Add Starlight frontmatter to every file: `title`, `description`, `sidebar.order`
- Convert `index.md` to `index.mdx` — use Starlight's `<Card>` and `<CardGrid>` for a visual landing page
- Fix all internal links from `./path/file.md` format to `/path/file/` (Astro slug format)

### 4. Generate Reference Pages
The `reference/` directory is empty. Create 5 new pages:

**reference/state-machine.md** — Ticket lifecycle visualization. Include:
- A Mermaid stateDiagram-v2 with 13 statuses (INTAKE → TRIAGE → DIAGNOSTICS → WAITING_APPROVAL → APPROVED → WAITING_ON_PARTS → IN_REPAIR → QC_REVIEW → QC_FAILED → READY_FOR_PICKUP → PICKED_UP → CLOSED, plus VOIDED from any state)
- Transition permission matrix table (roles × target statuses)
- Gate requirements table (what fields must be filled before leaving gated statuses)

**reference/feature-matrix.md** — Tier comparison. Three plans:
- Starter ($49/mo): 150 tickets/mo, 3 users, 1 shop, core workflow, KB, System Builder
- Pro ($99/mo): Unlimited tickets, 15 users, 5 shops, AI Gateway, plugins, analytics, multi-shop
- Enterprise ($199/mo): Unlimited everything, SSO, white-label, self-hosted AI, REST API
- AI add-ons: AI Ready ($79, BYOK), AI Assist ($79, 200 credits), AI Copilot ($149, 500 credits)

**reference/permissions.md** — Role × action matrix for: OWNER, MANAGER, FRONT_DESK, TECH, QC, ACCOUNTING, DISPATCHER

**reference/shortcuts.md** — Keyboard shortcuts (Cmd/Ctrl+K for search, Cmd/Ctrl+N for new ticket, arrow navigation for Kanban, number keys for column filters, etc.)

**reference/glossary.md** — Terms: all 13 ticket statuses, all 7 roles, key features (RLS, BYOK, RAG, SSO, SAML, etc.)

### 5. Custom Components
Build these Astro components for interactivity:

- **TierBadge.astro** — Inline colored pill showing Starter (blue), Pro (purple), or Enterprise (gold). Usage: `<TierBadge tier="pro" />`
- **InteractiveStateMachine.astro** — Mermaid diagram with hover tooltips showing transition details
- **FeatureCompare.astro** — Three-column comparison table with sticky headers, expandable rows, checkmarks
- **ApiPlayground.astro** — Tabbed code examples (curl/JS/Python) with copy buttons, for the developer section

### 6. Branding
- Primary: #2563eb (electric blue), Accent: #06b6d4 (cyan)
- Font stack: Inter for text, JetBrains Mono for code
- Clean, modern aesthetic — think Linear/Stripe docs
- Create a simple SVG logo (wrench + circuit board motif, or just clean text logo)
- Tier badge colors: Starter=blue, Pro=purple, Enterprise=gold

### 7. Deployment Config
Create `vercel.json` with:
- Framework: astro
- Security headers (X-Frame-Options: DENY, X-Content-Type-Options: nosniff)
- Redirect `/docs/*` → `/*`

## Implementation Order
1. `npm create astro@latest` with Starlight template inside `docs.repairops.app/`
2. Configure astro.config.mjs (sidebar, branding, integrations)
3. Move markdown content → `src/content/docs/`
4. Add frontmatter, fix links
5. Convert homepage to MDX with cards
6. Generate 5 reference pages
7. Build custom components
8. Apply brand CSS
9. Create logo + favicon SVGs
10. `npm run build` — fix all errors
11. Test search, navigation, dark mode, mobile
12. Push to repo for Vercel deployment

## Quality Bar
- Zero build errors
- All pages render with correct sidebar placement
- Pagefind search works across all content
- Dark/light mode both look polished
- Mobile responsive (375px+)
- Lighthouse performance > 95
- All internal links resolve
- Mermaid diagrams render
- Code blocks have syntax highlighting + copy buttons
```

---

## Prompt 3 — Codex

```
# Task: Build docs.repairops.app Documentation Site

## Summary
Build an Astro 5 + Starlight documentation site for RepairOps (repair shop management SaaS). All markdown content already exists in `docs.repairops.app/`. Set up the framework, ingest content, add interactive components, and prepare for Vercel deployment.

## Content Inventory
28 markdown files across 6 sections:
- getting-started/ (4 files): quick-start, your-first-ticket, team-setup, plans-and-billing
- user-guide/ (5 files): index, front-desk, technician, manager, customer-portal
- features/ (8 files): index, knowledge-base, system-builder, ai-gateway, pos-terminal, analytics, plugins, ifixit-guides
- admin/ (6 files): index, billing, sso, branding, backups, security
- developer/ (4 files): index, api-reference, plugin-sdk, self-hosted
- reference/ (0 files — generate 5): state-machine, feature-matrix, permissions, shortcuts, glossary
Plus index.md root landing page.

## Stack
- Astro 5 + @astrojs/starlight (docs theme with built-in Pagefind search)
- @astrojs/tailwind (custom brand styling)
- @astrojs/vercel (deployment adapter)
- sharp (image optimization)

## Steps

### Step 1: Initialize Project
Run `npm create astro@latest` with Starlight template inside `docs.repairops.app/`. Do NOT delete existing markdown files — they are the content source.

### Step 2: Configure astro.config.mjs
Set up:
- site: 'https://docs.repairops.app'
- Starlight with 6 sidebar sections (Getting Started, User Guide, Features, Admin Guide, Developer, Reference)
- Each section lists its child pages with labels and slugs
- Custom CSS file for brand colors
- Tailwind integration
- Vercel adapter
- Edit link pointing to GitHub repo
- Last updated timestamps enabled

### Step 3: Migrate Content
- Move all `.md` files into `src/content/docs/`, keeping directory structure
- Add frontmatter to each file:
  ```yaml
  ---
  title: "Page Title"
  description: "SEO description"
  sidebar:
    order: N
  ---
  ```
- Convert root `index.md` to `index.mdx` with Starlight Card/CardGrid components for the landing page
- Update all internal links from `./path/file.md` to `/path/file/`

### Step 4: Generate Reference Pages
Create 5 new files in `src/content/docs/reference/`:

1. **state-machine.md** — Mermaid state diagram showing all 13 ticket statuses and transitions. Include transition permission matrix (7 roles × 13 statuses). Include gate requirements table.

2. **feature-matrix.md** — Three-tier comparison table:
   - Starter ($49): 150 tickets/mo, 3 users, 1 shop
   - Pro ($99): Unlimited tickets, 15 users, 5 shops
   - Enterprise ($199): Unlimited everything
   - AI add-on tiers and credit packs

3. **permissions.md** — Role permissions matrix (OWNER, MANAGER, FRONT_DESK, TECH, QC, ACCOUNTING, DISPATCHER)

4. **shortcuts.md** — Keyboard shortcut reference

5. **glossary.md** — Definitions for ticket statuses, roles, features, abbreviations

### Step 5: Custom Components
Build in `src/components/`:

- **TierBadge.astro** — Colored inline pill (Starter=blue, Pro=purple, Enterprise=gold)
- **InteractiveStateMachine.astro** — Mermaid diagram with hover tooltips
- **FeatureCompare.astro** — Sticky-header comparison table with expandable rows
- **ApiPlayground.astro** — Tabbed code blocks (curl/JS/Python) with copy buttons

### Step 6: Brand Styling
In `src/styles/custom.css`:
- Primary: #2563eb, Accent: #06b6d4
- Fonts: Inter (text), JetBrains Mono (code)
- Override Starlight defaults for a clean, techy look (rounded corners, soft shadows, gradient hero)

### Step 7: Assets
- Create SVG logo (clean text "RepairOps" with a subtle wrench/gear icon)
- Create SVG favicon
- Create OG image (1200×630, branded)

### Step 8: Deployment
Create `vercel.json`:
```json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" }
      ]
    }
  ]
}
```

### Step 9: Verify
- `npm run build` — zero errors
- All 33 pages render (28 existing + 5 generated reference pages)
- Sidebar navigation correct
- Search works (Pagefind)
- Dark/light mode polished
- Mobile responsive
- All internal links resolve
- Code blocks have syntax highlighting + copy
- Mermaid diagrams render on state-machine page

## Design Direction
Modern, techy, easy to scan. Think Linear docs or Stripe docs:
- Clean whitespace, generous padding
- Subtle gradients on hero sections
- Smooth transitions and hover effects
- Tier badges throughout (blue/purple/gold pills)
- Interactive state machine diagram
- Comparison tables with expandable detail rows
- API playground with language tabs
```

---

## Quick Reference: Key Data for All Prompts

### Ticket Statuses (13)
INTAKE → TRIAGE → DIAGNOSTICS → WAITING_APPROVAL → APPROVED → WAITING_ON_PARTS → IN_REPAIR → QC_REVIEW → QC_FAILED → READY_FOR_PICKUP → PICKED_UP → CLOSED + VOIDED

### Roles (7)
OWNER, MANAGER, FRONT_DESK, TECH, QC, ACCOUNTING, DISPATCHER

### Plans (3)
- Starter: $49/mo, 150 tickets, 3 users, 1 shop
- Pro: $99/mo, unlimited tickets, 15 users, 5 shops
- Enterprise: $199/mo, unlimited everything

### AI Add-Ons (4)
- AI Ready: $79/mo (BYOK only)
- AI Assist: $79/mo (200 managed credits)
- AI Copilot: $149/mo (500 managed credits)
- Enterprise AI: included with Enterprise tier

### Credit Packs
- 100 credits / $15
- 500 credits / $60
- 1,000 credits / $100
