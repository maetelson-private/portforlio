---
title: CueSlate
summary: A web service that shares a PDF as a slide deck behind a single link instead of a file download
period: 2026.06
sort: 202606
org: Personal project
draft: true
primary: development
also: [strategy]
roles: [Planning, FE, BE]
featured: true
stack: [Next.js 16, React 19, Tailwind CSS 4, PDF.js, Cloudflare Workers, Hono, D1, R2, Zod, Turborepo]
links:
  live: https://cueslate.org
  repoPrivate: true
---

## Problem

When you send a PDF by email or messenger, you have to resend it after every edit, the recipient has to download the file, and the original spreads as is.

## Approach

- **Link first**: The share link is created first, and the PDF is uploaded or replaced later. Swapping the file keeps the public URL the same.
- **Secure delivery**: Originals sit in a private R2 bucket and are streamed only after a short-lived view token is verified. Download and print are blocked by default.
- **Large uploads**: The browser uploads straight to R2 with presigned URLs. Files of 64MB or more are split into multipart uploads.
- **Fast viewer**: A PDF.js slide viewer, Range streaming, and WebP previews show the first page right away.
- **Lifecycle**: Free links are kept for 7 days and cleaned up by an hourly cron. Paid plans add permanent storage, passwords, and custom slugs.
- **SEO/GEO**: Multilingual public pages, sitemap, structured data, and `llms.txt`, plus diagnostic scripts I wrote.

## Architecture

- `apps/fe`: Next.js App Router. Public site, admin screens, viewer, API proxy
- `apps/be`: Cloudflare Workers + Hono. Separate admin / public / internal APIs, with OpenAPI docs
- `packages/shared`: Zod schemas shared as the FE/BE API contract
- `packages/ui`: Shared components

> The source code is in a private repo. I can share it for code review on request.
