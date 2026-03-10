# Data Processing Addendum (DPA)

**Effective Date:** March 10, 2026
**Last Updated:** March 10, 2026
**Version:** 1.0.0

This Data Processing Addendum ("DPA") supplements the RepairOps [Terms of Service](/legal/terms-of-service/) and [Privacy Policy](/legal/privacy-policy/) and governs the processing of personal data by RepairOps on behalf of the Organization.

This DPA applies automatically to all Organizations. Enterprise customers may negotiate additional terms.

---

## 1. Definitions

| Term | Definition |
|------|-----------|
| **Controller** | The Organization that determines the purposes and means of processing personal data through the Service |
| **Processor** | RepairOps, which processes personal data on behalf of the Controller |
| **Sub-processor** | A third party engaged by RepairOps to process personal data |
| **Data Subject** | An identifiable natural person whose personal data is processed (typically a Customer or Staff User) |
| **Personal Data** | Any information relating to an identified or identifiable natural person |
| **Processing** | Any operation performed on personal data (collection, storage, use, disclosure, erasure) |
| **Supervisory Authority** | An independent public authority responsible for monitoring data protection compliance (e.g., a national DPA in the EU) |
| **SCCs** | Standard Contractual Clauses adopted by the European Commission for international data transfers |

---

## 2. Roles and Scope

### 2a. Controller and Processor
- The **Organization** is the Controller of Customer personal data entered into the Service
- **RepairOps** is the Processor, acting on the Controller's documented instructions
- For Staff User account data, RepairOps is the Controller

### 2b. Subject Matter and Duration
- **Subject matter:** Provision of the RepairOps repair shop management platform
- **Duration:** For the term of the Organization's subscription, plus the data retention period specified in the Privacy Policy
- **Nature of processing:** Storage, organization, retrieval, consultation, use, disclosure by transmission, combination, restriction, erasure, and destruction

### 2c. Categories of Data Subjects
- Staff Users (Organization employees)
- Customers (end-customers of the Organization)
- Organization contacts (billing, admin)

### 2d. Types of Personal Data Processed

| Category | Examples |
|----------|---------|
| **Identifiers** | Name, email address, phone number, device serial number |
| **Commercial information** | Repair ticket details, quotes, invoices, payment history |
| **Internet/electronic activity** | IP address, browser type, login timestamps, pages visited |
| **Professional information** | Role, shop assignment, shift records |
| **Communication records** | Email content, SMS content, in-app messages |
| **Biometric-adjacent** | Signature captures (pickup authorization) — not biometric data |
| **Location data** | Device location tracking coordinates (when enabled) |
| **Visual media** | Photos/videos uploaded during intake or diagnostics |

---

## 3. Processor Obligations

RepairOps, as Processor, shall:

### 3a. Instruction Compliance
- Process personal data only on documented instructions from the Controller
- Inform the Controller if, in RepairOps's opinion, an instruction infringes applicable data protection law
- Not process personal data for any purpose other than providing the Service

### 3b. Confidentiality
- Ensure that all personnel authorized to process personal data are bound by confidentiality obligations
- Limit access to personal data to personnel who require it to perform the Service

### 3c. Security Measures
Implement appropriate technical and organizational measures, including:

- **Encryption at rest:** AES-256 for all stored data; AES-256-GCM envelope encryption for secrets
- **Encryption in transit:** TLS 1.2+ for all network communications
- **Access control:** Role-based access control (RBAC) with 7 granular roles
- **Tenant isolation:** Row-Level Security (RLS) policies enforced at the database level
- **Authentication:** Passwordless magic-link, optional password, Google OAuth, SAML 2.0/OIDC
- **Two-factor authentication:** TOTP-based 2FA available for all Staff Users
- **Audit logging:** Immutable audit trail on all sensitive operations
- **Backup and recovery:** Automated encrypted backups with configurable retention
- **Vulnerability management:** Regular dependency scanning and security linting
- **Incident response:** Documented procedures for breach detection, containment, and notification

