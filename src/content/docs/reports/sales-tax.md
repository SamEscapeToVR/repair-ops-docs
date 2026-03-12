---
title: Sales Tax Report
---

# Sales Tax Report

The Sales Tax Report gives you a complete breakdown of taxable and non-taxable revenue, total tax collected, and per-category tax details for any date range. It's the report you'll use most often when filing sales tax with your state or local tax authority.

---

## Running the Report

1. Navigate to **Reports → Sales Tax** in the sidebar.
2. Select your **shop** (if you have multiple locations).
3. Choose a **date range** — preset options include current month, last month, current quarter, last quarter, or custom dates.
4. Click **Generate Report**.

The report loads in-page with a summary at the top and detailed breakdowns below.

---

## What's Included

### Summary Section

The top of the report shows headline numbers for the selected period:

- **Total Revenue** — All completed sales (invoices + POS) within the date range.
- **Taxable Revenue** — Revenue subject to tax (excludes tax-exempt customers and non-taxable service categories).
- **Non-Taxable Revenue** — Revenue from tax-exempt customers or tax-exempt service categories.
- **Tax Collected** — Total sales tax collected across all transactions.
- **Effective Tax Rate** — Tax collected divided by taxable revenue, shown as a percentage.

### Tax by Category

Revenue and tax are broken down by service tax category:

| Category | Description |
|----------|-------------|
| **Labor Only** | Service charges for labor (no parts) |
| **Parts Only** | Parts sold without associated labor |
| **Labor & Parts** | Combined service + parts transactions |
| **Tax Exempt** | Transactions flagged as non-taxable |

Each category row shows: transaction count, revenue, tax collected, and percentage of total.

### Tax-Exempt Transactions

A separate section lists all transactions where tax was not collected, along with the reason (tax-exempt customer, exempt service category, or zero-rate item). This helps you verify that exemptions are being applied correctly.

---

## Multi-Tax Support

If your shop has both a primary and secondary tax rate configured (e.g., state tax + county tax), the report breaks out each tax separately:

- **Primary Tax** — Your main sales tax rate (e.g., "State Tax" at 6.25%).
- **Secondary Tax** — Additional local or county tax (e.g., "County Tax" at 1.5%).
- **Combined Tax** — Total of both rates.

See [Tax Configuration](/reports/tax-configuration/) to set up your tax rates and labels.

---

## Revenue Sources

The report combines revenue from both sources automatically:

- **Repair Invoices** — Generated from the ticket workflow when a repair is completed and paid.
- **POS Sales** — Walk-in sales processed through the Point of Sale terminal.

Detail rows include a "Source" indicator so you can distinguish between the two.

---

## Common Uses

- **Monthly sales tax filing** — Run for the previous month, export CSV, and submit to your state tax portal.
- **Quarterly filing** — Select the quarter preset for states that require quarterly returns.
- **Audit preparation** — The detail view provides transaction-level evidence of tax collection.
- **Tax-exempt verification** — Review the exempt section to ensure no taxable sales were incorrectly marked exempt.

---

## Exporting

Click **Export CSV** for a spreadsheet-ready file or **Export PDF** for a formatted document suitable for filing. See [Exporting Reports](/reports/exporting/) for details on export formats.
