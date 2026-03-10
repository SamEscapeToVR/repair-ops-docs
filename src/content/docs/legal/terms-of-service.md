---
title: Terms of Service
description: The agreement governing your use of RepairOps, including billing, data ownership, acceptable use, and dispute resolution.
---

**Effective Date:** March 10, 2026
**Last Updated:** March 10, 2026

These Terms of Service ("Terms") govern your access to and use of the RepairOps platform, including the web application, customer portal, REST API, documentation, plugins, and any related services (collectively, the "Service") provided by RepairOps ("we," "us," or "our").

By creating an account, accessing the Service, or using any feature of the platform, you agree to be bound by these Terms. If you are accepting these Terms on behalf of a company or other legal entity ("Organization"), you represent that you have the authority to bind that entity.

---

## 1. Eligibility

You must be at least 18 years old and capable of forming a binding contract to use the Service. The Service is intended for business use by repair shops, IT service providers, and similar organizations. It is not directed at consumers for personal use.

---

## 2. Account Registration

### 2a. Account Creation
To use the Service, an Organization Owner must create an account by providing a valid email address. Authentication is primarily via passwordless magic links, with optional password, Google OAuth, or SAML/OIDC SSO (Enterprise tier).

### 2b. Account Responsibilities
- You are responsible for maintaining the security of your account credentials
- You are responsible for all activities that occur under your account or Organization
- You must promptly notify us of any unauthorized use at **security@repairops.app**
- You must provide accurate and current information and keep it updated
- Each Staff User must have their own account; shared accounts are prohibited

### 2c. Roles and Permissions
Organization Owners can invite Staff Users and assign roles (Owner, Manager, Front Desk, Tech, QC, Accounting, Dispatcher). Each role has specific permissions as documented in our [Role Permissions Reference](/reference/permissions/). The Organization Owner is responsible for managing role assignments appropriately.

---

## 3. Subscription Plans and Billing

### 3a. Plans
RepairOps offers three subscription tiers:

| Plan | Monthly | Annual | Key Limits |
|------|---------|--------|------------|
| **Starter** | $49/mo | $470/yr | 150 tickets/mo, 3 users, 1 shop |
| **Pro** | $99/mo | $950/yr | Unlimited tickets, 15 users, 5 shops |
| **Enterprise** | $199/mo | $1,910/yr | Unlimited everything, SSO, white-label, API access |

Plan details, features, and limits are described in our [Feature Matrix](/reference/feature-matrix/) and [Plans & Billing Guide](/getting-started/plans-and-billing/).

### 3b. Free Trial
New Organizations receive a 14-day free trial with 50 AI credits. No payment method is required to start the trial. At the end of the trial, you must select a paid plan to continue using the Service. If you do not subscribe, your account will be placed in a read-only state for 30 days, after which data may be deleted.

### 3c. Billing
- Subscriptions are billed in advance on a recurring monthly or annual basis via Stripe
- You authorize us to charge your payment method on file for all applicable fees
- Prices are in US dollars and exclusive of taxes unless stated otherwise
- Annual plans are billed as a single upfront payment with a discount

### 3d. AI Add-Ons and Credits
AI features require a separate add-on purchase:

| Add-On | Cost | Credits/Month |
|--------|------|---------------|
| AI Ready | $79/mo | 0 (BYOK only) |
| AI Assist | $79/mo | 200 managed |
| AI Copilot | $149/mo | 500 managed |
| Enterprise AI | Included | Unlimited |

Credit packs (100/$15, 500/$60, 1,000/$100) can be purchased separately. Credits are non-refundable and expire after 12 months of inactivity.

### 3e. Plan Changes
- **Upgrades** take effect immediately; prorated charges apply for the remainder of the billing period
- **Downgrades** take effect at the end of the current billing period; you retain access to higher-tier features until then
- If a downgrade would cause you to exceed the lower plan's limits (e.g., more users or shops than allowed), you must reduce usage before the downgrade takes effect

### 3f. Cancellation and Refunds
- You may cancel your subscription at any time from Settings > Billing
- Cancellation takes effect at the end of the current billing period
- No refunds are issued for partial billing periods, except where required by applicable law
- Upon cancellation, your data is retained in read-only mode for 30 days, then permanently deleted unless you request an export

---

## 4. Acceptable Use

### 4a. Permitted Use
The Service is provided for lawful repair shop management operations, including ticket management, customer communication, inventory tracking, billing, reporting, and related business activities.

### 4b. Prohibited Conduct
You agree not to:

- Use the Service for any unlawful purpose or in violation of any applicable laws or regulations
- Attempt to gain unauthorized access to other Organizations' data or any system, network, or server connected to the Service
- Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of the Service
- Interfere with or disrupt the integrity or performance of the Service or the data contained therein
- Upload or transmit viruses, malware, or other malicious code
- Use the Service to send unsolicited commercial messages (spam) in violation of applicable anti-spam laws (CAN-SPAM, GDPR, TCPA)
- Resell, sublicense, or redistribute access to the Service without our written consent
- Use automated scripts, bots, or scrapers to access the Service outside of our documented REST API
- Circumvent any rate limits, plan limits, or access restrictions
- Store or process data subject to specific regulatory requirements (HIPAA, PCI-DSS Level 1, ITAR) without a separate compliance agreement
- Use AI features to generate harmful, deceptive, or illegal content

