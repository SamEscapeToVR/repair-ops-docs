---
title: Migrate from PC Repair Tracker (PCRT)
description: Export data from PC Repair Tracker and import into RepairOps using the PCRT Migration Wizard.
---

# Migrating from PC Repair Tracker (PCRT) to RepairOps

This guide walks you through exporting your data from PC Repair Tracker and importing it into RepairOps using the built-in PCRT Migration Wizard.

---

## Before You Start

**What you'll need:**

- Access to your PCRT MySQL database (phpMyAdmin, MySQL Workbench, or command-line MySQL)
- An active RepairOps account with **Owner** role
- At least one shop already created in RepairOps
- 15–30 minutes (depending on data volume)

**What gets imported:**

| PCRT Data | RepairOps Destination | Notes |
|-----------|----------------------|-------|
| Customers (`pc_group`) | Customers | Deduplicated by phone or email |
| Devices (`pc_owner`) | Devices | Linked to their customers |
| Work Orders (`pc_wo`) | Tickets | Imported as CLOSED by default |
| Notes (`pc_wo_notes`) | Ticket Events | Attached to their tickets |
| Statuses (`pc_status`) | Status mapping only | Mapped to RepairOps statuses |
| Users (`pc_users`) | User mapping only | Optionally linked to team members |
| Stores (`pc_stores`) | Shop routing only | Routes work orders to the right shop |

**What does NOT get imported:**

- Passwords, PINs, or authentication data (security risk — never imported)
- Payment/receipt data (different billing model)
- Photos and file attachments (PCRT stores these locally on disk)
- Inventory quantities (different inventory model)
- POS register data
- RepairFlow overlay data (planned for a future update)

---

## Step 1: Export Your PCRT Data

You need to run 7 SQL queries against your PCRT MySQL database and save each result as a CSV file.

### Option A: Use the Export Scripts Page

Visit **[/migrate/pcrt](/migrate/pcrt)** in your browser. This page lists all 7 queries with copy-to-clipboard buttons and a "Download .sql" option.

### Option B: Run the Queries Manually

Open phpMyAdmin (or your MySQL client) and run each query below. Export each result as a CSV file.

#### 1. Stores (optional — but recommended for multi-location shops)

```sql
SELECT storeid, storename, storesname, storeaddy1, storeaddy2,
       storecity, storestate, storezip, storephone, storeemail,
       storedefault, storeenabled
FROM pc_stores
ORDER BY storeid;
```

Save as: `stores.csv`

#### 2. Customers (required)

```sql
SELECT pcgroupid, pcgroupname, grpphone, grpemail
FROM pc_group
ORDER BY pcgroupid;
```

Save as: `customers.csv`

#### 3. Devices

```sql
SELECT pc.pcid, pc.pcgroupid, pc.pcname, pc.pcmake,
       g.pcgroupname, g.grpphone, g.grpemail
FROM pc_owner pc
LEFT JOIN pc_group g ON pc.pcgroupid = g.pcgroupid
ORDER BY pc.pcid;
```

Save as: `devices.csv`

#### 4. Work Orders (required)

```sql
SELECT wo.woid, wo.pcid, wo.storeid, wo.pcstatus,
       wo.probdesc, wo.technotes, wo.dropdate, wo.assigneduser,
       s.storename AS store_name,
       st.boxtitle AS status_name,
       pc.pcname AS device_name,
       pc.pcmake AS device_make,
       g.pcgroupname AS customer_name,
       g.grpphone, g.grpemail
FROM pc_wo wo
LEFT JOIN pc_stores s ON wo.storeid = s.storeid
LEFT JOIN pc_status st ON wo.pcstatus = st.statusid
LEFT JOIN pc_owner pc ON wo.pcid = pc.pcid
LEFT JOIN pc_group g ON pc.pcgroupid = g.pcgroupid
ORDER BY wo.woid;
```

Save as: `workorders.csv`

#### 5. Notes

```sql
SELECT noteid, woid, notetype, thenote, noteuser, notetime
FROM pc_wo_notes
ORDER BY woid, notetime;
```

Save as: `notes.csv`

#### 6. Users

```sql
SELECT userid, username, useremail, enabled
FROM pc_users
ORDER BY userid;
```

Save as: `users.csv`

#### 7. Statuses

```sql
SELECT statusid, boxtitle, displayedstatus, displayedorder
FROM pc_status
ORDER BY displayedorder;
```

Save as: `statuses.csv`

### Tips for Exporting

- **phpMyAdmin:** Run the query, then click **Export** → **CSV** → **Go**
- **MySQL Workbench:** Run the query, right-click the result grid → **Export Resultset** → **CSV**
- **Command line:** `mysql -u root -p pcrt_db -e "SELECT ..." | sed 's/\t/,/g' > file.csv`
- Make sure your CSV files use UTF-8 encoding
- Column headers must be in the first row

