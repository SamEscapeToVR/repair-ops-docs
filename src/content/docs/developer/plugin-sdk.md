---
title: "Plugin SDK"
description: "Develop custom plugins for the RepairOps marketplace"
sidebar:
  order: 3
---

Build custom plugins to extend RepairOps with new capabilities. Learn the manifest specification, event system, UI integration, and submission process.

## What Are Plugins?

Plugins are modular TypeScript/JavaScript packages that add features to RepairOps:
- **Connect external services** (SMS, email, payments, CRM)
- **Add workflows** (booking, POS, time tracking)
- **Extend data models** (custom fields, new tables)
- **Integrate hardware** (label printers, displays)
- **Provide AI capabilities** (custom task types)

Plugins are installed per-organization and shared across all team members.

## Getting Started

### Installation

Install the plugin CLI:

```bash
npm install -g @repairops/plugin-cli
```

### Create a New Plugin

```bash
plugin-cli init my-plugin
cd my-plugin
npm install
```

Directory structure:

```
my-plugin/
├── manifest.json          # Plugin metadata & configuration
├── src/
│   ├── index.ts          # Main plugin handler
│   ├── handlers/         # Event handlers
│   └── components/       # React UI components (optional)
├── tests/
│   └── plugin.test.ts    # Plugin tests
├── package.json
└── README.md
```

## Manifest Specification

The `manifest.json` file defines your plugin's metadata, permissions, and capabilities.

### Minimal Manifest

```json
{
  "name": "My First Plugin",
  "version": "1.0.0",
  "author": "Your Name",
  "description": "A simple RepairOps plugin",
  "capabilities": [],
  "handler": "src/index.ts"
}
```

### Full Manifest Example

```json
{
  "id": "com.example.my-plugin",
  "name": "Email Integration Plugin",
  "version": "2.1.0",
  "author": "Your Company",
  "license": "MIT",
  "description": "Send custom emails from repair tickets",
  "icon": "src/assets/icon.png",
  "homepage": "https://github.com/yourname/my-plugin",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourname/my-plugin"
  },
  "capabilities": ["email_provider"],
  "permissions": [
    "read:tickets",
    "read:customers",
    "write:communications"
  ],
  "tier_gates": {
    "core": "free",
    "advanced": "pro"
  },
  "config_schema": {
    "type": "object",
    "properties": {
      "api_key": {
        "type": "string",
        "title": "API Key",
        "description": "Your email service API key"
      },
      "from_address": {
        "type": "string",
        "title": "From Address",
        "default": "noreply@yourdomain.com"
      }
    },
    "required": ["api_key"]
  },
  "settings_ui": "src/components/SettingsForm.tsx",
  "handler": "src/index.ts"
}
```

### Manifest Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | No | Unique plugin ID (reverse domain: `com.company.name`) |
| `name` | string | ✓ | Display name |
| `version` | string | ✓ | Semantic version (e.g., `1.0.0`) |
| `author` | string | ✓ | Author name |
| `description` | string | ✓ | 1-2 sentence description |
| `capabilities` | string[] | ✓ | Capabilities this plugin provides |
| `permissions` | string[] | No | Data access permissions (see below) |
| `handler` | string | ✓ | Main handler file path |
| `settings_ui` | string | No | React component for plugin settings |
| `tier_gates` | object | No | Feature availability by tier |

### Capabilities

Plugins declare capabilities they provide. RepairOps uses these to route tasks:

```json
{
  "capabilities": [
    "email_provider",      // Can send email
    "sms_provider",        // Can send SMS
    "payments_provider"    // Can process payments
  ]
}
```

**14 Built-In Capability Types:**

```
sms_provider           — Send SMS messages
email_provider         — Send email
label_printer          — Print labels
payments_provider      — Process payments
parts_provider         — Provide part sourcing
rmm_provider           — Remote device management
review_provider        — Manage online reviews
crm_sync               — Sync customer records to CRM
accounting_provider    — Post transactions to accounting
appointment_provider   — Booking and scheduling
shipping_provider      — Generate shipping labels
voice_provider         — Voice recording/transcription
parts_sourcing         — Component databases (BuildCores, etc.)
backup_provider        — Backup and recovery
```

### Permissions

Define what data your plugin can access:

```json
{
  "permissions": [
    "read:tickets",        // View ticket data
    "read:customers",      // View customer profiles
    "read:inventory",      // View parts inventory
    "write:tickets",       // Modify ticket data
    "write:customers",     // Create/update customers
    "write:communications" // Send emails/SMS
  ]
}
```

