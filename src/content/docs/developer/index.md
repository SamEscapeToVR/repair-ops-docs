---
title: "Developer Guide"
description: "Build integrations and plugins for RepairOps"
sidebar:
  order: 1
---

RepairOps provides APIs and plugin systems for developers and integrators. Build custom integrations, extend functionality with plugins, and deploy RepairOps on your own infrastructure.

## Core Developer Topics

### [REST API Reference](/developer/api-reference/)
Complete API documentation for Enterprise tier. Access tickets, customers, inventory, KPIs, and more. Manage API keys, configure webhooks, and integrate with your systems.

**Available on:** Enterprise tier only.

### [Plugin SDK](/developer/plugin-sdk/)
Build custom plugins to extend RepairOps. Learn the manifest specification, capabilities system, event handling, and plugin testing. Submit plugins to the marketplace.

**Available on:** All tiers (submit to marketplace on Pro/Enterprise).

### [Self-Hosted Deployment](/developer/self-hosted/)
Deploy RepairOps on your own infrastructure with Docker Compose. Set up Postgres, Supabase, Redis, and the RepairOps worker. Configure backups, monitoring, and SSL.

**Available on:** Enterprise tier only.

## API Quickstart

Get started with the REST API in 3 steps:

### 1. Generate an API Key
**Settings** → **API Keys** → **Generate New Key** → Select scope (Read/Write/Admin)

### 2. Make an API Call
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.repairops.io/v1/tickets
```

### 3. Read the API Reference
See [REST API Reference](/developer/api-reference/) for all endpoints.

## Plugin Quickstart

Build your first plugin in 5 minutes:

### 1. Set Up Development Environment
```bash
npm install -g @repairops/plugin-cli
plugin-cli init my-plugin
cd my-plugin
npm install
```

### 2. Create a Simple Plugin
Edit `manifest.json`:
```json
{
  "name": "My First Plugin",
  "version": "1.0.0",
  "capabilities": ["label_printer"],
  "handler": "index.ts"
}
```

### 3. Test Locally
```bash
plugin-cli dev
```

### 4. Submit to Marketplace
```bash
plugin-cli publish
```

See [Plugin SDK](/developer/plugin-sdk/) for full details.

## Self-Hosted Quickstart

Deploy RepairOps locally with Docker Compose:

### 1. Clone Configuration
```bash
git clone https://github.com/repairops/docker-compose.git
cd docker-compose
```

### 2. Configure Environment
Create `.env` file with database credentials, API keys, etc.

### 3. Start Services
```bash
docker-compose up -d
```

### 4. Access RepairOps
Open `http://localhost:3000` in your browser.

See [Self-Hosted Deployment](/developer/self-hosted/) for production setup.

## Common Integration Patterns

### Listen to Repair Ticket Events

Use webhooks to react when ticket status changes:

```javascript
// When ticket moves to "In Repair"
POST /webhooks/ticket-events
{
  "event": "ticket.transitioned",
  "ticket_id": "abc-123",
  "from_status": "APPROVED",
  "to_status": "IN_REPAIR",
  "timestamp": "2026-03-09T15:30:00Z"
}
```

### Export Tickets for Analysis

Get all tickets for a date range:

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.repairops.io/v1/tickets?created_after=2026-01-01&created_before=2026-02-01"
```

### Create Repair Tickets Programmatically

Integrate your website booking system with RepairOps:

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_email": "john@example.com",
    "device_identifier": "iPhone 14 Pro",
    "issue_description": "Cracked screen"
  }' \
  https://api.repairops.io/v1/tickets
```

## Help & Support

- **[Help Center](https://repairops.io/help)** — FAQs and troubleshooting
- **[Community Forum](https://community.repairops.io)** — Discuss plugins and integrations
- **[Support](https://repairops.io/support)** — Contact our support team
- **GitHub Issues** — Report bugs or request features

## SDK & Libraries

### JavaScript/TypeScript SDK

```bash
npm install @repairops/sdk
```

```typescript
import { RepairOpsClient } from '@repairops/sdk'

const client = new RepairOpsClient({
  apiKey: process.env.REPAIROPS_API_KEY
})

const tickets = await client.tickets.list()
```

### REST API (No SDK)

All features are accessible via REST API with standard HTTP methods (GET, POST, PATCH, DELETE).

### Webhook Events

Subscribe to real-time ticket events, payment notifications, and more.

## Rate Limits

- **Read endpoints:** 1,000 requests/hour
- **Write endpoints:** 100 requests/hour
- **Admin endpoints:** 10 requests/hour

Rate limits are per API key. Exceeding limits returns `429 Too Many Requests`.

## Authentication

All API requests require Bearer token authentication:

```bash
Authorization: Bearer YOUR_API_KEY
```

API keys can be created and rotated in **Settings** → **API Keys**.

## Architecture Overview

```
┌──────────────────────────────────────┐
│  Your Application                     │
│  (Website, Kiosk, CRM, etc.)         │
└─────────────┬──────────────────────┘
              │
              │ REST API / GraphQL
              │
┌─────────────v──────────────────────┐
│  RepairOps API Gateway              │
│  - Auth & API key validation        │
│  - Rate limiting                    │
│  - Request logging                  │
└─────────────┬──────────────────────┘
              │
┌─────────────v──────────────────────┐
│  RepairOps Backend                  │
│  - Business logic                   │
│  - Ticket state machine             │
│  - Multi-tenant isolation (RLS)     │
└─────────────┬──────────────────────┘
              │
┌─────────────v──────────────────────┐
│  Postgres Database                  │
│  - Tickets, customers, inventory    │
│  - Encrypted at rest                │
│  - Automated daily backups          │
└─────────────────────────────────────┘
```

## Data Model Overview

### Core Entities

- **Organizations** — Your repair shop
- **Shops** — Physical locations
- **Tickets** — Repair jobs
- **Customers** — Customer profiles
- **Inventory** — Parts and materials
- **Invoices** — Billing records

### Relationships

```
Organization
├── Shops
│   ├── Tickets
│   │   ├── Customer
│   │   ├── Technician (User)
│   │   └── Invoices
│   ├── Inventory
│   └── POS Transactions
└── Team Members (Users)
```

## Tier Requirements

| Feature | Starter | Pro | Enterprise |
|---------|:-------:|:---:|:----------:|
| REST API | — | — | ✓ |
| Plugin SDK | ✓ | ✓ | ✓ |
| Plugin Marketplace | ✓ | ✓ | ✓ |
| Webhooks | — | — | ✓ |
| Self-Hosted | — | — | ✓ |
| Rate limits | — | — | Custom |

## Getting Help

**API documentation unclear?**
- Check [API Reference](/developer/api-reference/)
- Browse [community examples](https://github.com/repairops/examples)

**Plugin development help?**
- Read [Plugin SDK](/developer/plugin-sdk/)
- Check sample plugins on GitHub

**Deployment questions?**
- See [Self-Hosted Guide](/developer/self-hosted/)
- Contact support for Enterprise assistance

---

Ready to integrate? Start with [REST API Reference](/developer/api-reference/) or [Plugin SDK](/developer/plugin-sdk/).