---

## Step 2: Open the Migration Wizard

1. Log in to RepairOps as an **Owner**
2. Go to **Settings** → **Imports** → **PCRT Migration** (or navigate directly to `/settings/imports/pcrt`)
3. Click **Get Started**

---

## Step 3: Upload CSV Files

Upload your exported CSV files. The wizard validates column headers against expected PCRT formats.

- **Customers** and **Work Orders** are required
- **Stores**, **Devices**, **Notes**, **Users**, and **Statuses** are optional but recommended for a complete migration
- Maximum file size: 50 MB per file
- The wizard auto-detects CSV delimiters (comma, tab, semicolon)

After uploading, you'll see row counts and any validation errors per file. Fix any errors before continuing.

---

## Step 4: Map Shops

This step routes your PCRT work orders to the correct RepairOps shop.

**If your PCRT has multiple stores** (stores.csv has 2+ rows): You'll see a mapping table. Each PCRT store name is paired with a dropdown of your RepairOps shops. The wizard pre-fills matches based on name similarity.

| PCRT Store | RepairOps Shop | Confidence |
|-----------|----------------|------------|
| Oceanside | Oceanside Shop | High |
| Encinitas | (select...) | None |

**If your PCRT has one store** (or no stores.csv): You'll see a single dropdown to select the target RepairOps shop for all imported data.

### Multi-Location Operators with Separate PCRT Databases

If you run a separate PCRT MySQL database for each location (common setup), run the export queries and wizard separately for each location. Customer deduplication ensures the same customer won't be created twice across locations (matched by phone or email).

---

## Step 5: Map Statuses

This step maps your PCRT status names to RepairOps ticket statuses.

The wizard auto-maps common status names:

| PCRT Status | RepairOps Status |
|------------|-----------------|
| Checked In | INTAKE |
| In Repair / In Progress | IN REPAIR |
| Waiting on Parts / Parts Ordered | WAITING ON PARTS |
| Ready for Pickup / Completed | READY FOR PICKUP |
| Picked Up / Delivered | PICKED UP |
| Cancelled | VOIDED |
| (unrecognized) | CLOSED |

You can override any mapping using the dropdown menus.

### Active vs. Historical Work Orders

By default, **all work orders are imported as CLOSED** (historical records). This is the safest option.

If you toggle **"Import active work orders with mapped status"**, work orders will be imported with their mapped RepairOps status (e.g., "In Repair" → IN_REPAIR). This is useful if you want to continue active repairs in RepairOps, but we recommend finishing active work in PCRT first to avoid workflow complications.

---

## Step 6: Map Users (Optional)

If you uploaded a users CSV, the wizard shows your PCRT usernames and lets you link them to existing RepairOps team members. This associates imported work orders and notes with the correct technician.

Unmapped users are recorded in ticket metadata for reference but not linked to a RepairOps profile.

---

## Step 7: Preview & Dry Run

Before importing, the wizard validates all your data:

- **Customers:** Total count, how many are new vs. already existing (deduplicated)
- **Devices:** Total count, any with missing customer links
- **Tickets:** Total count, any with missing device or shop mappings
- **Notes:** Total count, any with missing ticket links

Review the validation summary and any sample errors. If everything looks good, proceed to import.

---

## Step 8: Execute Migration

Click **Execute Migration** to begin the import. The wizard imports data in order:

1. **Customers** — new customers are created; existing matches (by phone/email) are reused
2. **Devices** — linked to their customers
3. **Tickets** — created with mapped status, linked to devices and shops
4. **Notes** — attached to their tickets as events

A progress indicator shows real-time counts for each entity. This may take a few minutes for large datasets (10,000+ records).

---

## Step 9: Review Results

After import, you'll see a summary card:

| Entity | Imported | Skipped | Errors |
|--------|----------|---------|--------|
| Customers | 1,247 | 83 | 0 |
| Devices | 2,891 | 12 | 3 |
| Tickets | 4,502 | 0 | 7 |
| Notes | 12,340 | 45 | 0 |

- **Imported:** Successfully created in RepairOps
- **Skipped:** Deduplicated (customers) or missing parent record (devices/notes)
- **Errors:** Failed to import — check the error details for specifics

---

## Rollback

Every PCRT migration can be fully reversed within **30 days**.

1. Go to **Settings** → **Imports** → **PCRT Migration**
2. Find your migration in the history section
3. Click **Rollback Migration**

Rollback deletes all records created by the import (notes → tickets → devices → customers) in reverse order. Customers that were matched via deduplication (already existed before import) are not deleted.

