---
title: Cookie Policy
description: The cookies and browser storage RepairOps uses — and the ones we don't (no ads, no trackers).
---

**Effective Date:** March 10, 2026
**Last Updated:** March 10, 2026

This Cookie Policy explains how RepairOps ("we," "us," or "our") uses cookies and similar technologies when you use the RepairOps platform at app.repairops.com, the customer portal, and the documentation site at docs.repairops.com.

---

## 1. What Are Cookies?

Cookies are small text files stored on your device (computer, tablet, or mobile phone) when you visit a website. They help the website remember your preferences, maintain your session, and improve your experience. Similar technologies include localStorage, sessionStorage, and HTTP authentication tokens.

---

## 2. Cookies We Use

RepairOps uses a minimal set of cookies, all of which are necessary for the Service to function or to remember your preferences. **We do not use advertising, tracking, or behavioral analytics cookies.**

### 2a. Strictly Necessary Cookies

These cookies are essential for the Service to operate. They cannot be disabled.

| Cookie / Storage Key | Purpose | Duration | Set By |
|---------------------|---------|----------|--------|
| `sb-access-token` | Supabase authentication session token | Session (expires on browser close or after configured timeout) | Supabase Auth |
| `sb-refresh-token` | Refreshes expired access tokens without requiring re-authentication | 7 days | Supabase Auth |
| `sb-auth-token` | Stores authentication state for Supabase client | Session | Supabase Auth |
| `__Host-next-auth` | Next.js session cookie for SSO/SAML flows (Enterprise tier only) | Session | Next.js |
| `csrf-token` | Protects against cross-site request forgery attacks | Session | RepairOps |

### 2b. Functional Cookies

These cookies remember your preferences and settings to provide a better experience. You can disable these, but some features may not work as expected.

| Cookie / Storage Key | Purpose | Duration | Set By |
|---------------------|---------|----------|--------|
| `theme` | Remembers your dark/light mode preference | 1 year | RepairOps |
| `sidebar-collapsed` | Remembers whether the navigation sidebar is collapsed or expanded | 1 year | RepairOps |
| `shop-context` | Remembers which shop location you last selected (multi-shop organizations) | Session | RepairOps |
| `kanban-filters` | Remembers your Kanban board filter preferences | Session | RepairOps |
| `locale` | Remembers your language/locale preference | 1 year | RepairOps |

### 2c. Customer Portal Cookies

The customer portal uses token-based authentication (not Supabase Auth). These cookies are set when a customer accesses their repair status.

| Cookie / Storage Key | Purpose | Duration | Set By |
|---------------------|---------|----------|--------|
| `portal-token` | Customer portal access token (32-byte hex) | 90 days (matches token expiry) | RepairOps |
| `portal-theme` | Customer's dark/light mode preference in the portal | 1 year | RepairOps |

### 2d. Shop Floor Display Cookies

Shop floor displays use a separate authentication mechanism.

| Cookie / Storage Key | Purpose | Duration | Set By |
|---------------------|---------|----------|--------|
| `display-token` | Shop floor display access token | Persistent (until revoked) | RepairOps |

---

## 3. Cookies We Do NOT Use

To protect your privacy, RepairOps does **not** use:

- **Advertising cookies** — No Google Ads, Facebook Pixel, or ad network cookies
- **Third-party tracking cookies** — No cross-site tracking or behavioral profiling
- **Analytics cookies** — No Google Analytics, Mixpanel, Amplitude, or similar tools
- **Social media cookies** — No Facebook, Twitter, or LinkedIn tracking widgets
- **Fingerprinting** — No browser fingerprinting or device identification beyond standard session management

If we add analytics in the future, we will use privacy-respecting, first-party analytics (such as Plausible or Fathom) and update this policy accordingly.

---

## 4. Third-Party Cookies

The following third-party services may set cookies when you interact with embedded features:

| Service | When Set | Purpose | Their Policy |
|---------|----------|---------|-------------|
| **Stripe** | When you visit the billing page or payment forms | Payment processing session | [Stripe Cookie Policy](https://stripe.com/cookies-policy/legal) |
| **Google OAuth** | When you sign in with Google | Authentication handshake | [Google Privacy Policy](https://policies.google.com/privacy) |

These cookies are set by the respective third parties and governed by their privacy policies. RepairOps does not control these cookies.

---

## 5. localStorage and sessionStorage

In addition to cookies, RepairOps uses browser storage APIs for application state:

| Key | Storage Type | Purpose |
|-----|-------------|---------|
| `supabase.auth.token` | localStorage | Persists authentication state across page reloads |
| `kanban-column-order` | localStorage | Remembers custom Kanban column ordering |
| `recent-tickets` | sessionStorage | Caches recently viewed ticket IDs for quick navigation |
| `draft-notes` | sessionStorage | Auto-saves unsaved diagnostic notes to prevent data loss |

These are not transmitted to our servers and are stored only in your browser.

---

## 6. Managing Cookies

### Browser Settings
You can manage cookies through your browser settings:
- **Chrome:** Settings > Privacy and Security > Cookies
- **Firefox:** Settings > Privacy & Security > Cookies and Site Data
- **Safari:** Preferences > Privacy > Manage Website Data
- **Edge:** Settings > Cookies and Site Permissions

### Impact of Disabling Cookies
If you disable strictly necessary cookies, you will not be able to log in or use the Service. If you disable functional cookies, some preferences (like dark mode) may not persist between sessions.

### Do Not Track
RepairOps respects the Do Not Track (DNT) browser signal. Since we do not use tracking cookies, DNT has no practical effect on our cookie behavior — we already do not track you.

---

## 7. Updates to This Policy

We may update this Cookie Policy to reflect changes in our practices or for legal, regulatory, or operational reasons. Changes will be posted on this page with an updated "Last Updated" date. Material changes will be communicated via email or in-app notification.

---

## 8. Contact Us

For questions about our use of cookies:

- **Email:** privacy@repairops.app
- **Support:** support@repairops.app
