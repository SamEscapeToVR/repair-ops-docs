# SaaS ↔ Docs Alignment Report

**Audit date:** 2026-06-12
**Docs repo:** `SamEscapeToVR/repair-ops-docs` (branch `docs/align-with-current-saas-codebase`)
**SaaS source of truth:** `SamEscapeToVR/repair-ops-saas` (local working copy on `main`, latest commit `afea4f85`)

---

## 1. Executive Summary

The public documentation site (Astro + Starlight, `docs.repairops.app`) had **drifted to a
materially older version of the product**. Two systemic problems dominated, plus a fabricated
developer surface:

1. **The site predated the Business tier and the 2026-05-23 pricing overhaul.** Every page described
   a **3-tier** model (Starter $49 / Pro $99 / Enterprise $199). The real product is **4 tiers**
   (Starter $99 / Pro $199 / Business $449 / Enterprise from $1,500), with different limits, AI
   add-on prices, and AI credit costs. The **Business** tier was entirely absent.
2. **The REST API reference was largely fabricated/guessed.** Wrong base domain
   (`api.repairops.io`), wrong tier gate ("Enterprise only" vs the real **Business+**), invented
   scope-based hourly rate limits, a non-existent `@repairops/sdk` client, a non-existent
   `@repairops/plugin-cli`, wrong response/error envelopes, wrong webhook events, undocumented
   endpoint families (devices, webhooks management, plugins, reports/usage), and an
   inventory `PATCH` endpoint that does not exist.
3. Smaller but real contract drift: the state machine documented **13 statuses** (real **14** —
   `UNCLAIMED` was missing), the plugin SDK listed **14 capabilities** (real **26**, with wrong
   names), and the self-hosted guide described a fabricated Docker stack
   (MinIO/Redis/`github.com/repairops/docker-compose`) instead of the real self-hosted-Supabase +
   Caddy stack.

All of the above were corrected against code. The site builds cleanly (50 pages) and the rendered
output was verified.

**Highest-risk inaccuracies fixed:** wrong pricing on a **legal** page (Terms of Service), a
fabricated API contract a developer would code against, and a wrong API tier gate (would have told
Business customers the API was unavailable to them).

---

## 2. Repos Inspected

| Repo | Role | Framework / Stack |
|------|------|-------------------|
| `repair-ops-saas` | **Source of truth** — product code | pnpm monorepo: Next.js 15 (App Router) web, pg-boss worker, `@repairops/shared`, Supabase/Postgres, 164 migrations |
| `repair-ops-docs` | Audit + fix target | Astro 5 + Starlight 0.34, TypeScript, Vercel static; npm |

The SaaS source of truth was extracted from code (route handlers, `packages/shared`, migrations,
worker) — not from the SaaS repo's own `docs/` (which had its own stale counts, noted below).

---

## 3. SaaS Source-of-Truth Summary (verified from code)

**Tiers & pricing** — `packages/shared/src/billing.ts`
- Starter $99/mo ($948/yr), Pro $199/mo ($1,908/yr), Business $449/mo ($4,308/yr), Enterprise from
  $1,500/mo (sales-assisted, refused by self-serve checkout). Trial: 14 days + 50 credits.
- Plan limits (work orders / users / locations / SMS / displays / storage / API / webhooks /
  exports) per tier — exact table in the [Feature Matrix](../src/content/docs/reference/feature-matrix.mdx).
- AI add-ons: Disabled $0, **AI Ready $49** (BYOK), AI Assist $79 (200 cr, cap 400), AI Copilot
  $149 (500 cr, cap 1,000, Pro+), Enterprise AI custom (2,000 cr, cap 5,000, Enterprise).
- Credit packs: 100/$15, 500/$60, 1,000/$100.
- Feature tier gates: `rest_api` = **business**, `voice_copilot` = **business**, `customer_export` =
  **business**, `multi_shop` = **business**, `white_label`/`sso_saml`/`self_hosted_ai`/
  `ai_audit_trail` = **enterprise**, `plugin_marketplace`/`pos_terminal`/etc. = **pro**.

**Ticket state machine** — `packages/shared/src/ticket.ts` (LOCKED, v1.0.0)
- 14 statuses, 3 terminal (`CLOSED`, `UNCLAIMED`, `VOIDED`). 7 roles. `UNCLAIMED` is OWNER-only;
  `ACCOUNTING`/`DISPATCHER` have no transition permissions. `PICKED_UP` can only go to `CLOSED`.
- Validation runs in the application layer (graph → role → exit gates → payment gate); the Postgres
  `transition_ticket()` function is a thin atomic writer. Client-facing transition error codes:
  `INVALID_TRANSITION`, `PERMISSION_DENIED`, `GATE_NOT_MET` (plus REST `409 CONFLICT` on
  expected-status mismatch).

