---
title: "Self-Host Customer Install Instructions"
description: "Install RepairOps Shop Owner Edition on your own server, with separate instructions for Full / tiered closed-runtime packages."
---

Use this guide after your delivery email says **package ready**. Shop Owner Edition (`light`)
uses the Owner's Guide supplied with your package. Full / tiered closed-runtime packages use a
different Compose file and environment template; follow the section for your delivered edition.

## 1. Prepare your server and download

- Have a Linux server with Docker and Docker Compose v2, your chosen subdomain, and access to DNS.
  Shop Owner Edition needs **4 CPU cores, 8 GB RAM, and 80 GB disk**; Ubuntu 24.04 is the example
  operating system in its Owner's Guide. A 4 GB or 6 GB server cannot complete the intended PCRT
  migration alongside the running shop. Resolve failed preflight checks before installing.
- Point your subdomain's DNS A record at the server's IP address. Keep ports **80 and 443** open
  and available for Caddy, which issues and renews the HTTPS certificate automatically.
- Open **Delivery (Settings → Self-host)** in your RepairOps account. An owner or manager can
  download the private package and `runtime.license.json`. Transfer them securely to your server
  and extract the package into `/opt/repairops`.
- From the extracted package directory, verify its files before continuing:

```bash
sha256sum -c SHA256SUMS
```

Every listed file must report `OK`. If verification fails, stop and contact RepairOps about your
delivery. Keep the package, licence, and environment files private.

## 2. Use the guide for your package

| Package | Compose file | Environment template | Bundled guide |
|---------|--------------|----------------------|---------------|
| Shop Owner Edition (`light`) | `docker-compose.light.yml` | `light.env.example` → `light.env` | `light-owner-guide.html` and `SKILL.md` |
| Full / tiered closed runtime | `docker-compose.closed-runtime.yml` | `closed-runtime.env.example` → `closed-runtime.env` | `selfhost-customer-install-instructions.html` and `SKILL.md` |

Open the bundled HTML guide locally. If you use an AI assistant, have it read
`AI_INSTALL_ASSISTANT.md` first, then `/opt/repairops/SKILL.md` and follow the instructions for that
package. If the files do not match the edition you ordered, contact RepairOps before continuing.

## Shop Owner Edition installation

### Step 1 — Install Docker

If Docker is not installed, the Owner's Guide uses these commands on the target Linux server:

```bash
curl -fsSL https://get.docker.com | sh
docker --version
docker compose version
```

The image-download helper also needs `curl` and OpenSSL **1.1.1 or newer**. Run the server commands
below in `/opt/repairops`; the guide includes SSH and secure-transfer examples if you need them.

### Step 2 — Run the Light preflight

Run the **exact command from your delivery email** on the target server. Its script URL includes
`?edition=light`, and its request ID and token tie the report to your order. Do not substitute the
Full edition command or share the token.

The preflight checks the operating system, Docker and Compose, CPU, memory, free disk, ports,
outbound HTTPS, and DNS. It uploads the readiness checks, OS/kernel/architecture, a hostname hash,
your domain, and CPU/memory/disk figures. It does not upload your environment files or shop data.
Look for **“RepairOps preflight uploaded successfully.”** A failed check is a stop: resolve it and
rerun the preflight. Resize a server that fails memory checks rather than bypassing the thresholds.

### Step 3 — Unpack and verify the package

After securely copying your package to `/opt/`, the Owner's Guide uses:

```bash
mkdir -p /opt/repairops && cd /opt/repairops
apt-get install -y unzip
unzip /opt/repairops-self-host-yourshop.zip -d /opt/repairops
sha256sum -c SHA256SUMS
```

Replace the ZIP filename with the package you downloaded. Confirm that it contains the Light
Compose file, `light.env.example`, the delivery manifest, the Owner's Guide, and the install
guardrails. Preserve the manifest's exact image digests and version/provenance values.

### Step 4 — Fill in `light.env`

For a new installation, copy the template and edit it on your server:

```bash
cd /opt/repairops
cp light.env.example light.env
nano light.env
```

| Setting | What to use |
|---------|-------------|
| `DOMAIN`, `SITE_URL`, `API_EXTERNAL_URL`, `NEXT_PUBLIC_SUPABASE_URL` | Your domain and HTTPS URLs, matching the values supplied before your build. |
| Image references and version/provenance values | The exact values in your delivered manifest. New Owner's Edition images use `registry.repairops.app/repairops-…@sha256:…`. Keep `REPAIROPS_REGISTRY_URL=https://registry.repairops.app` as shipped. |
| `JWT_SECRET`, `ANON_KEY`, `SERVICE_ROLE_KEY` | The same auth values generated before the build. The anon key is baked into the web image; do not generate a replacement after the build. Contact RepairOps about your delivery if these values are missing. |
| `POSTGRES_PASSWORD`, `REALTIME_SECRET_KEY_BASE`, `REPAIROPS_DATA_KEY_B64`, `REPAIROPS_PORTAL_SESSION_SECRET` | Fresh, separate server secrets in the formats required by your template. Generate them on the server and keep them out of chat and email. The data key must be recoverable from your private off-server copy; the portal session secret is required for customer portal pages. |
| `SMTP_*` | Your mail provider's host, port, user, password, sender address, and sender name. Providers often require an app password. **Login codes always use SMTP**, even if customer messages use Postmark. |
| `REPAIROPS_GUARDIAN_INSTANCE_ID`, `REPAIROPS_GUARDIAN_CREDENTIAL_ID`, `REPAIROPS_GUARDIAN_COLLECTOR_URL`, `REPAIROPS_GUARDIAN_PRIVATE_KEY` | The Guardian credential card in **Settings → Self-hosting → Guardian credential**. Reveal the private key in your own account and copy it directly into the file as one line. It is never emailed or included in the package. If its reveal window has expired, ask RepairOps to provision it again. |
| `REPAIROPS_LICENSE_VERIFICATION_PUBLIC_KEY_B64` | The verification public key supplied with your delivery. |

