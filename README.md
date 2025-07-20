# Music Performance Availability Sign-Up App

A full-stack web app for musicians to sign up and specify when they’re free to perform. Admins can view and export all availabilities.

## Tech Stack
- Next.js (React + TypeScript)
- Tailwind CSS
- Prisma ORM (SQLite for dev)
- NextAuth.js (magic link email auth)
- react-day-picker

## Getting Started

1. **Clone the repo**
2. **Install dependencies**
   ```sh
   pnpm install
   ```
3. **Copy and edit environment variables**
   ```sh
   cp .env.example .env
   # Edit .env as needed (set email credentials, admin password, etc)
   ```
4. **Run Prisma migrations and seed the database**
   ```sh
   pnpm prisma migrate dev --name init
   pnpm seed
   ```
5. **Start the dev server**
   ```sh
   pnpm dev
   ```

## Testing

```sh
pnpm test
```

## Features
- Musician sign-up with magic link email auth
- Multi-date/time availability picker
- Admin dashboard (password-protected)
- CSV export
- Mobile-first, dark mode UI

## Deployment
- Ready for Vercel or Railway

---

MIT License 