See our [Acceptable Use Policy](/legal/acceptable-use/) for the full policy.

### 4c. Enforcement
We reserve the right to suspend or terminate accounts that violate these Terms, with or without notice. For non-critical violations, we will provide 5 business days' notice to cure the violation before suspension.

---

## 5. Customer Data and Multi-Tenancy

### 5a. Data Ownership
Your Organization retains all ownership rights to the data you input into the Service ("Customer Data"). We do not claim any ownership rights to Customer Data.

### 5b. License Grant
You grant us a limited, non-exclusive license to use, process, and store Customer Data solely for the purpose of providing and improving the Service. This license terminates when you delete your data or close your account.

### 5c. Multi-Tenant Isolation
RepairOps is a multi-tenant platform. Each Organization's data is logically isolated using:
- Organization-scoped identifiers (`org_id`) on all data records
- Row-Level Security (RLS) policies enforced at the database level
- Role-based access controls (RBAC) within each Organization

We will not access your Customer Data except as necessary to provide the Service, respond to support requests (with your permission), or comply with legal obligations.

### 5d. Data Processing
We process Customer Data as a Data Processor on behalf of your Organization (the Data Controller). Our data processing practices are described in our [Privacy Policy](/legal/privacy-policy/) and [Data Processing Addendum](/legal/dpa/).

---

## 6. AI Features

### 6a. AI Data Handling
When your Organization enables AI features:
- Repair-related data (ticket content, notes, diagnostics) is transmitted to third-party AI providers for processing
- We transmit only the minimum data necessary for the specific AI task
- AI providers are contractually prohibited from using your data to train their models
- AI responses are not stored beyond the configured retention period (default: 90 days)

### 6b. BYOK (Bring Your Own Key)
Organizations using the AI Ready add-on provide their own API keys for AI providers. In this mode:
- Data is transmitted directly to the configured provider using your credentials
- You are responsible for reviewing and accepting the AI provider's terms of service
- RepairOps does not have access to your API keys after encryption (AES-256-GCM envelope encryption)

### 6c. AI Disclaimers
- AI-generated content (diagnostics suggestions, customer summaries, build recommendations) is provided as assistance and should be reviewed by qualified staff before acting on it
- We do not guarantee the accuracy, completeness, or suitability of AI-generated content
- AI features may be temporarily unavailable due to third-party provider outages

---

## 7. Plugins and Marketplace

### 7a. RepairOps Plugins
Free and Pro plugins developed by RepairOps are covered by these Terms and receive the same support and security guarantees as core features.

### 7b. Third-Party Plugins
Plugins submitted by third-party developers through the Plugin SDK are subject to:
- Review and approval by RepairOps before marketplace listing
- The third-party developer's own terms of service and privacy policy
- Capability-based sandboxing that restricts plugin access to authorized data and APIs

RepairOps is not responsible for third-party plugin functionality, data handling, or availability. Install third-party plugins at your own discretion.

### 7c. Plugin SDK License
The RepairOps Plugin SDK is provided under a developer license that permits creating plugins for the RepairOps marketplace. Developers retain ownership of their plugin code but grant RepairOps a license to distribute it through the marketplace.

---

## 8. REST API

### 8a. API Access
REST API access is available on the Enterprise tier. API keys can be scoped to Read, Write, or Admin permissions and are subject to rate limits documented in our [API Reference](/developer/api-reference/).

### 8b. API Usage
- API access is subject to the same acceptable use restrictions as the web application
- You must not exceed documented rate limits (currently 1,000 requests/minute for Enterprise)
- API keys must be stored securely and rotated periodically
- We reserve the right to revoke API keys that are used in violation of these Terms

### 8c. API Changes
We will provide at least 30 days' notice before making breaking changes to API endpoints. Non-breaking additions (new fields, new endpoints) may be made without notice.

---

## 9. Intellectual Property

### 9a. Our IP
The Service, including its design, code, features, documentation, brand marks, and underlying technology, is the exclusive property of RepairOps and its licensors. These Terms do not grant you any rights to our trademarks, service marks, or trade dress.

### 9b. Your IP
You retain ownership of all Customer Data and any content you create using the Service. RepairOps claims no ownership of your repair documentation, customer records, invoices, or other business content.

### 9c. Feedback
If you provide suggestions, feature requests, or other feedback about the Service, we may use it without obligation or compensation to you.

---

## 10. White-Label Branding (Enterprise)