**AI Gateway** — `packages/shared/src/ai/task-registry.ts`, `apps/web/src/lib/ai/`
- **16 tasks** (real credit costs 2–25, not the 1–3 the docs claimed). **6 canonical providers**
  (OpenAI, Anthropic, Google, Groq, Mistral, Ollama) + an OpenRouter runtime adapter.

**Plugin SDK** — `@repairops/plugin-sdk` v0.0.1, `packages/shared/src/plugins.ts`
- 26 capability types; manifest schema (id/name/description/version/author/category/capabilities/…);
  base-class authoring model; no runtime sandbox; submission via `POST /api/v1/plugins/submit`
  (admin scope); install OWNER-only and tier-gated.

**Self-hosted** — `docker-compose.yml`, `apps/*/Dockerfile`
- 13-service Compose stack with self-hosted Supabase (db / db-bootstrap / auth / rest / realtime /
  storage / migrate / kong) + web + worker + Caddy + backup. Node 20-alpine, pnpm 9.15.3.

---

## 4. Documentation Site Structure

49 content pages across 8 sidebar sections (Getting Started, User Guide, Features, Reports, Admin,
Developer, Reference, Legal), 9 custom Astro components, sidebar defined in `astro.config.mjs`.
No test/lint/link-check tooling is configured; `npm run build` is the only quality gate.

---

## 5. API Inventory Summary (corrected)

16 public `/api/v1/*` routes, key-authenticated (`Authorization: Bearer ro_live_<64hex>`), gated at
**Business+**, `{ ok, data, meta }` / `{ ok:false, error:{code,message} }` envelope, offset
pagination (`page`/`per_page`), per-key sliding-window rate limit (100/min default, 1,000/min
Enterprise; `Retry-After: 60`).

| Resource | Methods |
|----------|---------|
| `/tickets` | GET, POST |
| `/tickets/:id` | GET, PATCH (status changes excluded) |
| `/tickets/:id/transition` | POST |
| `/customers` | GET, POST |
| `/customers/:id` | GET (read-only) |
| `/devices` | GET, POST |
| `/devices/:id` | GET (read-only) |
| `/inventory`, `/inventory/:id` | GET only (read-only) |
| `/reports/kpis`, `/reports/usage` | GET |
| `/webhooks` | GET, POST (admin) |
| `/webhooks/:id` | DELETE (admin) |
| `/plugins/submit` | POST (admin) |
| `/plugins/submissions`, `/submissions/:id` | GET |

Webhooks: 10 subscribable event types, but **only the 4 `ticket.*` events are currently delivered**
(the other 6 are reserved). HMAC-SHA256 signature in `X-RepairOps-Signature`; 3 attempts (5s/30s/2m).

---

## 6. Major Mismatches Found (classified)

| # | Type | Doc said | Code reality |
|---|------|----------|--------------|
| 1 | Feature status / pricing | 3 tiers, $49/$99/$199 | 4 tiers, $99/$199/$449/$1,500+ |
| 2 | Auth/permission mismatch | REST API "Enterprise only" | Business+ |
| 3 | Path mismatch | base URL `api.repairops.io/v1`; KPI at `/kpis` | `app.repairops.app/api/v1`; `/reports/kpis` |
| 4 | Present in docs, not in code | `@repairops/sdk`, `@repairops/plugin-cli`, `@repairops/ui`; `PATCH /inventory/:id` | none exist; inventory is read-only |
| 5 | Missing from docs | `/devices/*`, `/webhooks/*` mgmt, `/plugins/*`, `/reports/usage` | exist |
| 6 | Response schema mismatch | `{ data, pagination:{offset,limit,total} }`; transition `{from_status,to_status}` | `{ ok, data, meta:{page,perPage,total} }`; transition `{from,to,event_id,outbox_id}` |
| 7 | Auth scheme mismatch | `Bearer YOUR_API_KEY`; rate limits 1000/100/10 per hour by scope | `Bearer ro_live_…`; 100/min per key |
| 8 | Error handling mismatch | webhook events `payment.processed`, `inventory.updated`; retry "5 attempts up to 24h" | real enum (10), `payment.received`/`inventory.low_stock`; 3 attempts 5s/30s/2m |
| 9 | Terminology / count | 13 statuses; 14 capability types; 5 roles (security page) | 14 statuses (+UNCLAIMED); 26 capabilities; 7 roles |
| 10 | AI mismatch | AI Ready $79; credit costs 1–3; Manager Insights = Pro | AI Ready $49; costs 2–25; Manager Insights = Business |
| 11 | Deployment mismatch | MinIO + Redis + `github.com/repairops/docker-compose`; `migrate:prod` | self-hosted Supabase + Caddy, 13-service compose, one-shot `migrate` |
| 12 | Domain/terminology | `repairops.io` help/support/community, `api.repairops.io` | `repairops.app`, `docs.`/`community.repairops.app`, `app.repairops.app` |

---

## 7. Files Changed

