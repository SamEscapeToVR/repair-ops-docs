---
title: "Self-Hosted Deployment"
description: "Docker Compose stack for private-cloud deployment"
sidebar:
  order: 4
---

Run the full RepairOps platform on your own infrastructure with Docker Compose. The stack bundles
the web app, the background worker, a complete self-hosted Supabase (Postgres, Auth, Storage,
Realtime, and the Kong gateway), and a Caddy reverse proxy with automatic TLS.

**Available on:** the self-hosted packages (Business and above) and Enterprise. The stack is
delivered to you as a packaged Docker Compose project through the in-app self-host delivery flow —
there is no public download repository.

<img src="/images/screenshots/light/desktop/admin-ops.png" alt="RepairOps Admin Operations panel for self-hosted deployment management" class="screenshot light-only" loading="lazy" />
<img src="/images/screenshots/dark/desktop/admin-ops.png" alt="RepairOps Admin Operations panel for self-hosted deployment management" class="screenshot dark-only" loading="lazy" />

## Architecture

The delivered `docker-compose.yml` runs a single self-contained stack:

| Service | Role |
|---------|------|
| `db` | Supabase Postgres 15 (pgvector, logical WAL) — persistent volume |
| `db-bootstrap` | One-shot: creates roles, passwords, grants, and schema ownership (idempotent; runs on every `up`) |
| `auth` | Supabase Auth (GoTrue) — email, Google OAuth, passkeys |
| `rest` | PostgREST — the Supabase data API |
| `realtime` | Supabase Realtime — powers the live Kanban board |
| `storage` | Supabase Storage — photos, attachments, and signed URLs |
| `migrate` | One-shot: applies all database migrations, then exits |
| `kong` | API gateway in front of the Supabase services |
| `web` | The Next.js app (Next.js standalone server) |
| `worker` | The pg-boss background worker (cron + event jobs) |
| `caddy` | Reverse proxy with automatic TLS |
| `backup` | Scheduled `pg_dump` backups with NAS / S3-compatible offsite hooks |
| `backup-verify` | On-demand backup integrity check (tools profile) |

A **closed-runtime** variant (`deploy/self-host/docker-compose.closed-runtime.yml`) runs the same
topology from prebuilt images instead of building from source.

### Startup order

The stack enforces dependencies so it comes up cleanly: **`db` → `db-bootstrap` → Supabase services
(`auth`, `rest`, `realtime`, `storage`) → `migrate` → `web` + `worker` + `kong` + `caddy`**. The
`db-bootstrap` and `migrate` services are one-shot containers that run to completion before the app
starts.

## Prerequisites

- **Docker & Docker Compose v2** (`docker compose`, not the legacy `docker-compose`)
- **Server:** 4 CPU / 8 GB RAM minimum (more for production load); SSD storage recommended
- **OS:** Linux (Ubuntu 22.04+ recommended)
- **Domain + DNS** pointing at the server (Caddy provisions TLS automatically)
- **Node/pnpm** are only needed if you build images from source — the runtime is fully containerized
  (`node:20-alpine`, pnpm 9.15.3)

## Quick Start

The delivered package includes a `.env.production.example`. From the project directory:

```bash
cp .env.production.example .env.production
# edit .env.production — fill in the required values below
docker compose up -d
```

Then watch it come up:

```bash
docker compose logs -f web worker
```

Once healthy, the app is served by Caddy. Check health with:

```bash
curl https://your-domain.example.com/api/health
```

## Environment Reference

Configure everything in `.env.production`. The variables that must be set for a self-hosted
deployment:

| Variable | Purpose |
|----------|---------|
| `POSTGRES_PASSWORD` | Database superuser password |
| `JWT_SECRET` | Supabase JWT signing secret |
| `ANON_KEY` | Supabase anon (public) key, signed with `JWT_SECRET` |
| `SERVICE_ROLE_KEY` | Supabase service-role key (server-side admin key — keep secret) |
| `REALTIME_SECRET_KEY_BASE` | Secret for the Realtime service |
| `SITE_URL` / `API_EXTERNAL_URL` | Public URL of your deployment |
| `NEXT_PUBLIC_SUPABASE_URL` | Public Supabase gateway URL (Kong) |
| `DATABASE_URL` | Postgres connection string for the worker (the worker **fails to start** without it) |
| `REPAIROPS_DATA_KEY_B64` | 32-byte base64 data key for envelope encryption of stored secrets (any secret operation **throws** without it) |