---

## Frequently Asked Questions

### Will my PCRT database be modified?

No. You're exporting read-only CSV copies. Your original PCRT database is never touched.

### Can I run the migration more than once?

Yes. Customer deduplication prevents duplicates. However, devices and tickets will be created again if you re-import without rolling back first. We recommend rolling back a previous import before re-running.

### What happens to my PCRT ticket numbers?

PCRT work order IDs (`woid`) are stored in each ticket's metadata for reference. RepairOps generates its own ticket codes (e.g., `MS-00042`) using your shop's code prefix. You can search for the original PCRT ID in ticket details.

### Can I import active work orders?

Yes, but it's not recommended. Active work orders bypass RepairOps workflow gates (intake photos, consent, diagnostics checklists) since that data doesn't exist in PCRT. They'll have a `ticket_imported` audit event noting they were imported without gate validation.

### How does customer deduplication work?

When importing a customer, the wizard checks if a customer with the same phone number or email address already exists in your RepairOps organization. If a match is found, the existing customer record is reused instead of creating a duplicate. This works across shops — if the same customer visits your Oceanside and Encinitas locations, they'll appear as one customer in RepairOps.

### What about the RepairFlow overlay?

If your shop uses RepairFlow (the `rf_` prefix tables), that data is not imported in this version. RepairFlow import is planned for a future update. Your core PCRT data (customers, devices, work orders, notes) imports normally.

### My PCRT uses custom status names I don't see in the auto-mapping. What do I do?

The status mapping step lets you manually assign any PCRT status to any RepairOps status using dropdown menus. Unrecognized statuses default to CLOSED, which is safe for historical data.

### How long does the import take?

- Small shops (< 1,000 work orders): under 1 minute
- Medium shops (1,000–10,000 work orders): 2–5 minutes
- Large datasets (10,000+ work orders): 5–15 minutes

Don't close the browser tab during import.

### Is there a file size limit?

Each CSV file can be up to 50 MB. For most PCRT shops, this is well beyond what's needed.

### I have multiple PCRT databases (one per location). How do I handle that?

Run the migration wizard once per database. Upload each location's CSVs and select the corresponding RepairOps shop. Customer deduplication ensures customers who appear at multiple locations are only created once.

---

## Troubleshooting

### "Missing required header" error on upload

Your CSV column names don't match the expected PCRT format. Make sure you're running the exact SQL queries provided — they produce the correct column headers. Check that your CSV export includes headers in the first row.

### "Customer pcgroupid not found" errors on devices

Some devices reference customers that don't exist in your customers CSV. This can happen if customers were deleted from PCRT but their devices remain. These devices are skipped.

### "Store not mapped" errors on work orders

Work orders reference a PCRT store that wasn't mapped to a RepairOps shop. Go back to the Map Shops step and ensure every store has a mapping.

### "Device pcid not found" errors on tickets

Work orders reference devices that weren't in your devices CSV or failed to import. Check your devices CSV for completeness.

### Import shows 0 imported, all errors

Check that your RepairOps shops exist and are properly set up. The import needs at least one active shop to route work orders to.

---

## Data Mapping Reference

### Customer Name Splitting

PCRT stores the full name in a single field (`pcgroupname`). RepairOps splits it:

| PCRT Name | First Name | Last Name |
|-----------|-----------|-----------|
| John Smith | John | Smith |
| Madonna | Madonna | (empty) |
| Mary Jane Watson | Mary | Jane Watson |

### Phone Number Normalization

Phone numbers are cleaned and standardized:

| PCRT Phone | RepairOps Phone |
|-----------|----------------|
| (555) 123-4567 | +15551234567 |
| 555.123.4567 | +15551234567 |
| 555-123-4567 | +15551234567 |
| 15551234567 | +15551234567 |

Numbers with fewer than 7 digits are treated as invalid and stored as null.

### Device Type Inference

The device type is inferred from the PCRT make field:

| PCRT Make Contains | Device Type |
|-------------------|-------------|
| Apple, Mac | Computer |
| iPhone, Samsung, Pixel, Phone | Phone |
| iPad, Tablet | Tablet |
| Printer | Printer |
| (anything else) | Computer |

---

## What's Next After Migration

Once your data is imported:

1. **Verify a few records** — spot-check some customers, devices, and tickets to make sure the data looks right
2. **Invite your team** — add your technicians and staff to RepairOps (PCRT users are mapped but not auto-invited)
3. **Set up your workflow** — configure your shop settings, notification preferences, and label printer
4. **Start taking new work orders** — use RepairOps for new intake going forward; your PCRT history is preserved for reference
5. **Consider rolling back** if anything looks wrong — you have 30 days
