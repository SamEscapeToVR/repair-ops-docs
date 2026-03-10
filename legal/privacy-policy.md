# Privacy Policy

**Effective Date:** March 10, 2026
**Last Updated:** March 10, 2026

RepairOps ("we," "us," or "our") operates the RepairOps platform, including the web application at app.repairops.com, customer portal, public status widgets, shop floor displays, REST API, and documentation site at docs.repairops.com (collectively, the "Service"). This Privacy Policy describes how we collect, use, disclose, and protect your personal information when you use our Service.

---

## 1. Definitions

- **Organization** — A repair shop business account registered on RepairOps, identified by a unique `org_id`.
- **Staff User** — An individual invited to an Organization with an assigned role (Owner, Manager, Front Desk, Tech, QC, Accounting, or Dispatcher).
- **Customer** — An end-customer of an Organization whose device is being serviced. Customers interact via the Customer Portal using token-based authentication.
- **Personal Data** — Any information that identifies or can reasonably be used to identify a natural person.
- **Data Controller** — The Organization that determines the purposes and means of processing Customer data.
- **Data Processor** — RepairOps, which processes Customer data on behalf of the Organization.

---

## 2. Information We Collect

### 2a. Information You Provide Directly

**Staff Users (Account Data):**
- Email address (used for magic-link authentication and notifications)
- Full name and display name
- Role assignment within the Organization
- Profile avatar (optional)
- Phone number (optional, for SMS notifications)
- Time zone and locale preferences

**Organization Owners (Billing Data):**
- Organization name, address, and phone number
- Billing contact email
- Payment method details (processed and stored by Stripe; we do not store full card numbers)
- Tax identification numbers (if provided for invoicing)

**Customers (Repair Data — collected by the Organization):**
- Full name, email address, phone number
- Device information (make, model, serial number, identifier)
- Issue description and category
- Photos and attachments uploaded during intake or diagnostics
- Signature capture (pickup authorization)
- Communication preferences (email, SMS, phone)
- Marketing consent status, timestamp, and source

### 2b. Information Collected Automatically

**Usage Data:**
- IP address, browser type, operating system, and device type
- Pages visited, features used, and timestamps of actions
- Referral URLs and search terms used within the application
- Session duration and interaction patterns

**Authentication Data:**
- Supabase Auth session tokens and refresh tokens
- OAuth provider tokens (Google) — used only for authentication, not stored long-term
- SSO/SAML assertion data (Enterprise tier only)
- Magic-link email delivery status

**Technical Data:**
- Error logs and crash reports
- API request metadata (endpoint, method, response code, latency)
- Background job execution logs (pg-boss worker)

### 2c. Information from Third Parties

- **Stripe:** Payment confirmation, subscription status, invoice history
- **AI Providers (when enabled):** Processed responses from OpenAI, Anthropic, Google, Groq, Mistral, or self-hosted Ollama — we transmit repair-related data to generate AI completions; provider data handling is governed by their respective privacy policies
- **iFixit:** Publicly available repair guide content (no personal data exchanged)
- **BuildCores:** Publicly available PC component data (no personal data exchanged)
- **Google OAuth:** Email address and profile name (with your consent during OAuth flow)

---

## 3. How We Use Your Information

We use collected information for the following purposes:

### 3a. Service Operation
- Authenticate users and manage sessions
- Process repair tickets through the workflow lifecycle (intake through closure)
- Deliver notifications via email, SMS, push, and in-app channels
- Generate invoices, receipts, and financial reports
- Manage subscriptions, billing, and plan enforcement
- Operate the Customer Portal for status tracking, quote approval, and payments

### 3b. AI Features (When Enabled by Organization)
- Parse intake data to auto-populate ticket fields
- Generate diagnostic suggestions and repair summaries
- Clean up technician notes for customer-facing communication
- Produce AI weekly insights for managers
- Power Knowledge Base Chat (RAG-based search and response)
- Generate custom PC build configurations (System Builder)

**Important:** AI features are opt-in at the Organization level. Organizations choose their AI add-on tier and whether to use bring-your-own-key (BYOK) or RepairOps-managed credits. When using managed credits, data is transmitted to third-party AI providers (OpenAI, Anthropic, Google) for processing. We do not use your data to train AI models.

### 3c. Security and Compliance
- Enforce Row-Level Security (RLS) to isolate tenant data
- Maintain audit logs of sensitive actions (secret reveals, payment changes, role modifications)
- Detect and prevent unauthorized access, fraud, and abuse
- Comply with legal obligations, law enforcement requests, and regulatory requirements

