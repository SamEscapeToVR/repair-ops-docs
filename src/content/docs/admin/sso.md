---
title: "SSO / SAML"
description: "Set up SAML 2.0 or OIDC single sign-on authentication"
sidebar:
  order: 3
---

Single Sign-On (SSO) integration allows your team to log into RepairOps using your organization's identity provider. Streamline user provisioning, enforce security policies, and reduce password management overhead.

**Available on:** Enterprise tier only.

## Supported Identity Providers

RepairOps supports SAML 2.0 and OIDC (OpenID Connect):

### SAML 2.0
- Azure AD / Microsoft Entra ID
- Okta
- JumpCloud
- Auth0
- Google Workspace
- Ping Identity
- OneLogin
- Custom SAML providers

### OIDC (OpenID Connect)
- Any OIDC-compliant provider (Auth0, Google, Okta, etc.)
- Some providers support both SAML and OIDC — check your provider

## Setting Up SAML 2.0

### Step 1: Gather RepairOps Metadata

1. Navigate to **Settings** → **Authentication** → **SSO**
2. Click **Set Up SAML 2.0**
3. Copy your:
   - **Assertion Consumer Service URL (ACS)** — Where your IdP will send the SAML response
   - **Entity ID** — Unique identifier for RepairOps in your IdP
   - **Metadata URL** — Full metadata document (share with your IdP)

Save these values; you'll enter them in your identity provider.

### Step 2: Configure Identity Provider

Log into your identity provider's admin panel and add RepairOps as an application:

#### Azure AD / Microsoft Entra ID
1. **Azure AD** → **Enterprise Applications** → **New Application**
2. Search for "RepairOps" or **Create your own application**
3. In **SAML-based Sign-on**, enter:
   - **Identifier (Entity ID):** `[your-org].repairops.io`
   - **Reply URL (ACS):** (paste from RepairOps)
   - **Sign on URL:** `https://[your-org].repairops.io/sso/login`
4. Under **SAML Signing Certificate**, copy the **Certificate (raw)**
5. Copy **Login URL** and **Logout URL**
6. Save in Azure AD

#### Okta
1. **Applications** → **Create App Integration** → **SAML 2.0**
2. Enter app name (e.g., "RepairOps")
3. In SAML settings:
   - **Single sign-on URL:** (paste ACS from RepairOps)
   - **Entity ID:** (paste Entity ID from RepairOps)
   - **Name ID format:** EmailAddress (or matches your setup)
   - **Application username:** Email
4. Assign users/groups to the app
5. View your metadata or certificate in the **Sign On** tab

#### Google Workspace
1. **Admin Console** → **Security** → **Set up single sign-on (SSO) with third-party IdP**
2. Check **Enable SSO for my organization**
3. Upload RepairOps metadata or enter:
   - **Sign-in page URL:** (from RepairOps, usually your ACS)
   - **Sign-out page URL:** (from RepairOps)
   - **Change password URL:** (leave blank unless you have a custom page)
4. Download and save the **certificate**

### Step 3: Add Signing Certificate to RepairOps

1. In RepairOps **SSO setup**, scroll to **Identity Provider Configuration**
2. Paste your IdP's **Signing Certificate** (PEM format)
3. Test the configuration with **Test SSO**

### Step 4: Enable SSO

1. Click **Enable SAML 2.0**
2. All users in your organization will now see "Sign in with [IdP]" button
3. Magic link sign-in remains available as a fallback

## Setting Up OIDC

### Step 1: Create OIDC Application in Your IdP

Log into your identity provider:

#### Okta
1. **Applications** → **Create App Integration** → **OIDC - Web Application**
2. Enter RepairOps as the app name
3. For **Sign-in redirect URIs**, enter: `https://[your-org].repairops.io/sso/callback`
4. For **Sign-out redirect URIs**, enter: `https://[your-org].repairops.io/sso/logout`
5. For **Assignments**, select which users/groups can access RepairOps
6. Copy your **Client ID** and **Client Secret**

#### Auth0
1. **Applications** → **Create Application** → **Regular Web Application**
2. Configure:
   - **Application URIs** → **Allowed Callback URLs:** `https://[your-org].repairops.io/sso/callback`
   - **Allowed Logout URLs:** `https://[your-org].repairops.io/sso/logout`
3. Copy **Client ID** and **Client Secret**

#### Google
1. **Google Cloud Console** → **APIs & Services** → **Create Credentials** → **OAuth 2.0 Client ID**
2. Application type: **Web application**
3. Authorized redirect URIs: `https://[your-org].repairops.io/sso/callback`
4. Copy **Client ID** and **Client Secret**

### Step 2: Add OIDC Configuration to RepairOps