### Optional / feature-dependent

| Variable | When to set |
|----------|-------------|
| `RATE_LIMIT_SINGLE_INSTANCE=true` | Single-container deployment with no Upstash Redis — uses the in-memory rate limiter. **Never set this when running multiple web replicas.** |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` | Multi-instance deployments that need a shared rate-limit backend |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_*` | Only if you run billing/checkout on the self-hosted instance |
| `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GOOGLE_AI_API_KEY`, `GROQ_API_KEY`, `MISTRAL_API_KEY`, `OLLAMA_BASE_URL` | Managed AI providers you intend to use (BYOK keys are stored per-org, not as env) |
| `EMAIL_PROVIDER` (+ Postmark/SendGrid/SMTP creds), `TWILIO_AUTH_TOKEN`, `RINGCENTRAL_WEBHOOK_SECRET` | Email/SMS/voice features |

:::note
Set every security-critical secret before going live. Some integrations are disabled and some
endpoints are rejected if their required secret is missing, so the deployment is secure by default.
The `.env.production.example` lists each setting; the delivery package's operator guide covers
advanced networking options.
:::

## TLS & Reverse Proxy

TLS is handled by the bundled **Caddy** service, which provisions and renews certificates
automatically — you do not write your own Nginx config. Point your domain's DNS at the server and
ensure ports 80/443 are reachable; Caddy proxies to the web container internally.

## Database & Migrations

You do not run migrations by hand. The one-shot `migrate` container applies every migration from the
delivered `supabase/migrations/` directory on startup (after `db-bootstrap` has created roles and
grants), then exits. The web and worker containers wait for it to complete before starting.

pgvector (used for KB Chat embeddings) is enabled as part of the Postgres image and bootstrap — no
manual `CREATE EXTENSION` step is required.

## Storage

Photos, attachments, and signed download URLs are served by the bundled **Supabase Storage** service
backed by a persistent volume — there is no separate object-storage service to run.

## Backups

The `backup` service runs a scheduled `pg_dump` (default daily at 02:00) of the application schemas
with configurable retention. It can copy backups offsite via:

- **NAS** — set `NAS_BACKUP_ENABLED=true` and `NAS_BACKUP_PATH`
- **S3-compatible (DigitalOcean Spaces)** — set `DO_SPACES_KEY` / `DO_SPACES_SECRET` /
  `DO_SPACES_BUCKET` (+ region/endpoint)

The package includes helper scripts (`backup-to-nas.sh`, `backup-to-spaces.sh`,
`check-backup-coverage.mjs`) and an on-demand `backup-verify` container that checks dump integrity.
Run a restore rehearsal periodically — see the backup/restore support guide in your delivery package.

## Health & Monitoring

- **Health endpoint:** `GET /api/health` (used by the container healthcheck).
- **Optional health reporting:** supported self-hosted plans include an optional health-reporting
  agent (disabled by default) so your support contact can help monitor uptime. See your delivery
  package's operator guide for setup.

## Updating

Updates are delivered as new package versions or images. With the closed-runtime variant:

```bash
docker compose pull
docker compose up -d
```

The package's `upgrade.sh` and `rollback.sh` / `rollback-image.sh` scripts wrap the update and
rollback flows, including running the one-shot `migrate` container for any new migrations.

## Security Checklist

- [ ] Set strong values for `POSTGRES_PASSWORD`, `JWT_SECRET`, `ANON_KEY`, `SERVICE_ROLE_KEY`, and `REPAIROPS_DATA_KEY_B64`
- [ ] Restrict the firewall to ports 80/443 (the app and Supabase services bind to localhost behind Caddy)
- [ ] Confirm TLS is issued by Caddy and HTTP redirects to HTTPS
- [ ] Configure and verify automated backups (and offsite copies)
- [ ] Keep the secure-by-default network settings unless your operator guide says otherwise
- [ ] Keep Docker and the host OS patched
- [ ] Rotate `REPAIROPS_DATA_KEY_B64` via the key-ring variables when needed

## Support

- **Documentation:** [docs.repairops.app](https://docs.repairops.app)
- **Self-hosted support** is included with the supported and Business self-hosted packages and with
  Enterprise — contact your account or support channel for upgrade and migration assistance.
