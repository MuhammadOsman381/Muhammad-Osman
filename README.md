# Muhammad Osman — Portfolio (Full Stack)

Full-stack Next.js portfolio with NeonDB, Drizzle ORM, JWT auth, Admin CMS, and Nodemailer.

## Quick Start

### 1. Install
```bash
npm install
```

### 2. Environment Variables
```bash
cp .env.example .env.local
```
Fill in:
- `DATABASE_URL` — Neon PostgreSQL connection string (from neon.tech)
- `JWT_SECRET` — any random string
- `SMTP_USER` — your Gmail
- `SMTP_PASS` — Gmail App Password
- `ADMIN_EMAIL` — where to receive contact notifications

### 3. Push DB Schema
```bash
npm run db:push
```

### 4. Seed Data
```bash
npm run db:seed
```
Creates admin `mosman257@gmail.com` / `admin123` + all portfolio data.

### 5. Run
```bash
npm run dev
```

## Admin Panel
Go to `/admin/login` and sign in.

## API Routes
- GET/POST `/api/skills` — skill sections
- GET/POST `/api/projects` — projects
- GET/POST `/api/experience` — experience
- POST `/api/contact` — contact form (public)
- GET `/api/contact` — messages (admin only)

## DB Schema
admins, skill_sections, skills, projects, experience, contact_messages
