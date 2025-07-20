# Music Performance Availability Sign-Up App

A full-stack web app for musicians to sign up and specify when they’re free to perform. Admins can view and export all availabilities.

## Tech Stack
- Next.js (React + TypeScript)
- Tailwind CSS
- Prisma ORM (SQLite for dev)
- NextAuth.js (magic link email auth)
- react-day-picker

---

## 1. Install dependencies

```sh
pnpm install
```

---

## 2. Set up environment variables

- Copy the example file and edit as needed:
  ```sh
  cp .env.example .env
  ```
- Edit `.env`:
  - Set up your email SMTP credentials (for magic link auth).
  - Set `ADMIN_PASSWORD` to your chosen admin password.

---

## 3. Prepare the database

- Run Prisma migrations:
  ```sh
  pnpm prisma migrate dev --name init
  ```
- Seed the database with sample data:
  ```sh
  pnpm seed
  ```

---

## 4. Add a hero background image

- Place a suitable image named `hero-bg.jpg` in the `public/` folder for the landing page hero section.

---

## 5. Start the development server

```sh
pnpm dev
```
- Visit [http://localhost:3000](http://localhost:3000) to use the app.

---

## 6. Run tests

```sh
pnpm test
```
- This will run unit tests for key utilities.

---

## 7. Using the app

- **Musicians:** Go to the landing page, fill out the form, and submit. You’ll get a magic link via email to update your info.
- **Admin:** Go to `/admin`, enter the admin password, and view/export all availabilities.

---

**You’re ready to go!**  
If you want to deploy, the app is ready for Vercel or Railway.  
Let me know if you want to add features, fix linter errors, or need help with deployment! 