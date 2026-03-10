---
title: "Plans & Billing"
description: "Compare tiers, manage credits, and upgrade your plan"
sidebar:
  order: 4
---

Understand how RepairOps pricing works, which limits are enforced at each tier, and how AI add-ons fit into the base subscription.

## Plan Snapshot

| Plan | Monthly | Annual | Best For | Core Limits |
|------|---------|--------|----------|-------------|
| **Starter** | $49 | $470 | Single-shop teams getting started | 150 work orders/mo, 3 users, 1 shop, 100 SMS/mo |
| **Pro** | $99 | $950 | Growing shops running multiple locations | Unlimited work orders, 15 users, 5 shops, 500 SMS/mo |
| **Enterprise** | $199 | $1,910 | Franchises, compliance-heavy orgs, large operations | Unlimited everything |

All self-serve plans include the full repair workflow, customer portal, notifications, and a 14-day trial. Trial organizations receive 50 AI credits to evaluate AI-powered workflows.

## What Each Tier Unlocks

### Starter

Starter covers the full day-to-day repair flow:

- Intake, triage, diagnostics, quoting, approval, repair, QC, pickup, and invoicing
- Customer portal and status tracking
- Inventory, service catalog, CSV import/export, and PCRT migration
- Knowledge Base articles, System Builder manual mode, and iFixit guide access
- Free plugins such as label printing and core operational tools

### Pro

Pro adds scale and operational automation:

- Up to 5 shops and 15 team members
- Advanced analytics, AI weekly insights, and voice-to-text workflows
- Multi-shop operations and 1 shop-floor display
- Plugin Marketplace access plus POS Terminal, Time Clock, Appointment Booking, Google Reviews, Customer Export, and Status Widget Pro

### Enterprise

Enterprise adds platform and compliance features:

- Unlimited users, shops, SMS, and displays
- White-label branding and custom domain support
- REST API with scoped API keys
- SSO / SAML
- Self-hosted AI via Ollama, fallback chains, and AI audit exports
- Backup, export, and compliance-friendly operational controls

## Metered Limits

These limits are enforced in product code and at the database boundary. When you hit a hard quota, the relevant action is blocked until your billing period resets or you upgrade.

| Resource | Starter | Pro | Enterprise |
|----------|---------|-----|------------|
| Work orders / month | 150 | Unlimited | Unlimited |
| Users | 3 | 15 | Unlimited |
| Shops | 1 | 5 | Unlimited |
| SMS / month | 100 | 500 | Unlimited |
| Shop displays | 0 | 1 | Unlimited |

Notes:

- Work-order limits reset with your billing cycle, not the calendar month.
- User and shop limits are hard caps. Existing records remain, but creating new ones is blocked.
- SMS quotas are also hard-capped. When you run out, RepairOps stops sending outbound texts until the next cycle or an upgrade.

## AI Add-Ons

Base plans do **not** include monthly managed AI credits. AI is enabled through a separate AI add-on.

| Add-On | Monthly Price | Mode | Included Managed Credits | Best For |
|--------|---------------|------|--------------------------|----------|
| **Disabled** | $0 | Off | 0 | Teams not using AI |
| **AI Ready** | $79 | BYOK | 0 | Teams bringing their own provider keys |
| **AI Assist** | $79 | Managed | 200 | Intake parsing, note cleanup, customer summaries, KB search |
| **AI Copilot** | $149 | Managed | 500 | Full AI task coverage including diagnostics, QC, and voice |
| **Enterprise AI** | Included with Enterprise | BYOK + Managed | Unlimited | Enterprise orgs needing self-hosted, failover, and audit controls |

Starter organizations can use selected AI-powered workflows with an add-on enabled. Pro unlocks the full AI Gateway control surface and advanced AI task coverage. Enterprise adds self-hosted routing, fallback chains, and compliance exports.

## Credit Packs

If your managed AI credits run out, you can buy top-up packs:

| Pack | Credits | Price |
|------|---------|-------|
| Small | 100 | $15 |
| Medium | 500 | $60 |
| Large | 1,000 | $100 |

Purchased credits are non-refundable and expire after 12 months of inactivity. Monthly included credits from AI Assist or AI Copilot do **not** roll over.

## Example AI Task Costs

Managed credit usage is tied to the specific task:

| Task | Credits |
|------|---------|
| Intake parse | 1 |
| Note cleanup | 1 |
| Customer summary | 2 |
| KB search / KB chat completion | 1 |
| Diagnostics assist | 2 |
| QC check | 2 |
| Voice-to-text | 3 |
| Manager insights | 3 |

## Trial, Billing Cycle, and Proration

### Trial

- 14-day free trial
- 50 trial AI credits
- No contract required to start

### Monthly vs Annual

- Monthly billing is best if you want flexibility while adopting the platform.
- Annual billing reduces the effective monthly cost and simplifies renewals for established shops.

### Upgrades

Upgrades take effect immediately. RepairOps and Stripe apply prorated credit for unused time on your current plan and bill the difference for the remainder of the cycle.

### Downgrades

Downgrades normally take effect on the next renewal so your shop does not lose access mid-cycle. If the downgraded plan would put you over quota, RepairOps flags the affected resources before the change becomes active.

## Managing Your Subscription

1. Open **Settings** → **Billing**.
2. Review your current plan, renewal date, and usage meters.
3. Click **Change Plan** to move between Starter, Pro, and Enterprise.
4. Add or remove an AI add-on from the same billing screen.
5. Use **Purchase Credits** if you need a top-up pack.

## Common Questions

**What happens if I hit the Starter work-order limit?**  
New intake is blocked until your cycle resets or you upgrade.

**Can I use BYOK instead of managed credits?**  
Yes. Choose **AI Ready** for BYOK-only access, or Enterprise AI if you need BYOK plus managed fallback.

**Do purchased credits roll over?**  
Yes, unless they sit inactive for 12 months.

**Can I cancel anytime?**  
Yes. Your subscription remains active through the current billing period, then stops renewing.

## Related Pages

- **[Quick Start](/getting-started/quick-start/)** — Set up your org and start using the app
- **[Team Setup](/getting-started/team-setup/)** — Add staff within your plan limits
- **[Billing & Subscriptions](/admin/billing/)** — Admin-focused subscription management
- **[Feature Matrix](/reference/feature-matrix/)** — Full feature-by-feature comparison
