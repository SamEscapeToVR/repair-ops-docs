---
title: "Role Permissions"
description: "What each role can do across the RepairOps platform"
sidebar:
  order: 3
---

RepairOps uses role-based access control (RBAC) to manage what each team member can see and do. Permissions are enforced at two layers: the application layer (server actions) and the database layer (row-level security). This page documents every role and its capabilities.

## Roles Overview

RepairOps defines 7 roles. Each user is assigned exactly one role per organization.

### OWNER

Full access to everything. Manages organization billing, subscription, team members, and all settings. There must always be at least one OWNER per organization. OWNERs can perform any action that any other role can perform.

### MANAGER

Shop-level administrator. Handles triage, dispatch, QC oversight, and reporting. Managers can see all tickets across their assigned shops and manage day-to-day operations. Cannot manage billing or organization-level settings.

### FRONT_DESK

Customer-facing role. Handles intake, quoting, customer approvals, payment processing, and pickup. Front desk staff interact with customers directly and manage the beginning and end of the repair lifecycle.

### TECH

Repair technician. Performs diagnostics, logs repair work, tracks parts usage, and submits completed repairs for QC. Techs see only tickets assigned to them (unless a manager grants broader visibility).

### QC

Quality control inspector. Reviews completed repairs, runs QC checklists, collects verification evidence, and passes or fails work. QC staff are the final checkpoint before a device is released to the customer.

### ACCOUNTING

Financial oversight. Views reports, invoices, payment records, and revenue data. This is a read-only role for ticket operations — accounting staff cannot create, edit, or transition tickets.

### DISPATCHER

Assignment coordinator. Views the ticket queue and assigns technicians. Dispatchers can see ticket status and workload but cannot perform repairs, process payments, or modify ticket details.

## Ticket Transition Permissions

The following matrix shows which roles can move a ticket **into** each target status. See the [State Machine reference](/reference/state-machine/) for the full transition graph.

| Target Status | OWNER | MANAGER | FRONT_DESK | TECH | QC | ACCOUNTING | DISPATCHER |
|---------------|:-----:|:-------:|:----------:|:----:|:--:|:----------:|:----------:|
| INTAKE | ✓ | ✓ | ✓ | | | | |
| TRIAGE | ✓ | ✓ | | | | | |
| DIAGNOSTICS | ✓ | ✓ | | ✓ | | | |
| WAITING_APPROVAL | ✓ | ✓ | ✓ | ✓ | | | |
| APPROVED | ✓ | ✓ | ✓ | | | | |
| WAITING_ON_PARTS | ✓ | ✓ | | ✓ | | | |
| IN_REPAIR | ✓ | ✓ | | ✓ | | | |
| QC_REVIEW | ✓ | ✓ | | ✓ | ✓ | | |
| QC_FAILED | ✓ | ✓ | | | ✓ | | |
| READY_FOR_PICKUP | ✓ | ✓ | ✓ | | | | |
| PICKED_UP | ✓ | ✓ | ✓ | | | | |
| CLOSED | ✓ | ✓ | ✓ | | | | |
| VOIDED | ✓ | ✓ | | | | | |

## Feature Access Matrix

Beyond ticket transitions, each role has different levels of access to platform features.

### Ticket Operations

| Action | OWNER | MANAGER | FRONT_DESK | TECH | QC | ACCOUNTING | DISPATCHER |
|--------|:-----:|:-------:|:----------:|:----:|:--:|:----------:|:----------:|
| Create tickets | ✓ | ✓ | ✓ | | | | |
| View all shop tickets | ✓ | ✓ | ✓ | | | | ✓ |
| View assigned tickets only | ✓ | ✓ | ✓ | ✓ | ✓ | | ✓ |
| Edit ticket details | ✓ | ✓ | ✓ | ✓ | | | |
| Transition ticket status | ✓ | ✓ | ✓ | ✓ | ✓ | | |
| Void / cancel tickets | ✓ | ✓ | | | | | |
| Assign technicians | ✓ | ✓ | | | | | ✓ |

### Quoting & Payments

| Action | OWNER | MANAGER | FRONT_DESK | TECH | QC | ACCOUNTING | DISPATCHER |
|--------|:-----:|:-------:|:----------:|:----:|:--:|:----------:|:----------:|
| Create quotes | ✓ | ✓ | ✓ | ✓ | | | |
| Send quote to customer | ✓ | ✓ | ✓ | | | | |
| Record customer approval | ✓ | ✓ | ✓ | | | | |
| Process payments | ✓ | ✓ | ✓ | | | | |
| Issue refunds | ✓ | ✓ | | | | | |
| Generate invoices | ✓ | ✓ | ✓ | | | ✓ | |
| View payment history | ✓ | ✓ | ✓ | | | ✓ | |