Fill the Guardian values **before downloading images**: they also sign your server in to the
RepairOps registry. There is **no separate registry password** to request or store.

Leave the remaining runtime settings as shipped. In particular, keep
`RATE_LIMIT_SINGLE_INSTANCE=true`; leave `REPAIROPS_WORKER_SCHEDULE_PROFILE` and
`REPAIROPS_GUARDIAN_REPORT_MODE` blank. Preserve the licence settings, memory tuning, and delivered
image digests. Do not rotate the auth or data-encryption keys as part of an install or update.

### Step 5 — Place the licence before signup

```bash
mkdir -p /opt/repairops/license
```

Securely copy your downloaded `runtime.license.json` to
`/opt/repairops/license/runtime.license.json`. Keep an off-server copy and preserve its signed
contents. **The file must be present before the first signup** so the first organization is bound
to your licence. If you already signed up without it, stop and follow the bundled guide's fresh
installation guidance; do not try to edit the licence or bypass verification.

### Step 6 — Download images and start

```bash
cd /opt/repairops
docker compose --env-file light.env -f docker-compose.light.yml config --quiet
sh scripts/pull-images.sh
docker compose --env-file light.env -f docker-compose.light.yml up -d
docker compose --env-file light.env -f docker-compose.light.yml ps
curl -fsS https://your-repairops-host.example/api/health
```

Replace the example hostname with yours. The configuration check must succeed without printing
the resolved configuration. Fix any error before continuing.

Run the image helper with **`sh`**, as shown: package files may not retain their executable bit.
It signs a registry request with your Guardian credential, receives a password valid for one
hour, signs Docker in, downloads the images, and signs Docker out. Do not replace it with
`docker login ghcr.io` for a new Owner's Edition package.

Wait for the app services to run. Setup jobs such as `migrate` and `db-bootstrap` finish with
`exited (0)`; that is success. The SMTP `mail-check` must also pass before the web app starts.
If startup stops there, inspect its log and fix the named setting:

```bash
docker compose --env-file light.env -f docker-compose.light.yml logs mail-check
```

Do not skip the mail check to complete a new install: without working SMTP, the owner cannot
receive login codes. The health URL should return JSON over HTTPS.

### Step 7 — First owner login

Open your shop's HTTPS URL in your own browser and create the first account. That signup becomes
the organization owner. Confirm the login email arrives; RepairOps uses an emailed link or code,
not a built-in admin account or password login. If mail fails, fix SMTP before opening the shop.
The bundled guide's **“Locked out”** section provides a local recovery procedure; treat any
one-time login output like a password and never share it.

### Step 8 — Initial shop setup

If migrating from PCRT, follow the Owner's Guide's migration section first, using
**Settings → Imports → PCRT**. Then review these settings before the front desk starts work:

| Settings page | What to check |
|---------------|---------------|
| General | Shop name, contact details, receipt header and footer. |
| Shops | Each location's address, **time zone**, and tax rate. |
| Board | Status columns, colours, order, and card fields. |
| Messages | Canned templates, including any imported templates flagged for review. |
| Intake Checklist | Device-condition checks and accessory list. |
| Labels | Ticket/device label layout; print a test label and receipt. |
| POS Drawer | Denominations and drawer defaults. A till session belongs to a cashier at a store; a handoff closes and counts one session before the next cashier opens a new one. |
| Notifications | Review customer-message events before enabling them. After a PCRT import, automated messages start **off**. |
| Plugins | Connect your own Twilio account if you send SMS; these credentials belong in the app, not `light.env`. |

Shop Owner Edition uses your existing card terminal; record the payment against the invoice.
Its Owner's Guide describes included features, the three-store licence, and optional BYO AI.

### Prove backups work before relying on them

Keep **both database and file backups**: the database records that a photo exists, while the file
archive holds its bytes. Database backups run at **02:00 UTC**, file backups at **02:30 UTC**.
Use the retention settings in your delivered template and check disk space before increasing them.

```bash
cd /opt/repairops
sh scripts/restore.sh --env-file light.env --compose-file docker-compose.light.yml --list
docker compose --env-file light.env -f docker-compose.light.yml run --rm backup-verify
sh scripts/restore.sh --env-file light.env --compose-file docker-compose.light.yml --drill
```

