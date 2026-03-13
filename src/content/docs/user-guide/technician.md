---
title: "Technician Workflow"
description: "Diagnostics, repair logging, parts tracking, time management"
sidebar:
  order: 3
---

You're the heart of the repair operation. Your job is to diagnose devices accurately, execute repairs efficiently, and document everything. This guide walks you through your daily workflow — from receiving assignments to handing off to QC.

## Your Key Responsibilities

1. **Queue Management:** Review assigned work, prioritize by deadline
2. **Diagnostics:** Test devices, identify issues, document findings
3. **Repair Logging:** Record all work, parts used, and time spent
4. **Parts Tracking:** Request parts, manage inventory, track usage
5. **Time Management:** Clock in/out, log hours, track efficiency
6. **Handoff:** Prepare devices for QC review

---

## My Queue: Reviewing Your Daily Work

Your queue is personalized — it shows only tickets assigned to you.

### Accessing Your Queue

1. Log in and go to **Dashboard**
2. Click **"My Queue"** (left sidebar)
3. Or click the **assignment icon** with your name

### Understanding Your Queue

You'll see:

| Column | What It Means |
|--------|--------------|
| **Ticket #** | Unique repair ID (e.g., #REP-042) |
| **Device** | What's being repaired (iPhone 14, Dell Laptop, etc.) |
| **Issue** | Customer's description (Cracked screen, Won't boot) |
| **Status** | Current workflow stage (DIAGNOSTICS, IN_REPAIR, etc.) |
| **Time in Queue** | How long this ticket has been assigned to you |
| **Priority** | Normal, High, or Urgent (set by manager) |
| **Assigned By** | Who assigned you this work |

<img src="/images/screenshots/light/desktop/tech-queue.png" alt="RepairOps Technician Queue showing assigned repair tickets" class="screenshot light-only" loading="lazy" />
<img src="/images/screenshots/dark/desktop/tech-queue.png" alt="RepairOps Technician Queue showing assigned repair tickets" class="screenshot dark-only" loading="lazy" />

### Work Through Your Queue

**Priority order:**
1. **High/Urgent** tickets first (fastest turnaround, high-value devices)
2. **Oldest tickets** next (been waiting longest)
3. **Routine repairs** last (standard, low-pressure items)