### 3d. Service Improvement
- Analyze aggregate usage patterns to improve features and performance
- Monitor system health, uptime, and error rates
- Conduct A/B testing on UI improvements (with anonymized data only)

---

## 4. Data Sharing and Disclosure

We do not sell your personal information. We share data only in these circumstances:

### 4a. With Your Organization
Staff Users can access Customer data within their Organization and Shop scope, subject to role-based permissions. Owners and Managers have the broadest access; Techs see only assigned tickets.

### 4b. Service Providers
We use the following categories of service providers:

| Provider | Purpose | Data Shared |
|----------|---------|-------------|
| **Supabase** | Database hosting, authentication, real-time subscriptions | All application data (encrypted at rest and in transit) |
| **Stripe** | Payment processing, subscription management | Billing contact, payment method tokens, invoice amounts |
| **Postmark** | Transactional email delivery | Recipient email, email content (invoices, notifications, magic links) |
| **Twilio** (or configured SMS provider) | SMS notifications | Recipient phone number, message content |
| **DigitalOcean / AWS** | Infrastructure hosting, S3 storage for backups | Application data, uploaded files, database backups |
| **AI Providers** (OpenAI, Anthropic, Google, Groq, Mistral) | AI task processing (when Organization enables AI features) | Ticket content, notes, diagnostic data — only the minimum required for the specific AI task |
| **Vercel** | Documentation site hosting | Access logs, IP addresses |

All service providers are bound by data processing agreements and are prohibited from using your data for their own purposes.

### 4c. Legal Requirements
We may disclose information when required by law, subpoena, court order, or government request, or when we believe disclosure is necessary to protect our rights, your safety, or the safety of others.

### 4d. Business Transfers
In the event of a merger, acquisition, or asset sale, your personal information may be transferred. We will notify affected users before their data is transferred and becomes subject to a different privacy policy.

---

## 5. Data Retention

| Data Type | Retention Period | Notes |
|-----------|-----------------|-------|
| **Active account data** | Duration of account | Deleted upon account closure request |
| **Closed tickets** | 7 years after closure | Required for warranty, tax, and legal compliance |
| **Audit logs** | 7 years | Immutable; required for compliance |
| **AI request/response logs** | 90 days (default) | Configurable per Organization (Enterprise tier) |
| **Communication logs** | 3 years | SMS, email, push delivery records |
| **Backups** | Per Organization retention policy | Default: 30 days; Enterprise: configurable up to 365 days |
| **Voided tickets** | 1 year after voiding | Then permanently deleted |
| **Customer portal tokens** | 90 days from issuance | Expired tokens are purged automatically |
| **Marketing consent records** | Duration of customer relationship + 3 years | Retained for audit compliance even after opt-out |

Organizations on the Enterprise tier can configure custom retention policies and request compliance exports (CSV/JSON) of all data associated with their organization.

---

## 6. Data Security

We implement industry-standard security measures:

### Technical Safeguards
- **Encryption at rest:** AES-256 for database storage (Supabase/Postgres); AES-256-GCM envelope encryption for secrets (API keys, provider credentials) using `REPAIROPS_DATA_KEY_B64`
- **Encryption in transit:** TLS 1.2+ for all connections (HTTPS, database, API)
- **Row-Level Security (RLS):** Postgres RLS policies enforce tenant isolation at the database level using `is_member()`, `has_shop_access()`, and `has_role()` helper functions
- **Authentication:** Passwordless magic-link (primary), optional password, Google OAuth, SAML 2.0/OIDC (Enterprise)
- **Two-Factor Authentication (2FA):** Available for all Staff Users via TOTP authenticator apps

### Organizational Safeguards
- Role-based access control (RBAC) with 7 distinct roles and granular permission matrices
- Audit logging on all sensitive operations (write_audit_log trigger on every tenant table)
- Automated security linting in CI/CD pipeline
- Regular dependency vulnerability scanning
- Incident response procedures and breach notification protocols

### Infrastructure
- Hosted on SOC 2 Type II compliant infrastructure
- Database backups encrypted and stored in geographically separate regions
- DDoS protection and Web Application Firewall (WAF)
- Rate limiting on API endpoints and authentication attempts

---

## 7. Your Rights

Depending on your jurisdiction, you may have the following rights:

### 7a. All Users
- **Access** — Request a copy of your personal data
- **Correction** — Request correction of inaccurate data
- **Deletion** — Request deletion of your account and associated data (subject to retention requirements)
- **Portability** — Request your data in a machine-readable format (CSV/JSON export)
- **Opt-Out** — Unsubscribe from marketing communications at any time

