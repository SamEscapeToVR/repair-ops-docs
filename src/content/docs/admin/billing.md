---
title: "Billing & Subscriptions"
description: "Manage your plan, upgrade, and track usage"
sidebar:
  order: 2
---

Manage your RepairOps subscription, review usage against your plan limits, and handle AI add-ons or credit purchases. Billing is processed through Stripe, but enforcement happens inside RepairOps as well.

## Current Pricing

| Plan | Monthly | Annual | Intended For |
|------|---------|--------|--------------|
| **Starter** | $49 | $470 | Single-shop teams |
| **Pro** | $99 | $950 | Growing multi-shop operations |
| **Enterprise** | $199 | $1,910 | Franchises, compliance-heavy orgs, large deployments |

## Subscription Management

### View Your Subscription

Open **Settings** → **Billing** to review:

- Current plan and billing interval
- Renewal date
- Current usage meters
- Active AI add-on
- Recent invoices and payment method

<img src="/images/screenshots/light/desktop/settings-billing.png" alt="RepairOps Billing settings showing plan, usage meters, and invoices" class="screenshot light-only" loading="lazy" />
<img src="/images/screenshots/dark/desktop/settings-billing.png" alt="RepairOps Billing settings showing plan, usage meters, and invoices" class="screenshot dark-only" loading="lazy" />

### Upgrade

Upgrades take effect immediately. Stripe prorates the remaining value of your current plan and bills the difference for the rest of the cycle.

### Downgrade

Downgrades typically take effect at the next renewal. If your current organization usage exceeds the destination plan, RepairOps warns you before the change is scheduled.

### Cancel

Canceling stops future renewals. Your organization remains active through the current billing period, after which access is suspended until billing is restored.

## Enforced Plan Limits

| Resource | Starter | Pro | Enterprise |
|----------|---------|-----|------------|
| Work orders / month | 150 | Unlimited | Unlimited |
| Users | 3 | 15 | Unlimited |
| Shops | 1 | 5 | Unlimited |
| SMS / month | 100 | 500 | Unlimited |
| Shop displays | 0 | 1 | Unlimited |

How enforcement works:

- **Work orders:** New intake is blocked when the monthly quota is exhausted.
- **Users:** Invites and provisioning are blocked at the cap.
- **Shops:** New shop creation is blocked at the cap.
- **SMS:** Outbound sends stop when the quota is exhausted.
- **Displays:** Additional display tokens cannot be created above the limit.

RepairOps does not silently bill overages for these resources. Limits are hard gates.

## AI Add-Ons

AI is purchased separately from the base plan.

| Add-On | Price | Mode | Managed Credits / Month | Coverage |
|--------|-------|------|-------------------------|----------|
| **Disabled** | $0 | Off | 0 | No AI features |
| **AI Ready** | $79 | BYOK | 0 | All supported tasks using your own keys |
| **AI Assist** | $79 | Managed | 200 | Intake parse, note cleanup, customer summary, KB search |
| **AI Copilot** | $149 | Managed | 500 | Full managed task coverage |
| **Enterprise AI** | Included with Enterprise | BYOK + Managed | Unlimited | Enterprise-only routing, self-hosted, fallback, audit |

Monthly managed credits do **not** roll over.

## Credit Packs

Organizations with an AI add-on can buy top-up packs:

| Pack | Credits | Price |
|------|---------|-------|
| Small | 100 | $15 |
| Medium | 500 | $60 |
| Large | 1,000 | $100 |

Purchased credits are non-refundable and expire after 12 months of inactivity.

### Typical Task Costs

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

### Budget Controls

In **Settings** → **AI Gateway** → **Budget**, owners can:

- Set a monthly spend ceiling
- Trigger alerts at 75%, 90%, and 100%
- Review which tasks are consuming credits

When the budget or credit pool is exhausted, managed AI tasks are blocked until you buy credits or the next billing period begins.

## Invoices and Payment Methods

### Invoices

In **Settings** → **Billing** → **Invoices**, you can:

- Download past Stripe invoices
- Review subscription and credit-pack charges
- Confirm billing date and tax information

### Payment Methods

Update the default card or ACH method in **Settings** → **Billing** → **Payment Methods**.

### Failed Payments

If payment fails:

1. Stripe retries automatically.
2. RepairOps emails the billing contact.
3. Owners can update the payment method and trigger a retry.
4. Access eventually shifts to a past-due state if payment is not resolved.

## Annual Billing

Annual billing reduces the effective monthly price:

- Starter: $470/year
- Pro: $950/year
- Enterprise: $1,910/year

Switching intervals is handled through Stripe Billing and applies at the next applicable billing event.

## Tax and Compliance

Billing contacts can add VAT/GST/tax identifiers in **Settings** → **Billing** → **Company**. Stripe applies tax calculation based on the configured entity and jurisdiction.

## FAQ

**Can we keep using the app if we are over a user limit after a downgrade?**  
Existing users remain, but new invites are blocked until the organization is back under the limit or re-upgraded.

**Do AI credits come with Starter or Pro automatically?**  
No. Base plans include zero managed AI credits. Monthly AI credits come from the selected AI add-on.

**Can we buy credits without an AI add-on?**  
No. Top-up packs require an active AI add-on.

## Related Pages

- **[Feature Matrix](/reference/feature-matrix/)** — Compare plan capabilities side by side
- **[AI Gateway](/features/ai-gateway/)** — AI routing, tasks, and budget controls
- **[Security](/admin/security/)** — Payment security and API key governance
