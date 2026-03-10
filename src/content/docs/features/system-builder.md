---
title: "System Builder"
description: "Build custom PC configurations with retail pricing and affiliate links"
sidebar:
  order: 3
---

System Builder enables your shop to design, quote, and sell custom computer systems to customers. With AI-assisted component selection, 31K+ components at your fingertips, and compatibility checking built-in, your team can create professional builds quickly.

## Getting Started

System Builder is available on **all tiers** (Starter, Pro, Enterprise). Advanced features like AI-assisted build generation require an **AI add-on** or **Enterprise AI**.

Navigate to **Shop** → **System Builder** to access:
- **Create Build** — Start a new custom system
- **My Builds** — Draft and completed builds
- **Curated Catalog** — Admin-managed templates and popular builds
- **Templates** — Predefined build patterns by use case

## Creating a Custom Build

### Manual Build Creation

To manually select components:

1. Click **Create Build**
2. Select a **Use Case** (optional): Gaming, Workstation, Server, Budget, Streaming, etc.
3. Enter a **Build Name** (e.g., "RTX 4080 Gaming Rig")
4. Add components by category:
   - Processor (CPU)
   - Motherboard
   - Memory (RAM)
   - Storage (SSD/HDD)
   - Graphics Card (GPU)
   - Power Supply (PSU)
   - Case
   - Cooling
   - Peripherals (monitor, keyboard, mouse)

### Component Selection

When adding a component:

1. Click **Add [Component Type]**
2. Search by name, brand, or model number (e.g., "RTX 4080", "Ryzen 7 5800X")
3. View full specs: socket, TDP, memory type, form factor, storage interface
4. Compare prices across sources (if available)
5. Click **Add to Build** to select the component

**Component Database:** The database includes 31K+ components from BuildCores, updated weekly with:
- New product releases
- Pricing updates
- Stock status
- Availability by region

### Component Compatibility Checking

RepairOps validates compatibility automatically:

| Check | Details |
|-------|---------|
| **Socket Compatibility** | CPU socket must match motherboard socket |
| **Memory Type** | RAM DDR version (DDR4/DDR5) must match motherboard |
| **Form Factor** | Case must fit motherboard size (ATX, Micro-ATX, Mini-ITX) |
| **Power Supply** | PSU wattage must exceed estimated system power draw (with 30% headroom) |
| **Storage Interface** | SSD/HDD interface must match available slots |
| **Cooling Clearance** | CPU cooler height must fit case |
| **Connector Availability** | Sufficient USB/PCIe slots for all peripherals |

Incompatibilities appear as **warnings** (yellow) or **errors** (red):
- **Warnings** — Non-critical issues (e.g., RGB fans without RGB header)
- **Errors** — Blocking issues preventing system assembly

Fix errors before saving or sharing the build.

### AI-Assisted Build Generation

With an **AI add-on** or **Enterprise AI**, use AI to automatically generate builds:

1. Click **Generate with AI**
2. Select **Use Case** (Gaming, Workstation, etc.)
3. Set **Budget** (e.g., $2,500)
4. Optionally specify preferences:
   - Brand preferences (Intel vs AMD, NVIDIA vs AMD GPU)
   - Performance tier (budget, mid-range, high-end)
   - Special requirements (quiet, compact, quiet, etc.)
5. Click **Generate**

AI generates 3 build options ranked by value. Review specs and compatibility, then select your preferred option or manually adjust components.

AI generation uses your configured provider (OpenAI, Anthropic, Google, Groq, or Mistral) and deducts credits from your AI budget.

## Build Management

### Viewing & Editing Builds

Your drafts and completed builds appear in **My Builds**. For each build you can:

- **View Details** — See component list, specs, power usage, estimated cost
- **Edit** — Modify components, swap parts, adjust quantities
- **Share** — Generate a customer-facing link (portal view)
- **Save as Template** — Turn this build into a reusable template
- **Duplicate** — Copy this build as a starting point for a similar system
- **Export** — Download as PDF with component list and prices
- **Delete** — Remove the build

### Build Specifications

Every build shows:

- **Total Cost** — Sum of component prices (may be out-of-date; confirm with vendors)
- **Estimated Power Usage** — Calculated system wattage (CPU TDP + GPU TDP + overhead)
- **Performance Tier** — Estimated gaming/workstation performance category
- **Component Count** — Number of parts in the build
- **Compatibility Status** — Pass/warnings/errors

### Sharing with Customers

Generate a customer-facing build link:

1. Click **Share** on the build
2. Select expiration (7 days, 30 days, never)
3. Copy the portal link
4. Send to customer via email

Customers can:
- View the complete build with photos and specs
- See total cost and expected performance
- Request modifications (reply to the shared build)
- Approve the build (creates a repair ticket)

Customers can access shared builds from the **Customer Portal** without logging in.

## Curated Builds Catalog

The **Curated Builds Catalog** is a marketplace of pre-approved, popular builds managed by admins:

- **Browse by category** — Gaming, Workstations, Streaming, Office, Budget
- **Filter by price range** — $500–$1000, $1000–$2000, $2000+
- **View specs and reviews** — See customer feedback and use cases
- **Add to My Builds** — Duplicate a curated build to customize for a customer

### Managing Curated Builds (Admin Only)

Organization owners and managers can:

1. Navigate to **Shop** → **System Builder** → **Manage Curated Catalog**
2. Click **Add Curated Build**
3. Either create new or select an existing build to promote
4. Add a **description** (use case, highlights, target audience)
5. Set **featured** status (appears at top of catalog)
6. Save

Curated builds help customers discover popular options and speed up the sales process.

## Templates

**Build Templates** are predefined patterns for common use cases:

### Default Templates
- Gaming (budget, mid-range, high-end)
- Workstations (CAD, video editing, 3D rendering)
- Streaming (single-GPU, multi-GPU)
- Servers (quiet, cost-optimized, performance)
- Office (silent, space-saving)

### Creating Custom Templates

1. Complete a build you're satisfied with
2. Click **Save as Template**
3. Enter a **template name** (e.g., "1440p Streaming Rig")
4. Write a **description** for your team
5. Save

Templates are shop-wide; all team members can access them. Use templates to standardize builds and speed up quoting.

## Shop Inventory Integration

Link builds to your shop's parts inventory:

1. Navigate to **Inventory** → **Settings**
2. Enable **System Builder Integration**
3. Map your part SKUs to BuildCores components
4. RepairOps automatically flags when selected components are in stock

This is useful if you maintain a pre-built parts inventory. Customers can see at-a-glance which builds you can assemble immediately.

## Affiliate Configuration

If you're an affiliate for retailers (Amazon Associates, Newegg Affiliate, etc.):

1. Navigate to **Shop** → **System Builder** → **Affiliate Settings**
2. Enter your affiliate IDs for supported retailers
3. When generating build links, component prices include your affiliate markup
4. Track affiliate revenue in the dashboard

RepairOps currently supports:
- Amazon Associates
- Newegg Affiliate
- Curry's Electronics (Currys)

Contact support for additional affiliate programs.

## Tier Availability

| Feature | Starter | Pro | Enterprise |
|---------|:-------:|:---:|:----------:|
| Create custom builds | ✓ | ✓ | ✓ |
| Component selection (31K+ DB) | ✓ | ✓ | ✓ |
| Compatibility checking | ✓ | ✓ | ✓ |
| Manual part selection | ✓ | ✓ | ✓ |
| AI-assisted generation (with AI add-on) | ✓* | ✓* | ✓* |
| Build templates | ✓ | ✓ | ✓ |
| Share with customers | ✓ | ✓ | ✓ |
| Curated catalog (browse) | ✓ | ✓ | ✓ |
| Manage curated catalog (admin) | — | — | ✓ |
| Affiliate program integration | ✓ | ✓ | ✓ |
| Inventory integration | — | ✓ | ✓ |

*Requires an AI add-on or Enterprise AI

## Related Features

- **[AI Gateway](/features/ai-gateway/)** — Configure AI provider for build generation
- **[Analytics](/features/analytics/)** — Track build sales and customer preferences
- **[Customer Portal](/user-guide/customer-portal/)** — Share builds and collect customer approval
