---
title: Tagging System
description: Classify work orders, flag devices, and segment customers using colored tags with automation rules and reporting.
---

RepairOps includes a full tagging system that lets your team classify work orders, flag devices, and segment customers using a controlled vocabulary of colored tags. Tags flow across the system — a device tagged during one visit carries that context into every future repair.

---

## What Are Tags?

Tags are short labels like `rush`, `warranty`, `liquid-damage-history`, or `VIP` that you apply to three types of entities:

- **Work orders (tickets)** — Classify the job: `rush`, `warranty`, `waiting-on-customer`, `data-recovery`
- **Devices** — Flag hardware history: `liquid-damage-history`, `fragile-hinge`, `board-repair-prior`, `aftermarket-screen`
- **Customers** — Segment accounts: `business-account`, `VIP`, `school-client`, `slow-payer`

Tags are **not** free-form text. Your shop owner or manager creates a controlled tag library with specific names, colors, and categories. This keeps the system clean and ensures everyone uses the same terminology.

---

## Tag Colors

Each tag has a color that carries meaning, making the Kanban board scannable at a glance:

| Color | Meaning | Examples |
|-------|---------|----------|
| **Red** | Urgent / risk | `rush`, `fragile`, `data-at-risk` |
| **Orange** | Warning / blocked | `waiting-on-customer`, `backordered-part` |
| **Yellow** | Attention needed | `slow-payer`, `needs-follow-up` |
| **Blue** | Customer / account type | `business-account`, `school-client`, `VIP` |
| **Purple** | Warranty / callback | `warranty`, `callback`, `repeat-visit` |
| **Green** | Positive / approved | `verified-customer`, `prepaid` |
| **Gray** | Informational / history | `liquid-damage-history`, `board-repair-prior` |
| **Pink** | Specialty / skill route | `microsoldering`, `data-recovery`, `console-repair` |

---

## Using Tags Day-to-Day

### At Intake

When a customer checks in a device, the front desk can apply tags to the ticket during the intake wizard. If the device has been seen before and has tags from a prior visit (e.g., `liquid-damage-history`), a prominent warning appears so the team knows about it before opening the case.

### On the Kanban Board

Tags appear as colored badges on each ticket card. You can filter the board by tag — for example, show only `rush` tickets, or only `warranty` work. This makes it easy to focus on what matters.

### During Diagnostics

Technicians can add device tags based on what they find. If they discover a prior board repair or aftermarket parts, tagging the device ensures future techs see that context immediately.

### On Customer Profiles

Customer tags like `VIP`, `business-account`, or `school-client` appear on the customer profile and are visible whenever that customer's name appears on a ticket. This helps front desk staff provide appropriate service.

---

## Managing Your Tag Library

Owners and managers control the tag library from **Shop Settings → Tags**.

From here you can:
- **Create** new tags with a name, color, category, and description
- **Edit** existing tags (rename, change color, update description)
- **Archive** tags that are no longer needed (historical data preserved)
- **Delete** tags permanently (only if no active assignments)
- **Reorder** tags to control how they appear in pickers

### Tag Categories

Every tag belongs to one of four categories:

| Category | Purpose | Example |
|----------|---------|---------|
| **Operational** | Affects current workflow | `rush`, `waiting-on-customer` |
| **Historical** | Context from prior work | `liquid-damage-history`, `board-repair-prior` |
| **Reporting** | Analytics bucket | `warranty`, `walk-in` |
| **Automation** | Triggers rules (Pro+) | `rush`, `data-recovery` |

### Global vs. Shop-Specific Tags

If you run multiple locations, tags can be:
- **Global** — Available at all shops (e.g., `rush`, `warranty`)
- **Shop-specific** — Only visible at one location (e.g., a tag for a local school district)

---

## Tag Automation (Pro & Enterprise)

On Pro and Enterprise plans, tags can trigger automatic actions when applied to a ticket.

### Available Rule Types

| Rule | What It Does |
|------|-------------|
| **Set Priority** | Automatically change ticket priority (e.g., `rush` → Urgent) |
| **Assign Tech** | Auto-assign to a specific technician |
| **Require Checklist** | Require a specific checklist before closing |
| **Require Photos** | Require minimum photo count |
| **Require Disclaimer** | Flag ticket as needing customer waiver |
| **Send Alert** | Notify a manager or role immediately |
| **Block Close** | Prevent closing until a condition is met |
| **SLA Escalation** | Escalate if ticket isn't reviewed within N minutes |

### Setting Up Rules

1. Go to **Shop Settings → Tag Rules**.
2. Click **Create Rule**.
3. Select the trigger tag (e.g., `rush`).
4. Choose the rule type and configure it.
5. Enable the rule.

Rules execute in priority order when a tag is applied. You can test rules in dry-run mode before enabling them.

### Repeat Issue Detection

When a device or customer accumulates 3 or more tickets with the same tag (e.g., `overheating`), the system surfaces a warning on the ticket detail page. This helps identify recurring problems that may indicate a deeper issue or customer misuse pattern.

---

## Reporting with Tags

### Filter Any Report by Tag

All existing reports (Sales Tax, Day Report, Sales Reports, Payment Reports, Fiscal Year) support an optional tag filter. When you select one or more tags, the report only includes transactions from tickets with those tags. This lets you answer questions like "how much warranty revenue did we do this quarter?"

### Tag Usage Report (Pro+)

A dedicated report showing:
- Most-used tags by volume
- Tag application by technician
- Tag trends over time
- Unused or underused tags
- Tag distribution by device type

---

## Who Can Do What

| Action | Owner | Manager | Front Desk | Tech | QC | Accounting |
|--------|:-----:|:-------:|:----------:|:----:|:--:|:----------:|
| Create / edit tags | Yes | Yes | — | — | — | — |
| Delete / archive tags | Yes | — | — | — | — | — |
| Apply tag to ticket | Yes | Yes | Yes | Yes | Yes | — |
| Apply tag to device | Yes | Yes | Yes | Yes | — | — |
| Apply tag to customer | Yes | Yes | Yes | — | — | — |
| Remove tags | Yes | Yes | Yes | Own only | Own only | — |
| Create automation rules | Yes | Yes | — | — | — | — |
| View tag reports | Yes | Yes | — | — | — | Yes |
| Filter Kanban by tag | Yes | Yes | Yes | Yes | Yes | Yes |

---

## Plan Availability

| Feature | Starter | Pro | Enterprise |
|---------|:-------:|:---:|:----------:|
| Tag library (up to 50) | Yes | — | — |
| Tag library (up to 200) | — | Yes | — |
| Tag library (unlimited) | — | — | Yes |
| Apply / remove tags | Yes | Yes | Yes |
| Kanban filtering | Yes | Yes | Yes |
| Tag filter on reports | Yes | Yes | Yes |
| Automation rules | — | Yes | Yes |
| Tag merge tool | — | Yes | Yes |
| Bulk operations | — | Yes | Yes |
| Tag Usage Report | — | Yes | Yes |
| Tag hierarchy | — | — | Yes |
| API access to tags | — | — | Yes |
