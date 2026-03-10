---
title: "Glossary"
description: "Common terms, statuses, roles, and abbreviations used in RepairOps"
sidebar:
  order: 5
---

A reference of terms, abbreviations, and concepts used throughout RepairOps and its documentation.

## Ticket Statuses

RepairOps tickets move through 13 statuses. See the [State Machine reference](/reference/state-machine/) for the full transition graph and gate requirements.

| Status | Definition |
|--------|-----------|
| **INTAKE** | Initial state. Ticket has been created and is awaiting data collection (customer info, device details, photos, consent). |
| **TRIAGE** | A manager is reviewing the ticket, assessing priority, and assigning a technician. |
| **DIAGNOSTICS** | A technician is actively investigating the issue, running tests, and documenting findings. |
| **WAITING_APPROVAL** | A quote has been prepared and sent to the customer. The system is waiting for the customer to approve or decline. |
| **APPROVED** | The customer has approved the quote. The ticket is ready to proceed to repair or parts ordering. |
| **WAITING_ON_PARTS** | One or more parts have been ordered and the repair is on hold until they arrive. |
| **IN_REPAIR** | A technician is actively performing the repair. |
| **QC_REVIEW** | The repair is complete and a quality control inspector is reviewing the work before release. |
| **QC_FAILED** | The QC inspector found issues with the repair. The ticket returns to the technician for rework. |
| **READY_FOR_PICKUP** | The repair has passed QC and the device is ready for the customer to collect. |
| **PICKED_UP** | The customer has collected their device. Payment processing and invoice generation occur at this stage. |
| **CLOSED** | Terminal state. The ticket is fully complete — device returned, payment received, invoice generated. |
| **VOIDED** | Terminal state. The ticket was cancelled. A ticket can be voided from any non-terminal status. |

## Roles

RepairOps defines 7 roles for team members. See the [Permissions reference](/reference/permissions/) for the full access matrix.

| Role | Definition |
|------|-----------|
| **OWNER** | Organization-level administrator with full access to billing, settings, team management, and all features. |
| **MANAGER** | Shop-level administrator who handles triage, dispatch, QC oversight, and reporting. |
| **FRONT_DESK** | Customer-facing staff responsible for intake, quoting, approvals, payments, and pickup. |
| **TECH** | Repair technician who performs diagnostics, repairs, and parts tracking. |
| **QC** | Quality control inspector who reviews completed repairs and provides pass/fail decisions. |
| **ACCOUNTING** | Financial role with read-only access to reports, invoices, and payment records. |
| **DISPATCHER** | Assignment coordinator who views the ticket queue and assigns technicians to work orders. |

## General Terms

### A

**AI Gateway** — The RepairOps subsystem that routes AI requests to configured providers (OpenAI, Anthropic, Google). Supports both BYOK (bring your own key) and managed credits. Powers intake parsing, diagnostics help, voice-to-text, and more.

**Approval Link** — A unique URL sent to a customer that allows them to view a quote and approve or decline it without logging in. Links are scoped to a single ticket and expire after the quote is updated.

**Audit Log** — An append-only record of significant actions in the system. Every table change, status transition, secret access, and payment event is logged with the acting user, timestamp, and details.

### B

**Backstep** — A reverse transition in the state machine. For example, moving a ticket from DIAGNOSTICS back to TRIAGE when the tech needs manager input. Backsteps are limited to specific transitions.

**BuildCores** — An open database of 31,000+ PC components (CPUs, GPUs, RAM, storage, cases, PSUs) used by the System Builder feature. Data syncs periodically from the BuildCores OpenDB.

**BYOK** — Bring Your Own Key. A mode where the shop provides their own API keys for AI providers (OpenAI, Anthropic, Google) instead of using RepairOps managed credits.

### C

**Credit (AI Credit)** — A unit of AI usage in RepairOps. Each AI task consumes a set number of credits. Credits come from monthly plan allocations or purchased credit packs.

**Customer Portal** — A token-based interface where customers can view their ticket status, approve quotes, and see repair progress. Does not require a user account or password.

### D

**Device Identifier** — A free-text field describing the device being repaired (e.g., "iPhone 14 Pro", "Dell XPS 15 9530", "Nintendo Switch OLED").

### E

**Envelope Encryption** — The encryption method used for secrets storage. Data is encrypted with AES-256-GCM using a data encryption key (DEK), and the DEK is protected by a key encryption key (KEK) stored in environment variables.