### Tier Gates

Make features available only on specific tiers:

```json
{
  "tier_gates": {
    "sms_reminders": "starter",   // Available on Starter+
    "advanced_reporting": "pro",   // Available on Pro+
    "custom_workflows": "enterprise" // Enterprise only
  }
}
```

When a shop doesn't have the required tier, features are disabled in the UI.

## Plugin Handler

The handler is the main entry point for your plugin.

### Basic Handler

```typescript
// src/index.ts
import { RepairOpsPlugin, TicketEvent, PaymentEvent } from '@repairops/sdk'

const plugin: RepairOpsPlugin = {
  name: 'Email Integration',
  version: '1.0.0',

  async onInstall(config: Record<string, string>) {
    console.log('Plugin installed with config:', config)
    // Validate API key, create resources, etc.
  },

  async onUninstall() {
    console.log('Plugin uninstalled')
    // Clean up resources
  },

  async onEnable() {
    console.log('Plugin enabled')
  },

  async onDisable() {
    console.log('Plugin disabled')
  },

  handlers: {
    // Listen to ticket events
    'ticket.created': async (event: TicketEvent) => {
      console.log('New ticket:', event.ticket.id)
      // Send email notification
    },

    'ticket.transitioned': async (event: TicketEvent) => {
      console.log('Ticket transitioned:', event.from, '->', event.to)
    },

    // Listen to payment events
    'payment.processed': async (event: PaymentEvent) => {
      console.log('Payment received:', event.amount)
    },
  },
}

export default plugin
```

## Event Handlers

Plugins react to RepairOps events using handlers.

### Ticket Events

```typescript
handlers: {
  'ticket.created': async (event) => {
    const { ticket, shop, customer } = event
    console.log(`New ticket: ${ticket.number} for ${customer.name}`)
  },

  'ticket.transitioned': async (event) => {
    const { ticket, from_status, to_status, actor } = event
    if (to_status === 'QC_REVIEW') {
      // Send QC checklist
    }
  },

  'ticket.updated': async (event) => {
    const { ticket, changed_fields } = event
    if (changed_fields.includes('total_cost')) {
      // Update cost in external system
    }
  },
}
```

### Payment Events

```typescript
handlers: {
  'payment.processed': async (event) => {
    const { ticket, amount, method, timestamp } = event
    // Record in accounting software
  },

  'payment.failed': async (event) => {
    const { ticket, error, timestamp } = event
    // Alert shop owner
  },
}
```

### Custom Events

Plugins can emit custom events for other plugins:

```typescript
async emitEvent(type: string, data: Record<string, any>) {
  await this.api.emit('custom.my-event', data)
}
```

## UI Components (React)

### Settings Form

Create a configuration UI for your plugin:

```typescript
// src/components/SettingsForm.tsx
import React, { useState } from 'react'
import { Button, Input, Select, Alert } from '@repairops/ui'

export default function SettingsForm({ config, onSave }: any) {
  const [apiKey, setApiKey] = useState(config.api_key || '')
  const [fromEmail, setFromEmail] = useState(config.from_email || '')
  const [error, setError] = useState('')

  const handleSave = async () => {
    if (!apiKey || !fromEmail) {
      setError('All fields required')
      return
    }
    try {
      await onSave({ api_key: apiKey, from_email: fromEmail })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div>
      <h3>Email Plugin Settings</h3>
      {error && <Alert type="error">{error}</Alert>}

      <Input
        label="API Key"
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        required
      />

      <Input
        label="From Email Address"
        type="email"
        value={fromEmail}
        onChange={(e) => setFromEmail(e.target.value)}
        required
      />

      <Button onClick={handleSave}>Save Settings</Button>
    </div>
  )
}
```

Add to manifest:
```json
{
  "settings_ui": "src/components/SettingsForm.tsx"
}
```

## Testing Plugins

### Unit Tests

```typescript
// src/tests/plugin.test.ts
import { describe, it, expect } from 'vitest'
import plugin from '../index'

describe('Email Plugin', () => {
  it('should send email on ticket creation', async () => {
    const event = {
      ticket: { id: '123', number: 'T001', status: 'INTAKE' },
      customer: { name: 'John', email: 'john@example.com' }
    }

    const result = await plugin.handlers['ticket.created'](event)
    expect(result.success).toBe(true)
  })

  it('should handle missing email gracefully', async () => {
    const event = {
      ticket: { id: '123' },
      customer: { name: 'John' }
    }

    const result = await plugin.handlers['ticket.created'](event)
    expect(result.success).toBe(false)
    expect(result.error).toContain('email')
  })
})
```

