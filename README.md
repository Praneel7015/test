# Next.js Dashboard (App Router Course Extended)

Learning project based on the official **Next.js App Router Course**, extended with a custom Customers page (search + pagination + spending totals) and a unified neutral gray UI theme.

## Overview
Features (course + custom):
- Auth-protected dashboard (credentials login).
- Overview: KPI cards, revenue chart, latest invoices (Suspense + streaming patterns).
- Invoices: create / update / delete (server actions + Zod validation), search, pagination.
- NEW Customers page:
	- Server-side search w/ debounced client input.
	- Pagination (shared ITEMS_PER_PAGE logic).
	- Aggregated metrics per customer (count, total pending, total paid) with currency formatting.
	- Responsive desktop table + mobile card layout + skeleton fallback.
- Neutral gray color palette replacing prior accent colors for consistent UI.

## Tech Stack
Next.js (App Router), TypeScript, Tailwind CSS, next-auth, Postgres, Zod.

## Setup
```bash
git clone https://github.com/Praneel7015/test.git
cd test
pnpm install
cp .env.example .env   # then fill values
pnpm dev
```
Visit: http://localhost:3000

## Environment
`.env.example` lists required vars. Currently only:
```
POSTGRES_URL=postgres://USER:PASSWORD@HOST/DBNAME?sslmode=require
```
Get this from the course DB setup (Neon) or your own Postgres provider. Restart dev server after changes.

## Database (expected tables)
- users(id, name, email, password)
- customers(id, name, email, image_url)
- invoices(id, customer_id, amount, status, date)  // amount stored in cents
- revenue(month, revenue)

## Custom Customers Implementation
- Added `fetchFilteredCustomers` & `fetchCustomersPages` in `app/lib/data.ts` (pagination + COALESCE sums).
- New page: `app/dashboard/customers/page.tsx` with Suspense + skeleton.
- Reused generic `Search` component (updates query + resets page).
- Table at `app/ui/customers/table.tsx` shows totals; currency formatting via `formatCurrency`.

## UI Theme Adjustments
- Standardized buttons, nav link active states, and primary actions to gray scale (e.g. `bg-gray-800` hover `bg-gray-700`).
- Preserved semantic red for error messages (login errors).

## Scripts
```bash
pnpm dev    # Dev (Turbopack)
pnpm build  # Production build
pnpm start  # Run production
pnpm lint   # Lint
```

## Deploy (Vercel)
1. Push repo to GitHub.
2. Import in Vercel.
3. Add `POSTGRES_URL` in Project Settings -> Environment Variables.
4. Deploy.

## Future Ideas
- Toast notifications for CRUD actions.
- Sorting columns (customers & invoices).
- OAuth providers (GitHub / Google) via next-auth.
- Shared pagination abstraction.

---
Built following the official Next.js App Router Course, then extended with additional functionality.