**Each morning:**
1. Open your queue
2. Identify 3-5 tickets you'll complete today
3. Move them to "In Progress" (tells manager you're working on them)
4. Close completed ones at day's end

> **Tip:** Focus on one device at a time. Multi-tasking in repairs leads to forgotten steps and mistakes. Complete one, mark it done, grab the next.

---

## Diagnostics: Investigating the Issue

Diagnostics is your chance to understand what's wrong. This phase is crucial — accurate diagnosis leads to accurate quotes, happy customers, and fewer reworks.

### Step 1: Open the Ticket

1. Click the ticket from your queue
2. Scroll to **"Diagnostics"** section
3. Click **"Start Diagnostics"** (if not already started)

<img src="/images/screenshots/light/desktop/diagnostics.png" alt="RepairOps Diagnostics view with checklist and evidence upload" class="screenshot light-only" loading="lazy" />
<img src="/images/screenshots/dark/desktop/diagnostics.png" alt="RepairOps Diagnostics view with checklist and evidence upload" class="screenshot dark-only" loading="lazy" />

### Step 2: Run the Diagnostic Checklist

Your shop has pre-built checklists (e.g., for phone screens, water damage, battery issues). Use them:

1. Click **"Load Diagnostic Template"** (if available)
2. Work through the checklist:
   - Power on/off?
   - Does the screen respond?
   - Any physical damage?
   - Any water damage signs?
   - Buttons working?
   - Speaker/mic clear?
3. Check boxes as you verify each point

> **Why checklists?** They ensure you don't miss anything, and they're legal protection. Customers see them, showing you were thorough.

### Step 3: Document Your Findings

**In Plain Text:**
- "Screen cracked with hairline fracture from bottom-right corner to edge. Device powers on, touchscreen is partially responsive but unreliable in damaged area. No other damage. Recommend screen replacement."

**Include:**
- What's broken (specific, not vague)
- What's working (rules out related issues)
- Any warnings (e.g., "Water damage risk if opened without proper tools")
- Estimated fix difficulty and timeline

### Step 4: Upload Evidence (Photos & Attachments)

Photos are gold. They help managers build accurate quotes and protect you in disputes.

**Best practices:**
- **Macro shot** of the damage (closeup showing cracks, water marks, etc.)
- **Wide shot** of the whole device (context)
- **Diagnostic results** (if you have test equipment photos)
- **Before/after** (take after pictures too, if time allows)

**Upload:**
1. Click **"Add Attachment"** or **"Take Photo"**
2. Choose file or snap a photo with your phone
3. Add a caption: "Cracked screen — bottom-right corner"
4. Click **"Upload"**

### Step 5: Provide a Summary

At the bottom, write a summary a manager (or customer) can understand:

**Example:**
"iPhone 14 screen cracked from corner impact. Device functions normally but display is difficult to use in damaged area. Recommend genuine Apple screen replacement. Estimated labor: 45 minutes. Parts: $120. Total: $170 (plus labor $50/hr)."

**What to include:**
- Root cause (impact, water exposure, age, etc.)
- Impact on functionality (cosmetic only vs. critical)
- Recommended fix
- Estimated timeline and cost range

### Step 6: Move to WAITING_APPROVAL

Click **"Complete Diagnostics"** → Manager will build the quote → Device moves to **WAITING_APPROVAL**.

> **Note:** You don't build the quote. Front Desk or Manager does. Your job is diagnosis. Their job is pricing and customer communication.

---

## Repair Logging: Documenting Your Work

Once the customer approves the quote (and parts arrive, if needed), you'll move into active repair.

### Step 1: Start the Repair

1. Find your ticket in the queue
2. Click **"Start Repair"** (or it auto-starts when moved to IN_REPAIR status)
3. You now see the **Repair Log** form

<img src="/images/screenshots/light/desktop/ticket-detail.png" alt="RepairOps Ticket Detail showing repair logs, parts used, and timeline" class="screenshot light-only" loading="lazy" />
<img src="/images/screenshots/dark/desktop/ticket-detail.png" alt="RepairOps Ticket Detail showing repair logs, parts used, and timeline" class="screenshot dark-only" loading="lazy" />

### Step 2: Log Parts Used

As you use parts, log them:

1. Click **"Add Part Used"**
2. Search for the part (or create a new one):
   - Part name: "iPhone 14 Screen"
   - Quantity: 1
   - Cost: $120 (from inventory)
3. System auto-tracks inventory
4. Repeat for each part

**Examples:**
- Screen replacement: 1 x $120 screen
- Battery repair: 1 x $35 battery + adhesive
- Board-level repair: Solder, components, etc.

> **Inventory tip:** If a part isn't in your system, ask your manager to add it. Don't guess costs — accuracy feeds financial reports.

### Step 3: Log Work Hours

Track time spent on this device:

1. Click **"Add Work Session"**
2. Enter:
   - **Start time:** When you started (auto-fills with now)
   - **End time:** When you finished (or leave blank if ongoing)
   - **Description:** What you did (e.g., "Replaced screen, tested touchscreen, re-assembled")
   - **Notes:** Any complications (e.g., "Adhesive was very strong, took extra care")
3. System calculates hours and cost (based on hourly rate)

**Example:**
| Task | Start | End | Hours | Description |
|------|-------|-----|-------|-------------|
| iPhone 14 screen replacement | 10:00 AM | 10:45 AM | 0.75 | Removed old screen, applied new adhesive, tested response |
| Testing | 10:45 AM | 11:00 AM | 0.25 | Full touchscreen test, corner sensitivity check, all good |
| | | **Total** | **1.0** | |

### Step 4: Add Notes Throughout

As you work, jot down notes:

- "Screen adhesive was damaged; reinforced with new adhesive"
- "Tested in sunlight — response excellent"
- "Customer requested case installation; declined, offered to recommend case brand"

These notes help QC, managers, and future-you if the device comes back.

### Step 5: Complete the Repair

When you're done:

1. Do a final test of the device (charge it, test all functions)
2. Click **"Complete Repair"** or **"Send to QC"**
3. Ticket moves to **QC_REVIEW** — a manager or QC specialist will verify

> **Important:** Always send to QC, even if you're confident. QC catches issues early and is your legal protection ("I tested it and QC verified it").

---

## Time Tracking and Clocking In/Out

Many shops use the Time Clock feature to track hours and attendance.

### Clocking In

1. Start of shift: Click **"Clock In"** (usually on dashboard or in your profile)
2. System records start time and location (if using mobile)
3. You can add notes: "On-site at shop" or "Working from back bench"

### Clocking Out

1. End of shift: Click **"Clock Out"**
2. System records end time, calculates hours, calculates pay (if hourly)

### Manual Time Entry

If the clock feature isn't used or you forgot to clock in:

1. Go to **Settings** → **Time Clock**
2. Click **"Add Manual Entry"**
3. Enter start/end times
4. Your manager can see and approve

### Viewing Your Hours

Go to **My Profile** → **Time & Pay**:
- Hours worked this week
- Hours this month
- Estimated pay (if paid hourly)
- PTO balance (if available)

---

## Parts Management: Requesting and Ordering

You'll often need parts. Here's how to request them.

### Checking Inventory

1. Go to **Supplies** → **Inventory**
2. Search for a part (e.g., "iPhone 14 Screen")
3. See:
   - Quantity in stock
   - Reorder level (when stock is low)
   - Average cost
   - Supplier

If in stock, take it from inventory. If low or out of stock, request an order.

<img src="/images/screenshots/light/desktop/inventory.png" alt="RepairOps Inventory management showing parts stock levels and reorder points" class="screenshot light-only" loading="lazy" />
<img src="/images/screenshots/dark/desktop/inventory.png" alt="RepairOps Inventory management showing parts stock levels and reorder points" class="screenshot dark-only" loading="lazy" />

### Requesting a Part

1. If a part is low/out of stock, click **"Request Order"**
2. System sends a notification to your manager
3. Manager orders from vendor
4. When it arrives, it's added back to inventory

### Special Orders (Not in Inventory)

If a customer needs a rare part:

1. Click **"Request New Part"**
2. Provide:
   - Part name (e.g., "Rare 2019 MacBook Pro logic board")
   - Supplier (if you know one)
   - Estimated cost
   - Urgency (standard, rush, etc.)
3. Manager will source and quote to customer

> **Pro Tip:** Don't spec a part before asking the customer if they want to pay for it. Rare parts can be expensive. Manager builds the quote; customer approves.

---

## Your Dashboard and KPIs

RepairOps tracks your performance. Check it regularly to stay on track.

### Key Metrics

Go to **Dashboard** → **My Stats**:

| Metric | What It Means |
|--------|--------------|
| **Tickets Completed This Week** | How many repairs you've finished |
| **Avg Repair Time** | Average hours per device (track improvement) |
| **On-Time Rate** | % of devices finished by target date |
| **Rework Rate** | How many times QC failed a device (lower is better) |
| **Parts Waste** | $ of parts damaged/wasted (minimize this) |
| **Hours Logged** | Total work hours (verify accuracy) |

### Achievements & Badges

Earn badges for milestones:
- **100 Repairs** — Silver badge
- **0% rework rate (10+ tickets)** — Quality champion
- **Perfect attendance** — Gold badge
- **Fastest iPhone repair** — Speed demon

These are fun, not competitive. No toxic leaderboards here — it's about personal improvement.

---

## Troubleshooting During Repair

### Device Won't Power On

1. Try charging for 30 minutes
2. Check for liquid damage indicators (red = water exposure)
3. If still won't power on, note it in findings: "Device unresponsive to charging; suspected deep discharge or board-level issue. Recommend diagnostics by certified technician."
4. Alert your manager — this might be a higher-tier repair

### Customer Changed Their Mind

1. Manager will contact you if customer cancels
2. If repair hasn't started: Return device, void ticket
3. If repair has started: Manager negotiates with customer (refund, partial credit, etc.)
4. You focus on your next ticket

### You Discover Additional Damage

1. Stop work
2. Alert your manager: "Found liquid damage inside the case. Original quote was just screen. Recommend customer approval for additional diagnostics."
3. Manager will update customer and quote
4. Wait for approval before continuing

### Parts Arrived Damaged

1. Check-in at receiving and note: "Screen arrived with cracked corner. Refuse shipment."
2. Notify your manager
3. Manager coordinates with vendor for replacement
4. Mark the ticket with a note: "Waiting for parts replacement"

---

## Quality Tips for QC Success

Here's how to avoid QC failures (rework):

1. **Test before sending to QC.** Power on, test all buttons, check speakers, run apps, test display. Take 5 minutes.

2. **Clean the device.** Remove dust, fingerprints, temporary labels. It shows you care.

3. **Document everything.** Photos before, during, and after. QC will ask "Did you test this?"

4. **Use genuine parts when possible.** Cheap screens often fail QC. Ask your manager.

5. **Follow assembly guides.** Cables in wrong spots = QC fail. Take time, don't rush.

6. **Document deviations.** If you had to improvise, note it: "Original screw was stripped; used larger diameter screw instead." Transparency helps.

7. **Don't cut corners.** That final 5-minute test isn't optional. It catches 80% of issues before QC.

---

## Working with Your Manager

Your manager is your support and dispatcher.

**Use them for:**
- Unclear diagnostics (ask before guessing)
- Parts sourcing (let them handle vendor calls)
- Difficult repairs (second opinion)
- Customer communication (they'll relay changes)
- Conflict resolution (if a customer disputes a repair)

**Keep them updated:**
- Close your queue items when done
- Leave notes in tickets if there's anything they should know
- Flag urgent items (e.g., "Customer coming back at 3 PM")
- Report inventory issues (running low on screens)

---

## Best Practices

1. **One device at a time.** Start to finish before moving to the next.

2. **Organize your workspace.** Parts, tools, and the device should be within arm's reach.

3. **Use manufacturer guides when available.** Apple repair guides, iFixit, YouTube — they're your friends.

<img src="/images/screenshots/light/desktop/repair-guides.png" alt="RepairOps iFixit Repair Guides integrated into the workflow" class="screenshot light-only" loading="lazy" />
<img src="/images/screenshots/dark/desktop/repair-guides.png" alt="RepairOps iFixit Repair Guides integrated into the workflow" class="screenshot dark-only" loading="lazy" />

4. **Take breaks between intense work.** Fresh eyes catch mistakes.

5. **Keep detailed notes.** Future-you will thank you if the device comes back.

6. **Photo + document every repair.** Evidence is your protection.

7. **Test thoroughly.** Don't be the person who ships a device that fails one day later.

8. **Ask questions.** If you don't know how to repair something, ask before guessing.

9. **Log time honestly.** Don't pad hours or skimp. Accurate logs help your manager and your shop's finances.

10. **Respect the device.** It's someone's property and livelihood. Treat it with care.

---

## Quick Reference: Workflow Steps

```
1. Check My Queue → Sort by priority
2. Select a ticket → Click "Start" or "Open"
3. Run Diagnostics → Use checklist, take photos, document findings
4. Complete Diagnostics → Move to WAITING_APPROVAL (manager builds quote)
5. Approve Received → Ticket moves to APPROVED or WAITING_ON_PARTS
6. Start Repair → Log parts, log work sessions, take notes
7. Test Device → Power on, test all functions
8. Send to QC → Ticket moves to QC_REVIEW
9. (If QC Pass) Done! → Move to next ticket
10. (If QC Fail) Rework → Fix issues, send back to QC
```

---

## Support

- **Not sure how to repair something?** Ask your manager or check the Knowledge Base
- **Confused about diagnostics?** Re-read the "Diagnostics" section or ask a senior tech
- **Questions about inventory/parts?** Ask your manager
- **Need to clock in/out?** See "Time Tracking" section or ask manager

---

**Version:** 1.0.0
**Last Updated:** March 2026
**Role:** Technicians, Diagnostics Specialists, Field Service Reps