### 7b. EU/EEA Residents (GDPR)
- **Right to Erasure** ("Right to be Forgotten") — Subject to legal retention obligations
- **Right to Restrict Processing** — Limit how we use your data while disputes are resolved
- **Right to Object** — Object to processing based on legitimate interests
- **Right to Withdraw Consent** — Withdraw consent for marketing or AI processing at any time
- **Right to Lodge a Complaint** — With your local Data Protection Authority

### 7c. California Residents (CCPA/CPRA)
- **Right to Know** — What personal information we collect, use, and disclose
- **Right to Delete** — Request deletion of personal information
- **Right to Opt-Out of Sale** — We do not sell personal information
- **Right to Non-Discrimination** — We will not discriminate against you for exercising your rights
- **Categories of Information Collected:** Identifiers, commercial information, internet activity, professional information, and inferences drawn from these categories

### 7d. Exercising Your Rights
To exercise any of these rights, contact us at **privacy@repairops.app**. We will respond within 30 days (or sooner if required by applicable law). We may ask you to verify your identity before processing your request.

Organizations can exercise data subject rights on behalf of their customers through the Settings > Compliance > Data Export panel, or by contacting us directly.

---

## 8. Marketing and Communications

### Consent Model
RepairOps uses an **opt-in consent model** for all marketing communications. Marketing consent is:
- **Never pre-checked** — All consent checkboxes default to unchecked
- **Captured with timestamp and source** — We record when and where consent was given (intake wizard, customer portal, quote approval, staff profile edit, or POS)
- **Separately managed from transactional communications** — Service notifications (repair status updates, appointment reminders, invoice receipts) are sent regardless of marketing consent
- **Revocable at any time** — Customers can opt out via the portal preferences page, unsubscribe links, or by requesting through the Organization

### Communication Channels
- **Email:** Transactional (magic links, status updates, invoices) and marketing (promotions, seasonal offers)
- **SMS:** Status updates, pickup reminders, appointment confirmations
- **Push Notifications:** In-app alerts for Staff Users
- **Slack:** Webhook notifications (Staff only, configured per Organization)

---

## 9. Children's Privacy

RepairOps is not directed to children under 16. We do not knowingly collect personal information from children. If you believe we have inadvertently collected data from a child, please contact us at **privacy@repairops.app** and we will promptly delete it.

---

## 10. International Data Transfers

RepairOps is based in the United States. If you access the Service from outside the United States, your data may be transferred to, stored in, and processed in the United States. We rely on:
- Standard Contractual Clauses (SCCs) for EU/EEA data transfers
- Data Processing Agreements (DPAs) with all sub-processors
- Adequacy decisions where applicable

Enterprise customers may request data residency in specific regions. Contact **sales@repairops.app** for details.

---

## 11. Cookies and Tracking

RepairOps uses the following cookies and similar technologies:

| Cookie | Purpose | Duration | Type |
|--------|---------|----------|------|
| `sb-access-token` | Supabase authentication session | Session | Strictly Necessary |
| `sb-refresh-token` | Supabase session renewal | 7 days | Strictly Necessary |
| `theme` | Dark/light mode preference | 1 year | Functional |
| `sidebar-collapsed` | UI state preference | 1 year | Functional |
| `shop-context` | Active shop selection | Session | Functional |

We do **not** use third-party advertising cookies, tracking pixels, or behavioral advertising tools. We do **not** participate in cross-site tracking or ad networks.

Analytics (when implemented) will use privacy-respecting, first-party analytics only. No data is shared with Google Analytics, Facebook Pixel, or similar services.

See our [Cookie Policy](/legal/cookie-policy/) for full details.

---

## 12. Third-Party Links

The Service may contain links to third-party websites or services (e.g., iFixit repair guides, BuildCores component data, Stripe billing portal). We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing personal information.

---

## 13. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of material changes by:
- Posting the updated policy on this page with a new "Last Updated" date
- Sending an email to Organization Owners for significant changes
- Displaying an in-app banner for changes that affect your rights

Your continued use of the Service after changes are posted constitutes acceptance of the updated policy.

---

## 14. Data Processing Addendum

Organizations that require a Data Processing Addendum (DPA) for GDPR, CCPA, or other regulatory compliance can access our standard DPA at [Data Processing Addendum](/legal/dpa/). Enterprise customers may negotiate custom DPA terms.

---

## 15. Contact Us

For privacy inquiries, data subject requests, or complaints:

- **Email:** privacy@repairops.app
- **Postal Mail:** RepairOps, Attn: Privacy Team, [Address]
- **Data Protection Officer:** dpo@repairops.app (for EU/EEA inquiries)
- **Response Time:** Within 30 days of receipt

For general support: **support@repairops.app**
For sales inquiries: **sales@repairops.app**
