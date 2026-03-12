---
title: Tax Configuration
---

# Tax Configuration

Before running tax reports, configure your shop's tax rates, labels, fiscal year, and Tax ID. These settings determine how tax is calculated on new transactions and how reports are grouped.

---

## Accessing Tax Settings

1. Navigate to **Shop Settings** (gear icon in the sidebar).
2. Click the **Tax Configuration** tab.
3. Update the fields below and click **Save**.

---

## Settings

### Default Tax Rate

Your primary sales tax rate, entered as a percentage (e.g., `6.25` for 6.25%). This rate is automatically applied to new quotes, invoices, and POS transactions unless overridden at the line-item level.

- **Field:** Default Tax Rate
- **Format:** Percentage with up to 4 decimal places (e.g., 6.25, 8.875)
- **Default:** 0.00 (no tax)

### Secondary Tax Rate

An optional second tax rate for jurisdictions that collect multiple taxes (e.g., state tax + county tax, or GST + PST). When configured, both taxes are calculated and shown separately on invoices and reports.

- **Field:** Secondary Tax Rate
- **Format:** Percentage with up to 4 decimal places
- **Default:** None (disabled)

### Tax Labels

Custom names for your tax rates. These labels appear on invoices, receipts, and reports.

- **Primary Tax Label** — e.g., "State Tax", "Sales Tax", "GST" (default: "Tax")
- **Secondary Tax Label** — e.g., "County Tax", "PST", "Local Tax" (default: "Tax 2")

### Fiscal Year Start Month

The month your fiscal year begins. This controls the date ranges used in the [Fiscal Year Tax Report](/reports/fiscal-year/) and affects quarterly grouping.

- **Field:** Fiscal Year Start Month
- **Options:** January through December
- **Default:** January (calendar year)

Common configurations: January (calendar year), April (UK/India), July (Australia/many US states), October (US federal).

### Tax ID

Your business tax identification number (EIN, GST number, VAT number, etc.). This is printed on invoices, receipts, and the Fiscal Year Tax Report PDF.

- **Field:** Tax ID
- **Format:** Free text (any format your jurisdiction requires)
- **Default:** None

---

## Service Tax Categories

Each service in your service catalog has a tax category that determines how tax is applied:

| Category | Behavior |
|----------|----------|
| **Labor & Parts** | Tax applied to the full amount (default) |
| **Labor Only** | Tax applied only to the labor portion |
| **Parts Only** | Tax applied only to the parts portion |
| **Tax Exempt** | No tax applied |

To change a service's tax category, go to **Shop Settings → Service Catalog** and edit the service.

---

## Tax-Exempt Customers

Individual customers can be marked as tax-exempt (e.g., government agencies, resale certificate holders, non-profits). When a tax-exempt customer is on a ticket or POS sale, tax is not calculated regardless of the service category.

To mark a customer as tax-exempt:
1. Go to the customer's profile.
2. Toggle **Tax Exempt** to on.
3. Optionally add their exemption certificate number in the notes.

Tax-exempt transactions appear in a separate section on the [Sales Tax Report](/reports/sales-tax/).

---

## Multi-Shop Tax Settings

Each shop maintains its own tax configuration. This is important because different locations may be in different tax jurisdictions with different rates. When you switch between shops, the tax settings reflect that shop's configuration.

If you need the same settings across all shops, you'll need to configure each one individually — there is no "copy settings" feature (yet).

---

## When Changes Take Effect

Tax rate changes apply to **new transactions only**. Existing quotes, invoices, and POS sales retain the tax rate that was in effect when they were created. This ensures your historical reports remain accurate.

If you need to correct the tax on an existing invoice, void and re-create it — do not edit the tax rate after the fact.

---

## Tips

- **Set this up before your first sale** — Tax configuration should be one of the first things you do after creating a shop.
- **Check with your accountant** — If you're unsure whether to use a secondary tax rate or how to categorize services, ask your CPA. Getting this right from the start saves headaches at tax time.
- **Fiscal year matters** — If your fiscal year doesn't start in January, set the start month now. Changing it later won't retroactively adjust historical fiscal year reports.