### 3d. Sub-processor Management
- Maintain a current list of sub-processors (see Section 5)
- Provide at least 30 days' advance notice before engaging a new sub-processor
- Enter into written agreements with sub-processors imposing data protection obligations no less protective than this DPA
- Remain fully liable for the acts and omissions of sub-processors

### 3e. Data Subject Rights
- Assist the Controller in responding to data subject requests (access, rectification, erasure, portability, restriction, objection)
- Provide self-service data export tools (Settings > Compliance > Data Export)
- Notify the Controller promptly upon receiving a data subject request directly

### 3f. Data Protection Impact Assessments
- Provide reasonable assistance to the Controller in conducting Data Protection Impact Assessments (DPIAs) where required by applicable law

### 3g. Breach Notification
- Notify the Controller without undue delay (and in any event within 72 hours) after becoming aware of a personal data breach
- Include in the notification: nature of the breach, categories and approximate number of data subjects affected, likely consequences, and measures taken or proposed to address the breach

---

## 4. Controller Obligations

The Organization, as Controller, shall:

- Ensure that personal data is collected and processed in compliance with applicable law
- Provide clear privacy notices to Customers and Staff Users
- Obtain any required consents for data processing (including marketing consent)
- Ensure that instructions given to RepairOps are lawful
- Manage data subject requests from their Customers, using the tools provided by RepairOps
- Promptly notify RepairOps of any data subject requests that require RepairOps's assistance

---

## 5. Sub-processors

RepairOps currently uses the following sub-processors:

| Sub-processor | Purpose | Location | Data Processed |
|---------------|---------|----------|---------------|
| **Supabase Inc.** | Database hosting, authentication, real-time features | United States (AWS us-east-1) | All application data |
| **Stripe Inc.** | Payment processing, subscription management | United States | Billing data, payment tokens |
| **Wildbit LLC (Postmark)** | Transactional email delivery | United States | Email addresses, email content |
| **Twilio Inc.** | SMS delivery | United States | Phone numbers, message content |
| **Amazon Web Services** | Object storage (S3), backup storage | United States | Uploaded files, database backups |
| **Vercel Inc.** | Documentation site hosting | United States (Edge network) | Access logs, IP addresses |
| **OpenAI** | AI task processing (when enabled) | United States | Ticket content submitted for AI processing |
| **Anthropic** | AI task processing (when enabled) | United States | Ticket content submitted for AI processing |
| **Google Cloud (Vertex AI)** | AI task processing (when enabled) | United States | Ticket content submitted for AI processing |
| **Groq Inc.** | AI task processing (when enabled) | United States | Ticket content submitted for AI processing |
| **Mistral AI** | AI task processing (when enabled) | France / EU | Ticket content submitted for AI processing |
| **DigitalOcean** | Infrastructure hosting (self-hosted deployments) | Varies by customer choice | All application data |

**AI sub-processors** are only engaged when the Organization enables AI features by purchasing an AI add-on. BYOK mode routes data directly to the provider using the Organization's own API keys.

### Sub-processor Change Notification
We will notify Organization Owners by email at least 30 days before engaging a new sub-processor. If you object to a new sub-processor, you may notify us within 15 days. We will work in good faith to address your concerns. If we cannot resolve the objection, you may terminate the affected Service without penalty.

---

## 6. International Data Transfers

### 6a. Transfer Mechanisms
For transfers of personal data from the EU/EEA/UK/Switzerland to the United States or other countries without an adequacy decision, we rely on:
- **Standard Contractual Clauses (SCCs)** — EU Commission Decision 2021/914 (Module Two: Controller to Processor)
- **UK International Data Transfer Addendum** — for UK-originating transfers
- **Swiss-U.S. Data Privacy Framework** — where applicable

### 6b. Supplementary Measures
In addition to SCCs, we implement the following supplementary measures:
- Encryption of personal data at rest and in transit
- Access controls limiting data access to authorized personnel
- Regular security assessments of sub-processors
- Transparency reporting on government access requests (where legally permitted)

### 6c. Data Residency (Enterprise)
Enterprise customers may request data residency in specific regions. Contact **sales@repairops.app** for available options and pricing.

---

## 7. Data Retention and Deletion

