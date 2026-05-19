# M.A.W Printing Website

Modern custom apparel printing site for **M.A.W** — luxury streetwear aesthetic with black-and-white minimal design.

## Features

- **Product customizer** — T-shirt, Hoodie, Polo, Oversized Tee
- **Color & size** selection
- **Print position** — Front, Back, Left Chest, Sleeve
- **Print size** — Small, Medium, Large
- **Design upload** via Uploadthing with live garment preview
- **Automatic pricing** by garment, print size, and quantity (bulk discounts)
- **Checkout** — name, phone, address, payment method
- **Admin dashboard** — view and update order status
- **Pages** — Home, Customize, Pricing, About, Contact, Admin

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase](https://supabase.com) — order storage
- [Uploadthing](https://uploadthing.com) — design file uploads

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
| `UPLOADTHING_TOKEN` | Uploadthing secret token |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Admin login password |

### 3. Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Add your URL and anon key to `.env.local`

### 4. Uploadthing setup

1. Create an app at [uploadthing.com](https://uploadthing.com)
2. Add `UPLOADTHING_TOKEN` to `.env.local`

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Path | Description |
|------|-------------|
| `/` | Homepage with hero, features, pricing |
| `/customize` | Product customizer |
| `/checkout` | Order checkout |
| `/about` | About M.A.W |
| `/contact` | Contact form |
| `/admin` | Order management |

## Pricing Logic

- Base garment price + print size fee per unit
- Bulk discounts: 5% (5–9), 10% (10–24), 15% (25+)

See `src/lib/pricing.ts` to adjust rates.

## Production Notes

- Replace client-side admin password with proper authentication (e.g. Supabase Auth + RLS policies scoped to admin role).
- Tighten Supabase RLS so only authenticated admins can read/update orders.
- Integrate a real payment provider (Stripe, etc.) for card payments.
