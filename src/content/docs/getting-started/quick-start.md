---
title: "Quick Start Guide"
description: "Set up your RepairOps account and onboard your shop in 15 minutes"
sidebar:
  order: 1
---

Get your RepairOps account up and running in 15 minutes.

## Step 1: Create Your Account

1. Go to **repairops.app** and click **"Sign Up"**
2. Enter your email address
3. Check your inbox for the magic link (valid for 24 hours)
4. Click the link — you're logged in, no password needed
   - Optional: Create a password on the next screen if you prefer password login

> **Note:** RepairOps uses magic-link authentication by default. You'll receive a new login link each time you sign in, or you can opt into password authentication in your settings.

## Step 2: Onboarding Wizard

After login, you'll see the **Onboarding Wizard**. This takes about 10 minutes:

<img src="/images/gifs/settings-walkthrough-light.gif" alt="RepairOps settings configuration walkthrough — general, shop, team, billing, branding, and tax settings" class="gif-demo light-only" loading="lazy" />
<img src="/images/gifs/settings-walkthrough-dark.gif" alt="RepairOps settings configuration walkthrough — general, shop, team, billing, branding, and tax settings" class="gif-demo dark-only" loading="lazy" />

<img src="/images/screenshots/light/desktop/settings-general.png" alt="RepairOps Settings showing general organization configuration" class="screenshot light-only" loading="lazy" />
<img src="/images/screenshots/dark/desktop/settings-general.png" alt="RepairOps Settings showing general organization configuration" class="screenshot dark-only" loading="lazy" />

### 2a. Organization Details
- **Organization Name** — Your repair shop name (e.g., "Tech Repair Pro")
- **Industry** — Select "Electronics Repair"
- **Timezone** — Defaults to your browser timezone; adjust if needed

### 2b. Shop Location
- **Shop Name** — Name of this location (e.g., "Main Shop" or "Downtown Location")
- **Address** — Street, city, state, zip
- **Phone** — Shop phone number for customer communication
- **Hours** — Operating hours (used for appointment availability)

### 2c. Service Categories
Add the main services your shop offers. Examples:
- Phone Repair
- Laptop Repair
- Gaming Console Repair
- Water Damage Recovery
- Screen Replacement

You can add more services later — this is just to get started.

### 2d. Notification Preferences
- **Email notifications** — Alerts for ticket updates (you can customize this per user)
- **SMS notifications** — Text reminders (requires SMS credits; see [Plans and Billing](/getting-started/plans-and-billing/))

### 2e. Review & Confirm
Review your setup and click **"Complete Setup"**. You're now in the RepairOps dashboard.

## Step 3: Invite Your Team

Your first ticket goes much smoother with team members. Invite them now:

<img src="/images/screenshots/light/desktop/settings-team.png" alt="RepairOps Team settings showing team member management" class="screenshot light-only" loading="lazy" />
<img src="/images/screenshots/dark/desktop/settings-team.png" alt="RepairOps Team settings showing team member management" class="screenshot dark-only" loading="lazy" />

1. Click **Settings** → **Team** in the top navigation
2. Click **"Invite Team Member"**
3. Enter their email address
4. Select their role (see [Team Setup](/getting-started/team-setup/) for role explanations)
5. Click **"Send Invite"**
6. They'll receive an email with a link. Once they accept, they can log in

**Recommended first team:**
- **Manager** — You (or another owner/manager)
- **Technician** — At least one person to process repairs
- **Front Desk** — If you have someone handling customer intake
- **QC Specialist** — If you do quality checks before pickup

> **Note:** You can change roles anytime. Start simple and adjust as your workflow develops.

## Step 4: Configure Service Catalog (Optional)

Your shop likely has pricing and standard services. Add them:

1. Go to **Settings** → **Services**
2. Click **"Add Service"**
3. Enter:
   - Service name (e.g., "Screen Replacement - iPhone 14")
   - Category (from your onboarding)
   - Base labor cost
   - Typical turnaround time
   - Whether it requires parts ordering
4. Click **"Save"**

Repeat for 5–10 common services. You can customize pricing per ticket later.

> **Tip:** You don't need to add every possible service. Technicians can create custom line items in quotes. These are just templates for speed.

## Step 5: Configure Notifications

Keep your team informed without overwhelming them:

1. Go to **Settings** → **Notifications**
2. Enable notifications you want:
   - **Ticket status changes** (e.g., "Alert me when a ticket enters QC")
   - **New assignments** (tech gets notified of new work)
   - **Approval requests** (customer portal link sent)
   - **Messages** (team chat in tickets)
   - **Shift reminders** (optional; prompts team to clock in)
3. Set **Quiet Hours** to avoid late-night alerts
4. Select notification channels:
   - **In-app** (always on)
   - **Email** (recommended for urgent items)
   - **SMS** (uses SMS credits; see billing)
   - **Slack** (if you use Slack; optional integration)