**Exit Gate** — See [Gate](#g).

### G

**Gate** — A set of required conditions that must be met before a ticket can leave a specific status. For example, the INTAKE gate requires customer_id, device_identifier, consent_signed, and at least 2 photos. Gates enforce data quality throughout the workflow.

### I

**iFixit Guides** — Step-by-step repair guides from iFixit.com, embedded directly in RepairOps. Techs can search guides, attach them to tickets, and receive AI-suggested guides based on the device and issue.

### K

**KB (Knowledge Base)** — An internal wiki within RepairOps where shops can create, organize, and search articles about common repairs, procedures, and shop policies. Supports rich text, attachments, and AI-powered search via RAG.

**KPI (Key Performance Indicator)** — Metrics tracked on the analytics dashboard: revenue, throughput (tickets closed), average turnaround time, QC pass rate, customer satisfaction, and margins.

### M

**Managed Credits** — AI credits provided by RepairOps as part of the AI Assist, AI Copilot, or Enterprise AI package. Shops use these credits without needing their own API keys.

**Multi-tenant** — The architecture where a single RepairOps instance serves multiple organizations, each with completely isolated data. Tenant isolation is enforced by row-level security at the database layer.

### O

**Org / Organization** — The top-level entity in RepairOps. An organization contains one or more shops, team members, and all associated data (tickets, customers, inventory). Billing is per organization.

**Outbox** — An event queue used for reliable notification delivery. When a ticket transition or significant event occurs, a row is inserted into the outbox. A background worker picks up outbox events and delivers notifications (SMS, email, push, Slack).

### P

**POS (Point of Sale)** — The RepairOps terminal for processing non-repair sales (accessories, parts, walk-in purchases). Includes cash drawer management, multiple payment methods, and daily reconciliation.

**Plugin** — An extension that adds functionality to RepairOps. Plugins range from free (label printing, basic integrations) to Pro-tier (Google Reviews, Time Clock, Appointment Booking).

### Q

**QC (Quality Control)** — The review step where a completed repair is inspected before releasing the device to the customer. QC staff run a checklist, collect evidence, and issue a pass or fail decision.

### R

**RAG (Retrieval-Augmented Generation)** — The AI technique used by KB Chat. When a user asks a question, the system retrieves relevant knowledge base articles and provides them as context to the AI model, producing answers grounded in shop-specific knowledge.

**RLS (Row-Level Security)** — A Postgres feature that restricts which rows a user can access based on their identity and role. Every tenant-scoped table in RepairOps has RLS policies, ensuring one organization can never see another's data.

### S

**SAML (Security Assertion Markup Language)** — An authentication protocol used for enterprise SSO. Allows organizations to log into RepairOps using their existing identity provider (Okta, Azure AD, Google Workspace).

**Service Catalog** — A configurable list of standard repair services offered by a shop (e.g., "Screen Replacement — iPhone 14", "Battery Replacement — MacBook Pro"). Catalog items have preset pricing and estimated durations.

**Shop** — A physical repair location belonging to an organization. Starter plans include 1 shop, Pro plans up to 5, and Enterprise plans unlimited. Each shop has its own inventory, displays, and ticket queue.

**Shop Floor Display** — A wall-mounted or countertop screen showing real-time ticket status for customers waiting in the shop. Authenticated via access token (no user session required).

**SSO (Single Sign-On)** — An authentication method where users sign in once through their company's identity provider and gain access to RepairOps without a separate password. Available on Enterprise plans.

**System Builder** — A feature for designing custom PC builds. Uses the BuildCores component database (31K+ parts) with compatibility checking and AI-assisted recommendations. Builds can be shared with customers through the portal.

### T

**Transition** — A change from one ticket status to another. Transitions are governed by the state machine graph (only certain from/to pairs are valid), role permissions (only certain roles can perform each transition), and gates (exit conditions must be met).

### V

**VOIDED** — A terminal ticket status meaning the ticket was cancelled. Any non-terminal ticket can be voided. Only OWNERs and MANAGERs can void tickets. Voiding bypasses all exit gates.

### W

**Work Order** — A synonym for ticket. Some repair industry terminology uses "work order" to describe a repair job. In RepairOps, these terms are interchangeable.

**Webhook** — An HTTP callback triggered when events occur in RepairOps (ticket created, status changed, payment processed). Available to Enterprise customers via the REST API.
