---
title: "Self-Host Customer Install Instructions"
description: "Install the private RepairOps package delivered to your account, including Shop Owner Edition."
---

Use this guide after your delivery email says **package ready**. Your private package contains the
install instructions for your edition; keep those files together and follow the bundled guide.

## 1. Prepare your server and download

- Have a Linux server with Docker and Docker Compose v2, your chosen subdomain, and access to DNS.
  Shop Owner Edition (`light`) needs 4 CPU cores, 8 GB RAM, and 80 GB disk.
- Run the preflight command shown in your delivery email or **Settings → Self-hosting** on the
  target server. Use the command for your edition and resolve failed checks before installing.
- Download the package and `runtime.license.json` through your RepairOps account. Transfer them
  securely to your server and extract the package into `/opt/repairops`.
- From that directory, verify the package before continuing:

```bash
sha256sum -c SHA256SUMS
```

Every listed file must report `OK`. If verification fails, stop and contact RepairOps.

## 2. Use the guide for your package

| Package | Compose file | Environment template | Bundled guide |
|---------|--------------|----------------------|---------------|
| Shop Owner Edition (`light`) | `docker-compose.light.yml` | `light.env.example` → `light.env` | `light-owner-guide.html` and `SKILL.md` |
| Tiered closed runtime | `docker-compose.closed-runtime.yml` | `closed-runtime.env.example` → `closed-runtime.env` | `selfhost-customer-install-instructions.html` and `SKILL.md` |

Open the bundled HTML guide locally. If you use an AI assistant, have it read
`AI_INSTALL_ASSISTANT.md` first, then `/opt/repairops/SKILL.md` and follow the instructions for that
package. If the files do not match the edition you ordered, contact RepairOps before continuing.

## 3. Configure and start the runtime

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
```

For **Shop Owner Edition**, run from `/opt/repairops`:

```bash
docker compose --env-file light.env -f docker-compose.light.yml config --quiet
docker compose --env-file light.env -f docker-compose.light.yml up -d
docker compose --env-file light.env -f docker-compose.light.yml ps
```

For the **tiered closed runtime**, run from `/opt/repairops`:

```bash
docker compose --env-file closed-runtime.env -f docker-compose.closed-runtime.yml config --quiet
docker compose --env-file closed-runtime.env -f docker-compose.closed-runtime.yml pull
docker compose --env-file closed-runtime.env -f docker-compose.closed-runtime.yml up -d
docker compose --env-file closed-runtime.env -f docker-compose.closed-runtime.yml ps
```

The configuration check should finish successfully without printing the resolved configuration.
Stop and fix any error before starting the stack; follow the bundled guide for startup checks.

## 4. Verify and finish setup

Check your deployment's health, replacing the example hostname with your own:

```bash
curl -fsS https://your-repairops-host.example/api/health
```

Follow the bundled guide for the first owner signup, mail delivery checks, initial shop setup,
and backup verification, including a restore drill. For supported tiered packages, confirm the
Guardian verification and delivery status in your RepairOps account. Shop Owner Edition's
Guardian behavior is described in its Owner's Guide.

Keep package files, environment files, registry credentials, Guardian credentials, and licence
artifacts private. Do not paste them into chat or email. Preserve the signed licence and
digest-pinned runtime images. If checksums, registry access, licence verification, mail checks,
or startup checks fail, contact RepairOps through your delivery or account support channel.
