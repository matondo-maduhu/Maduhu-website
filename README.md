# Matondo Maduhu Portfolio — Vercel + Neon

## Features
- Static portfolio frontend
- Project request form saved to Neon PostgreSQL
- Optional WhatsApp follow-up after the request is saved
- Private request listing at `/admin.html` protected by `ADMIN_KEY`

## Setup
1. Create a Neon PostgreSQL database.
2. In Neon SQL Editor, run the contents of `schema.sql`.
3. Push this folder to a GitHub repository (the project root should contain `api/`, `public/`, `package.json`, and `vercel.json`).
4. Import the repo in Vercel.
5. In Vercel Project Settings → Environment Variables, add:
   - `DATABASE_URL`: Neon connection string (prefer pooled connection string)
   - `ADMIN_KEY`: long random secret
6. Redeploy.
7. Visit the website. Request form should save to Neon.
8. Visit `/admin.html`, enter the ADMIN_KEY, and load requests.

## Local
Install Node.js, run `npm install`, and use Vercel CLI (`npx vercel dev`) with environment variables configured.\n