### Local Development

Run plugin locally for testing:

```bash
plugin-cli dev --port 3001
```

This starts a local plugin server. Point your RepairOps dev instance to `localhost:3001` in plugin settings.

### Sandbox Testing

Test in a sandbox organization without affecting production data:

```bash
plugin-cli test --sandbox
```

## API Access

Plugins can access RepairOps data through the SDK:

```typescript
import { RepairOpsAPI } from '@repairops/sdk'

const api = new RepairOpsAPI(config.api_key)

// Read data
const tickets = await api.tickets.list({ status: 'IN_REPAIR' })
const customers = await api.customers.get(customer_id)
const inventory = await api.inventory.list()

// Write data
const newTicket = await api.tickets.create({
  shop_id,
  customer_id,
  issue_description: 'From plugin'
})

// Get KPIs
const kpis = await api.kpis.get({
  shop_id,
  start_date: '2026-01-01',
  end_date: '2026-02-01'
})
```

## Building & Publishing

### Build Plugin

```bash
npm run build
plugin-cli package
```

Generates `my-plugin-1.0.0.zip`

### Submit to Marketplace

1. Create account at [plugins.repairops.io](https://plugins.repairops.io)
2. Click **Submit Plugin**
3. Upload `.zip` file
4. Add description, screenshots, pricing
5. Submit for review

**Review process:**
- Security scan (no malicious code)
- Permissions audit (justified data access)
- Functionality test (works as described)
- Documentation review
- Approval typically within 48 hours

### Publishing on NPM (Optional)

Share your plugin source on NPM:

```bash
npm publish
```

Other developers can then:
```bash
npm install your-plugin
```

## Examples

### Email Notification Plugin

```typescript
import { RepairOpsPlugin } from '@repairops/sdk'

const plugin: RepairOpsPlugin = {
  name: 'Email Notifications',

  handlers: {
    'ticket.transitioned': async (event) => {
      if (event.to_status === 'READY_FOR_PICKUP') {
        // Send customer pickup notification
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.sendgrid_key}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: event.customer.email }]
            }],
            from: { email: this.config.from_email },
            subject: `Your repair is ready for pickup (Ticket #${event.ticket.number})`,
            content: [{
              type: 'text/html',
              value: `Your device is ready to pick up. Total cost: $${event.ticket.total_cost}`
            }]
          })
        })
      }
    }
  }
}

export default plugin
```

### SMS Reminder Plugin

```typescript
const plugin: RepairOpsPlugin = {
  handlers: {
    'ticket.created': async (event) => {
      // Schedule SMS reminder for 24 hours before pickup
      const reminderTime = new Date(event.ticket.estimated_pickup)
      reminderTime.setDate(reminderTime.getDate() - 1)

      await this.api.scheduler.schedule('sms.send', {
        to: event.customer.phone,
        message: `Reminder: Your repair (${event.ticket.number}) will be ready for pickup tomorrow!`,
        scheduled_for: reminderTime.toISOString()
      })
    }
  }
}
```

## Best Practices

**Permissions:** Only request permissions you actually use. Users review these during install.

**Error handling:** Always handle API errors gracefully. Don't let one failure break the entire plugin.

**Logging:** Log important events for debugging. Use structured logging (JSON format).

**Performance:** Offload heavy operations to background jobs. Don't block the ticket update.

**Configuration:** Make your plugin configurable. Don't hardcode API keys or endpoints.

**Testing:** Write tests for your handlers. Test edge cases and error scenarios.

**Documentation:** Write a clear README with setup instructions and screenshots.

## Troubleshooting

**Plugin not installing**
- Check manifest.json syntax (must be valid JSON)
- Verify all required fields are present
- Check file permissions

**Handlers not firing**
- Verify event type name matches exactly
- Check plugin is enabled in settings
- Review plugin logs for errors

**API calls failing**
- Verify API key has correct permissions
- Check rate limits (1000 requests/hour)
- Review error response for details

## Related Documentation

- **[Developer Overview](/developer/)** — Plugin system overview
- **[Marketplace](/features/plugins/)** — Discover and install plugins
- **[Plugin Examples](https://github.com/repairops/plugin-examples)** — Sample plugins on GitHub