**Components / styles (4):**
- `src/components/FeatureCompare.astro` — added a 4th (Business) column + header price fixes
- `src/components/TierBadge.astro` — added `business` tier variant
- `src/components/InteractiveStateMachine.astro` — added the `UNCLAIMED` node + transition
- `src/styles/custom.css` — added `--tier-business` color + `.tier-badge--business`

**Content (20):**
- Developer: `developer/api-reference.mdx` (full rewrite), `developer/index.md` (full rewrite),
  `developer/plugin-sdk.md` (full rewrite), `developer/self-hosted.md` (full rewrite)
- Pricing: `reference/feature-matrix.mdx` (full rewrite), `getting-started/plans-and-billing.md`
  (full rewrite), `admin/billing.md` (tables), `features/ai-gateway.mdx` (full rewrite)
- Contract: `reference/state-machine.mdx`, `reference/permissions.md`, `reference/glossary.md`
- Features/overview: `features/index.mdx`, `features/plugins.mdx`, `index.mdx`
- Admin: `admin/security.md`, `admin/sso.md`, `admin/backups.md`, `admin/branding.md`,
  `admin/index.md`
- Legal: `legal/terms-of-service.md` (pricing + AI add-on tables)

---

## 8. Remaining Uncertainties (traceable to source)

- **Self-hosted dollar amounts** ($1,990/yr self-service, $399/mo supported, etc.) are **not in
  code** — they live only in Stripe price config (`packages/shared/src/self-host-billing.ts` defines
  packages, not prices). The docs describe packages without asserting these dollar figures; verify
  against live Stripe before publishing any self-host price.
- **"Enterprise Private Cloud" tier** has no code package — fully sales-assisted.
- **Feature-level permission matrices** in `reference/permissions.md` (beyond the ticket-transition
  matrix) are operational guidance, not all individually code-verified. The page now states this
  explicitly; the ticket-transition matrix is the contract-backed part.
- **SSO callback/entity-ID example URLs** in `admin/sso.md` were corrected to `repairops.app` but the
  exact `/sso/...` path structure was not verified against routes — they remain illustrative
  placeholders (`[your-org]`).
- **OpenRouter** is registered in the AI provider runtime but is not in the canonical
  `AIProviderSlug` type; documented as an "additional routing option."
- **`pos-terminal.mdx`** links "Inventory Management" to `/features/system-builder/` (a mislabeled
  internal link) — left as-is; low priority.

---

## 9. Recommended Follow-Up

1. **Self-host pricing:** confirm the four self-host package prices against live Stripe and add a
   verified price table to `developer/self-hosted.md` / `getting-started/plans-and-billing.md`.
2. **Audit the remaining descriptive pages** not deeply changed in this pass (`user-guide/*`,
   `features/pos-terminal.mdx`, `features/analytics.mdx`, `features/knowledge-base.md`,
   `features/system-builder.md`, `features/tagging.md`, `getting-started/quick-start.md`,
   `getting-started/team-setup.md`) for screenshot/terminology drift.
3. **Add a docs freshness CI check** (e.g., a script that diffs `billing.ts` price/limit constants
   and the `ticket.ts` status count against the docs, plus a Markdown link-checker — Starlight does
   not fail the build on broken internal links by default).
4. **Generate the API reference from code** where possible (the ticket serializer already references
   a published API-reference path — consider a single OpenAPI source).
5. The SaaS repo's own counts are stale too (`CLAUDE.md`/`BUILD_PLAN.md` say 148/60 migrations, 20
   worker jobs; real: 164 migrations, 36 job files, 52 cron schedules) — refresh those separately.

---

## 10. Verification Commands Run

| Command | Result |
|---------|--------|
| `git clone … repair-ops-docs` + `git checkout -b docs/align-with-current-saas-codebase` | OK |
| `npm install` (docs repo) | OK (exit 0) |
| `npm run build` (docs repo) | **OK — 50 pages built, no errors**; Pagefind indexed 49 pages |
| Rendered-HTML checks on `dist/` | Feature matrix shows 4 tier headers + prices ($99/$199/$449/From $1,500); state machine renders `UNCLAIMED`; API reference renders `app.repairops.app/api/v1` + `ro_live_`; **no** `api.repairops.io` / `@repairops/sdk` / `repairops.io` in any built page |
| `rg`/`grep` sweeps over `src/content/docs` | Confirmed removal of fabricated domains/SDK, 3-tier framing, "13 statuses" |

SaaS-side verification was via direct code inspection and ripgrep (route handlers, `packages/shared`,
migrations, worker) by five parallel investigation passes; their raw findings are summarized in §3–§6.

## 11. Commands That Failed

- **Browser preview / screenshot** was not run: the preview MCP server is scoped to the SaaS repo
  working directory, not the docs repo, so it could not launch the docs `astro dev` server. The
  production `npm run build` plus direct `dist/` HTML inspection were used instead and are sufficient
  to confirm compilation and rendering.

No other commands failed.
