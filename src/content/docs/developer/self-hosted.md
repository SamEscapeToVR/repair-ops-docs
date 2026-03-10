---
title: "Self-Hosted Deployment"
description: "Docker Compose stack for private cloud deployment"
sidebar:
  order: 4
---

Deploy RepairOps on your own infrastructure with Docker Compose. This guide covers production-grade setup with Postgres, Supabase, pg-boss, backups, and monitoring.

**Available on:** Enterprise tier only.

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│  Your Infrastructure (Docker Compose)       │
├─────────────────────────────────────────────┤
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │  Nginx / Caddy (Reverse Proxy)      │  │
│  │  - TLS termination                  │  │
│  │  - Load balancing                   │  │
│  └────────┬─────────────────────────────┘  │
│           │                                 │
│  ┌────────v──────────────────────────────┐ │
│  │  RepairOps Web (Node.js Next.js)    │ │
│  │  - Next.js app (port 3000)          │ │
│  │  - Multiple replicas                │ │
│  └────────┬──────────────────────────────┘ │
│           │                                 │
│  ┌────────v──────────────────────────────┐ │
│  │  RepairOps Worker (bg jobs)         │ │
│  │  - pg-boss (job queue)              │ │
│  │  - Cron tasks                       │ │
│  │  - Email delivery                   │ │
│  └────────┬──────────────────────────────┘ │
│           │                                 │
│  ┌────────v──────────────────────────────┐ │
│  │  Supabase (PostgreSQL)              │ │
│  │  - Postgres 15 database             │ │
│  │  - pgvector extension               │ │
│  │  - Row-level security               │ │
│  └────────┬──────────────────────────────┘ │
│           │                                 │
│  ┌────────v──────────────────────────────┐ │
│  │  Redis (Caching & Sessions)         │ │
│  │  - Session store                    │ │
│  │  - Rate limiting                    │ │
│  └─────────────────────────────────────┘ │
│                                             │
│  ┌─────────────────────────────────────┐  │
│  │  MinIO (Object Storage)             │  │
│  │  - Photos and attachments           │  │
│  │  - Backups                          │  │
│  └─────────────────────────────────────┘  │
│                                             │
└─────────────────────────────────────────────┘
```

## Prerequisites

- **Docker & Docker Compose** (v2.0+)
- **Server:** 4 CPU cores, 8GB RAM minimum (16GB recommended for production)
- **Storage:** 100GB disk minimum (SSD recommended)
- **OS:** Linux (Ubuntu 20.04+ recommended), or Docker Desktop on Mac/Windows
- **Domain:** Custom domain with DNS access
- **SSL Certificate:** Self-signed or Let's Encrypt

## Quick Start

### 1. Clone Configuration Repository

```bash
git clone https://github.com/repairops/docker-compose.git
cd docker-compose
```

### 2. Configure Environment

Create `.env` file in root directory:

```bash
# Core Config
REPAIROPS_ENV=production
REPAIROPS_URL=https://repairs.yourshop.com

# Postgres
POSTGRES_PASSWORD=generate_strong_password_here
POSTGRES_USER=repairops
POSTGRES_DB=repairops

# Supabase
SUPABASE_JWT_SECRET=generate_jwt_secret_here
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Redis
REDIS_PASSWORD=generate_strong_password_here

# S3 / MinIO
MINIO_ROOT_USER=admin
MINIO_ROOT_PASSWORD=generate_strong_password_here
MINIO_BUCKET=repairops-backups

# Email (SMTP)
SMTP_HOST=mail.yourshop.com
SMTP_PORT=587
SMTP_USER=noreply@yourshop.com
SMTP_PASSWORD=your_smtp_password
SMTP_FROM=noreply@yourshop.com

