---
title: Reports
---

# Reports

RepairOps includes a full suite of financial reports designed for repair shop owners, managers, and accountants. Every report is available on **all plans** (Starter, Pro, Enterprise) — because filing taxes and tracking revenue shouldn't be a premium feature.

---

## Available Reports

### Revenue & Sales

- **[Day Report](/reports/day-report/)** — Labor and parts revenue for a single day, with individual transaction details.
- **[Day Range Sales Report](/reports/sales-reports/)** — Custom date range sales with daily breakdown, trends, and averages.
- **[Monthly / Quarterly / Yearly Sales](/reports/sales-reports/#periodic-sales-reports)** — Periodic revenue summaries with prior-period comparison.

### Payments

- **[Payment Type Summary](/reports/payment-reports/)** — Revenue grouped by payment method (cash, card, check, store credit) for any date range.
- **[Payment Type Detail](/reports/payment-reports/#detail-report)** — Every transaction listed, grouped by payment method.
- **[Monthly Payment Type Report](/reports/payment-reports/#monthly-report)** — Month-over-month payment method trends.

### Tax & Compliance

- **[Sales Tax Report](/reports/sales-tax/)** — Taxable vs. non-taxable revenue, tax collected, per-category breakdown.
- **[Fiscal Year Tax Report](/reports/fiscal-year/)** — Full fiscal year summary with monthly and quarterly subtotals for CPA filing.

### Setup & Configuration

- **[Tax Configuration](/reports/tax-configuration/)** — Set your shop's tax rates, labels, fiscal year, and Tax ID.
- **[Exporting Reports](/reports/exporting/)** — Download any report as CSV or PDF.

---

## Key Concepts

### Per-Shop Reporting

All reports are scoped to individual shops. If you operate multiple locations (Pro and Enterprise plans), each shop generates its own reports with its own tax rates and fiscal year settings. Organization-level roll-ups are available on Monthly, Quarterly, and Yearly reports.

### Combined Revenue Sources

Reports automatically combine revenue from two sources: repair invoices (generated from the ticket workflow) and POS sales (point-of-sale transactions). You'll see a "Source" column on detail reports so you can distinguish between the two.

### Role-Based Access

Report access is controlled by your staff role:

| Role | Access |
|------|--------|
| **Owner** | All reports, all shops |
| **Manager** | All reports for assigned shops |
| **Accounting** | All reports for assigned shops |
| **Front Desk** | Day Report only (current shop) |
| **Tech / QC / Dispatcher** | No report access |

### Report History

Every time a report is generated, RepairOps saves a run record with the parameters used, who ran it, and when. You can re-run any previous report from the Reports page.

---

## Getting Started

1. **Configure your tax settings** — Go to **Shop Settings → Tax Configuration** and set your default tax rate, labels, and fiscal year start month. See [Tax Configuration](/reports/tax-configuration/).
2. **Run your first report** — Navigate to **Reports** in the sidebar and pick any report type. Select your date range and click **Generate**.
3. **Export for your accountant** — Click **Export CSV** or **Export PDF** on any generated report. See [Exporting Reports](/reports/exporting/).