Each team member can customize their own notification preferences in their profile.

## Step 6: Create Your First Ticket

Ready to test the system? Create a sample ticket:

1. Click **"New Ticket"** (blue button in the top-right corner)
2. Fill in:
   - **Customer Name** — Use a test name (e.g., "John Smith")
   - **Phone/Email** — Your own contact info (you'll approve the quote)
   - **Device Type** — e.g., "iPhone 14"
   - **Issue** — e.g., "Cracked screen"
   - **Photos** — Optional; you can take photos or upload
   - **Consent** — Check the box (customer agrees to terms)
3. Click **"Create Ticket"**

You now have a ticket with a unique ID (e.g., **#REP-001**). It's in the **INTAKE** status.

## Step 7: Move Through the Workflow

Now move this test ticket through the entire flow to see how it works:

### Triage (Manager assigns tech)
1. Find your ticket on the **Kanban board** (click the ticket card)
2. Click **"Move to Triage"**
3. Select a technician to assign
4. Click **"Confirm"**

### Diagnostics (Tech investigates)
1. Click the ticket card again
2. Click **"Start Diagnostics"**
3. Add diagnostic findings (notes or checklist)
4. Upload evidence (photos of the damage, test results, etc.)
5. Click **"Complete Diagnostics"** → ticket moves to **WAITING_APPROVAL**

### Create Quote (Tech or Manager)
1. Click **"Add Line Items"**
2. Add parts and labor:
   - Parts: e.g., "iPhone 14 Screen - $80"
   - Labor: e.g., "2 hours @ $50/hr = $100"
3. Click **"Send Quote to Customer"**
   - Customer gets an email with a link to the customer portal
   - They can approve or request changes

### Approval (You, as customer)
1. Check your email for the approval link
2. Click it (opens customer portal)
3. Review the quote
4. Click **"I Approve"**
   - Ticket moves to **APPROVED** status
   - Your team is notified

### Repair (Tech logs work)
1. Technician clicks **"Start Repair"**
2. Logs parts used (tracks inventory)
3. Logs hours worked (tracks labor)
4. Adds notes about the repair
5. When done, clicks **"Send to QC"** → **QC_REVIEW** status

### QC (Verification)
1. QC specialist reviews the repair
2. Runs verification checklist (e.g., "Screen responds", "No water damage")
3. If OK: clicks **"QC Pass"** → **READY_FOR_PICKUP**
4. If issues: clicks **"QC Fail"** → returns to **IN_REPAIR** for rework

### Pickup (Payment & Completion)
1. Customer arrives to pick up device
2. Click **"Process Pickup"**
3. Enter payment method (cash, card, customer portal payment link)
4. Capture signature (use tablet or print receipt)
5. Click **"Complete"**
   - Ticket moves to **PICKED_UP**
   - Invoice is generated and emailed
   - Ticket can now be archived

## Step 8: Explore the Dashboard

Now that you've seen the workflow, explore the dashboard:

<img src="/images/screenshots/light/desktop/dashboard.png" alt="RepairOps Dashboard showing KPIs and recent tickets" class="screenshot light-only" loading="lazy" />
<img src="/images/screenshots/dark/desktop/dashboard.png" alt="RepairOps Dashboard showing KPIs and recent tickets" class="screenshot dark-only" loading="lazy" />

- **Kanban Board** — See all tickets by status at a glance
- **My Work** — Tasks assigned to the logged-in user
- **Calendar** — Appointment availability (if using booking)
- **Reports** — Revenue, turnaround time, technician productivity
- **Settings** — Organization, shop, team, integrations

## Next Steps

- **[Your First Ticket](/getting-started/your-first-ticket/)** — Deep dive into each workflow stage
- **[Team Setup](/getting-started/team-setup/)** — Understand roles and permissions
- **[Plans and Billing](/getting-started/plans-and-billing/)** — Explore paid features and credits
- **[User Guide by Role](/user-guide/)** — Detailed workflows for each position
- **[Features](/features/)** — AI chat, booking, POS, analytics, and more

## Troubleshooting

**Q: I didn't receive the magic link email.**
- Check spam folder
- Ask support to resend at **support@repairops.app**

**Q: Can I add more shops later?**
- Yes! Go to **Settings** → **Shops** → **"Add Location"** (Pro tier and up)

**Q: What if I want to use password login?**
- Go to **Settings** → **Security** → **"Enable Password Login"**
- Then you can sign in with email + password instead of magic links

**Q: How do I delete a test ticket?**
- Go to the ticket, click **"Options"** → **"Void Ticket"**
- Voided tickets are marked void but kept for audit purposes

**Q: What's included in my plan?**
- See [Plans and Billing](/getting-started/plans-and-billing/) for a full comparison

---

**You're ready!** Your RepairOps shop is live. The next section ([Your First Ticket](/getting-started/your-first-ticket/)) walks you through the complete flow in detail.

