# LUXX Construction — Web App

A modern redesign of luxxfl.com built as a monorepo:

- **client/** — Vite + React + TypeScript + Tailwind + Framer Motion
- **server/** — Express + TypeScript + Nodemailer + Zod

The UI runs end-to-end against the local API (contact requests are stored to disk and emailed to the company; reviews are read/written through the API).

---

## Quick start

Open two terminals.

### 1) Backend

```bash
cd server
cp .env.example .env        # then edit SMTP_* and MAIL_TO
npm install
npm run dev                 # http://localhost:4000
```

### 2) Frontend

```bash
cd client
npm install
npm run dev                 # http://localhost:5173
```

The Vite dev server proxies `/api/*` → `http://localhost:4000`, so no client env vars are needed in development.

---

## Architecture

```
Luxx/
├── client/                     # React app
│   ├── src/
│   │   ├── components/         # Nav, Hero, Services, About,
│   │   │                       # ReviewsCarousel, LeaveReview,
│   │   │                       # ContactForm, Footer
│   │   ├── lib/api.ts          # All HTTP calls live here
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css           # Tailwind + design tokens
│   ├── tailwind.config.js      # Brand tokens (ink/bone/gold)
│   ├── vite.config.ts          # /api proxy → :4000
│   └── index.html
└── server/                     # Express API
    ├── src/
    │   ├── index.ts            # App bootstrap, CORS, rate-limit
    │   ├── routes/
    │   │   ├── contact.ts      # POST /api/contact
    │   │   └── reviews.ts      # GET/POST /api/reviews
    │   ├── services/mailer.ts  # Nodemailer wrapper
    │   └── storage/jsonStore.ts# JSON file persistence
    ├── data/                   # Created at runtime
    │   ├── reviews.json
    │   └── contact-requests.json
    └── .env.example
```

**Golden rule:** UI components never call `fetch` directly — they go through `client/src/lib/api.ts`. Swap the storage layer or the mailer without touching the UI.

---

## Backend integration map

| Domain   | Endpoint              | File                                | Storage                          | Email                |
| -------- | --------------------- | ----------------------------------- | -------------------------------- | -------------------- |
| Contact  | `POST /api/contact`   | `server/src/routes/contact.ts`      | `data/contact-requests.json`     | yes → `MAIL_TO`      |
| Reviews  | `GET  /api/reviews`   | `server/src/routes/reviews.ts`      | `data/reviews.json` (seeded)     | —                    |
| Reviews  | `POST /api/reviews`   | `server/src/routes/reviews.ts`      | `data/reviews.json`              | yes → `MAIL_TO`      |
| Health   | `GET  /api/health`    | `server/src/index.ts`               | —                                | —                    |

### Swapping JSON for a real database

Replace `server/src/storage/jsonStore.ts` with a Prisma/Drizzle/Mongo client. The route files import only `readJson` and `writeJson`, so the change is local — keep the same function signatures or update the two routes.

---

## API contracts

### `POST /api/contact`

Request:
```json
{
  "name": "Jane Doe",
  "email": "jane@email.com",
  "phone": "(555) 555-5555",
  "inquiryType": "Residential",
  "message": "We're planning a full kitchen remodel…",
  "company": ""
}
```

- `inquiryType` ∈ `Residential | Commercial | Consulting | Roofing | Storm Damage | Other`
- `company` is a **honeypot** — leave empty. If a bot fills it, the request is silently accepted but discarded.

Response: `201 { "ok": true, "id": "..." }` or `400 { "error": "Invalid input", "details": {...} }`.

### `GET /api/reviews`

Response:
```json
{
  "reviews": [
    {
      "id": "seed-1",
      "name": "Marcus & Elena Whitfield",
      "location": "Jupiter Island, FL",
      "rating": 5,
      "title": "A team that delivers on every promise",
      "body": "From the first walkthrough…",
      "createdAt": "2026-03-12T15:00:00.000Z",
      "approved": true
    }
  ]
}
```
Only `approved: true` reviews are returned.

### `POST /api/reviews`

Request:
```json
{
  "name": "Jane Doe",
  "location": "Stuart, FL",
  "rating": 5,
  "title": "Outstanding work",
  "body": "Detailed review text…",
  "company": ""
}
```

Set `REVIEWS_AUTO_APPROVE=false` in `.env` to require manual approval (flip `approved: true` in `data/reviews.json`).

---

## Environment variables (`server/.env`)

```
PORT=4000
CLIENT_ORIGIN=http://localhost:5173

# SMTP — use Gmail App Password, SendGrid, Mailgun, Postmark, etc.
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-sender@example.com
SMTP_PASS=your-app-password

MAIL_FROM="LUXX Website <no-reply@luxxfl.com>"
MAIL_TO=info@luxxfl.com

REVIEWS_AUTO_APPROVE=true
```

If SMTP is not configured, the server falls back to logging emails to the console — useful in development.

---

## Production build

```bash
# Frontend
cd client && npm run build       # outputs to client/dist

# Backend
cd ../server && npm run build && npm start
```

Host `client/dist` behind any static CDN (Vercel, Netlify, S3+CloudFront) and point its `/api/*` requests at your Express deployment (Render, Fly, Railway, ECS, etc.). In production set `CLIENT_ORIGIN` to your real domain(s), comma-separated.

---

## Notes for the backend developer

1. **Reviews moderation** — flip `REVIEWS_AUTO_APPROVE=false` and add an admin route or edit the JSON file by hand. The `approved` flag is the only thing that controls visibility.
2. **Persistence** — JSON files live in `server/data/`. Back this up, or replace `jsonStore.ts` with your database of choice.
3. **Email** — `services/mailer.ts` wraps Nodemailer. Drop in any transport (SES, Resend, Postmark) by replacing `createTransport()`.
4. **Rate limiting** — `/api/*` is capped at 30 req/min per IP via `express-rate-limit`. Tune in `server/src/index.ts`.
5. **Honeypot** — both forms include a hidden `company` field. Don't remove it on the frontend.
# Luxx-Construction