Enterprise customers may customize the Service with their own branding (custom domain, logo, colors, email templates). When using white-label branding:
- You may not remove or obscure the "Powered by RepairOps" attribution unless specifically authorized in your Enterprise agreement
- You are responsible for ensuring your branding does not infringe third-party trademarks
- Custom domains must be properly configured with SSL certificates

---

## 11. Self-Hosted Deployment (Enterprise)

Enterprise customers may deploy RepairOps on their own infrastructure using the Docker Compose stack. When self-hosting:
- You are responsible for server security, backups, updates, and compliance
- We provide the software "as is" for self-hosted deployments
- Support for self-hosted installations is limited to configuration guidance and bug fixes in the RepairOps application itself
- You must maintain a valid Enterprise subscription to run the self-hosted deployment

---

## 12. Service Level and Support

### 12a. Uptime
We target 99.9% uptime for the hosted Service, measured monthly. Scheduled maintenance windows are announced at least 48 hours in advance and do not count against uptime calculations.

### 12b. Support
- **Starter:** Community support, documentation, email support (48-hour response)
- **Pro:** Priority email support (24-hour response), access to knowledge base
- **Enterprise:** Dedicated support, custom SLA, phone support available

### 12c. Data Backups
We perform automated database backups. Organizations can configure backup retention and export settings. See our [Backups & Exports](/admin/backups/) documentation. We are not liable for data loss resulting from your failure to maintain adequate backups of data that you control.

---

## 13. Warranty Disclaimer

THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.

WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT ANY DEFECTS WILL BE CORRECTED. WE DO NOT WARRANT THE ACCURACY OR RELIABILITY OF AI-GENERATED CONTENT.

---

## 14. Limitation of Liability

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL REPAIROPS, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICE.

OUR TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATED TO THESE TERMS OR THE SERVICE SHALL NOT EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO US IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100).

THESE LIMITATIONS APPLY REGARDLESS OF THE LEGAL THEORY ON WHICH THE CLAIM IS BASED, WHETHER WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND WHETHER A REMEDY FAILS OF ITS ESSENTIAL PURPOSE.

---

## 15. Indemnification

You agree to indemnify, defend, and hold harmless RepairOps and its officers, directors, employees, and agents from any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from:
- Your use of the Service
- Your violation of these Terms
- Your violation of any applicable law or third-party rights
- Customer Data that you input into the Service
- Third-party plugins that you install or develop

---

## 16. Termination

### 16a. By You
You may close your account at any time from Settings > Billing > Cancel Subscription. Data will be retained in read-only mode for 30 days, then permanently deleted.

### 16b. By Us
We may suspend or terminate your account:
- Immediately, for material breach of these Terms (including non-payment, security violations, or prohibited conduct)
- With 30 days' notice, for convenience or discontinuation of the Service
- Immediately, if required by law or to protect the safety and security of other users

### 16c. Effect of Termination
Upon termination:
- Your right to access the Service ceases immediately
- We will provide data export capability for 30 days (unless terminated for abuse)
- Provisions that by their nature should survive termination (liability, indemnification, dispute resolution) will survive

---

## 17. Dispute Resolution

### 17a. Governing Law
These Terms are governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions.

### 17b. Arbitration
Any dispute arising from these Terms or the Service shall be resolved by binding arbitration administered by the American Arbitration Association (AAA) under its Commercial Arbitration Rules. The arbitration shall be conducted in English and the arbitral award shall be final and binding.

### 17c. Exceptions
Either party may seek injunctive or other equitable relief in any court of competent jurisdiction to protect its intellectual property rights or confidential information.

### 17d. Class Action Waiver
You agree that any dispute resolution proceedings will be conducted only on an individual basis and not as a class, consolidated, or representative action.

---

## 18. General Provisions

### 18a. Entire Agreement
These Terms, together with the Privacy Policy, Acceptable Use Policy, Cookie Policy, and any applicable DPA or Enterprise agreement, constitute the entire agreement between you and RepairOps.

### 18b. Severability
If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in full force and effect.

### 18c. Waiver
Our failure to enforce any provision of these Terms shall not be deemed a waiver of that provision or any other provision.

### 18d. Assignment
You may not assign or transfer your rights under these Terms without our prior written consent. We may assign our rights and obligations without restriction.

### 18e. Force Majeure
Neither party shall be liable for failure to perform obligations due to circumstances beyond reasonable control, including natural disasters, war, terrorism, pandemics, power outages, internet failures, or government actions.

### 18f. Notices
We will send notices to the email address associated with your Organization Owner account. You may send notices to **legal@repairops.app**.

---

## 19. Changes to These Terms

We may modify these Terms at any time. We will provide at least 30 days' notice of material changes by email and in-app notification. Your continued use of the Service after the effective date of changes constitutes acceptance of the modified Terms. If you do not agree to the modified Terms, you must cancel your subscription before the effective date.

---

## 20. Contact Us

For questions about these Terms:

- **Email:** legal@repairops.app
- **Support:** support@repairops.app
- **Postal Mail:** RepairOps, Attn: Legal, [Address]