# Stripe (optional)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# AI Provider (optional)
OPENAI_API_KEY=sk_...
# or
ANTHROPIC_API_KEY=sk_...
```

**Generate strong passwords:**
```bash
openssl rand -base64 32  # For passwords
openssl rand -hex 32     # For secrets
```

### 3. Create Docker Compose File

Copy or create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: always

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
    restart: always

  minio:
    image: minio/minio
    environment:
      MINIO_ROOT_USER: ${MINIO_ROOT_USER}
      MINIO_ROOT_PASSWORD: ${MINIO_ROOT_PASSWORD}
    volumes:
      - minio_data:/data
    ports:
      - "9000:9000"
      - "9001:9001"
    command: server /data --console-address ":9001"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:9000/minio/health/live"]
      interval: 30s
      timeout: 20s
      retries: 3
    restart: always

  web:
    image: repairops/web:latest
    environment:
      NODE_ENV: production
      REPAIROPS_URL: ${REPAIROPS_URL}
      DATABASE_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      REDIS_URL: redis://:${REDIS_PASSWORD}@redis:6379/0
      NEXT_PUBLIC_SUPABASE_URL: http://localhost:8000
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY}
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    restart: always

  worker:
    image: repairops/worker:latest
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/${POSTGRES_DB}
      REDIS_URL: redis://:${REDIS_PASSWORD}@redis:6379/0
      SMTP_HOST: ${SMTP_HOST}
      SMTP_PORT: ${SMTP_PORT}
      SMTP_USER: ${SMTP_USER}
      SMTP_PASSWORD: ${SMTP_PASSWORD}
      SMTP_FROM: ${SMTP_FROM}
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: always

volumes:
  postgres_data:
  redis_data:
  minio_data:
```

### 4. Start Services

```bash
docker-compose up -d
```

Monitor logs:
```bash
docker-compose logs -f web worker
```

### 5. Configure Reverse Proxy (Nginx)

```nginx
upstream repairops {
  server web:3000;
}

server {
  listen 80;
  server_name repairs.yourshop.com;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name repairs.yourshop.com;

  ssl_certificate /etc/letsencrypt/live/repairs.yourshop.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/repairs.yourshop.com/privkey.pem;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;

  location / {
    proxy_pass http://repairops;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
  }
}
```

### 6. Set Up SSL Certificate

Using Certbot (Let's Encrypt):

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot certonly --standalone -d repairs.yourshop.com
```

Or use Docker container:

```bash
docker run --rm -it \
  -v /etc/letsencrypt:/etc/letsencrypt \
  certbot/certbot certonly --standalone -d repairs.yourshop.com
```

## Database Setup

### Run Migrations

Create initial schema:

```bash
docker-compose exec -T postgres psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} < migrations/schema.sql
```

Or use Supabase migrations:

```bash
docker-compose exec web npm run migrate:prod
```

### Enable pgvector Extension

```bash
docker-compose exec -T postgres psql -U ${POSTGRES_USER} -d ${POSTGRES_DB} \
  -c "CREATE EXTENSION IF NOT EXISTS vector;"
```

This is required for KB Chat embeddings.

### Seed Initial Data

```bash
docker-compose exec web npm run seed:prod
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `REPAIROPS_ENV` | Environment (development, staging, production) | production |
| `REPAIROPS_URL` | Your public URL | https://repairs.yourshop.com |
| `DATABASE_URL` | Postgres connection string | postgresql://user:pass@host:5432/db |
| `REDIS_URL` | Redis connection string | redis://:pass@redis:6379/0 |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL | http://localhost:8000 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public key | eyJhb... |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key | eyJhb... |
| `SMTP_HOST` | Email server | mail.yourshop.com |
| `SMTP_PORT` | Email port | 587 |
| `SMTP_USER` | Email username | noreply@yourshop.com |
| `SMTP_PASSWORD` | Email password | ... |
| `SMTP_FROM` | From address | noreply@yourshop.com |
| `STRIPE_SECRET_KEY` | Stripe API key | sk_live_... |
| `OPENAI_API_KEY` | OpenAI API key | sk_... |

## Backups

### Automated Daily Backups

Create a backup script:

```bash
#!/bin/bash
# backup.sh
BACKUP_DIR="/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Dump database
docker-compose exec -T postgres pg_dump \
  -U ${POSTGRES_USER} ${POSTGRES_DB} \
  | gzip > ${BACKUP_DIR}/postgres_${TIMESTAMP}.sql.gz

# Backup MinIO data
aws s3 sync s3://repairops-backups ${BACKUP_DIR}/s3_backup_${TIMESTAMP}/ \
  --recursive

echo "Backup completed: ${TIMESTAMP}"
```