### 7a. During Subscription
Personal data is retained for the duration of the subscription and processed in accordance with the Controller's instructions and the Service's documented functionality.

### 7b. After Termination
Upon subscription termination or cancellation:
- Data remains accessible in read-only mode for 30 days
- After 30 days, data is queued for permanent deletion
- Deletion is completed within 90 days of the end of the read-only period
- Backups containing the data are purged according to the backup retention schedule (typically within 30 additional days)

### 7c. Deletion Certification
Upon written request, RepairOps will provide written certification that all personal data has been deleted or returned, subject to legal retention requirements.

---

## 8. Audit Rights

### 8a. Documentation
RepairOps will make available to the Controller all information necessary to demonstrate compliance with this DPA, including:
- Security documentation and certifications
- Sub-processor list and agreements
- Incident response procedures
- Results of third-party security assessments (upon request and under NDA)

### 8b. Audits
The Controller may conduct audits (or appoint a qualified third-party auditor) to verify RepairOps's compliance with this DPA, subject to:
- At least 30 days' advance written notice
- Reasonable scope and duration
- Confidentiality obligations on the auditor
- Audits limited to once per calendar year (unless a breach has occurred)
- Costs borne by the Controller

### 8c. Cooperation
RepairOps will cooperate with audits and provide reasonable access to relevant systems, facilities, and personnel.

---

## 9. GDPR-Specific Provisions

For Organizations subject to the EU General Data Protection Regulation (Regulation 2016/679):

- RepairOps acts as Processor under Article 28 GDPR
- This DPA constitutes the written contract required by Article 28(3) GDPR
- RepairOps will assist with DPIA requirements under Article 35 GDPR
- RepairOps will cooperate with supervisory authorities under Article 31 GDPR
- RepairOps has appointed a Data Protection contact reachable at **dpo@repairops.app**

---

## 10. CCPA-Specific Provisions

For Organizations subject to the California Consumer Privacy Act (as amended by CPRA):

- RepairOps is a "Service Provider" as defined by the CCPA
- RepairOps will not sell or share personal information
- RepairOps will not retain, use, or disclose personal information for any purpose other than providing the Service
- RepairOps will not combine personal information received from different sources except as permitted by the CCPA
- RepairOps certifies that it understands these restrictions and will comply with them

---

## 11. Liability

The liability of each party under this DPA is subject to the limitations of liability set out in the Terms of Service. Nothing in this DPA limits either party's liability for breaches of data protection law caused by its own negligence or willful misconduct.

---

## 12. Precedence

In the event of conflict between this DPA and the Terms of Service, this DPA shall prevail with respect to data protection matters. In the event of conflict between this DPA and any negotiated Enterprise agreement, the Enterprise agreement shall prevail.

---

## 13. Contact

For DPA-related inquiries:

- **Data Protection Contact:** dpo@repairops.app
- **Legal Team:** legal@repairops.app
- **DPA Requests (Enterprise):** sales@repairops.app

---

## Annex A: Technical and Organizational Measures

| Measure | Implementation |
|---------|---------------|
| Pseudonymization | Customer portal uses token-based access (32-byte hex) rather than PII-based URLs |
| Encryption at rest | AES-256 (Supabase/Postgres); AES-256-GCM envelope encryption for secrets table |
| Encryption in transit | TLS 1.2+ on all connections |
| Ongoing confidentiality | Role-based access, NDA for all personnel |
| Ongoing integrity | Immutable audit logs, database constraints, Zod schema validation |
| Ongoing availability | Automated backups, health monitoring, auto-scaling infrastructure |
| Resilience | Multi-region backup storage, documented disaster recovery procedures |
| Regular testing | Automated security linting, dependency scanning, penetration testing (annual) |
| Access control | 7-role RBAC, RLS policies, 2FA, SAML/OIDC SSO |
| Input validation | Zod schemas validate all input at both client and server layers |
| Logging and monitoring | Audit triggers on all tenant tables, error tracking, uptime monitoring |
| Tenant isolation | Row-Level Security (RLS) with org_id/shop_id scoping on every tenant table |
