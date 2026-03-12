---
title: Payment Type Reports
---

# Payment Type Reports

Payment Type Reports break down your revenue by how customers paid — cash, credit/debit card, check, store credit, or other methods. These reports help you reconcile payment processors, track cash handling, and understand customer payment preferences.

---

## Payment Type Summary

A high-level view of revenue grouped by payment method for any date range.

### Running the Report

1. Navigate to **Reports → Payment Type Summary** in the sidebar.
2. Select your **shop**.
3. Set the **start date** and **end date**.
4. Click **Generate Report**.

### What's Included

One row per payment method:

| Column | Description |
|--------|-------------|
| **Payment Method** | Cash, Card, Check, Store Credit, Stripe, Other |
| **Transaction Count** | Number of transactions using this method |
| **Revenue** | Total revenue collected via this method |
| **Tax** | Tax collected on these transactions |
| **% of Total** | This method's share of total revenue |

The summary also shows a total row at the bottom and a visual bar chart of payment method distribution.

### Common Uses

- **Cash drawer reconciliation** — Compare the "Cash" total against your physical drawer count.
- **Card processor reconciliation** — Match the "Card" total against your merchant processor settlement report.
- **Stripe reconciliation** — Match "Stripe" totals against your Stripe dashboard payouts.
- **Payment trend tracking** — See if customers are shifting from cash to card over time.

---

## Detail Report

Every individual transaction listed and grouped by payment method. This is the report to run when you need to find a specific transaction or verify a disputed payment.

### Running the Report

1. Navigate to **Reports → Payment Type Detail** in the sidebar.
2. Select your **shop** and **date range**.
3. Click **Generate Report**.

### What's Included

Transactions are grouped under payment method headers. Each transaction row shows:

| Column | Description |
|--------|-------------|
| **Date/Time** | When the transaction was completed |
| **Reference** | Ticket number or POS receipt number |
| **Customer** | Customer name or "Walk-in" |
| **Source** | Invoice or POS |
| **Amount** | Transaction amount before tax |
| **Tax** | Tax collected |
| **Total** | Amount including tax |

Each payment method group has a subtotal row, and there's a grand total at the bottom of the report.

### Tips

- **Finding a disputed charge** — Use the Detail Report for the date in question. Filter or search by customer name or reference number to locate the exact transaction.
- **Cash discrepancy investigation** — If the Summary Report shows a cash total that doesn't match your drawer, the Detail Report lists every cash transaction so you can identify the discrepancy.

---

## Monthly Report

Month-over-month payment method trends. Shows how payment method distribution changes over time.

### Running the Report

1. Navigate to **Reports → Monthly Payment Type** in the sidebar.
2. Select your **shop** and the **number of months** to include (3, 6, or 12).
3. Click **Generate Report**.

### What's Included

A grid with months as columns and payment methods as rows:

|  | Jan 2026 | Feb 2026 | Mar 2026 | Trend |
|--|----------|----------|----------|-------|
| **Cash** | $4,200 | $3,800 | $3,500 | ↓ |
| **Card** | $8,100 | $8,900 | $9,200 | ↑ |
| **Check** | $600 | $450 | $500 | — |
| **Stripe** | $2,300 | $2,700 | $3,100 | ↑ |

The "Trend" column shows the direction of change (increasing, decreasing, or stable) based on a simple linear trend across the selected months.

### Common Uses

- **Identify payment shifts** — If card payments are increasing while cash is decreasing, you may want to optimize your card processing fees or negotiate better rates.
- **Seasonal patterns** — Some shops see more check payments from corporate clients in certain months.
- **Stripe adoption tracking** — If you recently enabled online payments via the customer portal, the Monthly Report shows how quickly customers are adopting it.

---

## Payment Methods

RepairOps tracks the following payment methods across both invoices and POS:

| Method | Source | Description |
|--------|--------|-------------|
| **Cash** | Invoice + POS | Physical cash payment |
| **Card** | Invoice + POS | Credit or debit card (in-person terminal) |
| **Check** | Invoice + POS | Paper check |
| **Store Credit** | POS | Store credit or gift card |
| **Stripe** | Invoice | Online payment via customer portal |
| **Other** | Invoice + POS | Any other payment method |

---

## Exporting

All payment reports support CSV and PDF export. See [Exporting Reports](/reports/exporting/) for format details.