Schedule with cron:
```bash
0 2 * * * /path/to/backup.sh
```

### Restore from Backup

```bash
# Restore database
gunzip < /backups/postgres_20260321_020000.sql.gz | \
  docker-compose exec -T postgres psql -U ${POSTGRES_USER} ${POSTGRES_DB}

# Restore MinIO
aws s3 sync /backups/s3_backup_20260321_020000/ s3://repairops-backups/ \
  --recursive
```

## Monitoring

### Health Checks

Built-in health endpoints:
- `GET /health` — Application health
- `GET /api/health` — API health
- `GET /metrics` — Prometheus metrics (if enabled)

Monitor with Uptime Kuma or similar:

```bash
curl https://repairs.yourshop.com/health
```

### Log Aggregation

View logs from all services:

```bash
docker-compose logs -f
```

Send logs to external service (ELK, Datadog, etc.):

```yaml
# In docker-compose.yml
services:
  web:
    logging:
      driver: awslogs
      options:
        awslogs-group: /repairops/web
        awslogs-region: us-east-1
```

### Performance Monitoring

Monitor resource usage:

```bash
docker stats
```

Or use Prometheus + Grafana for visualization.

## Scaling

### Horizontal Scaling (Multiple Web Instances)

```yaml
services:
  web-1:
    image: repairops/web:latest
    # ... config
    ports:
      - "3001:3000"

  web-2:
    image: repairops/web:latest
    # ... config
    ports:
      - "3002:3000"

  web-3:
    image: repairops/web:latest
    # ... config
    ports:
      - "3003:3000"
```

Update Nginx to load balance:

```nginx
upstream repairops {
  server web-1:3000;
  server web-2:3000;
  server web-3:3000;
}
```

### Vertical Scaling (More Resources)

Increase container resources:

```yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '4'
          memory: 8G
        reservations:
          cpus: '2'
          memory: 4G
```

## Troubleshooting

**Web app won't start**
```bash
docker-compose logs web
# Check for database connection errors, missing env vars
```

**Database connection refused**
```bash
docker-compose exec postgres pg_isready -U ${POSTGRES_USER}
# Check postgres container is healthy
docker-compose ps postgres
```

**Email not sending**
```bash
# Test SMTP connection
docker-compose exec web telnet ${SMTP_HOST} ${SMTP_PORT}
```

**High CPU usage**
```bash
# Profile the application
docker stats
# Look for memory leaks in worker logs
docker-compose logs worker | grep -i error
```

## Updating

### Update Images

Pull latest images:

```bash
docker-compose pull
docker-compose up -d
```

### Database Migrations

Run migrations automatically:

```bash
docker-compose run web npm run migrate:prod
```

## Security Checklist

- [ ] Change all default passwords in `.env`
- [ ] Enable firewall (only port 443 open to public)
- [ ] Configure SSL/TLS certificates
- [ ] Set up regular backups
- [ ] Configure database replication (for HA)
- [ ] Enable audit logging
- [ ] Monitor logs for suspicious activity
- [ ] Keep Docker and OS patched
- [ ] Use strong SSH keys for server access
- [ ] Configure IP whitelisting (if applicable)

## Performance Tuning

### PostgreSQL

In `docker-compose.yml`:

```yaml
postgres:
  environment:
    POSTGRES_INITDB_ARGS: |
      -c max_connections=200
      -c shared_buffers=256MB
      -c effective_cache_size=1GB
      -c work_mem=4MB
```

### Redis

Configure memory limit:

```yaml
redis:
  command: redis-server --maxmemory 2gb --maxmemory-policy allkeys-lru
```

## Support

- **Documentation:** See [Developer Overview](/developer/)
- **Enterprise Support:** Contact [support@repairops.io](mailto:support@repairops.io)
- **GitHub Issues:** [github.com/repairops/docker-compose/issues](https://github.com/repairops/docker-compose/issues)