1. In RepairOps **SSO setup**, click **Set Up OIDC**
2. Enter:
   - **Discovery URL** (usually `https://[your-idp-domain]/.well-known/openid-configuration`)
   - **Client ID** (from your IdP)
   - **Client Secret** (from your IdP)
3. Test with **Test SSO**

### Step 3: Enable OIDC

1. Click **Enable OIDC**
2. Users see "Sign in with [Provider]" button
3. Magic link sign-in remains available as fallback

## JIT User Provisioning

**Just-In-Time (JIT) provisioning** automatically creates RepairOps user accounts when someone first logs in via SSO.

### Enable JIT
1. **Settings** → **Authentication** → **SSO**
2. Check **Automatic User Provisioning (JIT)**
3. Configure default settings for new users:
   - **Default Role:** Tech, Front Desk, Manager, or Owner
   - **Default Shop:** Which shop to assign new users to (if multi-location)
4. Save

When someone logs in with SSO for the first time:
- RepairOps creates an account automatically
- Assigns them the default role
- Sends welcome email

### Manual Provisioning (Alternative)

If you prefer to create accounts manually:
1. Disable JIT
2. Admins create accounts in **Settings** → **Team** → **Invite Member**
3. SSO login only works for invited users

## User Mapping & Attributes

Configure how IdP attributes map to RepairOps user fields:

1. **Settings** → **Authentication** → **SSO** → **Attribute Mapping**
2. Map these fields (if available from your IdP):
   - **Email** ← email or mail (required)
   - **First Name** ← givenName or given_name
   - **Last Name** ← surname or family_name
   - **Department** ← department (optional, used for team assignment)
   - **Manager** ← manager (optional, for hierarchies)

Most providers send email by default; other attributes are optional.

## Group Mapping (Advanced)

Sync IdP groups to RepairOps roles:

1. **Settings** → **Authentication** → **SSO** → **Group Mapping**
2. Map IdP groups to RepairOps roles:
   - "engineering-team" (IdP) → "Tech" (RepairOps)
   - "managers" (IdP) → "Manager" (RepairOps)
   - "owners" (IdP) → "Owner" (RepairOps)
3. When user logs in, their role updates based on group membership

This keeps your identity provider as source-of-truth for access control.

## Logout & Session Management

### Single Logout (SLO)

When a user logs out of RepairOps:
- RepairOps sends logout request to IdP
- User's IdP session is also terminated
- User cannot access any apps without re-authenticating

**Note:** SLO requires IdP support (most modern IdPs support it).

### Session Timeout

Configure inactivity timeout:

1. **Settings** → **Security** → **Session Management**
2. Set inactivity timeout (default: 30 minutes)
3. User is logged out if inactive for this duration

## Troubleshooting

### Users Can't Sign In

**Error: "SAML assertion failed validation"**
- Check that signing certificate is correct (copy full PEM block, including headers)
- Verify **Name ID format** matches your setup (usually "Email Address")
- Test with **Test SSO** button to see detailed error

**Error: "User not found"**
- If JIT is disabled, admin must first invite user (their email must match IdP email)
- If JIT is enabled, check that user's email is correct in IdP

### Group Mapping Not Working

- Confirm your IdP sends group claims in SAML assertion
- In Azure AD: add "groups" claim in SAML configuration
- In Okta: add "groups" to ID Token claims
- Test with **Test SSO** and review claims

### Users See Magic Link Instead of SSO Button

- SSO may not be enabled
- **Settings** → **Authentication** → **SSO** → Confirm "Enabled" toggle is on
- Hard refresh browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

## Security Best Practices

**Enforce SAML/OIDC only** — Disable magic link sign-in once SSO is working:
1. **Settings** → **Authentication** → **Sign-In Methods**
2. Uncheck **Magic Link** (SAML/OIDC only)
3. Users must use corporate SSO

**Use JIT with care** — If enabled, anyone with an IdP account can create a RepairOps account:
- Recommended: Disable JIT and manually invite users
- Alternative: Enable JIT but restrict IdP app assignment to team members only

**Audit SSO logins** — Monitor sign-in activity:
1. **Settings** → **Security** → **Audit Log**
2. Filter by "SSO Login" events
3. Alert on suspicious activity (logins from unusual locations, multiple failures)

**Rotate client secrets** — If using OIDC:
1. Every 90 days, rotate your Client Secret in your IdP
2. Update in RepairOps: **Settings** → **Authentication** → **SSO**
3. Test SSO before completing rotation

## Related Documentation

- **[Security](/admin/security/)** — API keys, 2FA, audit logging
- **[Team Management](/admin/)** — Adding users and assigning roles