### Diagnostics & Repair

| Action | OWNER | MANAGER | FRONT_DESK | TECH | QC | ACCOUNTING | DISPATCHER |
|--------|:-----:|:-------:|:----------:|:----:|:--:|:----------:|:----------:|
| Run diagnostics | ✓ | ✓ | | ✓ | | | |
| Log repair notes | ✓ | ✓ | | ✓ | | | |
| Track parts usage | ✓ | ✓ | | ✓ | | | |
| Upload evidence / photos | ✓ | ✓ | ✓ | ✓ | ✓ | | |
| Perform QC review | ✓ | ✓ | | | ✓ | | |
| Pass / fail QC | ✓ | ✓ | | | ✓ | | |

### Inventory & Catalog

| Action | OWNER | MANAGER | FRONT_DESK | TECH | QC | ACCOUNTING | DISPATCHER |
|--------|:-----:|:-------:|:----------:|:----:|:--:|:----------:|:----------:|
| View inventory | ✓ | ✓ | ✓ | ✓ | | ✓ | |
| Add / edit inventory items | ✓ | ✓ | | | | | |
| Adjust stock levels | ✓ | ✓ | ✓ | ✓ | | | |
| Manage service catalog | ✓ | ✓ | | | | | |
| CSV import / export | ✓ | ✓ | | | | | |

### Reporting & Analytics

| Action | OWNER | MANAGER | FRONT_DESK | TECH | QC | ACCOUNTING | DISPATCHER |
|--------|:-----:|:-------:|:----------:|:----:|:--:|:----------:|:----------:|
| View basic KPI dashboard | ✓ | ✓ | | | | ✓ | |
| View advanced analytics | ✓ | ✓ | | | | ✓ | |
| View revenue reports | ✓ | ✓ | | | | ✓ | |
| View tech performance | ✓ | ✓ | | | | | |
| Export reports | ✓ | ✓ | | | | ✓ | |

### Administration

| Action | OWNER | MANAGER | FRONT_DESK | TECH | QC | ACCOUNTING | DISPATCHER |
|--------|:-----:|:-------:|:----------:|:----:|:--:|:----------:|:----------:|
| Manage team members | ✓ | | | | | | |
| Invite users | ✓ | ✓ | | | | | |
| Manage shop settings | ✓ | ✓ | | | | | |
| Manage organization settings | ✓ | | | | | | |
| Manage billing / subscription | ✓ | | | | | | |
| Configure notifications | ✓ | ✓ | | | | | |
| Install / remove plugins | ✓ | ✓ | | | | | |
| Manage API keys | ✓ | | | | | | |
| Configure SSO / SAML | ✓ | | | | | | |
| White-label branding | ✓ | | | | | | |

### AI & Knowledge

| Action | OWNER | MANAGER | FRONT_DESK | TECH | QC | ACCOUNTING | DISPATCHER |
|--------|:-----:|:-------:|:----------:|:----:|:--:|:----------:|:----------:|
| Use AI tasks (intake, diagnostics, etc.) | ✓ | ✓ | ✓ | ✓ | ✓ | | |
| KB Chat queries | ✓ | ✓ | ✓ | ✓ | ✓ | | |
| Create / edit KB articles | ✓ | ✓ | | | | | |
| Publish KB articles | ✓ | ✓ | | | | | |
| System Builder (create builds) | ✓ | ✓ | ✓ | ✓ | | | |
| Manage AI provider settings | ✓ | | | | | | |
| View AI usage / credit balance | ✓ | ✓ | | | | | |

## How Permissions Are Enforced

Permissions are checked at two independent layers for defense in depth:

1. **Server Actions** — Every server action queries the user's membership record to verify their role before performing the operation. If the role check fails, the action returns an error before any database write occurs.

2. **Row-Level Security (RLS)** — Postgres RLS policies use helper functions (`is_member()`, `has_shop_access()`, `has_role()`) to restrict which rows a user can read or write. Even if application code has a bug, the database layer prevents unauthorized access.

This dual-layer approach means that a permission bypass requires simultaneous failures in both the application and database layers.

## Role Assignment

- Roles are assigned when inviting a user to an organization.
- Only OWNERs can change another user's role.
- MANAGERs can invite users but cannot assign the OWNER role.
- A user can belong to multiple organizations with different roles in each.
- Removing a user's membership immediately revokes all access to that organization's data.
