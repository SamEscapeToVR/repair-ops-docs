---
title: Exporting Reports
---

# Exporting Reports

Every report in RepairOps can be exported as CSV (for spreadsheets) or PDF (for printing and filing). Export buttons appear at the top of any generated report.

---

## CSV Export

Click **Export CSV** on any generated report to download a `.csv` file.

### Format

- **Encoding:** UTF-8 with BOM (compatible with Excel, Google Sheets, and Numbers)
- **Delimiter:** Comma-separated
- **Headers:** First row contains column names
- **Numbers:** Raw numeric values (no currency symbols or formatting)
- **Dates:** ISO 8601 format (YYYY-MM-DD)

### What's Included

The CSV export contains the detail-level data from the report. Summary rows and subtotals are included as clearly labeled rows (e.g., "SUBTOTAL — Q1", "GRAND TOTAL").

### Tips for Spreadsheet Users

- **Excel:** Double-click the downloaded `.csv` file to open it directly. If numbers appear as text, use Excel's "Text to Columns" feature or import via Data → From Text/CSV.
- **Google Sheets:** Upload the CSV to Google Drive, then open with Google Sheets. Numbers and dates are automatically recognized.
- **Pivot tables:** The raw transaction data in CSV exports is ideal for building custom pivot tables. Use the Source, Payment Method, and Category columns as pivot dimensions.

---

## PDF Export

Click **Export PDF** on any generated report to download a formatted `.pdf` file.

### Format

- **Page size:** Letter (8.5" x 11") or A4, based on your browser locale
- **Orientation:** Landscape for wide reports (payment detail, daily breakdowns), portrait for summary reports
- **Branding:** Includes your shop name, address, and logo (if configured in white-label settings)

### What's Included

The PDF export mirrors what you see on screen, formatted for print:

- Report title and date range
- Shop name, address, and Tax ID (if configured)
- Summary section with key metrics
- Detail tables with zebra striping for readability
- Subtotals and grand totals
- Footer with generation timestamp, user who ran the report, and page numbers

### Tips for PDF Users

- **Filing with tax authority** — The Sales Tax and Fiscal Year Tax PDFs are designed to be submitted directly. They include your Tax ID and the level of detail most tax authorities require.
- **Sharing with your CPA** — Email the Fiscal Year Tax Report PDF to your accountant. It contains everything they need in a single document.
- **Archiving** — PDFs are saved in your report history. You can re-download any previously generated PDF from the Reports page without re-running the report.

---

## Report History

Every time you generate a report, RepairOps saves a record:

- **Report type** and parameters (date range, shop, etc.)
- **Who ran it** (user name and role)
- **When it was generated** (timestamp)
- **Export status** (whether CSV/PDF was downloaded)

Access your report history from **Reports → History** in the sidebar. You can re-run any previous report with the same parameters or download exports again.

---

## Bulk Export

Need to export multiple months or all shops at once? Use the **Bulk Export** option available on Monthly and Yearly reports:

1. Select the report type.
2. Toggle **Bulk Export** on.
3. Choose the date range (e.g., "All of 2025") and shops to include.
4. Click **Generate & Download**.

This produces a ZIP file containing individual CSV or PDF files for each shop/period combination. File names follow the pattern: `{shop-name}_{report-type}_{date-range}.csv`.

---

## Data Retention

Generated reports are retained for the lifetime of your account. Raw transaction data used to generate reports is never deleted as long as your organization is active. If you cancel your plan, data is retained in read-only mode for 30 days, then permanently deleted within 90 days per our [Terms of Service](/legal/terms-of-service/).