Run a drill once a backup exists and outside opening hours. It checks a scratch database, leaves
live data untouched, needs enough free disk for the extra copy, and must finish **`DRILL PASSED`**.
Repeat monthly and record a pass under **Guardian Local → Restore-Test Readiness**. Do not pipe a
dump into `psql` as a substitute for the packaged drill. A real restore replaces live data and is
a separate disaster-recovery procedure in the bundled guide.

Keep backups and a private copy of `light.env` off the server. The guide documents S3/SFTP offsite
copies using `BACKUP_OFFSITE_TYPE`, plus checks for that backup service. A rebuilt server needs
the same data-encryption and auth keys. Per-organization exports under **Settings → Exports** are
useful for spreadsheets; they are separate from disaster-recovery backups.

### Registry access, updates, and help

If image downloads fail, use this access check without downloading images:

```bash
sh scripts/pull-images.sh --check
```

Read the helper's final error. Check that the current Guardian credential is complete and on one
line, the server's clock is synchronized, and outbound HTTPS can reach
`registry.repairops.app`, `pkg-containers.githubusercontent.com`, and Docker Hub. A refused
delivery status needs RepairOps to resolve it. A registry problem does not stop an already
running shop.

For an **older Owner's Edition installation** whose six `REPAIROPS_*_IMAGE` references still begin
with `ghcr.io/<owner>/`, use the bundled guide's **“Moving to the RepairOps registry”** procedure.
It changes the registry prefix to `registry.repairops.app/`, preserves every `@sha256:` digest,
adds `REPAIROPS_REGISTRY_URL`, and uses the new package's image helper. Do not invent image names
or apply this Owner's Edition procedure to a different edition's package.

For updates, first confirm backups exist and save copies of the working environment and Compose
file. Verify the new package's checksums in a scratch folder, copy its Compose file and scripts,
and take image/version values from its manifest. Preserve your secrets and licence directory;
then run the image helper, start the stack, and check health as described in the bundled guide.

The Shop Owner Edition licence is **perpetual fallback**: a lapsed update plan stops new builds,
not your running shop, backups, exports, or access to previously delivered packages and images.
An invalid or missing signed licence is a different problem and must be corrected with a valid
delivery licence, not by changing licence controls.

Guardian Local at `/settings/instance-health` shows checks stored on your own server. The outbound
version ping is described in the Owner's Guide; `REPAIROPS_GUARDIAN_LOCAL_ONLY=true` stops that
ping while keeping local checks. Turning off the ping does not remove the Guardian credential
needed for image downloads.

Shop Owner Edition has **no support contract or support ticket queue**. Use the community forum
linked in your delivery email for operating help; keep your account email current for security
notices. Contact RepairOps for delivery status, expired credential handoffs, or licence reissues.
The bundled Owner's Guide also covers PCRT migration, configuration, troubleshooting, recovery,
and data exports.

## Full / tiered closed-runtime installation

This section is for `docker-compose.closed-runtime.yml` and `closed-runtime.env.example`.
Use the Full package's bundled guide and `SKILL.md`; the Owner's Edition commands above use
different files and a different image-download flow.

Run the preflight command shown in Settings → Self-host on your target Linux server and resolve
failed checks before installing. Use the command supplied for your Full package.

Follow the bundled guide to copy the environment template and fill the documented values on your
server. Preserve the prefilled domain, image digests, provenance, and licence verification values.
Use the same `JWT_SECRET`, `ANON_KEY`, and `SERVICE_ROLE_KEY` generated before the package build;
the anon key is baked into the web image. If those values are missing, contact RepairOps before
continuing. Generate the other server secrets as directed by your package guide.

Place `runtime.license.json` in `/opt/repairops/license/` **before the first signup**. Configure
DNS, mail, and any Guardian credentials as directed by your edition's guide.

Once those steps are complete, log in to the registry with your supplied read-only credential:

```bash
docker login ghcr.io
docker compose --env-file closed-runtime.env -f docker-compose.closed-runtime.yml config --quiet
docker compose --env-file closed-runtime.env -f docker-compose.closed-runtime.yml pull
docker compose --env-file closed-runtime.env -f docker-compose.closed-runtime.yml up -d
docker compose --env-file closed-runtime.env -f docker-compose.closed-runtime.yml ps
curl -fsS https://your-repairops-host.example/api/health
```

Replace the example hostname with yours. The configuration check should finish successfully
without printing the resolved configuration. Stop and fix any error before starting the stack;
follow the bundled guide for startup checks, the first owner signup, mail delivery, shop setup,
and backup verification, including a restore drill. For supported tiered packages, confirm the
Guardian verification and delivery status in your RepairOps account.

## Keep your deployment files private

Keep package files, environment files, registry credentials, Guardian credentials, and licence
artifacts private. Do not paste them into chat or email. Preserve the signed licence and
digest-pinned runtime images. Before asking for help with logs, redact passwords, tokens, and
customer details. Follow your edition's bundled guide if checksums, registry access, licence
verification, mail checks, or startup checks fail.
